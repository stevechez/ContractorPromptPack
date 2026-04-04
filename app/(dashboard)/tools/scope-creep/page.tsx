'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaywallModal from '@/components/PaywallModal';

export default function ScopeCreepTool() {
	const [formData, setFormData] = useState({
		clientName: '',
		extraRequest: '',
		extraPrice: '',
		timelineImpact: '',
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
					toolUsed: 'scope_creep', // THIS IS THE ONLY MAGIC KEY YOU CHANGE FOR EACH TOOL
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
			else alert('Oops! Something went wrong.');
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
				<div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-600 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
					Protect Your Margins
				</div>
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					The Scope Creep Generator
				</h1>
				<p className="text-slate-500 text-lg">
					Turn the &quot;while you&rsquo;re here&quot; requests into formal
					Change Orders without sounding like a jerk.
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
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50"
						placeholder="e.g., Mark Davis"
					/>
				</div>

				<div>
					<label className="block text-sm font-bold text-slate-700 mb-2">
						What did they ask for?
					</label>
					<textarea
						required
						rows={3}
						value={formData.extraRequest}
						onChange={e =>
							setFormData({ ...formData, extraRequest: e.target.value })
						}
						className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50 resize-none"
						placeholder="e.g., Since you have the paint out, can you just hit that side door too?"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Cost for the extra work
						</label>
						<div className="relative">
							<span className="absolute left-4 top-3.5 text-slate-400 font-bold">
								$
							</span>
							<input
								type="text"
								required
								value={formData.extraPrice}
								onChange={e =>
									setFormData({ ...formData, extraPrice: e.target.value })
								}
								className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50"
								placeholder="250"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-bold text-slate-700 mb-2">
							Impact on Timeline
						</label>
						<input
							type="text"
							required
							value={formData.timelineImpact}
							onChange={e =>
								setFormData({ ...formData, timelineImpact: e.target.value })
							}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50"
							placeholder="e.g., Adds half a day"
						/>
					</div>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
				>
					{isLoading ? 'Drafting Response...' : 'Generate Change Order Text'}
				</button>
			</form>

			<AnimatePresence>
				{result && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-8 bg-white border-2 border-blue-500 rounded-2xl shadow-xl overflow-hidden"
					>
						<div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-lg">✨ Your Script</h3>
							<button
								onClick={handleCopy}
								className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold"
							>
								{copied ? 'Copied!' : 'Copy to Clipboard'}
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
