import React, { useState, ReactNode } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm, CollapsibleSection, Modal } from '../components/DocumentationUIComponents';
import { 
    CubeTransparentIcon, CodeBracketIcon, BoltIcon, CommandLineIcon, QuestionMarkCircleIcon, 
    TableCellsIcon, DocumentTextIcon, ArchiveBoxIcon, ExclamationTriangleIcon, PlayIcon, 
    UserIcon, ArrowsRightLeftIcon, SparklesIcon, ArrowLongRightIcon, LightBulbIcon, WrenchScrewdriverIcon, ShieldExclamationIcon, PuzzlePieceIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';


const InteractiveGeneratorWorkflowDiagram: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);

    const modalDescriptions = {
        request: {
            title: "Этап 1: Запрос пользователя",
            content: (
                <div className="space-y-4 text-base">
                    <p>Это отправная точка всего процесса. Система принимает запрос в двух основных форматах:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Текстовый запрос на естественном языке:</strong> Пользователь описывает задачу своими словами. Например: "Создай три карточки товара с тенью и закругленными углами" или "Для кнопки .submit сделай фон красным при наведении".</li>
                        <li><strong>Структурированный JSON-запрос:</strong> Используется для точного извлечения данных из "Корпуса контекста". Такой запрос должен содержать ключи `module` и `template`.</li>
                    </ul>
                    <p>Качество и точность этого первоначального запроса напрямую влияют на предсказуемость и релевантность конечного результата.</p>
                </div>
            )
        },
        router: {
            title: "Этап 2: Роутер",
            content: (
                <div className="space-y-4 text-base">
                    <p>Роутер — это "мозг" или диспетчер системы. Его главная задача — проанализировать входящий запрос и направить его на обработку наиболее подходящему специализированному генератору. Он не генерирует код, а только принимает решение.</p>
                    <p>Роутинг происходит по строгому алгоритму с четкими приоритетами:</p>
                     <ol className="list-decimal list-inside space-y-2">
                        <li><strong>JSON-запрос (Высший приоритет):</strong> Если запрос имеет структуру JSON, он немедленно направляется в «Парсер системных кодов».</li>
                        <li><strong>CSS-запрос:</strong> Если запрос содержит CSS-селектор и ключевые слова, связанные со стилями («цвет», «тень»), он передается в «CSS-режим».</li>
                        <li><strong>HTML+JS (По умолчанию):</strong> Если ни одно из вышеуказанных условий не выполнено, запрос по умолчанию отправляется в «HTML + JS генератор».</li>
                    </ol>
                </div>
            )
        },
        engines: {
            title: "Этап 3: Движки генерации",
            content: (
                <div className="space-y-4 text-base">
                    <p>Это "рабочие лошадки" системы. В зависимости от решения Роутера, запрос обрабатывается одним из трех специализированных движков:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>CSS-режим:</strong> Генерирует исключительно CSS-код для изменения внешнего вида существующих элементов.</li>
                        <li><strong>HTML + JS режим:</strong> Создает как HTML-структуру, так и JavaScript для интерактивного поведения. Это основной режим для создания новых компонентов.</li>
                        <li><strong>Парсер системных кодов (JSON):</strong> Не генерирует новый код, а ищет и извлекает предопределенные данные (системные коды) из внутренней базы знаний.</li>
                    </ul>
                    <p>Каждый движок оптимизирован для своей конкретной задачи, что обеспечивает высокое качество и релевантнность результата.</p>
                </div>
            )
        },
        post_processing: {
            title: "Этап 4: Пост-обработка",
            content: (
                <div className="space-y-4 text-base">
                    <p>Финальный «фильтр чистоты» и гарант качества. Этот компонент берет сырой ответ от AI-модели и применяет к нему ряд очищающих фильтров перед тем, как вернуть результат пользователю.</p>
                     <p>Ключевые задачи пост-обработки:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Удаление "болтовни":</strong> Вырезает фразы вроде «Вот ваш код:» или «Конечно, я могу помочь».</li>
                        <li><strong>Очистка от служебной информации:</strong> Стирает любые упоминания внутренних файловых путей или другой конфиденциальной информации.</li>
                        <li><strong>Нормализация кода:</strong> Приводит в порядок форматирование, обеспечивая единообразный и читаемый вид.</li>
                    </ul>
                     <p>Благодаря этому этапу, на выходе всегда получается только чистый, готовый к использованию код.</p>
                </div>
            )
        },
        result: {
            title: "Этап 5: Готовый код",
            content: (
                <div className="space-y-4 text-base">
                    <p>Это конечный продукт всего пайплайна — чистый, отформатированный и готовый к использованию фрагмент кода.</p>
                    <p>В зависимости от изначального запроса, результат может быть:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Фрагмент <strong>CSS</strong> для стилизации.</li>
                        <li>Блок <strong>HTML</strong> с встроенным тегом <strong>&lt;script&gt;</strong> для нового компонента.</li>
                        <li>Структурированный <strong>JSON</strong> с системными кодами и их описаниями.</li>
                    </ul>
                    <p>Этот результат можно сразу же скопировать и вставить в проект без необходимости ручной доработки или очистки.</p>
                </div>
            )
        },
    };

    const stages = [
        { id: 'request', icon: <UserIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>, title: "Запрос пользователя", description: "Текст или JSON" },
        { id: 'router', icon: <ArrowsRightLeftIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>, title: "Роутер", description: "Определяет режим" },
        { id: 'engines', icon: <CodeBracketIcon className="w-12 h-12 p-2 bg-gray-100 dark:bg-slate-700 border dark:border-slate-600 rounded-full text-indigo-500"/>, title: "Движки генерации", description: "CSS, HTML+JS, JSON" },
        { id: 'post_processing', icon: <SparklesIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>, title: "Пост-обработка", description: "Очистка кода" },
        { id: 'result', icon: <DocumentTextIcon className="w-12 h-12 p-2 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-full text-green-600 dark:text-green-400"/>, title: "Готовый код", description: "Результат для вставки" },
    ];
    
    return (
        <div className="not-prose my-8">
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                    {stages.map((stage, index) => (
                        <React.Fragment key={stage.id}>
                            <button 
                                onClick={() => setModalContent(modalDescriptions[stage.id as keyof typeof modalDescriptions])}
                                className="flex flex-col items-center w-48 p-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors duration-200"
                            >
                                <div className="mb-3">{stage.icon}</div>
                                <h3 className={`font-semibold mt-2 ${stage.id === 'result' ? 'text-green-800 dark:text-green-300' : 'text-gray-800 dark:text-slate-200'}`}>{stage.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{stage.description}</p>
                            </button>
                            {index < stages.length - 1 && (
                                <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block my-4 md:my-0" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
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
    );
};


const InterfaceGeneratorDocumentationPage: React.FC = () => {
  return (
    <DocumentationPageLayout title="AI-генератор UI">
        <div className="space-y-16">
            
            <section id="concept">
                <SectionHeader 
                    icon={<CubeTransparentIcon className="w-8 h-8" />}
                    title="1. Концепция и ключевые возможности"
                    subtitle="Описание промпт‑системы, которая по текстовому запросу автоматически генерирует готовый к использованию код, ускоряя разработку и прототипирование."
                />
                <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                    <ul className="list-disc list-inside space-y-2 text-base">
                        <li><b>Многорежимная генерация:</b> Система автоматически определяет, что вам нужно — стили (CSS), структуру и логику (HTML+JS) или данные из базы знаний (JSON), — и выбирает оптимальный режим работы.</li>
                        <li><b>Ускорение рутины:</b> Автоматизирует написание boilerplate-кода, позволяя разработчику сфокусироваться на более сложных задачах.</li>
                        <li><b>Безопасность и чистота:</b> Встроенная пост-обработка гарантирует, что на выходе вы получите только чистый, готовый к использованию код без служебной информации.</li>
                        <li><b>Гибкость:</b> Поддерживает как простые текстовые запросы на естественном языке, так и структурированные JSON-запросы для извлечения данных.</li>
                    </ul>
                </InfoCard>
                 <div className="mt-12">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="Проблема и Решение"
                        subtitle="Как AI-генератор решает повседневные задачи разработчика."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                        {/* Before Card */}
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-full">
                            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">До: Ручной процесс</h4>
                            <p className="mt-2 text-base text-gray-600 dark:text-slate-400">Разработчик тратит значительное время на повторяющиеся задачи, которые отвлекают от основной бизнес-логики.</p>
                            <ul className="list-decimal list-inside space-y-2 mt-4 text-base text-gray-700 dark:text-slate-300">
                                <li>Написание стандартной HTML-разметки для компонентов (карточки, кнопки, формы).</li>
                                <li>Ручной подбор и применение десятков CSS-классов для стилизации.</li>
                                <li>Создание boilerplate-кода на JavaScript для базовой интерактивности (например, аккордеоны, табы).</li>
                                <li>Многократная отладка и мелкие правки для достижения нужного вида и поведения.</li>
                            </ul>
                        </div>
                        
                        {/* After Card */}
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-green-300 dark:border-green-700 h-full">
                            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">После: Делегирование AI-ассистенту</h4>
                            <p className="mt-2 text-base text-gray-600 dark:text-slate-400">AI-генератор берет на себя рутину, позволяя разработчику сфокусироваться на высокоуровневых задачах.</p>
                             <ul className="list-decimal list-inside space-y-2 mt-4 text-base text-gray-700 dark:text-slate-300">
                                <li>Описание желаемого результата на естественном, человеческом языке.</li>
                                <li>Мгновенное получение готового, чистого и рабочего фрагмента кода.</li>
                                <li>Фокус смещается на архитектуру, интеграцию и сложную бизнес-логику.</li>
                                <li>Процесс прототипирования и создания UI ускоряется в несколько раз.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="problem-solution">
                <SectionHeader 
                    icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                    title="2. Проблема и Решение: Зачем это нужно?"
                    subtitle="Как AI-генератор решает повседневные задачи разработчика."
                />
                <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                    {/* Problem Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-red-500/20 dark:border-red-500/30 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <ExclamationTriangleIcon className="w-8 h-8 text-red-500 dark:text-red-400" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0">Проблема: «Тысяча мелких действий»</h3>
                        </div>
                        <div className="text-base text-slate-700 dark:text-slate-300 space-y-4">
                           <p>Работа в конструкторе полна рутины: изменить фон, выровнять текст, поправить стили. Каждое такое действие — это поиск элемента, клики по меню и проверка результата.</p>
                           <p>Эти десятки мелких правок отнимают время и отвлекают от главной цели — создания контента.</p>
                        </div>
                    </div>
                    
                    {/* Solution Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-green-500/20 dark:border-green-500/30 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <CheckBadgeIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0">Решение: «Делегирование рутины»</h3>
                        </div>
                        <div className="text-base text-slate-700 dark:text-slate-300 space-y-4">
                            <p>AI-генератор — это ваш личный ассистент. Он понимает обычные текстовые команды и мгновенно превращает их в готовый код.</p>
                            <p>Просто скажите ему, что нужно: «Сделай карточки товаров с тенью и закруглением».</p>
                            <p>Система сама выберет нужный режим работы:</p>
                            
                            <ul className="space-y-3 pl-2">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-4 h-4 mt-1.5 mr-3 bg-blue-500 rounded-sm border border-blue-600"></div>
                                    <div><strong>CSS-режим</strong> — для изменения внешнего вида.</div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-4 h-4 mt-1.5 mr-3 bg-green-500 rounded-sm border border-green-600"></div>
                                    <div><strong>HTML + JS-режим</strong> — для добавления новых элементов.</div>
                                </li>
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 w-4 h-4 mt-1.5 mr-3 bg-yellow-500 rounded-sm border border-yellow-600"></div>
                                    <div><strong>System Codes-режим</strong> — для подстановки данных.</div>
                                </li>
                            </ul>

                            <p>Вы получаете чистый код, который можно сразу использовать. Вы делегируете рутину и фокусируетесь на главном. Генератор не заменяет вас, а ускоряет вашу работу.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="workflow-diagram">
                <SectionHeader 
                    icon={<PlayIcon className="w-8 h-8" />}
                    title="3. Визуальная схема работы"
                    subtitle="Пошаговый процесс обработки запроса от получения до финального результата."
                />
                <InteractiveGeneratorWorkflowDiagram />
            </section>
            
            <section id="architecture">
                <SectionHeader 
                    icon={<PuzzlePieceIcon className="w-8 h-8" />}
                    title="4. Архитектурная философия и компоненты"
                    subtitle="Как устроена система «под капотом» и какие принципы лежат в её основе."
                />
                 <CollapsibleSection title="Ключевые архитектурные принципы" defaultOpen>
                    <ul className="list-disc list-inside space-y-3 mt-4">
                        <li><strong>Stateless (Отсутствие состояния):</strong> Каждый запрос обрабатывается независимо. Система не помнит предыдущие взаимодействия, что делает ее предсказуемой и легко масштабируемой.</li>
                        <li><strong>Фокус на клиентской части:</strong> Генератор намеренно избегает создания серверной логики (PHP, Python, Node.js). Его задача — производить код для фронтенда. Места, где требуется бэкенд-логика, явно помечаются комментарием `// TODO`, передавая ответственность разработчику.</li>
                        <li><strong>Детерминированный роутинг:</strong> Решение о выборе режима работы принимается на основе четких правил (см. компонент "Роутер"), а не случайным образом, что обеспечивает стабильность и предсказуемость результата.</li>
                    </ul>
                </CollapsibleSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose mt-6">
                    <InfoCard icon={<ArrowsRightLeftIcon className="w-6 h-6"/>} title="Роутер">
                        <div className="space-y-3">
                            <p>Это «мозг» или диспетчер системы. Его главная задача — проанализировать входящий запрос и направить его на обработку наиболее подходящему специализированному генератору.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Роутер работает по строгому, детерминированному алгоритму с четкими приоритетами:</p>
                            <ol className="list-decimal list-inside space-y-1 text-sm">
                                <li><strong>JSON-запрос (Высший приоритет):</strong> Если запрос имеет структуру JSON и содержит обязательные ключи `module` и `template`, он немедленно направляется в «Парсер системных кодов».</li>
                                <li><strong>CSS-запрос:</strong> Если запрос является обычным текстом и содержит комбинацию CSS-селектора (например, `.card h2`) и ключевых слов, связанных со стилями («цвет», «тень», «анимация»), он передается в «CSS-режим».</li>
                                <li><strong>HTML+JS (По умолчанию):</strong> Если ни одно из вышеуказанных условий не выполнено, запрос по умолчанию отправляется в «HTML + JS генератор».</li>
                            </ol>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                            <p>Для предсказуемого результата помогайте роутеру, формулируя запросы четко. Если нужны стили — укажите селектор, если нужны данные — используйте JSON.</p>
                        </div>
                    </InfoCard>
                    <InfoCard icon={<SparklesIcon className="w-6 h-6"/>} title="Пост‑обработка">
                         <div className="space-y-3">
                            <p>Финальный «фильтр чистоты» и гарант качества. Этот компонент отвечает за очистку и нормализацию сырого ответа от AI-модели перед тем, как он будет возвращен пользователю.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Применяет последовательность фильтров для удаления всех посторонних артефактов:</p>
                             <ul className="list-disc list-inside space-y-1 text-sm">
                                <li><strong>Удаление «болтовни»:</strong> Вырезает фразы вроде «Вот ваш код:» или «Конечно, я могу помочь».</li>
                                <li><strong>Очистка от служебной информации:</strong> Стирает любые упоминания внутренних файловых путей, которые модель могла случайно включить в ответ.</li>
                                <li><strong>Нормализация кода:</strong> Приводит в порядок форматирование, обеспечивая единообразный и читаемый вид.</li>
                            </ul>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                            <p>Не пытайтесь в промпте заставить модель быть «молчаливой». Положитесь на этот компонент, который гарантирует, что на выходе вы получите только чистый, готовый к использованию код.</p>
                        </div>
                    </InfoCard>
                     <InfoCard icon={<CodeBracketIcon className="w-6 h-6"/>} title="CSS‑режим">
                        <div className="space-y-3">
                            <p>Специализированный генератор, который работает как «художник по стилям». Его единственная задача — изменять внешний вид существующих элементов, не затрагивая их структуру.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Этот режим ограничен генерацией исключительно кода <TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm>. Он не будет создавать <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> или JavaScript.</p>
                            <p>Если селектор в запросе пользователя указан нечетко, система не будет гадать, а задаст один уточняющий вопрос. Например: «Пожалуйста, укажите селектор для кнопки, которую нужно стилизовать».</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                             <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Всегда указывайте точный CSS-селектор.</li>
                                <li>Используйте его для тонкой настройки стилей, а не для создания новых блоков с нуля.</li>
                            </ul>
                        </div>
                    </InfoCard>
                     <InfoCard icon={<CodeBracketIcon className="w-6 h-6"/>} title="HTML + JS генератор">
                         <div className="space-y-3">
                            <p>Основной «строитель» интерфейсов. Этот режим создает как структуру (скелет) компонента, так и его интерактивное поведение.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Генерирует семантически корректный <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> и, при необходимости, дополняет его чистым JavaScript (vanilla JS) без каких-либо фреймворков. Это обеспечивает максимальную совместимость. Генератор намеренно избегает создания серверной логики; вместо этого он оставляет комментарии-заглушки `// TODO` в тех местах, где требуется участие бэкенд-разработчика.</p>
                             <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                             <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Четко описывайте и структуру, и поведение.</li>
                                <li>Запрашивайте стилизацию (например, "используй темную тему").</li>
                                <li>Не ожидайте готового серверного кода — система сфокусирована на фронтенде.</li>
                            </ul>
                        </div>
                    </InfoCard>
                     <InfoCard icon={<CodeBracketIcon className="w-6 h-6"/>} title="Парсер системных кодов">
                        <div className="space-y-3">
                            <p>Это не генератор, а скорее поисковый движок по базе знаний. Его задача — извлекать предопределенные фрагменты данных по точному запросу.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Работает исключительно со структурированными <TooltipTerm definition="Текстовый формат обмена данными, основанный на синтаксисе JavaScript. Он легко читается людьми и легко парсится машинами.">JSON</TooltipTerm> запросами, которые должны содержать ключи `module` и `template`. Парсер использует эти ключи для фильтрации «Корпуса контекста», находит строки с токенами вида `$CODE$` и возвращает их вместе с описаниями в строго определенном JSON-формате.</p>
                             <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                            <p>Используйте этот режим для динамической подстановки контента в шаблоны, а не для создания нового кода. Всегда передавайте оба ключа для точного поиска.</p>
                        </div>
                    </InfoCard>
                     <InfoCard icon={<ArchiveBoxIcon className="w-6 h-6"/>} title="Корпус контекста">
                        <div className="space-y-3">
                            <p>Это «библиотека» или база знаний для «Парсера системных кодов». Представляет собой набор текстовых файлов, которые служат единым источником правды для системных данных.</p>
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Принцип работы:</h4>
                            <p>Каждая строка в корпусе имеет строгий, неизменный формат: <code>&lt;Module&gt;|&lt;Template&gt;|&lt;$SYSTEM_CODE$&gt;|&lt;Description&gt;;;</code>. Разделитель `|` и терминатор `;;` позволяют парсеру быстро и надежно читать данные без необходимости в сложной базе данных. Эта простота обеспечивает высокую производительность и легкость в обслуживании.</p>
                             <h4 className="font-bold text-slate-800 dark:text-slate-200 !mt-4">Лучшие практики:</h4>
                            <p>При добавлении новых данных в корпус, неукоснительно соблюдайте установленный формат. Думайте об этом как о простом словаре (key-value), где ключ — это пара `Module` и `Template`.</p>
                        </div>
                    </InfoCard>
                </div>
            </section>

             <section id="modes">
                <SectionHeader 
                    icon={<QuestionMarkCircleIcon className="w-8 h-8" />}
                    title="5. Детальное руководство по режимам работы"
                    subtitle="Какой режим выбрать для вашей задачи, как правильно составить запрос и какие результаты ожидать."
                />
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Режим 1: Стилизация (CSS)</h3>
                        <p className="mt-2 text-base">Используйте этот режим, когда вам нужно изменить внешний вид существующего элемента, не меняя его HTML-структуру.</p>
                        <h4 className="font-semibold text-lg mt-4">Лучшие практики для запросов:</h4>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-base">
                            <li><strong>Всегда указывайте селектор:</strong> Четко определите, к какому элементу применяются стили (например, `.btn-primary`, `#header nav`, `div.card > h2`).</li>
                            <li><strong>Будьте конкретны:</strong> Вместо "сделай кнопку красивой" используйте "сделай кнопку синей (#3b82f6) с белым текстом и скруглением 8px".</li>
                            <li><strong>Описывайте состояния:</strong> Не забывайте про состояния `:hover`, `:focus` для интерактивных элементов.</li>
                        </ul>
                        <CodeBlockWithCopy title="Пример для CSS-режима" code={`Вход: "Для ссылок в футере (footer a) убери подчеркивание, а при наведении делай его синим."
Выход (CSS):
footer a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}
footer a:hover {
  text-decoration: underline;
  color: #3b82f6; /* blue-500 */
}`} />
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Режим 2: Создание интерфейса (HTML + JS)</h3>
                        <p className="mt-2 text-base">Основной режим для генерации новых компонентов, блоков или целых страниц.</p>
                        <h4 className="font-semibold text-lg mt-4">Лучшие практики для запросов:</h4>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-base">
                            <li><strong>Описывайте структуру:</strong> Перечисляйте элементы, которые должны быть внутри компонента ("карточка с картинкой сверху, заголовком и текстом под ней").</li>
                            <li><strong>Описывайте интерактивность:</strong> Если требуется поведение, опишите его ("при клике на заголовок должен открываться/скрываться текст под ним").</li>
                             <li><strong>Запрашивайте стили:</strong> Упомяните, что нужны стили (например, "используй темную тему" или "сделай карточки в виде сетки").</li>
                        </ul>
                        <CodeBlockWithCopy title="Пример для HTML + JS режима" code={`Вход: "Создай вкладки (tabs) 'Профиль' и 'Настройки'. При клике на вкладку должен показываться соответствующий контент."
Выход:
<div class="tabs">
  <button class="tab-button active" data-tab="profile">Профиль</button>
  <button class="tab-button" data-tab="settings">Настройки</button>
</div>
<div class="tab-content active" id="profile">...</div>
<div class="tab-content" id="settings">...</div>

<script>
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => { /* ... логика переключения ... */ });
  });
<\/script>`} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Режим 3: Извлечение данных (JSON)</h3>
                        <p className="mt-2 text-base">Используется для получения информации (системных кодов и их описаний) из внутренней базы знаний.</p>
                         <h4 className="font-semibold text-lg mt-4">Правила использования:</h4>
                        <ul className="list-disc list-inside space-y-1 mt-2 text-base">
                            <li><strong>Строгий формат:</strong> Запрос должен быть в формате JSON.</li>
                            <li><strong>Обязательные поля:</strong> Необходимо передать ключи `module` и `template` для точной фильтрации.</li>
                        </ul>
                        <CodeBlockWithCopy title="Пример для JSON-режима (системные коды)" code={`Вход:
{
  "module": "E-commerce Store",
  "template": "Product page",
  "question": "Нужны глобальные блоки"
}
Выход:
{
  "system_codes": ["$GLOBAL_PROMO$", "$GLOBAL_FAQ$"],
  "descriptions": ["Глобальный промо-блок", "Глобальный блок FAQ"]
}`} />
                    </div>
                </div>
            </section>
            
             <section id="error-handling">
                <SectionHeader 
                    icon={<ShieldExclamationIcon className="w-8 h-8" />}
                    title="6. Обработка ошибок и неоднозначностей"
                    subtitle="Как система ведет себя в нестандартных ситуациях."
                />
                 <div className="space-y-4">
                    <InfoCard icon={<QuestionMarkCircleIcon className="w-6 h-6"/>} title="Неоднозначные запросы">
                        <p>Если запрос недостаточно конкретен, особенно в CSS-режиме (например, "измени цвет кнопки" без указания селектора), система может вернуть уточняющий вопрос. <strong>Пример:</strong> «Не удалось определить, к какой кнопке применить стили. Пожалуйста, укажите CSS-селектор (например, `.btn-submit` или `#main-button`).» Это предотвращает генерацию бесполезного или неверного кода.</p>
                    </InfoCard>
                    <InfoCard icon={<ExclamationTriangleIcon className="w-6 h-6"/>} title="Некорректные запросы">
                        <p>Если запрос совершенно не связан с генерацией кода или является бессмысленным набором символов, система вернет стандартный ответ об ошибке, указывая на невозможность обработки. Она не будет пытаться "угадать" намерение пользователя, чтобы избежать непредсказуемых результатов.</p>
                    </InfoCard>
                 </div>
            </section>

        </div>
    </DocumentationPageLayout>
  );
};

export default InterfaceGeneratorDocumentationPage;