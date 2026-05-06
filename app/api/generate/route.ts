import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	console.log('🔥 API ROUTE HIT');

	// 1. Initialize the Admin Client (INSIDE the function, no await needed)
	const supabaseAdmin = createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	// 2. Log Cookies (Your Sniffer)
	const cookieHeader = req.headers.get('cookie');
	console.log('COOKIE HEADER EXISTS:', !!cookieHeader);

	// 3. Initialize the Supabase Server Client
	const supabase = await createClient();

	// 4. Authenticate the User via Cookies
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	console.log('SUPABASE USER ID:', user?.id || 'NULL');

	if (authError || !user) {
		console.error('🚨 401: User is null or auth errored.');
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { toolUsed, inputData } = await req.json();

		// 5. Check Paywall & Credits
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

		// 6. The Prompt Switcher (Using a simple fallback for safety)
		let systemInstruction = 'You are a professional construction manager.';
		let userMessage = JSON.stringify(inputData);

		if (toolUsed === 'estimator') {
			systemInstruction = `You are a Senior Estimator. Use the "Goldilocks Effect" to write a Good/Better/Best proposal.`;
			userMessage = `Client: ${inputData.clientName}, Project: ${inputData.projectType}, Goals: ${inputData.clientGoals}, Notes: ${inputData.roughNotes}, Target Price: $${inputData.standardPrice}`;
		}
		// ... (You can add the rest of your tool prompts back here) ...

		const fullPrompt = `${systemInstruction}\n\nUSER REQUEST:\n${userMessage}`;

		// 7. Call OpenAI using the native fetch (Bypassing SDK)
		const rawKey = process.env.OPENAI_API_KEY?.trim();

		if (!rawKey) {
			console.error('🚨 Missing OPENAI_API_KEY');
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
				model: 'gpt-4o', // or whichever model you verified
				input: fullPrompt,
				store: true,
			}),
		});

		if (!openAiResponse.ok) {
			const errorText = await openAiResponse.text();
			console.error('🚨 OpenAI API Error:', errorText);
			return NextResponse.json(
				{ success: false, error: 'Failed to generate script' },
				{ status: openAiResponse.status },
			);
		}

		const openAiData = await openAiResponse.json();
		const generatedScript = openAiData.output?.[0]?.content?.[0]?.text || '';

		// 8. Deduct a credit (ONLY if they aren't subscribed)
		if (!isSubscribed && profile) {
			await supabaseAdmin
				.from('profiles')
				.update({ free_credits: profile.free_credits - 1 })
				.eq('id', user.id);
		}

		// 9. Save to the Vault
		await supabaseAdmin.from('generations').insert({
			user_id: user.id,
			tool_used: toolUsed,
			input_data: inputData,
			output_text: generatedScript,
		});

		// 10. Return the successful result
		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		console.error('🔥 FATAL CATCH ERROR:', error);
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
