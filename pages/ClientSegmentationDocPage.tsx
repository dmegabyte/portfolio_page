import React, { useRef } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm, DefinitionList } from '../components/DocumentationUIComponents';
import {
    UsersIcon,
    TableCellsIcon,
    CommandLineIcon,
    LightBulbIcon,
    WrenchScrewdriverIcon,
    PuzzlePieceIcon,
    ArrowPathIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    ArrowDownTrayIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    SparklesIcon,
    PaperAirplaneIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { glossary } from '../data/glossary';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const ClientSegmentationDocumentationPage: React.FC = () => {
    const glossaryItems = Object.entries(glossary).map(([term, definition]) => ({ term, definition }));
    const workflowRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(workflowRef, { targetSelector: '.workflow-stage' });

    const workflowStages = [
        {
            icon: <ArrowDownTrayIcon className="w-7 h-7" />,
            title: "1. Инициализация",
            content: "Скрипт запускается (обычно раз в сутки) и загружает все данные с листов «Клиенты», «Шаблоны», «Акции» и «Персонализация» в оперативную память."
        },
        {
            icon: <UserGroupIcon className="w-7 h-7" />,
            title: "2. Глобальная сегментация",
            content: "Для каждого клиента определяется его тип, лояльность, активность, ценовой сегмент и предпочтения (например, \"Активный постоянный массажник\")."
        },
        {
            icon: <CalendarDaysIcon className="w-7 h-7" />,
            title: "3. Расчет даты отправки",
            content: () => (
                <>
                    Для каждого клиента вычисляется оптимальная дата следующего контакта (<TooltipTerm definition="Ключевое поле; расчетная дата, когда клиенту должно быть отправлено сообщение.">send_date</TooltipTerm>) на основе его индивидуальной истории посещений (<TooltipTerm definition="Самый короткий промежуток времени между двумя последовательными визитами.">minInterval</TooltipTerm>) или средних показателей по сегменту (<TooltipTerm definition="Среднестатистический промежуток времени между визитами для клиентов в сегменте.">avgInterval</TooltipTerm>).
                </>
            )
        },
        {
            icon: <SparklesIcon className="w-7 h-7" />,
            title: "4. Подбор контента",
            content: () => (
                <>
                    Для клиентов, у которых `send_date` совпадает с текущей датой, система ищет наиболее подходящий контент:
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-base">
                        <li>Сначала ищется уникальное предложение в листе «Персонализация».</li>
                        <li>Если ничего не найдено, ищется групповое предложение в листе «Акции».</li>
                        <li>Параллельно подбирается наиболее релевантный текст из листа «Шаблоны».</li>
                    </ul>
                </>
            )
        },
        {
            icon: <PaperAirplaneIcon className="w-7 h-7" />,
            title: "5. Формирование и отправка",
            content: () => (
                 <>
                    Скрипт объединяет найденный шаблон и акцию, формирует финальное сообщение и отправляет его через <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm> сервиса WAHelp.
                </>
            )
        },
        {
            icon: <DocumentTextIcon className="w-7 h-7" />,
            title: "6. Логирование",
            content: "Все действия, отправленные сообщения и ошибки записываются на лист «Логи» для последующего анализа."
        }
    ];

    return (
        <DocumentationPageLayout title="AI-маркетолог: Сегментация клиентов">
            <div className="space-y-16">

                <section id="concept" className="scroll-mt-24">
                    <SectionHeader
                        icon={<UsersIcon className="w-8 h-8" />}
                        title="1. Концепция: Гиперперсонализация в Google Sheets"
                        subtitle="Система, которая превращает статичную таблицу в интеллектуальный маркетинговый инструмент, автоматически сегментируя клиентов и подбирая для каждого уникальное предложение."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Data-Centric подход:</b> Вся логика и данные сосредоточены в Google Sheets, что делает систему прозрачной и легко управляемой.</li>
                            <li><b>Многофакторная сегментация:</b> Клиенты делятся на группы по 7+ параметрам, включая тип, лояльность, активность и предпочтения.</li>
                            <li><b>Предиктивный расчет:</b> Система не просто реагирует на действия, а прогнозирует оптимальную дату следующего контакта для увеличения LTV.</li>
                            <li><b>Полная автоматизация:</b> От анализа данных до отправки персонализированного сообщения через WAHelp — весь процесс выполняется без участия человека.</li>
                        </ul>
                    </InfoCard>
                </section>

                <section id="problem-solution" className="scroll-mt-24">
                    <SectionHeader
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="2. Проблема и Решение"
                        subtitle="Как перейти от массовых рассылок к индивидуальному подходу."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 h-full">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-0">Проблема: «Стрельба по воробьям»</h3>
                            <p className="mt-4 text-base text-red-900 dark:text-red-200">
                                Стандартные рассылки отправляют одинаковые сообщения всем подряд. Это приводит к низкой конверсии, выгоранию аудитории и потере клиентов, которым предложение было нерелевантно или несвоевременно. Ручная сегментация отнимает часы и не способна учесть все нюансы.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0">Решение: «Цифровой маркетолог»</h3>
                            <p className="mt-4 text-base text-green-900 dark:text-green-200">
                                Система работает как автономный маркетолог. Она анализирует каждого клиента, определяет его текущий статус (например, «потерянный, но лояльный спашник»), находит для него идеальное предложение в матрице акций и рассчитывает лучший день для отправки. Результат — каждое сообщение попадает в цель.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="3. Архитектура системы"
                        subtitle="Как простые инструменты Google Workspace превращаются в мощную CRM-систему."
                    />
                    <div className="space-y-6">
                        <InfoCard icon={<TableCellsIcon className="w-8 h-8" />} title="Google Sheets: База данных и UI">
                            <p>Центральный элемент системы. Таблицы служат не только для хранения данных, но и как интерфейс для управления логикой. Маркетолог может легко редактировать шаблоны, акции и правила сегментации, не прикасаясь к коду.</p>
                        </InfoCard>
                        <InfoCard icon={<CommandLineIcon className="w-8 h-8" />} title="Google Apps Script: Мозг системы">
                            <p>Весь бэкенд и бизнес-логика реализованы на Apps Script. Скрипты запускаются по триггеру, обрабатывают данные из таблиц, выполняют сложные расчеты и взаимодействуют с внешними <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm>.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="workflow" className="scroll-mt-24">
                    <SectionHeader
                        icon={<ArrowPathIcon className="w-8 h-8" />}
                        title="4. Основной флоу работы (пошагово)"
                        subtitle="Жизненный цикл обработки данных от запуска скрипта до отправки сообщения."
                    />
                     <div ref={workflowRef} className="relative mt-8 not-prose">
                        {/* Vertical line connector */}
                        <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                        
                        <div className="space-y-12">
                            {workflowStages.map((stage, index) => (
                                <div key={index} className="workflow-stage relative pl-16" style={{ transitionDelay: `${index * 150}ms` }}>
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
                                        {stage.icon}
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0">{stage.title}</h3>
                                        <div className="mt-2 text-base text-slate-700 dark:text-slate-300">
                                            {typeof stage.content === 'function' ? stage.content() : stage.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="core-mechanics" className="scroll-mt-24">
                     <SectionHeader
                        icon={<Cog6ToothIcon className="w-8 h-8" />}
                        title="5. Ключевые принципы и механики"
                        subtitle="Фундаментальные концепции, обеспечивающие эффективность и надежность системы."
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
                        {/* Left column for explanation */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mt-0 mb-4">Принцип «idFirst»</h3>
                            <div className="space-y-4 text-base text-slate-700 dark:text-slate-300">
                                <p>
                                    Один из ключевых архитектурных принципов. Все ключевые категории (тип клиента, лояльность, активность и т.д.) хранятся и обрабатываются как числовые ID, а не как строки. Например, вместо "Активный" используется `1`, вместо "Пассивный" — `2`. Это дает несколько преимуществ:
                                </p>
                                <ul className="list-disc list-inside space-y-2 !my-0">
                                    <li><strong>Производительность:</strong> Сравнение чисел в Google Sheets и Apps Script на порядки быстрее, чем сравнение строк, что критично при обработке тысяч клиентов.</li>
                                    <li><strong>Надежность:</strong> Исключаются ошибки, связанные с опечатками, лишними пробелами или разными регистрами в текстовых значениях.</li>
                                    <li><strong>Гибкость:</strong> Легко добавлять новые категории, не меняя основную логику кода.</li>
                                </ul>
                            </div>
                        </div>
                        {/* Right column for the code example */}
                        <div className="flex flex-col justify-center">
                            <CodeBlockWithCopy title="Пример проверки по ID вместо текста" code={`
// ПЛОХО (медленно и ненадежно)
if (client.activity === "Активный" && client.loyalty === "Повторный (2-4 раза)") {
    // ...
}

// ХОРОШО (быстро и надежно)
if (client.activityId === 1 && client.loyaltyId === 2) {
    // ...
}
                                `} />
                        </div>
                    </div>
                </section>
                
                <section id="glossary" className="scroll-mt-24">
                    <SectionHeader
                        icon={<BookOpenIcon className="w-8 h-8" />}
                        title="6. Терминология (Глоссарий)"
                        subtitle="Словарь ключевых терминов, используемых в системе, для единого понимания всеми участниками процесса."
                    />
                    <DefinitionList items={glossaryItems} />
                </section>

            </div>
        </DocumentationPageLayout>
    );
};

export default ClientSegmentationDocumentationPage;