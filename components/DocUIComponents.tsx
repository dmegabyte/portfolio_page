import React, { useState, ReactNode, useEffect } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

// --- Section Header ---
interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-4 mb-6 not-prose">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-0 scroll-mt-24">{title}</h2>
            <p className="text-gray-600 dark:text-slate-400 text-base mt-1">{subtitle}</p>
        </div>
    </div>
);

// --- Info Card ---
interface InfoCardProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-slate-800/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 not-prose transform hover:-translate-y-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-lg flex items-center justify-center">
                {icon}
            </div>
            <h3 className="font-bold text-lg text-gray-800 dark:text-slate-200 mt-0">{title}</h3>
        </div>
        <div className="text-gray-700 dark:text-slate-300 flex-grow">{children}</div>
    </div>
);


// --- Collapsible Section (Accordion) ---
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => (
    <details className="group/collapsible not-prose" open={defaultOpen}>
        <summary className="list-none flex justify-between items-center p-4 font-bold text-lg cursor-pointer text-gray-900 dark:text-slate-100 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md rounded-lg group-open/collapsible:rounded-b-none">
            <span>{title}</span>
            <div className="p-1 rounded-full bg-white/50 dark:bg-slate-700/50">
                <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-slate-400 group-open/collapsible:rotate-180 transition-transform duration-300"/>
            </div>
        </summary>
        <div className="bg-white dark:bg-slate-800 border-b border-x border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md rounded-b-lg">
            <div className="prose prose-base dark:prose-invert max-w-none">
                 {children}
            </div>
        </div>
    </details>
);

// --- Code Block with Copy Button ---
interface CodeBlockWithCopyProps {
    code: string;
    title: string;
}
export const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="relative not-prose bg-slate-900 rounded-lg border border-slate-700 shadow-lg">
       <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700">
            <span className="text-sm font-semibold text-slate-300 dark:text-slate-400">{title}</span>
            <button
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-1 px-2 rounded-md transition-colors"
                aria-label="Копировать код"
            >
                {copied ? 'Скопировано!' : 'Копировать'}
            </button>
       </div>
      <pre className="text-white p-4 text-sm overflow-x-auto mt-0 rounded-b-lg bg-transparent">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

// --- Tooltip for Terms ---
interface TooltipTermProps {
    children: ReactNode;
    definition: string;
}

export const TooltipTerm: React.FC<TooltipTermProps> = ({ children, definition }) => {
    return (
        <span className="relative group inline-block">
            <span className="text-indigo-500 dark:text-indigo-400 font-semibold border-b-2 border-dotted border-indigo-300 dark:border-indigo-500 cursor-help">
                {children}
            </span>
            <div 
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-3 bg-slate-900 text-white text-sm rounded-lg shadow-lg z-[60] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                role="tooltip"
            >
                {definition}
            </div>
        </span>
    );
};


// --- Modal ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[100] flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full m-4 border border-gray-200 dark:border-slate-800 transform transition-transform duration-300 scale-95 animate-fade-in"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <h3 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-slate-100">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Закрыть модальное окно"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};