
import React, { useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectPage from './pages/ProjectPage';
import ClientSegmentationDocumentationPage from './pages/ClientSegmentationDocPage';
import InterfaceGeneratorDocumentationPage from './pages/InterfaceGenDocPage';
import GptAssistantDocumentationPage from './pages/GptAssistantDocPage';
import BotAutoTestDocumentationPage from './pages/BotAutoTestDocPage';
import EmailSafetyPipelineDocumentationPage from './pages/EmailSafetyPipelineDocPage';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900 font-sans">
        <Header />
        <main ref={mainContentRef} className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            {/* Documentation Pages */}
            <Route path="/documentation/client-segmentation" element={<ClientSegmentationDocumentationPage />} />
            <Route path="/documentation/interface-generator" element={<InterfaceGeneratorDocumentationPage />} />
            <Route path="/documentation/gpt-assistant" element={<GptAssistantDocumentationPage />} />
            <Route path="/documentation/bot-autotest" element={<BotAutoTestDocumentationPage />} />
            <Route path="/documentation/email-safety-pipeline" element={<EmailSafetyPipelineDocumentationPage />} />
          </Routes>
        </main>
        <Footer mainContentRef={mainContentRef} />
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
