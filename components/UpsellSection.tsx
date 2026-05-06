import Link from 'next/link';

export default function UpsellSection() {
	return (
		<section className="py-24 px-4 bg-slate-50 text-center border-t border-slate-200">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-4xl font-bold mb-6 text-slate-900">
					The Estimator is yours for free. <br />
					<span className="text-amber-500">Want the rest of the tools?</span>
				</h2>
				<p className="text-xl text-slate-600 mb-12">
					Upgrade to the full{' '}
					<strong className="text-slate-900">Buildrail Comm Vault</strong>. If
					it helps you recover just one late payment or handle one scope creep
					gracefully, it pays for itself for the year.
				</p>

				<div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto relative transform hover:-translate-y-2 transition-transform duration-300">
					{/* Brand Transition Badge */}
					<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-700 shadow-md">
						Powered by Buildrail
					</div>

					<h3 className="text-2xl font-bold mb-2 text-slate-900">
						The Full Vault
					</h3>
					<div className="flex items-center justify-center gap-1 mb-6">
						<span className="text-5xl font-extrabold text-slate-900">$29</span>
						<span className="text-slate-500 font-medium">/month</span>
					</div>

					<ul className="text-left space-y-4 mb-8 text-slate-600 font-medium">
						<li className="flex items-center gap-3 text-slate-900 font-bold">
							<svg
								className="w-5 h-5 text-amber-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2.5"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							The 3-Tier Estimator
						</li>
						<li className="flex items-center gap-3">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							The Scope Creep Generator
						</li>
						<li className="flex items-center gap-3">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							The Polite Pay-Up Script
						</li>
						<li className="flex items-center gap-3">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							The Bad News Buffer
						</li>
						<li className="flex items-center gap-3">
							<svg
								className="w-5 h-5 text-green-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								></path>
							</svg>
							+ 3 More Automation Tools
						</li>
					</ul>

					{/* Lemon Squeezy or Buildrail redirect link goes here */}
					<Link
						// Replace this string with your actual Lemon Squeezy URL
						href="https://contractorpromptpack.lemonsqueezy.com/checkout/buy/4a075f16-41a9-418a-b503-4b79e290fd6a"
						className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-lg shadow-md"
					>
						Unlock the Vault
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
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</Link>
					<p className="text-sm text-slate-400 mt-4">
						Secure checkout via Lemon Squeezy. Cancel anytime.
					</p>
				</div>
			</div>
		</section>
	);
}
