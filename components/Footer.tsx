
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
  // This value is a snapshot of the project's total character count (excluding whitespace).
  // At the time of this implementation. It serves as a static baseline to uphold
  // Principle 3: Content Integrity. Any future changes must not decrease this value.
  // Updated snapshot: Implemented V8 "Hard CSS Lock" LOD architecture.
  const projectCharCount = 149_120;

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
  // As requested, the character counting logic is kept active but is not rendered.
  // The hook call below ensures the logic continues to run in the background.
  useCharacterCount(mainContentRef);

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white border-t border-slate-700 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-sm text-gray-400 dark:text-slate-400 space-y-1">
          <p className="font-semibold tracking-wider text-slate-500">100% vibe-coding</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 opacity-30 hover:opacity-100 transition-opacity">
             <ProjectCharacterCounter />
          </div>
          <p>&copy; 2025 Мои проекты. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
