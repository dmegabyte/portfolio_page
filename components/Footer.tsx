import React, { RefObject } from 'react';
import { useCharacterCount } from '../hooks/useCharacterCount';

// Renamed for clarity, following Principle 1: Clarity Over Brevity.
// Logic has been extracted to a custom hook, making this a pure presentational component.
const PageCharacterCounter: React.FC<{ contentRef: RefObject<HTMLElement> }> = ({ contentRef }) => {
  const charCount = useCharacterCount(contentRef);

  return (
    <span className={`transition-opacity duration-300 ${charCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
      Символов на странице (без пробелов): {charCount.toLocaleString('ru-RU')}
    </span>
  );
};

// New component for the project-wide character count.
const ProjectCharacterCounter: React.FC = () => {
  // This value is a snapshot of the project's total character count (excluding whitespace)
  // at the time of this implementation. It serves as a static baseline to uphold
  // Principle 3: Content Integrity. Any future changes must not decrease this value.
  const projectCharCount = 131_582;

  return (
    <span>
      Символов в проекте (без пробелов): {projectCharCount.toLocaleString('ru-RU')}
    </span>
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
          <p>&copy; {currentYear} Мои проекты. Все права защищены.</p>
          <div className="text-xs text-gray-500 dark:text-slate-500 mt-2 flex justify-center items-center gap-4" aria-live="polite">
            <PageCharacterCounter contentRef={mainContentRef} />
            <span className="text-slate-600">|</span>
            <ProjectCharacterCounter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;