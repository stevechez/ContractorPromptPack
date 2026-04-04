'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tools = [
	{ name: 'Communication Vault', href: '/vault', icon: '🗄️' },
	{ name: 'The Bid Estimator', href: '/tools/estimator', icon: '📋' },
	{ name: 'Scope Creep Generator', href: '/tools/scope-creep', icon: '🚧' },
	{ name: 'Polite Pay-Up', href: '/tools/polite-pay-up', icon: '💰' },
	{ name: 'Bad News Buffer', href: '/tools/bad-news', icon: '🛡️' },
	{ name: 'Lead Qualifier', href: '/tools/tire-kicker', icon: '🎯' },
	{ name: 'Project Onboarding', href: '/tools/day-one', icon: '🤝' },
	{ name: 'Review Harvester', href: '/tools/five-star', icon: '⭐' },
];

export default function Sidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* MOBILE HEADER & HAMBURGER */}
			<div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
				<span className="font-bold text-lg tracking-wide text-amber-500">
					Contractor OS
				</span>
				<button
					onClick={() => setIsOpen(true)}
					className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>

			{/* MOBILE MENU (Premium Slide-out Drawer) */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* The Blurred Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
						/>

						{/* The Drawer */}
						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
							className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-sm bg-slate-900 shadow-2xl overflow-y-auto flex flex-col"
						>
							<div className="p-6 border-b border-slate-800 flex justify-between items-center">
								<h2 className="text-xl font-extrabold text-white tracking-tight">
									Contractor <span className="text-amber-500">OS</span>
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="text-slate-400 hover:text-white p-1"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							<div className="flex-1 px-4 py-6">
								<div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
									Your Toolkit
								</div>
								<nav className="space-y-2">
									{tools.map(tool => (
										<Link
											key={tool.name}
											href={tool.href}
											onClick={() => setIsOpen(false)}
											className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
												pathname === tool.href
													? 'bg-amber-500 text-slate-900 font-bold shadow-md'
													: 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
											}`}
										>
											<span className="text-xl">{tool.icon}</span>
											{tool.name}
										</Link>
									))}
								</nav>
							</div>

							<div className="p-4 border-t border-slate-800 bg-slate-900/50">
								<Link
									href="/settings"
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition-colors"
								>
									<span className="text-xl">⚙️</span>
									Settings & Billing
								</Link>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* DESKTOP SIDEBAR (Remains exactly the same) */}
			<div className="hidden md:flex flex-col w-72 bg-slate-900 text-white min-h-screen fixed left-0 top-0 border-r border-slate-800 p-4">
				<div className="px-4 py-6 border-b border-slate-800">
					<h2 className="text-2xl font-extrabold tracking-tight">
						Contractor <span className="text-amber-500">OS</span>
					</h2>
				</div>

				<div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
					<div className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
						Your Toolkit
					</div>
					<nav className="space-y-1 mt-2">
						{tools.map(tool => (
							<Link
								key={tool.name}
								href={tool.href}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
									pathname === tool.href
										? 'bg-amber-500 text-slate-900 font-bold shadow-md'
										: 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
								}`}
							>
								<span className="text-xl">{tool.icon}</span>
								{tool.name}
							</Link>
						))}
					</nav>
				</div>

				<div className="p-4 border-t border-slate-800">
					<Link
						href="/settings"
						className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white font-medium transition-colors"
					>
						<span className="text-xl">⚙️</span>
						Settings
					</Link>
				</div>
			</div>
		</>
	);
}
