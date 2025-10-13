
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CollapsibleSection, Modal, CodeBlockWithCopy } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon, MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon,
    PencilSquareIcon, PaperAirplaneIcon, BookOpenIcon, BeakerIcon, ExclamationTriangleIcon, CodeBracketIcon, Cog6ToothIcon, ClockIcon, FolderOpenIcon, LinkIcon,
    ArrowLongDownIcon, BugAntIcon, HandRaisedIcon, TableCellsIcon, TagIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


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

    // This custom hook now handles the intersection observer logic for scroll animations,
    // making the component cleaner and the logic reusable, per Principle #8.
    useAnimateOnScroll(diagramRef, { targetSelector: '.workflow-stage' });

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
        { icon: <MagnifyingGlassIcon className="w-10 h-10 text-indigo-500"/>, title: "3. Анализ и поиск фактов (RAG)", tooltip: "Система производит семантический поиск по векторной базе знаний (созданной из Google-таблицы), чтобы найти наиболее релевантную информацию для формирования ответа." },
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
    const scoreExplanation = "Score (или `confidence.answer`) — это параметр уверенности модели в точности ответа (от 0.0 до 1.0). Ответ отправляется клиенту автоматически, только если score ≥ 0.8. В противном случае, чтобы избежать отправки неточного ответа, система отбрасывает черновик, а тикет передаётся оператору. Это экономит токены и защищает от репутационных рисков.";

    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">

                <section id="concept" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CpuChipIcon className="w-8 h-8" />}
                        title="1. Концепция и бизнес-задача"
                        subtitle="Описание AI-ассистента, интегрированного в тикет-систему Omnidesk. Его главная задача — автоматически отвечать на типовые вопросы клиентов, используя динамическую базу знаний, и тем самым снижать нагрузку на первую линию поддержки."
                    />
                    
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Полная автоматизация:</b> Система самостоятельно получает обращения из Omnidesk, ищет информацию, генерирует ответ и отправляет его клиенту.</li>
                             <li><b>Интеллектуальная база знаний:</b> База знаний ведется в Google-таблице и обогащается с помощью автоматической разметки (категоризация, ключевые слова) моделью Gemini.</li>
                            <li><b>RAG-архитектура:</b> Использует <TooltipTerm definition="Технология, которая позволяет языковой модели (LLM) получать доступ к внешней, актуальной информации (например, из базы знаний) перед генерацией ответа, чтобы сделать его более точным и контекстуальным.">Retrieval-Augmented Generation</TooltipTerm> для минимизации «галлюцинаций» и повышения точности ответов.</li>
                            <li><b>Механизм контроля качества:</b> Встроенный параметр <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> позволяет автоматически отправлять только те ответы, в качестве которых система уверена, передавая сомнительные случаи оператору.</li>
                             <li><b>Прозрачность и отладка:</b> Каждая обработка сопровождается подробным JSON-логом, что позволяет анализировать и улучшать работу системы.</li>
                        </ul>
                    </InfoCard>
                </section>
                
                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="2. Архитектура и база знаний"
                        subtitle="Как устроена система «под капотом»: от управления базой знаний в Google Sheets до обработки клиентского запроса."
                    />
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 not-prose">
                        <div className="flex items-start gap-4">
                            <TableCellsIcon className="w-10 h-10 text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-2xl text-gray-800 dark:text-slate-200 mt-0">База знаний в Google Sheets</h3>
                                <p className="mt-2 text-base text-gray-700 dark:text-slate-300">
                                    Основа ассистента — это база знаний, представленная в виде Google-таблицы, где каждая строка соответствует одной паре «вопрос–ответ». Эта таблица — не просто хранилище, а интеллектуальный конструктор с функцией автоматической разметки.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-xl text-gray-800 dark:text-slate-200 flex items-center gap-2"><SparklesIcon className="w-6 h-6"/>Принцип работы авторазметки</h4>
                            <p className="mt-2 text-base">
                                Когда оператор добавляет новую вопросно-ответную пару и нажимает кнопку «Авторазметка», запускается скрипт, который (используя Gemini 1.5 flash):
                            </p>
                            <ol className="list-decimal list-inside space-y-2 mt-4 text-base pl-4">
                                <li><b>Очищает текст вопроса</b> — убирает теги, служебные символы и шум.</li>
                                <li><b>Определяет категорию и подкатегорию</b> — по ключевым словам и контексту.</li>
                                <li><b>Генерирует набор ключевых слов</b> — выделяет устойчивые выражения для поиска в RAG.</li>
                                <li><b>Сохраняет результаты</b> в соответствующие колонки таблицы.</li>
                            </ol>
                            <p className="mt-4 text-base">Таким образом, оператору достаточно один раз добавить текст — всё остальное скрипт делает сам.</p>
                        </div>
                        
                        <div className="mt-8 overflow-x-auto">
                            <h4 className="font-bold text-xl text-gray-800 dark:text-slate-200 mb-4">Пример строки в базе знаний:</h4>
                             <table className="w-full text-left border-collapse text-base">
                                <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">client_question</th>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">Answer</th>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">category</th>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">subcategory</th>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">keywords</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Не могу войти в личный кабинет, забыл пароль. Как восстановить доступ?</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Чтобы восстановить доступ, нажмите «Забыли пароль»...</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Авторизация</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Восстановление пароля</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700"><code className="text-sm">пароль; доступ; личный кабинет; восстановление; забытый пароль</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section id="workflow" className="scroll-mt-24">
                     <SectionHeader 
                        icon={<Cog6ToothIcon className="w-8 h-8" />}
                        title="3. Жизненный цикл обработки тикета"
                        subtitle="Общий принцип работы: от получения клиентского запроса из Omnidesk до автоматической отправки ответа."
                    />
                    <TicketWorkflowDiagram />
                </section>

                 <section id="json-logs" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CodeBracketIcon className="w-8 h-8" />}
                        title="4. Анализ ответов: JSON-логи и отладка"
                        subtitle="Для каждой обработки создаётся подробный JSON-лог. В нём фиксируется, по каким тематикам ассистент выполнял поиск, какие темы он нашёл и какую в итоге выбрал. Это позволяет при необходимости корректировать разметку и улучшать точность."
                    />
                    <CollapsibleSection title="Показать структуру JSON-лога">
                        <p className="mb-4">Система может генерировать многоуровневые ответы. Ниже представлены примеры основного и уточняющего ответа.</p>
                        <div className="space-y-6">
                            <CodeBlockWithCopy title="Основной ответ (Level 1)" code={`
{
  // Итоговый текст ответа, сгенерированный моделью.
  // Может содержать ссылки, нумерованные шаги, обращения к пользователю.
  "answer": "Чтобы восстановить доступ, нажмите «Забыли пароль»...",

  // Список кандидатов, которые модель рассматривала в процессе выбора финального ответа.
  "candidates": [
    {
      "id": "rag_doc_101",
      "score": 0.92,
      "category": "Авторизация"
    },
    {
      "id": "rag_doc_105",
      "score": 0.78,
      "category": "Профиль"
    }
  ],

  // Язык, на котором был сформирован ответ.
  "language": "ru",

  // Главная категория, выбранная системой для данного ответа.
  "category": "Авторизация",

  // Массив ссылок, которые модель включила в ответ.
  "urls": ["https://example.com/reset-password"],

  // Блок числовых метрик уверенности модели.
  "confidence": {
    "answer": 0.95, // Уверенность в правильности самого ответа.
    "urls": 0.99   // Уверенность в корректности или актуальности ссылок.
  }
}
                            `} />
                             <CodeBlockWithCopy title="Уточняющий ответ (Level 2)" code={`
{
  // Уточнённый или промежуточный ответ, который уточняет детали level1.
  "answer": "Если письмо не пришло, проверьте папку «Спам».",

  // Здесь может быть один кандидат (наиболее релевантный) или несколько уточнённых.
  "candidates": [
    {
      "id": "rag_doc_102",
      "score": 0.98,
      "category": "Авторизация"
    }
  ],

  "language": "ru",
  "category": "Авторизация",
  "urls": [],

  "confidence": {
    "answer": 0.99,
    "urls": 1.0
  }
}
                            `} />
                        </div>
                    </CollapsibleSection>
                </section>
                
                <section id="limitations" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<BugAntIcon className="w-8 h-8" />}
                        title="5. Ограничения и будущие улучшения"
                        subtitle="Текущие рамки и потенциальные направления для развития системы."
                    />
                     <div className="space-y-4">
                        <InfoCard icon={<ExclamationTriangleIcon className="w-6 h-6"/>} title="Текущие ограничения">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Зависимость от качества базы знаний:</b> Точность ответов напрямую зависит от полноты и актуальности информации в Google-таблице.</li>
                                <li><b>Ограниченный файловый процессинг:</b> Поддерживаются только текстовые форматы. Изображения и PDF не анализируются.</li>
                                <li><b>Простые структуры:</b> Система пока не умеет эффективно извлекать и интерпретировать данные из сложных таблиц или вложенных структур в базе знаний.</li>
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
