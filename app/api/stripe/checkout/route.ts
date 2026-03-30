import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2026-03-25.dahlia',
});
const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
	try {
		// 1. Authenticate the user (using your standard Auth header check)
		const authHeader = req.headers.get('Authorization');
		const token = authHeader?.replace('Bearer ', '');
		const {
			data: { user },
		} = await supabaseAdmin.auth.getUser(token!);

		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		// 2. Create the Stripe Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'subscription', // or 'payment' for a one-time fee
			line_items: [
				{
					price: process.env.STRIPE_PRICE_ID!, // Your $29/mo product price ID from the Stripe dashboard
					quantity: 1,
				},
			],
			success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
			cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?canceled=true`,
			customer_email: user.email,
			// THE MAGIC KEY: Pass the Supabase ID so the webhook knows who paid
			metadata: {
				supabase_user_id: user.id,
			},
		});

		// 3. Send the URL back to the client to redirect them
		return NextResponse.json({ url: session.url });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create session' },
			{ status: 500 },
		);
	}
}
