import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// Load the Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Contractor OS | The Communication Vault',
	description:
		'Stop doing free work. Win bigger bids. The operating system for GCs, Painters, and Handymen.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<body
				className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
			>
				{/* Global Toast Provider for slick notifications */}
				<Toaster
					position="bottom-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: '#1e293b', // slate-800
							color: '#fff',
							fontWeight: '600',
							borderRadius: '12px',
						},
						success: {
							iconTheme: {
								primary: '#10b981', // emerald-500
								secondary: '#fff',
							},
						},
					}}
				/>

				{children}
			</body>
		</html>
	);
}
