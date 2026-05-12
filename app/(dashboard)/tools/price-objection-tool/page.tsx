'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';
import toast from 'react-hot-toast';

export default function PriceObjectionTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		projectType: '',
		price: '',
		context: '',
	});

	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPaywall, setShowPaywall] = useState(false);
	const [copied, setCopied] = useState(false);

	const toolUsed = 'price_objection';
	const inputData = formData;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setResult('');
		setCopied(false);

		try {
			const res = await fetch('/api/tools/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
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
				toast.error('Something went wrong.');
			}
		} catch (err) {
			console.error(err);
			toast.error('Network error.');
		}

		setIsLoading(false);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(result);
		setCopied(true);
		toast.success('Copied!');
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="text-center mb-10">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-full mb-4 border border-red-200">
						💸 Handle Price Objections
					</div>

					<h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
						Price Objection Killer
					</h2>

					<p className="text-slate-600 text-lg">
						Turn “your price is too high” into a confident, deal-saving
						response.
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6"
				>
					<input
						required
						placeholder="Client Name (e.g., Sarah)"
						value={formData.clientName}
						onChange={e =>
							setFormData({ ...formData, clientName: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200"
					/>

					<input
						required
						placeholder="Project Type (e.g., Deck rebuild)"
						value={formData.projectType}
						onChange={e =>
							setFormData({ ...formData, projectType: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200"
					/>

					<input
						required
						placeholder="Your Price (e.g., 12,500)"
						value={formData.price}
						onChange={e => setFormData({ ...formData, price: e.target.value })}
						className="w-full px-4 py-3 rounded-xl border border-slate-200"
					/>

					<textarea
						required
						rows={3}
						placeholder='What did they say? (e.g., "Your price is too high...")'
						value={formData.context}
						onChange={e =>
							setFormData({ ...formData, context: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200"
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl"
					>
						{isLoading ? 'Writing response...' : 'Generate Response'}
					</button>
				</form>

				{/* Result */}
				<AnimatePresence>
					{result && (
						<motion.div
							id="result-card"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="mt-10 bg-white rounded-3xl shadow-xl border p-6"
						>
							<div className="flex justify-between items-center mb-4">
								<h3 className="font-bold text-lg">Your Response</h3>

								<button
									onClick={handleCopy}
									className="text-sm bg-amber-500 px-4 py-2 rounded-lg font-bold"
								>
									{copied ? 'Copied' : 'Copy'}
								</button>
							</div>

							<div className="whitespace-pre-wrap text-slate-700">{result}</div>

							{/* 🔥 Conversion trigger */}
							<div className="mt-6 pt-4 border-t text-center">
								<p className="text-sm text-slate-500 mb-3">
									Want more tools like this?
								</p>
								<button
									onClick={() => setShowPaywall(true)}
									className="text-sm font-bold text-amber-600"
								>
									Unlock Full Vault →
								</button>
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
