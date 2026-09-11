import { useState } from 'react';
import { APPROACH_STEPS } from '../data/approach';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ApproachProps {
  onOpenConsultation: (topic?: string) => void;
}

export default function Approach({ onOpenConsultation }: ApproachProps) {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const currentStep = APPROACH_STEPS[selectedStepIndex];

  return (
    <section id="approach" className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Structured Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Our Delivery Approach
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A disciplined, iterative Quality Engineering process designed to deliver quick wins and lasting capabilities.
          </p>
        </div>

        {/* Step Numbers Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {APPROACH_STEPS.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-500 shadow-sm font-bold'
                    : 'bg-slate-50 dark:bg-[#0C111A] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-slate-950' : 'text-sky-500'
                    }`}
                  >
                    PHASE {step.stepNumber}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                  )}
                </div>
                <div className="font-bold text-xs sm:text-sm tracking-tight">{step.name}</div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Detailed Stage Card */}
        <div className="bg-slate-50 dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-sky-400 dark:bg-[#0A0C10] dark:text-sky-400 border border-slate-700 dark:border-slate-800">
                  STAGE {currentStep.stepNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                  {currentStep.name} &mdash; <span className="text-slate-500 dark:text-slate-400 text-lg font-normal">{currentStep.subtitle}</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Core Engineering Activities:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStep.activities.map((act, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Phase Deliverable & Outcome
              </div>

              <div className="p-3 rounded-lg bg-sky-50/70 dark:bg-sky-500/10 border border-sky-200/60 dark:border-sky-500/30 text-sky-950 dark:text-sky-200 font-semibold text-xs leading-relaxed">
                {currentStep.output}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Every phase produces tangible, documented engineering assets and clear milestones to ensure complete predictability.
              </p>

              <button
                type="button"
                onClick={() => onOpenConsultation(`Approach Phase: ${currentStep.name}`)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-2xs"
              >
                <span>Discuss Phase {currentStep.stepNumber} Execution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
