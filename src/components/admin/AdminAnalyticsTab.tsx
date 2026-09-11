import React from 'react';
import { BarChart3, Activity, Clock, ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminAnalyticsTab() {
  const { inquiries, activityLogs, companyConfig } = useAdmin();

  // Aggregate service interests
  const serviceDistribution = inquiries.reduce<Record<string, number>>((acc, item) => {
    acc[item.serviceInterest] = (acc[item.serviceInterest] || 0) + 1;
    return acc;
  }, {});

  const totalInquiries = inquiries.length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-xs font-bold uppercase mb-2">
            <Activity className="w-4 h-4" />
            <span>Consultation Lead Velocity</span>
          </div>
          <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
            {totalInquiries}
          </div>
          <div className="text-xs text-slate-500 mt-1">Total inquiries tracked in internal CRM</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
            <UserCheck className="w-4 h-4" />
            <span>Active Quality Principal</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white truncate">
            {companyConfig.founderName}
          </div>
          <div className="text-xs text-slate-500 mt-1">{companyConfig.founderTitle}</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Average Response SLA</span>
          </div>
          <div className="text-3xl font-mono font-black text-slate-900 dark:text-white">
            &lt; 4 Hours
          </div>
          <div className="text-xs text-slate-500 mt-1">Target for high-priority QE inquiries</div>
        </div>
      </div>

      {/* Service Interest Breakdown */}
      <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-500" />
          <span>Demand by Practice Area</span>
        </h3>

        <div className="space-y-3">
          {Object.entries(serviceDistribution).map(([service, count]) => {
            const percentage = totalInquiries > 0 ? Math.round((count / totalInquiries) * 100) : 0;
            return (
              <div key={service} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{service}</span>
                  <span className="text-slate-500">
                    {count} inquiries ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Log Audit Trail */}
      <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>Internal Audit Log & System Events</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {activityLogs.length} events recorded
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-80 overflow-y-auto">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs font-mono">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-normal">by {log.user}</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                  {log.details}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 self-center">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
