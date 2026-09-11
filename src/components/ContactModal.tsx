import { useState, useEffect, type FormEvent } from 'react';
import { X, Send, CheckCircle2, Terminal } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function ContactModal({ isOpen, onClose, initialTopic }: ContactModalProps) {
  const { companyConfig, addInquiry } = useAdmin();

  const getInitialFormData = (topic?: string) => ({
    name: '',
    email: '',
    company: '',
    serviceInterest: topic || 'Quality Engineering Strategy',
    message: '',
  });

  const [formData, setFormData] = useState(() => getInitialFormData(initialTopic));
  const [submitted, setSubmitted] = useState(false);

  // Reset modal state whenever it is opened
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData(getInitialFormData(initialTopic));
    }
  }, [isOpen, initialTopic]);

  const handleClose = () => {
    setSubmitted(false);
    setFormData(getInitialFormData(initialTopic));
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Log inquiry to admin dashboard
    addInquiry({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      serviceInterest: formData.serviceInterest,
      message: formData.message || 'Consultation request from website modal.',
      source: 'modal',
    });

    const subject = encodeURIComponent(
      `[Consultation] ${formData.serviceInterest} - ${formData.company || formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nInterest: ${formData.serviceInterest}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${companyConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      id="consultation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0C111A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded bg-slate-900 text-sky-400 dark:bg-slate-900 flex items-center justify-center border border-slate-700">
            <Terminal className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
            {companyConfig.name} Advisory
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] tracking-tight mb-1">
          Book a Quality Consultation
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
          Discuss your testing stack, automation bottlenecks, or AI roadmap with our principal consultants.
        </p>

        {submitted ? (
          <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-2.5">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
              Inquiry Draft Created
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Your default email app should have launched. We will review and reply within 24 business hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Name"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Discussion Topic
                </label>
                <input
                  type="text"
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Context / Key Question
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your testing challenges, timeline, or current goals..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md font-mono font-bold text-xs uppercase tracking-wider text-slate-950 bg-sky-500 hover:bg-sky-400 transition-all shadow-2xs"
              >
                <span>Initiate Consultation Request</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
