import React, { useRef, useState, ReactNode } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, JsonReportViewer, TooltipTerm, StatusBadge } from '../components/DocumentationUIComponents';
import { 
    ShieldCheckIcon, EnvelopeOpenIcon, CodeBracketIcon, CogIcon, CheckBadgeIcon, 
    WrenchScrewdriverIcon, LightBulbIcon, PuzzlePieceIcon, ArrowPathIcon,
    ExclamationTriangleIcon, BeakerIcon, EyeIcon, LinkIcon, PaintBrushIcon,
    ServerStackIcon, KeyIcon, GlobeAltIcon, DocumentTextIcon, PhotoIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const AnalyzerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const dashboardRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(dashboardRef, { targetSelector: '.analyzer-item' });

    const analyzers = [
        {
            name: 'Reputation',
            icon: ShieldCheckIcon,
            description: 'Оценивает доверие к источнику письма.',
            checks: [
                {
                    icon: ServerStackIcon,
                    name: 'Аутентификация отправителя',
                    description: () => <>Проверка DNS-записей: <TooltipTerm definition="Стандарт, позволяющий владельцу домена указать, с каких IP-адресов разрешена отправка почты от его имени.">SPF</TooltipTerm>, <TooltipTerm definition="Технология, позволяющая удостовериться, что письмо действительно было отправлено с заявленного домена и не было изменено в пути.">DKIM</TooltipTerm>, <TooltipTerm definition="Политика, которая объединяет SPF и DKIM и указывает почтовым серверам, что делать с письмами, не прошедшими проверку.">DMARC</TooltipTerm>.</>,
                    statuses: ['green']
                },
                {
                    icon: GlobeAltIcon,
                    name: 'Репутация домена и IP',
                    description: () => <>Проверка домена и IP-адреса по глобальным черным спискам (например, <TooltipTerm definition="Международная организация, отслеживающая спам-активность и ведущая черные списки IP-адресов и доменов.">Spamhaus</TooltipTerm>).</>,
                    statuses: ['red']
                },
            ]
        },
        {
            name: 'Content',
            icon: EnvelopeOpenIcon,
            description: 'Глубокий анализ содержимого письма.',
            checks: [
                {
                    icon: DocumentTextIcon,
                    name: 'Спам-триггеры и стоп-слова',
                    description: 'Поиск слов и фраз, характерных для спама ("бесплатно", "гарантированный доход", "только сегодня").',
                    statuses: ['yellow', 'red']
                },
                {
                    icon: LinkIcon,
                    name: 'Безопасность ссылок',
                    description: () => <>Проверка каждого URL-адреса через <TooltipTerm definition="Сервис от Google для проверки URL-адресов на наличие фишинга, вредоносного ПО и других онлайн-угроз.">Google Safe Browsing API</TooltipTerm> на наличие угроз.</>,
                    statuses: ['red']
                },
                 {
                    icon: KeyIcon,
                    name: 'Техники маскировки',
                    description: 'Поиск скрытого текста, нерелевантных анкоров ссылок, вводящих в заблуждение, и других фишинговых техник.',
                    statuses: ['yellow']
                },
            ]
        },
        {
            name: 'Rendering',
            icon: PaintBrushIcon,
            description: 'Проверка корректности отображения.',
             checks: [
                {
                    icon: PhotoIcon,
                    name: 'Mobile & Desktop снимки',
                    description: 'Создание скриншотов в разрешениях 375x667 (Mobile) и 1280x800 (Desktop) для визуального контроля.',
                    statuses: ['green']
                },
                {
                    icon: ExclamationTriangleIcon,
                    name: 'Выявление сдвигов верстки',
                    description: 'Автоматический поиск "разъехавшихся" элементов, нечитаемого текста или проблем с отображением изображений.',
                    statuses: ['yellow']
                },
            ]
        }
    ];

    return (
        <div ref={dashboardRef} className="not-prose my-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-slate-700">
                {analyzers.map((analyzer, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 p-4 text-center font-semibold transition-all duration-300 flex items-center justify-center gap-3 border-b-4 focus:outline-none focus-visible:bg-indigo-50 dark:focus-visible:bg-slate-800
                            ${activeTab === index
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-800'
                                : 'border-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'
                            }`
                        }
                        role="tab"
                        aria-selected={activeTab === index}
                    >
                        <analyzer.icon className="w-6 h-6" />
                        <span>Stage {index + 1} — {analyzer.name}</span>
                    </button>
                ))}
            </div>
            <div className="p-6">
                {analyzers.map((analyzer, index) => (
                    <div key={index} className={activeTab === index ? 'block' : 'hidden'} role="tabpanel">
                        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">{analyzer.description}</p>
                        <div className="space-y-4">
                            {analyzer.checks.map((check, checkIndex) => (
                                <div 
                                    key={checkIndex}
                                    className="analyzer-item flex items-start gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700"
                                    style={{ transitionDelay: `${checkIndex * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-lg flex items-center justify-center">
                                        <check.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-slate-900 dark:text-slate-200">{check.name}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {typeof check.description === 'function' ? check.description() : check.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        {check.statuses.map(status => (
                                            <StatusBadge key={status} status={status as any}>{status.toUpperCase()}</StatusBadge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const EmailSafetyPipelineDocumentationPage: React.FC = () => {
    const workflowRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(workflowRef, { targetSelector: '.workflow-stage' });

    const workflowStages = [
        {
            icon: <ShieldCheckIcon className="w-7 h-7" />,
            title: "1. Анализ репутации (Reputation)",
            content: "Первый фильтр. Система проверяет отправителя, его домен и email на доверие, используя DNS-записи (SPF, DKIM) и черные списки. Вердикт: Red, Yellow или Green."
        },
        {
            icon: <BeakerIcon className="w-7 h-7" />,
            title: "2. Анализ контента (Content)",
            content: "Глубокий анализ HTML-кода, текста и ссылок. Система ищет спам-триггеры, фишинговые паттерны и проверяет все URL через Google Safe Browsing API."
        },
        {
            icon: <PaintBrushIcon className="w-7 h-7" />,
            title: "3. Анализ рендеринга (Rendering)",
            content: "Эмуляция открытия письма в разных почтовых клиентах (десктоп, мобайл) с помощью Puppeteer для создания скриншотов и выявления проблем с версткой."
        },
        {
            icon: <CheckBadgeIcon className="w-7 h-7" />,
            title: "4. Финальное решение (Final Verdict)",
            content: "Агрегация результатов всех этапов. Система выносит итоговое решение: GO (разрешить) или STOP (заблокировать), формируя детальный JSON-отчет."
        }
    ];

    const reportData = {
        final_verdict: "STOP" as const,
        reputation_check: {
            status: "green",
            details: "SPF, DKIM, DMARC records are valid. Not found in major blacklists."
        },
        content_check: {
            status: "red",
            flags: [
                { risk: "yellow", comment: "Обнаружены слова срочности и давления ('только сегодня', 'последний шанс')." },
                { risk: "red", comment: "Обнаружены нереалистичные финансовые обещания ('гарантированный доход')." },
                { risk: "red", comment: "Обнаружен агрессивный призыв к действию." },
                { risk: "yellow", comment: "Тематика классифицирована как 'Гэмблинг и розыгрыши' с уверенностью 0.95." }
            ]
        },
        rendering_check: {
            status: "green",
            details: "No significant layout issues detected on mobile or desktop."
        }
    };

  return (
    <DocumentationPageLayout title="Пайплайн безопасности email">
        <div className="space-y-16">
            <section id="concept" className="scroll-mt-24">
                <SectionHeader 
                    icon={<ShieldCheckIcon className="w-8 h-8" />}
                    title="1. Концепция: Автоматический аудитор email-кампаний"
                    subtitle="Создание автоматизированного конвейера для всесторонней проверки HTML-шаблонов email-сообщений перед отправкой, чтобы защитить репутацию бренда и повысить доставляемость."
                />
                <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                    <ul className="list-disc list-inside space-y-2 text-base">
                        <li><b>Многоуровневая проверка:</b> Система анализирует email по трём ключевым направлениям: репутация отправителя, безопасность контента и корректность отображения.</li>
                        <li><b>Предотвращение рисков:</b> Автоматически обнаруживает спам-триггеры, фишинговые ссылки и проблемы с версткой до того, как письмо увидят клиенты.</li>
                        <li><b>Защита репутации:</b> Снижает риск попадания домена в черные списки почтовых провайдеров.</li>
                        <li><b>Полная автоматизация:</b> Весь процесс от получения шаблона до финального отчета выполняется без участия человека.</li>
                    </ul>
                </InfoCard>
            </section>

            <section id="problem-solution" className="scroll-mt-24">
                <SectionHeader 
                    icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                    title="2. Проблема и Решение"
                    subtitle="Как перейти от ручной проверки к автоматизированному контролю качества."
                />
                <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                    <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 h-full">
                        <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-0 flex items-center gap-3">
                           <ExclamationTriangleIcon className="w-7 h-7" />
                           Проблема: «Человеческий фактор»
                        </h3>
                        <p className="mt-4 text-base text-red-900 dark:text-red-200">
                            Ручная проверка email-шаблонов маркетологом — это медленно, дорого и ненадежно. Легко пропустить скрытую фишинговую ссылку, не заметить спам-слово или не учесть, что верстка "поедет" на мобильных устройствах. Одна ошибка может стоить репутации домена и лояльности клиентов.
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0 flex items-center gap-3">
                            <CogIcon className="w-7 h-7" />
                            Решение: «Автоматический контролёр»
                        </h3>
                        <p className="mt-4 text-base text-green-900 dark:text-green-200">
                           Пайплайн работает как неутомимый цифровой аудитор. Он за секунды проводит комплексную проверку, которую человек делал бы часами. Система автоматически анализирует технические заголовки, каждую ссылку, каждое слово и даже то, как письмо будет выглядеть на экране смартфона, вынося четкий вердикт: GO или STOP.
                        </p>
                    </div>
                </div>
            </section>

             <section id="architecture" className="scroll-mt-24">
                <SectionHeader 
                    icon={<PuzzlePieceIcon className="w-8 h-8" />}
                    title="3. Архитектура и технологии"
                    subtitle="Обзор технологического стека, лежащего в основе пайплайна."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                    <InfoCard icon={<CodeBracketIcon className="w-8 h-8"/>} title="Node.js + Express">
                        <p>Ядро системы. Создает <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm>-эндпоинт, который принимает HTML-шаблон и управляет всем процессом проверки, координируя работу других модулей.</p>
                    </InfoCard>
                    <InfoCard icon={<EnvelopeOpenIcon className="w-8 h-8"/>} title="SpamAssassin API">
                        <p>Внешний сервис, используемый для глубокого анализа текста письма на наличие спам-триггеров. Он оценивает контент по сотням правил и возвращает оценку "спамности".</p>
                    </InfoCard>
                    <InfoCard icon={<PaintBrushIcon className="w-8 h-8"/>} title="Puppeteer">
                        <p>Инструмент для управления браузером Chrome в headless-режиме. Используется на этапе анализа рендеринга для создания скриншотов HTML-шаблона в различных разрешениях (десктоп/мобайл).</p>
                    </InfoCard>
                     <InfoCard icon={<LinkIcon className="w-8 h-8"/>} title="Google Safe Browsing API">
                        <p>Сервис от Google для проверки URL-адресов на наличие фишинга, вредоносного ПО и других угроз. Пайплайн извлекает все ссылки из письма и проверяет каждую через этот <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm>.</p>
                    </InfoCard>
                     <InfoCard icon={<CogIcon className="w-8 h-8"/>} title="Docker">
                        <p>Вся система упакована в Docker-контейнер. Это обеспечивает простоту развертывания и гарантирует, что все зависимости (включая SpamAssassin) будут работать в изолированной и предсказуемой среде.</p>
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
                    title="6. Пример отчёта"
                    subtitle="Визуализированный итоговый отчет по агрессивному маркетинговому письму, которое было заблокировано системой."
                />
                <p>Вместо простого JSON-файла, система генерирует наглядный отчет. Финальный вердикт **STOP** означает, что письмо заблокировано. Цветные флаги (`red`, `yellow`) указывают на конкретные проблемы, обнаруженные на этапе анализа контента, и позволяют маркетологу быстро понять причину блокировки.</p>
                <JsonReportViewer data={reportData} />
            </section>
        </div>
    </DocumentationPageLayout>
  );
};

export default EmailSafetyPipelineDocumentationPage;