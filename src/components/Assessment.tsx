import { useState } from 'react';
import { ASSESSMENT_QUESTIONS, MATURITY_RESULTS } from '../data/assessment';
import { MaturityResult } from '../types';
import { CheckCircle2, RotateCcw, ArrowRight, Activity, Sparkles } from 'lucide-react';

interface AssessmentProps {
  onOpenConsultation: (maturitySummary?: string) => void;
}

export default function Assessment({ onOpenConsultation }: AssessmentProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 1,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const totalScore = (Object.values(selectedAnswers) as number[]).reduce(
    (acc: number, score: number) => acc + score,
    0
  );

  const calculateResult = (score: number): MaturityResult => {
    if (score <= 9) return MATURITY_RESULTS['Getting Started'];
    if (score <= 14) return MATURITY_RESULTS['Developing'];
    if (score <= 18) return MATURITY_RESULTS['Scaling'];
    return MATURITY_RESULTS['AI-Augmented'];
  };

  const result = calculateResult(totalScore);

  const handleSelectOption = (questionId: number, score: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const resetAssessment = () => {
    setSelectedAnswers({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
    setCurrentStep(0);
    setHasCompleted(false);
  };

  const currentQ = ASSESSMENT_QUESTIONS[currentStep];

  return (
    <section id="assessment" className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800">
            <Activity className="w-3 h-3" />
            <span>Interactive Self-Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            How Mature Is Your QA & Automation?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Answer 5 quick questions to instantly benchmark your team&apos;s testing maturity and receive targeted Quality Engineering recommendations.
          </p>
        </div>

        {/* Assessment Card Container */}
        <div className="bg-slate-50 dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-2xs">
          {!hasCompleted ? (
            <div className="space-y-5">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">
                    Question {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {ASSESSMENT_QUESTIONS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentStep
                          ? 'w-6 bg-sky-500'
                          : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Go to question ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Title */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight mb-0.5">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.score;
                  return (
                    <button
                      key={opt.score}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.score)}
                      className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-white dark:bg-[#0A0C10] border-sky-500 shadow-2xs ring-1 ring-sky-500/30'
                          : 'bg-white/60 dark:bg-[#0A0C10]/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-[#0A0C10] hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500 text-slate-950'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>

                {currentStep < ASSESSMENT_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-all shadow-2xs"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHasCompleted(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-2xs"
                  >
                    <span>View Maturity Score & Analysis</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-sky-600 dark:text-sky-400">
                    Maturity Benchmark Result
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-[#F8FAFC] tracking-tight mt-0.5">
                    Level: {result.level}
                  </h3>
                </div>

                <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-[#0A0C10] font-mono text-center shrink-0 border border-slate-700 dark:border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Calculated Score</div>
                  <div className="text-base font-bold text-sky-400">{totalScore} / 20 points</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.summary}
              </div>

              {/* Actionable Priorities */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                  Recommended Immediate Priorities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.keyPriorities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white dark:bg-[#0A0C10] border border-slate-200/80 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation Strip */}
              <div className="p-3.5 rounded-lg bg-sky-50/80 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-sky-700 dark:text-sky-400 block">
                    Recommended Engagement Path:
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {result.recommendedModel}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConsultation(`QA Maturity Assessment: ${result.level} (${totalScore}/20)`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shrink-0 shadow-2xs"
                >
                  <span>Discuss Your QA Maturity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Retake button */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={resetAssessment}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
