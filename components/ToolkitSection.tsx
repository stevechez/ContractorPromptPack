'use client';

export default function ToolkitSection() {
	return (
		<section className="py-28 px-4 bg-slate-900 text-white border-t border-slate-800">
			<div className="max-w-5xl mx-auto">
				{/* SECTION HEADER */}
				<div className="text-center mb-14">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-500/20 mb-6">
						AI Sales Engine
					</div>

					<h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
						Win more bids without lowering your price
					</h2>

					<p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
						Turn rough notes into a high-converting 3-tier proposal in under 30
						seconds. No writing. No formatting. No overthinking.
					</p>
				</div>

				{/* MAIN TOOL BLOCK */}
				<div className="grid md:grid-cols-2 gap-10 items-stretch bg-slate-800/40 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl">
					{/* LEFT: VALUE PROP */}
					<div className="space-y-6 flex flex-col justify-center">
						<div className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest rounded-full border border-emerald-500/20 w-fit">
							Live Tool
						</div>

						<h3 className="text-2xl md:text-4xl font-bold leading-tight">
							The Bid-to-Win Estimator
						</h3>

						<p className="text-slate-300 text-lg leading-relaxed">
							Enter your rough job notes + target price. The AI builds a Good /
							Better / Best proposal that psychologically anchors the client
							above your number.
						</p>

						<ul className="space-y-2 text-sm text-slate-400">
							<li>✓ Instantly generates 3-tier pricing structure</li>
							<li>✓ Positions your price as the “reasonable option”</li>
							<li>✓ Adds premium upsell automatically (no extra effort)</li>
						</ul>

						<button
							onClick={() => {
								document.getElementById('estimator-tool')?.scrollIntoView({
									behavior: 'smooth',
									block: 'start',
								});

								setTimeout(() => {
									document.getElementById('client-name-input')?.focus();
								}, 400);
							}}
							className="mt-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 text-lg flex items-center justify-center gap-2"
						>
							Generate a Proposal
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
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
						</button>

						<p className="text-xs text-slate-500">
							No signup required • Takes ~30 seconds
						</p>
					</div>

					{/* RIGHT: OUTPUT PREVIEW */}
					<div className="bg-[#0B1120] rounded-2xl border border-slate-700 shadow-xl overflow-hidden relative">
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-300" />

						<div className="p-6 space-y-4 font-mono text-sm text-slate-300">
							<p className="text-slate-500 text-xs uppercase tracking-widest">
								Generated Output Preview
							</p>

							<div className="border-l-2 border-amber-500 pl-4 space-y-1">
								<p className="text-amber-400 font-bold">
									Option 2 — Professional Build
								</p>
								<p>• Full demo and haul away included</p>
								<p>• New concrete footings + structural framing</p>
								<p>• Premium Trex decking with hidden fasteners</p>

								<p className="pt-2 text-white font-bold">Target: $12,500</p>
							</div>

							<div className="border-l-2 border-slate-700 pl-4 opacity-70">
								<p className="text-slate-400 font-bold">
									Option 3 — Premium Upgrade
								</p>
								<p>• High-end composite finish</p>
								<p>• Extended warranty + design upgrades</p>
								<p className="text-amber-300 font-bold pt-1">$15,900</p>
							</div>
						</div>
					</div>
				</div>

				{/* SOFT UPSIDE (NOT A SECOND DESTINATION) */}
				<div className="mt-16 text-center">
					<p className="text-slate-500 text-sm max-w-xl mx-auto">
						More tools are included in the full system — but the estimator alone
						is designed to increase your win rate immediately.
					</p>
				</div>
			</div>
		</section>
	);
}
