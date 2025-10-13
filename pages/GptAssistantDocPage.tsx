import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CollapsibleSection, CodeBlockWithCopy } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, WrenchScrewdriverIcon, 
    ScaleIcon, InboxArrowDownIcon, ArrowLongRightIcon, LightBulbIcon, 
    MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon, PencilSquareIcon, 
    BookOpenIcon, BugAntIcon, HandRaisedIcon, FunnelIcon, CheckCircleIcon,
    ArrowLongDownIcon, ExclamationTriangleIcon, AcademicCapIcon, ArrowPathIcon, FlagIcon, RocketLaunchIcon, Cog6ToothIcon, UsersIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const TicketWorkflowDiagram: React.FC = () => {
    const diagramRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(diagramRef, { targetSelector: '.diagram-element' });
    
    const [tooltipState, setTooltipState] = useState({ visible: false, content: '', top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = (event: React.MouseEvent<HTMLDivElement>, content: string) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipState({
            visible: true,
            content,
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
        });
    };

    const hideTooltip = () => {
        setTooltipState(prev => ({ ...prev, visible: false }));
    };

    const TooltipPortal = () => {
        const tooltipRoot = document.getElementById('tooltip-root');
        if (!tooltipRoot) return null;

        return ReactDOM.createPortal(
            <div
                ref={tooltipRef}
                className="fixed p-3 bg-slate-800 text-slate-200 text-sm rounded-md shadow-lg z-50 max-w-xs transition-opacity duration-200"
                style={{
                    top: tooltipState.top,
                    left: tooltipState.left,
                    transform: 'translate(-50%, -100%)',
                    opacity: tooltipState.visible ? 1 : 0,
                    pointerEvents: 'none'
                }}
                role="tooltip"
            >
                {tooltipState.content}
            </div>,
            tooltipRoot
        );
    };


    const stages = [
        { icon: <InboxArrowDownIcon className="w-10 h-10 text-indigo-500"/>, title: "1. Получение", tooltip: "Запрос от клиента поступает в систему из тикет-системы Omnidesk и становится отправной точкой для всего процесса анализа." },
        { icon: <FunnelIcon className="w-10 h-10 text-indigo-500"/>, title: "2. Очистка и RAG", tooltip: "Текст запроса очищается от шума. Затем система производит семантический поиск по векторной базе знаний (RAG), чтобы найти наиболее релевантную информацию для формирования ответа." },
        { icon: <PencilSquareIcon className="w-10 h-10 text-indigo-500"/>, title: "3. Генерация ответа", tooltip: "На основе найденных фактов LLM-модель составляет черновой вариант ответа, который максимально точно и полно отвечает на вопрос клиента." },
        { icon: <CheckCircleIcon className="w-10 h-10 text-indigo-500"/>, title: "4. Оценка и отправка", tooltip: "Ответ предлагается оператору как готовый черновик, если его показатель уверенности (score) превышает 80%. В противном случае тикет передается на полную ручную обработку." },
    ];
    
    return (
        <div ref={diagramRef} className="my-8 not-prose">
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                 <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
                    {stages.map((stage, index) => (
                        <React.Fragment key={stage.title}>
                            <div 
                                className="flex-1 flex justify-center diagram-element" 
                                style={{ transitionDelay: `${index * 150}ms` }}
                                onMouseEnter={(e) => showTooltip(e, stage.tooltip)}
                                onMouseLeave={hideTooltip}
                            >
                                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm w-full max-w-[180px] h-full">
                                    {stage.icon}
                                    <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200 flex-grow flex items-center">{stage.title}</h4>
                                </div>
                            </div>
                            {index < stages.length - 1 && (
                                <>
                                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 self-center hidden md:block diagram-element" style={{ transitionDelay: `${index * 150 + 75}ms` }} />
                                    <ArrowLongDownIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 self-center md:hidden my-2 diagram-element" style={{ transitionDelay: `${index * 150 + 75}ms` }} />
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <TooltipPortal />
        </div>
    );
};

const GptAssistantDocumentationPage: React.FC = () => {
    const scoreExplanation = "Это показатель уверенности модели (от 0.0 до 1.0) в том, что сгенерированный ответ точен и релевантен. Если score ≥ 0.8, система предлагает ответ оператору как готовый к отправке черновик. Если score ниже, тикет помечается для полной ручной обработки. Этот механизм гарантирует, что оператор получает только качественные подсказки, а не сомнительные варианты.";

    const cycleSteps = [
        {
            icon: <InboxArrowDownIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 1: Получение тикета",
            description: "Клиентский запрос «Я не могу войти в личный кабинет, пишет неверный пароль» поступает из Omnidesk. Ассистент немедленно фиксирует его в Google Sheet для отслеживания."
        },
        {
            icon: <FunnelIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 2: Очистка вопроса",
            description: "Система нормализует текст, удаляя шум и приводя его к каноническому виду. Результат записывается в столбец `clean_question`: «Не могу войти в личный кабинет, забыл пароль»."
        },
        {
            icon: <MagnifyingGlassIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 3: RAG-поиск",
            description: "Очищенный запрос векторизуется и сравнивается с базой знаний. Система находит наиболее релевантный блок — «Восстановление пароля»."
        },
        {
            icon: <PencilSquareIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 4: Генерация и оценка",
            description: "На основе найденного блока LLM формирует ответ. Система оценивает его уверенность: `score = 91%`. JSON-лог, содержащий всю цепочку выбора, сохраняется."
        },
        {
            icon: <CheckCircleIcon className="w-8 h-8 text-green-500"/>,
            title: "Шаг 5: Результат (Score ≥ 80%)",
            description: "Поскольку `score` высокий (91% > 80%), сгенерированный ответ отображается в интерфейсе Omnidesk как готовый к отправке черновик-подсказка для оператора. Оператор может отправить его в один клик."
        },
         {
            icon: <HandRaisedIcon className="w-8 h-8 text-amber-500"/>,
            title: "Альтернативный сценарий (Score < 80%)",
            description: "Если бы `score` был 62%, система бы не предложила черновик. Тикет был бы просто передан оператору для полной ручной обработки, без AI-подсказки."
        }
    ];


    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">

                <section id="concept" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CpuChipIcon className="w-8 h-8" />}
                        title="1. Концепция: интеллектуальный помощник оператора"
                        subtitle="Описание AI-ассистента, который снижает нагрузку на первую линию поддержки, автоматически готовя черновики ответов на типовые вопросы с помощью динамической базы знаний."
                    />
                    <p>Этот GPT-ассистент — не просто бот, а автоматизированный сотрудник поддержки, у которого есть память, интуиция и самооценка. Он не заменяет человека — он освобождает его время для действительно сложных задач, беря на себя рутинный поиск информации и подготовку ответов.</p>
                    
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Роль ассистента-помощника:</b> Основная задача — помогать оператору, а не заменять его. Система готовит качественные черновики, которые человек может отправить в один клик.</li>
                            <li><b>Динамическая база знаний:</b> База знаний ведется в Google-таблице, которая служит единым «хабом» для управления данными и жизненным циклом обращения.</li>
                            <li><b><TooltipTerm definition="Retrieval-Augmented Generation — технология, которая позволяет языковой модели (LLM) получать доступ к внешней, актуальной информации (например, из базы знаний) перед генерацией ответа, чтобы сделать его более точным и контекстуальным.">RAG</TooltipTerm>-архитектура:</b> Использует семантический поиск по векторной базе для минимизации «галлюцинаций» и повышения точности ответов.</li>
                            <li><b>Контроль качества:</b> Встроенный параметр <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> позволяет предлагать оператору только те ответы, в качестве которых система уверена.</li>
                            <li><b>Прозрачность и обучаемость:</b> Каждая обработка сопровождается подробным JSON-логом, что позволяет анализировать и улучшать работу системы через обратную связь.</li>
                        </ul>
                    </InfoCard>
                </section>
                
                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="2. Архитектура и отказоустойчивость"
                        subtitle="Как Google-таблица выступает в роли центрального хаба, и почему разделение ответственности делает систему устойчивой."
                    />
                    <p>Главная особенность архитектуры — это чёткое разделение ответственности между компонентами. Каждый элемент системы изолирован и выполняет свою уникальную функцию, что делает систему масштабируемой и отказоустойчивой.</p>
                     <div className="grid md:grid-cols-2 gap-6 mt-6 not-prose">
                        <InfoCard icon={<DocumentTextIcon className="w-8 h-8"/>} title="Google Sheets">
                           <p>Управляет всем процессом и хранит логи. Выступает в роли центрального хаба, управляющего жизненным циклом каждого обращения.</p>
                        </InfoCard>
                         <InfoCard icon={<MagnifyingGlassIcon className="w-8 h-8"/>} title="RAG-механизм">
                           <p>Отвечает за семантический поиск и обеспечивает достоверность информации, находя релевантные факты в базе знаний.</p>
                        </InfoCard>
                         <InfoCard icon={<PencilSquareIcon className="w-8 h-8"/>} title="Языковая модель (LLM)">
                           <p>Занимается исключительно генерацией связного текста на основе данных, предоставленных RAG-механизмом.</p>
                        </InfoCard>
                         <InfoCard icon={<ShieldCheckIcon className="w-8 h-8"/>} title="Score и Fallback">
                           <p>Гарантируют качество и безопасность, отфильтровывая слабые ответы и передавая сложные случаи человеку.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="workflow-steps" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ArrowPathIcon className="w-8 h-8" />}
                        title="3. Жизненный цикл обработки тикета"
                        subtitle="Пошаговый процесс: от получения запроса до предложения готового ответа оператору."
                    />
                    <p>Каждый тикет проходит через стандартизированный конвейер обработки, который превращает сырой запрос клиента в структурированный и качественный ответ.</p>
                    <TicketWorkflowDiagram />

                    <h3 className="text-2xl font-bold mb-4 mt-12">Таблица этапов в Google Sheets</h3>
                    <p className="mb-4">Google-таблица — это не просто хранилище, а рабочая панель, где столбцы отражают каждый этап пути:</p>
                    <div className="my-6 not-prose overflow-x-auto">
                         <table className="w-full text-left border-collapse text-base">
                            <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-3 border border-gray-200 dark:border-slate-700">Этап</th>
                                    <th className="p-3 border border-gray-200 dark:border-slate-700">Столбец</th>
                                    <th className="p-3 border border-gray-200 dark:border-slate-700">Что происходит</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Вход</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">question, subject, case_link</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Сюда поступает оригинальное сообщение из Omnidesk.</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Очистка</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">clean_question</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Из текста убираются служебные метки, шум и повторения.</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Генерация</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">gpt_response</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Здесь появляется черновик ответа, созданный моделью.</td>
                                </tr>
                                 <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Контроль</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">score, status</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Система оценивает уверенность и решает, предлагать ли ответ оператору.</td>
                                </tr>
                                 <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold">Диагностика</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">triage_response, JSON</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Сохраняются внутренние логи и объяснения модели.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="gpttunnel-mechanics" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<Cog6ToothIcon className="w-8 h-8" />}
                        title="4. Под капотом: Механика gpttunnel"
                        subtitle="Центральный узел, который соединяет человека, базу знаний и большую языковую модель, выполняя всю «грязную работу» по обработке данных."
                    />
                    <p>Если представить всю систему в виде цепочки, **gpttunnel** — это её центральный узел. Он действует как диспетчер, который не генерирует ответы сам, но управляет всем потоком данных: от векторизации запроса до сборки финального контекста для LLM. Без gpttunnel поток данных был бы хаотичным и неуправляемым.</p>
                    <h3 className="text-2xl font-bold mt-8">Основные функции gpttunnel</h3>
                     <div className="grid md:grid-cols-3 gap-6 mt-6 not-prose">
                        <InfoCard icon={<PuzzlePieceIcon className="w-8 h-8"/>} title="Векторизация">
                           <p>Превращает текстовые фрагменты RAG-файла в векторы — числовые координаты, отражающие смысл текста.</p>
                        </InfoCard>
                         <InfoCard icon={<MagnifyingGlassIcon className="w-8 h-8"/>} title="Поиск">
                           <p>Находит в векторной базе 5 наиболее близких по смыслу фрагментов к запросу клиента.</p>
                        </InfoCard>
                         <InfoCard icon={<PencilSquareIcon className="w-8 h-8"/>} title="Генерация">
                           <p>Передаёт найденные фрагменты в LLM, собирает и оформляет итоговый ответ, а также вычисляет `score`.</p>
                        </InfoCard>
                    </div>

                    <h3 className="text-2xl font-bold mt-8">Контекстный пакет (Context Bundle)</h3>
                    <p>Перед обращением к модели gpttunnel формирует внутренний документ — «контекстный пакет». Именно этот пакет определяет, какую информацию модель увидит и на основании чего примет решение. Если контекст собран правильно — ответ почти всегда будет точным.</p>
                    <CodeBlockWithCopy title="Пример внутреннего контекстного пакета" code={`
{
  "question": "Как восстановить пароль?",
  "context": [
    {"category": "Авторизация", "score": 0.91, "text": "...инструкция по восстановлению..."},
    {"category": "Аккаунт", "score": 0.77, "text": "...дополнительные сведения..."}
  ],
  "dialog_history": "...",
  "system_guidelines": "...формат ответа, стиль, ограничения..."
}
                    `} />
                </section>
                
                <section id="quality-control" className="scroll-mt-24">
                     <SectionHeader 
                        icon={<ShieldCheckIcon className="w-8 h-8" />}
                        title="5. Контроль качества и синергия с оператором"
                        subtitle="Как score-фильтр и fallback-механизм превращают AI в надежного напарника, а не замену человеку."
                    />
                    <p>Ключевая роль ассистента — помогать, а не мешать. Система контроля качества построена на двух столпах: интеллектуальном фильтре <TooltipTerm definition={scoreExplanation}>score</TooltipTerm> и безопасном <TooltipTerm definition="Резервный механизм, который активируется, когда основная система не может выполнить задачу. В данном случае, тикет передается оператору.">fallback-механизме</TooltipTerm>.</p>
                    
                    <h3 className="text-2xl font-bold mt-8">Score — умный фильтр и подсказка оператору</h3>
                    <p>Каждый сгенерированный ответ сопровождается числом <TooltipTerm definition={scoreExplanation}>score</TooltipTerm>. Но в нашей системе он выполняет не отсекающую, а направляющую функцию.</p>
                    
                    <div className="my-6 not-prose overflow-x-auto">
                        <table className="w-full text-left border-collapse text-base">
                            <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-3 border border-gray-200 dark:border-slate-700">Диапазон Score</th>
                                    <th className="p-3 border border-gray-200 dark:border-slate-700">Действие системы</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold text-green-700 dark:text-green-400">≥ 80%</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Ответ передаётся в раздел **«Подсказка оператору»** — готовый черновик, который можно отправить с минимальной правкой.</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-semibold text-amber-700 dark:text-amber-400">&lt; 80%</td>
                                    <td className="p-3 border-x border-gray-200 dark:border-slate-700">Ответ сохраняется в логе, но **не предлагается оператору**. Тикет остается на полной ручной обработке.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Практика показала, что порог в 80% является «золотой серединой»: ответы достаточно точны для использования, но система не навязывает сомнительные варианты.</p>
                     
                     <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                        <InfoCard icon={<UsersIcon className="w-8 h-8"/>} title="Синергия: AI как второй мозг">
                           <p>Оператор не теряет роль эксперта. Ассистент предлагает текст, но не навязывает его. Оператор всегда видит `score` и понимает, насколько система уверена. Это превращает AI в цифрового напарника, который экономит время, но оставляет контроль за человеком.</p>
                        </InfoCard>
                         <InfoCard icon={<HandRaisedIcon className="w-8 h-8"/>} title="Fallback: когда система молчит">
                           <p>Если в базе знаний нет нужной информации, ассистент не пытается “додумать” ответ. Он отказывается от генерации, и тикет просто уходит оператору. Так система сохраняет честность: лучше признать, что не знаешь, чем выдать выдумку.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="full-cycle-example" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<FlagIcon className="w-8 h-8" />}
                        title="6. Пример полного цикла обработки"
                        subtitle="Пошаговый разбор реального кейса: от вопроса клиента до готового черновика для оператора."
                    />
                     <div className="space-y-8 relative not-prose">
                        {/* Vertical line connecting the steps */}
                        <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                        {cycleSteps.map((step, index) => (
                             <div key={index} className="relative flex items-start gap-6">
                                <div className="flex-shrink-0 w-20 h-20 bg-white dark:bg-slate-800 border-4 border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center z-10">
                                    {step.icon}
                                </div>
                                <div className="flex-grow pt-5">
                                    <h4 className="font-bold text-xl text-slate-900 dark:text-slate-200 mt-0">{step.title}</h4>
                                    <p className="mt-1 text-base text-gray-700 dark:text-slate-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                 <section id="knowledge-base" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<BookOpenIcon className="w-8 h-8" />}
                        title="7. База знаний и JSON-логи"
                        subtitle="Фундамент системы: как RAG-файл обеспечивает точность, и как JSON-логи помогают системе обучаться."
                    />
                    <h3 className="text-2xl font-bold">RAG-файл — сердце векторной базы</h3>
                    <p>Чтобы языковая модель могла не “придумывать” ответы, а искать их в реальных данных, ей нужна база знаний, которую она понимает. Обычный CSV для этого не подходит. Поэтому данные превращаются в **RAG-файл** (Retrieval Augmented Generation Corpus) — особый текстовый индекс, где каждый вопрос и ответ имеют строго заданную структуру. Каждый такой блок — это отдельный “кирпичик” в векторной базе. Когда файл загружается в gpttunnel, внутренний механизм превращает эти блоки в векторы — числовые представления смысла текста.</p>
                     <CodeBlockWithCopy title="Пример записи в RAG-файле" code={`
<BEGIN_BLOCK>
<Q> Как восстановить пароль?
<A> Чтобы восстановить доступ, перейдите по ссылке "Забыли пароль"...
<CATEGORY> Авторизация
<SUBCATEGORY> Восстановление пароля
<KEYWORDS> пароль; доступ; сброс; личный кабинет
<END_BLOCK>
                    `} />
                     <div className="mt-6">
                         <InfoCard icon={<SparklesIcon className="w-8 h-8"/>} title="Преимущества формата RAG-файла">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Прозрачность:</b> Каждый блок можно прочитать человеку и понять, откуда взялся ответ.</li>
                                <li><b>Масштабируемость:</b> Новые вопросы просто добавляются в конец файла без сложной миграции.</li>
                                <li><b>Обучаемость:</b> Если модель ошиблась, в RAG-файл вносится исправление, и ошибка больше не повторяется.</li>
                            </ul>
                        </InfoCard>
                     </div>

                    <h3 className="text-2xl font-bold mt-8">JSON-логи — взгляд внутрь мышления ассистента</h3>
                    <p>Каждый раз, когда ассистент обрабатывает запрос, он создаёт JSON-лог. Это цифровой след, показывающий, как именно модель искала ответ, какие темы она рассматривала и почему выбрала одну из них. Это фактически “дневник рассуждений” ассистента, который даёт возможность объяснить любую ошибку и улучшать базу знаний.</p>
                    
                    <CollapsibleSection title="Показать структуру и расшифровку JSON-лога">
                         <CodeBlockWithCopy title="Пример реального фрагмента JSON-лога" code={`
{
  "question": "Как восстановить пароль?",
  "retrieved_candidates": [
    {"id": 23, "category": "Авторизация", "similarity": 0.94},
    {"id": 57, "category": "Аккаунт", "similarity": 0.81},
    {"id": 114, "category": "Безопасность", "similarity": 0.76}
  ],
  "selected": {"id": 23, "reason": "наибольшее совпадение ключевых слов и контекста"},
  "model_score": 86,
  "final_response": "Чтобы восстановить пароль, нажмите «Забыли пароль»..."
}
                            `} />
                        <div className="my-6 not-prose overflow-x-auto">
                            <table className="w-full text-left border-collapse text-base">
                                <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                    <tr>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">Поле</th>
                                        <th className="p-3 border border-gray-200 dark:border-slate-700">Назначение</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">question</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Очищенный запрос клиента.</td>
                                    </tr>
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">retrieved_candidates</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Массив тем из RAG-базы, которые система рассмотрела как потенциально релевантные.</td>
                                    </tr>
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">selected</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Фрагмент-«победитель», на основе которого был сгенерирован ответ, и причина выбора.</td>
                                    </tr>
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">model_score</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Итоговая уверенность модели в ответе (от 0 до 100).</td>
                                    </tr>
                                    <tr className="border-b dark:border-slate-700">
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700 font-mono">final_response</td>
                                        <td className="p-3 border-x border-gray-200 dark:border-slate-700">Черновой ответ, который был передан оператору в качестве подсказки.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CollapsibleSection>
                </section>
                
                <section id="evolution" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<RocketLaunchIcon className="w-8 h-8" />}
                        title="8. Эволюция и дорожная карта"
                        subtitle="От быстрой генерации к прозрачным рассуждениям, текущие ограничения и планы на будущее."
                    />
                     <div className="space-y-8">
                        <InfoCard icon={<AcademicCapIcon className="w-8 h-8"/>} title="Эволюция: от Gemini Flash к Pro">
                            <p>Поначалу система работала на модели Gemini 2.5 Flash — быстрой, но без возможности выводить рассуждения. Позднее произошел переход на Gemini 2.5 Pro, которая умеет объяснять свои шаги. Теперь разработчики видят **“цепочку рассуждений”**: как модель выбирала статью, какие кандидаты рассматривала и почему отвергла одни и выбрала другие. Это превратило систему в прозрачный инструмент, где каждая ошибка может быть разобрана и исправлена.</p>
                        </InfoCard>
                        <InfoCard icon={<ExclamationTriangleIcon className="w-8 h-8"/>} title="Текущие ограничения">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Зависимость от качества базы знаний:</b> Точность ответов напрямую зависит от полноты и актуальности информации в Google-таблице.</li>
                                <li><b>Ограниченный файловый процессинг:</b> Поддерживаются только текстовые форматы. Изображения и PDF не анализируются.</li>
                                <li><b>Простые структуры:</b> Система пока не умеет эффективно извлекать данные из сложных таблиц в базе знаний.</li>
                            </ul>
                        </InfoCard>
                         <InfoCard icon={<SparklesIcon className="w-8 h-8"/>} title="Планы на будущее">
                            <ul className="list-disc list-inside space-y-2">
                                <li><b>Интеграция с CRM:</b> Подключение к CRM для получения истории покупок клиента и предоставления более персонализированных ответов.</li>
                                <li><b>Поддержка мультимодальности:</b> Возможность анализировать изображения (например, скриншоты ошибок), чтобы лучше понимать проблему.</li>
                                <li><b>Проактивные действия:</b> Наделение ассистента возможностью не только отвечать, но и выполнять простые действия (например, создавать заявку).</li>
                            </ul>
                        </InfoCard>
                     </div>
                </section>

                 <section id="conclusion" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<FlagIcon className="w-8 h-8" />}
                        title="9. Заключение"
                        subtitle="Сила системы — в сочетании автоматизации, прозрачности и постоянного улучшения."
                    />
                    <p>Этот GPT-ассистент — не просто бот, а автоматизированный сотрудник поддержки, который помогает человеку, а не заменяет его. Он освобождает время операторов для действительно сложных и творческих задач. Система обучается, анализирует себя, растёт и со временем становится умнее, превращаясь из инструмента в настоящего партнёра.</p>
                </section>
                
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;