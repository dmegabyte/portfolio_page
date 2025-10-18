import React, { useState, ReactNode, useRef } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm, Modal, AnnotatedCodeBlock } from '../components/DocumentationUIComponents';
import { 
    ChatBubbleLeftRightIcon, BookOpenIcon, CpuChipIcon, MagnifyingGlassIcon,
    CircleStackIcon, DocumentTextIcon, ArrowDownCircleIcon, Cog6ToothIcon, LightBulbIcon,
    PuzzlePieceIcon, QuestionMarkCircleIcon, ArrowLongRightIcon, SparklesIcon, UserIcon, LinkIcon,
    ArrowDownTrayIcon, ArrowUpTrayIcon, EyeIcon, CubeTransparentIcon, BoltIcon,
    DocumentDuplicateIcon, CheckCircleIcon, ExclamationCircleIcon, ClockIcon, ArrowPathIcon, ArrowLongDownIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const TicketLifecycleDiagram: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);
    const diagramRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(diagramRef, { targetSelector: '.diagram-element' });

    const modalDescriptions = {
        clientRequest: {
            title: "Подробнее: Запрос клиента",
            content: (
                <div className="space-y-4 text-base">
                    <p>Это начальная точка всего процесса. Система получает обращение клиента из тикет-системы Omnidesk. На этом этапе запрос представляет собой "сырые" данные, часто в формате HTML, и может содержать форматирование, изображения и служебную информацию.</p>
                </div>
            )
        },
        aiAnalysis: {
            title: "Подробнее: AI-анализ (gpttunnel)",
            content: (
                 <div className="space-y-4 text-base">
                    <p>Центральный этап, где происходит вся интеллектуальная работа. Процесс состоит из нескольких шагов:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><strong>Очистка:</strong> Из запроса удаляется HTML-разметка и лишние артефакты.</li>
                        <li><strong>RAG-поиск:</strong> Очищенный вопрос векторизуется и сравнивается с базой знаний для поиска наиболее релевантных ответов.</li>
                        <li><strong>Генерация:</strong> Модель генерирует черновой ответ на основе найденной информации.</li>
                        <li><strong>Расчет score:</strong> Система оценивает свою уверенность в сгенерированном ответе по шкале от 0 до 100.</li>
                    </ol>
                </div>
            )
        },
        highScore: {
            title: "Подробнее: Score ≥ 80%",
            content: (
                 <div className="space-y-4 text-base">
                    <p>Если оценка уверенности (score) высока, это означает, что система нашла очень релевантный ответ в базе знаний и уверена в его качестве.</p>
                    <p><strong>Действие:</strong> Сгенерированный ответ автоматически передается в Google Sheet и помечается как **«Подсказка оператору»**. Оператор поддержки видит этот готовый черновик и может использовать его, сэкономив время на поиске информации.</p>
                </div>
            )
        },
        lowScore: {
            title: "Подробнее: Score < 80%",
            content: (
                 <div className="space-y-4 text-base">
                    <p>Низкая оценка уверенности означает, что система либо не нашла подходящего ответа в базе, либо считает сгенерированный ответ недостаточно точным. Это защитный механизм от отправки неверной информации.</p>
                    <p><strong>Действие:</strong> Ответ **не предлагается** оператору. Вместо этого сохраняется только подробный **JSON-лог** с "рассуждениями" модели. Тикет остается в очереди на ручную обработку оператором, который может проанализировать лог для улучшения базы знаний.</p>
                </div>
            )
        }
    };

    return (
        <>
            <figure ref={diagramRef} className="not-prose my-8" role="group" aria-labelledby="ticket-cycle-title">
                <figcaption id="ticket-cycle-title" className="sr-only">
                    Диаграмма жизненного цикла тикета, показывающая путь от запроса клиента до итогового решения.
                </figcaption>
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                        {/* Stage 1: Client Request */}
                        <button onClick={() => setModalContent(modalDescriptions.clientRequest)} className="diagram-element flex flex-col items-center w-48 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50" style={{ transitionDelay: '0ms' }}>
                            <UserIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500 mb-3"/>
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">Запрос клиента</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Поступает в Omnidesk</p>
                        </button>
                        
                        <ArrowLongRightIcon className="diagram-element w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" style={{ transitionDelay: '150ms' }} />
                        <ArrowLongDownIcon className="diagram-element w-10 h-10 text-gray-300 dark:text-slate-600 md:hidden" style={{ transitionDelay: '150ms' }} />

                        {/* Stage 2: AI Analysis */}
                        <button onClick={() => setModalContent(modalDescriptions.aiAnalysis)} className="diagram-element flex flex-col items-center w-64 p-4 rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50" style={{ transitionDelay: '300ms' }}>
                           <BoltIcon className="w-12 h-12 p-2 bg-indigo-100 dark:bg-slate-700 rounded-full text-indigo-500 mb-3"/>
                           <h3 className="font-semibold text-gray-800 dark:text-slate-200">AI-анализ (gpttunnel)</h3>
                           <p className="text-sm text-gray-500 dark:text-slate-400">Очистка → RAG-поиск → Генерация → Расчет <TooltipTerm definition="Оценка уверенности модели (от 0 до 100), что ответ соответствует вопросу.">score</TooltipTerm></p>
                        </button>

                        <ArrowLongRightIcon className="diagram-element w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" style={{ transitionDelay: '450ms' }} />
                        <ArrowLongDownIcon className="diagram-element w-10 h-10 text-gray-300 dark:text-slate-600 md:hidden" style={{ transitionDelay: '450ms' }} />
                        
                        {/* Stage 3: Decision Fork */}
                        <div className="flex flex-col items-stretch gap-4">
                            <button onClick={() => setModalContent(modalDescriptions.highScore)} className="diagram-element flex items-center gap-4 text-left p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 w-full md:w-80 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50" style={{ transitionDelay: '600ms' }}>
                                <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400 flex-shrink-0"/>
                                <div>
                                    <h3 className="font-semibold text-green-800 dark:text-green-300">Score ≥ 80%</h3>
                                    <p className="text-sm text-green-900 dark:text-green-200">Ответ передаётся в Google Sheet как **«Подсказка оператору»**.</p>
                                </div>
                            </button>
                            <button onClick={() => setModalContent(modalDescriptions.lowScore)} className="diagram-element flex items-center gap-4 text-left p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 w-full md:w-80 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50" style={{ transitionDelay: '750ms' }}>
                                <ExclamationCircleIcon className="w-10 h-10 text-amber-600 dark:text-amber-400 flex-shrink-0"/>
                                <div>
                                    <h3 className="font-semibold text-amber-800 dark:text-amber-300">Score &lt; 80%</h3>
                                    <p className="text-sm text-amber-900 dark:text-amber-200">Ответ **не отправляется**, сохраняется только JSON-лог. Тикет остается на операторе.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </figure>
            {modalContent && (
                <Modal
                    isOpen={!!modalContent}
                    onClose={() => setModalContent(null)}
                    title={modalContent.title}
                >
                    {modalContent.content}
                </Modal>
            )}
        </>
    );
};

const GptAssistantDocumentationPage: React.FC = () => {
    const [modalData, setModalData] = useState<any>(null);

    const transformationDetails = {
        step1: {
            title: "Детали трансформации: Шаг 1: Подготовка данных",
            input: {
                title: "Вход: Сообщение клиента (Raw HTML)",
                code: `<img alt="pixel" src="..." />
Добрый день!<br /><br />Прошу Вас помощи для подключения сайта к яндекс вебмастеру.<br /><br />В корневой папке сайта создайте файл с именем yandex_9aaf9dd87bc62c36.html...
<div>
    <h2 style="font-size:16px;">Системная информация</h2>
    <hr />
    <span style="color:#444;">form: </span>
    <span>help-ru</span>
    ...
</div>`
            },
            output: {
                title: "Выход: Столбцы `question`, `subject`...",
                code: `question: "<img alt=\\"pixel\\" src=...>"
subject: "Помощь с сайтом"
case_link: "..."`
            }
        },
        step2: {
            title: "Детали трансформации: Шаг 2: AI-анализ",
            input: {
                title: "Вход: Столбец `clean_question`",
                code: "Добрый день! Прошу Вас помощи для подключения сайта к яндекс вебмастеру..."
            },
            output: {
                title: "Выход: Столбцы `gpt_response`, `score`",
                code: `gpt_response: "Чтобы подтвердить права на сайт в Яндекс.Вебмастере, вам нужно..."
score: 91`
            }
        },
        step3: {
            title: "Детали трансформации: Шаг 3: Результат и Действие",
            input: {
                title: "Вход: Столбцы `gpt_response`, `score`",
                code: `gpt_response: "Чтобы подтвердить права на сайт в Яндекс.Вебмастере, вам нужно..."
score: 91`
            },
            output: {
                title: "Выход: Столбцы `status`, `JSON`",
                code: `status: "Подсказка"
JSON: "{ \\"question\\": \\"...\\", \\"candidates\\": [...] }"`
            }
        },
    };

    const openModal = (data: any) => {
        setModalData(data);
    };
    
    const ragFileContent = [
        { code: '<BEGIN_BLOCK>', annotation: 'Начало уникального блока информации. Служит разделителем для парсера.' },
        { code: '<Q> Как восстановить пароль?', annotation: 'Канонический, очищенный вопрос, описывающий суть проблемы. Именно этот текст будет векторизован для поиска.', isHighlighted: true },
        { code: '<A> Чтобы восстановить доступ, перейдите по ссылке...', annotation: 'Эталонный, исчерпывающий и готовый к использованию ответ на вопрос.', isHighlighted: true },
        { code: '<CATEGORY> Авторизация', annotation: 'Категория верхнего уровня для группировки и фильтрации.' },
        { code: '<SUBCATEGORY> Восстановление пароля', annotation: 'Уточняющая подкатегория для большей детализации.' },
        { code: '<KEYWORDS> пароль; доступ; сброс;', annotation: 'Набор ключевых слов в виде списка, разделенного точкой с запятой. Такая структура обеспечивает надежный парсинг и позволяет улучшить поиск по ключевым словам в дополнение к семантическому.' },
        { code: '<END_BLOCK>', annotation: 'Конец информационного блока.' },
    ];

    const jsonLogContent = [
        { code: '{', annotation: 'Начало JSON-объекта, представляющего полный лог рассуждений модели.' },
        { code: '  "question": "как восстановить пароль?",', annotation: 'Очищенный и нормализованный запрос клиента, который был подан на вход RAG-системы.', isHighlighted: true },
        { code: '  "retrieved_candidates": [', annotation: 'Массив фрагментов-кандидатов, которые RAG-система нашла в базе знаний как потенциально релевантные.' },
        { code: '    {"id": 23, "category": "Авторизация", "similarity": 0.91},', annotation: 'Первый кандидат с очень высокой степенью схожести (91%).' },
        { code: '    {"id": 57, "category": "Аккаунт", "similarity": 0.77}', annotation: 'Второй, менее релевантный кандидат.' },
        { code: '  ],', annotation: 'Конец массива кандидатов.' },
        { code: '  "selected": {"id": 23, "reason": "наибольшее совпадение"},', annotation: 'Объект, указывающий на фрагмент-«победитель», который модель выбрала для генерации ответа, и причина выбора.', isHighlighted: true },
        { code: '  "model_score": 86,', annotation: 'Итоговая оценка уверенности модели (от 0 до 100), что сгенерированный ответ является точным и полным на основе выбранного кандидата.', isHighlighted: true },
        { code: '  "final_response": "Чтобы восстановить пароль, нажмите..."', annotation: 'Финальный, готовый к использованию черновой ответ, который был предложен оператору поддержки в качестве подсказки.' },
        { code: '}', annotation: 'Конец JSON-объекта.' },
    ];
    


    return (
    <DocumentationPageLayout title="GPT-ассистент с RAG">
      <div className="space-y-16">
        
        <section id="concept" className="scroll-mt-24">
            <SectionHeader 
                icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
                title="1. Концепция и Главная идея"
                subtitle="Создание интеллектуального ассистента, который отвечает на вопросы, основываясь на актуальной внутренней базе знаний, а не только на общих данных, заложенных в модель."
            />
             <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Принцип №7)">
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li><b>Проблема:</b> Стандартные <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных.">LLM</TooltipTerm> не знают специфической информации о вашей компании и продуктах.</li>
                    <li><b>Решение:</b> Технология <strong>Retrieval-Augmented Generation (RAG)</strong>. Она «подключает» к <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных.">LLM</TooltipTerm> внешнюю базу знаний.</li>
                    <li><b>Результат:</b> Ассистент дает точные, контекстуальные ответы, снижая нагрузку на службу поддержки.</li>
                    <li><b>Главный принцип:</b> Ассистент — это не замена, а **цифровой напарник** оператора, который готовит черновики ответов, экономя время, но оставляя контроль за человеком.</li>
                </ul>
            </InfoCard>
        </section>

        <section id="ticket-lifecycle" className="scroll-mt-24">
            <SectionHeader 
                icon={<ArrowPathIcon className="w-8 h-8" />}
                title="2. Единый цикл обработки тикета"
                subtitle="Пошаговый процесс: от получения сырого запроса до предложения готового ответа оператору."
            />
            <TicketLifecycleDiagram />
        </section>

        <section id="gpttunnel-mechanics" className="scroll-mt-24">
            <SectionHeader 
                icon={<Cog6ToothIcon className="w-8 h-8" />}
                title="3. Под капотом: Механика gpttunnel"
                subtitle="Центральный узел системы, который выполняет всю основную интеллектуальную работу: от векторизации до генерации ответа."
            />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Логика внутренней обработки</h3>
            <div className="not-prose my-8">
                 <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
                    {/* Stage 1 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <MagnifyingGlassIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 1: Подготовка и Поиск</h4>
                        <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300">
                            <li>Получение запроса</li>
                            <li>Векторизация запроса</li>
                            <li>Поиск в Vector DB</li>
                        </ol>
                    </div>

                    <div className="flex items-center justify-center">
                        <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 hidden md:block" />
                    </div>

                    {/* Stage 2 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <CpuChipIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 2: Анализ и Генерация</h4>
                        <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300" start={4}>
                            <li>Анализ кандидатов</li>
                            <li>Сборка «контекстного пакета»</li>
                            <li>Запрос к LLM</li>
                        </ol>
                    </div>

                     <div className="flex items-center justify-center">
                        <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 hidden md:block" />
                    </div>

                    {/* Stage 3 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <DocumentDuplicateIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 3: Формирование и Возврат</h4>
                         <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300" start={7}>
                            <li>Получение результата</li>
                            <li>Формирование лога</li>
                            <li>Возврат результата</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <section id="model-evolution" className="scroll-mt-24">
            <SectionHeader 
                icon={<SparklesIcon className="w-8 h-8" />}
                title="4. Эволюция архитектуры: от каскада к рассуждению"
                subtitle="Как система перешла от сложной трехуровневой схемы к одной, более мощной и предсказуемой модели."
            />
            <div className="flex flex-col items-center gap-6 not-prose">
                {/* Stage 1: Early Architecture */}
                <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-amber-500/30 dark:border-amber-500/40 shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                            <ExclamationCircleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span>Ранняя архитектура (Каскад моделей)</span>
                    </h3>
                    <p className="mt-3 text-base text-slate-700 dark:text-slate-300">Изначально система использовала связку из трёх моделей для баланса скорости и качества:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-4 text-base pl-4">
                        <li><b>Level 1 (Gemini 2.5 Flash):</b> Быстрый RAG-поиск по внутренней базе.</li>
                        <li><b>Level 2 (GPT-4o):</b> Поиск уточнений во внешних источниках (интернет, внутренняя база знаний).</li>
                        <li><b>Level 3 (GPT-4.0 mini):</b> Финальная сборка и стилизация ответа.</li>
                    </ol>
                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-200">Недостаток:</strong> С ростом RAG-базы второй уровень стал избыточным, а последовательные вызовы замедляли процесс.</p>
                    </div>
                </div>
                
                {/* Arrow Connector */}
                <div className="flex justify-center my-2">
                    <ArrowLongDownIcon className="w-10 h-10 text-gray-400 dark:text-slate-500" />
                </div>

                {/* Stage 2: Current Architecture */}
                <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-green-500/40 dark:border-green-500/50 shadow-lg">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-3">
                         <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span>Текущая архитектура (Рассуждающая модель)</span>
                    </h3>
                    <p className="mt-3 text-base text-slate-700 dark:text-slate-300">Архитектура была упрощена до одной, более мощной модели — <strong>Gemini 2.5 Pro</strong>. Она не просто генерирует ответ, а выполняет всю цепочку рассуждений:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-4 text-base pl-4">
                        <li>Анализирует вопрос.</li>
                        <li>Находит несколько релевантных блоков в RAG-базе.</li>
                        <li>Сравнивает их и выбирает лучший, аргументируя свой выбор.</li>
                    </ol>
                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-slate-700">
                         <p className="text-sm text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-200">Преимущества:</strong> Система стала <strong>быстрее</strong>, <strong>точнее</strong> и <strong>предсказуемее</strong>, так как вся цепочка рассуждений видна в логах.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="rag-file" className="scroll-mt-24">
            <SectionHeader 
                icon={<BookOpenIcon className="w-8 h-8" />}
                title="5. RAG-файл: Библиотека ассистента"
                subtitle="Это «библиотека» знаний системы. Структурированный текстовый файл, где каждый блок содержит вопрос, ответ и метаданные, которые преобразуются в векторы для семантического поиска."
            />
            <figure className="my-8 not-prose" role="group" aria-labelledby="rag-json-diagram-title">
                <figcaption id="rag-json-diagram-title" className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">
                    Взаимосвязь RAG-файла и JSON-лога
                </figcaption>
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-6 text-center">
                        
                        {/* 1. Client Request */}
                        <div className="flex flex-col items-center w-40">
                            <UserIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500 mb-3"/>
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">Запрос клиента</h3>
                        </div>
                        
                        <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                        <ArrowLongDownIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 md:hidden" />

                        {/* 2. Processing Core */}
                        <div className="flex flex-col items-center w-52 p-4 rounded-lg bg-white dark:bg-slate-800 border-2 border-indigo-500 dark:border-indigo-400 shadow-lg">
                            <CpuChipIcon className="w-12 h-12 text-indigo-500 dark:text-indigo-400 mb-3"/>
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">Механизм RAG-поиска</h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400">(gpttunnel)</p>
                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-700 w-full flex items-center justify-center gap-2">
                                <ArrowDownCircleIcon className="w-5 h-5 text-gray-400 dark:text-slate-500"/>
                                <p className="text-xs text-gray-500 dark:text-slate-400">Использует <strong className="text-gray-600 dark:text-slate-300">RAG-файл</strong> как источник</p>
                            </div>
                        </div>

                        <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                        <ArrowLongDownIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 md:hidden" />

                        {/* 3. Result */}
                        <div className="flex flex-col items-center w-40">
                            <DocumentTextIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-green-600 dark:text-green-400 mb-3"/>
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">JSON-лог</h3>
                             <p className="text-xs text-gray-500 dark:text-slate-400">(Дневник)</p>
                        </div>
                    </div>
                </div>
            </figure>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-0">Анатомия RAG-файла</h3>
                <p className="mt-2">Каждый блок в RAG-файле — это атомарная единица знаний, структурированная с помощью специальных тегов. Такая структура позволяет машине точно понимать назначение каждой части информации. Кликните на любую строку в примере ниже, чтобы увидеть подробное описание каждого тега.</p>
                <AnnotatedCodeBlock 
                    title="Пример записи в RAG-файле"
                    annotationTitle="Описание тега"
                    items={ragFileContent} 
                />
            </div>
        </section>

        <section id="json-logs" className="scroll-mt-24">
             <SectionHeader 
                icon={<DocumentDuplicateIcon className="w-8 h-8" />}
                title="6. JSON-логи: Дневник ассистента"
                subtitle="Это «дневник рассуждений» ассистента. Цифровой след, который показывает, как модель искала ответ, каких кандидатов рассматривала и почему сделала свой выбор. Ключевой инструмент для отладки и улучшения базы знаний."
            />
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-0">Анатомия JSON-лога</h3>
                <p className="mt-2">Каждый JSON-лог — это детальный отчет о том, как модель пришла к своему выводу. Он позволяет точно отследить, какие данные из базы знаний были использованы и почему. Кликните на любую строку в примере ниже, чтобы увидеть подробное описание каждого поля.</p>
                <AnnotatedCodeBlock 
                    title="Пример реального фрагмента JSON-лога"
                    annotationTitle="Описание поля"
                    items={jsonLogContent} 
                />
            </div>
        </section>

      </div>
      {modalData && (
          <Modal isOpen={!!modalData} onClose={() => setModalData(null)} title={modalData.title}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Column */}
                  <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                          <ArrowDownTrayIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                          {modalData.input.title}
                      </h4>
                      <div className="mt-2 relative">
                          <div className="relative overflow-hidden">
                              <pre className="text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded-lg custom-scrollbar overflow-fade max-h-80 overflow-y-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                  <code>{modalData.input.code}</code>
                              </pre>
                          </div>
                      </div>
                  </div>
                  {/* Output Column */}
                  <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                          <ArrowUpTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                          {modalData.output.title}
                      </h4>
                       <div className="mt-2 relative">
                          <div className="relative overflow-hidden">
                              <pre className="text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded-lg custom-scrollbar overflow-fade max-h-80 overflow-y-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                  <code>{modalData.output.code}</code>
                              </pre>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal>
      )}
    </DocumentationPageLayout>
  );
};

export default GptAssistantDocumentationPage;