

import React, { useState, ReactNode, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { ChevronDownIcon, XMarkIcon, InformationCircleIcon, MagnifyingGlassIcon, ChartBarIcon } from '@heroicons/react/24/outline';
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
export const Table: React.FC<TableProps> = ({ headers, data }) => (
    <div className="overflow-x-auto my-4 not-prose">
        <table className="w-full text-left border-collapse">
            <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
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

// --- Definition List ---
interface DefinitionListProps {
  items: { term: string; definition: string }[];
}
export const DefinitionList: React.FC<DefinitionListProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const highlightText = (text: string, highlight: string): React.ReactNode => {
        if (!highlight.trim()) {
            return text;
        }
        // Escape special characters in the highlight string for RegExp
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
                    className="block w-full rounded-md border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-2 pl-10 pr-10 text-slate-900 dark:text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

            {filteredItems.length > 0 ? (
                <dl className="-my-4 divide-y divide-gray-200 dark:divide-slate-700">
                    {filteredItems.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-x-8 items-baseline py-4">
                            <dt className="md:col-span-1 font-bold text-slate-900 dark:text-slate-200">
                                {highlightText(item.term, searchTerm)}
                            </dt>
                            <dd className="md:col-span-3 lg:col-span-4 mt-2 md:mt-0 text-slate-700 dark:text-slate-300">
                                {highlightText(item.definition, searchTerm)}
                            </dd>
                        </div>
                    ))}
                </dl>
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
                        <g transform={`translate(${tooltip.dataX > width / 2 ? tooltip.dataX - 210 : tooltip.dataX + 20}, ${padding.top + 10})`}>
                            <rect x="0" y="0" width="190" height={yKeys.length * 22 + 35} rx="8" ry="8" fill="rgba(15, 23, 42, 0.85)" stroke="#4A5568" style={{ backdropFilter: 'blur(4px)' }} />
                            <text x="12" y="24" fill="#F7FAFC" className="font-bold text-base">{tooltip.dataPoint[xKey]}</text>
                            {yKeys.map((yk, index) => (
                                <g key={yk.key} transform={`translate(12, ${48 + index * 22})`}>
                                    <circle cx="0" cy="0" r="5" fill={yk.color} />
                                    <text x="12" y="4" fill="#E2E8F0" className="text-sm">
                                        {yk.label}: <tspan className="font-bold">{tooltip.dataPoint[yk.key]}</tspan>
                                    </text>
                                </g>
                            ))}
                        </g>
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