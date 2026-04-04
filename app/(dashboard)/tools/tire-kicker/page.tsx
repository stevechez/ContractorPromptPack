'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';

export default function TireKickerTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		originalMessage: '',
		minimumBudget: '',
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
				body: JSON.stringify({ toolUsed: 'tire_kicker', inputData: formData }),
			});
			if (res.status === 403) return setShowPaywall(true);
			const data = await res.json();
			if (data.success) setResult(data.result);
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
			<div className="mb-8">
				<div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Time Saver
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The Lead Qualifier
				</h1>
				<p className="text-slate-500 text-lg">
					Politely filter out bad leads and set strong boundaries before you
					even get in the truck.
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Lead Name
						</label>
						<input
							type="text"
							required
							value={formData.clientName}
							onChange={e =>
								setFormData({ ...formData, clientName: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50"
							placeholder="e.g., John"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Your Minimum Job Size ($)
						</label>
						<input
							type="text"
							required
							value={formData.minimumBudget}
							onChange={e =>
								setFormData({ ...formData, minimumBudget: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50"
							placeholder="e.g., 5,000"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What did they send you?
					</label>
					<textarea
						required
						rows={4}
						value={formData.originalMessage}
						onChange={e =>
							setFormData({ ...formData, originalMessage: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 resize-none"
						placeholder="Paste their vague text or email here..."
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
				>
					{isLoading ? 'Drafting...' : 'Generate Qualifying Response'}
				</button>
			</form>

			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-indigo-500 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-indigo-500 text-white px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-lg">✨ Your Script</h3>
							<button
								onClick={handleCopy}
								className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold"
							>
								{copied ? 'Copied!' : 'Copy'}
							</button>
						</div>
						<div className="p-6 md:p-8 whitespace-pre-wrap text-slate-700 font-medium">
							{result}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<PaywallModal
				isOpen={showPaywall}
				onClose={() => setShowPaywall(false)}
			/>
		</div>
	);
}
