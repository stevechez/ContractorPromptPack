'use client';

export default function HeroSection() {
	return (
		<section className="bg-slate-900 text-white pt-24 pb-28 px-4 relative overflow-hidden">
			<div className="max-w-5xl mx-auto text-center relative z-10">
				{/* Authority + specificity badge */}
				<div className="inline-flex items-center gap-2 bg-white/5 px-5 py-2 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase mb-8 border border-white/10">
					Built for Contractors Who Want Higher-Average Job Value
				</div>

				{/* Headline (more specific, outcome-driven) */}
				<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
					Stop underpricing your jobs.
					<br />
					<span className="text-amber-500">
						Anchor every bid 20–40% higher.
					</span>
				</h1>

				{/* Subheadline (mechanism + clarity) */}
				<p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
					This AI estimator turns rough job notes into a
					<strong className="text-white"> Good / Better / Best proposal</strong>{' '}
					that frames your middle price as the obvious choice — so clients stop
					pushing back on cost.
				</p>

				{/* Proof strip (this is what you're missing) */}
				<div className="flex flex-wrap justify-center gap-3 mb-10 text-xs text-slate-400">
					<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
						No pricing guesswork
					</span>
					<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
						Used for residential contractors
					</span>
					<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
						Instant proposal structure
					</span>
				</div>

				{/* CTA stack (important conversion change) */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
						className="w-full sm:w-auto px-10 py-5 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-1 text-lg"
					>
						Generate My Higher-Price Bid
					</button>
				</div>

				<p className="text-slate-400 text-sm mt-5">
					No signup required • Generates in ~10 seconds
				</p>
			</div>

			{/* background */}
			<div className="absolute inset-0 opacity-30 pointer-events-none">
				<div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-amber-500 rounded-full blur-[140px] opacity-60"></div>
				<div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-600 rounded-full blur-[160px] opacity-40"></div>
			</div>
		</section>
	);
}
