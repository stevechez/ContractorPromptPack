import { NextResponse } from 'next/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	console.log('🔥 /api/tools/generate ACTIVE ROUTE');

	const apiKey = process.env.OPENAI_API_KEY?.trim();

	console.log('KEY EXISTS:', !!apiKey);
	console.log('KEY LENGTH:', apiKey?.length);

	if (!apiKey) {
		return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
	}

	const supabaseAdmin = createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
	);

	try {
		const { toolUsed, inputData } = await req.json();

		// ---------------- PROMPT SWITCH ----------------
		let systemInstruction = '';
		let userMessage = '';

		if (toolUsed === 'estimator') {
			systemInstruction = `You are a Senior Estimator...`;
			userMessage = `Client: ${inputData.clientName}, Project: ${inputData.projectType}, Goals: ${inputData.clientGoals}, Notes: ${inputData.roughNotes}, Target Price: $${inputData.standardPrice}`;
		} else if (toolUsed === 'scope_creep') {
			systemInstruction = `You are a strict but highly professional Project Manager...`;
			userMessage = `Client: ${inputData.clientName}, Extra Request: ${inputData.extraRequest}, Extra Price: $${inputData.extraPrice}, Timeline Impact: ${inputData.timelineImpact}`;
		} else if (toolUsed === 'polite_pay_up') {
			systemInstruction = `You are an Accounts Receivable Manager...`;
			userMessage = `Client: ${inputData.clientName}, Amount Owed: $${inputData.amountOwed}`;
		} else if (toolUsed === 'bad_news') {
			systemInstruction = `You are a master communicator...`;
			userMessage = `Client: ${inputData.clientName}, Bad News: ${inputData.theBadNews}, Reason: ${inputData.theReason}`;
		} else if (toolUsed === 'tire_kicker') {
			systemInstruction = `You are a high-end sales qualifier...`;
			userMessage = `Lead Name: ${inputData.clientName}, Message: ${inputData.originalMessage}`;
		} else if (toolUsed === 'day_one') {
			systemInstruction = `You are a meticulous Project Manager...`;
			userMessage = `Client: ${inputData.clientName}, Start: ${inputData.startTime}`;
		} else if (toolUsed === 'five_star') {
			systemInstruction = `You are a relationship-driven business owner...`;
			userMessage = `Client: ${inputData.clientName}, Project: ${inputData.projectType}`;
		} else {
			return NextResponse.json(
				{ error: 'Invalid tool specified' },
				{ status: 400 },
			);
		}

		const fullPrompt = `${systemInstruction}\n\nUSER REQUEST:\n${userMessage}`;

		// ---------------- OPENAI CALL ----------------
		const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4.1-mini',
				input: fullPrompt,
			}),
		});

		if (!openAiResponse.ok) {
			const errorText = await openAiResponse.text();
			console.error('OpenAI ERROR:', errorText);

			return NextResponse.json(
				{ success: false, error: 'OpenAI failed', details: errorText },
				{ status: openAiResponse.status },
			);
		}

		const openAiData = await openAiResponse.json();

		const generatedScript = openAiData.output?.[0]?.content?.[0]?.text || '';

		// ---------------- OPTIONAL LOGGING (NO USER REQUIRED) ----------------
		await supabaseAdmin.from('generations').insert({
			tool_used: toolUsed,
			input_data: inputData,
			output_text: generatedScript,
		});

		return NextResponse.json({
			success: true,
			result: generatedScript,
		});
	} catch (error) {
		console.error('API ERROR:', error);

		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
