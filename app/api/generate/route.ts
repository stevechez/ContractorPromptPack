import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	// 1. Parse the request FIRST so we know which tool is asking for access
	const body = await req.json();
	const { toolUsed, inputData } = body;

	const supabaseAdmin = createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	const supabase = await createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	// 2. THE BYPASS LOGIC: The Gatekeeper
	// If there is no logged-in user AND they are trying to use a Vault tool, block them with 403.
	// If they are using the 'estimator', we let them pass.
	if ((authError || !user) && toolUsed !== 'estimator') {
		console.error('🚨 Unauthorized access attempt to protected vault tool.');
		return NextResponse.json({ error: 'paywall_reached' }, { status: 403 });
	}

	// 3. Paywall & Credit Check (ONLY applies if they are actually logged in)
	let isSubscribed = false;
	let profile = null;

	if (user) {
		const { data } = await supabaseAdmin
			.from('profiles')
			.select('free_credits, subscription_status')
			.eq('id', user.id)
			.single();

		profile = data;
		isSubscribed = profile?.subscription_status === 'active';
		const hasCredits = (profile?.free_credits ?? 0) > 0;

		// If logged in, but broke (no sub, no credits), and trying to use a paid tool: Block.
		if (!isSubscribed && !hasCredits && toolUsed !== 'estimator') {
			return NextResponse.json(
				{ success: false, error: 'paywall_reached' },
				{ status: 403 },
			);
		}
	}

	try {
		// 4. The Prompt Switcher
		let systemInstruction = 'You are a professional construction manager.';
		let userMessage = JSON.stringify(inputData);

		if (toolUsed === 'estimator') {
			systemInstruction = `You are a Senior Estimator. Use the "Goldilocks Effect" to write a Good/Better/Best proposal.`;
			userMessage = `Client: ${inputData.clientName}, Project: ${inputData.projectType}, Goals: ${inputData.clientGoals}, Notes: ${inputData.roughNotes}, Target Price: $${inputData.standardPrice}`;
		} else if (toolUsed === 'scope_creep') {
			systemInstruction = `You are a strict but highly professional Project Manager. Use the "Pausing Technique" to handle out-of-scope requests. Zero apologies. Keep it under 4 sentences.`;
			userMessage = `Client: ${inputData.clientName}, The Extra Request: ${inputData.extraRequest}, Extra Price: $${inputData.extraPrice}, Timeline Impact: ${inputData.timelineImpact}`;
		}
		// ... (Add the rest of your tool prompts back here if needed) ...

		const fullPrompt = `${systemInstruction}\n\nUSER REQUEST:\n${userMessage}`;

		// 5. Call OpenAI using Native Fetch (Bypassing SDK/Version issues)
		const rawKey = process.env.OPENAI_API_KEY?.trim(); // .trim() fixes the hidden space bug!

		if (!rawKey) {
			console.error('🚨 Server missing OpenAI API Key.');
			return NextResponse.json(
				{ success: false, error: 'Server config error' },
				{ status: 500 },
			);
		}

		const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${rawKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o', // Ensure this matches a model your OpenAI tier supports
				input: fullPrompt,
				store: true,
			}),
		});

		if (!openAiResponse.ok) {
			const errorText = await openAiResponse.text();
			console.error('🚨 OpenAI API Error:', openAiResponse.status, errorText);
			return NextResponse.json(
				{ success: false, error: 'Failed to generate script' },
				{ status: openAiResponse.status },
			);
		}

		const openAiData = await openAiResponse.json();

		// Safely extract from the new Responses API shape
		const generatedScript = openAiData.output?.[0]?.content?.[0]?.text || '';

		// 6. THE DATABASE BYPASS: Only charge credits/save history if it's a real user account
		if (user) {
			if (!isSubscribed && profile) {
				await supabaseAdmin
					.from('profiles')
					.update({ free_credits: profile.free_credits - 1 })
					.eq('id', user.id);
			}

			await supabaseAdmin.from('generations').insert({
				user_id: user.id,
				tool_used: toolUsed,
				input_data: inputData,
				output_text: generatedScript,
			});
		}

		// 7. Success! Send the script to the frontend.
		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		console.error('🔥 FATAL CATCH ERROR:', error);
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
