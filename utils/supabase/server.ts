import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 1. Make this function async
export async function createClient() {
	// 2. Await the cookies() function
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						// 3. Spread the options into the set method to satisfy TypeScript
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set({ name, value, ...options }),
						);
					} catch {
						// The `setAll` method was called from a Server Component.
						// This error is expected and can be ignored.
					}
				},
			},
		},
	);
}
