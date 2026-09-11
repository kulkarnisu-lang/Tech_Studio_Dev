import { useState } from 'react';
import {
  Timer,
  Wrench,
  Sparkles,
  ShieldAlert,
  RefreshCw,
  Users,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutions';

interface SolutionsProps {
  onOpenConsultation: (problemTitle?: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Timer,
  Wrench,
  Sparkles,
  ShieldAlert,
  RefreshCw,
  Users,
};

export default function Solutions({ onOpenConsultation }: SolutionsProps) {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>('slow-regression');

  return (
    <section id="solutions" className="py-16 sm:py-20 bg-slate-50/60 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <span>Challenge-Driven Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            What Are You Trying to Solve?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Select your primary quality or automation bottleneck to see our tailored engineering approach and solution architecture.
          </p>
        </div>

        {/* 6 Problem Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS_DATA.map((item) => {
            const Icon = iconMap[item.icon] || Timer;
            const isSelected = selectedSolutionId === item.id;

            return (
              <div
                key={item.id}
                id={`solution-card-${item.id}`}
                onClick={() => setSelectedSolutionId(item.id)}
                className={`rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-[#0C111A] border-sky-500 shadow-sm ring-1 ring-sky-500/30'
                    : 'bg-white/80 dark:bg-[#0C111A]/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <div>
                  {/* Icon & Problem Header */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-800 dark:text-sky-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                      Challenge Identified
                    </span>
                  </div>

                  {/* Problem Quote */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-1.5 tracking-tight">
                    &ldquo;{item.problemHeadline}&rdquo;
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.challengeDetail}
                  </p>

                  {/* Solution Approach Header */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0A0C10] border border-slate-200/80 dark:border-slate-800 mb-4">
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 block mb-1">
                      Tailored Solution Strategy:
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                      {item.solutionTitle}
                    </p>
                  </div>

                  {/* Approach steps bullets */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                      Engineering Approach:
                    </span>
                    <ul className="space-y-1">
                      {item.approach.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3 h-3 text-sky-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outcome & CTA */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-2.5">
                    <span className="font-bold text-slate-900 dark:text-white">Outcome: </span>
                    {item.keyOutcome}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenConsultation(`Challenge: ${item.problemHeadline}`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-white border border-slate-700 dark:border-slate-800 transition-all shadow-2xs"
                  >
                    <span>Discuss Architecture</span>
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
