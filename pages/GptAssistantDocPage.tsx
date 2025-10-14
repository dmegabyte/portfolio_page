import React, { useRef, useId, useState, ReactNode } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, CodeBlockWithCopy, Modal, DefinitionList, CollapsibleSection } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, WrenchScrewdriverIcon, 
    InboxArrowDownIcon, ArrowLongRightIcon, LightBulbIcon, 
    MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon, PencilSquareIcon, 
    BookOpenIcon, HandRaisedIcon, FunnelIcon, CheckCircleIcon,
    ArrowLongDownIcon, ExclamationTriangleIcon, AcademicCapIcon, ArrowPathIcon, FlagIcon, RocketLaunchIcon, Cog6ToothIcon, UsersIcon, ArchiveBoxIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, EyeIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const TicketProcessingPipeline: React.FC = () => {
    const pipelineRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(pipelineRef, { targetSelector: '.pipeline-stage' });

    const pipelineSteps = [
        {
            icon: <InboxArrowDownIcon className="w-8 h-8 text-indigo-500" />,
            title: "Шаг 1: Получение тикета (Вход)",
            description: "Процесс начинается, когда оригинальное сообщение клиента поступает из Omnidesk. Система немедленно фиксирует его в Google Sheet для отслеживания.",
            transformation: {
                input: { title: "Сообщение клиента", data: `"Не могу войти в личный кабинет..."` },
                output: { title: "Столбцы: `question`, `subject`...", data: `question: "Не могу войти..."\nsubject: "Вход",\ncase_link: "..."` }
            }
        },
        {
            icon: <FunnelIcon className="w-8 h-8 text-indigo-500" />,
            title: "Шаг 2: Очистка",
            description: "Из исходного текста запроса убираются все служебные метки, \"шум\" и повторения. Результат — чистый, нормализованный вопрос, готовый для семантического анализа.",
            transformation: {
                input: { title: "Столбец `question`", data: `"Не могу войти в личный кабинет..."` },
                output: { title: "Столбец: `clean_question`", data: `"не могу войти личный кабинет"` }
            }
        },
        {
            icon: <PencilSquareIcon className="w-8 h-8 text-indigo-500" />,
            title: "Шаг 3: Генерация",
            description: "На основе RAG-поиска и очищенного вопроса языковая модель (LLM) создает черновой вариант ответа. Этот текст является предварительным решением задачи клиента.",
             transformation: {
                input: { title: "Столбец `clean_question`", data: `"не могу войти личный кабинет"` },
                output: { title: "Столбец: `gpt_response`", data: `"Чтобы восстановить доступ, перейдите..."` }
            }
        },
        {
            icon: <CheckCircleIcon className="w-8 h-8 text-indigo-500" />,
            title: "Шаг 4: Контроль",
            description: "Система оценивает уверенность сгенерированного ответа (score) и присваивает тикету статус. На этом этапе принимается решение, предлагать ли ответ оператору.",
            transformation: {
                input: { title: "Столбец `gpt_response`", data: `"Чтобы восстановить доступ..."` },
                output: { title: "Столбцы: `score`, `status`", data: `score: 91\nstatus: "Подсказка"` }
            }
        },
        {
            icon: <DocumentTextIcon className="w-8 h-8 text-indigo-500" />,
            title: "Шаг 5: Диагностика",
            description: "Сохраняются полные внутренние логи, включая \"цепочку рассуждений\" модели. Это позволяет анализировать и отлаживать процесс принятия решений ассистентом.",
            transformation: {
                input: { title: "Результат генерации", data: `{\n  model_score: 91, ...\n}` },
                output: { title: "Столбцы: `triage_response`, `JSON`", data: `"{ \\"question\\": \\"...\\" }"` }
            }
        }
    ];

    return (
        <div ref={pipelineRef} className="my-8 not-prose">
            <div className="space-y-8 relative">
                {/* Vertical connecting line */}
                <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                
                {pipelineSteps.map((step, index) => (
                    <div 
                        key={index} 
                        className="relative flex items-start gap-6 pipeline-stage"
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 w-20 h-20 bg-white dark:bg-slate-900 border-4 border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center z-10">
                            {step.icon}
                        </div>
                        {/* Content */}
                        <div className="flex-grow pt-1">
                            <h4 className="font-bold text-xl text-slate-900 dark:text-slate-200 mt-0">{step.title}</h4>
                            <p className="mt-1 text-base text-gray-700 dark:text-slate-300">{step.description}</p>
                            {step.transformation && (
                                <div className="mt-4 grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <h5 className="font-semibold text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <ArrowDownTrayIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" aria-hidden="true" />
                                            <span>Вход: {step.transformation.input.title}</span>
                                        </h5>
                                        <code className="block text-sm whitespace-pre-wrap bg-white dark:bg-slate-900 p-2 rounded">{step.transformation.input.data}</code>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                         <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                            <ArrowUpTrayIcon className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                                            <span>Выход: {step.transformation.output.title}</span>
                                         </h5>
                                        <code className="block text-sm whitespace-pre-wrap bg-green-100/50 dark:bg-green-900/50 p-2 rounded">{step.transformation.output.data}</code>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Section Components ---

const ConceptSection: React.FC = () => (
    <>
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
                <li><b>Контроль качества:</b> Встроенный параметр <TooltipTerm definition={"Это показатель уверенности модели (от 0.0 до 1.0) в том, что сгенерированный ответ точен и релевантен. Если score ≥ 0.8, система предлагает ответ оператору как готовый к отправке черновик. Если score ниже, тикет помечается для полной ручной обработки. Этот механизм гарантирует, что оператор получает только качественные подсказки, а не сомнительные варианты."}>score</TooltipTerm> позволяет предлагать оператору только те ответы, в качестве которых система уверена.</li>
                <li><b>Прозрачность и обучаемость:</b> Каждая обработка сопровождается подробным JSON-логом, что позволяет анализировать и улучшать работу системы через обратную связь.</li>
            </ul>
        </InfoCard>
    </>
);

const ArchitectureSection: React.FC = () => (
    <>
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
    </>
);

const WorkflowStepsSection: React.FC = () => (
    <>
        <SectionHeader 
            icon={<ArrowPathIcon className="w-8 h-8" />}
            title="3. Жизненный цикл обработки тикета"
            subtitle="Пошаговый процесс: от получения запроса до предложения готового ответа оператору."
        />
        <p>Каждый тикет проходит через стандартизированный конвейер обработки, который превращает сырой запрос клиента в структурированный и качественный ответ. Google-таблица выступает в роли рабочей панели, где столбцы отражают каждый этап этого пути.</p>
        <TicketProcessingPipeline />
    </>
);

const GptTunnelMechanicsSection: React.FC = () => {
    const gptTunnelDiagramRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(gptTunnelDiagramRef, { targetSelector: '.diagram-element' });
    
    const contextPackageFields = [
        { term: "question", definition: "Очищенный и нормализованный вопрос клиента." },
        { term: "context", definition: "Массив наиболее релевантных фрагментов, найденных в RAG-базе знаний." },
        { term: "dialog_history", definition: "Предыдущие сообщения из диалога для сохранения контекста беседы." },
        { term: "system_guidelines", definition: "Системные инструкции для LLM (стиль ответа, ограничения, формат вывода)." },
    ];

    return (
        <>
            <SectionHeader 
                icon={<Cog6ToothIcon className="w-8 h-8" />}
                title="4. Под капотом: Механика gpttunnel"
                subtitle="Центральный узел, который соединяет человека, базу знаний и большую языковую модель, выполняя всю «грязную работу» по обработке данных."
            />
            <p>Если представить всю систему в виде цепочки, <strong>gpttunnel</strong> — это её центральный узел. Он действует как диспетчер, который не генерирует ответы сам, но управляет всем потоком данных: от превращения текста в понятные машине <TooltipTerm definition="Числовые представления текста, которые отражают его семантический смысл. Близкие по смыслу тексты имеют близкие векторы.">векторы</TooltipTerm> до сборки финального контекста для <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>. Без gpttunnel поток данных был бы хаотичным и неуправляемым.</p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Конвейер обработки gpttunnel</h3>
            <div ref={gptTunnelDiagramRef} className="not-prose my-8 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center">
                    <div className="flex flex-col items-center w-52 diagram-element" style={{transitionDelay: '0ms'}}>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full border dark:border-slate-700 shadow-sm"><PuzzlePieceIcon className="w-10 h-10 text-indigo-500"/></div>
                        <h4 className="font-bold text-lg mt-3">1. Векторизация</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Превращает текстовые фрагменты RAG-файла в числовые векторы, отражающие их смысл.</p>
                    </div>
                    <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block diagram-element" style={{transitionDelay: '150ms'}}/>
                    <ArrowLongDownIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 md:hidden diagram-element" style={{transitionDelay: '150ms'}}/>
                    <div className="flex flex-col items-center w-52 diagram-element" style={{transitionDelay: '300ms'}}>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full border dark:border-slate-700 shadow-sm"><MagnifyingGlassIcon className="w-10 h-10 text-indigo-500"/></div>
                        <h4 className="font-bold text-lg mt-3">2. Поиск</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Находит в векторной базе 5 наиболее близких по смыслу фрагментов к запросу клиента.</p>
                    </div>
                     <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block diagram-element" style={{transitionDelay: '450ms'}}/>
                     <ArrowLongDownIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 md:hidden diagram-element" style={{transitionDelay: '450ms'}}/>
                    <div className="flex flex-col items-center w-52 diagram-element" style={{transitionDelay: '600ms'}}>
                        <div className="p-3 bg-white dark:bg-slate-800 rounded-full border dark:border-slate-700 shadow-sm"><ArchiveBoxIcon className="w-10 h-10 text-indigo-500"/></div>
                        <h4 className="font-bold text-lg mt-3">3. Сборка пакета</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Формирует «контекстный пакет», вычисляет `score` и передает его в LLM для генерации ответа.</p>
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-bold mt-12">Продукт работы: «Контекстный пакет»</h3>
            <p>Результатом работы конвейера gpttunnel является внутренний документ — «контекстный пакет». Именно этот пакет определяет, какую информацию модель увидит и на основании чего примет решение. Если контекст собран правильно — ответ почти всегда будет точным.</p>
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
            <div className="my-6">
                <DefinitionList items={contextPackageFields} />
            </div>
        </>
    );
};

const QualityControlSection: React.FC = () => (
    <>
         <SectionHeader 
            icon={<ShieldCheckIcon className="w-8 h-8" />}
            title="5. Контроль качества и синергия с оператором"
            subtitle="Как score-фильтр и fallback-механизм превращают AI в надежного напарника, а не замену человеку."
        />
        <p>Ключевая роль ассистента — помогать, а не мешать. Система контроля качества построена на двух столпах: интеллектуальном фильтре <TooltipTerm definition={"Это показатель уверенности модели (от 0.0 до 1.0) в том, что сгенерированный ответ точен и релевантен. Если score ≥ 0.8, система предлагает ответ оператору как готовый к отправке черновик. Если score ниже, тикет помечается для полной ручной обработки. Этот механизм гарантирует, что оператор получает только качественные подсказки, а не сомнительные варианты."}>score</TooltipTerm> и безопасном <TooltipTerm definition="Резервный механизм, который активируется, когда основная система не может выполнить задачу. В данном случае, тикет передается оператору.">fallback-механизме</TooltipTerm>.</p>
        
        <h3 className="text-2xl font-bold mt-8">Score — умный фильтр и подсказка оператору</h3>
        <p>Каждый сгенерированный ответ сопровождается числом <TooltipTerm definition={"Это показатель уверенности модели (от 0.0 до 1.0) в том, что сгенерированный ответ точен и релевантен. Если score ≥ 0.8, система предлагает ответ оператору как готовый к отправке черновик. Если score ниже, тикет помечается для полной ручной обработки. Этот механизм гарантирует, что оператор получает только качественные подсказки, а не сомнительные варианты."}>score</TooltipTerm>. Но в нашей системе он выполняет не отсекающую, а направляющую функцию.</p>
        
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
    </>
);

interface CycleStepModalData {
    title: string;
    input: { title: string; data: string };
    output: { title: string; data: string };
}

const FullCycleExampleSection: React.FC = () => {
    const [modalData, setModalData] = useState<CycleStepModalData | null>(null);

    const cycleSteps = [
        {
            icon: <InboxArrowDownIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 1: Получение тикета",
            description: "Клиентский запрос поступает из Omnidesk. Ассистент немедленно фиксирует его в Google Sheet для отслеживания.",
            inputOutput: {
                input: { title: "Запрос клиента", data: `"Я не могу войти в личный кабинет, пишет неверный пароль"` },
                output: { title: "Запись в Google Sheet", data: `question: "Я не могу войти..."\nsubject: "Вход"\ncase_link: "..."` }
            }
        },
        {
            icon: <FunnelIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 2: Очистка вопроса",
            description: "Система нормализует текст, удаляя шум и приводя его к каноническому виду. Результат записывается в столбец `clean_question`.",
            inputOutput: {
                input: { title: "Столбец `question`", data: `"Я не могу войти в личный кабинет, пишет неверный пароль"` },
                output: { title: "Столбец `clean_question`", data: `"Не могу войти в личный кабинет, забыл пароль"` }
            }
        },
        {
            icon: <MagnifyingGlassIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 3: RAG-поиск и генерация",
            description: "Очищенный запрос векторизуется и сравнивается с базой знаний. На основе наиболее релевантного блока LLM формирует ответ.",
            inputOutput: {
                input: { title: "Столбец `clean_question`", data: `"Не могу войти в личный кабинет, забыл пароль"` },
                output: { title: "Столбец `gpt_response`", data: `"Чтобы восстановить доступ, перейдите по ссылке 'Забыли пароль'..."` }
            }
        },
        {
            icon: <CheckCircleIcon className="w-8 h-8 text-indigo-500"/>,
            title: "Шаг 4: Оценка и результат",
            description: "Система оценивает уверенность ответа. Поскольку `score` высокий (91% > 80%), сгенерированный ответ отображается в интерфейсе Omnidesk как готовый черновик.",
            inputOutput: {
                input: { title: "Столбец `gpt_response`", data: `"Чтобы восстановить доступ, перейдите..."` },
                output: { title: "Столбцы `score` и `status`", data: `score: 91\nstatus: "Подсказка"` }
            }
        },
    ];

    const openModal = (step: typeof cycleSteps[0]) => {
        if (step.inputOutput) {
            setModalData({
                title: step.title,
                input: step.inputOutput.input,
                output: step.inputOutput.output,
            });
        }
    };

    return (
        <>
            <SectionHeader 
                icon={<FlagIcon className="w-8 h-8" />}
                title="6. Пример полного цикла обработки"
                subtitle="Пошаговый разбор реального кейса: от вопроса клиента до готового черновика для оператора."
            />
             <div className="space-y-8 relative not-prose">
                <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                {cycleSteps.map((step, index) => (
                     <div key={index} className="relative flex items-start gap-6">
                        <div className="flex-shrink-0 w-20 h-20 bg-white dark:bg-slate-800 border-4 border-gray-200 dark:border-slate-700 rounded-full flex items-center justify-center z-10">
                            {step.icon}
                        </div>
                        <div className="flex-grow pt-5">
                            <h4 className="font-bold text-xl text-slate-900 dark:text-slate-200 mt-0">{step.title}</h4>
                            <p className="mt-1 text-base text-gray-700 dark:text-slate-300">{step.description}</p>
                            {step.inputOutput && (
                                <div className="mt-4">
                                    <button 
                                        onClick={() => openModal(step)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-slate-700 text-indigo-700 dark:text-slate-200 font-semibold text-sm rounded-lg hover:bg-indigo-200 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500"
                                    >
                                        <EyeIcon className="w-5 h-5" />
                                        Посмотреть детали трансформации
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <InfoCard icon={<HandRaisedIcon className="w-8 h-8"/>} title="Альтернативный сценарий (Score < 80%)">
                    <p>Если бы итоговый `score` был 62%, система не предложила бы черновик. Тикет был бы просто передан оператору для полной ручной обработки, без AI-подсказки. Это гарантирует, что оператор не отвлекается на некачественные или сомнительные варианты.</p>
                </InfoCard>
            </div>
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Финальный JSON-лог примера</h3>
                <CodeBlockWithCopy 
                    title="Полный цифровой след обработки тикета"
                    code={`
{
  "question": "Не могу войти в личный кабинет, забыл пароль",
  "retrieved_candidates": [
    {"id": 23, "category": "Авторизация", "similarity": 0.91},
    {"id": 57, "category": "Аккаунт", "similarity": 0.77}
  ],
  "selected": {"id": 23, "reason": "наибольшее совпадение по смыслу"},
  "model_score": 91,
  "final_response": "Чтобы восстановить доступ, перейдите по ссылке 'Забыли пароль' и следуйте инструкциям."
}
                    `} 
                />
            </div>

            {modalData && (
                <Modal
                    isOpen={!!modalData}
                    onClose={() => setModalData(null)}
                    title={`Детали трансформации: ${modalData.title}`}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <h5 className="font-semibold text-gray-800 dark:text-slate-200 mb-2 flex items-center gap-2 text-lg">
                                <ArrowDownTrayIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />
                                <span>Вход: {modalData.input.title}</span>
                            </h5>
                            <CodeBlockWithCopy title="Входные данные" code={modalData.input.data} />
                        </div>
                        <div className="space-y-2">
                             <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2 text-lg">
                                <ArrowUpTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                <span>Выход: {modalData.output.title}</span>
                             </h5>
                            <CodeBlockWithCopy title="Выходные данные" code={modalData.output.data} />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

const KnowledgeBaseSection: React.FC = () => {
    const arrowMarkerId = useId();
    const diagramTitleId = useId();

    const ragTags = [
        { term: "<Q>", definition: "Канонический, очищенный вопрос, описывающий суть проблемы." },
        { term: "<A>", definition: "Эталонный, исчерпывающий и готовый к использованию ответ на вопрос." },
        { term: "<CATEGORY>", definition: "Категория верхнего уровня для группировки (напр., 'Авторизация')." },
        { term: "<SUBCATEGORY>", definition: "Уточняющая подкатегория для большей детализации." },
        { term: "<KEYWORDS>", definition: "Набор ключевых слов через точку с запятой для улучшения поиска." },
    ];
    
    const jsonFields = [
        { term: "question", definition: "Очищенный запрос клиента после обработки." },
        { term: "retrieved_candidates", definition: "Массив тем из RAG-базы, которые система сочла релевантными." },
        { term: "selected", definition: "Фрагмент-«победитель», на основе которого был сгенерирован ответ." },
        { term: "model_score", definition: "Итоговая уверенность модели в ответе (от 0 до 100)." },
        { term: "final_response", definition: "Черновой ответ, предложенный оператору в качестве подсказки." },
    ];
    
    return (
        <>
            <SectionHeader 
                icon={<BookOpenIcon className="w-8 h-8" />}
                title="7. База знаний и JSON-логи"
                subtitle="Фундамент системы: как RAG-файл обеспечивает точность, и как JSON-логи помогают системе обучаться."
            />
            <figure role="group" className="my-12 not-prose text-center" aria-labelledby={diagramTitleId}>
                <figcaption id={diagramTitleId} className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200">Схема взаимодействия: от источника к результату</figcaption>
                <div className="inline-block p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <p className="font-semibold">Запрос клиента</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">"Как восстановить пароль?"</p>
                </div>
                <div className="flex justify-center my-2">
                    <ArrowLongDownIcon className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                </div>
                <div className="inline-block p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-sm">
                    <p className="font-semibold text-indigo-800 dark:text-indigo-300">Механизм RAG-поиска (gpttunnel)</p>
                </div>
                <div className="relative mt-2 w-full max-w-2xl mx-auto h-24">
                    <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0" aria-hidden="true">
                        <defs>
                            <marker id={arrowMarkerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-current text-gray-400 dark:text-slate-500" />
                            </marker>
                        </defs>
                        <path d="M 200 0 V 20 L 80 80" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-gray-400 dark:text-slate-500" markerEnd={`url(#${arrowMarkerId})`} />
                        <path d="M 200 20 L 320 80" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-gray-400 dark:text-slate-500" markerEnd={`url(#${arrowMarkerId})`} />
                    </svg>
                    <div className="absolute top-10 left-[calc(25%+20px)] -translate-x-1/2 text-sm text-gray-500 dark:text-slate-400 italic">Ищет в...</div>
                    <div className="absolute top-10 right-[calc(25%+20px)] translate-x-1/2 text-sm text-gray-500 dark:text-slate-400 italic">Формирует...</div>
                </div>
                <div className="flex justify-between items-start max-w-4xl mx-auto relative -top-3">
                    <div className="w-[48%] p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-bold">RAG-файл (Библиотека)</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Хранит факты и ответы</p>
                    </div>
                    <div className="w-[48%] p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-bold">JSON-лог (Дневник)</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Записывает процесс выбора</p>
                    </div>
                </div>
            </figure>
            <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col">
                    <h3 className="text-2xl font-bold mt-0">RAG-файл — библиотека ассистента</h3>
                    <p className="text-base mt-2">Это «библиотека» знаний системы. Структурированный текстовый файл, где каждый блок преобразуется в <TooltipTerm definition="Числовые представления текста, которые отражают его семантический смысл. Близкие по смыслу тексты имеют близкие векторы.">векторы</TooltipTerm> для семантического поиска.</p>
                    <div className="mt-6">
                      <CodeBlockWithCopy title="Пример записи в RAG-файле" code={`
<BEGIN_BLOCK>
<Q> Как восстановить пароль?
<A> Чтобы восстановить доступ, перейдите по ссылке...
<CATEGORY> Авторизация
<SUBCATEGORY> Восстановление пароля
<KEYWORDS> пароль; доступ; сброс; личный кабинет
<END_BLOCK>
                    `} />
                    </div>
                    <div className="mt-6">
                        <CollapsibleSection title="Показать расшифровку тегов">
                            <DefinitionList items={ragTags} />
                        </CollapsibleSection>
                    </div>
                </div>
                 <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col">
                    <h3 className="text-2xl font-bold mt-0">JSON-логи — дневник ассистента</h3>
                    <p className="text-base mt-2">Это «дневник рассуждений» ассистента. Цифровой след, показывающий, как модель пришла к ответу. Ключевой инструмент для отладки и улучшения базы знаний.</p>
                    <div className="mt-6">
                      <CodeBlockWithCopy title="Пример реального фрагмента JSON-лога" code={`
{
  "question": "Как восстановить пароль?",
  "retrieved_candidates": [
    {"id": 23, "category": "Авторизация", "similarity": 0.94},
    {"id": 57, "category": "Аккаунт", "similarity": 0.81}
  ],
  "selected": {"id": 23, "reason": "наибольшее совпадение"},
  "model_score": 86,
  "final_response": "Чтобы восстановить пароль, нажмите..."
}
                    `} />
                    </div>
                    <div className="mt-6">
                        <CollapsibleSection title="Показать расшифровку полей">
                         <DefinitionList items={jsonFields} />
                        </CollapsibleSection>
                    </div>
                </div>
            </div>
        </>
    );
};

const EvolutionSection: React.FC = () => (
    <>
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
    </>
);

const ConclusionSection: React.FC = () => (
    <>
        <SectionHeader 
            icon={<FlagIcon className="w-8 h-8" />}
            title="9. Заключение"
            subtitle="Сила системы — в сочетании автоматизации, прозрачности и постоянного улучшения."
        />
        <p>Этот GPT-ассистент — не просто бот, а автоматизированный сотрудник поддержки, который помогает человеку, а не заменяет его. Он освобождает время операторов для действительно сложных и творческих задач. Система обучается, анализирует себя, растёт и со временем становится умнее, превращаясь из инструмента в настоящего партнёра.</p>
    </>
);

const GptAssistantDocumentationPage: React.FC = () => {
    
    const sections = [
        { id: 'concept', Component: ConceptSection },
        { id: 'architecture', Component: ArchitectureSection },
        { id: 'workflow-steps', Component: WorkflowStepsSection },
        { id: 'gpttunnel-mechanics', Component: GptTunnelMechanicsSection },
        { id: 'quality-control', Component: QualityControlSection },
        { id: 'full-cycle-example', Component: FullCycleExampleSection },
        { id: 'knowledge-base', Component: KnowledgeBaseSection },
        { id: 'evolution', Component: EvolutionSection },
        { id: 'conclusion', Component: ConclusionSection },
    ];

    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">
                {sections.map(({ id, Component }) => (
                    <section key={id} id={id} className="scroll-mt-24">
                        <Component />
                    </section>
                ))}
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;