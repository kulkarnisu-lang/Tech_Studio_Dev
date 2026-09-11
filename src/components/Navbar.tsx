import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight, Terminal, Shield } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  onOpenConsultation: (topic?: string) => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { companyConfig, openAdmin } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'ai-automation', 'solutions', 'approach', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'AI Automation', href: '#ai-automation', id: 'ai-automation' },
    { name: 'Solutions', href: '#solutions', id: 'solutions' },
    { name: 'Approach', href: '#approach', id: 'approach' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0A0C10]/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 py-2.5'
          : 'bg-white/80 dark:bg-[#0A0C10]/70 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-800/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 text-slate-900 dark:text-[#F8FAFC] font-bold tracking-tight text-xl group"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-bold font-mono shadow-xs group-hover:bg-sky-400 transition-colors">
              <Terminal className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="font-mono text-lg font-extrabold tracking-tight">
              {companyConfig.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-sky-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={openAdmin}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Admin Portal (#admin)"
            >
              <Shield className="w-3.5 h-3.5 text-sky-500" />
              <span>Admin</span>
            </button>

            <ThemeToggle />
            <button
              id="navbar-cta-btn"
              type="button"
              onClick={() => onOpenConsultation('General Advisory')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-slate-950 bg-sky-500 hover:bg-sky-400 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={openAdmin}
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-sky-500"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4 text-sky-500" />
            </button>
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white dark:bg-[#0A0C10] border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-md text-xs font-mono uppercase font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAdmin();
              }}
              className="px-3 py-2 rounded-md text-xs font-mono uppercase font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Operations Console</span>
            </button>

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation('General Advisory');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-slate-950 bg-sky-500 hover:bg-sky-400 transition-colors shadow-xs"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
