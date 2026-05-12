'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { TOOL_CONFIG, ToolKey, FieldConfig } from '@/lib/toolConfig';
import PaywallModal from '@/components/PaywallModal';
import toast from 'react-hot-toast';

export default function ToolRenderer() {
	const params = useParams();

	const tool = useMemo(() => {
		const rawTool = params?.tool;
		return Array.isArray(rawTool) ? rawTool[0] : rawTool;
	}, [params]);

	const config = useMemo(() => {
		if (!tool || typeof tool !== 'string') return null;
		if (!(tool in TOOL_CONFIG)) return null;

		return TOOL_CONFIG[tool as ToolKey];
	}, [tool]);

	const [formData, setFormData] = useState<Record<string, string>>({});
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPaywall, setShowPaywall] = useState(false);
	const [copied, setCopied] = useState(false);

	if (!tool || !config) {
		return (
			<div className="text-center py-20 font-bold text-zinc-500 uppercase tracking-widest">
				Tool not found
			</div>
		);
	}

	const handleInputChange = (name: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!config.free) {
			setShowPaywall(true);
			return;
		}

		setIsLoading(true);
		setResult('');

		try {
			const res = await fetch('/api/tools/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					toolUsed: tool,
					inputData: formData,
				}),
			});

			if (res.status === 403) {
				setShowPaywall(true);
				return;
			}

			const data = await res.json();

			if (data?.success) {
				setResult(data.result);
			} else {
				toast.error('Failed to generate.');
			}
		} catch {
			toast.error('Network error.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(result);

			setCopied(true);

			toast.success('Copied!');

			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch {
			toast.error('Copy failed.');
		}
	};

	return (
		<section className="py-24 px-4 bg-zinc-950 min-h-screen selection:bg-orange-500/30">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-10 space-y-4">
					<h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
						{config.title}
					</h2>

					<p className="text-zinc-500 text-sm font-medium uppercase tracking-widest leading-relaxed max-w-xl mx-auto">
						{config.description}
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] shadow-2xl space-y-6 backdrop-blur-sm"
				>
					{config.fields.map((field: FieldConfig) => (
						<div key={field.name} className="space-y-2">
							<label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">
								{field.label}
							</label>

							{field.type === 'textarea' ? (
								<textarea
									value={formData[field.name] || ''}
									onChange={e => handleInputChange(field.name, e.target.value)}
									className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-orange-500 outline-none transition-all text-white min-h-[140px] resize-none font-medium"
									placeholder={field.placeholder}
									required
								/>
							) : (
								<input
									type="text"
									value={formData[field.name] || ''}
									onChange={e => handleInputChange(field.name, e.target.value)}
									className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 focus:border-orange-500 outline-none transition-all text-white font-medium"
									placeholder={field.placeholder}
									required
								/>
							)}
						</div>
					))}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full h-16 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/20 flex items-center justify-center gap-2"
					>
						{isLoading ? (
							<>
								<Loader2 className="animate-spin" />
								Analyzing...
							</>
						) : (
							'Generate Strategy'
						)}
					</button>
				</form>

				<AnimatePresence>
					{result && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							className="mt-10 bg-zinc-900 border border-orange-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
						>
							<div className="flex justify-between items-center mb-6 relative z-10">
								<h3 className="font-black uppercase italic tracking-tighter text-orange-500">
									Output Generated
								</h3>

								<button
									type="button"
									onClick={handleCopy}
									className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors border border-zinc-700"
								>
									{copied ? 'Copied' : 'Copy Text'}
								</button>
							</div>

							<div className="whitespace-pre-wrap text-zinc-300 font-medium leading-relaxed relative z-10">
								{result}
							</div>

							{!config.free && (
								<div className="mt-8 pt-8 border-t border-zinc-800 text-center relative z-10">
									<button
										type="button"
										onClick={() => setShowPaywall(true)}
										className="text-orange-500 font-black uppercase text-xs tracking-[0.2em] hover:text-white transition-colors"
									>
										Unlock Full Tool Vault →
									</button>
								</div>
							)}
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

function Loader2({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	);
}
