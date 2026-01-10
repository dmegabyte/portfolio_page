import React, { useRef } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm, ReadMore } from '../components/DocumentationUIComponents';
import { BugAntIcon, CogIcon, PlayCircleIcon, CodeBracketIcon, ChatBubbleBottomCenterTextIcon, CpuChipIcon, ArrowDownTrayIcon, SparklesIcon, CheckBadgeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const BotAutoTestDocumentationPage: React.FC = () => {
    const workflowRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(workflowRef, { targetSelector: '.workflow-stage' });

    const workflowStages = [
        {
            icon: <ArrowDownTrayIcon className="w-7 h-7" />,
            title: "1. Загрузка файла",
            content: "Загружается справочный файл (например, promo.json со списком акций), который служит «источником правды» для теста."
        },
        {
            icon: <SparklesIcon className="w-7 h-7" />,
            title: "2. Анализ и генерация тест-кейсов",
            content: () => (
                <>
                    <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> анализирует файл и формирует набор тест-кейсов под материал.
                </>
            )
        },
        {
            icon: <PlayCircleIcon className="w-7 h-7" />,
            title: "3. Выполнение сценариев",
            content: () => (
                <>
                    Выполняются сценарии (через <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm> или эмуляцию UI), фиксируются вопросы и ответы бота.
                </>
            )
        },
        {
            icon: <CheckBadgeIcon className="w-7 h-7" />,
            title: "4. Сверка результатов",
            content: "Ответы сверяются с правилами акции и ожидаемыми условиями, прописанными в исходном файле."
        },
        {
            icon: <DocumentTextIcon className="w-7 h-7" />,
            title: "5. Формирование отчета",
            content: () => (
                <>
                    Финальный отчёт формируется автоматически <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> на основании загруженного файла и реального диалога.
                </>
            )
        }
    ];

  return (
    <DocumentationPageLayout title="AI-тестировщик чат-ботов">
        <div className="space-y-12">
            <section id="overview" className="scroll-mt-24">
                <SectionHeader 
                    icon={<BugAntIcon className="w-8 h-8" />}
                    title="Общее описание"
                    subtitle="Универсальная система автоматизированного тестирования чат-ботов и промо-акций."
                />
                <ReadMore lines={3}>
                    <p>
                        <b>BOT_AUTO_TEST</b> — система, которая проверяет корректность условий акций, ответы бота и работу интерфейса. Проект построен на базе <b>Playwright / Selenium</b> для эмуляции действий пользователя и поддерживает работу через <b>REST <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm></b>. Финальные отчёты формируются <b><TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm>-моделью</b>, которая анализирует диалоги и сверяет их с загруженными файлами (например, <code>promo.json</code>).
                    </p>
                </ReadMore>
            </section>

            <section id="scenarios" className="scroll-mt-24">
                 <SectionHeader 
                    icon={<CogIcon className="w-8 h-8" />}
                    title="Гибкая настройка сценариев"
                    subtitle="Адаптация тестов под конкретные бизнес-правила."
                />
                <ul className="list-disc list-inside space-y-2">
                    <li>Сценарии могут задаваться в свободной форме или как фиксированный диалог.</li>
                    <li>Если есть список акций, <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> анализирует его, формирует тест-кейсы, задаёт вопросы и ожидает ответы.</li>
                    <li>Ответы автоматически сверяются с условиями акций, прописанными в правилах.</li>
                    <li>Метрики (корректность, полнота, исключения) формулируются в свободной форме.</li>
                </ul>
            </section>
            
            <section id="bot-types" className="scroll-mt-24">
                <SectionHeader 
                    icon={<ChatBubbleBottomCenterTextIcon className="w-8 h-8" />}
                    title="Поддержка разных типов ботов"
                    subtitle="Тестирование как для жёстких, так и для свободных сценариев."
                />
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="NLU-боты (жёсткие сценарии)">
                        <ul className="list-disc list-inside">
                          <li>Алгоритмические правила и предопределённые интенты.</li>
                          <li>Фиксированные сценарии: «вопрос → ожидаемый ответ».</li>
                          <li>Подходит для проверки точности скриптовых диалогов.</li>
                        </ul>
                    </InfoCard>
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="LLM-боты (свободная форма)">
                        <ul className="list-disc list-inside">
                          <li>Вариативные ответы на естественном языке.</li>
                          <li>Сценарии задаются в свободной форме, проверяется соответствие сути.</li>
                          <li>Метрики оценивают корректность и полноту, а не дословное совпадение.</li>
                        </ul>
                    </InfoCard>
                </div>
            </section>
            
            <section id="workflow" className="scroll-mt-24">
                 <SectionHeader 
                    icon={<PlayCircleIcon className="w-8 h-8" />}
                    title="Механика и флоу работы"
                    subtitle="От загрузки правил до финального отчета."
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

            <section id="example" className="scroll-mt-24">
                 <SectionHeader 
                    icon={<CodeBracketIcon className="w-8 h-8" />}
                    title="Пример диалога для LLM-анализа"
                    subtitle="Тестирование бота поддержки по акции «1+1=3»."
                />
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-slate-900/50 not-prose text-sm space-y-2 dark:border-slate-700">
                    <p><b className="text-green-700 dark:text-green-400">CLIENT:</b> Здравствуйте! Вчера я совершила покупку по акции «1+1=3», но бесплатный товар мне не был предоставлен. Все условия я выполнила. Подскажите, почему могла не сработать акция?</p>
                    <p><b className="text-gray-800 dark:text-slate-200">BOT:</b> Акция «1+1=3» работает так: при покупке трёх товаров один из них с наименьшей ценой предоставляется бесплатно. Проверьте, что в вашей покупке было ровно три товара и что они не относятся к исключённым брендам. Если все условия выполнены, рекомендую обратиться в службу поддержки магазина.</p>
                     <p><b className="text-green-700 dark:text-green-400">CLIENT:</b> Понятно, спасибо за разъяснение! Я покупала косметику других брендов. Что мне теперь делать, чтобы получить бесплатный товар?</p>
                     <p><b className="text-gray-800 dark:text-slate-200">BOT:</b> Если все условия соблюдены, вы можете обратиться в магазин с кассовым чеком. Сотрудники помогут подтвердить участие в акции и выдать бесплатный товар.</p>
                </div>
            </section>
        </div>
    </DocumentationPageLayout>
  );
};

export default BotAutoTestDocumentationPage;