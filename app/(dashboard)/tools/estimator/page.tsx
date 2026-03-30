'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal'; // The modal we built earlier!

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setResult('');
		setCopied(false);

		try {
			// We will point this to the secure Next.js API route we build next
			const res = await fetch('/api/tools/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					toolUsed: 'estimator',
					inputData: formData,
				}),
			});

			// THE GATEKEEPER: Catch the paywall block!
			if (res.status === 403) {
				setShowPaywall(true);
				setIsLoading(false);
				return;
			}

			const data = await res.json();

			if (data.success) {
				setResult(data.result);
			} else {
				alert('Oops! Something went wrong generating your script.');
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
		}

		setIsLoading(false);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(result);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="max-w-3xl mx-auto pb-12">
			{/* Tool Header */}
			<div className="mb-8">
				<div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-600 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Win Bigger Bids
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The &quot;Bid-to-Win&quot; Estimator
				</h1>
				<p className="text-slate-500 text-lg">
					Turn rough notes into a high-converting, 3-tier Good/Better/Best
					proposal in seconds.
				</p>
			</div>

			{/* The Input Form */}
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Client Name
						</label>
						<input
							type="text"
							required
							placeholder="e.g., Sarah Jenkins"
							value={formData.clientName}
							onChange={e =>
								setFormData({ ...formData, clientName: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
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
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						Current Condition & Client Goals
					</label>
					<input
						type="text"
						required
						placeholder="e.g., Old deck is rotting, they want something zero-maintenance for summer."
						value={formData.clientGoals}
						onChange={e =>
							setFormData({ ...formData, clientGoals: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						Your Rough Notes (Brain dump here)
					</label>
					<textarea
						required
						rows={4}
						placeholder="e.g., 12x14 footprint. Needs new footings. Trex decking. Hidden fasteners. Demo will take a full day..."
						value={formData.roughNotes}
						onChange={e =>
							setFormData({ ...formData, roughNotes: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						Your Standard Price Estimate
					</label>
					<div className="relative">
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
							className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-slate-50 focus:bg-white font-mono"
						/>
					</div>
					<p className="text-xs text-slate-400 mt-2">
						This will be used as the middle &quot;Target&quot; tier.
					</p>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
				>
					{isLoading ? (
						<>
							<svg
								className="animate-spin h-5 w-5 text-white"
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
							Drafting Proposal...
						</>
					) : (
						'Generate 3-Tier Proposal'
					)}
				</button>
			</form>

			{/* The Result Reveal (Framer Motion) */}
			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-amber-500 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-amber-500 text-white px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-lg flex items-center gap-2">
								<span>✨</span> Your Winning Proposal
							</h3>
							<button
								onClick={handleCopy}
								className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
							>
								{copied ? 'Copied!' : 'Copy to Clipboard'}
							</button>
						</div>
						<div className="p-6 md:p-8">
							<div className="whitespace-pre-wrap text-slate-700 font-medium leading-relaxed font-sans text-sm md:text-base">
								{result}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* The Paywall Modal (Hidden until triggered by 403) */}
			<PaywallModal
				isOpen={showPaywall}
				onClose={() => setShowPaywall(false)}
			/>
		</div>
	);
}
