import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import {
	lemonSqueezySetup,
	createCheckout,
} from '@lemonsqueezy/lemonsqueezy.js';

// Initialize the Lemon Squeezy SDK
lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY! });

export async function POST(req: Request) {
	try {
		// 1. Authenticate the user
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		// 2. Create the Lemon Squeezy Checkout URL
		const { data, error } = await createCheckout(
			process.env.LEMONSQUEEZY_STORE_ID!,
			process.env.LEMONSQUEEZY_VARIANT_ID!,
			{
				checkoutData: {
					email: user.email,
					custom: {
						supabase_user_id: user.id, // THE MAGIC KEY
					},
				},
				productOptions: {
					redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/vault?success=true`,
				},
			},
		);

		if (error) throw error;

		// 3. Send the secure URL back to the frontend to redirect the user
		return NextResponse.json({ url: data?.data.attributes.url });
	} catch (error) {
		console.error('Checkout Error:', error);
		return NextResponse.json(
			{ error: 'Failed to create checkout' },
			{ status: 500 },
		);
	}
}
