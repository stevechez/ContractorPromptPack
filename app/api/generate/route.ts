import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Or your custom server client utility

// Initialize Supabase Admin client for secure server-side operations
const supabaseAdmin = await createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	try {
		// 1. Get the user's Auth token from the request headers
		const authHeader = req.headers.get('Authorization');
		if (!authHeader)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const token = authHeader.replace('Bearer ', '');
		const {
			data: { user },
			error: userError,
		} = await supabaseAdmin.auth.getUser(token);

		if (userError || !user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const { toolUsed, inputData } = await req.json();

		// 2. Check Paywall Status
		const { data: profile } = await supabaseAdmin
			.from('profiles')
			.select('free_credits, subscription_status')
			.eq('id', user.id)
			.single();

		const isSubscribed = profile?.subscription_status === 'active';
		const hasCredits = profile?.free_credits > 0;

		if (!isSubscribed && !hasCredits) {
			return NextResponse.json(
				{ success: false, error: 'paywall_reached' },
				{ status: 403 },
			);
		}

		// 3. GENERATE THE AI SCRIPT (Your hidden system prompt goes here)
		// const generatedScript = await callYourAIModel(toolUsed, inputData);
		const generatedScript = 'Here is your professional, generated text...'; // Placeholder

		// 4. Deduct a credit (ONLY if they aren't subscribed)
		if (!isSubscribed) {
			await supabaseAdmin
				.from('profiles')
				.update({ free_credits: profile!.free_credits - 1 })
				.eq('id', user.id);
		}

		// 5. Save to the Vault
		await supabaseAdmin.from('generations').insert({
			user_id: user.id,
			tool_used: toolUsed,
			input_data: inputData,
			output_text: generatedScript,
		});

		// 6. Return the result to the UI
		return NextResponse.json({ success: true, result: generatedScript });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
