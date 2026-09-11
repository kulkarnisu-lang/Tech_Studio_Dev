import React, { useState } from 'react';
import {
  Terminal,
  Shield,
  Lock,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  User,
  Eye,
  EyeOff,
  LogIn,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const { login, loginWithGoogle, verifyEmailAccess, closeAdmin, companyConfig, credentials, adminEmail } = useAdmin();
  const [username, setUsername] = useState(credentials.username);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [testCheckResult, setTestCheckResult] = useState<{
    authorized: boolean;
    message: string;
    email: string;
  } | null>(null);

  const runEmailCheck = async (emailToTest: string) => {
    const res = await verifyEmailAccess(emailToTest);
    setTestCheckResult(res);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(username, passcode);
      if (!success) {
        setError('Invalid administrative credentials. Access is restricted.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsGoogleLoading(true);
    const res = await loginWithGoogle();
    setIsGoogleLoading(false);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <div className="w-full max-w-md">
        {/* Top return link */}
        <div className="mb-6 flex justify-between items-center">
          <button
            type="button"
            onClick={closeAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </button>

          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>Restricted Access</span>
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
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Operations & Consultation Console</p>
            </div>
          </div>

          {/* Access Restriction Notice */}
          <div className="p-3.5 mb-6 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Owner Verification Required</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              This administrative console is restricted exclusively to the site owner:{' '}
              <span className="text-sky-400 font-mono font-bold">{adminEmail}</span>.
            </p>
          </div>

          {/* Primary Action: Google Sign-In with Owner Restriction */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 text-slate-900 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2.5 border border-slate-300"
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{isGoogleLoading ? 'Verifying...' : `Sign In with Google (${adminEmail})`}</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[11px] font-mono uppercase">
              Or Administrator Passcode
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
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
                  placeholder="Admin username..."
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
                  placeholder="Enter administrator password..."
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
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In with Passcode'}</span>
            </button>
          </form>

          {/* Access Policy Verification Tester */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-mono font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Test Email Authorization</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Policy Test</span>
            </div>

            <p className="text-[11px] text-slate-400 font-mono mb-2.5">
              Verify whether an account has administrator privileges under current access rules:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => runEmailCheck('kulkarnisu@gmail.com')}
                className="py-2 px-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-[11px] font-mono text-slate-300 transition-colors cursor-pointer text-left flex items-center justify-between group"
                title="Test kulkarnisu@gmail.com"
              >
                <div className="truncate">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">Check Visitor</span>
                  <span className="text-rose-300 group-hover:text-rose-200 font-medium truncate block">kulkarnisu@gmail.com</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0 ml-1">Run →</span>
              </button>

              <button
                type="button"
                onClick={() => runEmailCheck('devmarlow01@gmail.com')}
                className="py-2 px-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-[11px] font-mono text-slate-300 transition-colors cursor-pointer text-left flex items-center justify-between group"
                title="Test devmarlow01@gmail.com"
              >
                <div className="truncate">
                  <span className="text-slate-500 block text-[9px] uppercase font-bold">Check Owner</span>
                  <span className="text-emerald-300 group-hover:text-emerald-200 font-medium truncate block">devmarlow01@gmail.com</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono shrink-0 ml-1">Run →</span>
              </button>
            </div>

            {testCheckResult && (
              <div
                className={`p-3 rounded-lg border text-xs font-mono space-y-1.5 transition-all ${
                  testCheckResult.authorized
                    ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    {testCheckResult.authorized ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{testCheckResult.authorized ? 'ACCESS AUTHORIZED' : 'ACCESS DENIED'}</span>
                  </span>
                  <span className="text-[10px] font-mono opacity-80">{testCheckResult.email}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-95">{testCheckResult.message}</p>
                <div className="pt-1 border-t border-current/20 text-[10px] opacity-75">
                  Policy rule: Only <span className="font-bold underline">{adminEmail}</span> is granted administrative access.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
          <Shield className="w-3 h-3 text-sky-500" />
          <span>Restricted to {adminEmail}</span>
        </div>
      </div>
    </div>
  );
}

