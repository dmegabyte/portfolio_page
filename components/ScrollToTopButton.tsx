
import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button if page is scrolled down more than 300px
    if (window.pageYOffset > 300) {
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
    <div className="fixed bottom-6 right-6 z-50">
        <button
            type="button"
            onClick={scrollToTop}
            className={`
              bg-indigo-600 hover:bg-indigo-700 text-white
              dark:bg-indigo-500 dark:hover:bg-indigo-600
              rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800
              transform
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
            aria-label="Вернуться к началу"
            >
            <ArrowUpIcon className="h-6 w-6" />
        </button>
    </div>
  );
};

export default ScrollToTopButton;
