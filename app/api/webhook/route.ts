import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient as createAdminClient } from '@supabase/supabase-js';

const supabaseAdmin = createAdminClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	try {
		// 1. Read the raw body and the signature header
		const rawBody = await req.text();
		const signature = req.headers.get('X-Signature') || '';
		const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

		// 2. Verify the Webhook is actually from Lemon Squeezy
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');

		if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
			return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
		}

		// 3. Parse the verified payload
		const payload = JSON.parse(rawBody);
		const eventName = payload.meta.event_name;

		// 4. Handle a successful subscription creation
		if (eventName === 'subscription_created') {
			const customData = payload.meta.custom_data;
			const userId = customData.supabase_user_id;
			const lemonSqueezyCustomerId = payload.data.attributes.customer_id;

			if (userId) {
				// Unlock the paywall in Supabase!
				await supabaseAdmin
					.from('profiles')
					.update({
						subscription_status: 'active',
						// It's smart to save their LS customer ID so you can link them to the billing portal later
						stripe_customer_id: lemonSqueezyCustomerId.toString(),
					})
					.eq('id', userId);
			}
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error('Webhook Error:', error);
		return NextResponse.json(
			{ error: 'Webhook handler failed' },
			{ status: 500 },
		);
	}
}
