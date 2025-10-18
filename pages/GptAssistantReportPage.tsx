import React, { useRef, useState } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, Table, TooltipTerm, LineChart, Modal } from '../components/DocumentationUIComponents';
import {
    LightBulbIcon,
    WrenchScrewdriverIcon,
    SparklesIcon,
    PuzzlePieceIcon,
    ChartBarIcon,
    MagnifyingGlassIcon,
    CheckBadgeIcon,
    CpuChipIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftRightIcon,
    ExclamationCircleIcon,
    ArrowLongDownIcon,
    CheckCircleIcon,
    ForwardIcon,
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';


const GptAssistantReportPage: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(contentRef, { targetSelector: '.fade-in-section' });

    const metricsDataWithHistory = [
        { 
            period: '23-28 июля', 'Точность': 5.0, 'Стилистика': 4.1, 'Автоматизация': 22, 'Стоимость': 15,
            title: "Этап I: Проверка гипотезы (MVP)",
            content: (
                <div className="space-y-4">
                    <p><b>Задача:</b> Проверить жизнеспособность RAG-архитектуры на реальных данных.</p>
                    <p><b>Действие:</b> Сформирована начальная база знаний путем автоматической обработки ~800 диалогов. Запущен MVP.</p>
                    <p><b>Результат:</b> Достигнута автоматизация 22% запросов, однако качественные метрики (Точность: 5.0, Стилистика: 4.1) оказались низкими.</p>
                    <p><b>Вывод:</b> Гипотеза подтверждена — RAG-подход работает. Однако стало очевидно, что качество ответов напрямую зависит от чистоты и структурированности данных в базе знаний.</p>
                </div>
            )
        },
        { 
            period: '29-31 июля', 'Точность': 4.86, 'Стилистика': 4.86, 'Автоматизация': 12, 'Стоимость': 12,
            title: "Этап II: Внедрение контроля качества",
            content: (
                 <div className="space-y-4">
                    <p><b>Задача:</b> Повысить доверие операторов к системе, отсекая заведомо некачественные ответы.</p>
                    <p><b>Действие:</b> Внедрена метрика уверенности (`score`). Ответы с `score &lt; 80` перестали предлагаться оператору.</p>
                    <p><b>Результат:</b> Уровень автоматизации ожидаемо снизился до 12%, так как система стала более "осторожной". Качество оставшихся подсказок повысилось.</p>
                    <p><b>Вывод:</b> Жертва количественных показателей ради качества оказалась оправданной. Это позволило перейти от "генерации любого ответа" к "предоставлению только надежных подсказок".</p>
                </div>
            )
        },
        { 
            period: '01-04 авг', 'Точность': 6.6, 'Стилистика': 6.9, 'Автоматизация': 24, 'Стоимость': 4.5,
            title: "Этап III: Оптимизация себестоимости",
            content: (
                <div className="space-y-4">
                    <p><b>Задача:</b> Снизить стоимость обработки одного тикета без потери качества.</p>
                    <p><b>Действие:</b> Разработан алгоритм предобработки, который очищал входящие запросы от HTML-разметки и другого "шума" перед отправкой в модель.</p>
                    <p><b>Результат:</b> Себестоимость запроса снизилась почти в 3 раза (с 12 ₽ до 4.5 ₽). Качество ответов выросло (Точность +1.74), так как модель получала более релевантные данные.</p>
                    <p><b>Вывод:</b> Фокус на качестве входящих данных (Data-Centric AI) оказался более эффективной стратегией, чем использование дорогих моделей для обработки "грязных" данных.</p>
                </div>
            )
        },
        { 
            period: '04-05 авг', 'Точность': 7.9, 'Стилистика': 7.8, 'Автоматизация': 35, 'Стоимость': 3,
            title: "Этап IV: Переход на Gemini 2.5 Pro (единая модель)",
            content: (
                <div className="space-y-4">
                    <p><b>Задача:</b> Упростить архитектуру и повысить предсказуемость, сохранив качество.</p>
                    <p><b>Действие:</b> Вся логика перенесена на одну модель — Gemini 2.5 Pro, которая выполняет RAG-поиск и генерацию в рамках одного запроса.</p>
                    <p><b>Результат:</b> Себестоимость одного тикета снизилась до <b>3 ₽</b>. Точность выросла до <b>7.9</b> (▲ +1.3), а уровень автоматизации достиг <b>35%</b>.</p>
                    <p><b>Вывод:</b> Единая, более мощная модель оказалась эффективнее каскада из нескольких моделей. Система стала быстрее, а её поведение — прозрачнее благодаря полным логам рассуждений.</p>
                </div>
            )
        }
    ];

    const chartConfig = {
        xKey: 'period',
        yKeys: [
            { key: 'Автоматизация', color: '#818CF8', label: 'Автоматизация (%)' },
            { key: 'Стоимость', color: '#F472B6', label: 'Стоимость (₽)', axis: 'right' }
        ],
        yAxisLabelLeft: 'Уровень автоматизации (%)',
        yAxisLabelRight: 'Стоимость за тикет (₽)',
    };
    
    const chartConfigQuality = {
        xKey: 'period',
        yKeys: [
            { key: 'Точность', color: '#60A5FA', label: 'Точность' },
            { key: 'Стилистика', color: '#34D399', label: 'Стилистика' }
        ],
        yAxisLabelLeft: 'Оценка (от 1 до 10)',
    };

    return (
        <DocumentationPageLayout title="GPT-ассистент: Технический отчёт">
            <div ref={contentRef} className="space-y-16">
                <section id="introduction" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<LightBulbIcon className="w-8 h-8" />}
                        title="1. Введение и цели проекта"
                        subtitle="Обзор проекта по автоматизации службы поддержки с помощью GPT-ассистента, его ключевые задачи и бизнес-цели."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose mt-8">
                        {/* Business Goals Card */}
                        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-200 dark:border-green-800 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mt-0 flex items-center gap-3">
                                <ChartBarIcon className="w-7 h-7" />
                                Бизнес-цели
                            </h3>
                            <p className="mt-4 text-base text-green-900 dark:text-green-200">
                                Главная бизнес-задача — автоматизировать ответы на часто задаваемые вопросы, чтобы:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-4 text-green-900 dark:text-green-200">
                                <li>Снизить операционную нагрузку на службу поддержки.</li>
                                <li>Сохранить высокое качество коммуникации с клиентами.</li>
                                <li>Ускорить время ответа на типовые запросы.</li>
                            </ul>
                        </div>
                        {/* Technical Goals Card */}
                        <div className="bg-sky-50 dark:bg-sky-900/30 rounded-lg p-6 border border-sky-200 dark:border-sky-800 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-sky-800 dark:text-sky-300 mt-0 flex items-center gap-3">
                                <CpuChipIcon className="w-7 h-7" />
                                Технические цели
                            </h3>
                            <p className="mt-4 text-base text-sky-900 dark:text-sky-200">
                                Техническая цель — создать масштабируемую и надежную систему, которая:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-4 text-sky-900 dark:text-sky-200">
                                <li>Работает на базе <TooltipTerm definition="Retrieval-Augmented Generation — это архитектура, которая объединяет мощь большой языковой модели (LLM) с внешней, постоянно обновляемой базой знаний.">RAG</TooltipTerm>-архитектуры.</li>
                                <li>Способна работать с динамически пополняемой базой знаний.</li>
                                <li>Обеспечивает предсказуемость и контроль качества ответов.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="problem" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="2. Проблема: дороговизна и непредсказуемость"
                        subtitle="Исходная проблема: высокие затраты и низкое качество ответов при использовании «чистых» LLM без RAG."
                    />
                    <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                        <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-800 h-full">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mt-0 flex items-center gap-3"><CurrencyDollarIcon className="w-7 h-7" />Высокая стоимость</h3>
                            <p className="mt-4 text-base text-red-900 dark:text-red-200">
                                Отправка полного текста каждого тикета в <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных.">LLM</TooltipTerm> приводила к высокой стоимости из-за большого количества токенов. Кроме того, "грязные" данные (HTML-разметка, спам) увеличивали объём и снижали качество.
                            </p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-6 border border-amber-200 dark:border-amber-800 h-full">
                            <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mt-0 flex items-center gap-3"><ChatBubbleLeftRightIcon className="w-7 h-7" />Низкое качество</h3>
                            <p className="mt-4 text-base text-amber-900 dark:text-amber-200">
                                Без доступа к внутренней базе знаний модель часто "галлюцинировала" или давала общие, бесполезные ответы. Это не решало проблему клиента и создавало дополнительную нагрузку на операторов.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="solution" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<SparklesIcon className="w-8 h-8" />}
                        title="3. Решение: Data-Centric подход и RAG"
                        subtitle="Переход к архитектуре, где качество данных и контекст важнее мощности модели."
                    />
                    <p>Ключевым решением стал переход к **Data-Centric AI**, где фокус смещается с подбора моделей на подготовку качественных данных. Была внедрена <TooltipTerm definition="Retrieval-Augmented Generation — это архитектура, которая объединяет мощь большой языковой модели (LLM) с внешней, постоянно обновляемой базой знаний.">RAG</TooltipTerm>-архитектура, которая позволяла модели получать релевантный контекст из внутренней базы знаний перед генерацией ответа. Это позволило:</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><b>Использовать более простые и дешёвые модели</b> (например, `gemini-2.5-flash`), так как основная "экспертиза" находилась в базе знаний.</li>
                        <li><b>Повысить точность ответов</b>, так как модель оперировала проверенными фактами, а не домыслами.</li>
                        <li><b>Снизить стоимость обработки</b> за счёт уменьшения объёма передаваемых данных.</li>
                    </ul>
                </section>

                <section id="architecture" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="4. Эволюция архитектуры"
                        subtitle="Как система перешла от сложного каскада моделей к одной, более мощной и предсказуемой."
                    />
                    <div className="flex flex-col items-center gap-6 not-prose">
                        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-amber-500/30 dark:border-amber-500/40 shadow-md">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-3">
                                <ExclamationCircleIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                <span>Ранняя архитектура (Каскад моделей)</span>
                            </h3>
                            <p className="mt-3 text-base text-slate-700 dark:text-slate-300">Изначально система использовала связку из трёх моделей для баланса скорости и качества: быстрый RAG-поиск, уточнение во внешних источниках и финальная стилизация.</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><b>Недостаток:</b> Сложность, медлительность и избыточность по мере роста RAG-базы.</p>
                        </div>
                        
                        <ArrowLongDownIcon className="w-10 h-10 text-gray-400 dark:text-slate-500 my-2" />

                        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg p-6 border-2 border-green-500/40 dark:border-green-500/50 shadow-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-3">
                                <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                <span>Текущая архитектура (Рассуждающая модель)</span>
                            </h3>
                            <p className="mt-3 text-base text-slate-700 dark:text-slate-300">Архитектура была упрощена до одной, более мощной модели — <strong>Gemini 2.5 Pro</strong>. Она выполняет всю цепочку рассуждений: анализ, поиск, сравнение кандидатов и генерацию ответа.</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4"><b>Преимущества:</b> Система стала <strong>быстрее</strong>, <strong>точнее</strong> и <strong>предсказуемее</strong>.</p>
                        </div>
                    </div>
                </section>

                <section id="metrics" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="5. Динамика метрик"
                        subtitle="Визуализация ключевых показателей эффективности (KPI) на разных этапах развития проекта."
                    />
                    <p className="mb-8">На графиках ниже представлена динамика ключевых метрик. Нажмите на любую точку на графике, чтобы увидеть детальное описание соответствующего этапа. Это позволяет наглядно отследить, как каждое архитектурное изменение влияло на итоговые результаты.</p>
                    
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Количественные метрики (Эффективность)</h3>
                    <LineChart data={metricsDataWithHistory} config={chartConfig} onPointClick={(data) => setModalContent(data)} />
                    
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-4">Качественные метрики (Оценка операторов)</h3>
                    <LineChart data={metricsDataWithHistory} config={chartConfigQuality} onPointClick={(data) => setModalContent(data)} />

                    <div className="mt-8">
                         <InfoCard icon={<MagnifyingGlassIcon className="w-8 h-8" />} title="Сводная таблица результатов">
                             <div className="overflow-x-auto">
                                <Table 
                                    headers={['Период', 'Модель', 'Точность', 'Стилистика', 'Автоматизация', 'Стоимость ₽']}
                                    data={[
                                        ['23-28 июля', 'gemini-2.5-flash', '5.00', '4.10', '22%', '15 ₽'],
                                        ['29-31 июля', 'gemini-2.5-flash', '4.86', '4.86', '12%', '12 ₽'],
                                        ['01-04 авг', 'gemini-2.5-flash', '6.60', '6.90', '24%', '4.5 ₽'],
                                        ['04-05 авг', 'gemini-2.5-pro', '7.90', '7.80', '35%', '3 ₽'],
                                    ]}
                                />
                            </div>
                        </InfoCard>
                    </div>
                </section>

                <section id="conclusions" className="scroll-mt-24 fade-in-section">
                    <SectionHeader 
                        icon={<CheckBadgeIcon className="w-8 h-8" />}
                        title="6. Заключение и выводы"
                        subtitle="Итоговая оценка проекта, ключевые инсайты и рекомендации для дальнейшего развития."
                    />
                    <div className="grid md:grid-cols-2 gap-6 not-prose">
                        <InfoCard icon={<CpuChipIcon className="w-7 h-7" />} title="Технические выводы">
                            <ul className="list-disc list-inside space-y-3 text-base">
                                <li><strong>RAG как индустриальный стандарт:</strong> Для задач, требующих высокой точности и контекстуальной осведомленности, RAG-архитектура является не просто опцией, а необходимым стандартом.</li>
                                <li><strong>Приоритет данных над моделью (Data-Centric AI):</strong> Ключевой инсайт проекта: инвестиции в качество и чистоту базы знаний дают значительно больший прирост производительности, чем простое переключение на более дорогие LLM.</li>
                                <li><strong>Эффективность единой модели:</strong> Одна мощная, "рассуждающая" модель (Gemini 2.5 Pro) оказалась производительнее, экономичнее и предсказуемее сложного каскада из нескольких специализированных моделей.</li>
                            </ul>
                        </InfoCard>
                        <InfoCard icon={<CurrencyDollarIcon className="w-7 h-7" />} title="Бизнес-выводы">
                            <ul className="list-disc list-inside space-y-3 text-base">
                                <li><strong>Пятикратное снижение затрат:</strong> Целенаправленная оптимизация архитектуры и фокус на Data-Centric подходе позволили снизить себестоимость обработки одного тикета в 5 раз — с 15 ₽ до 3 ₽.</li>
                                <li><strong>Измеримый рост эффективности:</strong> Уровень автоматизации вырос с 22% до 35% (+13 п.п.), при этом качество (`Точность` +2.9, `Стилистика` +3.7) и доверие к подсказкам значительно повысились.</li>
                                <li><strong>Прозрачность и управляемость:</strong> Внедрение метрики `score` и детальных JSON-логов превратило "черный ящик" в управляемую систему, которой операторы могут доверять.</li>
                            </ul>
                        </InfoCard>
                    </div>
                    <div className="mt-8 not-prose">
                        <InfoCard icon={<ForwardIcon className="w-7 h-7" />} title="Рекомендации и следующие шаги">
                            <ul className="list-disc list-inside space-y-3 text-base">
                                <li><strong>Непрерывное обогащение RAG-базы:</strong> Регулярно анализировать тикеты с низким `score` и использовать их для пополнения и уточнения базы знаний, создавая цикл самосовершенствования.</li>
                                <li><strong>Внедрение проактивных подсказок:</strong> Использовать саммари из истории обращений для генерации проактивных предложений оператору (например, скидка для клиента с повторной проблемой).</li>
                                <li><strong>Интеграция с CRM:</strong> Подключить ассистента к CRM для получения дополнительного контекста о клиенте (статус, история покупок), что позволит генерировать еще более персонализированные ответы.</li>
                            </ul>
                        </InfoCard>
                    </div>
                </section>
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
        </DocumentationPageLayout>
    );
};

export default GptAssistantReportPage;
