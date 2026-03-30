import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
			{/* The Navigation */}
			<Sidebar />

			{/* The Main Content Area */}
			<main className="flex-1 md:ml-72 min-h-screen">
				<div className="max-w-4xl mx-auto w-full p-4 md:p-8">{children}</div>
			</main>
		</div>
	);
}
