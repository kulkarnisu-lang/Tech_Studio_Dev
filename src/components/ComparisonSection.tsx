import { useState } from 'react';
import { COMPARISON_DATA } from '../data/comparison';
import { ArrowRight, AlertCircle, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ComparisonProps {
  onOpenConsultation: (topic?: string) => void;
}

export default function ComparisonSection({ onOpenConsultation }: ComparisonProps) {
  const [viewMode, setViewMode] = useState<'both' | 'traditional' | 'modern'>('both');

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span>Evolution & Paradigm Shift</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            From Manual Bottlenecks to Intelligent QE
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            How forward-thinking engineering orgs transition from slow staging verification into proactive, automated, continuous Quality Engineering.
          </p>

          {/* Interactive Toggle Pill */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-lg bg-slate-100 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('both')}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'both'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setViewMode('traditional')}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'traditional'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Traditional QA
              </button>
              <button
                type="button"
                onClick={() => setViewMode('modern')}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  viewMode === 'modern'
                    ? 'bg-sky-500 text-slate-950 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                AI QE
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Layout */}
        <div className="space-y-3.5 max-w-5xl mx-auto">
          {/* Header titles for side-by-side on desktop */}
          {viewMode === 'both' && (
            <div className="hidden md:grid grid-cols-2 gap-5 pb-1">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs uppercase font-bold px-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Traditional QA (Bottleneck Approach)</span>
              </div>
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-xs uppercase font-bold px-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Modern AI-Augmented QE (Continuous Quality)</span>
              </div>
            </div>
          )}

          {COMPARISON_DATA.points.map((point, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-200/60 dark:border-slate-800/80">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {point.category}
                </span>
                <span className="text-[10px] font-mono font-semibold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-2 py-0.5 rounded border border-sky-200/60 dark:border-sky-500/30">
                  Impact: {point.impact}
                </span>
              </div>

              <div
                className={`grid gap-3 sm:gap-4 ${
                  viewMode === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {/* Traditional Side */}
                {(viewMode === 'both' || viewMode === 'traditional') && (
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0A0C10] border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-200 text-xs flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200 dark:border-rose-800/40">
                      <span className="text-xs font-bold">&times;</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase font-bold text-rose-600 dark:text-rose-400 mb-1 md:hidden">
                        Traditional QA:
                      </span>
                      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {point.traditional}
                      </p>
                    </div>
                  </div>
                )}

                {/* Modern Side */}
                {(viewMode === 'both' || viewMode === 'modern') && (
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0A0C10] border border-sky-200/80 dark:border-sky-500/40 text-slate-800 dark:text-slate-200 text-xs flex items-start gap-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded bg-sky-50 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-500/40">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 mb-1 md:hidden">
                        Modern QE:
                      </span>
                      <p className="leading-relaxed font-medium text-slate-900 dark:text-[#F8FAFC]">
                        {point.modern}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onOpenConsultation('QE Transformation Consultation')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider text-slate-950 bg-sky-500 hover:bg-sky-400 transition-all shadow-xs"
          >
            <span>Modernize Your QA Approach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
