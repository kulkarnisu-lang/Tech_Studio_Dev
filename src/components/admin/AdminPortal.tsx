import React, { useState } from 'react';
import {
  Terminal,
  ArrowLeft,
  LogOut,
  Mail,
  Building,
  Layers,
  HelpCircle,
  BarChart3,
  Shield,
  ExternalLink,
  KeyRound,
  Database,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLogin from './AdminLogin';
import AdminInquiriesTab from './AdminInquiriesTab';
import AdminCompanyTab from './AdminCompanyTab';
import AdminServicesTab from './AdminServicesTab';
import AdminFaqsTab from './AdminFaqsTab';
import AdminAnalyticsTab from './AdminAnalyticsTab';
import AdminSecurityTab from './AdminSecurityTab';
import ThemeToggle from '../ThemeToggle';

type AdminTab = 'inquiries' | 'company' | 'services' | 'faqs' | 'analytics' | 'security';

export default function AdminPortal() {
  const { isAuthenticated, logout, closeAdmin, companyConfig, inquiries, isFirestoreConnected } = useAdmin();
  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');

  // If not authenticated, show login gate
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const unreadCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#0A0C10] dark:text-[#F8FAFC] flex flex-col font-sans transition-colors duration-200">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0C111A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Mode */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Return to public website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Website</span>
              <span className="sm:hidden">Exit</span>
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-bold font-mono shadow-xs">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-mono text-sm font-extrabold tracking-tight block text-slate-900 dark:text-white">
                  {companyConfig.name}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400">
                  Operations Console
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`hidden sm:flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md border ${
                isFirestoreConnected
                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                  : 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
              }`}
              title={isFirestoreConnected ? 'Firebase Firestore cloud connected & synced in real-time' : 'Operating in offline/local fallback'}
            >
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isFirestoreConnected ? 'Firestore Cloud Synced' : 'Local Cache'}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>{companyConfig.founderName}</span>
            </div>

            <ThemeToggle />

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-mono font-bold text-xs uppercase tracking-wider border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grow flex flex-col">
        {/* Navigation Tabs Bar */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <nav className="flex items-center gap-2 sm:gap-4 -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'inquiries'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Inquiries & Leads</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('company')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'company'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Company & Leadership</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'services'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Services Offerings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('faqs')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'faqs'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ Knowledge Base</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Audit</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`inline-flex items-center gap-2 py-3 px-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'security'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>Security & Access</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grow">
          {activeTab === 'inquiries' && <AdminInquiriesTab />}
          {activeTab === 'company' && <AdminCompanyTab />}
          {activeTab === 'services' && <AdminServicesTab />}
          {activeTab === 'faqs' && <AdminFaqsTab />}
          {activeTab === 'analytics' && <AdminAnalyticsTab />}
          {activeTab === 'security' && <AdminSecurityTab />}
        </div>
      </div>
    </div>
  );
}
