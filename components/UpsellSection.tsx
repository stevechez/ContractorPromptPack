import Link from 'next/link';

export default function UpsellSection() {
	return (
		<section className="py-28 px-4 bg-slate-50 border-t border-slate-200">
			<div className="max-w-3xl mx-auto text-center">
				{/* 🔥 STRONGER HOOK */}
				<h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
					Most contractors lose{' '}
					<span className="text-amber-500">$2,000–$10,000/month</span>
					<br />
					from poor pricing communication.
				</h2>

				<p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
					The Estimator fixes one problem. The Vault fixes the entire system:
					pricing, communication, scope control, and payment recovery.
				</p>

				{/* 🔥 VALUE STACK CARD */}
				<div className="bg-white p-10 rounded-3xl border shadow-xl relative">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-5 py-1 text-xs font-bold rounded-full uppercase tracking-widest">
						Buildrail Communication Vault
					</div>

					{/* OUTCOME-FIRST LIST */}
					<ul className="text-left space-y-5 mb-10 text-slate-700 font-medium">
						<li className="flex gap-3">
							<span className="text-green-500 font-bold">✓</span>
							Increase average job value using 3-tier pricing psychology
						</li>

						<li className="flex gap-3">
							<span className="text-green-500 font-bold">✓</span>
							Get paid faster with structured follow-up messaging
						</li>

						<li className="flex gap-3">
							<span className="text-green-500 font-bold">✓</span>
							Stop scope creep before it becomes unpaid work
						</li>

						<li className="flex gap-3">
							<span className="text-green-500 font-bold">✓</span>
							Handle bad news, delays, and client pressure professionally
						</li>

						<li className="flex gap-3 font-bold text-slate-900">
							<span className="text-amber-500">+</span>
							All future communication tools included
						</li>
					</ul>

					{/* 🔥 ROI FRAME */}
					<p className="text-sm text-slate-500 mb-6">
						If this improves just{' '}
						<span className="font-bold text-slate-900">one job per month</span>,
						it typically pays for itself{' '}
						<span className="font-bold">10–30x over</span>.
					</p>

					{/* PRICE (moved lower psychologically) */}
					<div className="mb-6">
						<div className="text-5xl font-extrabold text-slate-900">
							$29
							<span className="text-base font-medium text-slate-500">/mo</span>
						</div>
					</div>

					{/* CTA */}
					<Link
						href="https://contractorpromptpack.lemonsqueezy.com/checkout/buy/4a075f16-41a9-418a-b503-4b79e290fd6a"
						className="w-full flex items-center justify-center gap-2 py-5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition text-lg shadow-lg"
					>
						Upgrade My Pricing System
					</Link>

					<p className="text-xs text-slate-400 mt-4">
						Secure checkout via Lemon Squeezy. Cancel anytime.
					</p>
				</div>
			</div>
		</section>
	);
}
