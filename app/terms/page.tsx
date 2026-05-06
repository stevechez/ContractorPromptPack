import LegalLayout from '@/components/pages/LegalLayout';

export default function Terms() {
	return (
		<LegalLayout title="Terms of Service" lastUpdated="May 5, 2026">
			<div className="space-y-8">
				<p>
					By accessing or using Buildrail and the Comm Vault tools, you agree to
					be bound by these Terms of Service.
				</p>

				<h4>Use of the Service</h4>
				<p>
					Buildrail provides AI-assisted templates and text generators for
					contractors. The generated text is intended as a starting point. You
					are solely responsible for reviewing, editing, and verifying the
					accuracy of any proposals, change orders, or communications before
					sending them to your clients. We are not responsible for any disputes
					between you and your clients.
				</p>

				<h4>Subscriptions and Payments</h4>
				<p>
					Access to the full Comm Vault requires a paid subscription processed
					via Lemon Squeezy. Subscriptions are billed monthly. You may cancel
					your subscription at any time; however, there are no refunds for
					partial months of service.
				</p>

				<h4>Limitation of Liability</h4>
				<p>
					In no event shall Buildrail be liable for any indirect, incidental,
					special, consequential, or punitive damages, including without
					limitation, loss of profits, data, use, goodwill, or other intangible
					losses, resulting from your access to or use of the Service.
				</p>

				<h4>Changes to Terms</h4>
				<p>
					We reserve the right to modify or replace these Terms at any time. We
					will provide notice of any significant changes by posting the new
					Terms on this site.
				</p>
			</div>
		</LegalLayout>
	);
}
