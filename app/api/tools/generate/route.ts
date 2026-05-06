import { NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

// ✅ FORCE Node runtime (CRITICAL)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	console.log('COOKIE HEADER:', req.headers.get('cookie'));
	console.log('🔥 /api/generate HIT');
	// ✅ sanitize key properly
	const rawKey = process.env.OPENAI_API_KEY;
	const apiKey = rawKey?.trim();

	// ✅ safe debug logging
	console.log('KEY EXISTS:', !!apiKey);
	console.log('KEY LENGTH:', apiKey?.length);

	if (apiKey) {
		console.log('LAST CHAR CODE:', apiKey.charCodeAt(apiKey.length - 1));
	}

	if (!apiKey) {
		return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
	}

	const supabaseAdmin = createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	try {
		const supabase = await createServerClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		console.log('AUTH ERROR:', authError);
		console.log('USER:', user);
		console.log('COOKIE HEADER:', req.headers.get('cookie'));

		if (authError || !user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { toolUsed, inputData } = await req.json();

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

		// ---------------- PROMPT SWITCH ----------------
		let systemInstruction = '';
		let userMessage = '';

		// (keeping your logic unchanged)
		if (toolUsed === 'estimator') {
			systemInstruction = `You are a Senior Estimator...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else if (toolUsed === 'scope_creep') {
			systemInstruction = `You are a strict but highly professional Project Manager...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else if (toolUsed === 'polite_pay_up') {
			systemInstruction = `You are an Accounts Receivable Manager...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else if (toolUsed === 'bad_news') {
			systemInstruction = `You are a master communicator...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else if (toolUsed === 'tire_kicker') {
			systemInstruction = `You are a high-end sales qualifier...`;
			userMessage = `Lead Name: ${inputData.clientName} ...`;
		} else if (toolUsed === 'day_one') {
			systemInstruction = `You are a meticulous Project Manager...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else if (toolUsed === 'five_star') {
			systemInstruction = `You are a relationship-driven business owner...`;
			userMessage = `Client: ${inputData.clientName} ...`;
		} else {
			return NextResponse.json(
				{ error: 'Invalid tool specified' },
				{ status: 400 },
			);
		}

		const fullPrompt = `${systemInstruction}\n\nUSER REQUEST:\n${userMessage}`;

		const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`, // ✅ use sanitized key
			},
			body: JSON.stringify({
				model: 'gpt-4.1-mini',
				input: fullPrompt,
			}),
		});

		// ✅ MUCH better error visibility
		if (!openAiResponse.ok) {
			const errorJson = await openAiResponse.json().catch(() => null);
			console.error('OpenAI STATUS:', openAiResponse.status);
			console.error('OpenAI ERROR BODY:', errorJson);

			return NextResponse.json(
				{
					success: false,
					error: 'OpenAI request failed',
					details: errorJson,
				},
				{ status: openAiResponse.status },
			);
		}

		const openAiData = await openAiResponse.json();

		const generatedScript =
			openAiData.output_text ||
			openAiData.output?.[0]?.content?.[0]?.text ||
			'';
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

		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		console.error('API Generation Error:', error);
		return NextResponse.json(
			{ success: false, error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
