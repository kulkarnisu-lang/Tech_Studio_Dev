import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const { faqs } = useAdmin();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = ['All', 'Services', 'Automation', 'AI', 'Consulting'];

  const filteredFAQs =
    selectedCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-200/80 dark:text-slate-300 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700">
            <HelpCircle className="w-3 h-3" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Common questions regarding our engineering methodologies, automation frameworks, AI use cases, and consulting services.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 shadow-2xs'
                    : 'bg-white dark:bg-[#0C111A] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {filteredFAQs.map((faq) => {
            const isOpen = !!openIds[faq.id];

            return (
              <div
                key={faq.id}
                id={`faq-${faq.id}`}
                className="bg-white dark:bg-[#0C111A] rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-sky-400 border border-slate-200 dark:border-slate-800 shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
