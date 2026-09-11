import { WHY_US_ITEMS } from '../data/whyUs';
import { Terminal, Layers, Sparkles, TrendingUp, CheckSquare, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  Layers,
  Sparkles,
  TrendingUp,
  CheckSquare,
};

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Engineering Principles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Why Choose Us
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Built on engineering discipline, maintainability, and measurable outcomes &mdash; not marketing buzzwords.
          </p>
        </div>

        {/* 5 Differentiation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US_ITEMS.map((item, idx) => {
            const Icon = iconMap[item.icon] || Terminal;
            const isFullWidthSpan = idx === 4;

            return (
              <div
                key={item.id}
                id={`why-us-${item.id}`}
                className={`p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all ${
                  isFullWidthSpan ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight mb-1">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-sky-600 dark:text-sky-400 mb-2.5">
                  {item.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
