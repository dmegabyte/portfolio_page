
import React, { useState, ReactNode, useRef, useEffect } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, Modal, CollapsibleSection } from '../components/DocumentationUIComponents';
import { 
    RocketLaunchIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, TableCellsIcon, 
    ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon, CpuChipIcon,
    ScaleIcon, UserGroupIcon, IdentificationIcon, FunnelIcon, ChartBarIcon, CalendarDaysIcon, 
    LightBulbIcon, SparklesIcon, ArchiveBoxIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon, ArrowLongDownIcon, StarIcon, UsersIcon, LifebuoyIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowLongRightIcon, NoSymbolIcon, UserCircleIcon, QuestionMarkCircleIcon, ClockIcon, ArrowPathRoundedSquareIcon
} from '@heroicons/react/24/outline';

const InteractiveWorkflowDiagram: React.FC = () => {
    const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);
    const diagramRef = useRef<HTMLDivElement>(null);

    // This effect sets up the Intersection Observer to animate elements on scroll.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Optional: stop observing once visible
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px', // Start animation a bit before it's fully in view
            }
        );

        const elementsToAnimate = diagramRef.current?.querySelectorAll('.workflow-stage');
        if (elementsToAnimate) {
            elementsToAnimate.forEach((el) => observer.observe(el));
        }

        return () => {
            if (elementsToAnimate) {
                elementsToAnimate.forEach((el) => observer.unobserve(el));
            }
        };
    }, []);

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
                        {/* FIX: The placeholders were causing a JSX parsing error. Wrapping them in `<code>` tags and explicit string literals makes the code more robust and prevents misinterpretation by the compiler. */}
                        <li><b>Замена плейсхолдеров:</b> Система вставляет в текст персональные данные: имя клиента (<code>{'\`{{NAME}}\`'}</code>), название акции (<code>{'\`{{TEXT_promo}}\`'}</code>) и другие переменные.</li>
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
                                    <UserGroupIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                    <span className="text-xs font-semibold">1. Сегментация</span>
                                </div>
                            </button>
                             <button onClick={() => setModalContent(modalDescriptions.dateCalculation)} className="flex-1 text-center p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <div className="flex flex-col items-center justify-center">
                                    <CalendarDaysIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                    <span className="text-xs font-semibold">2. Расчет даты</span>
                                </div>
                            </button>
                            <button onClick={() => setModalContent(modalDescriptions.messageAssembly)} className="flex-1 text-center p-2 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <div className="flex flex-col items-center justify-center">
                                    <TagIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                    <span className="text-xs font-semibold">3. Сборка сообщения</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '450ms' }} />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '450ms' }} />

                    {/* Stage 3: Dispatch */}
                    <div className="text-center w-48 workflow-stage" style={{ transitionDelay: '600ms' }}>
                         <div className="flex justify-center items-center mx-auto w-16 h-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md">
                            <PaperAirplaneIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -rotate-45" />
                        </div>
                        <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">Канал отправки</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">WAHelp API</p>
                    </div>

                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '750ms' }} />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600 workflow-stage" style={{ transitionDelay: '750ms' }} />

                     {/* Stage 4: Result */}
                    <div className="text-center w-48 workflow-stage" style={{ transitionDelay: '900ms' }}>
                         <div className="flex justify-center items-center mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-full shadow-md">
                            <CheckCircleIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
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
    
    const loyaltyTiers = [
      {
        id: 'single',
        label: 'Разовые',
        visits: '1 визит',
        className: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300',
        definition: 'Клиенты, совершившие только один успешный визит. Это начальный уровень лояльности.'
      },
      {
        id: 'repeat_2_4',
        label: 'Повторные (2-4 раза)',
        visits: '2-4 визита',
        className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
        definition: 'Клиенты, совершившие от двух до четырех успешных визитов. Демонстрируют интерес к повторным посещениям.'
      },
      {
        id: 'repeat_5_plus',
        label: 'Повторные (5+)',
        visits: '≥ 5 визитов',
        className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
        definition: 'Наиболее лояльные клиенты, совершившие пять и более визитов. Являются ядром постоянной аудитории.'
      }
    ];

    const glossary = {
        send_date: "Ключевое поле в системе; расчетная дата, когда клиенту должно быть отправлено сообщение. Если `null`, сообщение не отправляется.",
        idFirst: "Архитектурный принцип, согласно которому все ключевые категории (например, тип клиента) хранятся и обрабатываются как числовые ID, а не как строки. Это значительно повышает производительность и надежность скриптов в Google Sheets.",
        segment: "Группа клиентов, объединенная по одному или нескольким признакам (например, 'Активные', 'Повторные'). Сегментация позволяет делать более точные и релевантные предложения.",
        minInterval: "Самый короткий промежуток времени между двумя последовательными визитами конкретного клиента. Используется для прогнозирования следующего визита у 'повторных' клиентов.",
        avgInterval: "Среднестатистический промежуток времени между визитами для всех клиентов в определенном сегменте. Используется для прогнозирования следующего визита у 'разовых' клиентов.",
        permanent_clients: "Клиенты, совершившие два или более визита за последние 90 дней (3 месяца). Являются ядром активной аудитории.",
        former_permanent_clients: "Клиенты, которые ранее проявляли высокую активность (2+ визита в любые 3 месяца в прошлом), но не посещали сервис в последние 90 дней. Ключевой сегмент для реактивации.",
        visitor: "Клиент, у которого есть хотя бы один визит со статусом 'пришел' за всё время наблюдений. Это ключевой тип клиента, совершившего целевое действие.",
        buyer: "Клиент, который совершил покупку (например, товара или сертификата), но еще не совершил ни одного визита. Часто это дарители сертификатов.",
        lead: "Потенциальный клиент, который проявил интерес (записался), но не пришел на визит. У него нет ни успешных визитов, ни покупок.",
        loyalty: "Показатель, отражающий количество успешных визитов клиента. Делится на 'Разовые', 'Повторные (2-4 раза)' и 'Повторные (5 и более раз)'.",
        activity: "Показатель, отражающий, как давно клиент контактировал с сервисом (визит или покупка). Делится на 'Активный' (до 90 дней), 'Пассивный' (91-270 дней) и 'Потерянный' (более 270 дней).",
        consumption_type: "Определяет предпочтения клиента. Если 80% или более услуг относятся к одной категории (Массаж или СПА), присваивается она. В противном случае — 'Универсал'.",
        massazhnik: "Тип потребления клиента, у которого 80% или более посещенных услуг относятся к категории 'Массаж'.",
        spashnik: "Тип потребления клиента, у которого 80% или более посещенных услуг относятся к категории 'СПА'.",
        universal: "Тип потребления клиента, у которого нет доминирующей категории услуг (менее 80% Массажа или СПА).",
        promo_personalization: "Лист «Персонализация» содержит матрицу условий для выбора уникальных промо-акций, основанных на детальном профиле клиента (например, для 'потерянного спашника' с сертификатом). Имеет высший приоритет при выборе акции.",
        promo_actions: "Лист «Акции» содержит общие, групповые промо-предложения. Используется как резервный вариант, если для клиента не нашлось персонального предложения.",
        templates: "Лист «Шаблоны» содержит базовые тексты сообщений для разных сегментов клиентов. Система фильтрует этот лист по параметрам клиента, чтобы выбрать наиболее подходящий текст.",
    };
    
    // Data for the 'Consumption Type' component. This data-driven approach improves clarity and maintainability.
    const consumptionTypes = [
        { 
            name: 'Массажник',
            condition: "Доля 'Массаж' ≥ 80%",
            glossaryKey: 'massazhnik',
            icon: <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        },
        { 
            name: 'Спашник',
            condition: "Доля 'СПА' ≥ 80%",
            glossaryKey: 'spashnik',
            icon: <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        },
        { 
            name: 'Универсал',
            condition: 'Остальные случаи',
            glossaryKey: 'universal',
            icon: null // The 'Universal' type does not require a special icon.
        },
    ];

    return (
    <DocumentationPageLayout title="AI-маркетолог">
        <div className="space-y-16">
            
            <section id="intro">
                <SectionHeader 
                    icon={<RocketLaunchIcon className="w-8 h-8" />}
                    title="Концепция и бизнес-задача"
                    subtitle="Описание автономной системы, которая анализирует клиентскую базу, автоматически сегментирует пользователей и запускает персонализированные маркетинговые кампании. Цель — повысить вовлеченность и LTV, минимизировав ручное управление."
                />
                <InteractiveWorkflowDiagram />
                <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                    <ul className="list-disc list-inside space-y-2 text-base">
                        <li><b>Автоматическая сегментация:</b> Система анализирует данные клиентов по 7+ параметрам (активность, лояльность, тип потребления и др.).</li>
                        <li><b>Персональные коммуникации:</b> Автоматически подбирает релевантные промо-акции и шаблоны сообщений для каждого сегмента.</li>
                        <li><b>Прогнозирование отправки:</b> Рассчитывает оптимальную дату отправки сообщения, чтобы повысить вероятность возврата клиента.</li>
                        <li><b>Простое управление:</b> Весь процесс управляется из интерфейса Google Sheets, не требуя навыков программирования.</li>
                    </ul>
                </InfoCard>
            </section>

            <section id="principles">
                <SectionHeader 
                    icon={<ScaleIcon className="w-8 h-8" />}
                    title="Ключевые принципы системы"
                    subtitle="В этом разделе раскрываются фундаментальные архитектурные решения, на которых построена вся система. Описывается принцип «idFirst» для повышения производительности и надежности, а также глобальные правила фильтрации и обработки данных, обеспечивающие их полноту, согласованность и высокое качество."
                />
                <div className="space-y-8 mt-8">
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0 mb-4">БЛОК A: Архитектурный принцип «idFirst»</h3>
                        <p className="text-gray-700 dark:text-slate-300 text-base">Все ключевые сегменты (тип клиента, тип потребления) в системе представляются не строками ("Посетитель"), а уникальными числовыми идентификаторами (ID = 1). Этот подход, известный как <TooltipTerm definition={glossary.idFirst}>idFirst</TooltipTerm>, делает код более быстрым, надежным и менее зависимым от текстовых названий. Функции сегментации сначала вычисляют текстовое значение, а затем конвертируют его в ID.</p>
                        <CollapsibleSection title="Показать пример маппинга ID">
                             <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
                                 <div className="grid md:grid-cols-2 gap-6">
                                     <div>
                                         <h5 className="font-bold mb-2 text-gray-700 dark:text-slate-300">Тип клиента</h5>
                                         <div className="space-y-3 font-mono text-base">
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 1</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.visitor}>Посетитель</TooltipTerm>"</span>
                                             </div>
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 2</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.buyer}>Покупатель</TooltipTerm>"</span>
                                             </div>
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 3</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.lead}>Лид</TooltipTerm>"</span>
                                             </div>
                                              <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 4</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Неизвестно"</span>
                                             </div>
                                         </div>
                                     </div>
                                      <div>
                                         <h5 className="font-bold mb-2 text-gray-700 dark:text-slate-300">Тип потребления</h5>
                                         <div className="space-y-3 font-mono text-base">
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 1</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.massazhnik}>Массажник</TooltipTerm>"</span>
                                             </div>
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 2</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.spashnik}>Спашник</TooltipTerm>"</span>
                                             </div>
                                             <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                                                 <span className="text-gray-500 dark:text-slate-400">ID: 3</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"<TooltipTerm definition={glossary.universal}>Универсал</TooltipTerm>"</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        </CollapsibleSection>
                    </div>
                     <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0 mb-4">БЛОК B: Глобальные принципы фильтрации данных</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-4">
                                    <ArchiveBoxIcon className="flex-shrink-0 w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Принцип полноты данных: Максимальная точность</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Система анализирует <strong>полную историю визитов</strong> без временных ограничений. Это позволяет видеть весь жизненный цикл клиента, точно определять сегменты (например, «бывшие постоянные») и строить прогнозы на основе всех доступных данных.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-4">
                                    <ShieldCheckIcon className="flex-shrink-0 w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Принцип согласованности данных: Защита от ошибок</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">При обработке статусов визитов (например, "пришел") применяется <strong>нормализация текста</strong>. Это устраняет расхождения из-за разного регистра или вариаций букв («е»/«ё»), гарантируя, что каждое событие будет учтено корректно.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-4">
                                    <ClipboardDocumentCheckIcon className="flex-shrink-0 w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Принцип качества контента: Защита от «мусорных» данных</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Любые текстовые поля (шаблоны, промо) считаются валидными, только если их длина после очистки от пробелов <strong>превышает 10 символов</strong>. Этот принцип «Garbage In, Garbage Out» (GIGO) автоматически отсеивает пустые или некорректные данные, обеспечивая высокое качество исходящих сообщений.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="segmentation">
                <SectionHeader 
                    icon={<UserGroupIcon className="w-8 h-8" />}
                    title="1. Сегментация клиентов"
                    subtitle="Этот раздел детально описывает многоуровневый процесс автоматической категоризации клиентов. Здесь представлены все правила и метрики, по которым система определяет тип клиента, его лояльность, активность, потребительские предпочтения и другие ключевые характеристики, формируя полный 360-градусный профиль."
                />
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* 1.1: Client Type */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-3">
                            <IdentificationIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.1: Определение типа клиента</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Логика выполняется по приоритету сверху вниз:</p>
                        <div className="space-y-3">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-indigo-500 dark:border-indigo-600 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-sm">1</div>
                                    <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.visitor}>Посетитель</TooltipTerm> <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">(высший приоритет)</span></h4>
                                </div>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">2</div>
                                    <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.buyer}>Покупатель</TooltipTerm></h4>
                                </div>
                            </div>
                             <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">3</div>
                                    <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.lead}>Лид</TooltipTerm></h4>
                                </div>
                            </div>
                             <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">4</div>
                                    <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100">Неизвестно</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 1.2: Visit Intervals */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-3">
                            <CpuChipIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.2: Расчет интервалов визитов</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Ключевые метрики для прогнозирования следующего визита клиента. Рассчитываются только для <TooltipTerm definition={glossary.visitor}>Посетителей</TooltipTerm>.</p>
                        <div className="space-y-3 pt-2">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100">Минимальный интервал (<TooltipTerm definition={glossary.minInterval}>minInterval</TooltipTerm>)</h4>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <h4 className="font-semibold text-base text-gray-900 dark:text-slate-100">Средний интервал (<TooltipTerm definition={glossary.avgInterval}>avgInterval</TooltipTerm>)</h4>
                            </div>
                        </div>
                    </div>
                    
                    {/* Combined block for 1.3-1.7 */}
                    <div className="md:col-span-2 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mt-0 mb-8 text-center">Компоненты профиля клиента</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* 1.3: Consumption Type */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-sm">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-slate-700 rounded-lg">
                                        <FunnelIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0">1.3: Тип потребления</h4>
                                </div>
                                <div className="flex-grow flex flex-col justify-around space-y-4 p-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700">
                                    {consumptionTypes.map((type) => (
                                        <div key={type.name} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-indigo-500/50 transition-colors">
                                            <span className="font-mono text-base text-gray-600 dark:text-slate-400">{type.condition}</span>
                                            <TooltipTerm definition={glossary[type.glossaryKey as keyof typeof glossary]}>
                                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-base font-semibold ${
                                                    type.name === 'Универсал' 
                                                        ? 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-200' 
                                                        : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                                                }`}>
                                                    {type.icon}
                                                    <span>{type.name}</span>
                                                </div>
                                            </TooltipTerm>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 1.4: Loyalty - UNIFIED */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-sm">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-slate-700 rounded-lg">
                                        <CheckBadgeIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0">1.4: Лояльность</h4>
                                </div>
                                <div className="flex-grow flex flex-col justify-around space-y-4 p-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700">
                                    {loyaltyTiers.map((tier) => (
                                        <div key={tier.id} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-indigo-500/50 transition-colors">
                                            <span className="font-mono text-base text-gray-600 dark:text-slate-400">{tier.visits}</span>
                                            <TooltipTerm definition={tier.definition}>
                                                <span className={`text-base font-semibold px-3 py-1.5 rounded-full ${tier.className}`}>
                                                    {tier.label}
                                                </span>
                                            </TooltipTerm>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 1.5: Activity */}
                            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-slate-700 rounded-lg">
                                        <ChartBarIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0">1.5: Активность</h4>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-slate-400 mb-6">Рассчитывается по давности последнего контакта (визит или покупка).</p>
                                <div className="w-full mt-auto">
                                    <div className="w-full flex rounded-full h-5 overflow-hidden border border-gray-200 dark:border-slate-700">
                                        <div className="flex-1 bg-green-500"></div>
                                        <div className="flex-1 bg-yellow-500"></div>
                                        <div className="flex-1 bg-red-500"></div>
                                    </div>
                                    <div className="grid grid-cols-3 text-center text-base text-gray-700 dark:text-slate-300 mt-4 font-semibold">
                                        <TooltipTerm definition="Клиент, контактировавший с сервисом (визит или покупка) в течение последних 90 дней.">Активный</TooltipTerm>
                                        <TooltipTerm definition="Клиент, чей последний контакт (визит или покупка) был от 91 до 270 дней назад. Требует мер по реактивации.">Пассивный</TooltipTerm>
                                        <TooltipTerm definition="Клиент, который не контактировал с сервисом (визит или покупка) более 270 дней. Считается ушедшим.">Потерянный</TooltipTerm>
                                    </div>
                                    <div className="grid grid-cols-3 text-center text-sm text-gray-500 dark:text-slate-400 mt-1">
                                        <span>≤ 90 дн.</span>
                                        <span>≤ 270 дн.</span>
                                        <span>&gt; 270 дн.</span>
                                    </div>
                                </div>
                            </div>

                            {/* 1.6: Price Segment */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-sm">
                               <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-slate-700 rounded-lg">
                                        <TableCellsIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0">1.6: Ценовой сегмент</h4>
                                </div>
                               <p className="text-lg text-gray-600 dark:text-slate-400 mb-5">Присваивается доминирующий <TooltipTerm definition={glossary.segment}>ценовой сегмент</TooltipTerm> на основе истории посещенных программ.</p>
                               <div className="flex-grow flex items-center justify-center not-prose">
                                    <div className="w-full max-w-xs space-y-4">
                                        {/* Дорогой */}
                                        <div className="flex items-center gap-4 p-2 pl-4 rounded-full bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 shadow-sm transition-transform hover:scale-105">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">↑</div>
                                            <span className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">Дорогой</span>
                                        </div>
                                        
                                        {/* Средний */}
                                        <div className="flex items-center gap-4 p-2 pl-4 rounded-full bg-sky-50 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700 shadow-sm transition-transform hover:scale-105">
                                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl">~</div>
                                            <span className="text-lg font-semibold text-sky-800 dark:text-sky-300">Средний</span>
                                        </div>
                                        
                                        {/* Недорогой */}
                                        <div className="flex items-center gap-4 p-2 pl-4 rounded-full bg-amber-50 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-700 shadow-sm transition-transform hover:scale-105">
                                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xl">↓</div>
                                            <span className="text-lg font-semibold text-amber-800 dark:text-amber-300">Недорогой</span>
                                        </div>
                                    </div>
                               </div>
                           </div>
                           
                           {/* 1.7: Visit Frequency */}
                           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col h-full shadow-sm">
                               <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-slate-700 rounded-lg">
                                        <ArrowPathIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400"/>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0">1.7: Частота</h4>
                                </div>
                               <div className="space-y-4 flex-grow flex flex-col justify-center">
                                    <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <StarIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                            <h5 className="font-bold text-lg text-gray-800 dark:text-slate-200"><TooltipTerm definition={glossary.permanent_clients}>Постоянные</TooltipTerm></h5>
                                        </div>
                                        <p className="text-base text-gray-600 dark:text-slate-400 mt-1 pl-9">2+ визита за последние 3 месяца.</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <ClockIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                            <h5 className="font-bold text-lg text-gray-800 dark:text-slate-200"><TooltipTerm definition={glossary.former_permanent_clients}>Бывшие постоянные</TooltipTerm></h5>
                                        </div>
                                         <p className="text-base text-gray-600 dark:text-slate-400 mt-1 pl-9">Были активны в прошлом, но не в последние 3 месяца.</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                            <h5 className="font-bold text-lg text-gray-800 dark:text-slate-200">Редкие/Разовые</h5>
                                        </div>
                                         <p className="text-base text-gray-600 dark:text-slate-400 mt-1 pl-9">Все остальные случаи.</p>
                                    </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="templates-promo">
                <SectionHeader 
                    icon={<TagIcon className="w-8 h-8" />}
                    title="2. Сборка сообщения: от промо до текста"
                    subtitle="Здесь пошагово разбирается конвейер, который превращает сырые данные и сегменты в готовое к отправке, персонализированное сообщение. Описывается логика выбора наиболее релевантной промо-акции и текстового шаблона, а также механизм подстановки персональных данных клиента (плейсхолдеров)."
                />
                <div className="mt-8 relative not-prose">
                    <div className="absolute left-9 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-700"></div>
                    <div className="space-y-12">
                        {/* Step 1: Promo Selection */}
                        <div className="relative pl-20">
                            <div className="absolute left-0 top-0 flex-shrink-0 w-16 h-16 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-2xl border-4 border-white dark:border-slate-800">1</div>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-slate-200 mt-3 mb-2">ШАГ 1: Выбор промо-акции</h3>
                            <p className="text-gray-700 dark:text-slate-300 mb-6 text-base">Функция <code>selectPromo</code> выбирает промо‑акцию, используя многоуровневый алгоритм для максимальной персонализации.</p>
                             <div className="border-l-2 border-dashed border-gray-300 dark:border-slate-600 space-y-8 relative p-6 bg-white dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
                                {/* Entry Point */}
                                <div className="relative pl-10">
                                    <div className="absolute -left-4 top-1 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600">
                                        <UserCircleIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                                    </div>
                                    <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Входные данные: Профиль клиента</h4>
                                    <p className="text-base text-gray-700 dark:text-slate-300">Используется полный набор сегментов (Тип, Лояльность, Активность и т.д.) для поиска наиболее точного предложения.</p>
                                </div>
                                
                                {/* Stage 1: Personalization */}
                                <div className="relative pl-10">
                                    <div className="absolute -left-4 top-1 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center border-2 border-indigo-500">
                                        <SparklesIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Приоритетный поиск в <TooltipTerm definition={glossary.promo_personalization}>«Персонализации»</TooltipTerm></h4>
                                    <p className="text-base text-gray-700 dark:text-slate-300">Система пытается найти уникальное предложение, которое соответствует ВСЕМ параметрам клиента. <strong>Это первый и главный источник.</strong></p>
                                </div>

                                {/* Intermediate Step */}
                                <div className="relative pl-10">
                                     <div className="absolute -left-4 top-1 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600">
                                        <ArrowLongDownIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                                    </div>
                                    <p className="text-base text-gray-500 dark:text-slate-400 italic">Если персональная акция не найдена...</p>
                                </div>

                                 {/* Stage 2: Actions */}
                                <div className="relative pl-10">
                                    <div className="absolute -left-4 top-1 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center border-2 border-indigo-500">
                                        <TagIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Резервный поиск в <TooltipTerm definition={glossary.promo_actions}>«Акциях»</TooltipTerm></h4>
                                    <p className="text-base text-gray-700 dark:text-slate-300">Система ищет общие, групповые акции, которые подходят для ключевых сегментов клиента.</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Template Selection */}
                        <div className="relative pl-20">
                           <div className="absolute left-0 top-0 flex-shrink-0 w-16 h-16 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-2xl border-4 border-white dark:border-slate-800">2</div>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-slate-200 mt-3 mb-2">ШАГ 2: Выбор шаблона</h3>
                            <p className="text-gray-700 dark:text-slate-300 text-base">Функция <code>selectTemplate</code> ищет наиболее подходящий шаблон в листе <TooltipTerm definition={glossary.templates}>«Шаблоны»</TooltipTerm>, фильтруя по параметрам клиента. Чем больше параметров совпало, тем выше приоритет шаблона.</p>
                        </div>

                        {/* Step 3: Placeholder Replacement */}
                        <div className="relative pl-20">
                            <div className="absolute left-0 top-0 flex-shrink-0 w-16 h-16 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-2xl border-4 border-white dark:border-slate-800">3</div>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-slate-200 mt-3 mb-2">ШАГ 3: Сборка и финальное решение</h3>
                            <p className="text-gray-700 dark:text-slate-300 mb-6 text-base">На последнем этапе система заменяет переменные (плейсхолдеры) в тексте и принимает решение об отправке на основе результата предыдущих шагов.</p>
                             <div className="grid md:grid-cols-2 gap-6">
                                {/* Scenario 1: Success */}
                                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-5 border-2 border-green-300 dark:border-green-800">
                                    <div className="flex items-center gap-3 mb-3">
                                        <CheckBadgeIcon className="w-8 h-8 text-green-600 dark:text-green-400"/>
                                        <h5 className="font-bold text-lg text-green-800 dark:text-green-300 mt-0">СЦЕНАРИЙ: УСПЕХ</h5>
                                    </div>
                                    <p className="text-base text-green-800 dark:text-green-300 mb-4"><strong>Условие:</strong> Промо-акция и шаблон успешно найдены.</p>
                                    <p className="text-base font-semibold text-gray-800 dark:text-slate-200 mb-2">Действие:</p>
                                    <p className="text-sm text-gray-700 dark:text-slate-300 mb-4">Плейсхолдеры <code>{`{{NAME}}`}</code> и <code>{`{{TEXT_PROMO}}`}</code> заменяются реальными данными.</p>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-sm">
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 font-semibold uppercase">Результат: Сообщение готово к отправке</p>
                                        <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                                            {"Здравствуйте, Иван! ... 🎁 - "}
                                            <span className="font-semibold bg-green-100 dark:bg-green-900/50 p-1 rounded">Скидка 15% на массаж</span>
                                            {" ..."}
                                        </p>
                                    </div>
                                </div>
                                 {/* Scenario 2: Cancellation */}
                                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-5 border-2 border-red-300 dark:border-red-800">
                                     <div className="flex items-center gap-3 mb-3">
                                        <ExclamationTriangleIcon className="w-8 h-8 text-red-600 dark:text-red-400"/>
                                        <h5 className="font-bold text-lg text-red-800 dark:text-red-300 mt-0">СЦЕНАРИЙ: ОТМЕНА</h5>
                                    </div>
                                    <p className="text-base text-red-800 dark:text-red-300 mb-4"><strong>Условие:</strong> Подходящая промо-акция не найдена.</p>
                                    <p className="text-base font-semibold text-gray-800 dark:text-slate-200 mb-2">Действие:</p>
                                    <p className="text-sm text-gray-700 dark:text-slate-300 mb-4">Система присваивает статус «Шаблон не найден», чтобы избежать отправки неполноценного сообщения.</p>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-sm">
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 font-semibold uppercase">Результат: Отправка отменяется</p>
                                         <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                                            <NoSymbolIcon className="w-6 h-6"/>
                                            <p className="text-sm font-semibold">Сообщение не будет отправлено</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="send-date-logic">
                <SectionHeader 
                    icon={<SparklesIcon className="w-8 h-8" />}
                    title="3. Расчет даты отправки (`send_date`)"
                    subtitle="Это ядро предиктивной аналитики системы. В этом разделе раскрывается сложная логика, которая определяет оптимальный день для отправки сообщения каждому клиенту. Описывается иерархия правил, от работы с владельцами абонементов до прогнозирования следующего визита на основе индивидуального поведения."
                />
                <div className="space-y-8 mt-8">
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0 mb-4">Принцип работы и приоритеты</h3>
                        <p className="text-gray-700 dark:text-slate-300 text-base">Система вычисляет поле <TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> на основе набора правил, применяемых в строгом порядке. Если для клиента срабатывает правило более высокого приоритета, последующие правила для него не рассматриваются. Если ни одно из правил не сработало, <code>send_date</code> остается пустым (<code>null</code>), и сообщение такому клиенту не отправляется.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0 mb-4">Детальная логика расчета</h3>
                        <div className="space-y-6">
                            {/* Priority 1 */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-amber-400 dark:border-amber-500 shadow-lg transition-transform hover:scale-[1.02]">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full">
                                            <StarIcon className="w-7 h-7 text-amber-500 dark:text-amber-400" />
                                        </div>
                                        <span className="mt-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Приоритет 1</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-slate-100 mt-0">Клиенты с активным абонементом</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Это самая ценная группа. Чтобы поддерживать их вовлеченность, система планирует отправку ровно через 30 дней после их последнего визита, мягко напоминая о себе.</p>
                                        <div className="mt-4 p-3 bg-gray-100 dark:bg-slate-700/50 rounded-lg">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">Формула:</p>
                                            <code className="block text-base text-indigo-600 dark:text-indigo-400 font-medium">Дата последнего визита + 30 дней</code>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Priority 2 */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-md transition-shadow hover:shadow-lg">
                                <div className="flex items-start gap-4">
                                     <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-slate-700 rounded-full">
                                            <UsersIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                                        </div>
                                        <span className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Приоритет 2</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-slate-100 mt-0">Посетители (без абонемента)</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Для этой группы используется предиктивная модель, основанная на их поведении.</p>
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 grid sm:grid-cols-2 gap-4">
                                            <div className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                                 <h5 className="font-semibold text-gray-800 dark:text-slate-200">Для "Повторных"</h5>
                                                 <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 mb-2">Система берет их персональный <TooltipTerm definition={glossary.minInterval}>minInterval</TooltipTerm> и предлагает вернуться за 3 дня до его истечения, работая на опережение.</p>
                                                 <code className="block text-sm text-indigo-600 dark:text-indigo-400 font-medium">Дата посл. визита + minInterval - 3 дня</code>
                                            </div>
                                            <div className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                                <h5 className="font-semibold text-gray-800 dark:text-slate-200">Для "Разовых"</h5>
                                                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 mb-2">Так как персональной истории нет, используется общий <TooltipTerm definition={glossary.avgInterval}>avgInterval</TooltipTerm> по всей базе.</p>
                                                <code className="block text-sm text-indigo-600 dark:text-indigo-400 font-medium">Дата визита + avgInterval - 3 дня</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Priority 3 */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-md transition-shadow hover:shadow-lg">
                                <div className="flex items-start gap-4">
                                     <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-slate-700 rounded-full">
                                            <LifebuoyIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                                        </div>
                                         <span className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Приоритет 3</span>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-lg text-gray-900 dark:text-slate-100 mt-0">Покупатели</h4>
                                        <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Сообщение отправляется немедленно (<code className="text-sm">сегодня</code>), если для них находится подходящий по времени шаблон в листе «Шаблоны». Это позволяет, например, сразу отправить инструкцию после покупки сертификата.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Exclusions */}
                            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 border border-red-200 dark:border-red-800/50 shadow-md">
                                 <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 flex flex-col items-center">
                                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full">
                                            <ExclamationTriangleIcon className="w-7 h-7 text-red-500 dark:text-red-400" />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-lg text-red-800 dark:text-red-300 mt-0">Исключения (не отправлять)</h4>
                                        <ul className="list-disc list-inside space-y-2 mt-2 text-base text-red-700 dark:text-red-300">
                                            <li>Если с клиентом уже общались менее 14 дней назад (чтобы избежать спама).</li>
                                            <li>Если тип клиента — <TooltipTerm definition={glossary.lead}>"Лид"</TooltipTerm> или "Неизвестно".</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CollapsibleSection title="Показать детальную таблицу логики">
                        <div className="overflow-x-auto my-4 not-prose">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-slate-800 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-semibold tracking-wider">Тип клиента</th>
                                        <th scope="col" className="px-6 py-3 font-semibold tracking-wider">Условие</th>
                                        <th scope="col" className="px-6 py-3 font-semibold tracking-wider">Логика `send_date`</th>
                                    </tr>
                                </thead>
                    
                                {/* Group 1: Highest Priority */}
                                <tbody className="bg-white dark:bg-slate-900">
                                    <tr>
                                        <th colSpan={3} scope="colgroup" className="px-4 py-3 text-base font-bold text-gray-900 dark:text-slate-100 bg-gray-50 dark:bg-slate-800/60 border-y border-gray-200 dark:border-slate-700">
                                            <div className="flex items-center gap-2">
                                                <StarIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                                <span>Высший приоритет</span>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200">Любой</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                                            <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                               <CheckCircleIcon className="w-4 h-4" />
                                               Активный абонемент
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-800 dark:text-slate-300"><code>Дата посл. визита + 30д</code></td>
                                    </tr>
                                </tbody>
                    
                                {/* Group 2: Main Logic */}
                                <tbody className="bg-white dark:bg-slate-900">
                                    <tr>
                                        <th colSpan={3} scope="colgroup" className="px-4 py-3 text-base font-bold text-gray-900 dark:text-slate-100 bg-gray-50 dark:bg-slate-800/60 border-y border-gray-200 dark:border-slate-700">
                                             <div className="flex items-center gap-2">
                                                <Cog6ToothIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                                                <span>Основная логика</span>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200 align-top" rowSpan={2}>Посетитель</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">≥ 2 визитов ("Повторный")</td>
                                        <td className="px-6 py-4 font-mono text-gray-800 dark:text-slate-300"><code>Дата посл. визита + (min интервал) - 3д</code></td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">1 визит ("Разовый")</td>
                                        <td className="px-6 py-4 font-mono text-gray-800 dark:text-slate-300"><code>Дата визита + (средний интервал) - 3д</code></td>
                                    </tr>
                                     <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200 align-top">Покупатель</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Подходит по таймингу из "Шаблонов"</td>
                                        <td className="px-6 py-4 font-mono text-gray-800 dark:text-slate-300"><code>сегодня</code></td>
                                    </tr>
                                </tbody>
                    
                                {/* Group 3: Exceptions */}
                                <tbody className="bg-white dark:bg-slate-900">
                                    <tr>
                                        <th colSpan={3} scope="colgroup" className="px-4 py-3 text-base font-bold text-gray-900 dark:text-slate-100 bg-gray-50 dark:bg-slate-800/60 border-y border-gray-200 dark:border-slate-700">
                                            <div className="flex items-center gap-2">
                                               <ExclamationTriangleIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                                               <span>Исключения (не отправлять)</span>
                                            </div>
                                        </th>
                                    </tr>
                                     <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200 align-top">Покупатель</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Последнее сообщение &lt; 14д назад</td>
                                        <td className="px-6 py-4 font-mono text-red-600 dark:text-red-400"><code>null</code></td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-slate-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-slate-200">Лид / Неизвестно</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">-</td>
                                        <td className="px-6 py-4 font-mono text-red-600 dark:text-red-400"><code>null (не отправлять)</code></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CollapsibleSection>
                </div>
            </section>
        </div>
    </DocumentationPageLayout>
    );
};

export default ClientSegmentationDocumentationPage;
