'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';

export default function LoginPage() {
	const router = useRouter();
	const supabase = createClient();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
			setIsLoading(false);
			return;
		}

		// Success! Route them to the dashboard
		router.push('/vault');
		router.refresh();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
			<div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
				<div className="text-center mb-8">
					<Link
						href="/"
						className="text-2xl font-extrabold tracking-tight text-slate-900 inline-block"
					>
						Contractor <span className="text-amber-500">OS</span>
					</Link>
					<h1 className="text-2xl font-bold text-slate-900 mt-6">
						Welcome back
					</h1>
					<p className="text-slate-500 mt-2">
						Log in to access your communication vault.
					</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-slate-700 mb-1">
							Password
						</label>
						<input
							type="password"
							required
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
						/>
					</div>

					{error && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100"
						>
							{error}
						</motion.div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-lg hover:bg-amber-400 transition-colors shadow-md disabled:opacity-70"
					>
						{isLoading ? 'Logging in...' : 'Log in'}
					</button>
				</form>

				<p className="mt-8 text-center text-sm text-slate-500">
					Don&rsquo;t have an account?{' '}
					<Link
						href="/signup"
						className="text-amber-600 font-bold hover:underline"
					>
						Sign up for free
					</Link>
				</p>
			</div>
		</div>
	);
}
