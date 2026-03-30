import Link from 'next/link';

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans text-slate-900">
			{/* 1. HERO SECTION */}
			<section className="bg-slate-900 text-white pt-24 pb-32 px-4 relative overflow-hidden">
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<div className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-amber-400 text-sm font-bold tracking-wide mb-6 border border-white/20">
						BUILT FOR GCS, PAINTERS & HANDYMEN
					</div>
					<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
						Stop doing free work. <br />
						<span className="text-amber-500">Win bigger bids.</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
						Turn your rough truck notes into professional 3-tier estimates,
						formal change orders, and polite invoice follow-ups in exactly 15
						seconds.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link
							href="/signup"
							className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200 text-lg"
						>
							Start Free Trial (3 Scripts on Us)
						</Link>
						<p className="text-slate-400 text-sm sm:hidden mt-2">
							No credit card required
						</p>
					</div>
				</div>

				{/* Subtle Background Graphic */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500 rounded-full blur-[120px]"></div>
					<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[150px]"></div>
				</div>
			</section>

			{/* 2. THE PROBLEM / AGITATION */}
			<section className="py-20 px-4 bg-white">
				<div className="max-w-5xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-12">
						The office work is killing your margins.
					</h2>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
							<div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto text-2xl">
								📉
							</div>
							<h3 className="font-bold text-xl mb-2">
								Leaving Money on the Table
							</h3>
							<p className="text-slate-600">
								Sending a single-price text message quote means you either lose
								the job on price, or miss out on premium upgrades.
							</p>
						</div>
						<div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
							<div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 mx-auto text-2xl">
								🚪
							</div>
							<h3 className="font-bold text-xl mb-2">
								The &quot;While You&apos;re Here&quot; Trap
							</h3>
							<p className="text-slate-600">
								Clients asking for extra little favors. You do it for free
								because asking for more money feels awkward.
							</p>
						</div>
						<div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
							<div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto text-2xl">
								⏳
							</div>
							<h3 className="font-bold text-xl mb-2">Chasing Final Payments</h3>
							<p className="text-slate-600">
								The job is done, but the check isn&apos;t here. You don&apos;t
								want to sound desperate, so you just wait.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* 3. THE SOLUTION / TOOLKIT */}
			<section className="py-24 px-4 bg-slate-900 text-white">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-5xl font-bold mb-4">
							Your New Communication Operating System
						</h2>
						<p className="text-slate-400 text-lg">
							We took the psychology of high-end sales and put it in your
							pocket.
						</p>
					</div>

					<div className="space-y-16">
						{/* Feature 1 */}
						<div className="flex flex-col md:flex-row items-center gap-12">
							<div className="flex-1 space-y-4">
								<div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 font-bold text-sm rounded-full">
									TOOL 1
								</div>
								<h3 className="text-3xl font-bold">
									The &quot;Bid-to-Win&quot; Estimator
								</h3>
								<p className="text-slate-300 text-lg">
									Type in your rough notes and standard price. We instantly
									generate a professional Good, Better, Best proposal. The
									&quot;Premium&quot; anchor makes your target price look like a
									steal.
								</p>
							</div>
							<div className="flex-1 w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
								<div className="space-y-3 opacity-80 text-sm font-mono text-slate-300">
									<p className="text-amber-400">
										Option 2: The Professional Choice
									</p>
									<p>• Full oil-based prime to guarantee no bleed-through</p>
									<p>• 2 Coats Premium Sherwin Williams</p>
									<p>• Total: $1,200</p>
								</div>
							</div>
						</div>

						{/* Feature 2 */}
						<div className="flex flex-col md:flex-row-reverse items-center gap-12">
							<div className="flex-1 space-y-4">
								<div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 font-bold text-sm rounded-full">
									TOOL 2
								</div>
								<h3 className="text-3xl font-bold">
									The Scope Creep Generator
								</h3>
								<p className="text-slate-300 text-lg">
									Turn awkward text requests into formal Change Orders. We use
									the &quot;Pausing Technique&quot; to politely stop work on
									extra requests until the client approves the new cost.
								</p>
							</div>
							<div className="flex-1 w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
								<div className="space-y-3 opacity-80 text-sm font-mono text-slate-300">
									<p>
										&quot;Happy to help with that! Since that falls outside our
										original scope, I&apos;ve created a Change Order for $150.
										Reply YES to approve and we&apos;ll knock it out.&quot;
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 4. PRICING & FINAL CTA */}
			<section className="py-24 px-4 bg-slate-50 text-center">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-4xl font-bold mb-6">
						Pays for itself on day one.
					</h2>
					<p className="text-xl text-slate-600 mb-12">
						If this tool helps you recover just one late payment or win one
						larger bid, your subscription is covered for the year.
					</p>

					<div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md mx-auto relative transform hover:-translate-y-2 transition-transform duration-300">
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
							PRO TIER
						</div>
						<h3 className="text-2xl font-bold mb-2">Unlimited Access</h3>
						<div className="flex items-center justify-center gap-1 mb-6">
							<span className="text-5xl font-extrabold text-slate-900">
								$29
							</span>
							<span className="text-slate-500 font-medium">/month</span>
						</div>

						<ul className="text-left space-y-4 mb-8 text-slate-600 font-medium">
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
								</svg>{' '}
								Unlimited Tool Generations
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
								</svg>{' '}
								7 Complete Script Tools
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
								</svg>{' '}
								Personal Communication Vault
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
								</svg>{' '}
								Cancel Anytime
							</li>
						</ul>

						<Link
							href="/signup"
							className="block w-full py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors text-lg shadow-md"
						>
							Start Free Trial
						</Link>
						<p className="text-sm text-slate-400 mt-4">
							Get 3 free scripts before you pay a dime.
						</p>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="bg-slate-900 py-8 text-center text-slate-500 text-sm">
				<p>© {new Date().getFullYear()} Contractor OS. All rights reserved.</p>
			</footer>
		</div>
	);
}
