import React, { useState, useEffect, RefObject } from 'react';
import { useLocation } from 'react-router-dom';

interface CharacterCounterProps {
  contentRef: RefObject<HTMLElement>;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ contentRef }) => {
  const [charCount, setCharCount] = useState(0);
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Reset count immediately on navigation to prepare for fade-in
    setCharCount(0);
    
    // A small delay to ensure the DOM is updated after a route change in the SPA
    const timer = setTimeout(() => {
      if (contentRef.current) {
        // innerText is preferred as it respects CSS (e.g., display: none)
        // We count characters without whitespace for a more stable metric
        const text = contentRef.current.innerText || '';
        setCharCount(text.replace(/\s/g, '').length);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [contentRef, pathname, search, hash]); // Rerun on any part of the URL changing

  return (
    <div className="text-xs text-gray-500 dark:text-slate-500 mt-2 h-5" aria-live="polite">
      <span className={`transition-opacity duration-300 ${charCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
        Символов на странице (без пробелов): {charCount.toLocaleString('ru-RU')}
      </span>
    </div>
  );
};

interface FooterProps {
  mainContentRef: RefObject<HTMLElement>;
}

const Footer: React.FC<FooterProps> = ({ mainContentRef }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white border-t border-slate-700 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-400 dark:text-slate-400">
          <p>&copy; {currentYear} Моё Портфолио. Все права защищены.</p>
          <CharacterCounter contentRef={mainContentRef} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;