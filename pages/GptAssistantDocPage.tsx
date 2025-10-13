import React from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon, MagnifyingGlassIcon, PuzzlePieceIcon, SparklesIcon,
    NoSymbolIcon, PencilSquareIcon, PaperAirplaneIcon, BookOpenIcon, ArrowDownCircleIcon
} from '@heroicons/react/24/outline';


const TicketWorkflowDiagram: React.FC = () => {
    const stages = [
        { icon: <InboxArrowDownIcon className="w-10 h-10 text-indigo-500"/>, title: "1. Получение тикета", description: "Запрос поступает в систему из Omnidesk." },
        { icon: <NoSymbolIcon className="w-10 h-10 text-red-500"/>, title: "2. Фильтрация", description: "Продвинутый спам-фильтр и проверка безопасности ссылок." },
        { icon: <MagnifyingGlassIcon className="w-10 h-10 text-sky-500"/>, title: "3. RAG: Поиск фактов", description: "Семантический поиск релевантной информации в векторной базе знаний." },
        { icon: <SparklesIcon className="w-10 h-10 text-purple-500"/>, title: "4. Генерация ответа", description: "GPT-4o создает черновик ответа на основе найденных фактов." },
        { icon: <ScaleIcon className="w-10 h-10 text-amber-500"/>, title: "5. Принятие решения", description: "Расчет `confident-score` для оценки уверенности AI в ответе." }
    ];

    const outcomes = [
        { icon: <PaperAirplaneIcon className="w-10 h-10 text-green-500 -rotate-45"/>, title: "Автоответ", description: "Если `score` высокий, ответ отправляется клиенту автоматически." },
        { icon: <PencilSquareIcon className="w-10 h-10 text-yellow-600"/>, title: "Черновик + Саммари", description: "Если `score` низкий, создается черновик и краткая сводка для оператора." }
    ];

    return (
        <div className="not-prose my-8">
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-8">Жизненный цикл обработки тикета</h3>
                <div className="flex flex-col items-center">
                    {/* Main Pipeline */}
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-2">
                        {stages.map((stage, index) => (
                            <React.Fragment key={stage.title}>
                                <div className="flex-1 flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm min-w-[160px]">
                                    {stage.icon}
                                    <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">{stage.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{stage.description}</p>
                                </div>
                                {index < stages.length - 1 && <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 self-center hidden md:block mx-2" />}
                                {index < stages.length - 1 && <ArrowDownCircleIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 self-center md:hidden my-2" />}
                            </React.Fragment>
                        ))}
                    </div>

                    <ArrowDownCircleIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 my-4" />

                    {/* Decision Outcomes */}
                    <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-8 w-full max-w-2xl">
                        {/* Connecting Lines */}
                        <div className="hidden md:block absolute top-[-2.5rem] left-1/2 h-10 w-px bg-gray-300 dark:bg-slate-600"></div>
                        <div className="hidden md:block absolute top-[-0.5rem] left-1/4 w-1/2 h-px bg-gray-300 dark:bg-slate-600"></div>
                        <div className="hidden md:block absolute top-[-0.5rem] left-1/4 w-px h-6 bg-gray-300 dark:bg-slate-600"></div>
                        <div className="hidden md:block absolute top-[-0.5rem] right-1/4 w-px h-6 bg-gray-300 dark:bg-slate-600"></div>

                        {outcomes.map(outcome => (
                             <div key={outcome.title} className="flex-1 flex flex-col items-center text-center p-4 rounded-lg bg-white dark:bg-slate-800 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300
                                ${outcome.title === 'Автоответ' ? 'border-green-300 dark:border-green-700' : 'border-yellow-300 dark:border-yellow-700'}"
                             >
                                {outcome.icon}
                                <h4 className={`font-semibold mt-3 ${outcome.title === 'Автоответ' ? 'text-green-800 dark:text-green-300' : 'text-yellow-800 dark:text-yellow-300'}`}>{outcome.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{outcome.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const GptAssistantDocumentationPage: React.FC = () => {
    const modules = [
        { name: '01_ErrorHandler.js', desc: 'Обработка ошибок.' },
        { name: '02_Utils.js', desc: 'Вспомогательные функции.' },
        { name: '03_GptApi.js', desc: 'Управление моделями.' },
        { name: '04_Omnidesk.js', desc: 'Взаимодействие с тикет-системой.' },
        { name: '05_Triggers.js', desc: 'Запуск задач.' },
        { name: '06_History.js', desc: 'Хранение истории.' },
        { name: '07_ReportGenerator.js', desc: 'Генерация отчётов.' },
        { name: '08_UrlValidator.js', desc: 'Проверка ссылок.' },
        { name: '10_AdvancedSpamFilter.js', desc: 'Фильтрация спама.' },
        { name: '12_PlaygroundTester.js', desc: 'Тестирование.' },
        { name: 'CONFIG.js', desc: 'Параметры системы.' }
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
                        title="Детальная механика обработки тикета"
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
                            <p>Когда поступает новый вопрос от клиента, он также векторизуется. Затем система производит <TooltipTerm definition="Поиск, который находит не точные совпадения по словам, а наиболее близкие по смыслу фрагменты текста, сравнивая их числовые векторы.">семантический поиск</TooltipTerm> по векторной базе, чтобы найти наиболее близкие по смыслу и релевантные «факты» (сохраненные Q&A пары), которые помогут ответить на вопрос.</p>
                        </InfoCard>
                        <InfoCard icon={<SparklesIcon className="w-8 h-8"/>} title="Шаг 3: Генерация (Generation)">
                            <p>Найденные «факты» вместе с исходным вопросом клиента передаются в модель <TooltipTerm definition="Модель от OpenAI, применяемая для генерации финального, стилистически выверенного ответа на основе подготовленного контекста.">GPT-4o</TooltipTerm>. Модель использует этот обогащенный контекст для генерации финального, точного и стилистически правильного ответа, который основан на данных, а не на догадках.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="modules" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ServerStackIcon className="w-8 h-8" />}
                        title="Модули и их ответственность"
                        subtitle="Архитектура системы построена на независимых, переиспользуемых модулях, каждый из которых выполняет свою четко определенную функцию."
                    />
                    <div className="overflow-x-auto mt-6 not-prose">
                        <table className="w-full text-left border-collapse">
                             <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Модуль</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Описание</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                {modules.map(module => (
                                    <tr key={module.name} className="border-b dark:border-slate-700">
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400">{module.name}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700">{module.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
