import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Your Supabase SSR client
import VaultDashboard from './VaultDashboard';

export default async function VaultPage() {
	const supabase = await createClient();

	// 1. Verify User
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect('/login');
	}

	// 2. Fetch their Generation History (Ordered by newest first)
	const { data: generations, error } = await supabase
		.from('generations')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	if (error) {
		return <div className="p-8 text-red-500">Error loading vault data.</div>;
	}

	// 3. Pass data to the interactive Client Component
	return (
		<div className="min-h-screen bg-slate-50 p-4 md:p-8">
			<div className="max-w-5xl mx-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-slate-900">
						Communication Vault
					</h1>
					<p className="text-slate-500 mt-2">
						Search and reuse your past scripts and estimates.
					</p>
				</header>

				<VaultDashboard initialData={generations || []} />
			</div>
		</div>
	);
}
