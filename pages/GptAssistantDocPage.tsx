import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CollapsibleSection } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon, MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon,
    PencilSquareIcon, PaperAirplaneIcon, BookOpenIcon, BeakerIcon, ExclamationTriangleIcon, CodeBracketIcon, Cog6ToothIcon, ClockIcon, FolderOpenIcon, LinkIcon,
    ArrowLongDownIcon
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

    // Effect for scroll-triggered animations, enhancing UX (Principle #2).
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Animate only once.
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const elements = diagramRef.current?.querySelectorAll('.workflow-stage');
        if (elements) {
            elements.forEach((el) => observer.observe(el));
        }

        return () => {
            if (elements) {
                elements.forEach((el) => observer.unobserve(el));
            }
        };
    }, []);

    const scoreExplanation = "`confident-score` — это ключевая метрика (от 0 до 100), которая отражает уверенность AI в точности и полноте сгенерированного ответа. Если score высокий (≥ 80%), система отправляет ответ автоматически. Если низкий — создается черновик для проверки оператором, чтобы избежать отправки потенциально неверной информации.";

    const stages = [
        { 
            icon: <InboxArrowDownIcon className="w-10 h-10 text-indigo-500"/>, 
            title: "1. Получение обращения", 
            tooltip: "Запрос от клиента поступает в систему из тикет-системы Omnidesk и становится отправной точкой для всего процесса анализа." 
        },
        { 
            icon: <ShieldCheckIcon className="w-10 h-10 text-indigo-500"/>, 
            title: "2. Фильтрация и безопасность", 
            tooltip: "Продвинутый спам-фильтр анализирует контент, а валидатор проверяет все ссылки на предмет фишинга и вредоносного ПО." 
        },
        { 
            icon: <MagnifyingGlassIcon className="w-10 h-10 text-indigo-500"/>, 
            title: "3. Анализ и поиск фактов (RAG)", 
            tooltip: "Система производит семантический поиск по векторной базе знаний, чтобы найти наиболее релевантную информацию для ответа." 
        },
        { 
            icon: <SparklesIcon className="w-10 h-10 text-indigo-500"/>, 
            title: "4. Подготовка ответа", 
            tooltip: "Модель GPT-4o создает черновик ответа, основываясь на найденных фактах из базы знаний и исходном вопросе клиента." 
        },
        { 
            icon: <ScaleIcon className="w-10 h-10 text-indigo-500"/>, 
            title: "5. Оценка и принятие решения", 
            tooltip: "Система рассчитывает метрику уверенности (`confident-score`), чтобы оценить, насколько AI уверен в точности и полноте сгенерированного ответа." 
        }
    ];

    const outcomes = [
        { 
            icon: <PaperAirplaneIcon className="w-10 h-10 text-green-500 -rotate-45"/>, 
            title: "Автоответ", 
            description: "Если `score` высокий, ответ отправляется клиенту автоматически.",
            borderColor: "border-green-300 dark:border-green-700",
            textColor: "text-green-800 dark:text-green-300",
            label: "`score` высокий",
            labelClasses: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700"
        },
        { 
            icon: <PencilSquareIcon className="w-10 h-10 text-yellow-600"/>, 
            title: "Черновик + Саммари", 
            description: "Если `score` низкий, создается черновик и краткая сводка для оператора.",
            borderColor: "border-yellow-300 dark:border-yellow-700",
            textColor: "text-yellow-800 dark:text-yellow-300",
            label: "`score` низкий",
            labelClasses: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700"
        }
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

                    {/* Branching Visual with Interactive Tooltip */}
                     <div className="flex w-full flex-col items-center mt-4 lg:mt-8">
                        <InteractiveIcon
                            className="workflow-stage hover:bg-gray-100 dark:hover:bg-slate-700/50"
                            style={{ transitionDelay: '750ms' }}
                            tooltip={scoreExplanation}
                            icon={<ArrowLongDownIcon className="h-10 w-10 text-gray-400 dark:text-slate-500" />}
                        />
                    </div>

                    {/* Desktop Branching Lines */}
                    <div className="hidden md:flex justify-center items-start w-full max-w-3xl mt-4 workflow-stage" style={{ transitionDelay: '900ms' }}>
                        <div className="w-1/2 h-4 border-b border-r border-gray-300 dark:border-slate-600"></div>
                        <div className="w-1/2 h-4 border-b border-l border-gray-300 dark:border-slate-600"></div>
                    </div>

                    {/* Decision Outcomes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-0 w-full max-w-3xl md:mt-0 mt-4">
                        {outcomes.map((outcome, index) => (
                            <div key={outcome.title} className="flex flex-col items-center text-center workflow-stage" style={{ transitionDelay: `${1050 + index * 150}ms` }}>
                                {/* Mobile connector */}
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

const ArchitectureDiagram: React.FC = () => (
    <div className="not-prose my-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mb-6 text-center">Визуальная схема архитектурных связей</h3>
        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 text-center">
            <div className="inline-block bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400">
                CONFIG.js
            </div>
            <div className="flex justify-center my-4">
                <div className="w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
                {/* Connecting Lines */}
                <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 h-8 w-px bg-gray-300 dark:bg-slate-600"></div>
                <div className="absolute top-[-2rem] left-[12.5%] lg:left-[12.5%] right-[12.5%] lg:right-[12.5%] h-px bg-gray-300 dark:bg-slate-600"></div>
                
                {/* Vertical lines to each node */}
                <div className="absolute top-[-2rem] left-[12.5%] w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
                <div className="absolute top-[-2rem] left-[37.5%] w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
                <div className="absolute top-[-2rem] left-[62.5%] w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
                <div className="absolute top-[-2rem] left-[87.5%] w-px h-8 bg-gray-300 dark:bg-slate-600"></div>

                {/* Modules */}
                <div className="space-y-2">
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700">01_ErrorHandler.js</div>
                </div>
                <div className="space-y-2">
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700">02_Utils.js</div>
                </div>
                <div className="space-y-2">
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700">04_Omnidesk.js</div>
                </div>
                 <div className="space-y-2">
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border border-gray-200 dark:border-slate-700">12_PlaygroundTester.js</div>
                </div>
                
                {/* Module with dependencies */}
                <div className="lg:col-span-2 space-y-2 relative pt-8">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border-2 border-indigo-500 shadow-lg">03_GptApi.js</div>
                     <div className="w-px h-4 bg-gray-300 dark:bg-slate-600 mx-auto"></div>
                     <div className="flex justify-center gap-4">
                        <div className="font-mono text-sm bg-gray-100 dark:bg-slate-700 p-2 rounded-md">06_History.js</div>
                        <div className="font-mono text-sm bg-gray-100 dark:bg-slate-700 p-2 rounded-md">08_UrlValidator.js</div>
                        <div className="font-mono text-sm bg-gray-100 dark:bg-slate-700 p-2 rounded-md">10_AdvancedSpamFilter.js</div>
                    </div>
                </div>
                
                 {/* Another module with dependencies */}
                 <div className="lg:col-span-2 space-y-2 relative pt-8">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-300 dark:bg-slate-600"></div>
                    <div className="font-mono bg-white dark:bg-slate-800 p-2 rounded-md border-2 border-indigo-500 shadow-lg">05_Triggers.js</div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-slate-600 mx-auto"></div>
                     <div className="flex justify-center">
                        <div className="font-mono text-sm bg-gray-100 dark:bg-slate-700 p-2 rounded-md">07_ReportGenerator.js</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const GptAssistantDocumentationPage: React.FC = () => {
    const modulesWithDetails = [
        { 
            name: '01_ErrorHandler.js', 
            icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-500 dark:text-red-400"/>,
            summary: 'Центральный обработчик ошибок.',
            description: 'Перехватывает исключения, формирует читаемые отчёты, логирует критические сбои.',
            dependencies: ['Utils', 'ReportGenerator'],
            usage: 'Используется всеми остальными модулями как универсальный try/catch wrapper.'
        },
        { 
            name: '02_Utils.js', 
            icon: <WrenchScrewdriverIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Универсальные утилиты.',
            description: 'Парсинг данных, нормализация строк, форматирование дат, проверка типов.',
            dependencies: [],
            usage: 'Базовый слой, от которого зависят почти все остальные модули.'
        },
        { 
            name: '03_GptApi.js', 
            icon: <CpuChipIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400"/>,
            summary: 'Управление взаимодействием с LLM.',
            description: 'Формирование запросов, валидация промтов, контроль токенов и ответов.',
            dependencies: ['Utils', 'ErrorHandler', 'Config.js', 'AdvancedSpamFilter'],
            usage: 'Основной модуль для работы с AI-моделями.'
        },
        { 
            name: '04_Omnidesk.js', 
            icon: <InboxArrowDownIcon className="w-6 h-6 text-sky-500 dark:text-sky-400"/>,
            summary: 'Интеграция с тикет-системой.',
            description: 'Создание, обновление, закрытие тикетов, отправка уведомлений в Omnidesk.',
            dependencies: ['Utils', 'ReportGenerator'],
            usage: 'Может быть вызван из Triggers при поступлении событий от пользователя.'
        },
        { 
            name: '05_Triggers.js', 
            icon: <ClockIcon className="w-6 h-6 text-amber-500 dark:text-amber-400"/>,
            summary: 'Менеджер событий и расписаний.',
            description: 'Запускает действия на основе условий (входящее сообщение, таймер, системное событие).',
            dependencies: ['GptApi', 'Omnidesk', 'ReportGenerator', 'Config.js'],
            usage: 'Оркестратор основных бизнес-процессов.'
        },
        { 
            name: '06_History.js', 
            icon: <FolderOpenIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Хранение и извлечение истории.',
            description: 'Управляет доступом к истории диалогов, сообщений и задач.',
            dependencies: [],
            usage: 'Используется GptApi (для контекста) и ReportGenerator (для аналитики).'
        },
        { 
            name: '07_ReportGenerator.js', 
            icon: <ChartBarIcon className="w-6 h-6 text-green-500 dark:text-green-400"/>,
            summary: 'Генерация отчётов.',
            description: 'Формирует и отправляет отчёты о работе системы: ошибки, статистика, результаты запросов.',
            dependencies: ['Utils', 'History'],
            usage: 'Может быть вызван ErrorHandler или Triggers.'
        },
        { 
            name: '08_UrlValidator.js', 
            icon: <LinkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Проверка и классификация URL.',
            description: 'Проверяет ссылки на валидность, опасные домены, фишинг, редиректы.',
            dependencies: ['Utils'],
            usage: 'Результаты используются AdvancedSpamFilter и GptApi.'
        },
        { 
            name: '10_AdvancedSpamFilter.js', 
            icon: <ShieldCheckIcon className="w-6 h-6 text-red-500 dark:text-red-400"/>,
            summary: 'Расширенный антиспам-модуль.',
            description: 'Проверяет тексты и ссылки, классифицирует по цветам (green/yellow/red), учитывает promo-паттерны.',
            dependencies: ['UrlValidator', 'Utils'],
            usage: 'Может вызываться из GptApi и Triggers для предварительной проверки контента.'
        },
        { 
            name: '12_PlaygroundTester.js', 
            icon: <BeakerIcon className="w-6 h-6 text-purple-500 dark:text-purple-400"/>,
            summary: 'Модуль тестирования и QA.',
            description: 'Позволяет запускать автоматические проверки сценариев, тестировать ответы модели, валидировать системные коды.',
            dependencies: ['GptApi', 'History', 'ErrorHandler', 'ReportGenerator'],
            usage: 'Часто применяется в тестовой среде (Playground/TestSuite).'
        },
        { 
            name: 'CONFIG.js', 
            icon: <Cog6ToothIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>,
            summary: 'Конфигурация системы.',
            description: 'API ключи, параметры моделей, расписание задач, включённые функции.',
            dependencies: [],
            usage: 'Используется всеми остальными модулями как источник настроек и глобальных констант.'
        }
    ];

    const metrics = [
        { stage: 'Этап 1', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '12.5%', accuracy: '4.86', style: '4.86' },
        { stage: 'Этап 2', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '23.6%', accuracy: '6.60', style: '6.90' },
        { stage: 'Этап 5', model: 'gemini-2.5-flash', auto_reply: '76.1%', accuracy: '6.05', style: '7.48' }
    ];

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
                    <div className="mt-6 space-y-4">
                        {modulesWithDetails.map(module => (
                             <CollapsibleSection
                                key={module.name}
                                title={
                                    <div className="flex items-center gap-4 w-full">
                                        {module.icon}
                                        <div className="flex-grow">
                                            <p className="font-bold text-lg text-slate-800 dark:text-slate-200">{module.name}</p>
                                            <p className="text-sm font-normal text-slate-600 dark:text-slate-400">{module.summary}</p>
                                        </div>
                                    </div>
                                }
                            >
                                <div className="space-y-4">
                                    <p>{module.description}</p>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Зависимости и связи:</h4>
                                        {module.dependencies.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {module.dependencies.map(dep => (
                                                    <span key={dep} className="text-xs font-mono bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-1 rounded-full">{dep}</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500 italic">Нет прямых зависимостей.</p>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Контекст использования:</h4>
                                        <p className="text-sm">{module.usage}</p>
                                    </div>
                                </div>
                            </CollapsibleSection>
                        ))}
                    </div>
                    <ArchitectureDiagram />
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
                                {metrics.map(metric => (
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
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;