import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  User,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Clock,
  Fingerprint,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminSecurityTab() {
  const {
    credentials,
    updateCredentials,
    resetCredentialsToDefault,
    activityLogs,
    adminEmail,
    currentUserEmail,
    verifyEmailAccess,
  } = useAdmin();

  // Form State
  const [newUsername, setNewUsername] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Test credentials state
  const [testUser, setTestUser] = useState('');
  const [testPass, setTestPass] = useState('');
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string } | null>(null);

  // Test email access state
  const [testEmailInput, setTestEmailInput] = useState('');
  const [testEmailResult, setTestEmailResult] = useState<{
    authorized: boolean;
    message: string;
    email: string;
  } | null>(null);

  const handleTestEmail = async (emailToTest: string) => {
    setTestEmailInput(emailToTest);
    const result = await verifyEmailAccess(emailToTest);
    setTestEmailResult(result);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!newUsername.trim()) {
      setFeedback({ type: 'error', message: 'Username cannot be empty.' });
      return;
    }

    if (newUsername.trim().length < 2) {
      setFeedback({ type: 'error', message: 'Username must be at least 2 characters long.' });
      return;
    }

    if (!newPassword) {
      setFeedback({ type: 'error', message: 'Please provide a new password.' });
      return;
    }

    if (newPassword.length < 4) {
      setFeedback({ type: 'error', message: 'Password must be at least 4 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    const res = await updateCredentials(newUsername, newPassword);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: `Credentials updated! Your new login username is "${newUsername.trim()}". Synced to Firestore.`,
      });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset admin credentials back to defaults?')) {
      await resetCredentialsToDefault();
      setNewUsername(credentials.username);
      setNewPassword('');
      setConfirmPassword('');
      setFeedback({
        type: 'success',
        message: 'Admin credentials reset to default configuration and synced to Firestore.',
      });
    }
  };

  const handleTestCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    const userMatch = testUser.trim().toLowerCase() === credentials.username.toLowerCase();
    const passMatch = testPass.trim() === credentials.passcode;

    if (userMatch && passMatch) {
      setTestResult({
        valid: true,
        message: `Verification Success: Username "${testUser}" and password match authorized credentials.`,
      });
    } else {
      setTestResult({
        valid: false,
        message: 'Verification Failed: The entered username and password do not match.',
      });
    }
  };

  // Filter security logs
  const securityLogs = activityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes('credential') ||
      log.action.toLowerCase().includes('login') ||
      log.action.toLowerCase().includes('auth') ||
      log.action.toLowerCase().includes('admin')
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold font-mono tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-sky-500" />
            <span>Admin Security & Credentials</span>
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Configure authentication username and password for the Operations Console.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Grid of Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Change Credentials Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  Update Admin Username & Password
                </h3>
                <p className="text-xs text-slate-500">
                  Changes take effect immediately across all sessions and login screens.
                </p>
              </div>
            </div>

            {feedback && (
              <div
                className={`p-3.5 mb-5 rounded-lg text-xs font-mono flex items-start gap-2.5 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Username field */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="e.g. devmarlow, sharad, or admin"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 font-mono"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-1">
                  Case-insensitive username for login authentication.
                </p>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 4 characters)..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 font-mono pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 font-mono"
                    required
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Save New Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Current Status & Simulator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Credentials Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Active Credentials Summary</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center justify-between">
                <div>
                  <span className="text-sky-700 dark:text-sky-300 font-bold block">Authorized Owner Account:</span>
                  <span className="text-[11px] text-slate-500">Google OAuth restricted to this email</span>
                </div>
                <span className="font-bold text-sky-800 dark:text-sky-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800">
                  {adminEmail}
                </span>
              </div>

              {currentUserEmail && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">Active Authenticated Session:</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                    {currentUserEmail}
                  </span>
                </div>
              )}

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Passcode Username:</span>
                <span className="font-bold text-slate-900 dark:text-sky-400 bg-white dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                  {credentials.username}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Password Status:</span>
                <span className="font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                  {credentials.passcode ? '••••••••' : 'Not Set'}
                </span>
              </div>

              {credentials.lastUpdated && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last Updated: {new Date(credentials.lastUpdated).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Email Access Policy Test Tool */}
          <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-sky-500" />
              <span>Email Authorization Policy Tester</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Confirm which accounts are authorized for administrative operations and which are rejected.
            </p>

            <div className="space-y-2 mb-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleTestEmail('kulkarnisu@gmail.com')}
                  className="py-1.5 px-2 rounded-md bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-left truncate"
                >
                  Test: <span className="text-rose-500 dark:text-rose-400">kulkarnisu</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleTestEmail('devmarlow01@gmail.com')}
                  className="py-1.5 px-2 rounded-md bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-left truncate"
                >
                  Test: <span className="text-emerald-500 dark:text-emerald-400">devmarlow01</span>
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmailInput}
                  onChange={(e) => {
                    setTestEmailInput(e.target.value);
                    setTestEmailResult(null);
                  }}
                  placeholder="Enter email to check policy..."
                  className="w-full px-3 py-1.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 font-mono"
                />
                <button
                  type="button"
                  onClick={() => testEmailInput.trim() && handleTestEmail(testEmailInput.trim())}
                  className="py-1.5 px-3 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer shrink-0"
                >
                  Verify
                </button>
              </div>
            </div>

            {testEmailResult && (
              <div
                className={`p-3 rounded-lg text-xs font-mono border ${
                  testEmailResult.authorized
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    {testEmailResult.authorized ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span>{testEmailResult.authorized ? 'ACCESS PERMITTED' : 'ACCESS DENIED'}</span>
                  </span>
                  <span className="text-[10px] opacity-75">{testEmailResult.email}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{testEmailResult.message}</p>
              </div>
            )}
          </div>

          {/* Test Credentials Box */}
          <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
              <span>Credential Verification Tool</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Test your username and password here to confirm they validate prior to logging out.
            </p>

            <form onSubmit={handleTestCredentials} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={testUser}
                  onChange={(e) => {
                    setTestUser(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder="Test Username..."
                  className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 font-mono"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  value={testPass}
                  onChange={(e) => {
                    setTestPass(e.target.value);
                    setTestResult(null);
                  }}
                  placeholder="Test Password..."
                  className="w-full px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                Verify Credentials
              </button>
            </form>

            {testResult && (
              <div
                className={`mt-3 p-3 rounded-lg text-xs font-mono flex items-start gap-2 ${
                  testResult.valid
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {testResult.valid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Activity Logs */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Security & Authentication Audit Trail</span>
        </h3>

        {securityLogs.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono">No recent security events recorded.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono text-xs">
            {securityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 mr-2">{log.action}:</span>
                  <span className="text-slate-500">{log.details}</span>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
