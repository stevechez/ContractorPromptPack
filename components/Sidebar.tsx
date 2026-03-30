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

	// The actual list of links to keep code clean
	const NavLinks = () => (
		<nav className="space-y-1 mt-6">
			{tools.map(tool => {
				const isActive = pathname === tool.href;
				return (
					<Link
						key={tool.name}
						href={tool.href}
						onClick={() => setIsOpen(false)} // Close mobile menu on click
						className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
							isActive
								? 'bg-amber-500 text-slate-900 font-bold shadow-md'
								: 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
						}`}
					>
						<span className="text-xl">{tool.icon}</span>
						{tool.name}
					</Link>
				);
			})}
		</nav>
	);

	return (
		<>
			{/* MOBILE HEADER & HAMBURGER */}
			<div className="md:hidden flex items-center justify-between bg-slate-900 text-white p-4 sticky top-0 z-50">
				<span className="font-bold text-lg tracking-wide text-amber-500">
					Contractor OS
				</span>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="p-2 bg-slate-800 rounded-md"
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
							d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
						/>
					</svg>
				</button>
			</div>

			{/* MOBILE MENU (Framer Motion) */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden fixed inset-0 z-40 bg-slate-900 pt-20 px-4 overflow-y-auto"
					>
						<NavLinks />
						<div className="mt-8 pt-8 border-t border-slate-800">
							<Link
								href="/settings"
								className="block px-4 py-3 text-slate-300 hover:text-white font-medium"
							>
								⚙️ Settings & Billing
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* DESKTOP SIDEBAR */}
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
					<NavLinks />
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
