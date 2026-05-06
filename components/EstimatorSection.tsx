'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';
import toast from 'react-hot-toast';

export default function EstimatorTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		projectType: '',
		currentCondition: '',
		clientGoals: '',
		roughNotes: '',
		standardPrice: '',
	});

	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPaywall, setShowPaywall] = useState(false);
	const [copied, setCopied] = useState(false);
	const toolUsed = 'estimator'; // or dynamic value
	const inputData = formData; // whatever you're collecting
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setResult('');
		setCopied(false);
		console.log('🔥 HIT tools/generate route');

		try {
			const res = await fetch('/api/tools/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // 🔥 critical for auth
				body: JSON.stringify({
					toolUsed,
					inputData,
				}),
			});

			if (res.status === 403) {
				setShowPaywall(true);
				setIsLoading(false);
				return;
			}

			const data = await res.json();

			if (data.success) {
				setResult(data.result);
				setTimeout(() => {
					document
						.getElementById('result-card')
						?.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}, 300);
			} else {
				toast.error('Oops! Something went wrong generating your script.');
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
			toast.error('Network error. Please try again.');
		}

		setIsLoading(false);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(result);
		setCopied(true);
		toast.success('Proposal copied to clipboard!');
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			id="estimator-tool"
			className="py-24 px-4 bg-slate-50 relative border-t border-slate-200"
		>
			{/* Subtle background element for depth */}
			<div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>

			<div className="max-w-3xl mx-auto relative z-10">
				{/* Tool Header - Centered for better flow into the form */}
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 font-bold text-xs rounded-full uppercase tracking-widest mb-4 border border-amber-200 shadow-sm">
						<span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
						Win Bigger Bids
					</div>
					<h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
						The &quot;Bid-to-Win&quot; Estimator
					</h2>
					<p className="text-slate-600 text-lg max-w-xl mx-auto">
						Turn rough notes into a high-converting, 3-tier Good/Better/Best
						proposal in seconds.
					</p>
				</div>

				{/* The Input Form - Card styling refined */}
				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-1.5">
							<label className="block text-sm font-bold text-slate-700">
								Client Name
							</label>
							<input
								type="text"
								required
								id="client-name-input"
								placeholder="e.g., Sarah Jenkins"
								value={formData.clientName}
								onChange={e =>
									setFormData({ ...formData, clientName: e.target.value })
								}
								className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400"
							/>
						</div>
						<div className="space-y-1.5">
							<label className="block text-sm font-bold text-slate-700">
								Project Type
							</label>
							<input
								type="text"
								required
								placeholder="e.g., Master Deck Rebuild"
								value={formData.projectType}
								onChange={e =>
									setFormData({ ...formData, projectType: e.target.value })
								}
								className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="block text-sm font-bold text-slate-700">
							Current Condition & Client Goals
						</label>
						<input
							type="text"
							required
							placeholder="e.g., Old deck is rotting, they want zero-maintenance for summer."
							value={formData.clientGoals}
							onChange={e =>
								setFormData({ ...formData, clientGoals: e.target.value })
							}
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400"
						/>
					</div>

					<div className="space-y-1.5">
						<div className="flex justify-between items-end">
							<label className="block text-sm font-bold text-slate-700">
								Your Rough Notes
							</label>
							<span className="text-xs text-slate-400 font-medium">
								Brain dump here
							</span>
						</div>
						<textarea
							required
							rows={4}
							placeholder="e.g., 12x14 footprint. Needs new footings. Trex decking. Hidden fasteners. Demo will take a full day..."
							value={formData.roughNotes}
							onChange={e =>
								setFormData({ ...formData, roughNotes: e.target.value })
							}
							className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none text-slate-900 placeholder:text-slate-400"
						/>
					</div>

					<div className="space-y-1.5 pt-2 border-t border-slate-100">
						<label className="block text-sm font-bold text-slate-700">
							Your Standard Price Estimate
						</label>
						<p className="text-xs text-slate-500 mb-3 leading-relaxed">
							We will use this as your middle &quot;Target&quot; tier, and
							automatically generate a Budget (-20%) and Premium (+30%) option
							to anchor your price.
						</p>
						<div className="relative max-w-xs">
							<span className="absolute left-4 top-3.5 text-slate-400 font-bold">
								$
							</span>
							<input
								type="text"
								required
								placeholder="12,500"
								value={formData.standardPrice}
								onChange={e =>
									setFormData({ ...formData, standardPrice: e.target.value })
								}
								className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white font-mono text-lg text-slate-900 font-bold"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-slate-900 text-white font-bold text-lg py-5 rounded-xl hover:bg-slate-800 transition-all shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 mt-4"
					>
						{isLoading ? (
							<>
								<svg
									className="animate-spin h-5 w-5 text-amber-500"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Engineering Proposal...
							</>
						) : (
							<>
								Generate 3-Tier Proposal
								<svg
									className="w-5 h-5 text-amber-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</>
						)}
					</button>
				</form>

				{/* The Result Reveal (Framer Motion) */}
				<AnimatePresence>
					{result && (
						<motion.div
							id="result-card"
							initial={{ opacity: 0, y: 30, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, scale: 0.98 }}
							transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
							className="mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 relative"
						>
							{/* Premium Top Bar */}
							<div className="bg-slate-900 text-white px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-amber-500">
								<div className="flex items-center gap-3">
									<div className="bg-amber-500/20 p-2 rounded-lg">
										<svg
											className="w-6 h-6 text-amber-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<h3 className="font-bold text-lg tracking-tight">
											Your Winning Proposal
										</h3>
										<p className="text-slate-400 text-xs">
											Ready to send to {formData.clientName || 'your client'}
										</p>
									</div>
								</div>
								<button
									onClick={handleCopy}
									className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
								>
									{copied ? (
										<>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2.5}
													d="M5 13l4 4L19 7"
												/>
											</svg>
											Copied!
										</>
									) : (
										<>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
												/>
											</svg>
											Copy to Clipboard
										</>
									)}
								</button>
							</div>

							{/* Result Body */}
							<div className="p-6 md:p-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white">
								<div className="whitespace-pre-wrap text-slate-700 leading-[1.8] font-sans text-base">
									{result}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<PaywallModal
				isOpen={showPaywall}
				onClose={() => setShowPaywall(false)}
			/>
		</section>
	);
}
