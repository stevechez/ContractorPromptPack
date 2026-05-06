import Link from 'next/link';
import { ReactNode } from 'react'; // Import ReactNode for the children prop

// 1. Define the exact types for the props we are passing in
interface LegalLayoutProps {
	title: string;
	lastUpdated: string;
	children: ReactNode;
}

// 2. Apply the interface to the component signature
export default function LegalLayout({
	title,
	lastUpdated,
	children,
}: LegalLayoutProps) {
	return (
		<div className="min-h-screen bg-slate-50 flex flex-col">
			{/* Minimal Header */}
			<header className="bg-slate-900 py-6 px-4">
				<div className="max-w-4xl mx-auto flex justify-between items-center">
					<Link
						href="/"
						className="text-white font-bold text-xl tracking-tight"
					>
						Buildrail<span className="text-amber-500">.</span>
					</Link>
					<Link
						href="/"
						className="text-slate-400 text-sm hover:text-white transition"
					>
						Back to Home
					</Link>
				</div>
			</header>

			{/* Content Body */}
			<main className="flex-grow py-16 px-4">
				<div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
					<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
						{title}
					</h1>
					<p className="text-sm text-slate-500 mb-10 pb-6 border-b border-slate-100">
						Last Updated: {lastUpdated}
					</p>

					<div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
						{children}
					</div>
				</div>
			</main>

			{/* Simple Footer */}
			<footer className="bg-slate-900 py-6 text-center text-slate-500 text-xs">
				<p>© {new Date().getFullYear()} BUILDRAIL. ALL RIGHTS RESERVED.</p>
			</footer>
		</div>
	);
}
