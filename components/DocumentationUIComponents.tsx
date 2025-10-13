import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mt-0">{title}</h2>
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
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-200 mt-0">{title}</h3>
        </div>
        <div className="text-gray-700 dark:text-slate-300 flex-grow">{children}</div>
    </div>
);


// --- Collapsible Section (Accordion) ---
interface CollapsibleSectionProps {
  // FIX: Changed type from `string` to `ReactNode` to allow complex JSX elements as titles.
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => (
    <details className="group/collapsible not-prose" open={defaultOpen}>
        <summary className="list-none flex justify-between items-center p-4 font-bold text-lg cursor-pointer text-slate-900 dark:text-slate-200 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-200 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md rounded-lg group-open/collapsible:rounded-b-none group-open/collapsible:shadow-md">
            <span>{title}</span>
            <div className="p-1 rounded-full bg-white/50 dark:bg-slate-700/50">
                <ChevronDownIcon className="w-5 h-5 text-gray-600 dark:text-slate-400 group-open/collapsible:rotate-180 transition-transform duration-300"/>
            </div>
        </summary>
        <div className="grid grid-rows-[0fr] group-open/collapsible:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out bg-white dark:bg-slate-800 border-b border-x border-gray-200 dark:border-slate-700 rounded-b-lg shadow-sm">
            <div className="overflow-hidden">
                <div className="p-6">
                    <div className="prose prose-base dark:prose-invert max-w-none">
                        {children}
                    </div>
                </div>
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
            <span className="text-base font-semibold text-slate-300 dark:text-slate-400">{title}</span>
            <button
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-1 px-2 rounded-md transition-colors"
                aria-label="Копировать код"
            >
                {copied ? 'Скопировано!' : 'Копировать'}
            </button>
       </div>
      <pre className="text-white p-4 text-base overflow-x-auto mt-0 rounded-b-lg bg-transparent">
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

// This component was completely re-architected to solve a fundamental clipping issue.
// It now uses a React Portal to render the tooltip at the document root, ensuring it
// is never obscured by parent elements with `overflow: hidden` or `z-index` stacking.
// This change directly upholds "Principle 4: Flawless UI Quality" from the README.md.
export const TooltipTerm: React.FC<TooltipTermProps> = ({ children, definition }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 12, // 12px margin from trigger
                left: rect.left + rect.width / 2,
            });
            setIsVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const tooltipContent = (
        <div
            className="fixed p-4 bg-slate-800 dark:bg-slate-900 text-slate-100 dark:text-slate-200 text-base leading-relaxed font-sans rounded-lg shadow-lg z-[60] w-max max-w-sm transition-opacity duration-200 ease-in-out"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translate(-50%, -100%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: 'none',
            }}
            role="tooltip"
        >
            {definition}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800 dark:border-t-slate-900"></div>
        </div>
    );
    
    const portal = isMounted ? ReactDOM.createPortal(tooltipContent, document.getElementById('tooltip-root')!) : null;

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-indigo-500 dark:text-indigo-400 font-semibold underline decoration-indigo-300 dark:decoration-indigo-500 decoration-dashed underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-300 hover:decoration-solid hover:decoration-indigo-500 dark:hover:decoration-indigo-400 transition-all cursor-help"
            >
                {children}
            </span>
            {portal}
        </>
    );
};


// --- Modal (Portal Implementation) ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const [isMounted, setIsMounted] = useState(false);

    // This effect runs only once on the client to confirm that the component has mounted.
    // This is necessary for the portal to work correctly without SSR issues.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // This effect handles all side-effects related to the modal's open state,
    // such as disabling body scroll and adding an escape key listener.
    useEffect(() => {
        if (!isOpen) {
            return; // Do nothing if the modal is not open.
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        // The cleanup function is crucial: it runs when `isOpen` changes from true to false
        // or when the component unmounts, ensuring all side-effects are reversed.
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isMounted || !isOpen) {
        return null;
    }

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        console.error('The element #modal-root was not found in the DOM.');
        return null;
    }

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[100] flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            <div
                role="document"
                className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full m-4 border border-gray-200 dark:border-slate-800 animate-modal-enter"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <h3 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-200">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform hover:scale-110"
                        aria-label="Закрыть модальное окно"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto text-base">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};
