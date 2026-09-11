import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Sparkles,
  GitBranch,
  Compass,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface ServicesProps {
  onOpenConsultation: (serviceTitle?: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Sparkles,
  GitBranch,
  Compass,
};

export default function Services({ onOpenConsultation }: ServicesProps) {
  const { services } = useAdmin();
  const [expandedId, setExpandedId] = useState<string | null>('ai-powered-automation');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-100/60 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-100 dark:text-sky-400 dark:bg-sky-500/10 border border-sky-300/60 dark:border-sky-500/30">
            <span>Capabilities & Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Our Core Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Engineering quality, deterministic automation, and AI-accelerated verification into software delivery.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || ShieldCheck;
            const isFeatured = service.isFeatured;
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className={`group relative rounded-xl transition-all duration-200 flex flex-col justify-between p-5 sm:p-6 ${
                  isFeatured
                    ? 'bg-[#0E1524] text-white border-2 border-sky-500/80 shadow-lg'
                    : 'bg-white dark:bg-[#0C111A] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-sky-500/40 shadow-xs'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-sky-500 text-slate-950 shadow-xs uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>SIGNATURE CAPABILITY</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Index, Icon, and Tag */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-slate-400 font-bold">
                        0{idx + 1}.
                      </span>
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                          isFeatured
                            ? 'bg-sky-500 text-slate-950 border-sky-400'
                            : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-sky-400 border-slate-200 dark:border-slate-800 group-hover:border-sky-500/40 transition-colors'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                        isFeatured
                          ? 'text-sky-300 bg-sky-950/80 border-sky-800'
                          : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-lg font-bold mb-2 tracking-tight ${
                      isFeatured ? 'text-white' : 'text-slate-900 dark:text-[#F8FAFC]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isFeatured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-1.5 mb-4">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider block ${
                        isFeatured ? 'text-sky-400' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Key Focus Areas
                    </span>
                    <ul className="space-y-1.5">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className={`text-xs flex items-start gap-2 ${
                            isFeatured
                              ? 'text-slate-200'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${
                              isFeatured ? 'bg-sky-400' : 'bg-sky-500'
                            }`}
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Deliverables Accordion */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 mb-5">
                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      className={`w-full flex items-center justify-between text-xs font-mono py-1 transition-colors ${
                        isFeatured
                          ? 'text-sky-300 hover:text-sky-200'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{isExpanded ? '[- Hide Deliverables]' : '[+ View Deliverables]'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div
                        className={`mt-2 p-2.5 rounded-md text-xs space-y-1 animate-in fade-in duration-150 ${
                          isFeatured
                            ? 'bg-slate-900/90 text-slate-300 border border-slate-700'
                            : 'bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {service.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-sky-500 font-mono">&bull;</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => onOpenConsultation(service.title)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                    isFeatured
                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
