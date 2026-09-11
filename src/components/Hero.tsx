import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers, Cpu, ShieldCheck, Zap, Rocket } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

const FLOW_STEPS = [
  {
    id: 'software',
    title: 'Software',
    label: 'Codebases & Features',
    detail: 'Modern web, mobile, API, and cloud services under active development.',
    icon: Layers,
    color: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80',
    iconColor: 'text-slate-600 dark:text-slate-300',
  },
  {
    id: 'qe',
    title: 'Quality Engineering',
    label: 'Shift-Left Architecture',
    detail: 'Strategy, risk-based analysis, acceptance gates, and non-functional engineering.',
    icon: ShieldCheck,
    color: 'border-indigo-400/40 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/30',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'automation',
    title: 'Test Automation',
    label: 'Modular Frameworks',
    detail: 'Maintainable UI, API, integration suites with parallel execution and zero flakiness.',
    icon: Cpu,
    color: 'border-cyan-400/40 dark:border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/30',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    label: 'Intelligent Augmentation',
    detail: 'AI-assisted test generation, synthetic data, failure triage, and regression pruning.',
    icon: Sparkles,
    color: 'border-emerald-400/40 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'continuous-quality',
    title: 'Continuous Quality',
    label: 'CI/CD Pipeline Gates',
    detail: 'Zero-touch quality checks on pull requests with instant feedback loops.',
    icon: Zap,
    color: 'border-amber-400/40 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'releases',
    title: 'Faster, More Reliable Releases',
    label: 'Release Confidence',
    detail: 'Rapid, predictable deployment cycles with near-zero defect escape to production.',
    icon: Rocket,
    color: 'border-blue-400/50 dark:border-blue-500/40 bg-blue-50/80 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
];

export default function Hero({ onOpenConsultation }: HeroProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeStep = FLOW_STEPS[activeStepIndex];

  return (
    <section
      id="home"
      className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gradient-to-br dark:from-[#0A0C10] dark:via-[#111827] dark:to-[#0A0C10]"
    >
      {/* Subtle background tech grid & glowing orb */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none dark:block hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Supporting Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-sky-600 dark:text-sky-400 font-bold">TECH_STUDIO</span>
              <span className="text-slate-400">&bull;</span>
              <span>Quality Engineering &bull; Test Automation &bull; AI QA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] leading-[1.1]">
              Build Better Software.<br />
              Test <span className="text-sky-500">Smarter.</span><br />
              Automate More.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              We help engineering teams improve quality, accelerate releases, and build scalable automation through modern Quality Engineering and AI-powered testing solutions.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-primary-cta"
                type="button"
                onClick={() => onOpenConsultation('Consultation Request')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-sm text-slate-950 bg-sky-500 hover:bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-md active:scale-98"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-secondary-cta"
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-2xs"
              >
                <span>Explore Our Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <div className="hidden sm:flex items-center gap-2 px-3 text-slate-500 text-xs font-mono border-l border-slate-200 dark:border-slate-800 ml-1">
                <span>Vercel Deploy Ready</span>
              </div>
            </div>

            {/* Micro value highlights */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Zero vendor lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Production AI guardrails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Shift-left quality gates</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Density Transformation Flow Visual */}
          <div className="lg:col-span-5">
            <div
              className="bg-white/95 dark:bg-[#0C111A]/95 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 backdrop-blur-md relative overflow-hidden group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 pl-2">
                    qe-pipeline.matrix
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200/60 dark:border-sky-800/60">
                  Interactive Node
                </span>
              </div>

              {/* Vertical Step Flow with interactive nodes */}
              <div className="space-y-1.5">
                {FLOW_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === activeStepIndex;
                  return (
                    <div key={step.id} className="relative">
                      {/* Step Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveStepIndex(idx);
                          setIsAutoPlaying(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-sky-50 dark:bg-sky-500/15 border-sky-400 dark:border-sky-500/60 shadow-xs ring-1 ring-sky-500/30'
                            : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                              isActive
                                ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300/40 dark:border-slate-700'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                                [{`0${idx + 1}`}]
                              </span>
                              <span
                                className={`text-xs font-bold ${
                                  isActive
                                    ? 'text-slate-900 dark:text-sky-300'
                                    : 'text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                {step.title}
                              </span>
                              {isActive && (
                                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-sky-500 text-slate-950 font-bold">
                                  inspecting
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {step.label}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                            isActive ? 'text-sky-500 rotate-90' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Connecting Dashed Line between steps */}
                      {idx < FLOW_STEPS.length - 1 && (
                        <div className="ml-5.5 h-2 border-l border-dashed border-slate-300 dark:border-slate-700" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Active Step Detailed Inspector Box */}
              <div className="mt-3 p-3 rounded-lg bg-slate-900 dark:bg-[#0A0C10] text-white border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-mono mb-1">
                  <span className="text-[10px] uppercase font-bold text-sky-400">
                    STAGE 0{activeStepIndex + 1} &bull; {activeStep.title}
                  </span>
                  <span className="text-sky-400 flex items-center gap-1 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping inline-block" />
                    Live Architecture
                  </span>
                </div>
                <p className="text-slate-300 font-medium text-[11px] leading-relaxed">
                  {activeStep.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
