'use client';

export default function ToolkitSection() {
	return (
		<section className="py-24 px-4 bg-slate-900 text-white border-t border-slate-800">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold mb-4">
						The 3-Tier Bidding Engine
					</h2>
					<p className="text-slate-400 text-lg max-w-2xl mx-auto">
						We took the psychology of high-end sales and turned it into a simple
						tool you can use from the truck.
					</p>
				</div>

				{/* THE MAIN EVENT: The Estimator - Make this the absolute focus */}
				<div className="flex flex-col md:flex-row items-center gap-12 mb-24 bg-slate-800/50 p-8 md:p-12 rounded-3xl border border-slate-700">
					<div className="flex-1 space-y-6">
						<div className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-widest rounded-full border border-amber-500/30">
							Available Now
						</div>
						<h3 className="text-3xl md:text-4xl font-bold leading-tight">
							The &quot;Bid-to-Win&quot; Estimator
						</h3>
						<p className="text-slate-300 text-lg leading-relaxed">
							Stop guessing what the client can afford. Type in your rough notes
							and your target price. The AI instantly generates a professional
							Good, Better, Best proposal. The &quot;Premium&quot; option
							anchors the price, making your target look like a steal.
						</p>
						<div className="pt-4">
							{/* UPDATED BUTTON: Added the onClick smooth scroll logic */}
							<button
								onClick={() => {
									document.getElementById('estimator-tool')?.scrollIntoView({
										behavior: 'smooth',
										block: 'start',
									});
									// Optional focus
									setTimeout(() => {
										document.getElementById('client-name-input')?.focus();
									}, 500);
								}}
								className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg text-lg flex items-center gap-2"
							>
								Try the Estimator Free
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Visual Representation of the output */}
					<div className="flex-1 w-full bg-[#0B1120] p-6 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300"></div>
						<div className="space-y-4 opacity-90 text-sm font-mono text-slate-300">
							<p className="text-slate-500 mb-4">
								{/* // Generated Output Preview */}
							</p>
							<div className="pl-4 border-l-2 border-slate-700">
								<p className="text-amber-400 font-bold text-base mb-1">
									Option 2: The Professional Build
								</p>
								<p className="mb-1">• Full demo and haul away included.</p>
								<p className="mb-1">
									• 12x14 footprint with new concrete footings.
								</p>
								<p className="mb-1">
									• Standard Trex decking with hidden fasteners.
								</p>
								<p className="text-white font-bold mt-2">
									Target Investment: $12,500
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* THE UPSELL TEASER: Compress the rest into a grid to show the value of upgrading to Buildrail later */}
				<div className="border-t border-slate-800 pt-20">
					<div className="text-center mb-12">
						<h3 className="text-2xl font-bold mb-2">
							Want the full Communication Vault?
						</h3>
						<p className="text-slate-400">
							Unlock these 6 additional tools when you upgrade to Buildrail.
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 opacity-70 hover:opacity-100 transition-opacity duration-500">
						{/* Scope Creep */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-blue-400 font-bold mb-2">
								Scope Creep Generator
							</h4>
							<p className="text-sm text-slate-400">
								Turn awkward text requests into formal Change Orders instantly.
							</p>
						</div>
						{/* Polite Pay-Up */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-green-400 font-bold mb-2">
								The Polite Pay-Up
							</h4>
							<p className="text-sm text-slate-400">
								Chase down overdue invoices without ruining the relationship.
							</p>
						</div>
						{/* Bad News */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-rose-400 font-bold mb-2">Bad News Buffer</h4>
							<p className="text-sm text-slate-400">
								Deliver delays or price hikes while maintaining total authority.
							</p>
						</div>
						{/* Lead Qualifier */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-indigo-400 font-bold mb-2">Lead Qualifier</h4>
							<p className="text-sm text-slate-400">
								Politely filter out bad leads and set strong boundaries early.
							</p>
						</div>
						{/* Onboarding */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-teal-400 font-bold mb-2">Day One Rules</h4>
							<p className="text-sm text-slate-400">
								Establish parking, bathroom, and pet rules before you arrive.
							</p>
						</div>
						{/* Reviews */}
						<div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
							<h4 className="text-yellow-400 font-bold mb-2">
								Review Harvester
							</h4>
							<p className="text-sm text-slate-400">
								Lock in a 5-star Google Review immediately after taking payment.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
