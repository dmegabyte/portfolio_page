import React, { useRef, useState, useEffect } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, Table, SimpleCodeBlock, TooltipTerm, InfoCard } from '../components/DocumentationUIComponents';
import {
    LightBulbIcon,
    WrenchScrewdriverIcon,
    SparklesIcon,
    PuzzlePieceIcon,
    ClockIcon,
    CommandLineIcon,
    Cog6ToothIcon,
    TableCellsIcon,
    ChartBarIcon,
    MagnifyingGlassIcon,
    CheckBadgeIcon,
    ClipboardDocumentListIcon,
    ExclamationTriangleIcon,
    ArrowDownTrayIcon,
    UserGroupIcon,
    BeakerIcon,
    EnvelopeIcon,
    PaperAirplaneIcon,
    DocumentTextIcon,
    CloudIcon,
    ArrowPathIcon,
    BugAntIcon,
    ComputerDesktopIcon,
    ForwardIcon,
    CloudArrowUpIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


// FIX: Define an interface for workflow stages to ensure correct type inference for the 'content' property,
// which can be either a string or a function returning a ReactNode. This resolves a TypeScript error
// where `historyStages` content was incorrectly inferred as only a string, leading to a `never` type in conditional logic.
interface WorkflowStage {
    // FIX: Replaced JSX.Element with React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode | (() => React.ReactNode);
}


const ClientSegmentationReportPage: React.FC = () => {
    const historyRef = useRef<HTMLDivElement>(null);
    const algorithmRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(historyRef, { targetSelector: '.workflow-stage' });
    useAnimateOnScroll(algorithmRef, { targetSelector: '.workflow-stage' });

    const historySectionRef = useRef<HTMLElement>(null);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const algorithmSectionRef = useRef<HTMLElement>(null);
    const [isAlgorithmVisible, setIsAlgorithmVisible] = useState(false);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHistoryVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = historySectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAlgorithmVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = algorithmSectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const historyStages: WorkflowStage[] = [
        {
            icon: <ClipboardDocumentListIcon className="w-7 h-7" />,
            title: "Этап I — Анализ и первые гипотезы",
            content: "Исследована текущая схема рассылок (YClients → WAHelp), выявлены дубли и отсутствие персонализации, построен базовый алгоритм."
        },
        {
            icon: <TableCellsIcon className="w-7 h-7" />,
            title: "Этап II — Прототип на Google Sheets",
            content: "Реализована первая версия сегментации, добавлены ключевые атрибуты клиента и внедрено поле {CATEGORY_ID}."
        },
        {
            icon: <ExclamationTriangleIcon className="w-7 h-7" />,
            title: "Этап III — Проблемы масштабирования",
            content: "Скрипт разросся, тестирование в облаке стало сложным, а отладка занимала часы, что привело к решению о переходе на Python-движок."
        },
    ];

     const algorithmStages: WorkflowStage[] = [
        {
            icon: <ArrowDownTrayIcon className="w-7 h-7" />,
            title: "1. Импорт данных",
            content: "Импорт данных из таблиц (визиты, акции, персонализация)."
        },
        {
            icon: <SparklesIcon className="w-7 h-7" />,
            title: "2. Очистка и нормализация",
            content: "Удаление дублей, форматирование дат."
        },
        {
            icon: <UserGroupIcon className="w-7 h-7" />,
            title: "3. Классификация клиента",
            content: "Определение по параметрам: активность; тип потребления; частота; ценовой сегмент."
        },
        {
            icon: <BeakerIcon className="w-7 h-7" />,
            title: "4. Присвоение ID категории",
            content: "Присвоение ID категории и запись в мастер-таблицу."
        },
        {
            icon: <EnvelopeIcon className="w-7 h-7" />,
            title: "5. Генерация шаблона",
            content: "Генерация шаблона рассылки по категории."
        },
        {
            icon: <SparklesIcon className="w-7 h-7" />,
            title: "6. Подстановка данных",
            content: "Подстановка персональных данных (имя, промо-текст, дата, скидка)."
        },
        {
            icon: <PaperAirplaneIcon className="w-7 h-7" />,
            title: "7. Передача в API",
            content: () => <>Передача в <TooltipTerm definition="Сервис для автоматизации бизнес-рассылок и коммуникаций через WhatsApp API.">WAHelp</TooltipTerm> <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm> для отправки сообщения.</>
        },
    ];

    return (
        <DocumentationPageLayout title="SPA: Технический отчёт и история развития">
             <div className="space-y-16">
                <section id="introduction" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<LightBulbIcon className="w-8 h-8" />}
                        title="1. Введение"
                        subtitle="Обзор проекта Smart Promo Automation (SPA) как интеллектуальной системы для автоматизации маркетинговых рассылок."
                    />
                    <p>Проект SPA (Smart Promo Automation) был разработан как интеллектуальная система рассылки рекламных материалов клиентам, основанная на принципах точной сегментации и минимальной себестоимости обработки запросов.</p>
                    <p>Главная цель — автоматизация маркетинговых коммуникаций без участия оператора и без привлечения дорогостоящих <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>-моделей для каждого отдельного клиента.</p>
                </section>

                <section id="key-takeaways" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="2. Ключевые выводы"
                        subtitle="Основные результаты и инсайты, полученные в ходе разработки проекта SPA."
                    />
                     <InfoCard icon={<ChartBarIcon className="w-8 h-8" /> } title="Главные достижения проекта">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Снижение себестоимости в ~7 раз:</b> Переход от <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>-классификации к алгоритмической сегментации радикально сократил операционные расходы.</li>
                            <li><b>Ускорение разработки в 2-3 раза:</b> Методика "<TooltipTerm definition="Высокоуровневый язык программирования общего назначения, известный своей простотой, читаемостью и обширной экосистемой библиотек.">Python</TooltipTerm> → <TooltipTerm definition="Google Apps Script — это облачная платформа для разработки скриптов на JavaScript, которая позволяет автоматизировать задачи и расширять функциональность приложений Google Workspace.">GAS</TooltipTerm>" позволила внедрить локальное тестирование, повысив стабильность и скорость внесения изменений.</li>
                            <li><b>Полная автоматизация и прозрачность:</b> Система достигла 100% автоматизации рассылок (рост на 80 п.п.), а управление через Google Sheets сделало логику понятной для маркетологов.</li>
                        </ul>
                    </InfoCard>
                </section>

                <section id="initial-conditions" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="3. Исходные условия и предпосылки"
                        subtitle="Описание начальной точки: линейный алгоритм рассылок и цели по внедрению гибкой системы сегментации."
                    />
                    <p>Заказчик использовал связку <TooltipTerm definition="Популярная CRM-система для управления записями, клиентской базой и финансами в сфере услуг.">YClients</TooltipTerm> + <TooltipTerm definition="Сервис для автоматизации бизнес-рассылок и коммуникаций через WhatsApp API.">WAHelp</TooltipTerm>, через которую происходила отправка рекламных сообщений клиентам. Алгоритм был линейным и простым: спустя {`{n}`} дней после визита клиенту отправлялось однотипное сообщение с акцией или напоминанием. Такой подход работал, но не учитывал поведение и особенности клиентов.</p>
                    <p>Цель заказчика — внедрить гибкую, многослойную систему сегментатации, которая учитывает:</p>
                    <ul className="list-disc list-inside">
                        <li>тип клиента (новый, постоянный, VIP);</li>
                        <li>частоту и тип визитов;</li>
                        <li>ценовой сегмент и предпочтения;</li>
                        <li>персональные предложения и персонализированный текст.</li>
                    </ul>
                </section>

                <section id="concept" className="scroll-mt-24">
                     <SectionHeader 
                        icon={<SparklesIcon className="w-8 h-8" />}
                        title="4. Концепция нового решения"
                        subtitle="Переход от дорогостоящей LLM-классификации к эффективному алгоритмическому подходу с использованием шаблонизатора."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 h-full">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-0">Проблема: LLM-ассистент</h3>
                            <p className="mt-4 text-base text-red-900 dark:text-red-200">
                                Изначально предложенный подход с использованием <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> для сегментации оказался избыточным и затратным. Каждый запрос требовал вычислений на стороне модели, что резко увеличивало себестоимость обработки.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0">Решение: Алгоритмический подход</h3>
                             <p className="mt-4 text-base text-green-900 dark:text-green-200">
                                Вместо этого было предложено решение, где сегментация осуществляется алгоритмически, а формирование сообщения — через систему шаблонов с плейсхолдерами.
                            </p>
                            <SimpleCodeBlock>
                                Здравствуйте, {`{NAME}`}!  
                                {`{TEXT_PROMO}`}  
                                Ждём вас снова {`{NEXT_VISIT_DATE}`} 💆‍♀️
                            </SimpleCodeBlock>
                        </div>
                    </div>
                </section>

                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="5. Архитектура и используемые технологии"
                        subtitle="Обзор технологического стека и двухуровневой системы разработки."
                    />
                    <Table 
                        headers={['Компонент', 'Назначение', 'Технология']}
                        data={[
                            ['Категоризация клиентов', 'Алгоритмическое распределение по типам', <><TooltipTerm definition="Высокоуровневый язык программирования общего назначения, известный своей простотой, читаемостью и обширной экосистемой библиотек.">Python</TooltipTerm> (NumPy + Pandas)</>],
                            ['Хранилище данных', 'Обработка визитов, лояльности и акций', 'Google Sheets'],
                            ['Алгоритм рассылки', 'Сборка сообщений и отправка', <TooltipTerm definition="Google Apps Script — это облачная платформа для разработки скриптов на JavaScript, которая позволяет автоматизировать задачи и расширять функциональность приложений Google Workspace.">Google Apps Script</TooltipTerm>],
                            ['Инструменты разработки', 'Создание, тестирование, интеграция', 'Gemini, Claude, Codex CLI'],
                        ]}
                    />
                </section>

                <section id="history" className="scroll-mt-24" ref={historySectionRef}>
                    <SectionHeader 
                        icon={<ClockIcon className="w-8 h-8" />}
                        title="6. История развития проекта"
                        subtitle="Ключевые этапы: от анализа и прототипа до решения проблем масштабирования."
                    />
                    <div ref={historyRef} className="relative mt-8 not-prose">
                        <div 
                            className="absolute left-6 top-0 w-0.5 bg-gray-200 dark:bg-slate-700 origin-top transition-transform duration-1000 ease-in-out"
                            style={{ transform: isHistoryVisible ? 'scaleY(1)' : 'scaleY(0)', height: '100%' }}
                            aria-hidden="true"
                        ></div>
                        <div className="space-y-12">
                            {historyStages.map((stage, index) => (
                                <div key={index} className="workflow-stage relative pl-16" style={{ transitionDelay: `${index * 150}ms` }}>
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
                                        {stage.icon}
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0">{stage.title}</h3>
                                        <div className="mt-2 text-base text-slate-700 dark:text-slate-300">
                                            {(() => {
                                                if (typeof stage.content === 'function') {
                                                    return stage.content();
                                                }
                                                return stage.content;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section id="python-solution" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CommandLineIcon className="w-8 h-8" />}
                        title="7. Решение: переход к Python-движку"
                        subtitle="Как локальная разработка на Python позволила ускорить цикл, повысить стабильность и качество кода."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-stretch not-prose">
                        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-0">Старый цикл (в облаке)</h3>
                            <div className="flex items-center justify-around my-4 text-amber-600 dark:text-amber-400">
                                <CloudIcon className="w-10 h-10" />
                                <ArrowLongRightIcon className="w-8 h-8" />
                                <ArrowPathIcon className="w-10 h-10" />
                                <ArrowLongRightIcon className="w-8 h-8" />
                                <BugAntIcon className="w-10 h-10" />
                            </div>
                            <ul className="list-disc list-inside text-amber-900 dark:text-amber-200">
                                <li>Редактирование кода напрямую в облаке.</li>
                                <li>Длительное и сложное тестирование.</li>
                                <li>Высокий риск ошибок в продакшене.</li>
                            </ul>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/30 rounded-lg p-6 border border-sky-200 dark:border-sky-800">
                            <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300 mt-0">Новый цикл (Python → GAS)</h3>
                            <div className="flex items-center justify-around my-4 text-sky-600 dark:text-sky-400">
                                <ComputerDesktopIcon className="w-10 h-10" />
                                <ArrowLongRightIcon className="w-8 h-8" />
                                <ForwardIcon className="w-10 h-10" />
                                <ArrowLongRightIcon className="w-8 h-8" />
                                <CloudArrowUpIcon className="w-10 h-10" />
                            </div>
                            <ul className="list-disc list-inside text-sky-900 dark:text-sky-200">
                                <li>Локальная разработка на <TooltipTerm definition="Высокоуровневый язык программирования общего назначения, известный своей простотой, читаемостью и обширной экосистемой библиотек.">Python</TooltipTerm>.</li>
                                <li>Мгновенное модульное тестирование.</li>
                                <li>Конвертация в <TooltipTerm definition="Google Apps Script — это облачная платформа для разработки скриптов на JavaScript, которая позволяет автоматизировать задачи и расширять функциональность приложений Google Workspace.">GAS</TooltipTerm> и безопасная выгрузка.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="algorithm" className="scroll-mt-24" ref={algorithmSectionRef}>
                    <SectionHeader 
                        icon={<Cog6ToothIcon className="w-8 h-8" />}
                        title="8. Логика работы алгоритма"
                        subtitle="Пошаговый конвейер обработки данных: от импорта до отправки сообщения."
                    />
                     <div ref={algorithmRef} className="relative mt-8 not-prose">
                        <div 
                            className="absolute left-6 top-0 w-0.5 bg-gray-200 dark:bg-slate-700 origin-top transition-transform duration-1000 ease-in-out"
                            style={{ transform: isAlgorithmVisible ? 'scaleY(1)' : 'scaleY(0)', height: '100%' }}
                            aria-hidden="true"
                        ></div>
                        <div className="space-y-12">
                            {algorithmStages.map((stage, index) => (
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

                <section id="templates" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<TableCellsIcon className="w-8 h-8" />}
                        title="9. Пример структуры шаблонов"
                        subtitle="Как система адаптирует сообщения под разные категории клиентов."
                    />
                    <Table 
                        headers={['Категория клиента', 'Шаблон рассылки', 'Переменные']}
                        data={[
                            ['Новые клиенты', '“Добро пожаловать, {NAME}! Дарим скидку {PROMO}% на следующее посещение.”', '{NAME}, {PROMO}'],
                            ['Постоянные (2–4)', '“{NAME}, спасибо за доверие! Ваша скидка действует до {DATE}.”', '{NAME}, {DATE}'],
                            ['VIP (5+)', '“{NAME}, вы наш лучший гость 🌿! Для вас — персональное предложение: {TEXT_PROMO}.”', '{NAME}, {TEXT_PROMO}'],
                        ]}
                    />
                </section>

                <section id="analytics" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="10. Эффективность и аналитика"
                        subtitle="Ключевые метрики, демонстрирующие эффективность системы до и после внедрения."
                    />
                    <Table 
                        headers={['Показатель', 'До внедрения', 'После внедрения', 'Изменение']}
                        data={[
                            ['Автоматизация рассылок', '~20 %', '100 %', '▲ +80 п.п.'],
                            ['Средняя себестоимость рассылки', '1.0 ₽ / сообщение', '0.15 ₽ / сообщение', '▼ −85 %'],
                            ['Время подготовки кампании', '2–3 ч', '< 10 мин', '▼ −95 %'],
                            ['Количество ошибок (логов)', '15–20 / нед', '< 3 / нед', '▼ −80 %'],
                        ]}
                    />
                    <p>Система доказала высокую устойчивость и масштабируемость: алгоритм уверенно обрабатывает несколько тысяч записей визитов и формирует рассылки без задержек.</p>
                </section>

                <section id="conclusions" className="scroll-mt-24">
                     <SectionHeader 
                        icon={<MagnifyingGlassIcon className="w-8 h-8" />}
                        title="11. Анализ и выводы"
                        subtitle="Основные инсайты, полученные в ходе разработки и эксплуатации проекта."
                    />
                    <ul className="list-disc list-inside space-y-3">
                        <li>Переход от <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>-классификации к алгоритмической <b>снизил себестоимость почти в 10 раз.</b></li>
                        <li>Метод “<TooltipTerm definition="Высокоуровневый язык программирования общего назначения, известный своей простотой, читаемостью и обширной экосистемой библиотек.">Python</TooltipTerm> → <TooltipTerm definition="Google Apps Script — это облачная платформа для разработки скриптов на JavaScript, которая позволяет автоматизировать задачи и расширять функциональность приложений Google Workspace.">GAS</TooltipTerm>” позволил контролировать ошибки ещё до продакшена.</li>
                        <li>Шаблонная система с плейсхолдерами обеспечила персонализацию без увеличения нагрузки.</li>
                        <li>Код стал детерминированным — любые изменения предсказуемы и проверяемы.</li>
                        <li>Архитектура поддерживает расширение, включая прогнозирование активности клиентов и авто-ротацию промо-кампаний.</li>
                    </ul>
                </section>
                
                <section id="summary" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CheckBadgeIcon className="w-8 h-8" />}
                        title="12. Заключение"
                        subtitle="Итоговая оценка проекта: как умная логика стала эффективнее дорогих AI-моделей."
                    />
                    <p>Проект SPA стал примером того, как можно выстроить эффективную систему маркетинговой автоматизации без дорогих моделей и серверов. Используя простые инструменты — <TooltipTerm definition="Высокоуровневый язык программирования общего назначения, известный своей простотой, читаемостью и обширной экосистемой библиотек.">Python</TooltipTerm>, <TooltipTerm definition="Google Apps Script — это облачная платформа для разработки скриптов на JavaScript, которая позволяет автоматизировать задачи и расширять функциональность приложений Google Workspace.">Google Apps Script</TooltipTerm> и таблицы — удалось добиться ключевых результатов:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 not-prose">
                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center shadow-sm">
                            <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0">Полная автономия</h4>
                            <p className="mt-2 text-base text-green-900 dark:text-green-200">Процесс рассылок работает на 100% без участия человека.</p>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/30 p-6 rounded-lg border border-sky-200 dark:border-sky-800 text-center shadow-sm">
                            <h4 className="text-xl font-bold text-sky-800 dark:text-sky-300 mt-0">Высокая точность</h4>
                            <p className="mt-2 text-base text-sky-900 dark:text-sky-200">Сегментация клиентов на основе детальных поведенческих данных.</p>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800 text-center shadow-sm">
                            <h4 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mt-0">10-кратное снижение</h4>
                            <p className="mt-2 text-base text-indigo-900 dark:text-indigo-200">Себестоимости маркетинговых коммуникаций.</p>
                        </div>
                    </div>

                    <p className="font-semibold text-slate-800 dark:text-slate-200">SPA доказала, что для интеллектуальной автоматизации правильно спроектированная логика — это более мощный и экономичный инструмент, чем универсальный искусственный интеллект.</p>
                </section>
            </div>
        </DocumentationPageLayout>
    );
};

export default ClientSegmentationReportPage;