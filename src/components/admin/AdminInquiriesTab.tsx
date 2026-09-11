import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Plus,
  Trash2,
  Mail,
  Building2,
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  User,
  X,
  Save,
  Tag,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminInquiry, InquiryStatus } from '../../types';

export default function AdminInquiriesTab() {
  const { inquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry, addInquiry } = useAdmin();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);

  // Notes editing
  const [notesDraft, setNotesDraft] = useState('');

  // New lead modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'Quality Engineering Strategy',
    message: '',
    notes: '',
  });

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.serviceInterest.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  // Status Counts
  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      new: inquiries.filter((i) => i.status === 'new').length,
      contacted: inquiries.filter((i) => i.status === 'contacted').length,
      inProgress: inquiries.filter((i) => i.status === 'in-progress').length,
      closed: inquiries.filter((i) => i.status === 'closed').length,
    };
  }, [inquiries]);

  // Export to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Service Interest', 'Status', 'Source', 'Message', 'Notes'];
    const rows = inquiries.map((item) => [
      item.id,
      new Date(item.createdAt).toLocaleString(),
      `"${item.name.replace(/"/g, '""')}"`,
      item.email,
      `"${item.company.replace(/"/g, '""')}"`,
      `"${item.serviceInterest.replace(/"/g, '""')}"`,
      item.status,
      item.source,
      `"${item.message.replace(/"/g, '""')}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `techstudio_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open Details Modal
  const handleOpenDetails = (inquiry: AdminInquiry) => {
    setSelectedInquiry(inquiry);
    setNotesDraft(inquiry.notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryNotes(selectedInquiry.id, notesDraft);
    setSelectedInquiry({ ...selectedInquiry, notes: notesDraft });
  };

  // Create Manual Lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;

    addInquiry({
      name: newLead.name,
      email: newLead.email,
      company: newLead.company,
      serviceInterest: newLead.serviceInterest,
      message: newLead.message || 'Direct consultation lead logged by admin.',
      source: 'manual',
      notes: newLead.notes,
    });

    setNewLead({
      name: '',
      email: '',
      company: '',
      serviceInterest: 'Quality Engineering Strategy',
      message: '',
      notes: '',
    });
    setIsAddModalOpen(false);
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
            <Clock className="w-3 h-3" />
            Contacted
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            <Tag className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
            Total Inquiries
          </div>
          <div className="text-2xl font-mono font-black text-slate-900 dark:text-white mt-1">
            {counts.all}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">All-time leads logged</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0C111A] border border-emerald-200 dark:border-emerald-950/40 shadow-2xs">
          <div className="text-[11px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
            New / Uncontacted
          </div>
          <div className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {counts.new}
          </div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-500/80 mt-1">Requires immediate reply</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0C111A] border border-indigo-200 dark:border-indigo-950/40 shadow-2xs">
          <div className="text-[11px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
            Active Pipeline
          </div>
          <div className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {counts.inProgress + counts.contacted}
          </div>
          <div className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 mt-1">Discovery & proposals</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
            Closed Engagements
          </div>
          <div className="text-2xl font-mono font-black text-slate-700 dark:text-slate-300 mt-1">
            {counts.closed}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Signed / Completed</div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#0C111A] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, company, email, topic..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 font-mono"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Log Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono">
        {(['all', 'new', 'contacted', 'in-progress', 'closed'] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === status
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {status === 'all' ? 'All Leads' : status.replace('-', ' ')}
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {status === 'all'
                ? counts.all
                : status === 'new'
                ? counts.new
                : status === 'contacted'
                ? counts.contacted
                : status === 'in-progress'
                ? counts.inProgress
                : counts.closed}
            </span>
          </button>
        ))}
      </div>

      {/* Inquiries Table / Cards */}
      <div className="bg-white dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
        {filteredInquiries.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-mono">
            No inquiries match your current filter.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 sm:p-5 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Client Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(inquiry.status)}
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {inquiry.name}
                    </span>
                    {inquiry.company && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Building2 className="w-3 h-3" />
                        {inquiry.company}
                      </span>
                    )}
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      via {inquiry.source}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <a
                      href={`mailto:${inquiry.email}?subject=Tech_Studio Consultation: ${inquiry.serviceInterest}`}
                      className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {inquiry.email}
                    </a>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      Topic: {inquiry.serviceInterest}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(inquiry.createdAt).toLocaleDateString()} at{' '}
                      {new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 pt-1 leading-relaxed">
                    {inquiry.message}
                  </p>

                  {inquiry.notes && (
                    <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-1 rounded inline-block">
                      <span className="font-bold">Internal Note:</span> {inquiry.notes}
                    </div>
                  )}
                </div>

                {/* Actions & Status Dropdown */}
                <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
                  <select
                    value={inquiry.status}
                    onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as InquiryStatus)}
                    className="text-xs font-mono font-semibold py-1.5 px-2.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-hidden"
                  >
                    <option value="new">Mark New</option>
                    <option value="contacted">Mark Contacted</option>
                    <option value="in-progress">Mark In Progress</option>
                    <option value="closed">Mark Closed</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleOpenDetails(inquiry)}
                    className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                    title="View details & notes"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <a
                    href={`mailto:${inquiry.email}?subject=Tech_Studio Consultation: ${inquiry.serviceInterest}`}
                    className="p-1.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 transition-colors"
                    title="Direct Reply"
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Delete inquiry from ${inquiry.name}?`)) {
                        deleteInquiry(inquiry.id);
                      }
                    }}
                    className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Detail & Notes Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white dark:bg-[#0C111A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              {getStatusBadge(selectedInquiry.status)}
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Inquiry Details</h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Client Name</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Company</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedInquiry.company || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-sky-500 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Service Area</span>
                  <span className="text-slate-900 dark:text-white font-bold">{selectedInquiry.serviceInterest}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px] block font-bold mb-1">Original Inquiry Message</span>
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-sans leading-relaxed text-xs">
                  {selectedInquiry.message}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold">Internal Lead Notes (QE Lead Review)</span>
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-500 hover:text-sky-400 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </div>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={3}
                  placeholder="Add internal meeting notes, proposal status, or next steps..."
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Tech_Studio Quality Advisory: ${selectedInquiry.serviceInterest}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-bold uppercase tracking-wider text-[11px] hover:bg-sky-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#0C111A] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-500" />
              <span>Log Manual Consultation Lead</span>
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g., Alex Rivera"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                  placeholder="Apex Cloud Corp"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Service Interest</label>
                <select
                  value={newLead.serviceInterest}
                  onChange={(e) => setNewLead({ ...newLead, serviceInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value="Quality Engineering Strategy">Quality Engineering Strategy</option>
                  <option value="Software Testing">Software Testing & Validation</option>
                  <option value="Test Automation Architecture">Test Automation Architecture</option>
                  <option value="AI-Powered Quality Engineering">AI-Powered Quality Engineering</option>
                  <option value="CI/CD Quality Gates">CI/CD Quality Gates</option>
                  <option value="Founder Advisory Call">Founder Advisory Call</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">Notes / Scope</label>
                <textarea
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  rows={2}
                  placeholder="Context discussed during call or referral..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
