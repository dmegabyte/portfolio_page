import React, { useState, ReactNode, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { 
    ChevronDownIcon, XMarkIcon, InformationCircleIcon, MagnifyingGlassIcon, ChartBarIcon, 
    HandRaisedIcon, CheckCircleIcon, ShieldCheckIcon, EnvelopeOpenIcon, PaintBrushIcon, CheckIcon,
    Cog6ToothIcon, UsersIcon, UserGroupIcon, SparklesIcon 
} from '@heroicons/react/24/outline';
import { useModalLogic } from '../hooks/useModalLogic';
import { GlossaryItem } from '../data/glossary';

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
    <div className="bg-white dark:bg-slate-800/50 rounded-lg py-4 px-6 border border-transparent hover:shadow-sm transition-all duration-300 not-prose flex flex-col">
        <div className="flex items-center gap-4 mb-3">
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
        <div className="my-6 not-prose border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center p-4 text-lg text-left cursor-pointer text-slate-900 dark:text-slate-200 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
                <span className="font-semibold">{title}</span>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 dark:text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="p-6 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
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
const highlightCode = (code: string, language?: 'json') => {
    if (language !== 'json') {
        return <code>{code.trim()}</code>;
    }

    const highlighted = code.trim().replace(
        /(\/\/.*$)|("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/gm,
        (match, comment, jsonToken, _stringContent, colon) => {
            if (comment) {
                return `<span class="text-slate-500 italic">${comment}</span>`;
            }
            if (jsonToken) {
                let cls = 'text-purple-400'; // number default
                if (/^"/.test(jsonToken)) {
                    if (colon) { // The colon capture group matched, so it's a key.
                        cls = 'text-cyan-400';
                    } else {
                        cls = 'text-emerald-400'; // string value
                    }
                } else if (/true|false/.test(jsonToken)) {
                    cls = 'text-amber-400'; // boolean
                } else if (/null/.test(jsonToken)) {
                    cls = 'text-rose-400'; // null
                }
                return `<span class="${cls}">${jsonToken}</span>`;
            }
            return match;
        }
    );

    return <code dangerouslySetInnerHTML={{ __html: highlighted }} />;
};

interface CodeBlockWithCopyProps {
    code: string;
    title: string;
    language?: 'json';
}
export const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({ code, title, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeToCopy = code
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim();
        
    navigator.clipboard.writeText(codeToCopy).then(() => {
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
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold py-1 px-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 flex items-center gap-1.5"
                aria-label="Копировать код"
                aria-live="polite"
            >
                {copied ? (
                    <>
                        <CheckIcon className="w-4 h-4 text-green-400" />
                        <span>Скопировано!</span>
                    </>
                ) : (
                    'Копировать'
                )}
            </button>
       </div>
      <pre className="text-slate-300 p-4 text-base overflow-x-auto mt-0 rounded-b-lg bg-transparent custom-scrollbar">
        {highlightCode(code, language)}
      </pre>
    </div>
  );
};

// --- Simple Code Block ---
interface SimpleCodeBlockProps {
    children: React.ReactNode;
}
export const SimpleCodeBlock: React.FC<SimpleCodeBlockProps> = ({ children }) => (
    <pre className="text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded-lg custom-scrollbar overflow-x-auto not-prose" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        <code>{children}</code>
    </pre>
);

// --- Data Table ---
interface TableProps {
    headers: string[];
    data: (string | number | ReactNode)[][];
}
// FIX: Exported the `Table` component so it could be imported and used in other files.
export const Table: React.FC<TableProps> = ({ headers, data }) => (
    <div className="overflow-x-auto my-4 not-prose">
        <table className="w-full text-left border-collapse">
            <thead className="text-base font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                <tr>
                    {headers.map(header => (
                        <th key={header} className="p-3 border border-gray-200 dark:border-slate-700">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900/50 text-gray-700 dark:text-slate-300">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b dark:border-slate-700 last:border-b-0">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-3 border-x border-gray-200 dark:border-slate-700">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

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
                className="text-indigo-500 dark:text-indigo-400 font-semibold underline decoration-indigo-300 dark:decoration-indigo-500 decoration-dashed underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-300 hover:decoration-solid hover:decoration-indigo-500 dark:hover:decoration-indigo-400 transition-all cursor-help focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-interactive-primary)] ring-offset-[var(--ring-offset-light)] dark:focus-ring-offset-[var(--ring-offset-dark-card)] rounded-sm"
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
                <div className="p-6 max-h-[70vh] overflow-y-auto text-base custom-scrollbar">
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

// --- Interactive Glossary ---
interface InteractiveGlossaryProps {
  items: GlossaryItem[];
}

const categoryConfig = {
    'Основные понятия': { icon: Cog6ToothIcon, color: 'text-sky-500 dark:text-sky-400' },
    'Сегментация': { icon: UsersIcon, color: 'text-indigo-500 dark:text-indigo-400' },
    'Типы клиентов': { icon: UserGroupIcon, color: 'text-teal-500 dark:text-teal-400' },
    'Маркетинг': { icon: SparklesIcon, color: 'text-amber-500 dark:text-amber-400' },
};
type Category = keyof typeof categoryConfig;

export const InteractiveGlossary: React.FC<InteractiveGlossaryProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Все');

    const categories = ['Все', ...Object.keys(categoryConfig)];

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesCategory = activeCategory === 'Все' || item.category === activeCategory;
            const matchesSearch = searchTerm === '' || 
                                  item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.definition.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [items, activeCategory, searchTerm]);

    const highlightText = (text: string, highlight: string): React.ReactNode => {
        if (!highlight.trim()) {
            return text;
        }
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedHighlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} className="bg-yellow-200 dark:bg-yellow-700/50 px-0.5 rounded-sm text-black dark:text-yellow-100">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div className="not-prose">
            <div className="relative mb-6" role="search">
                <label htmlFor="glossary-search" className="sr-only">
                    Поиск по глоссарию
                </label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-slate-500" aria-hidden="true" />
                </div>
                <input
                    id="glossary-search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск по терминам и определениям..."
                    className="block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-10 pr-10 text-slate-900 dark:text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {searchTerm && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            onClick={() => setSearchTerm('')}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Очистить поиск"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-8 flex flex-wrap gap-3 border-b border-gray-200 dark:border-slate-700 pb-4">
                {categories.map(category => {
                    const isActive = activeCategory === category;
                    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800";
                    const activeClasses = "bg-indigo-600 text-white shadow";
                    const inactiveClasses = "bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700";
                    
                    return (
                        <button key={category} onClick={() => setActiveCategory(category)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                            {category}
                        </button>
                    )
                })}
            </div>

            {filteredItems.length > 0 ? (
                <div className="space-y-6">
                    {filteredItems.map((item, index) => {
                        const { icon: Icon, color } = categoryConfig[item.category as Category];
                        return (
                            <div key={index} className="flex items-start gap-4">
                                <div className={`flex-shrink-0 mt-1 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700`}>
                                    {Icon && <Icon className={`w-6 h-6 ${color}`} />}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-200 text-lg">
                                        {highlightText(item.term, searchTerm)}
                                    </h4>
                                    <p className="mt-1 text-slate-700 dark:text-slate-300">
                                        {highlightText(item.definition, searchTerm)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">По вашему запросу ничего не найдено.</p>
                </div>
            )}
        </div>
    );
};


// --- Annotated Code Block ---
interface AnnotatedCodeBlockProps {
    title: string;
    annotationTitle: string;
    items: { code: string; annotation: string; isHighlighted?: boolean }[];
}
export const AnnotatedCodeBlock: React.FC<AnnotatedCodeBlockProps> = ({ title, annotationTitle, items }) => {
    // No item is selected by default to encourage user interaction and discovery.
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleInteraction = (index: number) => {
        // Allow toggling the active annotation off by clicking it again.
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="relative not-prose bg-slate-900 rounded-lg border border-slate-700 shadow-lg my-6">
            <div className="px-4 py-2 border-b border-slate-700">
                <span className="text-sm font-semibold text-slate-400">{title}</span>
            </div>
            <div className="flex flex-col md:flex-row">
                {/* Code Area */}
                <div className="md:w-1/2 p-4">
                    <ul className="text-slate-300 text-base bg-transparent font-mono list-none p-0 m-0" role="listbox">
                        {items.map((item, index) => (
                            <li key={index} role="option" aria-selected={activeIndex === index}>
                                <button
                                    onClick={() => handleInteraction(index)}
                                    className={`
                                        block w-full text-left p-1 rounded-md transition-colors duration-200 cursor-pointer
                                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
                                        ${activeIndex === index ? 'bg-indigo-900/50' : 'hover:bg-slate-800/50'}
                                        ${item.isHighlighted ? 'font-bold text-sky-300' : ''}
                                    `}
                                >
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{item.code}</div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Annotation Area */}
                <div className="md:w-1/2 p-4 border-t md:border-t-0 md:border-l border-slate-700 bg-slate-800/50 rounded-b-lg md:rounded-b-none md:rounded-r-lg">
                    <h4 className="text-sm font-semibold text-slate-400 mb-4">{annotationTitle}</h4>
                    <div className="relative h-full min-h-[150px] flex items-center">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    absolute inset-0 transition-opacity duration-300
                                    ${activeIndex === index ? 'opacity-100' : 'opacity-0'}
                                `}
                                aria-hidden={activeIndex !== index}
                                aria-live="polite"
                            >
                                <div className="flex items-start gap-3">
                                    <InformationCircleIcon className="w-5 h-5 mt-1 flex-shrink-0 text-sky-400" />
                                    <p className="text-slate-300 text-base break-words">{item.annotation}</p>
                                </div>
                            </div>
                        ))}
                         {activeIndex === null && (
                            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                                Кликните на строку кода, чтобы увидеть описание.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Line Chart (Overhauled for Snap-to-Point Interactivity) ---
interface YKeyConfig {
    key: string;
    color: string;
    label: string;
    axis?: 'left' | 'right';
}

interface LineChartConfig {
    xKey: string;
    yKeys: YKeyConfig[];
    yAxisLabelLeft: string;
    yAxisLabelRight?: string;
    height?: number;
}

interface LineChartProps {
    data: any[];
    config: LineChartConfig;
    onPointClick?: (dataPoint: any) => void;
}

export const LineChart: React.FC<LineChartProps> = ({ data, config, onPointClick }) => {
    const { xKey, yKeys, yAxisLabelLeft, yAxisLabelRight, height = 450 } = config;
    const [tooltip, setTooltip] = useState<{ index: number; dataPoint: any; dataX: number } | null>(null);
    const [hoveredLegendKey, setHoveredLegendKey] = useState<string | null>(null);
    const chartRef = useRef<SVGSVGElement>(null);
    
    const padding = { top: 20, right: 60, bottom: 60, left: 60 };
    const width = 800;

    const { chartWidth, chartHeight, xScale, yScaleLeft, yScaleRight, linePaths, yTicksLeft, yTicksRight } = useMemo(() => {
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        const leftKeys = yKeys.filter(k => k.axis !== 'right');
        const rightKeys = yKeys.filter(k => k.axis === 'right');

        const allYLeftValues = data.flatMap(d => leftKeys.map(k => d[k.key])).filter(v => typeof v === 'number');
        const calculatedYMaxLeft = allYLeftValues.length > 0 ? Math.max(...allYLeftValues) : 0;
        const yMaxLeft = Math.max(10, Math.ceil(Math.max(0, calculatedYMaxLeft) / 10) * 10);

        const allYRightValues = data.flatMap(d => rightKeys.map(k => d[k.key])).filter(v => typeof v === 'number');
        const calculatedYMaxRight = allYRightValues.length > 0 ? Math.max(...allYRightValues) : 0;
        const yMaxRight = Math.max(5, Math.ceil(Math.max(0, calculatedYMaxRight) / 5) * 5);

        const xScale = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
        const yScaleLeft = (value: number) => padding.top + chartHeight - (value / yMaxLeft) * chartHeight;
        const yScaleRight = (value: number) => padding.top + chartHeight - (value / yMaxRight) * chartHeight;

        const linePaths = yKeys.map(yKey => {
            const yScale = yKey.axis === 'right' ? yScaleRight : yScaleLeft;
            const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d[yKey.key])}`).join(' ');
            return { ...yKey, path };
        });

        const numTicks = 4;
        const yTicksLeft = Array.from({ length: numTicks + 1 }, (_, i) => {
            const value = Math.round(yMaxLeft - (i * yMaxLeft / numTicks));
            return { value, y: padding.top + i * (chartHeight / numTicks) };
        });

        const yTicksRight = Array.from({ length: numTicks + 1 }, (_, i) => {
            const value = Math.round(yMaxRight - (i * yMaxRight / numTicks));
            return { value, y: padding.top + i * (chartHeight / numTicks) };
        });

        return { chartWidth, chartHeight, xScale, yScaleLeft, yScaleRight, linePaths, yTicksLeft, yTicksRight };
    }, [data, yKeys, height, padding.top, padding.right, padding.bottom, padding.left]);

    const handlePointHover = useCallback((index: number | null) => {
        if (index !== null && data[index]) {
            setTooltip({
                index,
                dataPoint: data[index],
                dataX: xScale(index),
            });
        } else {
            setTooltip(null);
        }
    }, [data, xScale]);

    return (
        <div className="not-prose my-6 bg-[#1A202C] dark:bg-slate-900 rounded-xl p-6 border border-gray-700 dark:border-slate-700 overflow-hidden shadow-2xl">
            <svg 
                ref={chartRef} 
                viewBox={`0 0 ${width} ${height}`} 
                className="w-full h-auto text-slate-400" 
                aria-labelledby="chart-title" 
                role="graphics-document"
            >
                <title id="chart-title">График динамики эффективности</title>
                
                {/* Axes and Grid */}
                <g className="text-sm select-none">
                    {yTicksLeft.map(({ value, y }) => (
                        <g key={`grid-${value}`}>
                            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="currentColor" strokeDasharray="3,6" opacity="0.2" />
                            <text x={padding.left - 12} y={y + 4} textAnchor="end" fill="currentColor">{value}</text>
                        </g>
                    ))}
                    <text transform={`rotate(-90)`} y={15} x={-(padding.top + chartHeight / 2)} textAnchor="middle" className="fill-current font-semibold text-slate-300">{yAxisLabelLeft}</text>

                    {yAxisLabelRight && yTicksRight.map(({ value, y }) => (
                         <text key={`y-right-${value}`} x={width - padding.right + 12} y={y + 4} fill="currentColor">{value}</text>
                    ))}
                    {yAxisLabelRight && <text transform={`rotate(90)`} y={-(width - 15)} x={(padding.top + chartHeight / 2)} textAnchor="middle" className="fill-current font-semibold text-slate-300">{yAxisLabelRight}</text>}

                    {data.map((d, i) => (
                        <text key={i} x={xScale(i)} y={height - padding.bottom + 25} textAnchor="middle" fill="currentColor" className="text-slate-300">{d[xKey]}</text>
                    ))}
                </g>

                {/* Lines and Points */}
                <g>
                    {linePaths.map(({ key, path, color }) => (
                        <path key={key} d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-opacity duration-300" style={{ opacity: hoveredLegendKey && hoveredLegendKey !== key ? 0.15 : 1 }} />
                    ))}
                    {data.map((d, i) => yKeys.map(yKey => {
                        const yScale = yKey.axis === 'right' ? yScaleRight : yScaleLeft;
                        return (
                             <circle key={`${yKey.key}-${i}`} cx={xScale(i)} cy={yScale(d[yKey.key])} r={tooltip?.index === i ? 9 : 5} fill={yKey.color} className="transition-all duration-300 ease-in-out" style={{ opacity: hoveredLegendKey && hoveredLegendKey !== yKey.key ? 0.15 : 1 }}/>
                        );
                    }))}
                </g>

                {/* Interaction Hover Layer */}
                <g onMouseLeave={() => handlePointHover(null)}>
                    {data.map((_, i) => {
                        const sliceWidth = chartWidth / (data.length - 1);
                        const isFirst = i === 0;
                        const isLast = i === data.length - 1;

                        const rectX = isFirst ? padding.left : xScale(i) - sliceWidth / 2;
                        const rectWidth = isFirst || isLast ? sliceWidth / 2 : sliceWidth;

                        return (
                            <rect
                                key={`hover-rect-${i}`}
                                x={rectX}
                                y={padding.top}
                                width={rectWidth}
                                height={chartHeight}
                                fill="transparent"
                                onMouseEnter={() => handlePointHover(i)}
                                onClick={() => onPointClick?.(data[i])}
                                style={{ cursor: onPointClick ? 'pointer' : 'default' }}
                            />
                        );
                    })}
                </g>
                
                {/* Tooltip and Guide Line */}
                {tooltip && (
                    <g pointerEvents="none" className="animate-subtle-fade-in">
                        <line x1={tooltip.dataX} y1={padding.top} x2={tooltip.dataX} y2={padding.top + chartHeight} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
                        
                        <foreignObject 
                            x={tooltip.dataX > width / 2 ? tooltip.dataX - 250 - 20 : tooltip.dataX + 20} 
                            y={padding.top + 10}
                            width="250"
                            height={yKeys.length * 28 + 50}
                        >
                            <div className="bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl p-4 text-white font-sans">
                                <p className="font-bold text-lg mb-3 text-slate-100">{tooltip.dataPoint[xKey]}</p>
                                <div className="space-y-2">
                                    {yKeys.map((yk) => (
                                        <div key={yk.key} className="flex items-center justify-between text-base">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: yk.color }}></span>
                                                <span className="text-slate-300">{yk.label}:</span>
                                            </div>
                                            <span className="font-bold text-slate-100">{tooltip.dataPoint[yk.key]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </foreignObject>
                    </g>
                )}
            </svg>
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 text-sm" onMouseLeave={() => setHoveredLegendKey(null)}>
                {yKeys.map(yk => (
                    <div key={yk.key} className="flex items-center gap-2 cursor-pointer transition-opacity duration-300" style={{ opacity: hoveredLegendKey && hoveredLegendKey !== yk.key ? 0.4 : 1 }} onMouseEnter={() => setHoveredLegendKey(yk.key)}>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: yk.color }}></span>
                        <span className="text-slate-200">{yk.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Status Badge ---
interface StatusBadgeProps {
  status: 'green' | 'red' | 'yellow' | 'stop' | 'go';
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    go: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    red: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    stop: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300',
  };
  const statusKey = status.toLowerCase() as keyof typeof colorClasses;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClasses[statusKey]}`}>
      {children}
    </span>
  );
};

// --- JSON Report Viewer ---
interface ReportData {
  final_verdict: 'STOP' | 'GO';
  reputation_check: { status: string; details: string };
  content_check: { status: string; flags: { risk: string; comment: string }[] };
  rendering_check: { status: string; details: string };
}

interface JsonReportViewerProps {
  data: ReportData;
}

export const JsonReportViewer: React.FC<JsonReportViewerProps> = ({ data }) => {
  const isStop = data.final_verdict === 'STOP';

  const verdictIcon = isStop 
    ? <HandRaisedIcon className="w-10 h-10" /> 
    : <CheckCircleIcon className="w-10 h-10" />;
  
  const verdictBg = isStop 
    ? 'bg-red-800/80 dark:bg-red-900/60 border-red-700/50' 
    : 'bg-green-800/80 dark:bg-green-900/60 border-green-700/50';
  
  const verdictText = isStop ? 'text-red-100' : 'text-green-100';

  return (
    <div className="not-prose my-6 bg-slate-900 rounded-lg border border-slate-700 shadow-2xl p-6 space-y-6 font-sans">
      
      {/* Final Verdict */}
      <div className={`flex items-center gap-6 p-6 rounded-lg ${verdictBg} text-white`}>
        <div className={verdictText}>{verdictIcon}</div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Финальный вердикт</h3>
          <p className="text-4xl font-extrabold">{data.final_verdict}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Reputation Check */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-lg text-slate-200 flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-slate-400" />
              Анализ репутации
            </h4>
            <StatusBadge status={data.reputation_check.status as any}>{data.reputation_check.status.toUpperCase()}</StatusBadge>
          </div>
          <p className="text-slate-400 text-sm">{data.reputation_check.details}</p>
        </div>

        {/* Content Check */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-lg text-slate-200 flex items-center gap-2">
              <EnvelopeOpenIcon className="w-6 h-6 text-slate-400" />
              Анализ контента
            </h4>
            <StatusBadge status={data.content_check.status as any}>{data.content_check.status.toUpperCase()}</StatusBadge>
          </div>
          <div className="space-y-3 border-t border-slate-700 pt-3">
            {data.content_check.flags.map((flag, index) => (
              <div key={index} className="flex items-start gap-3">
                <StatusBadge status={flag.risk as any}>{flag.risk.toUpperCase()}</StatusBadge>
                <p className="text-slate-300 text-sm mt-px">{flag.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rendering Check */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-lg text-slate-200 flex items-center gap-2">
              <PaintBrushIcon className="w-6 h-6 text-slate-400" />
              Анализ рендеринга
            </h4>
            <StatusBadge status={data.rendering_check.status as any}>{data.rendering_check.status.toUpperCase()}</StatusBadge>
          </div>
          <p className="text-slate-400 text-sm">{data.rendering_check.details}</p>
        </div>
      </div>
    </div>
  );
};