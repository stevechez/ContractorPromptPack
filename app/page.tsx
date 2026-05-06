import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ToolkitSection from '@/components/ToolkitSection';
import UpsellSection from '@/components/UpsellSection';
import FooterSection from '@/components/FooterSection';
import EstimatorSection from '@/components/EstimatorSection';

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-slate-50 font-sans text-slate-900">
			<HeroSection />

			{/* 2. THE PROBLEM / AGITATION */}
			<ProblemSection />

			{/* 3. THE SOLUTION / TOOLKIT */}
			<ToolkitSection />
			<EstimatorSection />

			{/* 4. PRICING & FINAL CTA */}
			<UpsellSection />

			{/* FOOTER */}
			<FooterSection />
		</div>
	);
}
