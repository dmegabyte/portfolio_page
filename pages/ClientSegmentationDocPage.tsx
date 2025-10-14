import React, { useState, ReactNode, useRef } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, Modal, CollapsibleSection } from '../components/DocumentationUIComponents';
import { 
    RocketLaunchIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, TableCellsIcon, 
    ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon, CpuChipIcon,
    ScaleIcon, UserGroupIcon, IdentificationIcon, FunnelIcon, ChartBarIcon, CalendarDaysIcon, 
    LightBulbIcon, SparklesIcon, ArchiveBoxIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon, ArrowLongDownIcon, StarIcon, UsersIcon, LifebuoyIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowLongRightIcon, NoSymbolIcon, UserCircleIcon, QuestionMarkCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon
} from '@heroicons/react/24/outline';
import { glossary } from '../data/glossary';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const InteractiveWorkflowDiagram: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);
    const diagramRef = useRef<HTMLDivElement>(null);

    // This custom hook now handles the intersection observer logic for scroll animations,
    // making the component cleaner and the logic reusable, per Principle #8.
    useAnimateOnScroll(diagramRef, { targetSelector: '.workflow-stage' });

    const modalDescriptions = {
        segmentation: {
            title: "Подробнее о сегментации",
            content: (
                <div className="space-y-4 text-base">
                    <p>Это первый и самый важный шаг, на котором система формирует 360-градусный профиль каждого клиента. Анализируются десятки параметров, включая:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b>История визитов и покупок:</b> Как часто клиент приходит? Что покупает?</li>
                        <li><b>Лояльность:</b> Это новый клиент или постоянный?</li>
                        <li><b>Активность:</b> Как давно был последний контакт?</li>
                        <li><b>Потребительские предпочтения:</b> Какие категории услуг ему интересны?</li>
                    </ul>
                    <p>На основе этих данных каждому клиенту присваивается уникальный набор сегментов, что позволяет подобрать для него наиболее релевантное и своевременное предложение.</p>
                </div>
            )
        },
        dateCalculation: {
            title: "Подробнее о расчете даты",
            content: (
                 <div className="space-y-4 text-base">
                    <p>Система не отправляет сообщения вслепую, а прогнозирует оптимальный момент для контакта. Логика зависит от типа клиента:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b>Для "Повторных" клиентов:</b> Система анализирует их персональную историю визитов, находит самый короткий интервал между ними (<TooltipTerm definition="Самый короткий промежуток времени между двумя последовательными визитами конкретного клиента.">minInterval</TooltipTerm>) и планирует отправку за 3 дня до истечения этого срока. Это позволяет работать на опережение.</li>
                        <li><b>Для "Разовых" клиентов:</b> Так как у них нет своей истории, система использует средний интервал по всей базе (<TooltipTerm definition="Среднестатистический промежуток времени между визитами для всех клиентов.">avgInterval</TooltipTerm>), чтобы сделать наиболее вероятное предположение о следующем визите.</li>
                    </ul>
                    <p>Такой подход значительно повышает шансы на возврат клиента.</p>
                </div>
            )
        },
        messageAssembly: {
            title: "Подробнее о сборке сообщения",
            content: (
                <div className="space-y-4 text-base">
                    <p>Когда сегменты определены и дата рассчитана, система собирает финальное сообщение как конструктор:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li><b>Выбор промо-акции:</b> Сначала система ищет персональное предложение. Если его нет, подбирается общая акция, подходящая для сегмента клиента.</li>
                        <li><b>Выбор шаблона текста:</b> Из базы данных выбирается наиболее релевантный текстовый шаблон, который соответствует профилю клиента (например, текст для "потерянного" клиента будет отличаться от текста для "активного").</li>
                        {/* FIX: The placeholders were causing a JSX parsing error. I've replaced the template literals with simple string literals to ensure they are parsed correctly. */}
                        <li><b>Замена плейсхолдеров:</b> Система вставляет в текст персональные данные: имя клиента (<code>{'{{NAME}}'}</code>), название акции (<code>{'{{TEXT_promo}}'}</code>) и другие переменные.</li>
                    </ol>
                    <p>В результате получается уникальное, личное сообщение, готовое к отправке.</p>
                </div>
            )
        }
    };

    return (
        <div className="my-8 not-prose" ref={diagramRef}>
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">Полный цикл работы AI-маркетолога</h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Stage 1: Data Sources */}
                    <div className="text-center w-48 workflow-stage" style={{ transitionDelay: '0ms' }}>
                        <div className="flex justify-center items-center mx-auto w-16 h-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md">
                            <CircleStackIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">Источники данных</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">YClients, Google Sheets</p>
                    </div>
                    
                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '150ms' }} />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '150ms' }} />

                    {/* Stage 2: AI Core */}
                    <div className="flex-grow bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-inner w-full md:w-auto workflow-stage" style={{ transitionDelay: '300ms' }}>
                        <h4 className="font-semibold text-center text-gray-800 dark:text-slate-200 mb-3">Ядро AI-маркетолога</h4>
                        <div className="flex flex-col sm:flex-row justify-around gap-2">
                             <button onClick={() => setModalContent(modalDescriptions.segmentation)} className="flex-1 text-center p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <div className="flex flex-col items-center justify-center">
                                    <UserGroupIcon className="w-6 h-6 text-gray-600 dark:text-slate-400 mb-1"/>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">1. Сегментация</span>
                                </div>
                            </button>
                             <button onClick={() => setModalContent(modalDescriptions.dateCalculation)} className="flex-1 text-center p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <div className="flex flex-col items-center justify-center">
                                    <CalendarDaysIcon className="w-6 h-6 text-gray-600 dark:text-slate-400 mb-1"/>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">2. Расчет даты</span>
                                </div>
                            </button>
                             <button onClick={() => setModalContent(modalDescriptions.messageAssembly)} className="flex-1 text-center p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <div className="flex flex-col items-center justify-center">
                                    <SparklesIcon className="w-6 h-6 text-gray-600 dark:text-slate-400 mb-1"/>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">3. Сборка</span>
                                </div>
                            </button>
                        </div>
                    </div>

                     <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '450ms' }}/>
                     <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '450ms' }} />

                    {/* Stage 3: Send Channel */}
                    <div className="text-center w-48 workflow-stage" style={{ transitionDelay: '600ms' }}>
                         <div className="flex justify-center items-center mx-auto w-16 h-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md">
                            <PaperAirplaneIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">Канал отправки</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">WAHelp API</p>
                    </div>

                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '750ms' }}/>
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '750ms' }} />

                    {/* Stage 4: Result */}
                     <div className="text-center w-48 workflow-stage" style={{ transitionDelay: '900ms' }}>
                        <div className="flex justify-center items-center mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-full shadow-md">
                            <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold mt-3 text-green-800 dark:text-green-300">Результат</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Персональная рассылка</p>
                    </div>

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


const ClientSegmentationDocumentationPage: React.FC = () => {

  return (
    <DocumentationPageLayout title="AI-маркетолог">
      <div className="space-y-16">

        <section id="concept" className="scroll-mt-24">
            <SectionHeader 
                icon={<RocketLaunchIcon className="w-8 h-8" />}
                title="1. Концепция и бизнес-задача"
                subtitle="Описание автономной системы, которая анализирует клиентскую базу, автоматически сегментирует пользователей и запускает персонализированные маркетинговые кампании. Цель — повысить вовлеченность и LTV, минимизировав ручное управление."
            />
             <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li><b>Полная автоматизация:</b> Система автономно выполняет весь цикл от анализа данных до отправки сообщений, работая 24/7.</li>
                    <li><b>Глубокая сегментация:</b> Клиенты категоризируются по 7+ параметрам, включая поведение, лояльность и предпочтения, что позволяет создавать гипер-персонализированные предложения.</li>
                    <li><b>Предиктивная аналитика:</b> Вместо массовых рассылок система рассчитывает оптимальный день и время для отправки сообщения каждому клиенту индивидуально.</li>
                    <li><b>Гибкость и управляемость:</b> Вся логика, шаблоны и промо-акции управляются из простого и понятного интерфейса Google Sheets.</li>
                </ul>
            </InfoCard>
        </section>

        <section id="workflow-diagram" className="scroll-mt-24">
            <SectionHeader
                icon={<ArrowPathIcon className="w-8 h-8" />}
                title="2. Визуальная схема работы"
                subtitle="Пошаговый процесс обработки данных от получения до отправки персонализированного сообщения."
            />
            <InteractiveWorkflowDiagram />
        </section>

        <section id="core-principles" className="scroll-mt-24">
             <SectionHeader 
                icon={<CpuChipIcon className="w-8 h-8" />}
                title="3. Ключевые принципы и архитектура"
                subtitle="Фундаментальные решения, на которых построена вся система для обеспечения надежности, скорости и масштабируемости."
            />
            <div className="space-y-8">
                <CollapsibleSection title={<><ShieldCheckIcon className="w-6 h-6 inline-block mr-2" /><span>Принцип «idFirst»: Скорость и надежность</span></>}>
                    <p>Это ключевой архитектурный принцип системы. Вместо того чтобы работать с медленными и подверженными ошибкам текстовыми строками (например, "Повторный клиент"), все ключевые сегменты представляются **уникальными числовыми идентификаторами (ID)**.</p>
                    <h4 className="font-bold mt-4">Как это работает?</h4>
                    <p>Каждому сегменту (например, "Тип клиента", "Лояльность") присваивается свой ID в специальном листе «Справочник». Когда скрипт анализирует клиента, он не сравнивает строки, а работает с быстрыми и точными числовыми ID.</p>
                    <h4 className="font-bold mt-4">Почему это важно?</h4>
                    <ul className="list-disc list-inside mt-2">
                        <li><b>Скорость:</b> Операции с числами в Google Apps Script выполняются на порядки быстрее, чем со строками.</li>
                        <li><b>Надежность:</b> Исключаются ошибки из-за опечаток, лишних пробелов или разного регистра в названиях сегментов.</li>
                        <li><b>Масштабируемость:</b> Систему легко расширять, добавляя новые сегменты без необходимости переписывать сложную логику сравнения строк.</li>
                    </ul>
                </CollapsibleSection>

                 <CollapsibleSection title={<><ArchiveBoxIcon className="w-6 h-6 inline-block mr-2" /><span>Принципы фильтрации данных: Целостность и качество</span></>}>
                     <p>Для обеспечения точности анализа, система применяет строгие правила к исходным данным.</p>
                     <ul className="list-disc list-inside mt-2 space-y-2">
                         <li><b>Принцип полноты данных:</b> Анализируется вся доступная история визитов клиента, без временных ограничений. Это позволяет строить максимально точные модели поведения.</li>
                         <li><b>Принцип согласованности данных:</b> Перед анализом статусы визитов (например, "пришел", "подтвердил") приводятся к единому формату (нормализуются). Это исключает ошибки из-за расхождений в наименованиях.</li>
                          <li><b>Принцип качества контента:</b> Текстовые поля (например, отзывы или комментарии) считаются валидными и учитываются в анализе, только если их длина превышает 10 символов, что отсеивает бессодержательные записи.</li>
                     </ul>
                 </CollapsibleSection>
            </div>
        </section>
        
        <section id="segmentation" className="scroll-mt-24">
            <SectionHeader 
                icon={<UserGroupIcon className="w-8 h-8" />}
                title="4. Сегментация клиентов: Полный разбор"
                subtitle="Детальное описание многоуровневого процесса автоматической категоризации клиентов, который лежит в основе персонализации."
            />
            
            <div className="space-y-12">
                {/* Client Type */}
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                     <div className="flex items-start gap-4">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700"><IdentificationIcon className="w-8 h-8 text-indigo-500" /></div>
                        <div>
                            <h3 className="text-xl font-bold mt-0 text-gray-800 dark:text-slate-200">1. Определение типа клиента (Приоритетная логика)</h3>
                            <p className="text-gray-600 dark:text-slate-400">Система присваивает клиенту тип по первому совпадению в строгой иерархии:</p>
                        </div>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 mt-4 pl-4 font-medium text-gray-700 dark:text-slate-300">
                        <li className="p-2 rounded-md border-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"><span className="font-bold">Посетитель (Visitor):</span> Высший приоритет. Если у клиента есть хотя бы один визит со статусом 'пришел'.</li>
                        <li className="p-2"><span className="font-bold">Покупатель (Buyer):</span> Если визитов нет, но есть хотя бы одна покупка.</li>
                        <li className="p-2"><span className="font-bold">Лид (Lead):</span> Если нет ни визитов, ни покупок, но есть запись на услугу (даже отмененная).</li>
                        <li className="p-2"><span className="font-bold">Неизвестно:</span> Если ни одно из вышеперечисленных условий не выполнено.</li>
                    </ol>
                </div>

                 {/* Intervals */}
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700"><ChartBarIcon className="w-8 h-8 text-indigo-500" /></div>
                        <div>
                            <h3 className="text-xl font-bold mt-0 text-gray-800 dark:text-slate-200">2. Расчет интервалов визитов</h3>
                            <p className="text-gray-600 dark:text-slate-400">Это ключевые метрики для прогнозирования. Система вычисляет два значения для каждого клиента:</p>
                        </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 mt-4 pl-4 text-gray-700 dark:text-slate-300">
                        <li><b>Минимальный интервал (<TooltipTerm definition={glossary.minInterval}>minInterval</TooltipTerm>):</b> Самый короткий промежуток времени между двумя последовательными визитами. Показывает личный "ритм" клиента.</li>
                        <li><b>Средний интервал (<TooltipTerm definition={glossary.avgInterval}>avgInterval</TooltipTerm>):</b> Среднестатистический промежуток между визитами для всех клиентов. Используется, когда личной истории недостаточно.</li>
                    </ul>
                </div>

                {/* Profile Components */}
                 <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700"><UserCircleIcon className="w-8 h-8 text-indigo-500" /></div>
                        <div>
                            <h3 className="text-xl font-bold mt-0 text-gray-800 dark:text-slate-200">3. Компоненты профиля клиента</h3>
                            <p className="text-gray-600 dark:text-slate-400">На основе истории визитов и покупок система собирает детальный профиль:</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {/* Consumption Type */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                            <h4 className="font-bold flex items-center gap-2"><FunnelIcon className="w-5 h-5"/>Тип потребления</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Определяет предпочтения клиента. ЕСЛИ доля 'Массаж' ≥ 80% → <span className="font-semibold">Массажник</span>. ИНАЧЕ ЕСЛИ доля 'СПА' ≥ 80% → <span className="font-semibold">Спашник</span>. ИНАЧЕ → <span className="font-semibold">Универсал</span>.</p>
                        </div>
                         {/* Loyalty */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                            <h4 className="font-bold flex items-center gap-2"><StarIcon className="w-5 h-5"/>Лояльность</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Отражает количество визитов. <span className="font-semibold">Разовые</span> (1), <span className="font-semibold">Повторные</span> (2-4) и <span className="font-semibold">Постоянные</span> (5+).</p>
                        </div>
                         {/* Activity */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                             <h4 className="font-bold flex items-center gap-2"><ClockIcon className="w-5 h-5"/>Активность</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Как давно был последний контакт. <span className="text-green-700 dark:text-green-400 font-semibold">Активный</span> (≤ 90 дн.), <span className="text-amber-700 dark:text-amber-400 font-semibold">Пассивный</span> (91-270 дн.), <span className="text-red-700 dark:text-red-400 font-semibold">Потерянный</span> (&gt; 270 дн.).</p>
                        </div>
                         {/* Price Segment */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                            <h4 className="font-bold flex items-center gap-2"><ScaleIcon className="w-5 h-5"/>Ценовой сегмент</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Рассчитывается на основе среднего чека клиента по сравнению с общей базой: <span className="font-semibold">Дорогой</span>, <span className="font-semibold">Средний</span>, <span className="font-semibold">Недорогой</span>.</p>
                        </div>
                         {/* Frequency */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
                            <h4 className="font-bold flex items-center gap-2"><ArrowPathRoundedSquareIcon className="w-5 h-5"/>Частота</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1"><span className="font-semibold">Постоянные</span> (2+ визита/3 мес.), <span className="font-semibold">Бывшие постоянные</span> (были активны, но не сейчас), <span className="font-semibold">Редкие/Разовые</span> (все остальные).</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="message-assembly" className="scroll-mt-24">
            <SectionHeader 
                icon={<SparklesIcon className="w-8 h-8" />}
                title="5. Сборка сообщения: от промо до текста"
                subtitle="Конвейер, который превращает сырые данные и сегменты в готовое к отправке, персонализированное сообщение."
            />
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">ШАГ 1: Выбор промо-акции (Функция `selectPromo`)</h3>
                    <p className="mt-2">Система ищет наиболее релевантную акцию, используя двухступенчатую логику с четкими приоритетами:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-4 pl-4 text-gray-700 dark:text-slate-300">
                        <li><b>Приоритетный поиск в «Персонализации»:</b> Сначала система ищет уникальное, "хирургически точное" предложение. Она проверяет, есть ли в листе «Персонализация» строка, которая на 100% соответствует ВСЕМ параметрам профиля клиента (тип, лояльность, активность и т.д.).</li>
                        <li><b>Резервный поиск в «Акциях»:</b> Если персональная акция не найдена, система переходит к плану "Б". Она ищет в листе «Акции» общую, групповую акцию, которая подходит для сегмента клиента (например, "для всех потерянных" или "для всех с типом потребления Массаж").</li>
                    </ol>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">ШАГ 2: Выбор шаблона (Функция `selectTemplate`)</h3>
                    <p className="mt-2">После выбора акции система подбирает для нее текстовую "обертку". Она ищет в листе «Шаблоны» наиболее подходящий шаблон, фильтруя доступные варианты по параметрам профиля клиента. Это гарантирует, что тон и содержание сообщения будут соответствовать его статусу (например, "потерянному" клиенту будет отправлен текст с акцентом на возвращение).</p>
                </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">ШАГ 3: Сборка и финальное решение</h3>
                     <div className="grid md:grid-cols-2 gap-6 mt-4 not-prose">
                        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            <h4 className="font-semibold flex items-center gap-2 text-green-800 dark:text-green-300"><CheckCircleIcon className="w-5 h-5"/>СЦЕНАРИЙ: УСПЕХ</h4>
                            {/* FIX: The placeholders were causing a JSX parsing error. I've replaced them with code tags containing string literals to ensure they are parsed correctly. */}
                            <p className="mt-2 text-green-900 dark:text-green-200">И промо-акция, и шаблон успешно найдены. Система заменяет плейсхолдеры (<code>{'{{NAME}}'}</code>, <code>{'{{TEXT_promo}}'}</code>) на реальные данные. Сообщение готово к отправке.</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                            <h4 className="font-semibold flex items-center gap-2 text-red-800 dark:text-red-300"><NoSymbolIcon className="w-5 h-5"/>СЦЕНАРИЙ: ОТМЕНА</h4>
                            <p className="mt-2 text-red-900 dark:text-red-200">Подходящая промо-акция не найдена. Отправка отменяется. Это защитный механизм, который предотвращает отправку нерелевантных или "пустых" сообщений.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="date-calculation" className="scroll-mt-24">
            <SectionHeader 
                icon={<CalendarDaysIcon className="w-8 h-8" />}
                title="6. Расчет даты отправки (`send_date`)"
                subtitle="Ядро предиктивной аналитики системы. Здесь определяется оптимальный день для отправки сообщения, чтобы максимизировать вероятность отклика."
            />
            <p>Система вычисляет `send_date` по строгому набору правил. Если ни одно правило не сработало для клиента, `send_date` остается `null`, и сообщение не отправляется. Это гарантирует, что коммуникация происходит только тогда, когда она наиболее уместна.</p>
             <div className="mt-6 space-y-4">
                 <InfoCard icon={<ClipboardDocumentCheckIcon className="w-6 h-6"/>} title="Приоритет 1: Клиенты с активным абонементом">
                    <p><b>Логика:</b> Эти клиенты наиболее лояльны и предсказуемы. Система стремится поддерживать их вовлеченность.</p>
                    <p className="mt-2 font-mono text-sm p-2 bg-gray-100 dark:bg-slate-900 rounded-md">Формула: <code>Дата последнего визита + 30 дней</code></p>
                </InfoCard>
                 <InfoCard icon={<UsersIcon className="w-6 h-6"/>} title="Приоритет 2: Посетители (без абонемента)">
                    <p><b>Логика:</b> Для этой группы система использует поведенческую аналитику для работы на опережение.</p>
                     <ul className="list-disc list-inside mt-2 space-y-2">
                        <li><b>Для "Повторных":</b> Используется их личный `minInterval` для прогноза.
                            <span className="block font-mono text-sm p-2 bg-gray-100 dark:bg-slate-900 rounded-md mt-1">Формула: <code>Дата посл. визита + minInterval - 3 дня</code></span>
                        </li>
                         <li><b>Для "Разовых":</b> Используется средний `avgInterval` по всей базе.
                            <span className="block font-mono text-sm p-2 bg-gray-100 dark:bg-slate-900 rounded-md mt-1">Формула: <code>Дата визита + avgInterval - 3 дня</code></span>
                        </li>
                    </ul>
                </InfoCard>
                <InfoCard icon={<LifebuoyIcon className="w-6 h-6"/>} title="Приоритет 3: Покупатели">
                    <p><b>Логика:</b> Эти клиенты совершили покупку, но еще не были на услуге (например, подарили сертификат). Цель — мотивировать их к первому визиту.</p>
                     <p className="mt-2 font-mono text-sm p-2 bg-gray-100 dark:bg-slate-900 rounded-md">Формула: <code>Сообщение отправляется сегодня</code> (если есть подходящий шаблон).</p>
                </InfoCard>
                <InfoCard icon={<ExclamationTriangleIcon className="w-6 h-6"/>} title="Исключения (не отправлять)">
                     <p><b>Логика:</b> Чтобы избежать спама и навязчивости, система блокирует отправку в следующих случаях:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Если с клиентом уже была коммуникация (вручную или автоматически) менее 14 дней назад.</li>
                        <li>Если тип клиента — "Лид" или "Неизвестно".</li>
                    </ul>
                </InfoCard>
             </div>
        </section>
        
      </div>
    </DocumentationPageLayout>
  );
};

export default ClientSegmentationDocumentationPage;