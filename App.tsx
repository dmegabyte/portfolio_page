
import React, { useRef, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Lazy load all page components to enable code splitting.
// This ensures that the code for a specific page is only fetched when the user navigates to it.
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ClientSegmentationDocumentationPage = lazy(() => import('./pages/ClientSegmentationDocPage'));
const InterfaceGeneratorDocumentationPage = lazy(() => import('./pages/InterfaceGenDocPage'));
const GptAssistantDocumentationPage = lazy(() => import('./pages/GptAssistantDocPage'));
const BotAutoTestDocumentationPage = lazy(() => import('./pages/BotAutoTestDocPage'));
const EmailSafetyPipelineDocumentationPage = lazy(() => import('./pages/EmailSafetyPipelineDocPage'));
const DocUIComponentsPage = lazy(() => import('./pages/DocUIComponentsPage'));


// A fallback component to display while lazy-loaded components are being fetched.
const LoadingFallback: React.FC = () => (
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 16rem)' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400" role="status" aria-label="Загрузка страницы..."></div>
    </div>
);


const App: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900 font-sans">
        <Header />
        <main ref={mainContentRef} className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Wrap the Routes in a Suspense component to handle the loading state of lazy components. */}
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/project/:slug" element={<ProjectPage />} />
              {/* Documentation Pages */}
              <Route path="/documentation/client-segmentation" element={<ClientSegmentationDocumentationPage />} />
              <Route path="/documentation/interface-generator" element={<InterfaceGeneratorDocumentationPage />} />
              <Route path="/documentation/gpt-assistant" element={<GptAssistantDocumentationPage />} />
              <Route path="/documentation/bot-autotest" element={<BotAutoTestDocumentationPage />} />
              <Route path="/documentation/email-safety-pipeline" element={<EmailSafetyPipelineDocumentationPage />} />
              <Route path="/documentation/ui-components" element={<DocUIComponentsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer mainContentRef={mainContentRef} />
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;