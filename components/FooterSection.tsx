export default function Footer() {
	return (
		<footer className="bg-slate-900 pt-16 pb-8 px-4 border-t border-slate-800">
			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
					{/* Brand Section */}
					<div className="text-center md:text-left">
						<h2 className="text-white font-bold text-xl tracking-tight mb-2">
							Buildrail<span className="text-amber-500">.</span>
						</h2>
						<p className="text-slate-400 text-sm max-w-xs">
							The communication operating system for the modern tradesman. Built
							in Cupertino, CA.
						</p>
					</div>

					{/* Secondary Navigation / Links */}
					<div className="flex gap-8 text-slate-400 text-sm font-medium">
						<a
							href="/support"
							className="hover:text-amber-400 transition-colors"
						>
							Support
						</a>
						<a href="/terms" className="hover:text-amber-400 transition-colors">
							Terms
						</a>
						<a
							href="/privacy"
							className="hover:text-amber-400 transition-colors"
						>
							Privacy
						</a>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs tracking-wider uppercase">
					<p>© {new Date().getFullYear()} BUILDRAIL. ALL RIGHTS RESERVED.</p>

					{/* Status Indicator - Adds a "Pro" feel */}
					<div className="flex items-center gap-2">
						<span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
						SYSTEMS OPERATIONAL
					</div>
				</div>
			</div>
		</footer>
	);
}
