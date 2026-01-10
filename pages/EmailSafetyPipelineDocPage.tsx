import React, { useRef, useState, ReactNode } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, JsonReportViewer, TooltipTerm, StatusBadge } from '../components/DocumentationUIComponents';
import {
    ShieldCheckIcon, EnvelopeOpenIcon, CodeBracketIcon, CogIcon, CheckBadgeIcon,
    WrenchScrewdriverIcon, LightBulbIcon, PuzzlePieceIcon, ArrowPathIcon,
    ExclamationTriangleIcon, BeakerIcon, EyeIcon, LinkIcon, PaintBrushIcon,
    ServerStackIcon, KeyIcon, GlobeAltIcon, DocumentTextIcon, PhotoIcon, ArrowLongRightIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const AnalyzerDashboard: React.FC = () => {
    const dashboardRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(dashboardRef, { targetSelector: '.analyzer-column' });
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const toggleAnalyzer = (index: number) => {
        setExpandedIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const analyzers = [
        {
            name: 'Scenario Engine',
            icon: PuzzlePieceIcon,
            description: 'Интеллектуальная генерация сценариев тестирования.',
            checks: [
                {
                    icon: DocumentTextIcon,
                    name: 'Анализ контекста (Knowledge Base)',
                    description: 'AI изучает документацию о боте, его целях и функциях для создания реалистичных проверок.',
                },
                {
                    icon: KeyIcon,
                    name: 'Профили пользователей',
                    description: 'Создание уникальных персон (вежливый, агрессивный, невнимательный) для проверки реакции бота на разные стили.',
                },
            ]
        },
        {
            name: 'AI Vision Driver',
            icon: EyeIcon,
            description: 'Автономное выполнение тестов через "зрение" системы.',
            checks: [
                {
                    icon: PhotoIcon,
                    name: 'Визуальный анализ скриншотов',
                    description: () => <>Claude Vision API анализирует каждый шаг диалога, понимая текст, кнопки и состояние интерфейса.</>,
                },
                {
                    icon: ArrowPathIcon,
                    name: 'Принятие решений (Reasoning)',
                    description: () => <>Система выбирает следующее действие (клик, ввод текста) на основе цели сценария и текущего ответа бота.</>,
                },
                {
                    icon: WrenchScrewdriverIcon,
                    name: 'Эмуляция действий',
                    description: 'Физическое взаимодействие с виджетом чата через Playwright (клики по кнопкам, ввод сообщений).',
                },
            ]
        }
    ];

    return (
        <div ref={dashboardRef} className="not-prose my-12">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start md:gap-x-6 gap-y-8">
                {analyzers.map((analyzer, index) => {
                    const isExpanded = expandedIndices.includes(index);
                    return (
                        <React.Fragment key={index}>
                            <div
                                className={`analyzer-column bg-gray-50 dark:bg-slate-900/50 rounded-xl border p-6 flex flex-col shadow-lg transition-all duration-300 h-full`}
                                style={{
                                    transitionDelay: `${index * 150}ms`,
                                    borderColor: isExpanded ? 'var(--color-interactive-primary)' : undefined
                                }}
                            >
                                <button
                                    onClick={() => toggleAnalyzer(index)}
                                    className="w-full text-left flex items-start justify-between gap-4 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ring-offset-gray-50 dark:ring-offset-slate-900/50"
                                    aria-expanded={isExpanded}
                                    aria-controls={`analyzer-checks-${index}`}
                                >
                                    <div className="flex items-start gap-4 flex-grow">
                                        <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-slate-800 rounded-full text-indigo-600 dark:text-indigo-400 font-bold text-xl border-2 border-indigo-200 dark:border-slate-700">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-3">
                                                <analyzer.icon className="w-6 h-6" /> {analyzer.name}
                                            </h3>
                                            <p className="text-base text-slate-600 dark:text-slate-400 mt-1">{analyzer.description}</p>
                                        </div>
                                    </div>
                                    <ChevronDownIcon className={`w-6 h-6 text-gray-400 dark:text-slate-500 transition-transform duration-300 flex-shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>

                                <div
                                    id={`analyzer-checks-${index}`}
                                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="space-y-4 flex-grow pt-6 mt-4 border-t border-gray-200 dark:border-slate-700">
                                            {analyzer.checks.map((check, checkIndex) => (
                                                <div
                                                    key={checkIndex}
                                                    className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700/80 transition-all duration-300"
                                                    style={{
                                                        opacity: isExpanded ? 1 : 0,
                                                        transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
                                                        transitionDelay: `${checkIndex * 75}ms`
                                                    }}
                                                >
                                                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 dark:bg-slate-700/50 text-indigo-500 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                                                        <check.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{check.name}</h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                                            {typeof check.description === 'function' ? check.description() : check.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {index < analyzers.length - 1 && (
                                <div className="hidden md:flex items-center justify-center h-full pt-8">
                                    <ArrowLongRightIcon className="w-12 h-12 text-gray-300 dark:text-slate-600" />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};


const EmailSafetyPipelineDocumentationPage: React.FC = () => {
    const workflowRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(workflowRef, { targetSelector: '.workflow-stage' });

    const workflowStages = [
        {
            icon: <PuzzlePieceIcon className="w-7 h-7" />,
            title: "1. Генерация сценария (Scenario)",
            content: "AI анализирует контекст бота и генерирует цепочку шагов, цели и характер пользователя. Сценарии охватывают как позитивные, так и негативные кейсы."
        },
        {
            icon: <EyeIcon className="w-7 h-7" />,
            title: "2. Автономное выполнение (Execution)",
            content: "Система открывает чат, делает скриншоты каждого шага и через Claude Vision принимает решение о следующем действии: нажать на кнопку или написать ответ."
        },
        {
            icon: <CheckBadgeIcon className="w-7 h-7" />,
            title: "3. Финальный вердикт (Quality Check)",
            content: "Анализ всей истории диалога на соответствие целям, стилю бренда и отсутствие логических ошибок. Формируется отчет с видео или серией скриншотов."
        }
    ];

    const reportData = {
        final_verdict: "STOP" as const,
        scenario_info: {
            goal: "Получить информацию о возврате товара",
            user_profile: "Агрессивный клиент"
        },
        issue_detected: {
            status: "red",
            flags: [
                { risk: "red", comment: "Бот ушел в бесконечный цикл на вопросе о сроках возврата." },
                { risk: "yellow", comment: "Стиль ответа бота стал слишком неформальным под давлением пользователя." },
                { risk: "red", comment: "Бот не предложил переключить на оператора при явном требовании." }
            ]
        }
    };

    return (
        <DocumentationPageLayout title="Visual AI Chatbot Tester">
            <div className="space-y-16">
                <section id="concept" className="scroll-mt-24">
                    <SectionHeader
                        icon={<EyeIcon className="w-8 h-8" />}
                        title="1. Концепция: Автономный тестировщик чат-ботов"
                        subtitle="Интеллектуальная система на базе Playwright и Claude AI для автоматизированного визуального тестирования сценариев диалога любой сложности."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые возможности (Core Features)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Визуальное понимание:</b> Система не просто читает текст, она "видит" виджет чата через скриншоты и понимает состояние интерфейса.</li>
                            <li><b>Автономное принятие решений:</b> Claude Vision решает, какую кнопку нажать или что ответить, основываясь на цели теста.</li>
                            <li><b>Проверка логики и стиля:</b> Автоматическое выявление ошибок в логике бота, "галлюцинаций" или нарушения Tone of Voice.</li>
                            <li><b>Генерация сценариев:</b> Система сама придумывает тест-кейсы (от позитивных до критических) на основе документации о продукте.</li>
                        </ul>
                    </InfoCard>
                </section>

                <section id="problem-solution" className="scroll-mt-24">
                    <SectionHeader
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="2. Проблема и Решение"
                        subtitle="От ручного кликанья по чату к полностью автономному контролю качества."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 h-full">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-0 flex items-center gap-3">
                                <ExclamationTriangleIcon className="w-7 h-7" />
                                Проблема: Бесконечные регрессии
                            </h3>
                            <p className="mt-4 text-base text-red-900 dark:text-red-200">
                                Традиционные тесты чат-ботов "хрупкие": любое изменение текста кнопки или структуры ломает их. Проверять сложные ветви диалога вручную при каждом обновлении — это сотни человеко-часов и риск пропустить критический баг в логике.
                            </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0 flex items-center gap-3">
                                <CogIcon className="w-7 h-7" />
                                Решение: AI-Агент Тестировщик
                            </h3>
                            <p className="mt-4 text-base text-green-900 dark:text-green-200">
                                Система работает как живой QA-инженер. Она заходит в чат, импровизирует в рамках сценария, проверяет, как бот реагирует на нестандартные вопросы, и визуально подтверждает, что все элементы интерфейса (кнопки, ссылки) работают корректно.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="architecture" className="scroll-mt-24">
                    <SectionHeader
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="3. Архитектура и технологии"
                        subtitle="Технологический стек, позволяющий системе 'видеть' и 'думать'."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                        <InfoCard icon={<CodeBracketIcon className="w-8 h-8" />} title="Node.js + Playwright">
                            <p>Основа системы для управления браузером. Playwright обеспечивает быструю и стабильную работу с современными веб-виджетами в headless-режиме.</p>
                        </InfoCard>
                        <InfoCard icon={<EyeIcon className="w-8 h-8" />} title="Claude Vision API">
                            <p>"Глаза" системы. Мультимодальная модель анализирует скриншоты чата, распознает элементы интерфейса и интерпретирует ответы бота.</p>
                        </InfoCard>
                        <InfoCard icon={<BeakerIcon className="w-8 h-8" />} title="AI Scenario Generator">
                            <p>Модуль на базе LLM, который на лету создает детальные планы тестирования, включая негативные сценарии и имитацию различных типов личностей пользователей.</p>
                        </InfoCard>
                        <InfoCard icon={<ServerStackIcon className="w-8 h-8" />} title="History Service">
                            <p>Сервис хранения логов и медиа. На каждом шаге сохраняется не только текст диалога, но и скриншот, а также 'размышления' (reasoning) AI о принятом решении.</p>
                        </InfoCard>
                        <InfoCard icon={<CogIcon className="w-8 h-8" />} title="Docker Stack">
                            <p>Вся инфраструктура контейнеризирована для легкого масштабирования в CI/CD пайплайнах, позволяя запускать десятки параллельных тестов одновременно.</p>
                        </InfoCard>
                    </div>
                </section>

                <section id="workflow" className="scroll-mt-24">
                    <SectionHeader
                        icon={<ArrowPathIcon className="w-8 h-8" />}
                        title="4. Детальный флоу работы"
                        subtitle="Пошаговый конвейер анализа: от получения шаблона до финального вердикта."
                    />
                    <div ref={workflowRef} className="relative mt-8 not-prose">
                        <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                        <div className="space-y-12">
                            {workflowStages.map((stage, index) => (
                                <div key={index} className="workflow-stage relative pl-16" style={{ transitionDelay: `${index * 150}ms` }}>
                                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
                                        {stage.icon}
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0">{stage.title}</h3>
                                        <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{stage.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="analyzers-deep-dive" className="scroll-mt-24">
                    <SectionHeader
                        icon={<EyeIcon className="w-8 h-8" />}
                        title="5. Под капотом: что проверяют анализаторы"
                        subtitle="Детальный разбор того, какие именно проверки выполняет система на каждом этапе."
                    />
                    <AnalyzerDashboard />
                </section>

                <section id="report-example" className="scroll-mt-24">
                    <SectionHeader
                        icon={<CodeBracketIcon className="w-8 h-8" />}
                        title="6. Пример отчёта тестирования"
                        subtitle="Детальный результат проверки диалога с агрессивным пользователем."
                    />
                    <p>Система генерирует подробный отчет, который включает лог диалога, скриншоты критических моментов и "мнение" AI об ошибках. Вердикт **STOP** в данном примере указывает на то, что бот не справился с обработкой негатива и нарушил бизнес-логику (не перевел на оператора).</p>
                    <JsonReportViewer data={reportData} />
                </section>
            </div>
        </DocumentationPageLayout>
    );
};

export default EmailSafetyPipelineDocumentationPage;