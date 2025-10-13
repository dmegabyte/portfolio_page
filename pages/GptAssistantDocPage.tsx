import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CollapsibleSection, Modal } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon, MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon,
    PencilSquareIcon, PaperAirplaneIcon, BookOpenIcon, BeakerIcon, ExclamationTriangleIcon, CodeBracketIcon, Cog6ToothIcon, ClockIcon, FolderOpenIcon, LinkIcon,
    ArrowLongDownIcon, BugAntIcon
} from '@heroicons/react/24/outline';


// --- Local Components for the Diagram ---

// This new, self-contained component is created to solve the accessibility issues of the original diagram.
// It wraps each stage in a semantic <button> and ensures the tooltip is keyboard-accessible,
// fully complying with Principle #6 (Accessibility is Not Optional).
interface WorkflowStageProps {
    icon: ReactNode;
    title: string;
    tooltip: string;
    className?: string;
    style?: React.CSSProperties;
}
const WorkflowStage: React.FC<WorkflowStageProps> = ({ icon, title, tooltip, className, style }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const showTooltip = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 12,
                left: rect.left + rect.width / 2,
            });
            setIsVisible(true);
        }
    };

    const hideTooltip = () => {
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
            id={`tooltip-for-${title.replace(/\s+/g, '-')}`}
        >
            {tooltip}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800 dark:border-t-slate-900"></div>
        </div>
    );
    
    const portal = isMounted ? ReactDOM.createPortal(tooltipContent, document.getElementById('tooltip-root')!) : null;

    return (
        <>
            <button
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                className={`flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm w-full max-w-[180px] h-full hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 ${className}`}
                style={style}
                aria-describedby={isVisible ? `tooltip-for-${title.replace(/\s+/g, '-')}` : undefined}
            >
                {icon}
                <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200 flex-grow flex items-center">{title}</h4>
            </button>
            {portal}
        </>
    );
};

// A dedicated component for interactive icons with tooltips, ensuring accessibility.
interface InteractiveIconProps {
    icon: ReactNode;
    tooltip: string;
    className?: string;
    style?: React.CSSProperties;
}
const InteractiveIcon: React.FC<InteractiveIconProps> = ({ icon, tooltip, className, style }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);
    
    const showTooltip = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.top - 12,
                left: rect.left + rect.width / 2,
            });
            setIsVisible(true);
        }
    };
    const hideTooltip = () => { setIsVisible(false); };
    
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
            id="tooltip-for-decision-arrow"
        >
            {tooltip}
             <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-800 dark:border-t-slate-900"></div>
        </div>
    );
    const portal = isMounted ? ReactDOM.createPortal(tooltipContent, document.getElementById('tooltip-root')!) : null;

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                className={`p-2 rounded-full transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
                style={style}
                tabIndex={0}
                aria-describedby={isVisible ? 'tooltip-for-decision-arrow' : undefined}
            >
                {icon}
            </div>
            {portal}
        </>
    );
};

const TicketWorkflowDiagram: React.FC = () => {
    const diagramRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = diagramRef.current?.querySelectorAll('.workflow-stage');
        if (elements) elements.forEach((el) => observer.observe(el));

        return () => {
            if (elements) elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const scoreExplanation = "`confident-score` — это ключевая метрика (от 0 до 100), которая отражает уверенность AI в точности и полноте сгенерированного ответа. Если score высокий (≥ 80%), система отправляет ответ автоматически. Если низкий — создается черновик для проверки оператором, чтобы избежать отправки потенциально неверной информации.";

    const stages = [
        { icon: <InboxArrowDownIcon className="w-10 h-10 text-indigo-500"/>, title: "1. Получение обращения", tooltip: "Запрос от клиента поступает в систему из тикет-системы Omnidesk и становится отправной точкой для всего процесса анализа." },
        { icon: <ShieldCheckIcon className="w-10 h-10 text-indigo-500"/>, title: "2. Фильтрация и безопасность", tooltip: "Продвинутый спам-фильтр анализирует контент, а валидатор проверяет все ссылки на предмет фишинга и вредоносного ПО." },
        { icon: <MagnifyingGlassIcon className="w-10 h-10 text-indigo-500"/>, title: "3. Анализ и поиск фактов (RAG)", tooltip: "Система производит семантический поиск по векторной базе знаний, чтобы найти наиболее релевантную информацию для ответа." },
        { icon: <SparklesIcon className="w-10 h-10 text-indigo-500"/>, title: "4. Подготовка ответа", tooltip: "Модель GPT-4o создает черновик ответа, основываясь на найденных фактах из базы знаний и исходном вопросе клиента." }
    ];

    return (
        <div className="not-prose my-8" ref={diagramRef}>
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex flex-col items-center">
                    {/* Main Pipeline */}
                    <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4">
                        {stages.map((stage, index) => (
                            <React.Fragment key={stage.title}>
                                <WorkflowStage 
                                    icon={stage.icon} 
                                    title={stage.title} 
                                    tooltip={stage.tooltip}
                                    className="workflow-stage"
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                />
                                {index < stages.length - 1 && (
                                    <div className="flex items-center justify-center workflow-stage" style={{ transitionDelay: `${index * 150 + 75}ms` }}>
                                        <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 hidden lg:block" />
                                        <ArrowLongDownIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 lg:hidden" />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    
                    <div className="flex w-full flex-col items-center mt-4 lg:mt-4">
                        <ArrowLongDownIcon className="h-10 w-10 text-gray-400 dark:text-slate-500 workflow-stage" style={{ transitionDelay: '600ms' }} />
                    </div>

                    {/* Step 5 with integrated branching */}
                    <div className="w-full flex flex-col items-center relative workflow-stage" style={{ transitionDelay: '750ms' }}>
                        <WorkflowStage 
                            icon={<ScaleIcon className="w-10 h-10 text-indigo-500"/>} 
                            title="5. Оценка и принятие решения" 
                            tooltip="Система рассчитывает метрику уверенности (`confident-score`), чтобы оценить, насколько AI уверен в точности и полноте сгенерированного ответа." 
                        />
                         {/* Branching Visual with Interactive Tooltip */}
                         <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 flex w-full max-w-3xl flex-col items-center">
                             <InteractiveIcon
                                 className="hover:bg-gray-100 dark:hover:bg-slate-700/50"
                                 tooltip={scoreExplanation}
                                 icon={<ArrowLongDownIcon className="h-10 w-10 text-gray-400 dark:text-slate-500" />}
                             />
                             {/* Desktop Branching Lines */}
                             <div className="hidden md:flex justify-center items-start w-full mt-4">
                                 <div className="w-1/2 h-4 border-b border-r border-gray-300 dark:border-slate-600"></div>
                                 <div className="w-1/2 h-4 border-b border-l border-gray-300 dark:border-slate-600"></div>
                             </div>
                         </div>
                    </div>
                    
                     {/* Decision Outcomes */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-0 w-full max-w-3xl mt-[120px]">
                         {[{ 
                                icon: <PaperAirplaneIcon className="w-10 h-10 text-green-500 -rotate-45"/>, 
                                title: "Автоответ", 
                                description: "Если `score` высокий, ответ отправляется клиенту автоматически.",
                                borderColor: "border-green-300 dark:border-green-700",
                                textColor: "text-green-800 dark:text-green-300",
                                label: "`score` высокий",
                                labelClasses: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700"
                            }, { 
                                icon: <PencilSquareIcon className="w-10 h-10 text-yellow-600"/>, 
                                title: "Черновик + Саммари", 
                                description: "Если `score` низкий, создается черновик и краткая сводка для оператора.",
                                borderColor: "border-yellow-300 dark:border-yellow-700",
                                textColor: "text-yellow-800 dark:text-yellow-300",
                                label: "`score` низкий",
                                labelClasses: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700"
                            }].map((outcome, index) => (
                                <div key={outcome.title} className="flex flex-col items-center text-center workflow-stage" style={{ transitionDelay: `${900 + index * 150}ms` }}>
                                    <div className="md:hidden w-px h-4 bg-gray-300 dark:bg-slate-600 mb-4"></div>
                                    <span className={`font-mono px-2 py-1 rounded-md border text-xs ${outcome.labelClasses}`}>
                                        {outcome.label}
                                    </span>
                                    <div className={`mt-4 flex flex-col items-center p-4 rounded-lg bg-white dark:bg-slate-800 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-xs ${outcome.borderColor}`}>
                                        {outcome.icon}
                                        <h4 className={`font-semibold mt-3 ${outcome.textColor}`}>{outcome.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{outcome.description}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reinstated Architecture Diagram, built with robust and responsive flexbox, adhering to Principles #4 and #5.
const ArchitectureDiagram: React.FC = () => {
    const diagramRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        const elements = diagramRef.current?.querySelectorAll('.diagram-element');
        if (elements) elements.forEach(el => observer.observe(el));
        return () => { if (elements) elements.forEach(el => observer.unobserve(el)); };
    }, []);

    const ModuleNode: React.FC<{ name: string, className?: string, style?: React.CSSProperties }> = ({ name, className, style }) => (
        <div className={`bg-slate-700/50 text-slate-300 text-sm font-mono px-4 py-2 rounded-md border border-slate-600 diagram-element ${className}`} style={style}>{name}</div>
    );

    const KeyModuleNode: React.FC<{ name: string, tooltip: string, className?: string, style?: React.CSSProperties }> = ({ name, tooltip, className, style }) => (
        <div className={`diagram-element ${className}`} style={style}>
            <TooltipTerm definition={tooltip}>
                <div className="bg-slate-700/80 text-indigo-300 text-sm font-mono px-6 py-3 rounded-lg border-2 border-indigo-500/80 shadow-lg">{name}</div>
            </TooltipTerm>
        </div>
    );

    return (
        <div ref={diagramRef} className="not-prose my-12" role="group" aria-label="Диаграмма архитектуры, показывающая зависимость модулей от центрального файла CONFIG.js.">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">Визуальная схема архитектурных связей</h3>
            {/* Desktop Diagram */}
            <div className="hidden lg:flex flex-col items-center space-y-8 p-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700">
                <ModuleNode name="CONFIG.js" className="diagram-element" style={{ transitionDelay: '0ms' }} />
                <div className="w-full flex justify-center relative">
                    <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 h-8 w-px bg-slate-600 diagram-element" style={{ transitionDelay: '100ms' }}></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-slate-600 diagram-element" style={{ transitionDelay: '200ms' }}></div>
                </div>
                <div className="w-full grid grid-cols-4 gap-4 pt-4">
                    {['01_ErrorHandler.js', '02_Utils.js', '04_Omnidesk.js', '12_PlaygroundTester.js'].map((name, i) => (
                        <div key={name} className="flex flex-col items-center relative">
                             <div className="absolute top-[-1rem] h-4 w-px bg-slate-600 diagram-element" style={{ transitionDelay: `${300 + i * 50}ms` }}></div>
                            <ModuleNode name={name} style={{ transitionDelay: `${500 + i * 100}ms` }} />
                        </div>
                    ))}
                </div>
                <div className="w-full grid grid-cols-2 gap-8 pt-8">
                    <div className="flex flex-col items-center space-y-4 relative">
                        <div className="absolute top-[-2rem] h-8 w-px bg-slate-600 diagram-element" style={{ transitionDelay: '900ms' }}></div>
                        <KeyModuleNode name="03_GptApi.js" tooltip="Ключевой модуль, управляющий взаимодействием с AI-моделями." style={{ transitionDelay: '1000ms' }} />
                        <div className="w-full flex justify-center relative">
                            <div className="absolute top-[-1rem] h-4 w-px bg-slate-600 diagram-element" style={{ transitionDelay: '1100ms' }}></div>
                            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-slate-600 diagram-element" style={{ transitionDelay: '1200ms' }}></div>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-2 pt-4">
                            {['06_History.js', '08_UrlValidator.js', '10_AdvancedSpamFilter.js'].map((name, i) => (
                                <div key={name} className="flex flex-col items-center relative">
                                    <div className="absolute top-[-1rem] h-4 w-px bg-slate-600 diagram-element" style={{ transitionDelay: `${1300 + i * 50}ms` }}></div>
                                    <ModuleNode name={name} style={{ transitionDelay: `${1500 + i * 100}ms` }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4 relative">
                        <div className="absolute top-[-2rem] h-8 w-px bg-slate-600 diagram-element" style={{ transitionDelay: '950ms' }}></div>
                        <KeyModuleNode name="05_Triggers.js" tooltip="Ключевой модуль, управляющий событиями и расписаниями." style={{ transitionDelay: '1050ms' }} />
                        <div className="w-full flex justify-center relative">
                            <div className="absolute top-[-1rem] h-4 w-px bg-slate-600 diagram-element" style={{ transitionDelay: '1150ms' }}></div>
                        </div>
                        <div className="pt-4">
                            <ModuleNode name="07_ReportGenerator.js" style={{ transitionDelay: '1700ms' }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Diagram */}
            <div className="lg:hidden p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4">
                <ModuleNode name="CONFIG.js" />
                <div className="pl-4 border-l-2 border-slate-600 space-y-4">
                    <ModuleNode name="01_ErrorHandler.js" />
                    <ModuleNode name="02_Utils.js" />
                    <ModuleNode name="04_Omnidesk.js" />
                    <ModuleNode name="12_PlaygroundTester.js" />
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-indigo-500/50">
                        <KeyModuleNode name="03_GptApi.js" tooltip="Ключевой модуль, управляющий взаимодействием с AI-моделями." />
                         <div className="pl-4 mt-4 border-l-2 border-slate-600 space-y-4">
                             <ModuleNode name="06_History.js" />
                             <ModuleNode name="08_UrlValidator.js" />
                             <ModuleNode name="10_AdvancedSpamFilter.js" />
                         </div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-indigo-500/50">
                        <KeyModuleNode name="05_Triggers.js" tooltip="Ключевой модуль, управляющий событиями и расписаниями." />
                         <div className="pl-4 mt-4 border-l-2 border-slate-600 space-y-4">
                            <ModuleNode name="07_ReportGenerator.js" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GptAssistantDocumentationPage: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);
    const [moduleFilter, setModuleFilter] = useState('');

    const modulesWithDetails = [
         { 
            name: '01_ErrorHandler.js', 
            icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-500 dark:text-red-400"/>,
            summary: 'Центральный обработчик ошибок.',
            details: {
                description: 'Перехватывает исключения, формирует читаемые отчёты, логирует критические сбои.',
                functions: [],
                dependencies: ['Utils', 'ReportGenerator'],
                usage: 'Используется всеми остальными модулями как универсальный try/catch wrapper.'
            }
        },
        { 
            name: '02_Utils.js', 
            icon: <WrenchScrewdriverIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Универсальные утилиты.',
            details: {
                description: 'Парсинг данных, нормализация строк, форматирование дат, проверка типов.',
                functions: [],
                dependencies: [],
                usage: 'Базовый слой, от которого зависят почти все остальные модули.'
            }
        },
        { 
            name: '03_GptApi.js', 
            icon: <CpuChipIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400"/>,
            summary: 'Управление взаимодействием с LLM.',
            details: {
                description: 'Формирование запросов, валидация промтов, контроль токенов и ответов.',
                functions: [],
                dependencies: ['Utils', 'ErrorHandler', 'Config.js', 'AdvancedSpamFilter'],
                usage: 'Основной модуль для работы с AI-моделями.'
            }
        },
        { 
            name: '04_Omnidesk.js', 
            icon: <InboxArrowDownIcon className="w-6 h-6 text-sky-500 dark:text-sky-400"/>,
            summary: 'Интеграция с тикет-системой.',
            details: {
                description: 'Создание, обновление, закрытие тикетов, отправка уведомлений в Omnidesk.',
                functions: [],
                dependencies: ['Utils', 'ReportGenerator'],
                usage: 'Может быть вызван из Triggers при поступлении событий от пользователя.'
            }
        },
        { 
            name: '05_Triggers.js', 
            icon: <ClockIcon className="w-6 h-6 text-amber-500 dark:text-amber-400"/>,
            summary: 'Менеджер событий и расписаний.',
            details: {
                description: 'Запускает действия на основе условий (входящее сообщение, таймер, системное событие).',
                functions: [],
                dependencies: ['GptApi', 'Omnidesk', 'ReportGenerator', 'Config.js'],
                usage: 'Оркестратор основных бизнес-процессов.'
            }
        },
        { 
            name: '06_History.js', 
            icon: <FolderOpenIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Контекстное саммари для операторов.',
            details: {
                description: 'Этот модуль — ключевой инструмент для экономии времени операторов. Вместо того чтобы вручную просматривать длинную историю переписки, оператор получает краткое, но емкое саммари по последним обращениям клиента. Система автоматически собирает данные из Omnidesk, кэширует их и передает в AI-модель (Gemini или GPTunnel) для генерации лаконичной сводки. Это позволяет оператору мгновенно погрузиться в контекст и предоставить более качественный и быстрый ответ.',
                functions: [
                    'getUserIdByCaseId() — получает user_id по ID обращения.',
                    'getRecentCaseInfosByUser() — список последних обращений (до 90 дней).',
                    'getCaseDialogQA() — формирует историю диалога в формате Q/A.',
                    'getSummaryFromGemini() & getSummaryFromGPTunnel() — создают саммари через AI.',
                    'getUserHistorySummary() — итоговое резюме последних трёх обращений.',
                    'getAllUserHistoryRaw() — краткий список всех обращений.'
                ],
                dependencies: ['PropertiesService', 'CacheService', 'UrlFetchApp', 'Gemini API', 'Omnidesk API'],
                usage: 'Работает совместно с модулями логирования и error-репортинга.'
            }
        },
        { 
            name: '07_ReportGenerator.js', 
            icon: <ChartBarIcon className="w-6 h-6 text-green-500 dark:text-green-400"/>,
            summary: 'Генерация отчётов.',
            details: {
                description: 'Формирует и отправляет отчёты о работе системы: ошибки, статистика, результаты запросов.',
                functions: [],
                dependencies: ['Utils', 'History'],
                usage: 'Может быть вызван ErrorHandler или Triggers.'
            }
        },
        { 
            name: '08_UrlValidator.js', 
            icon: <LinkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Валидация и нормализация ссылок.',
            details: {
                description: 'Проверяет корректность URL, очищает от UTM- и tracking-параметров, и автоматически исправляет неточные ссылки, предложенные AI.',
                functions: [
                    'ValidUrlsCache — кэширует whitelist допустимых ссылок на 1 час.',
                    'calculateUrlSimilarity() — вычисляет схожесть AI-ссылки с валидной.',
                    'normalizeUrl() — очищает URL от мусорных параметров.',
                    'extractAndNormalizeUrls() — извлекает и нормализует все URL из текста.',
                    'replaceMarkdownLinksWithUrls() — заменяет [текст](url) на обычные URL.'
                ],
                dependencies: ['whitelist-база ссылок'],
                usage: 'Используется в фильтрах безопасности. Поддерживает резервный (regex) метод очистки.'
            }
        },
        { 
            name: '10_AdvancedSpamFilter.js', 
            icon: <ShieldCheckIcon className="w-6 h-6 text-red-500 dark:text-red-400"/>,
            summary: 'Продвинутый антиспам.',
            details: {
                description: 'Определяет и классифицирует спам в сообщениях по весовой системе. Поддерживает белые списки, многоуровневые паттерны и адаптивные пороги.',
                functions: [
                    'SPAM_FILTER_CONFIG — веса и пороги (80 — спам, 50 — подозрительное).',
                    'SPAM_PATTERNS — более 30 паттернов (SEO, Instagram, фишинг и т.п.).',
                    'WHITELIST_PATTERNS — легитимные уведомления (Mail.ru, uKit).',
                    'Поддержка весовой оценки (score), а не просто true/false.'
                ],
                dependencies: ['SpamFilterTests.js'],
                usage: 'Интегрируется с системой отчётов и механизмом rollback. Работает совместно с базовой версией фильтра и унифицированным isSpamUnified().'
            }
        },
        { 
            name: '12_PlaygroundTester.js', 
            icon: <BeakerIcon className="w-6 h-6 text-purple-500 dark:text-purple-400"/>,
            summary: 'Модуль тестирования и QA.',
            details: {
                description: 'Позволяет запускать автоматические проверки сценариев, тестировать ответы модели, валидировать системные коды.',
                functions: [],
                dependencies: ['GptApi', 'History', 'ErrorHandler', 'ReportGenerator'],
                usage: 'Часто применяется в тестовой среде (Playground/TestSuite).'
            }
        },
         { 
            name: 'SpamFilterTests.js', 
            icon: <BugAntIcon className="w-6 h-6 text-rose-500 dark:text-rose-400"/>,
            summary: 'Тестирование спам-фильтра.',
            details: {
                description: 'Автоматически проверяет корректность работы всех версий фильтра: базовой, продвинутой и унифицированной. Позволяет отследить несовместимости и процент успешных срабатываний.',
                functions: [
                    'Категории тестов: TECHNICAL_SPAM, COMMERCIAL_SPAM, LEGITIMATE, EDGE_CASES.',
                    'runSpamFilterTests() — полный прогон тестов и статистика успеха.',
                    'testUnifiedSpamFilter() — сравнение старой и новой архитектуры.',
                    'testRollbackMechanism() — тестирование отката и совместимости версий.'
                ],
                dependencies: ['10_AdvancedSpamFilter.js'],
                usage: 'Использует тестовые кейсы для проверки точности и ложных срабатываний.'
            }
        },
        { 
            name: 'CONFIG.js', 
            icon: <Cog6ToothIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Конфигурация системы.',
            details: {
                description: 'API ключи, параметры моделей, расписание задач, включённые функции.',
                functions: [],
                dependencies: [],
                usage: 'Используется всеми остальными модулями как источник настроек и глобальных констант.'
            }
        }
    ];

    const deepDiveStages = {
        'Получение обращения': [],
        'Фильтрация и безопасность': ['10_AdvancedSpamFilter.js', '08_UrlValidator.js'],
        'Анализ и поиск фактов (RAG)': ['06_History.js'],
        'Подготовка ответа': ['03_GptApi.js'],
        'Оценка и принятие решения': [],
    };
    
    const filteredModules = modulesWithDetails.filter(module =>
        module.name.toLowerCase().includes(moduleFilter.toLowerCase()) ||
        module.summary.toLowerCase().includes(moduleFilter.toLowerCase())
    );

    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">

                <section id="overview" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CpuChipIcon className="w-8 h-8" />}
                        title="Обзор системы и Ключевые выводы"
                        subtitle="Описание интеллектуального ассистента, который автоматизирует до 76% обращений в службу поддержки. Система интегрирует AI-модели, тикет-систему Omnidesk и векторную базу знаний для предоставления быстрых, точных и контекстуально-обоснованных ответов."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8"/>} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Гибридный AI-подход:</b> Система использует сильные стороны двух моделей: <TooltipTerm definition="Семейство моделей от Google, используемое для анализа контекста, извлечения фактов и саммаризации. Отличается высокой скоростью и эффективностью для задач понимания текста.">gemini-2.5-flash</TooltipTerm> для анализа и саммаризации, и <TooltipTerm definition="Модель от OpenAI, применяемая для генерации финального, стилистически выверенного ответа на основе подготовленного контекста.">GPT-4o</TooltipTerm> для генерации качественного текста.</li>
                            <li><b>RAG-архитектура:</b> Ассистент не "выдумывает" ответы, а основывает их на фактах из внутренней базы знаний, что кардинально повышает точность и релевантность.</li>
                            <li><b>Контекстная осведомленность:</b> Для оператора автоматически генерируется краткая сводка (саммари) по последним обращениям клиента, что экономит время на изучение истории.</li>
                             <li><b>Интеллектуальная автоматизация:</b> Система не просто отвечает, а выполняет полный цикл обработки: фильтрует спам, проверяет безопасность ссылок и принимает решение об автоответе на основе метрики уверенности (`confident-score`).</li>
                        </ul>
                    </InfoCard>
                </section>
                
                <section id="workflow" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="Жизненный цикл обработки тикета"
                        subtitle="Пошаговый процесс анализа и ответа на обращение клиента от получения до финального действия."
                    />
                    <TicketWorkflowDiagram />
                    <div className="mt-12 not-prose">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Глубокое погружение в этапы</h3>
                        <p className="text-base text-gray-600 dark:text-slate-400 mb-6">Каждый этап бизнес-процесса реализуется одним или несколькими техническими модулями. Раскройте секцию, чтобы увидеть детали.</p>
                        <div className="space-y-4">
                            {Object.entries(deepDiveStages).map(([stageTitle, modules]) => (
                                <CollapsibleSection 
                                    key={stageTitle} 
                                    title={<span className="font-semibold text-lg">{stageTitle}</span>}
                                >
                                    {modules.length > 0 ? (
                                        <div className="space-y-4">
                                            {modules.map(moduleName => {
                                                const moduleData = modulesWithDetails.find(m => m.name === moduleName);
                                                if (!moduleData) return null;
                                                return (
                                                    <CollapsibleSection
                                                        key={moduleName}
                                                        title={
                                                            <div className="flex items-center gap-3">
                                                                {moduleData.icon}
                                                                <div>
                                                                    <p className="font-bold text-base">{moduleData.name}</p>
                                                                    <p className="text-sm font-normal text-slate-500 dark:text-slate-400">{moduleData.summary}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                    >
                                                        <div className="space-y-3 text-sm">
                                                            <p>{moduleData.details.description}</p>
                                                            {/* Details rendering... */}
                                                        </div>
                                                    </CollapsibleSection>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 italic p-4">Этот этап представляет собой общий бизнес-процесс без привязки к конкретному модулю-исполнителю.</p>
                                    )}
                                </CollapsibleSection>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section id="knowledge-base" className="scroll-mt-24">
                     <SectionHeader 
                        icon={<BookOpenIcon className="w-8 h-8" />}
                        title="База знаний и принцип RAG"
                        subtitle="Основа для генерации точных и контекстуальных ответов. Разберем, как работает технология Retrieval-Augmented Generation (RAG) в этой системе."
                    />
                     <p className='text-base mb-8'>
                        Чтобы избежать «галлюцинаций» и предоставлять ответы, основанные на реальных данных, система использует технологию <TooltipTerm definition="Retrieval-Augmented Generation — подход, при котором языковая модель перед генерацией ответа получает релевантную информацию из внешней базы данных. Это позволяет ей отвечать на основе фактов, а не только на основе данных, на которых она была обучена.">RAG</TooltipTerm>. База знаний формируется из реальных вопросов клиентов и эталонных ответов операторов. Этот датасет регулярно выгружается, очищается от персональных данных, размечается и преобразуется в векторы для мгновенного семантического поиска.
                    </p>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                        <InfoCard icon={<PuzzlePieceIcon className="w-8 h-8"/>} title="Шаг 1: Векторизация">
                            <p>Каждая пара «вопрос-ответ» из базы знаний преобразуется в числовой вектор (<TooltipTerm definition="Процесс преобразования текста в числовой вектор (массив чисел), который отражает семантическое значение этого текста. Близкие по смыслу тексты будут иметь близкие векторы в многомерном пространстве.">embedding</TooltipTerm>). Эти векторы хранятся в специальной векторной базе данных, которая, по сути, является «библиотекой смыслов», оптимизированной для поиска по смысловой близости, а не по ключевым словам.</p>
                        </InfoCard>
                        <InfoCard icon={<MagnifyingGlassIcon className="w-8 h-8"/>} title="Шаг 2: Поиск (Retrieval)">
                            <p>Когда поступает новый вопрос, система векторизует его и производит <TooltipTerm definition="Поиск, который находит не точные совпадения по словам, а наиболее близкие по смыслу фрагменты текста, сравнивая их числовые векторы.">семантический поиск</TooltipTerm> по базе знаний. На этом этапе используется <TooltipTerm definition="Семейство моделей от Google, используемое для анализа контекста, извлечения фактов и саммаризации. Отличается высокой скоростью и эффективностью для задач понимания текста.">gemini-2.5-flash</TooltipTerm> для анализа и ранжирования найденных «фактов», чтобы отобрать только самую релевантную информацию для ответа.</p>
                        </InfoCard>
                        <InfoCard icon={<SparklesIcon className="w-8 h-8"/>} title="Шаг 3: Генерация (Generation)">
                            <p>Отобранные «факты» вместе с исходным вопросом клиента передаются в модель <TooltipTerm definition="Модель от OpenAI, применяемая для генерации финального, стилистически выверенного ответа на основе подготовленного контекста.">GPT-4o</TooltipTerm>. Здесь раскрывается сила гибридного подхода: GPT-4o, специализируясь на создании стилистически выверенного текста, использует этот обогащенный контекст для генерации финального ответа, который основан на данных, а не на догадках.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="modules" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ServerStackIcon className="w-8 h-8" />}
                        title="Модули и их ответственность"
                        subtitle="Архитектура системы построена на независимых, переиспользуемых модулях, каждый из которых выполняет свою четко определенную функцию."
                    />
                    <ArchitectureDiagram />
                     <div className="mt-8 not-prose">
                        <label htmlFor="module-filter" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Фильтр модулей:</label>
                        <input
                            type="text"
                            id="module-filter"
                            value={moduleFilter}
                            onChange={(e) => setModuleFilter(e.target.value)}
                            placeholder="Найти модуль по имени или описанию..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mt-6 space-y-4">
                        {filteredModules.map(module => (
                             <CollapsibleSection
                                key={module.name}
                                title={
                                    <div className="flex items-center gap-4 w-full">
                                        {module.icon}
                                        <div className="flex-grow text-left">
                                            <p className="font-bold text-lg text-slate-800 dark:text-slate-200">{module.name}</p>
                                            <p className="text-sm font-normal text-slate-600 dark:text-slate-400">{module.summary}</p>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="space-y-4">
                                    <p>{module.details.description}</p>
                                    {module.details.functions && module.details.functions.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Основные функции/компоненты:</h4>
                                            <ul className="list-disc list-inside space-y-1 text-sm">
                                                {module.details.functions.map((func, index) => <li key={index}>{func}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Зависимости и связи:</h4>
                                        {module.details.dependencies.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {module.details.dependencies.map(dep => (
                                                    <span key={dep} className="text-xs font-mono bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-full">{dep}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500 italic">Нет прямых зависимостей.</p>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Контекст использования:</h4>
                                        <p className="text-sm">{module.details.usage}</p>
                                    </div>
                                </div>
                            </CollapsibleSection>
                        ))}
                    </div>
                </section>
                
                <section id="quality-control" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<BeakerIcon className="w-8 h-8" />}
                        title="Контроль качества и Тестирование"
                        subtitle="Обеспечение надежности и стабильности ключевых компонентов системы, таких как спам-фильтр."
                    />
                    <InfoCard icon={<BugAntIcon className="w-8 h-8 text-rose-500 dark:text-rose-400" />} title="SpamFilterTests.js — Тестирование спам-фильтра">
                        <p>Этот модуль играет критическую роль в поддержании высокого качества фильтрации спама. Он автоматически проверяет корректность работы всех версий фильтра (базовой, продвинутой, унифицированной) на большом наборе тестовых кейсов, включая коммерческий и технический спам, легитимные сообщения и пограничные случаи. Это позволяет отслеживать регрессии, оценивать точность и гарантировать, что обновления в одном фильтре не ломают общую логику.</p>
                    </InfoCard>
                </section>
                
                <section id="metrics" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="Метрики и динамика"
                        subtitle="Ключевые показатели эффективности системы на разных этапах развития. Оценки точности и стилистики производятся операторами по шкале от 1 до 10."
                    />
                     <div className="overflow-x-auto mt-6 not-prose">
                        <table className="w-full text-left border-collapse">
                            <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Этап</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Модель</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Доля автоответов</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Точность (1-10)</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Стилистика (1-10)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                {[{ stage: 'Этап 1', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '12.5%', accuracy: '4.86', style: '4.86' },
                                { stage: 'Этап 2', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '23.6%', accuracy: '6.60', style: '6.90' },
                                { stage: 'Этап 5', model: 'gemini-2.5-flash', auto_reply: '76.1%', accuracy: '6.05', style: '7.48' }].map(metric => (
                                    <tr key={metric.stage} className="border-b dark:border-slate-700">
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-semibold">{metric.stage}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700">{metric.model}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.auto_reply}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.accuracy}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.style}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                 {modalContent && (
                    <Modal
                        isOpen={!!modalContent}
                        onClose={() => setModalContent(null)}
                        title={modalContent.title}
                    >
                        {modalContent.content}
                    </Modal>
                )}
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;