'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface PaywallModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const handleUpgradeClick = async () => {
	const res = await fetch('/api/checkout', { method: 'POST' });
	const { url } = await res.json();
	if (url) window.location.href = url;
};

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* The Blurred Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
					/>

					{/* The Modal Card */}
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
							className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-slate-100"
						>
							{/* Premium Header/Banner */}
							<div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
								<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<h2 className="text-2xl font-bold text-white">
									Unlock Unlimited Power
								</h2>
							</div>

							{/* Body Content */}
							<div className="p-6 text-center space-y-4">
								<p className="text-slate-600 font-medium text-lg">
									You&amp;ve used your 3 free scripts!
								</p>
								<p className="text-slate-500 text-sm">
									Upgrade to Pro to get unlimited generations, save your entire
									client history in the Vault, and never write another awkward
									email from scratch.
								</p>

								{/* The Conversion Button (Will link to Stripe) */}
								<button
									onClick={handleUpgradeClick}
									className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl..."
								>
									Upgrade to Pro — $29/mo
								</button>

								{/* Subtle Close Option */}
								<button
									onClick={onClose}
									className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
								>
									Maybe later
								</button>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
