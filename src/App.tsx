import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Services from './components/Services';
import AIAutomation from './components/AIAutomation';
import AIUseCases from './components/AIUseCases';
import ComparisonSection from './components/ComparisonSection';
import Solutions from './components/Solutions';
import Approach from './components/Approach';
import EngagementModels from './components/EngagementModels';
import WhyUs from './components/WhyUs';
import Technologies from './components/Technologies';
import CaseStudies from './components/CaseStudies';
import About from './components/About';
import Assessment from './components/Assessment';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import { AdminProvider, useAdmin } from './context/AdminContext';
import AdminPortal from './components/admin/AdminPortal';

function AppContent() {
  const { isAdminView } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState<string | undefined>();

  const handleOpenConsultation = (topic?: string) => {
    setConsultationTopic(topic);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
  };

  if (isAdminView) {
    return <AdminPortal />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 dark:bg-[#0A0C10] dark:text-[#F8FAFC] selection:bg-sky-500 selection:text-slate-950 transition-colors duration-200">
      {/* Sticky Header */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Sections */}
      <main className="grow">
        <Hero onOpenConsultation={handleOpenConsultation} />
        <TrustStrip />
        <Services onOpenConsultation={handleOpenConsultation} />
        <AIAutomation onOpenConsultation={handleOpenConsultation} />
        <AIUseCases onOpenConsultation={handleOpenConsultation} />
        <ComparisonSection onOpenConsultation={handleOpenConsultation} />
        <Solutions onOpenConsultation={handleOpenConsultation} />
        <Approach onOpenConsultation={handleOpenConsultation} />
        <EngagementModels onOpenConsultation={handleOpenConsultation} />
        <WhyUs />
        <Technologies />
        <CaseStudies onOpenConsultation={handleOpenConsultation} />
        <About onOpenConsultation={handleOpenConsultation} />
        <Assessment onOpenConsultation={handleOpenConsultation} />
        <FAQ />
        <ContactSection initialTopic={consultationTopic} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Consultation Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={handleCloseConsultation}
        initialTopic={consultationTopic}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}

