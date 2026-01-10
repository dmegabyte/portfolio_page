
import React, { useRef, Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ErrorBoundary from './components/ErrorBoundary';
import { useBackgroundPreloader } from './hooks/useBackgroundPreloader';
import NeuralBackground from './components/NeuralBackground';

// Lazy load all page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ClientSegmentationDocumentationPage = lazy(() => import('./pages/ClientSegmentationDocPage'));
const ClientSegmentationReportPage = lazy(() => import('./pages/ClientSegmentationReportPage'));
const InterfaceGeneratorDocumentationPage = lazy(() => import('./pages/InterfaceGenDocPage'));
const GptAssistantDocumentationPage = lazy(() => import('./pages/GptAssistantDocPage'));
const GptAssistantReportPage = lazy(() => import('./pages/GptAssistantReportPage'));
const BotAutoTestDocumentationPage = lazy(() => import('./pages/BotAutoTestDocPage'));
const EmailSafetyPipelineDocumentationPage = lazy(() => import('./pages/EmailSafetyPipelineDocPage'));
const ScenarioNexusDocumentationPage = lazy(() => import('./pages/VictoryDocPage'));
const DocUIComponentsPage = lazy(() => import('./pages/DocUIComponentsPage'));
const TypographyGuidePage = lazy(() => import('./pages/TypographyGuidePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Demo Pages
const VisionPage = lazy(() => import('./pages/demo/VisionPage'));
const TechPage = lazy(() => import('./pages/demo/TechPage'));
const LaunchPage = lazy(() => import('./pages/demo/LaunchPage'));

// Test Site Pages
const TestHome = lazy(() => import('./pages/test-site/TestHome'));
const TestServices = lazy(() => import('./pages/test-site/TestServices'));
const TestContact = lazy(() => import('./pages/test-site/TestContact'));

// New Smooth Demo Pages
const SmoothLobby = lazy(() => import('./pages/demo/SmoothLobby'));
const SmoothDeep = lazy(() => import('./pages/demo/SmoothDeep'));

const GALLERY_ASSETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1200',
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LoadingFallback: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-[70vh] animate-fade-in">
        <div className="relative mb-8">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-indigo-500"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 font-black text-2xl">P</div>
        </div>
    </div>
);

const App: React.FC = () => {
  const mainContentRef = useRef<HTMLElement>(null);
  useBackgroundPreloader(GALLERY_ASSETS);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 relative bg-transparent">
        <NeuralBackground />
        <Header />
        <main ref={mainContentRef} className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/project/:slug" element={<ProjectPage />} />
                
                {/* Smooth Demo Routes */}
                <Route path="/smooth-demo" element={<SmoothLobby />} />
                <Route path="/smooth-demo/deep" element={<SmoothDeep />} />
                
                {/* Demo Navigation Pages */}
                <Route path="/demo/vision" element={<VisionPage />} />
                <Route path="/demo/tech" element={<TechPage />} />
                <Route path="/demo/launch" element={<LaunchPage />} />

                {/* Test Site Routes */}
                <Route path="/test-site" element={<TestHome />} />
                <Route path="/test-site/services" element={<TestServices />} />
                <Route path="/test-site/contact" element={<TestContact />} />
                
                {/* Documentation Routes */}
                <Route path="/documentation/client-segmentation" element={<ClientSegmentationDocumentationPage />} />
                <Route path="/report/client-segmentation" element={<ClientSegmentationReportPage />} />
                <Route path="/documentation/interface-generator" element={<InterfaceGeneratorDocumentationPage />} />
                <Route path="/documentation/gpt-assistant" element={<GptAssistantDocumentationPage />} />
                <Route path="/report/gpt-assistant" element={<GptAssistantReportPage />} />
                <Route path="/documentation/bot-autotest" element={<BotAutoTestDocumentationPage />} />
                <Route path="/documentation/email-safety-pipeline" element={<EmailSafetyPipelineDocumentationPage />} />
                <Route path="/documentation/scenario-nexus" element={<ScenarioNexusDocumentationPage />} />
                <Route path="/documentation/ui-components" element={<DocUIComponentsPage />} />
                <Route path="/documentation/ui-components/typography" element={<TypographyGuidePage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer mainContentRef={mainContentRef} />
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
