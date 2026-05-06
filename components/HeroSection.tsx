'use client';
export default function HeroSection() {
	return (
		<section className="bg-slate-900 text-white pt-24 pb-32 px-4 relative overflow-hidden">
			<div className="max-w-4xl mx-auto text-center relative z-10">
				{/* Micro-Copy Trust Badge */}
				<div className="inline-block bg-white/5 px-5 py-2 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase mb-8 border border-white/10 shadow-sm">
					The 3-Tier Bidding Blueprint
				</div>

				{/* Refined Headline - Focus on the immediate pain point and the tool */}
				<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
					Stop sending one price. <br />
					<span className="text-amber-500">Anchor your bids higher.</span>
				</h1>

				{/* Subtitle - Explain the "What" and the "Why" */}
				<p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
					Use our AI bidding engine to instantly turn your rough notes into a
					professional Good/Better/Best proposal that eliminates the &ldquo;your
					price is too high&rdquo; argument.
				</p>

				{/* Single, clear Call to Action leading to the tool/modal */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button
						onClick={() => {
							document.getElementById('estimator-tool')?.scrollIntoView({
								behavior: 'smooth',
								block: 'start', // Aligns the top of the tool with the top of the screen
							});

							// Optional Pro-Tip: Automatically focus the first input field after a short delay
							setTimeout(() => {
								document.getElementById('client-name-input')?.focus();
							}, 500);
						}}
						className="w-full sm:w-auto px-10 py-5 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_-15px_rgba(245,158,11,0.7)] hover:-translate-y-1 transform duration-200 text-lg flex items-center justify-center gap-2"
					>
						Generate a 3-Tier Bid Now
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</button>
					<p className="text-slate-400 text-sm mt-3 sm:mt-0 sm:ml-4 font-medium tracking-wide">
						100% Free Tool. No signup required.
					</p>
				</div>
			</div>

			{/* Subtle Background Graphics - Keeps the premium feel */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
				{/* Adjusted blurs for a slightly moodier, more focused look */}
				<div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-amber-500 rounded-full blur-[140px] opacity-60"></div>
				<div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-600 rounded-full blur-[160px] opacity-40"></div>
			</div>
		</section>
	);
}
