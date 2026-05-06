import { NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// 1. Force Next.js to treat this as a dynamic, server-side-only route
export const dynamic = 'force-dynamic';

// 2. Add a dummy fallback string so the SDK doesn't crash the build
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
});

// Initialize Supabase Admin for secure background operations (like deducting credits)
const supabaseAdmin = createAdminClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	try {
		// 1. Authenticate the user via cookies
		const supabase = await createServerClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { toolUsed, inputData } = await req.json();

		// 2. Check Paywall & Credits
		const { data: profile } = await supabaseAdmin
			.from('profiles')
			.select('free_credits, subscription_status')
			.eq('id', user.id)
			.single();

		const isSubscribed = profile?.subscription_status === 'active';
		const hasCredits = (profile?.free_credits ?? 0) > 0;

		if (!isSubscribed && !hasCredits) {
			return NextResponse.json(
				{ success: false, error: 'paywall_reached' },
				{ status: 403 },
			);
		}

		// 3. The Prompt Switcher
		let systemInstruction = '';
		let userMessage = '';

		if (toolUsed === 'estimator') {
			systemInstruction = `
        You are a Senior Estimator and Sales Psychologist for a professional residential trade business. 
        Your objective is to use the "Goldilocks Effect" to psychologically guide the client to the middle option:
        1. OPTION 1 (Economy): Basic compliance.
        2. OPTION 2 (Standard): The target value.
        3. OPTION 3 (Premium): The anchor.
        Write a proposal acknowledging pain points, presenting 3 options, and explaining the logic. 
        Use the provided standard price for Tier 2. Do not invent exact dollar amounts for Tiers 1 and 3, use reasonable percentages based on Tier 2.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        Project: ${inputData.projectType}
        Goals: ${inputData.clientGoals}
        Notes: ${inputData.roughNotes}
        Target Price: $${inputData.standardPrice}
      `;
		} else if (toolUsed === 'scope_creep') {
			systemInstruction = `
        You are a strict but highly professional Project Manager. The client has casually asked for extra work outside the original contract.
        Use the "Pausing Technique." 
        1. Validate their request politely. 
        2. Clearly define it as a "Change Order." 
        3. State that work on that specific area is paused until they approve the new cost and timeline. 
        Zero apologies. Keep it under 4 sentences.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        The Extra Request: ${inputData.extraRequest}
        Extra Price: $${inputData.extraPrice}
        Timeline Impact: ${inputData.timelineImpact}
      `;
		} else if (toolUsed === 'polite_pay_up') {
			systemInstruction = `
        You are an Accounts Receivable Manager. Write a short, firm, but polite follow-up message to collect an overdue payment. 
        Use the "Assumed Positive Intent" framework—assume they simply forgot or the invoice got lost, but clearly state the amount owed and that it needs to be paid today. Provide clear next steps.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        Amount Owed: $${inputData.amountOwed}
        Days Overdue: ${inputData.daysOverdue}
        Project: ${inputData.projectName}
      `;
		} else if (toolUsed === 'bad_news') {
			systemInstruction = `
        You are a master communicator in construction management. You need to deliver bad news (delays, price hikes, material issues) to a client.
        Use the "Buffer-Reason-Bad News-Solution" framework. 
        Never just present a problem—always immediately follow the bad news with the exact solution you are implementing to fix it. Maintain authority and calm.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        The Bad News: ${inputData.theBadNews}
        The Reason: ${inputData.theReason}
        Our Solution: ${inputData.theSolution}
      `;
		} else if (toolUsed === 'tire_kicker') {
			systemInstruction = `
        You are a high-end sales qualifier. You received a vague or overly demanding lead.
        Write a polite response that sets clear boundaries, outlines your minimum project engagement (if provided), and asks 3 highly specific qualifying questions they must answer before you will schedule an onsite visit. 
        The tone should be: "We are in high demand, let's see if we are a fit."
      `;
			userMessage = `
        Lead Name: ${inputData.clientName}
        Their Message: ${inputData.originalMessage}
        My Minimum Job Size: ${inputData.minimumBudget}
      `;
		} else if (toolUsed === 'day_one') {
			systemInstruction = `
        You are a meticulous Project Manager sending a "Day One Onboarding" email to a client whose project starts tomorrow.
        Set expectations clearly to avoid future conflict. Outline arrival times, parking needs, bathroom policies, and communication protocols. Be friendly but authoritative.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        Project: ${inputData.projectType}
        Start Time: ${inputData.startTime}
        Specific Logistics/Rules: ${inputData.logistics}
      `;
		} else if (toolUsed === 'five_star') {
			systemInstruction = `
        You are a relationship-driven business owner. The project was just completed successfully. 
        Write a warm text message/email asking for a Google Review. Use the "Favor Framework"—make it personal, mention a specific detail about the project that you enjoyed, and include a clear call to action with a placeholder for the review link.
      `;
			userMessage = `
        Client: ${inputData.clientName}
        Project Completed: ${inputData.projectType}
        Favorite Detail About Job: ${inputData.favoriteDetail}
      `;
		} else {
			return NextResponse.json(
				{ error: 'Invalid tool specified' },
				{ status: 400 },
			);
		}

		// 4. Call the AI
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o', // or your preferred model
			temperature: 0.7,
			messages: [
				{ role: 'system', content: systemInstruction },
				{ role: 'user', content: userMessage },
			],
		});

		const generatedScript = completion.choices[0].message.content || '';

		// 5. Deduct a credit (ONLY if they aren't subscribed)
		if (!isSubscribed) {
			await supabaseAdmin
				.from('profiles')
				.update({ free_credits: profile!.free_credits - 1 })
				.eq('id', user.id);
		}

		// 6. Save to the Communication Vault
		await supabaseAdmin.from('generations').insert({
			user_id: user.id,
			tool_used: toolUsed,
			input_data: inputData,
			output_text: generatedScript,
		});

		// 7. Return the successful result to the UI
		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		console.error('API Generation Error:', error);
		return NextResponse.json(
			{ success: false, error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
