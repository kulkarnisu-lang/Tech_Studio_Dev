import React, { useState } from 'react';
import { Terminal, Shield, Lock, ArrowLeft, KeyRound, AlertCircle, CheckCircle2, User, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const { login, closeAdmin, companyConfig, credentials } = useAdmin();
  const [username, setUsername] = useState(credentials.username);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(username, passcode);
      if (!success) {
        setError(`Invalid credentials. Current admin username: "${credentials.username}". Please verify your password.`);
        setIsSubmitting(false);
      }
    }, 200);
  };

  const handleQuickDemo = () => {
    setUsername(credentials.username);
    setPasscode(credentials.passcode);
    setError('');
    login(credentials.username, credentials.passcode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <div className="w-full max-w-md">
        {/* Top return link */}
        <div className="mb-6 flex justify-between items-center">
          <button
            type="button"
            onClick={closeAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>

          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Restricted Area</span>
          </span>
        </div>

        {/* Login Box */}
        <div className="bg-[#0C111A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400" />

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-mono font-bold shadow-md shadow-sky-500/20">
              <Terminal className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold text-white tracking-tight">{companyConfig.name}</h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-950 text-sky-400 border border-sky-800">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Operations & Consultation CRM</p>
            </div>
          </div>

          {/* Info note */}
          <div className="p-3.5 mb-6 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Internal Quality Engineering Console</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Sign in with your configured admin username and password. You can customize them in the Security tab once logged in.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="admin-username" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. admin or devmarlow..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono"
                  required
                />
                <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter password..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-2.5 rounded-md bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            </button>
          </form>

          {/* Demo Helper notice (if passcode is configured) */}
          {credentials.passcode ? (
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-mono text-[11px]">Authorized User:</span>
                <span className="font-mono text-xs text-sky-400 font-semibold">{credentials.username}</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2 px-3 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700/60"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quick Sign-In ({credentials.username})</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
              <p className="text-slate-400 font-mono text-[11px]">
                Enter your administrative credentials to continue.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-500 font-mono">
          <span>Active Principal: {companyConfig.founderName}</span>
        </div>
      </div>
    </div>
  );
}
