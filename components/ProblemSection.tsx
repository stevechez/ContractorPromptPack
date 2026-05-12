export default function ProblemSection() {
	return (
		<section className="py-14 px-4 relative overflow-hidden bg-slate-50/50 border-y border-slate-200/60">
			{/* Subtle top light reflection to give the section depth */}
			<div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>

			<div className="max-w-4xl mx-auto text-center relative z-10">
				<p className="text-xl md:text-2xl lg:text-[28px] text-slate-600 font-medium leading-relaxed tracking-tight [text-wrap:balance]">
					Most contractors lose{' '}
					<span className="text-rose-600 font-semibold">
						15–40% of potential revenue
					</span>{' '}
					by sending single-price quotes. This tool fixes that by structuring
					your bid into a{' '}
					<span className="relative inline-block text-slate-900 font-bold mx-1">
						Good / Better / Best
						{/* Subtle marker highlight effect */}
						<span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-200/40 -z-10 -rotate-1 rounded-sm"></span>
					</span>{' '}
					framework that anchors higher-value decisions.
				</p>
			</div>
		</section>
	);
}
