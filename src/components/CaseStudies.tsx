import { CASE_STUDIES_DATA } from '../data/caseStudies';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: (topic?: string) => void;
}

export default function CaseStudies({ onOpenConsultation }: CaseStudiesProps) {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Problem & Outcome Scenarios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Selected Challenges & Solutions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Practical examples of how structured Quality Engineering and automation solve complex engineering bottlenecks.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES_DATA.map((cs) => (
            <div
              key={cs.id}
              id={`case-study-${cs.id}`}
              className="rounded-xl p-5 sm:p-6 bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-sky-400 border border-slate-300/80 dark:border-slate-800">
                    {cs.tag}
                  </span>
                  {cs.isPlaceholder && (
                    <span className="text-[10px] font-mono text-slate-400 border border-dashed border-slate-400/60 px-2 py-0.5 rounded">
                      Editable Template
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F8FAFC] mb-3 tracking-tight">
                  {cs.title}
                </h3>

                {/* Problem Section */}
                <div className="mb-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    Problem & Risk Factors:
                  </span>
                  <ul className="space-y-1">
                    {cs.problem.map((p, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed"
                      >
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Approach Section */}
                <div className="mb-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    QE Solution & Approach:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-[#0A0C10] p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
                    {cs.approach}
                  </p>
                </div>

                {/* Outcome Section */}
                <div className="mb-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Measurable Result:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {cs.outcome}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="pt-3.5 border-t border-slate-200/80 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {cs.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 text-center"
                    >
                      <div className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(`Discuss Scenario: ${cs.title}`)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <span>Discuss Similar Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
