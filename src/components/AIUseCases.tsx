import { useState } from 'react';
import {
  FileSpreadsheet,
  Code2,
  Database,
  AlertTriangle,
  Zap,
  FileText,
  Network,
  BookOpenCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { AI_USE_CASES } from '../data/aiAutomation';

interface AIUseCasesProps {
  onOpenConsultation: (useCaseTitle?: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  FileSpreadsheet,
  Code2,
  Database,
  AlertTriangle,
  Zap,
  FileText,
  Network,
  BookOpenCheck,
};

export default function AIUseCases({ onOpenConsultation }: AIUseCasesProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'test-case-generation': true,
    'failure-analysis': true,
  });

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <span>Practical Implementation Matrix</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Where AI Accelerates Quality Engineering
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Targeted AI workflows that compress cycle times while maintaining deterministic engineering rigor.
          </p>
        </div>

        {/* 8 Expandable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_USE_CASES.map((uc) => {
            const Icon = iconMap[uc.icon] || Sparkles;
            const isExpanded = !!expandedCards[uc.id];

            return (
              <div
                key={uc.id}
                id={`ai-use-case-${uc.id}`}
                className="bg-white dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xs hover:border-sky-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200/80 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleCard(uc.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-1.5 tracking-tight">
                    {uc.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {uc.shortDesc}
                  </p>

                  {/* Expandable Area */}
                  {isExpanded && (
                    <div className="space-y-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs animate-in fade-in duration-150">
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed italic">
                        {uc.detailedOverview}
                      </p>

                      <div className="space-y-1">
                        <span className="font-mono font-bold text-[10px] text-sky-600 dark:text-sky-400 uppercase block">
                          Applications:
                        </span>
                        {uc.practicalApplication.map((app, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                            <span className="text-sky-500 font-bold">&bull;</span>
                            <span>{app}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded bg-sky-50/70 dark:bg-sky-500/10 border border-sky-200/50 dark:border-sky-500/20 text-[11px] text-sky-900 dark:text-sky-300">
                        <span className="font-bold">Benefit: </span>
                        {uc.engineeringBenefit}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`Use Case: ${uc.title}`)}
                    className="w-full text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center justify-between py-0.5"
                  >
                    <span>Discuss implementation</span>
                    <ArrowRight className="w-3 h-3" />
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
