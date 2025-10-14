import React, { useState, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDownIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useModalLogic } from '../hooks/useModalLogic';

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
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="not-prose border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={`w-full flex justify-between items-center p-4 font-bold text-lg text-left cursor-pointer text-slate-900 dark:text-slate-200 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors duration-200 ${isOpen ? 'border-b border-gray-200 dark:border-slate-700' : ''}`}
            >
                <span>{title}</span>
                <div className="p-1 rounded-full bg-white/50 dark:bg-slate-700/50">
                    <ChevronDownIcon className={`w-5 h-5 text-gray-600 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}/>
                </div>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden bg-white dark:bg-slate-800 rounded-b-lg">
                    <div className="p-6">
                        <div className="prose prose-base dark:prose-invert max-w-none">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


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
    <div className="relative not-prose bg-slate-900 rounded-lg border border-slate-700 shadow-lg my-6">
       <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700">
            <span className="text-sm font-semibold text-slate-400">{title}</span>
            <button
                onClick={handleCopy}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold py-1 px-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
                aria-label="Копировать код"
            >
                {copied ? 'Скопировано!' : 'Копировать'}
            </button>
       </div>
      <pre className="text-slate-300 p-4 text-base overflow-x-auto mt-0 rounded-b-lg bg-transparent">
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
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const tooltipId = React.useId();

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const handleShow = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 12, // 12px margin from trigger
                left: rect.left + rect.width / 2,
            });
            setIsVisible(true);
        }
    };

    const handleHide = () => {
        setIsVisible(false);
    };

    const tooltipContent = (
        <div
            id={tooltipId}
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
                onMouseEnter={handleShow}
                onMouseLeave={handleHide}
                onFocus={handleShow}
                onBlur={handleHide}
                tabIndex={0}
                aria-describedby={isVisible ? tooltipId : undefined}
                className="text-indigo-500 dark:text-indigo-400 font-semibold underline decoration-indigo-300 dark:decoration-indigo-500 decoration-dashed underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-300 hover:decoration-solid hover:decoration-indigo-500 dark:hover:decoration-indigo-400 transition-all cursor-help focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-interactive-primary)] ring-offset-[var(--ring-offset-light)] dark:focus:ring-offset-[var(--ring-offset-dark-card)] rounded-sm"
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
    const modalRef = useRef<HTMLDivElement>(null);
    useModalLogic({ isOpen, onClose, modalRef });

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                ref={modalRef}
                role="document"
                className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full m-4 border border-gray-200 dark:border-slate-800 animate-modal-enter"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-800 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <h3 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-slate-200">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-interactive-primary)] transition-transform hover:scale-110"
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

// --- Read More Toggle ---
interface ReadMoreProps {
    children: ReactNode;
    lines: number;
}
export const ReadMore: React.FC<ReadMoreProps> = ({ children, lines }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const dynamicStyle: React.CSSProperties = !isExpanded ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
    } : {};
    
    useEffect(() => {
        const checkOverflow = () => {
            const element = contentRef.current;
            if (element) {
                const hasOverflow = element.scrollHeight > element.clientHeight;
                setShowButton(hasOverflow);
            }
        };
        
        const timer = setTimeout(checkOverflow, 100);
        window.addEventListener('resize', checkOverflow);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [children, lines]);


    return (
        <div>
            <div ref={contentRef} style={dynamicStyle}>
                {children}
            </div>
            {(showButton || isExpanded) && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 mt-2"
                >
                    {isExpanded ? 'Читать меньше' : 'Читать дальше'}
                </button>
            )}
        </div>
    );
};

// --- Definition List ---
interface DefinitionListProps {
  items: { term: string; definition: string }[];
}
export const DefinitionList: React.FC<DefinitionListProps> = ({ items }) => (
    <dl className="space-y-4">
        {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row text-base p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                <dt className="w-full sm:w-1/3 flex-shrink-0 font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {item.term}
                </dt>
                <dd className="w-full sm:w-2/3 text-gray-700 dark:text-slate-300 sm:pl-4 mt-1 sm:mt-0">
                    {item.definition}
                </dd>
            </div>
        ))}
    </dl>
);

// --- Annotated Code Block ---
interface AnnotatedCodeBlockProps {
    title: string;
    items: { code: string; annotation: string; isHighlighted?: boolean }[];
}
export const AnnotatedCodeBlock: React.FC<AnnotatedCodeBlockProps> = ({ title, items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="relative not-prose bg-slate-900 rounded-lg border border-slate-700 shadow-lg my-6">
            <div className="px-4 py-2 border-b border-slate-700">
                <span className="text-sm font-semibold text-slate-400">{title}</span>
            </div>
            <div className="flex flex-col md:flex-row">
                {/* Code Area */}
                <div className="md:w-1/2 p-4">
                    <pre className="text-slate-300 text-base mt-0 bg-transparent">
                        <code className="flex flex-col">
                            {items.map((item, index) => (
                                <span
                                    key={index}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    className={`
                                        block p-1 rounded-md transition-colors duration-200 cursor-pointer
                                        ${activeIndex === index ? 'bg-indigo-900/50' : 'hover:bg-slate-800/50'}
                                        ${item.isHighlighted ? 'font-bold text-sky-300' : ''}
                                    `}
                                >
                                    {item.code}
                                </span>
                            ))}
                        </code>
                    </pre>
                </div>
                {/* Annotation Area */}
                <div className="md:w-1/2 p-4 border-t md:border-t-0 md:border-l border-slate-700 bg-slate-800/50 rounded-b-lg md:rounded-b-none md:rounded-r-lg">
                    <div className="relative h-full min-h-[150px]">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    absolute inset-0 transition-opacity duration-300
                                    ${activeIndex === index ? 'opacity-100' : 'opacity-0'}
                                `}
                                aria-hidden={activeIndex !== index}
                            >
                                <div className="flex items-start gap-3">
                                    <InformationCircleIcon className="w-5 h-5 mt-0.5 text-sky-400 flex-shrink-0" />
                                    <p className="text-slate-300 text-sm">{item.annotation}</p>
                                </div>
                            </div>
                        ))}
                         {activeIndex === null && (
                            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                                Наведите на строку кода, чтобы увидеть описание.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
