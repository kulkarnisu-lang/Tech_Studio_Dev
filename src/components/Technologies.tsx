import { useState } from 'react';
import { TECHNOLOGIES_DATA } from '../data/technologies';
import { Code2, Cpu, GitBranch, Sparkles, type LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  'Programming & Languages': Code2,
  'Automation & Frameworks': Cpu,
  'DevOps & Continuous Quality': GitBranch,
  'AI & Engineering Productivity': Sparkles,
};

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState<string>(
    TECHNOLOGIES_DATA[0].category
  );

  const currentCategoryData =
    TECHNOLOGIES_DATA.find((c) => c.category === activeCategory) ||
    TECHNOLOGIES_DATA[0];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <span>Engineering Stack & Tools</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Technology Ecosystem
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A battle-tested technology landscape optimized for modularity, execution velocity, and enterprise reliability.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TECHNOLOGIES_DATA.map((cat) => {
            const Icon = categoryIcons[cat.category] || Code2;
            const isActive = cat.category === activeCategory;

            return (
              <button
                key={cat.category}
                type="button"
                onClick={() => setActiveCategory(cat.category)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-2xs'
                    : 'bg-white dark:bg-[#0C111A] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Category Details & Grid */}
        <div className="bg-white dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-2xs">
          <div className="mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
              {currentCategoryData.category}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {currentCategoryData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {currentCategoryData.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-50/70 dark:bg-[#0A0C10] border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {item.name}
                    </h4>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 border border-sky-300/80 dark:border-sky-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
