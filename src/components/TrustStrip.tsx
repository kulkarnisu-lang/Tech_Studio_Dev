import type { MouseEvent } from 'react';
import { ShieldCheck, Cpu, Sparkles, GitBranch, Compass } from 'lucide-react';

export default function TrustStrip() {
  const valueItems = [
    {
      label: 'Quality Engineering',
      icon: ShieldCheck,
      href: '#services',
    },
    {
      label: 'Test Automation',
      icon: Cpu,
      href: '#services',
    },
    {
      label: 'AI Automation',
      icon: Sparkles,
      href: '#ai-automation',
    },
    {
      label: 'Continuous Testing',
      icon: GitBranch,
      href: '#services',
    },
    {
      label: 'QA Transformation',
      icon: Compass,
      href: '#services',
    },
  ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="value-strip"
      className="border-y border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0A0C10] py-3.5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5">
          {valueItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-6 sm:gap-8">
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </a>
                {idx < valueItems.length - 1 && (
                  <span className="hidden sm:inline-block text-slate-300 dark:text-slate-800 font-light select-none">
                    /
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
