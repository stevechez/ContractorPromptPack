export default function ProblemSection() {
	return (
		<section className="py-24 px-4 bg-slate-50 relative border-y border-slate-200">
			<div className="max-w-5xl mx-auto text-center">
				{/* Tighter, more aggressive headline focused on revenue loss */}
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
					The hidden cost of &quot;One-Price&quot; quoting.
				</h2>
				<p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">
					When you give a client only one option, you force them to make a
					&quot;Yes or No&quot; decision. Here is why that is costing you money.
				</p>

				<div className="grid md:grid-cols-3 gap-8">
					{/* Focus on the lost premium upsell */}
					<div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
						<div className="absolute top-0 left-0 w-full h-1 bg-red-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
						<div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 mx-auto text-2xl border border-red-100 shadow-sm">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
								/>
							</svg>
						</div>
						<h3 className="font-bold text-xl mb-3 text-slate-900">
							Leaving Money on the Table
						</h3>
						<p className="text-slate-600 leading-relaxed text-sm">
							Some clients want the absolute best and have the budget for it. If
							you don&apos;t offer a premium &quot;Best&quot; option, they
							can&apos;t buy it.
						</p>
					</div>

					{/* Focus on the race to the bottom */}
					<div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
						<div className="absolute top-0 left-0 w-full h-1 bg-amber-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
						<div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 mx-auto text-2xl border border-amber-100 shadow-sm">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="font-bold text-xl mb-3 text-slate-900">
							Losing on Price Alone
						</h3>
						<p className="text-slate-600 leading-relaxed text-sm">
							When your single price is compared to a competitor&apos;s single
							price, the client just picks the cheapest number. You become a
							commodity.
						</p>
					</div>

					{/* Transition to the solution (Anchoring) */}
					<div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group">
						<div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
						<div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 mx-auto text-2xl border border-emerald-100 shadow-sm">
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								/>
							</svg>
						</div>
						<h3 className="font-bold text-xl mb-3 text-slate-900">
							The Defense: Anchoring
						</h3>
						<p className="text-slate-600 leading-relaxed text-sm">
							By placing your target price between a Budget and Premium option,
							your price suddenly looks reasonable and defensible.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
