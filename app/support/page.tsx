import LegalLayout from '@/components/pages/LegalLayout';

export default function Support() {
	return (
		<LegalLayout title="Support & Contact" lastUpdated="May 5, 2026">
			<div className="space-y-8">
				<section>
					<h3 className="text-xl font-bold text-slate-900 mb-3">
						How can we help?
					</h3>
					<p>
						If you are having trouble generating a bid, accessing the Comm
						Vault, or have questions about your Buildrail subscription, please
						reach out to us directly.
					</p>
				</section>

				<section>
					<h4 className="text-lg font-bold text-slate-900 mb-2">
						Email Support
					</h4>
					<p>
						The fastest way to get help is to email us at{' '}
						<strong className="text-slate-900">support@buildrail.com</strong>.
						We aim to respond to all inquiries within 24 hours during normal
						business hours.
					</p>
				</section>

				<section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
					<h4 className="text-lg font-bold text-slate-900 mb-2">
						Billing Questions
					</h4>
					<p>
						If you have questions regarding your $29/mo Comm Vault subscription,
						receipts, or need to cancel your account, you can manage your
						billing directly through your Lemon Squeezy portal, or email us for
						assistance.
					</p>
				</section>
			</div>
		</LegalLayout>
	);
}
