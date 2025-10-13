
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CollapsibleSection, Modal } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon, MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon,
    PencilSquareIcon, PaperAirplaneIcon, BookOpenIcon, BeakerIcon, ExclamationTriangleIcon, CodeBracketIcon, Cog6ToothIcon, ClockIcon, FolderOpenIcon, LinkIcon,
    ArrowLongDownIcon, BugAntIcon, HandRaisedIcon
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

    const scoreExplanation = "Score — это параметр уверенности модели в точности ответа, работающий по порогу ≥ 80%. Если порог достигнут, ответ отправляется автоматически. Если score ниже, активируется fallback-механизм: ответ отбрасывается, а тикет передаётся оператору. Этот подход имеет два ключевых преимущества: он экономит токены, так как ресурсы не тратятся на некачественные ответы, и защищает оператора от путаницы, предотвращая передачу ему сомнительных или неполных черновиков.";
    
    // This function parses the text and replaces `score` with a tooltip.
    const renderWithScoreTooltip = (text: string): ReactNode => {
        const parts = text.split(/(score)/);
        return (
            <>
                {parts.map((part, index) => 
                    part === 'score' 
                    ? <TooltipTerm key={index} definition={scoreExplanation}>score</TooltipTerm> 
                    : part
                )}
            </>
        );
    };

    const stages = [
        { icon: <InboxArrowDownIcon className="w-10 h-10 text-indigo-500"/>, title: "1. Получение обращения", tooltip: "Запрос от клиента поступает в систему из тикет-системы Omnidesk и становится отправной точкой для всего процесса анализа." },
        { icon: <ShieldCheckIcon className="w-10 h-10 text-indigo-500"/>, title: "2. Фильтрация и безопасность", tooltip: "Продвинутый спам-фильтр анализирует контент, а валидатор проверяет все ссылки на предмет фишинга и вредоносного ПО." },
        { icon: <MagnifyingGlassIcon className="w-10 h-10 text-indigo-500"/>, title: "3. Анализ и поиск фактов (RAG)", tooltip: "Система производит семантический поиск по векторной базе знаний, чтобы найти наиболее релевантную информацию для формирования ответа." },
        { icon: <PencilSquareIcon className="w-10 h-10 text-indigo-500"/>, title: "4. Генерация черновика ответа", tooltip: "На основе найденных фактов LLM-модель составляет черновой вариант ответа, который максимально точно и полно отвечает на вопрос клиента." },
        { icon: <PaperAirplaneIcon className="w-10 h-10 text-indigo-500"/>, title: "5. Отправка и оценка", tooltip: "Ответ отправляется клиенту. Система также вычисляет score — показатель уверенности в точности ответа. Если score низкий, тикет передается оператору." },
    ];
    
    return (
        <div ref={diagramRef} className="my-8 not-prose">
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">Жизненный цикл обработки обращения</h3>
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
                    {stages.map((stage, index) => (
                        <React.Fragment key={stage.title}>
                            <div className="flex-1 flex justify-center workflow-stage" style={{ transitionDelay: `${index * 150}ms` }}>
                                <WorkflowStage {...stage} />
                            </div>
                            {index < stages.length - 1 && (
                                <>
                                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 self-center hidden md:block workflow-stage" style={{ transitionDelay: `${index * 150 + 75}ms` }} />
                                    <ArrowLongDownIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 self-center md:hidden my-2 workflow-stage" style={{ transitionDelay: `${index * 150 + 75}ms` }} />
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div id="tooltip-root"></div>
        </div>
    );
};

const GptAssistantDocumentationPage: React.FC = () => {
    const scoreExplanation = "Score — это параметр уверенности модели в точности ответа, работающий по порогу ≥ 80%. Если порог достигнут, ответ отправляется автоматически. Если score ниже, активируется fallback-механизм: ответ отбрасывается, а тикет передаётся оператору. Этот подход имеет два ключевых преимущества: он экономит токены, так как ресурсы не тратятся на некачественные ответы, и защищает оператора от путаницы, предотвращая передачу ему сомнительных или неполных черновиков.";

    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">

                <section id="concept" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CpuChipIcon className="w-8 h-8" />}
                        title="Концепция и бизнес-задача"
                        subtitle="Описание AI-ассистента, интегрированного в тикет-систему Omnidesk. Его главная задача — автоматически отвечать на типовые вопросы клиентов, используя базу знаний компании, и тем самым снижать нагрузку на первую линию поддержки."
                    />
                    <TicketWorkflowDiagram />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Полная автоматизация:</b> Система самостоятельно получает обращения, ищет информацию, генерирует ответ и отправляет его клиенту.</li>
                            <li><b>RAG-архитектура:</b> Использует <TooltipTerm definition="Технология, которая позволяет языковой модели (LLM) получать доступ к внешней, актуальной информации (например, из базы знаний) перед генерацией ответа, чтобы сделать его более точным и контекстуальным.">Retrieval-Augmented Generation</TooltipTerm> для минимизации «галлюцинаций» и повышения точности ответов.</li>
                            <li><b>Экономия ресурсов:</b> Отвечая на частые вопросы, ассистент высвобождает время операторов для решения более сложных задач.</li>
                            <li><b>Механизм контроля качества:</b> Встроенный параметр <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> позволяет автоматически отправлять только те ответы, в качестве которых система уверена, передавая сомнительные случаи оператору.</li>
                        </ul>
                    </InfoCard>
                </section>
                
                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="Архитектура и компоненты"
                        subtitle="Как устроена система «под капотом»: от получения данных до финальной отправки ответа."
                    />
                    <div className="space-y-8 mt-8">
                        {/* Component 1: Data Sources */}
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                             <div className="flex items-start gap-4">
                                <CircleStackIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">Источники данных и база знаний</h3>
                                    <p className="mt-2 text-base text-gray-700 dark:text-slate-300">Основа системы — это база знаний (Knowledge Base), которая формируется из двух источников:</p>
                                    <ul className="list-disc list-inside space-y-2 mt-4 text-base">
                                        <li><b>Omnidesk:</b> Экспорт статей из публичной базы знаний.</li>
                                        <li><b>Локальные файлы:</b> Дополнительные документы в форматах `.txt`, `.md`, `.docx`, загружаемые вручную для обогащения контекста.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Component 2: Core */}
                         <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                            <div className="flex items-start gap-4">
                                <ServerStackIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">Ядро системы (gpttunnel)</h3>
                                    <p className="mt-2 text-base text-gray-700 dark:text-slate-300">Сервис <a href="https://gptunnel.ru/?ref=DEN_PROMO" target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-500 dark:text-indigo-400 hover:underline">gpttunnel</a> выступает в роли центрального хаба, который выполняет три ключевые функции:</p>
                                    <ol className="list-decimal list-inside space-y-2 mt-4 text-base">
                                        <li><b>Векторизация:</b> Преобразует текстовые данные из базы знаний в числовые векторы для семантического поиска.</li>
                                        <li><b>Хранение:</b> Индексирует и хранит полученные векторы в специализированной векторной базе данных.</li>
                                        <li><b>Генерация ответов:</b> Принимает запрос, находит релевантные факты в базе и генерирует на их основе финальный ответ с помощью <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                 <section id="safety" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ShieldCheckIcon className="w-8 h-8" />}
                        title="Безопасность и контроль"
                        subtitle="Механизмы, обеспечивающие надежность и предсказуемость работы ассистента."
                    />
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <InfoCard icon={<ScaleIcon className="w-8 h-8" />} title="Score — Порог уверенности">
                            <p>Ключевой механизм контроля. Каждый сгенерированный ответ сопровождается параметром <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> (от 0 до 100). Ответ отправляется клиенту автоматически, только если <b>score ≥ 80%</b>. В противном случае, чтобы избежать отправки неточного ответа, система отбрасывает черновик, а тикет передаётся оператору. Это экономит токены и защищает от репутационных рисков.</p>
                        </InfoCard>
                        <InfoCard icon={<HandRaisedIcon className="w-8 h-8" />} title="Fallback-механизм">
                             <p>Если система не находит релевантной информации в базе знаний или <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> ответа слишком низок, она не пытается «додумать» ответ. Вместо этого активируется fallback-сценарий: тикет без изменений передаётся в общую очередь для обработки человеком. Это гарантирует, что ни один сложный или нестандартный вопрос не останется без внимания.</p>
                        </InfoCard>
                        <InfoCard icon={<FolderOpenIcon className="w-8 h-8" />} title="Контекстное обогащение">
                            <p>Перед тем как отправить запрос в <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>, система автоматически добавляет к нему <b>всю историю переписки</b> по текущему тикету. Это позволяет модели понимать полный контекст диалога и давать более точные и релевантные ответы, учитывая предыдущие вопросы и ответы клиента.</p>
                        </InfoCard>
                         <InfoCard icon={<LinkIcon className="w-8 h-8" />} title="Валидация ссылок">
                            <p>Встроенный механизм безопасности проверяет все URL-адреса в обращении клиента. Если ссылка ведёт на известный фишинговый или вредоносный сайт, система немедленно помечает тикет как подозрительный и передаёт его оператору с соответствующим предупреждением, предотвращая переход по опасным ссылкам.</p>
                        </InfoCard>
                    </div>
                </section>
                
                <section id="limitations" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<BugAntIcon className="w-8 h-8" />}
                        title="Ограничения и будущие улучшения"
                        subtitle="Текущие рамки и потенциальные направления для развития системы."
                    />
                     <div className="space-y-4">
                        <InfoCard icon={<ExclamationTriangleIcon className="w-6 h-6"/>} title="Текущие ограничения">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Отсутствие поддержки таблиц:</b> Система пока не умеет эффективно извлекать и интерпретировать данные из таблиц в документах.</li>
                                <li><b>Зависимость от качества базы знаний:</b> Точность ответов напрямую зависит от полноты и актуальности информации в Omnidesk и локальных файлах.</li>
                                <li><b>Ограниченный файловый процессинг:</b> Поддерживаются только текстовые форматы (`.txt`, `.md`, `.docx`). Изображения и PDF не анализируются.</li>
                            </ul>
                        </InfoCard>
                         <InfoCard icon={<SparklesIcon className="w-6 h-6"/>} title="Планы на будущее">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Интеграция с CRM:</b> Подключение к CRM для получения истории покупок клиента и предоставления более персонализированных ответов.</li>
                                <li><b>Поддержка мультимодальности:</b> Возможность анализировать изображения (например, скриншоты ошибок), чтобы лучше понимать проблему клиента.</li>
                                <li><b>Проактивные действия:</b> Наделение ассистента возможностью не только отвечать на вопросы, но и выполнять простые действия (например, создавать заявку на возврат).</li>
                            </ul>
                        </InfoCard>
                     </div>
                </section>
                
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;
