import React, { useState } from 'react';
import { HelpCircle, Plus, Edit2, Trash2, X, Tag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { FAQItem } from '../../types';

export default function AdminFaqsTab() {
  const { faqs, updateFaqs, addFaq, deleteFaq } = useAdmin();
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [draft, setDraft] = useState<Omit<FAQItem, 'id'>>({
    question: '',
    answer: '',
    category: 'Services',
  });

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setDraft({ question: faq.question, answer: faq.answer, category: faq.category });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !draft.question || !draft.answer) return;

    const updated = faqs.map((f) => (f.id === editingFaq.id ? { ...f, ...draft } : f));
    updateFaqs(updated);
    setEditingFaq(null);
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.question || !draft.answer) return;

    addFaq(draft);
    setIsAddModalOpen(false);
    setDraft({ question: '', answer: '', category: 'Services' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span>Frequently Asked Questions Manager</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage customer knowledge base questions, categories, and technical answers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDraft({ question: '', answer: '', category: 'Services' });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800">
                    {faq.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{faq.id}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(faq)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                {faqs.length > 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete FAQ: "${faq.question.substring(0, 30)}..."?`)) {
                        deleteFaq(faq.id);
                      }
                    }}
                    className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {(editingFaq || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#0C111A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setEditingFaq(null);
                setIsAddModalOpen(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {editingFaq ? 'Edit FAQ Item' : 'Create New FAQ Item'}
            </h3>

            <form
              onSubmit={editingFaq ? handleSaveEdit : handleCreateFaq}
              className="space-y-4 text-xs font-mono"
            >
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Category *
                </label>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value="Services">Services</option>
                  <option value="Automation">Automation</option>
                  <option value="AI">AI & Quality</option>
                  <option value="Consulting">Consulting & Engagement</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={draft.question}
                  onChange={(e) => setDraft({ ...draft, question: e.target.value })}
                  placeholder="e.g. Can you integrate testing into our CI/CD pipeline?"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={draft.answer}
                  onChange={(e) => setDraft({ ...draft, answer: e.target.value })}
                  placeholder="Write a clear, authoritative engineering explanation..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 leading-relaxed font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaq(null);
                    setIsAddModalOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  {editingFaq ? 'Save FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
