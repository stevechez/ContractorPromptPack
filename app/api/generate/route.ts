import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	// 1. Parse the request FIRST so we know what tool they are using
	const { toolUsed, inputData } = await req.json();

	const supabaseAdmin = createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	const supabase = await createClient();
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	// 2. THE BYPASS LOGIC
	// If there is no user AND the tool is NOT the estimator, block them.
	if ((authError || !user) && toolUsed !== 'estimator') {
		console.error('🚨 Unauthorized access attempt to protected vault tool.');
		return NextResponse.json({ error: 'paywall_reached' }, { status: 403 });
	}

	// 3. Paywall & Credit Check (ONLY if they are logged in)
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

		// If they are logged in, but have no credits and no sub, block them
		if (!isSubscribed && !hasCredits && toolUsed !== 'estimator') {
			return NextResponse.json(
				{ success: false, error: 'paywall_reached' },
				{ status: 403 },
			);
		}
	}

	try {
		// ... (Your Prompt Switcher logic stays the same here) ...
		let systemInstruction = 'You are a professional construction manager.';
		let userMessage = JSON.stringify(inputData);

		if (toolUsed === 'estimator') {
			systemInstruction = `You are a Senior Estimator. Use the "Goldilocks Effect" to write a Good/Better/Best proposal.`;
			userMessage = `Client: ${inputData.clientName}, Project: ${inputData.projectType}, Goals: ${inputData.clientGoals}, Notes: ${inputData.roughNotes}, Target Price: $${inputData.standardPrice}`;
		}

		const fullPrompt = `${systemInstruction}\n\nUSER REQUEST:\n${userMessage}`;

		// ... (Your OpenAI fetch logic stays exactly the same here) ...
		const rawKey = process.env.OPENAI_API_KEY?.trim();
		const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
			/* ... */
		});
		const openAiData = await openAiResponse.json();
		const generatedScript = openAiData.output?.[0]?.content?.[0]?.text || '';

		// 4. THE DATABASE BYPASS
		// We only deduct credits and save history IF they are a logged-in user
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

		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		console.error('🔥 FATAL ERROR:', error);
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
