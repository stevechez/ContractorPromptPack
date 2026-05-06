import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	console.log('🔥 Funnel /api/tools/generate HIT');

	try {
		const body = await req.json();
		const { toolUsed, inputData } = body;

		// ----------------------------
		// 1. Validate input
		// ----------------------------
		if (!toolUsed || !inputData) {
			return NextResponse.json(
				{ error: 'Missing toolUsed or inputData' },
				{ status: 400 },
			);
		}

		// ----------------------------
		// 2. OpenAI Key
		// ----------------------------
		const apiKey = process.env.OPENAI_API_KEY?.trim();

		if (!apiKey) {
			console.error('🚨 Missing OpenAI API Key');
			return NextResponse.json(
				{ error: 'Server misconfigured' },
				{ status: 500 },
			);
		}

		// ----------------------------
		// 3. Supabase Admin (no auth needed)
		// ----------------------------
		const supabaseAdmin = createAdminClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!,
		);

		// ----------------------------
		// 4. Funnel session tracking (anonymous user)
		// ----------------------------
		const sessionId = req.headers.get('x-session-id') || crypto.randomUUID();

		// ----------------------------
		// 5. Prompt builder
		// ----------------------------
		let systemInstruction = '';
		let userMessage = '';

		if (toolUsed === 'estimator') {
			systemInstruction = `
You are a Senior Estimator for a high-end construction business.
Use Good / Better / Best pricing psychology.
Keep output persuasive and client-ready.
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
You are a strict but professional Project Manager.
Use the "Change Order" framing technique.
No apologies. Calm authority. 3–5 sentences max.
			`;

			userMessage = `
Client: ${inputData.clientName}
Request: ${inputData.extraRequest}
Extra Cost: $${inputData.extraPrice}
Impact: ${inputData.timelineImpact}
			`;
		} else {
			return NextResponse.json({ error: 'Invalid tool' }, { status: 400 });
		}

		const fullPrompt = `${systemInstruction}\n\n${userMessage}`;

		// ----------------------------
		// 6. OpenAI call
		// ----------------------------
		const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				input: fullPrompt,
			}),
		});

		if (!openAiResponse.ok) {
			const errorText = await openAiResponse.text();
			console.error('🚨 OpenAI Error:', errorText);

			return NextResponse.json(
				{ error: 'OpenAI failed', details: errorText },
				{ status: openAiResponse.status },
			);
		}

		const data = await openAiResponse.json();

		const output = data.output?.[0]?.content?.[0]?.text || '';

		// ----------------------------
		// 7. Save funnel event (NO AUTH REQUIRED)
		// ----------------------------
		await supabaseAdmin.from('generations').insert({
			user_id: null, // anonymous funnel user
			session_id: sessionId,
			tool_used: toolUsed,
			input_data: inputData,
			output_text: output,
		});

		// ----------------------------
		// 8. Response
		// ----------------------------
		return NextResponse.json({
			success: true,
			result: output,
			sessionId,
		});
	} catch (error) {
		console.error('🔥 Funnel API Error:', error);

		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
