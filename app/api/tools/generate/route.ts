import { NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// Initialize AI Provider
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
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

		// 3. The Prompt Switcher (Selects the right system prompt based on the tool)
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
        Do not use specific dollar amounts for Tier 1 or 3, use placeholders. Use the provided standard price for Tier 2.
      `;
			userMessage = `
        [Client Name]: ${inputData.clientName}
        [Project Type]: ${inputData.projectType}
        [Client Goals]: ${inputData.clientGoals}
        [My Rough Notes]: ${inputData.roughNotes}
        [My Standard Price Estimate]: ${inputData.standardPrice}
      `;
		} else if (toolUsed === 'scope_creep') {
			systemInstruction = `
        You are a Senior Project Manager. A client has casually asked for extra work.
        You must use the "Pausing Technique." Validate the request, clearly define it as a "Change Order", 
        and state that work on that specific area is paused until approved. Zero apologies.
      `;
			userMessage = `
        [Client Name]: ${inputData.clientName}
        [The Extra Request]: ${inputData.extraRequest}
        [My Price for Extra Work]: ${inputData.extraPrice}
        [Impact on Timeline]: ${inputData.timelineImpact}
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
