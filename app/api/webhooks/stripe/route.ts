import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2026-03-25.dahlia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
	const body = await req.text();
	const sig = (await headers()).get('stripe-signature') as string;

	let event: Stripe.Event;

	try {
		// 1. Verify the signature to ensure this is actually Stripe calling
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
	} catch (err: any) {
		console.error(`❌ Webhook Error: ${err.message}`);
		return NextResponse.json(
			{ error: `Webhook Error: ${err.message}` },
			{ status: 400 },
		);
	}

	// 2. Handle the "checkout.session.completed" event
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		// Pull the milestone_id we saved in the metadata when creating the link
		const milestoneId = session.metadata?.milestone_id;

		if (milestoneId) {
			const supabase = await createClient();

			// 3. Update the database to 'paid'
			const { error } = await supabase
				.from('milestones')
				.update({
					status: 'paid',
					paid_at: new Date().toISOString(),
				})
				.eq('id', milestoneId);

			if (error) {
				console.error('❌ Database update failed:', error);
				return NextResponse.json(
					{ error: 'DB Update Failed' },
					{ status: 500 },
				);
			}

			console.log(`✅ Milestone ${milestoneId} marked as PAID.`);
		}
	}

	return NextResponse.json({ received: true });
}
