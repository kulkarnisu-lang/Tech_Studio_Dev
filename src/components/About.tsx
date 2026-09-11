import { useAdmin } from '../context/AdminContext';
import { UserCheck, ShieldCheck, Cpu, Sparkles, MapPin, Mail, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onOpenConsultation: (topic?: string) => void;
}

export default function About({ onOpenConsultation }: AboutProps) {
  const { companyConfig } = useAdmin();
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50/60 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Philosophy & Values */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
              <span>About the Consultancy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight">
              Engineering Quality.{' '}
              <span className="text-sky-600 dark:text-sky-400">
                Enabling Confidence.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              We believe quality should be engineered throughout the software lifecycle. Our approach combines testing expertise, automation engineering, Quality Engineering practices, and practical AI adoption to help teams deliver software with greater speed and confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400 mb-2" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Shift-Left Mindset</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Catching defects at the pull-request stage when they are simplest to resolve.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400 mb-2" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Resilient Automation</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Modular frameworks that run fast and don&apos;t break with every UI change.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 mb-2" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">Intelligent QA</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Targeted AI acceleration with human engineering judgment in control.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Principal Consultant Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-3.5 mb-4 pb-3.5 border-b border-slate-100 dark:border-slate-800">
                <div className="w-11 h-11 rounded-lg bg-slate-900 text-sky-400 dark:bg-slate-900 flex items-center justify-center border border-slate-700 font-mono text-lg font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider">
                    {companyConfig.founderTitle}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {companyConfig.founderName}
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5 mb-5">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {companyConfig.founderBio}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location: {companyConfig.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Direct: {companyConfig.email}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenConsultation('Founder Advisory Call')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-2xs"
              >
                <span>Schedule a 1-on-1 Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
