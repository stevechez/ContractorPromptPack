'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';

export default function FiveStarTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		projectType: '',
		favoriteDetail: '',
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
				body: JSON.stringify({ toolUsed: 'five_star', inputData: formData }),
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
				<div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Marketing
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The Review Harvester
				</h1>
				<p className="text-slate-500 text-lg">
					Send this immediately after taking the final payment to lock in a
					5-star Google Review.
				</p>
			</div>

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
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-slate-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Project Completed
						</label>
						<input
							type="text"
							required
							value={formData.projectType}
							onChange={e =>
								setFormData({ ...formData, projectType: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-slate-50"
							placeholder="e.g., Exterior Paint"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						Favorite Detail About The Job
					</label>
					<textarea
						required
						rows={3}
						value={formData.favoriteDetail}
						onChange={e =>
							setFormData({ ...formData, favoriteDetail: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-slate-50 resize-none"
						placeholder="e.g., I loved how the trim color really made the brick pop."
					/>
					<p className="text-xs text-slate-400 mt-2">
						This makes the text feel human, so they actually click your review
						link.
					</p>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
				>
					{isLoading ? 'Drafting...' : 'Generate Review Request'}
				</button>
			</form>

			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-amber-400 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-amber-400 text-slate-900 px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-lg">✨ Your Script</h3>
							<button
								onClick={handleCopy}
								className="bg-slate-900/10 hover:bg-slate-900/20 px-4 py-2 rounded-lg text-sm font-bold text-slate-900"
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
