import { useState, type FormEvent } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Mail, Linkedin, Calendar, Send, CheckCircle2, Copy, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  initialTopic?: string;
}

export default function ContactSection({ initialTopic }: ContactSectionProps) {
  const { companyConfig, addInquiry } = useAdmin();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: initialTopic || 'Quality Engineering Strategy',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Log to admin portal CRM
    addInquiry({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      serviceInterest: formData.serviceInterest,
      message: formData.message || 'Consultation request from website contact section.',
      source: 'contact-form',
    });

    // Compose mailto fallback
    const subject = encodeURIComponent(
      `[Consultation Request] ${formData.serviceInterest} - ${formData.company || formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nInterest: ${formData.serviceInterest}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${companyConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(companyConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct channels & Value */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 dark:text-slate-300 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span>Direct Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-[#F8FAFC] tracking-tight leading-tight">
              Let&apos;s Improve Your Software Quality
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Tell us about your testing, automation, or Quality Engineering challenge. We&apos;ll explore where automation, modern testing practices, and AI can create practical value.
            </p>

            <div className="space-y-3 pt-2">
              {/* Direct Email Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-200 dark:border-sky-800/80">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">EMAIL US DIRECTLY</span>
                    <a
                      href={`mailto:${companyConfig.email}`}
                      className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    >
                      {companyConfig.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Copy email address"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn Connect */}
              <a
                href={companyConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/80">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">CONNECT ON LINKEDIN</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {companyConfig.name} Leadership
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </a>

              {/* Advisory Consultation Booking */}
              <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-sky-950 dark:text-sky-200 leading-relaxed">
                    <span className="font-bold block text-slate-900 dark:text-[#F8FAFC] mb-0.5">
                      30-Minute Exploratory Call
                    </span>
                    Zero sales pressure. We discuss your architecture, testing challenges, and evaluate if our engineering approach is the right fit.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-7 rounded-xl bg-slate-50 dark:bg-[#0C111A] border border-slate-200 dark:border-slate-800 shadow-2xs">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-0.5">
                Book a Consultation / Inquire
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Fill in the details below to trigger an immediate email consultation request.
              </p>

              {submitted ? (
                <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-2.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Consultation Draft Initiated
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Your email client should have opened with your pre-filled inquiry. You can also reach us directly at {companyConfig.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Company / Organization
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme SaaS Inc."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                      >
                        What can we help with?
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="Quality Engineering Strategy">Quality Engineering Strategy</option>
                        <option value="Test Automation Framework Build">Test Automation Framework Build</option>
                        <option value="AI-Powered Test Automation">AI-Powered Test Automation</option>
                        <option value="CI/CD Quality Gates & Regression">CI/CD Quality Gates & Regression</option>
                        <option value="QA Assessment & Audit">QA Assessment & Audit</option>
                        <option value="General Advisory & Consultation">General Advisory & Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1"
                    >
                      Brief Message or Current Bottleneck
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your team size, tech stack, and primary testing challenge (e.g. slow regression, flaky Cypress tests, wanting to pilot AI in QA)..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0C10] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md font-mono font-bold text-xs uppercase tracking-wider text-slate-950 bg-sky-500 hover:bg-sky-400 transition-all shadow-2xs active:scale-98"
                  >
                    <span>Submit Consultation Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    Direct confidential contact. No spam or marketing lists.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
