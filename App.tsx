
import React, { useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProjectPage from './pages/ProjectPage';
import ClientSegmentationDocPage from './pages/ClientSegmentationDocPage';
import InterfaceGenDocPage from './pages/InterfaceGenDocPage';
import GptAssistantDocPage from './pages/GptAssistantDocPage';
import BotAutoTestDocPage from './pages/BotAutoTestDocPage';
import EmailSafetyPipelineDocPage from './pages/EmailSafetyPipelineDocPage';

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
            <Route path="/documentation/client-segmentation" element={<ClientSegmentationDocPage />} />
            <Route path="/documentation/interface-generator" element={<InterfaceGenDocPage />} />
            <Route path="/documentation/gpt-assistant" element={<GptAssistantDocPage />} />
            <Route path="/documentation/bot-autotest" element={<BotAutoTestDocPage />} />
            <Route path="/documentation/email-safety-pipeline" element={<EmailSafetyPipelineDocPage />} />
          </Routes>
        </main>
        <Footer mainContentRef={mainContentRef} />
      </div>
    </Router>
  );
};

export default App;
