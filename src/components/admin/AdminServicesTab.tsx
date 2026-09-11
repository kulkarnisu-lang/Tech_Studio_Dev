import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, CheckCircle2, Save, X, Tag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceItem } from '../../types';

export default function AdminServicesTab() {
  const { services, updateServices, addService, deleteService } = useAdmin();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for new / edited service
  const [draft, setDraft] = useState<Partial<ServiceItem>>({
    title: '',
    tag: 'Quality Architecture',
    description: '',
    capabilities: [''],
    deliverables: [''],
    icon: 'ShieldCheck',
    ctaText: 'Explore Service',
  });

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setDraft({ ...svc });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !draft.title) return;

    const updated = services.map((s) => (s.id === editingService.id ? ({ ...s, ...draft } as ServiceItem) : s));
    updateServices(updated);
    setEditingService(null);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title) return;

    const newSvc: ServiceItem = {
      id: `svc-${Date.now()}`,
      title: draft.title || 'New Service',
      tag: draft.tag || 'Advisory',
      description: draft.description || '',
      capabilities: draft.capabilities?.filter(Boolean) || ['Custom quality audits'],
      deliverables: draft.deliverables?.filter(Boolean) || ['Architecture report'],
      icon: draft.icon || 'ShieldCheck',
      ctaText: draft.ctaText || 'Learn More',
    };

    addService(newSvc);
    setIsAddModalOpen(false);
    setDraft({
      title: '',
      tag: 'Quality Architecture',
      description: '',
      capabilities: [''],
      deliverables: [''],
      icon: 'ShieldCheck',
      ctaText: 'Explore Service',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#0C111A] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            <span>Service Offerings & Capabilities</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure the 6 core consulting practices displayed on the website.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDraft({
              title: '',
              tag: 'Specialized Discipline',
              description: '',
              capabilities: ['Process audit & assessment', 'Framework implementation'],
              deliverables: ['Roadmap blueprint', 'Executive readout'],
              icon: 'ShieldCheck',
              ctaText: 'Explore Service',
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="p-5 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase font-bold text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800">
                  {svc.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {svc.id}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {svc.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {svc.description}
              </p>

              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase text-slate-400">
                  Core Capabilities ({svc.capabilities.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {svc.capabilities.slice(0, 3).map((cap, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {cap}
                    </span>
                  ))}
                  {svc.capabilities.length > 3 && (
                    <span className="text-[11px] px-1.5 py-0.5 text-slate-400 font-mono">
                      +{svc.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500">{svc.ctaText}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(svc)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                {services.length > 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete service: ${svc.title}?`)) {
                        deleteService(svc.id);
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
      {(editingService || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#0C111A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setEditingService(null);
                setIsAddModalOpen(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service Offering'}
            </h3>

            <form
              onSubmit={editingService ? handleSaveEdit : handleCreateService}
              className="space-y-4 text-xs font-mono"
            >
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={draft.title || ''}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="e.g. Mobile Test Automation"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Tag / Category</label>
                <input
                  type="text"
                  value={draft.tag || ''}
                  onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
                  placeholder="e.g. Continuous Validation"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={draft.description || ''}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  placeholder="Describe how this service helps software engineering teams..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Capabilities (Comma-separated)
                </label>
                <textarea
                  rows={2}
                  value={draft.capabilities?.join(', ') || ''}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      capabilities: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  placeholder="Shift-left QA, API Testing, Contract Validation..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">CTA Text</label>
                <input
                  type="text"
                  value={draft.ctaText || ''}
                  onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })}
                  placeholder="e.g. Explore Test Automation"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
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
                  {editingService ? 'Save Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
