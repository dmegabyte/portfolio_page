import React from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

const ScrollToTopButton: React.FC = () => {
  // Encapsulated logic in a reusable custom hook.
  const isVisible = useScrollVisibility(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
        <button
            type="button"
            onClick={scrollToTop}
            tabIndex={isVisible ? 0 : -1}
            className={`
              bg-[var(--color-interactive-primary-strong)] hover:bg-[var(--color-interactive-primary-strong-hover)] text-white
              dark:bg-[var(--color-interactive-primary)] dark:hover:bg-[var(--color-interactive-primary-strong)]
              rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-[var(--color-interactive-primary-light-focus)] dark:focus:ring-[var(--color-interactive-primary-dark-focus)]
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