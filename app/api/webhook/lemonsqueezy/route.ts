import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient as createAdminClient } from '@supabase/supabase-js';

// Initialize Supabase Admin for bypassing Row Level Security (RLS)
const supabaseAdmin = createAdminClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	try {
		// 1. Get the raw body for signature verification
		const rawBody = await req.text();

		// 2. Get the signature from the headers
		const signature = req.headers.get('x-signature');
		const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

		if (!signature || !secret) {
			console.error('🚨 Missing webhook signature or secret.');
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// 3. Verify the Webhook Signature
		// This mathematically proves the request came from Lemon Squeezy
		const hmac = crypto.createHmac('sha256', secret);
		const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
		const signatureBuffer = Buffer.from(signature, 'utf8');

		if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
			console.error('🚨 Invalid webhook signature.');
			return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
		}

		// 4. Parse the verified payload
		const data = JSON.parse(rawBody);
		const eventName = data.meta.event_name;
		const eventData = data.data.attributes;

		console.log(`💰 Webhook received: ${eventName}`);

		// 5. Handle the Subscription Events
		if (
			eventName === 'subscription_created' ||
			eventName === 'subscription_updated'
		) {
			const customerEmail = eventData.user_email;

			// Log for debugging
			console.log(`Upgrading profile for email: ${customerEmail}`);

			// Upsert the profile in Supabase based on the email.
			// We use 'upsert' because they might have created an account before buying,
			// or they might be buying first before creating a password.
			const { error: upsertError } = await supabaseAdmin
				.from('profiles')
				.upsert(
					{
						email: customerEmail,
						subscription_status: 'active',
					},
					{ onConflict: 'email' }, // IMPORTANT: Requires 'email' to be a UNIQUE constraint in Supabase
				);

			if (upsertError) {
				console.error('Supabase Upsert Error:', upsertError);
				return NextResponse.json(
					{ error: 'Database update failed' },
					{ status: 500 },
				);
			}

			console.log(
				`✅ Successfully provisioned Pro status for ${customerEmail}`,
			);
			return NextResponse.json({ success: true }, { status: 200 });
		}

		// Handle cancellations
		if (
			eventName === 'subscription_cancelled' ||
			eventName === 'subscription_expired'
		) {
			const customerEmail = eventData.user_email;

			const { error: downgradeError } = await supabaseAdmin
				.from('profiles')
				.update({ subscription_status: 'inactive' })
				.eq('email', customerEmail);

			if (downgradeError) {
				console.error('Supabase Downgrade Error:', downgradeError);
			}

			console.log(`❌ Downgraded profile for ${customerEmail}`);
			return NextResponse.json({ success: true }, { status: 200 });
		}

		// Unhandled event type, just return 200 so LemonSqueezy stops retrying
		return NextResponse.json({ received: true }, { status: 200 });
	} catch (error) {
		console.error('Webhook processing failed:', error);
		return NextResponse.json(
			{ error: 'Webhook processing failed' },
			{ status: 500 },
		);
	}
}
