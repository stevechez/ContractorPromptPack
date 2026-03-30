'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to format dates cleanly
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
};

export interface GenerationRecord {
	id: string;
	user_id: string;
	tool_used: string;
	input_data: Record<string, unknown>;
	output_text: string;
	created_at: string;
}

// Helper to make the tool names look pretty
const formatToolName = (slug: string) => {
	const names: Record<string, string> = {
		scope_creep: 'Scope Creep',
		estimator: 'Bid Estimator',
		polite_pay_up: 'Invoice Follow-up',
		tire_kicker: 'Lead Qualifier',
		day_one: 'Project Onboarding',
		five_star: 'Review Request',
	};
	return names[slug] || slug;
};

export default function VaultDashboard({
	initialData,
}: {
	initialData: GenerationRecord[];
}) {
	const [searchQuery, setSearchQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');

	// Live Filtering Logic
	const filteredData = initialData.filter(item => {
		const matchesSearch =
			item.output_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
			JSON.stringify(item.input_data)
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

		const matchesFilter =
			activeFilter === 'all' || item.tool_used === activeFilter;

		return matchesSearch && matchesFilter;
	});

	// Simple Copy to Clipboard function
	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		// You could trigger a small toast notification here!
	};

	return (
		<div className="space-y-6">
			{/* Filters and Search Bar */}
			<div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
				<div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
					<button
						onClick={() => setActiveFilter('all')}
						className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'all' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
					>
						All Scripts
					</button>
					{/* Add more filter pills based on your tools */}
					<button
						onClick={() => setActiveFilter('estimator')}
						className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'estimator' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
					>
						Estimates
					</button>
				</div>

				<div className="relative w-full md:w-72">
					<input
						type="text"
						placeholder="Search clients, notes, or scripts..."
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
					/>
					<svg
						className="w-5 h-5 text-slate-400 absolute left-3 top-2.5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>

			{/* The Animated Grid */}
			<motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<AnimatePresence>
					{filteredData.length === 0 ? (
						<div className="col-span-full py-12 text-center text-slate-500">
							No scripts found matching your search.
						</div>
					) : (
						filteredData.map(item => (
							<motion.div
								layout
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.2 }}
								key={item.id}
								className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
							>
								{/* Card Header */}
								<div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
									<div>
										<span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
											{formatToolName(item.tool_used)}
										</span>
										<p className="text-xs text-slate-400 mt-2 font-medium">
											{formatDate(item.created_at)}
										</p>
									</div>
									{/* Client Name extracted from JSON input if it exists */}
									<div className="text-right">
										<span className="text-sm font-semibold text-slate-700">
											{/* THE FIX: Type casting the unknown object so TypeScript allows checking for clientName */}
											{(item.input_data as Record<string, string>)
												?.clientName || 'Unknown Client'}
										</span>
									</div>
								</div>

								{/* Card Body - The Script */}
								<div className="p-4 flex-grow relative group">
									<div className="text-sm text-slate-600 font-mono whitespace-pre-wrap line-clamp-6">
										{item.output_text}
									</div>

									{/* Hover Overlay for Copying */}
									<div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
										<button
											onClick={() => handleCopy(item.output_text)}
											className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
												/>
											</svg>
											Copy Script
										</button>
									</div>
								</div>
							</motion.div>
						))
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
