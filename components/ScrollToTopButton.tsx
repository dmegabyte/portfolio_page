import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button if page is scrolled down more than half a viewport height
    if (window.pageYOffset > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`mt-auto pt-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
            type="button"
            onClick={scrollToTop}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-3 rounded-lg transition-colors"
            aria-label="Вернуться к началу"
            >
            <ArrowUpIcon className="h-5 w-5" />
            Наверх
        </button>
    </div>
  );
};

export default ScrollToTopButton;