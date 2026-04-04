'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';

export default function PolitePayUpTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		projectName: '',
		amountOwed: '',
		daysOverdue: '',
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
			const res = await fetch('/api/tools/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					toolUsed: 'polite_pay_up',
					inputData: formData,
				}),
			});

			if (res.status === 403) {
				setShowPaywall(true);
				setIsLoading(false);
				return;
			}

			const data = await res.json();
			if (data.success) setResult(data.result);
			else alert('Oops! Something went wrong generating your script.');
		} catch (error) {
			console.error(error);
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
				<div className="inline-block px-3 py-1 bg-green-500/20 text-green-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Cash Flow Protector
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The Polite Pay-Up
				</h1>
				<p className="text-slate-500 text-lg">
					Chase down overdue invoices without ruining the client relationship.
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
							value={formData.clientName}
							onChange={e =>
								setFormData({ ...formData, clientName: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50 focus:bg-white"
							placeholder="e.g., Tom Mitchell"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Project/Job Name
						</label>
						<input
							type="text"
							required
							value={formData.projectName}
							onChange={e =>
								setFormData({ ...formData, projectName: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50 focus:bg-white"
							placeholder="e.g., Master Bath Remodel"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Amount Owed
						</label>
						<div className="relative">
							<span className="absolute left-4 top-3.5 text-slate-400 font-bold">
								$
							</span>
							<input
								type="text"
								required
								value={formData.amountOwed}
								onChange={e =>
									setFormData({ ...formData, amountOwed: e.target.value })
								}
								className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50 focus:bg-white font-mono"
								placeholder="4,500"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Days Overdue
						</label>
						<input
							type="number"
							required
							value={formData.daysOverdue}
							onChange={e =>
								setFormData({ ...formData, daysOverdue: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50 focus:bg-white"
							placeholder="e.g., 14"
						/>
					</div>
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
							Drafting Follow-up...
						</>
					) : (
						'Generate Payment Reminder Text'
					)}
				</button>
			</form>

			{/* The Result Reveal (Framer Motion) */}
			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-green-500 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-green-500 text-white px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-lg flex items-center gap-2">
								<span>✨</span> Your Follow-Up Script
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

			{/* The Paywall Modal */}
			<PaywallModal
				isOpen={showPaywall}
				onClose={() => setShowPaywall(false)}
			/>
		</div>
	);
}
