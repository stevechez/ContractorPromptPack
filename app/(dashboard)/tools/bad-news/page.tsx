'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';

export default function BadNewsTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		theBadNews: '',
		theReason: '',
		theSolution: '',
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
					toolUsed: 'bad_news',
					inputData: formData,
				}),
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
				<div className="inline-block px-3 py-1 bg-rose-500/20 text-rose-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Conflict Resolution
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The Bad News Buffer
				</h1>
				<p className="text-slate-500 text-lg">
					Deliver delays, price hikes, or material issues while maintaining
					total authority.
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
			>
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
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50"
						placeholder="e.g., The Smiths"
					/>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What is the Bad News?
					</label>
					<input
						type="text"
						required
						value={formData.theBadNews}
						onChange={e =>
							setFormData({ ...formData, theBadNews: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50"
						placeholder="e.g., The custom cabinets are delayed by 2 weeks."
					/>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What is the Reason?
					</label>
					<input
						type="text"
						required
						value={formData.theReason}
						onChange={e =>
							setFormData({ ...formData, theReason: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50"
						placeholder="e.g., Supplier had a machinery breakdown."
					/>
				</div>
				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What is Your Solution?
					</label>
					<textarea
						required
						rows={3}
						value={formData.theSolution}
						onChange={e =>
							setFormData({ ...formData, theSolution: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-slate-50 resize-none"
						placeholder="e.g., We will shift focus to finishing the flooring and paint so we don't lose time."
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
				>
					{isLoading ? 'Drafting...' : 'Generate Professional Update'}
				</button>
			</form>

			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-rose-500 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-rose-500 text-white px-6 py-4 flex justify-between items-center">
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
