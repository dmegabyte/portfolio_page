
import React, { useRef } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm } from '../components/DocumentationUIComponents';
import { 
    CubeTransparentIcon, 
    PuzzlePieceIcon, 
    ArrowPathIcon, 
    DocumentTextIcon, 
    ChartBarIcon, 
    MagnifyingGlassIcon,
    WrenchScrewdriverIcon,
    CpuChipIcon,
    UserGroupIcon,
    CircleStackIcon,
    SparklesIcon,
    BoltIcon,
    BugAntIcon,
    PresentationChartLineIcon,
    ShieldCheckIcon,
    CheckBadgeIcon,
    LockClosedIcon,
    CommandLineIcon
} from '@heroicons/react/24/outline';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const ScenarioNexusDocumentationPage: React.FC = () => {
    const workflowRef = useRef<HTMLDivElement>(null);
    useAnimateOnScroll(workflowRef, { targetSelector: '.workflow-stage' });

    const victoryStages = [
        {
            icon: <DocumentTextIcon className="w-6 h-6" />,
            title: "Уровень 1. Декомпозиция сценария (HTML)",
            content: "Глубокий анализ традиционных скриптов операторов. Мы разбираем их на атомарные вопросы и условия перехода, создавая базу для интеллектуальной автоматизации."
        },
        {
            icon: <ArrowPathIcon className="w-6 h-6" />,
            title: "Уровень 2. Трансформация: Schema Mapping",
            content: () => (
                <>
                    Конвертация логики в <TooltipTerm definition="JSON Schema — это мощный инструмент для проверки структуры данных JSON. В Scenario Nexus она определяет правила поведения AI-агентов.">JSON Schema</TooltipTerm>. Сценарий превращается в строгий граф состояний, где каждый узел имеет четкие правила валидации ввода и предсказуемые выходы.
                </>
            )
        },
        {
            icon: <CircleStackIcon className="w-6 h-6" />,
            title: "Уровень 3. Nexus CRM: Слой управления",
            content: "Интеграция с CRM как единой консолью управления. Любое изменение бизнес-правила в интерфейсе CRM автоматически пересобирает логику всех подключенных AI-агентов в реальном времени."
        },
        {
            icon: <CpuChipIcon className="w-6 h-6" />,
            title: "Уровень 4. Динамическое исполнение (Runtime)",
            content: () => (
                <>
                    <code className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono text-sm border border-indigo-500/20">AI-агенты</code> получают не просто текстовый промпт, а текущее состояние <code className="bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono text-sm border border-indigo-500/20">JSON Schema</code> графа. Это гарантирует 100% следование сценарию и полностью исключает логический дрейф модели.
                </>
            )
        },
        {
            icon: <PresentationChartLineIcon className="w-6 h-6" />,
            title: "Уровень 5. Сбор и агрегация метрик",
            content: "Каждый переход по графу логируется напрямую в CRM. Мы получаем точную воронку прохождения сценария в разрезе каждого вопроса, ответа и возникшего затруднения."
        },
        {
            icon: <MagnifyingGlassIcon className="w-6 h-6" />,
            title: "Уровень 6. Sentinel QA: Валидация галлюцинаций",
            content: () => (
                 <>
                    Специализированный <TooltipTerm definition="Sentinel QA — это модуль вторичной проверки, который сравнивает ответ AI-агента с исходным JSON-чертежом, блокируя любые отклонения от логики.">Sentinel QA</TooltipTerm> агент анализирует контекст диалога на предмет соответствия заданному узлу графа и юридическим нормам.
                </>
            )
        },
        {
            icon: <ChartBarIcon className="w-6 h-6" />,
            title: "Уровень 7. Бизнес-аналитика и BI",
            content: "Финальная выгрузка очищенных данных в BI-системы. Профессиональный анализ эффективности сценариев и поиск «бутылочных горлышек» в коммуникации с клиентами."
        }
    ];

    return (
        <DocumentationPageLayout title="Scenario Nexus: Ядро сценарного интеллекта">
            <div className="space-y-24 pb-20">
                
                {/* 1. Концепция - Улучшенная иерархия */}
                <section id="concept" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CubeTransparentIcon className="w-8 h-8" />}
                        title="1. Концепция Scenario Nexus"
                        subtitle="Создание детерминированной среды для AI-коммуникаций на основе строгих схем данных и машинной логики."
                    />
                    <div className="mt-8">
                        <InfoCard icon={<SparklesIcon className="w-8 h-8" />} title="Ключевые выводы">
                            <p className="text-xl leading-relaxed text-slate-300">
                                Scenario Nexus — это архитектурный узел, решающий фундаментальную проблему непредсказуемости LLM в бизнес-процессах. Мы превращаем «творческий» AI в <b>строгий исполнительный механизм</b>, который полностью управляется бизнесом через CRM и валидируется на каждом микро-шаге. Это переход от промптов к архитектуре.
                            </p>
                        </InfoCard>
                    </div>
                </section>

                {/* 2. Бизнес-задача - Исправление переполнения блоков */}
                <section id="business-context" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<UserGroupIcon className="w-8 h-8" />}
                        title="2. Бизнес-задача: Управляемость AI"
                        subtitle="Почему стандартные чат-боты на базе длинных промптов больше не жизнеспособны в серьезном бизнесе."
                    />
                    <div className="grid md:grid-cols-2 gap-8 mt-10 not-prose">
                        <div className="group bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-800 hover:border-red-500/30 transition-all duration-500 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                                    <CommandLineIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">Проблема: Хаос</h3>
                            </div>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Обычные боты полагаются на объемные системные инструкции. При усложнении сценария AI неизбежно начинает путать шаги, «забывать» важные вопросы или давать юридически неверные обещания, что критично для репутации.
                            </p>
                        </div>
                        <div className="group bg-slate-900/60 backdrop-blur-xl rounded-[32px] p-10 border border-slate-800 hover:border-violet-500/30 transition-all duration-500 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                    <BoltIcon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black text-white tracking-tight">Решение: Детерминизм</h3>
                            </div>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Scenario Nexus заменяет один бесконечный промпт набором микро-инструкций, привязанных к текущему узлу JSON-графа. AI видит только то, что ему разрешено на текущем шаге. Галлюцинации блокируются на уровне схемы.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. Архитектурный конвейер - Pixel Perfect Timeline */}
                <section id="pipeline" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<BoltIcon className="w-8 h-8" />}
                        title="3. Архитектурный конвейер"
                        subtitle="Путь трансформации данных от идеи до финального аналитического отчета."
                    />
                    
                    <div ref={workflowRef} className="mt-12 space-y-8 not-prose">
                        {victoryStages.map((stage, index) => (
                            <div 
                                key={index} 
                                className="workflow-stage relative group"
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="flex items-start gap-8 p-8 md:p-10 bg-slate-900/40 backdrop-blur-md rounded-[32px] border border-slate-800 group-hover:bg-slate-900/60 group-hover:border-violet-500/40 transition-all duration-500 overflow-hidden">
                                    {/* Number Badge */}
                                    <div className="hidden sm:flex flex-shrink-0 w-14 h-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-500 font-black text-xl border border-slate-700 group-hover:bg-violet-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        {index + 1}
                                    </div>
                                    
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                                                {stage.icon}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                                                {stage.title}
                                            </h3>
                                        </div>
                                        <div className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
                                            {typeof stage.content === 'function' ? stage.content() : stage.content}
                                        </div>
                                    </div>

                                    {/* Subtle decorative glow */}
                                    <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-violet-500/5 blur-[80px] rounded-full group-hover:bg-violet-500/10 transition-colors duration-700"></div>
                                </div>
                                
                                {index < victoryStages.length - 1 && (
                                    <div className="absolute left-14 bottom-[-32px] hidden sm:block w-px h-8 bg-gradient-to-b from-violet-500/50 to-transparent"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Sentinel QA - Премиальный блок с неоновым свечением */}
                <section id="qa-module" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ShieldCheckIcon className="w-8 h-8" />}
                        title="4. Sentinel QA: Тотальный контроль"
                        subtitle="Алгоритмическая проверка семантики на строгое соответствие логическому графу."
                    />
                    <div className="relative mt-10 p-1 md:p-px bg-gradient-to-br from-violet-500/40 via-transparent to-emerald-500/40 rounded-[40px] shadow-3xl">
                        <div className="bg-slate-950/90 backdrop-blur-3xl rounded-[39px] p-8 md:p-16 relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 p-4 opacity-10">
                                <ShieldCheckIcon className="w-96 h-96 text-violet-500 animate-pulse-slow" />
                            </div>
                            
                            <div className="relative z-10 max-w-3xl">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase">
                                    Автономный Аудитор
                                </h3>
                                <p className="text-xl text-slate-300 mb-12 leading-relaxed font-medium">
                                    Sentinel QA — это не просто AI, это параллельный слой логической фильтрации. Он работает асинхронно с основным ботом, выполняя три критические функции надзора:
                                </p>
                                
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <LockClosedIcon className="w-8 h-8 text-violet-400 mb-4" />
                                        <h4 className="font-bold text-white text-lg mb-2">Compliance</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">Проверка на юридические и бизнес-регламенты в каждом ответе.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <CpuChipIcon className="w-8 h-8 text-sky-400 mb-4" />
                                        <h4 className="font-bold text-white text-lg mb-2">Logic Guard</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">Блокировка действий, выходящих за рамки активного JSON-узла.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <BugAntIcon className="w-8 h-8 text-emerald-400 mb-4" />
                                        <h4 className="font-bold text-white text-lg mb-2">Hallucination Trap</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">Выявление выдуманных фактов через кросс-чекинг с базой CRM.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Инженерное превосходство - Bento Grid */}
                <section id="results" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<PresentationChartLineIcon className="w-8 h-8" />}
                        title="5. Инженерное превосходство"
                        subtitle="Бизнес-результаты внедрения архитектуры Scenario Nexus."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 not-prose">
                        {[
                            { title: "Масштабируемость", text: "Один сценарий управляет сотнями ботов без потери качества.", icon: CpuChipIcon },
                            { title: "Agility", text: "Любые правки в CRM внедряются мгновенно без релиза кода.", icon: WrenchScrewdriverIcon },
                            { title: "Reliability", text: "Логический контроль схемы исключает 99% галлюцинаций.", icon: ShieldCheckIcon },
                            { title: "Visibility", text: "Прозрачность каждого шага AI для аналитики бизнеса.", icon: PresentationChartLineIcon }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[32px] bg-slate-900/60 border border-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <item.icon className="w-10 h-10 text-violet-500 mb-6" />
                                <h4 className="text-xl font-black text-white mb-2 tracking-tight">{item.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. Итоговое резюме */}
                <section id="conclusion" className="scroll-mt-24">
                    <div className="p-10 md:p-16 rounded-[48px] bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-violet-500"></div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">
                            Итоговая Архитектура
                        </h2>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-300 italic max-w-5xl">
                            Scenario Nexus — это фундаментальный переход от хаотичного промпт-инжиниринга к строгой сценарной архитектуре. Мы создаем системы, где AI служит надежным инструментом исполнения бизнес-логики, а не источником непредсказуемой неопределенности.
                        </p>
                        <div className="mt-12 flex flex-wrap gap-4">
                            <span className="px-6 py-2 rounded-full bg-violet-500/20 text-violet-300 text-xs font-black uppercase tracking-widest border border-violet-500/30">Determined Logic</span>
                            <span className="px-6 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-500/30">Safe Execution</span>
                            <span className="px-6 py-2 rounded-full bg-sky-500/20 text-sky-300 text-xs font-black uppercase tracking-widest border border-sky-500/30">Enterprise Scale</span>
                        </div>
                    </div>
                </section>

            </div>
        </DocumentationPageLayout>
    );
};

export default ScenarioNexusDocumentationPage;
