import { ENGAGEMENT_MODELS } from '../data/engagement';
import { ArrowRight, CheckCircle2, Shield, Calendar, Users2, type LucideIcon } from 'lucide-react';

interface EngagementProps {
  onOpenConsultation: (modelTitle?: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  advisory: Shield,
  'project-based': Calendar,
  'continuous-partnership': Users2,
};

export default function EngagementModels({ onOpenConsultation }: EngagementProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <span>Collaboration Frameworks</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Engagement Models
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Flexible collaboration structures designed to support your team&apos;s specific stage, roadmap, and delivery cadence.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ENGAGEMENT_MODELS.map((model) => {
            const Icon = iconMap[model.id] || Shield;
            const isFeatured = model.id === 'project-based';

            return (
              <div
                key={model.id}
                id={`engagement-model-${model.id}`}
                className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 border ${
                  isFeatured
                    ? 'bg-white dark:bg-[#0C111A] border-sky-500 shadow-sm ring-1 ring-sky-500/20'
                    : 'bg-white/80 dark:bg-[#0C111A]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>

                    {isFeatured && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40 uppercase">
                        MOST COMMON
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight mb-1">
                    {model.title}
                  </h3>

                  <div className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 mb-3">
                    {model.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {model.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0A0C10] border border-slate-200/80 dark:border-slate-800 mb-4">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                      Ideal For:
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {model.idealFor}
                    </p>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Scope Includes:
                    </span>
                    <ul className="space-y-1.5">
                      {model.keyOfferings.map((offering, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Format: </span>
                    {model.engagementFormat}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`Engagement Model: ${model.title}`)}
                    className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                      isFeatured
                        ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'
                    }`}
                  >
                    <span>{model.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
