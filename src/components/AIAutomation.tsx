import { useState } from 'react';
import {
  Search,
  FileCode2,
  Layers,
  LineChart,
  Sliders,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { AI_WORKFLOW_STAGES } from '../data/aiAutomation';

interface AIAutomationProps {
  onOpenConsultation: (topic?: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Search,
  FileCode2,
  Layers,
  LineChart,
  Sliders,
};

export default function AIAutomation({ onOpenConsultation }: AIAutomationProps) {
  const [activeStageId, setActiveStageId] = useState<string>('discover');

  const currentStage =
    AI_WORKFLOW_STAGES.find((s) => s.id === activeStageId) || AI_WORKFLOW_STAGES[0];

  return (
    <section
      id="ai-automation"
      className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-100 dark:text-sky-400 dark:bg-sky-500/10 border border-sky-300/60 dark:border-sky-500/30">
            <Sparkles className="w-3 h-3 text-sky-500" />
            <span>AI QE Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            AI-Powered Software Testing & Automation
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            AI is changing how software is designed, tested, automated, and delivered. We help engineering teams deploy AI where it generates practical value — keeping engineering judgment, deterministic validation, and security at the center.
          </p>
        </div>

        {/* Interactive 5-Stage Stepper Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800">
            {AI_WORKFLOW_STAGES.map((stage) => {
              const Icon = iconMap[stage.icon] || Sparkles;
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  id={`ai-step-${stage.id}`}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-slate-950' : 'text-sky-500'}`}>
                      [{stage.number}]
                    </span>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">{stage.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <div className="bg-slate-50 dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500 text-slate-950">
                  STAGE {currentStage.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                  {currentStage.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                {currentStage.shortDesc}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentStage.fullDesc}
              </p>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Key Outcomes & Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.keyOutcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right engineering insight box */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-slate-900 dark:bg-[#0A0C10] text-white border border-slate-800 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    ENGINEERING GUARDRAILS
                  </span>
                  <span className="text-[10px]">PROD_READY</span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">
                  Architecture & Safety Verification
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentStage.engineeringInsight}
                </p>

                <div className="p-2.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 space-y-1">
                  <div className="font-mono text-sky-400 font-bold text-[11px]">Deterministic QA First</div>
                  <div className="text-[11px]">We eliminate AI hallucinations through strict assertions and CI gate validation.</div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(`AI Workflow: ${currentStage.name}`)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-xs"
                >
                  <span>Discuss AI in Your Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Small Crucial Note */}
        <div className="mt-6 p-3 rounded-lg bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-center text-xs text-slate-600 dark:text-slate-400 font-mono">
          <ShieldAlert className="w-4 h-4 text-sky-500 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            AI augments engineering expertise &mdash; it does not replace engineering judgment.
          </span>
        </div>
      </div>
    </section>
  );
}
