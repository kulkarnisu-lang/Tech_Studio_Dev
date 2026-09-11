import React, { useState } from 'react';
import { Save, RefreshCw, CheckCircle, Building, User, Mail, MapPin, Globe, Award } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CompanyConfig } from '../../types';

export default function AdminCompanyTab() {
  const { companyConfig, updateCompanyConfig, resetToDefaults } = useAdmin();
  const [formData, setFormData] = useState<CompanyConfig>(companyConfig);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyConfig(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = async () => {
    if (window.confirm('Reset all company and leadership settings to factory defaults?')) {
      await resetToDefaults();
      setFormData(companyConfig);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-sky-500" />
            <span>Company Profile & Principal Leadership</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Updating these fields immediately reflects across the live website (Navbar, About profile, Consultation modals, and Footer).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30 animate-in fade-in">
              <CheckCircle className="w-4 h-4" />
              <span>Saved & Live!</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Firm Identity */}
        <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Building className="w-3.5 h-3.5" />
            <span>1. Brand & Positioning</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                Primary Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
              Positioning Statement
            </label>
            <textarea
              rows={2}
              value={formData.positioning}
              onChange={(e) => setFormData({ ...formData, positioning: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500 leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                Consultation Direct Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                HQ & Operations Location
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Founder & Principal Leadership */}
        <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>2. Founder & Principal Consultant Profile</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 font-bold">
              Active Executive Card
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                Founder / Principal Name
              </label>
              <input
                type="text"
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono font-bold focus:outline-hidden focus:border-sky-500"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                Current standard: Dev Marlow / Sharad
              </span>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                Executive Title
              </label>
              <input
                type="text"
                value={formData.founderTitle}
                onChange={(e) => setFormData({ ...formData, founderTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
              Professional Biography & Engineering Background
            </label>
            <textarea
              rows={3}
              value={formData.founderBio}
              onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500 leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-mono font-bold uppercase text-[10px] mb-1.5">
                GitHub Organization / Profile
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
