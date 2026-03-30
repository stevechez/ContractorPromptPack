'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';

export default function SignupPage() {
	const router = useRouter();
	const supabase = createClient();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});

		if (error) {
			setError(error.message);
			setIsLoading(false);
			return;
		}

		// If successful, push them right into the dashboard!
		// Our Supabase database trigger is already working in the background
		// to create their profile and give them 3 credits.
		router.push('/vault');
		router.refresh();
	};

	return (
		<div className="min-h-screen flex bg-slate-50">
			{/* Left Column: The Form */}
			<div className="flex-1 flex items-center justify-center p-8 sm:p-12">
				<div className="max-w-md w-full">
					<Link
						href="/"
						className="text-2xl font-extrabold tracking-tight text-slate-900 mb-8 block"
					>
						Contractor <span className="text-amber-500">OS</span>
					</Link>

					<h1 className="text-3xl font-bold text-slate-900 mb-2">
						Claim your 3 free scripts
					</h1>
					<p className="text-slate-500 mb-8">
						No credit card required. Start saving time immediately.
					</p>

					<form onSubmit={handleSignup} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">
								Email Address
							</label>
							<input
								type="email"
								required
								value={email}
								onChange={e => setEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
								placeholder="you@company.com"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-1">
								Password
							</label>
							<input
								type="password"
								required
								minLength={6}
								value={password}
								onChange={e => setPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
								placeholder="••••••••"
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
							className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
						>
							{isLoading ? 'Creating Account...' : 'Create Account'}
						</button>
					</form>

					<p className="mt-6 text-center text-sm text-slate-500">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-amber-600 font-bold hover:underline"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>

			{/* Right Column: Social Proof / Value Prop (Hidden on Mobile) */}
			<div className="hidden lg:flex flex-1 bg-slate-900 text-white flex-col justify-center px-16 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
				<div className="relative z-10 max-w-lg">
					<h2 className="text-4xl font-bold mb-6">
						&ldquo;I recovered a $4,000 late payment on day one.&rdquo;
					</h2>
					<p className="text-xl text-slate-300 mb-8">
						Stop agonizing over how to word awkward texts. Let the OS handle the
						psychology so you can focus on the job.
					</p>

					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<span className="text-amber-500 text-xl">✓</span> Win bigger bids
							with 3-tier options
						</div>
						<div className="flex items-center gap-3">
							<span className="text-amber-500 text-xl">✓</span> Enforce
							boundaries with Change Orders
						</div>
						<div className="flex items-center gap-3">
							<span className="text-amber-500 text-xl">✓</span> Collect payments
							without ruining relationships
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
