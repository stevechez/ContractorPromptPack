'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase'; // Import your generated types
import toast from 'react-hot-toast';

// Define the shape of your Profile based on your database schema
type Profile = Database['public']['Tables']['profiles']['Row'];

export default function SettingsPage() {
	const supabase = createClient();

	// Replace <any> with <Profile | null>
	const [profile, setProfile] = useState<Profile | null>(null);

	const [activeTab, setActiveTab] = useState('business');
	const [isLoadingPortal, setIsLoadingPortal] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	// Mock state for advanced settings (You can wire these to Supabase later)
	const [settings, setSettings] = useState({
		companyName: '',
		businessPhone: '',
		defaultHourlyRate: '85',
		minimumJobSize: '500',
		aiTone: 'professional',
		measurementSystem: 'imperial',
		currency: 'USD',
		autoBcc: false,
	});

	useEffect(() => {
		async function fetchProfile() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				const { data } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', user.id)
					.single();
				setProfile(data);
			}
		}
		fetchProfile();
	}, [supabase]);

	const handleManageBilling = async () => {
		setIsLoadingPortal(true);
		try {
			const res = await fetch('/api/billing/portal', { method: 'POST' });
			const { url } = await res.json();
			if (url) window.location.href = url;
			else
				toast.error('Could not load billing portal. Please contact support.');
		} catch (error) {
			toast.error('An error occurred loading the portal.');
		}
		setIsLoadingPortal(false);
	};

	const handleSaveSettings = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		// Simulate API call to save settings to a new 'user_settings' table
		await new Promise(resolve => setTimeout(resolve, 800));
		toast.success('Settings saved successfully!');
		setIsSaving(false);
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		window.location.href = '/login';
	};

	if (!profile) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
			</div>
		);
	}

	const isPro = profile.subscription_status === 'active';

	const tabs = [
		{ id: 'business', label: 'Business Defaults', icon: '🏢' },
		{ id: 'ai', label: 'AI Configuration', icon: '🧠' },
		{ id: 'billing', label: 'Billing & Plan', icon: '💳' },
		{ id: 'data', label: 'Data & Privacy', icon: '🔐' },
	];

	return (
		<div className="max-w-4xl mx-auto pb-12">
			<div className="mb-8">
				<h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
					Workspace Settings
				</h1>
				<p className="text-slate-500 text-lg">
					Configure your business defaults and AI output preferences.
				</p>
			</div>

			<div className="flex flex-col md:flex-row gap-8">
				{/* Sidebar Navigation for Settings */}
				<div className="w-full md:w-64 flex-shrink-0">
					<nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 custom-scrollbar">
						{tabs.map(tab => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap text-left ${
									activeTab === tab.id
										? 'bg-slate-900 text-white shadow-md'
										: 'text-slate-600 hover:bg-slate-200'
								}`}
							>
								<span className="text-xl">{tab.icon}</span>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				{/* Settings Content Area */}
				<div className="flex-1">
					<AnimatePresence mode="wait">
						{/* 1. BUSINESS DEFAULTS TAB */}
						{activeTab === 'business' && (
							<motion.div
								key="business"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm"
							>
								<h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
									Business Defaults
								</h2>
								<form onSubmit={handleSaveSettings} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Company Name
											</label>
											<input
												type="text"
												value={settings.companyName}
												onChange={e =>
													setSettings({
														...settings,
														companyName: e.target.value,
													})
												}
												className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50"
												placeholder="e.g., Apex Construction"
											/>
										</div>
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Business Phone
											</label>
											<input
												type="text"
												value={settings.businessPhone}
												onChange={e =>
													setSettings({
														...settings,
														businessPhone: e.target.value,
													})
												}
												className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50"
												placeholder="(555) 123-4567"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Default Hourly Rate
											</label>
											<div className="relative">
												<span className="absolute left-4 top-3.5 text-slate-400 font-bold">
													$
												</span>
												<input
													type="number"
													value={settings.defaultHourlyRate}
													onChange={e =>
														setSettings({
															...settings,
															defaultHourlyRate: e.target.value,
														})
													}
													className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50"
												/>
											</div>
											<p className="text-xs text-slate-500 mt-2">
												Used to auto-calculate change orders.
											</p>
										</div>
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Minimum Job Size
											</label>
											<div className="relative">
												<span className="absolute left-4 top-3.5 text-slate-400 font-bold">
													$
												</span>
												<input
													type="number"
													value={settings.minimumJobSize}
													onChange={e =>
														setSettings({
															...settings,
															minimumJobSize: e.target.value,
														})
													}
													className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50"
												/>
											</div>
											<p className="text-xs text-slate-500 mt-2">
												Used by the Lead Qualifier tool.
											</p>
										</div>
									</div>

									<div className="pt-6 border-t border-slate-100 flex justify-end">
										<button
											type="submit"
											disabled={isSaving}
											className="bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-md disabled:opacity-70"
										>
											{isSaving ? 'Saving...' : 'Save Business Defaults'}
										</button>
									</div>
								</form>
							</motion.div>
						)}

						{/* 2. AI CONFIGURATION TAB */}
						{activeTab === 'ai' && (
							<motion.div
								key="ai"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm"
							>
								<h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
									AI Output Preferences
								</h2>
								<form onSubmit={handleSaveSettings} className="space-y-6">
									<div>
										<label className="block text-sm font-bold text-slate-700 mb-2">
											Communication Tone
										</label>
										<select
											value={settings.aiTone}
											onChange={e =>
												setSettings({ ...settings, aiTone: e.target.value })
											}
											className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 appearance-none"
										>
											<option value="professional">
												Strictly Professional (Default)
											</option>
											<option value="friendly">
												Warm & Friendly (Good for residential)
											</option>
											<option value="direct">
												Direct & Firm (Good for commercial/B2B)
											</option>
										</select>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Currency Symbol
											</label>
											<select
												value={settings.currency}
												onChange={e =>
													setSettings({ ...settings, currency: e.target.value })
												}
												className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 appearance-none"
											>
												<option value="USD">$ (USD / CAD / AUD)</option>
												<option value="GBP">£ (GBP)</option>
												<option value="EUR">€ (EUR)</option>
											</select>
										</div>
										<div>
											<label className="block text-sm font-bold text-slate-700 mb-2">
												Measurement System
											</label>
											<select
												value={settings.measurementSystem}
												onChange={e =>
													setSettings({
														...settings,
														measurementSystem: e.target.value,
													})
												}
												className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 appearance-none"
											>
												<option value="imperial">
													Imperial (Sq Ft, Inches)
												</option>
												<option value="metric">Metric (Sq Meters, cm)</option>
											</select>
										</div>
									</div>

									<div className="pt-6 border-t border-slate-100 flex justify-end">
										<button
											type="submit"
											disabled={isSaving}
											className="bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-md disabled:opacity-70"
										>
											{isSaving ? 'Saving...' : 'Save AI Configuration'}
										</button>
									</div>
								</form>
							</motion.div>
						)}

						{/* 3. BILLING TAB */}
						{activeTab === 'billing' && (
							<motion.div
								key="billing"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm"
							>
								<h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
									Subscription Plan
								</h2>

								<div className="flex items-center justify-between mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
									<div>
										<p className="text-slate-500 font-medium mb-1">
											Current Status
										</p>
										{isPro ? (
											<span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 font-bold text-sm rounded-full">
												<span className="w-2 h-2 rounded-full bg-green-500"></span>{' '}
												Pro (Active)
											</span>
										) : (
											<span className="inline-block px-3 py-1 bg-slate-200 text-slate-600 font-bold text-sm rounded-full">
												Free Tier
											</span>
										)}
									</div>

									{!isPro && (
										<div className="text-right">
											<p className="text-slate-500 font-medium mb-1">
												Remaining Credits
											</p>
											<p className="text-3xl font-extrabold text-slate-900">
												{profile.free_credits}
											</p>
										</div>
									)}
								</div>

								<div className="space-y-4">
									{isPro ? (
										<>
											<p className="text-slate-600">
												Your payments are securely processed by Lemon Squeezy.
												You can update your payment method, download invoices,
												or cancel your subscription at any time.
											</p>
											<button
												onClick={handleManageBilling}
												disabled={isLoadingPortal}
												className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md disabled:opacity-70 flex items-center gap-2"
											>
												{isLoadingPortal
													? 'Loading Portal...'
													: 'Open Billing Portal ↗'}
											</button>
										</>
									) : (
										<>
											<p className="text-slate-600">
												Upgrade to Pro to unlock unlimited scripts, the
												communication vault, and automated change orders.
											</p>
											<button
												onClick={() => (window.location.href = '/vault')}
												className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-md"
											>
												Upgrade to Pro ($29/mo)
											</button>
										</>
									)}
								</div>
							</motion.div>
						)}

						{/* 4. DATA & PRIVACY TAB */}
						{activeTab === 'data' && (
							<motion.div
								key="data"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="space-y-6"
							>
								<div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
									<h2 className="text-xl font-bold text-slate-800 mb-2">
										Export Communication Vault
									</h2>
									<p className="text-slate-600 mb-6">
										Download a CSV of all your generated proposals, change
										orders, and text scripts.
									</p>
									<button
										onClick={() =>
											toast.success('Export started! Check your email.')
										}
										className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors border border-slate-300"
									>
										Export to CSV
									</button>
								</div>

								<div className="bg-white p-6 md:p-8 rounded-2xl border border-red-100 shadow-sm">
									<h2 className="text-xl font-bold text-red-600 mb-2">
										Danger Zone
									</h2>
									<p className="text-slate-600 mb-6">
										Sign out of your account or permanently delete your data.
									</p>
									<div className="flex gap-4">
										<button
											onClick={handleSignOut}
											className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
										>
											Sign Out
										</button>
										<button
											onClick={() => {
												if (
													window.confirm('Are you sure? This cannot be undone.')
												)
													toast.error('Account deletion requested.');
											}}
											className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
										>
											Delete Account
										</button>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
