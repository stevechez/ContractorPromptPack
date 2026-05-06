import LegalLayout from '@/components/pages/LegalLayout';

export default function Privacy() {
	return (
		<LegalLayout title="Privacy Policy" lastUpdated="May 5, 2026">
			<div className="space-y-8">
				<p>
					This Privacy Policy describes how Buildrail (&quot;we&quot;,
					&quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your
					personal information when you use our website and the Comm Vault
					software (the &quot;Service&quot;).
				</p>

				<h4>Information We Collect</h4>
				<p>
					<strong>Account Information:</strong> When you use our free tools or
					subscribe to the Service, we collect your email address and basic
					profile information via our authentication provider (Supabase).
					<br />
					<br />
					<strong>Usage Data:</strong> We store the project notes and generated
					proposals you create using our AI tools to provide you with a history
					of your work and to improve the Service.
					<br />
					<br />
					<strong>Payment Information:</strong> All payment processing is
					handled securely by our third-party provider, Lemon Squeezy. We do not
					store your credit card details on our servers.
				</p>

				<h4>How We Use Your Information</h4>
				<p>
					We use the information we collect to operate, maintain, and provide
					you with the features of the Service. We may also use your email
					address to send you service-related notices and promotional messages
					regarding Buildrail updates.
				</p>

				<h4>Data Security</h4>
				<p>
					We implement reasonable security measures to protect your data.
					However, no method of transmission over the Internet is 100% secure,
					and we cannot guarantee absolute security.
				</p>
			</div>
		</LegalLayout>
	);
}
