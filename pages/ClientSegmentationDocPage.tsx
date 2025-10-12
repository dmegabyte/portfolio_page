




import React, { useState } from 'react';
import DocPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, Modal, CollapsibleSection } from '../components/DocumentationUIComponents';
// FIX: Import the missing LifebuoyIcon.
import { 
    RocketLaunchIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, TableCellsIcon, 
    ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon, CpuChipIcon,
    ScaleIcon, UserGroupIcon, IdentificationIcon, FunnelIcon, ChartBarIcon, CalendarDaysIcon, 
    LightBulbIcon, SparklesIcon, ArchiveBoxIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon, ArrowLongDownIcon, StarIcon, UsersIcon, LifebuoyIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowLongRightIcon
} from '@heroicons/react/24/outline';

const InteractiveWorkflowDiagram: React.FC = () => {
    // The modal logic is removed from here to improve UX.
    // Details are now shown in a CollapsibleSection within the relevant document section.
    return (
        <div className="my-8 not-prose">
            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">Полный цикл работы AI-маркетолога</h3>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Stage 1: Data Sources */}
                    <div className="text-center w-48">
                        <div className="flex justify-center items-center mx-auto w-16 h-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md">
                            <CircleStackIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                        </div>
                        <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">Источники данных</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">YClients, Google Sheets</p>
                    </div>
                    
                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600" />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600" />

                    {/* Stage 2: AI Core */}
                    <div className="flex-grow bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-inner w-full md:w-auto">
                        <h4 className="font-semibold text-center text-gray-800 dark:text-slate-200 mb-3">Ядро AI-маркетолога</h4>
                        <div className="flex flex-col sm:flex-row justify-around gap-2">
                             <div className="flex-1 text-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                                <TooltipTerm definition="Система анализирует клиентов по 7+ параметрам (тип, лояльность, активность, потребление и др.), присваивая каждому уникальный сегмент для подбора наиболее релевантного предложения.">
                                    <div className="flex flex-col items-center justify-center cursor-help">
                                        <UserGroupIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                        <span className="text-xs font-semibold">1. Сегментация</span>
                                    </div>
                                </TooltipTerm>
                            </div>
                             <div className="flex-1 text-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors w-full">
                                <TooltipTerm definition="Система прогнозирует оптимальную дату отправки, используя историю визитов клиента. Детальная логика раскрыта в соответствующем разделе документации.">
                                    <div className="flex flex-col items-center justify-center cursor-help">
                                        <CalendarDaysIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                        <span className="text-xs font-semibold">2. Расчет даты</span>
                                    </div>
                                </TooltipTerm>
                            </div>
                            <div className="flex-1 text-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                                <TooltipTerm definition="Система автоматически подбирает релевантный шаблон текста и промо-акцию, а затем подставляет персональные данные клиента.">
                                    <div className="flex flex-col items-center justify-center cursor-help">
                                        <TagIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                        <span className="text-xs font-semibold">3. Сборка сообщения</span>
                                    </div>
                                </TooltipTerm>
                            </div>
                        </div>
                    </div>

                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600" />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600" />

                    {/* Stage 3: Dispatch */}
                    <div className="text-center w-48">
                         <div className="flex justify-center items-center mx-auto w-16 h-16 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full shadow-md">
                            <PaperAirplaneIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -rotate-45" />
                        </div>
                        <h4 className="font-semibold mt-3 text-gray-800 dark:text-slate-200">Канал отправки</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">WAHelp API</p>
                    </div>

                    <ArrowLongRightIcon className="hidden md:block w-12 h-12 text-gray-300 dark:text-slate-600" />
                    <ArrowLongDownIcon className="md:hidden w-8 h-8 text-gray-300 dark:text-slate-600" />

                     {/* Stage 4: Result */}
                    <div className="text-center w-48">
                         <div className="flex justify-center items-center mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-full shadow-md">
                            <CheckCircleIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold mt-3 text-green-800 dark:text-green-300">Результат</h4>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Персональная рассылка</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ClientSegmentationDocPage: React.FC = () => {
    
    const glossary = {
        send_date: "Ключевое поле в системе; расчетная дата, когда клиенту должно быть отправлено сообщение. Если `null`, сообщение не отправляется.",
        idFirst: "Архитектурный принцип, согласно которому все ключевые категории (например, тип клиента) хранятся и обрабатываются как числовые ID, а не как строки. Это значительно повышает производительность и надежность скриптов в Google Sheets.",
        segment: "Группа клиентов, объединенная по одному или нескольким признакам (например, 'Активные', 'Повторные'). Сегментация позволяет делать более точные и релевантные предложения.",
        minInterval: "Самый короткий промежуток времени между двумя последовательными визитами конкретного клиента. Используется для прогнозирования следующего визита у 'повторных' клиентов.",
        avgInterval: "Среднестатистический промежуток времени между визитами для всех клиентов в определенном сегменте. Используется для прогнозирования следующего визита у 'разовых' клиентов.",
        permanent_clients: "Клиенты, совершившие два или более визита за последние 90 дней. Являются ядром активной аудитории.",
        former_permanent_clients: "Клиенты, которые ранее проявляли высокую активность (2+ визита за 3 месяца), но не посещали сервис в последние 90 дней. Ключевой сегмент для реактивации.",
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

    return (
    <DocPageLayout title="AI-маркетолог">
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
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-indigo-500 dark:border-indigo-600 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-sm">1</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.visitor}>Посетитель</TooltipTerm> <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">(высший приоритет)</span></h4>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Есть хотя бы один визит со статусом "пришел" за всё время.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">2</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.buyer}>Покупатель</TooltipTerm></h4>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Нет визитов, но есть покупка.</p>
                                    </div>
                                </div>
                            </div>
                             <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">3</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100"><TooltipTerm definition={glossary.lead}>Лид</TooltipTerm></h4>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Нет визитов и покупок, но есть визит со статусом "не пришел".</p>
                                    </div>
                                </div>
                            </div>
                             <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-full flex items-center justify-center text-sm">4</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-slate-100">Неизвестно</h4>
                                        <p className="text-sm text-gray-600 dark:text-slate-400">Во всех остальных случаях.</p>
                                    </div>
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
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <h4 className="font-semibold text-gray-900 dark:text-slate-100">Минимальный интервал (<TooltipTerm definition={glossary.minInterval}>minInterval</TooltipTerm>)</h4>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Вычисляется для каждого клиента индивидуально. Это наименьший промежуток (в днях) между двумя его последовательными визитами. Используется для прогноза возвращения <TooltipTerm definition={glossary.loyalty}>"повторных"</TooltipTerm> клиентов.</p>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700">
                                <h4 className="font-semibold text-gray-900 dark:text-slate-100">Средний интервал (<TooltipTerm definition={glossary.avgInterval}>avgInterval</TooltipTerm>)</h4>
                                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">Рассчитывается как среднее арифметическое всех интервалов между визитами по всей клиентской базе. Используется для прогноза возвращения <TooltipTerm definition={glossary.loyalty}>"разовых"</TooltipTerm> клиентов, у которых еще нет своей истории визитов.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 1.3: Consumption Type */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-3">
                            <FunnelIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.3: Определение типа потребления</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Анализирует все услуги из визитов клиента.</p>
                        <div className="mt-2 p-4 bg-gray-900 dark:bg-black/30 rounded-md border border-gray-200 dark:border-slate-700 font-mono text-sm leading-relaxed text-gray-300">
                            <span className="text-sky-400">ЕСЛИ</span> <span className="text-gray-400">доля 'Массаж' ≥ 80%</span> <span className="text-emerald-400">→</span> <span className="text-yellow-300">"Массажник"</span>
                            <br />
                            <span className="text-sky-400">ИНАЧЕ ЕСЛИ</span> <span className="text-gray-400">доля 'СПА' ≥ 80%</span> <span className="text-emerald-400">→</span> <span className="text-yellow-300">"Спашник"</span>
                            <br />
                            <span className="text-sky-400">ИНАЧЕ</span> <span className="text-emerald-400">→</span> <span className="text-yellow-300">"Универсал"</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400 pt-2 flex items-center gap-2"><LightBulbIcon className="w-5 h-5" /> <span>Это правило определяет <TooltipTerm definition={glossary.consumption_type}>тип потребления</TooltipTerm>.</span></p>
                    </div>

                    {/* 1.4: Loyalty */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckBadgeIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.4: Определение лояльности</h3>
                        </div>
                        <ul className="space-y-3 pt-2">
                            <li className="flex items-center gap-4">
                                <span className="font-mono text-sm w-28 text-right text-gray-600 dark:text-slate-400">1 визит</span>
                                <span className="text-2xl text-gray-300 dark:text-slate-600">→</span>
                                <span className="bg-sky-100 text-sky-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">Разовые</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="font-mono text-sm w-28 text-right text-gray-600 dark:text-slate-400">2-4 визита</span>
                                <span className="text-2xl text-gray-300 dark:text-slate-600">→</span>
                                <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-cyan-900 dark:text-cyan-300">Повторные (2-4 раза)</span>
                            </li>
                             <li className="flex items-center gap-4">
                                <span className="font-mono text-sm w-28 text-right text-gray-600 dark:text-slate-400">≥ 5 визитов</span>
                                <span className="text-2xl text-gray-300 dark:text-slate-600">→</span>
                                <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Повторные (5+)</span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-500 dark:text-slate-400 pt-4 border-t border-gray-200 dark:border-slate-700 flex items-center gap-2"><LightBulbIcon className="w-5 h-5" /> <span>Это правило определяет <TooltipTerm definition={glossary.loyalty}>лояльность</TooltipTerm>.</span></p>
                    </div>

                    {/* 1.5: Activity */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center gap-3">
                            <ChartBarIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.5: Определение активности</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Рассчитывается: <code>(сегодня - дата последнего контакта)</code>, где контакт = визит ИЛИ покупка.</p>
                        <ul className="pt-2 space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-green-500" title="Активный"></div>
                                <div>
                                    <span className="font-semibold text-green-700 dark:text-green-400">Активный</span>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">≤ 90 дней</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-yellow-500" title="Пассивный"></div>
                                <div>
                                    <span className="font-semibold text-yellow-700 dark:text-yellow-400">Пассивный</span>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">&gt; 90 и ≤ 270 дней</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-red-500" title="Потерянный"></div>
                                <div>
                                    <span className="font-semibold text-red-700 dark:text-red-400">Потерянный</span>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">&gt; 270 дней</p>
                                </div>
                            </li>
                        </ul>
                         <p className="text-sm text-gray-500 dark:text-slate-400 pt-2 border-t border-gray-200 dark:border-slate-700 flex items-center gap-2"><LightBulbIcon className="w-5 h-5" /> <span>Это правило определяет <TooltipTerm definition={glossary.activity}>активность</TooltipTerm>.</span></p>
                    </div>

                    {/* 1.6 & 1.7 */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-3">
                           <div className="flex items-center gap-3">
                                <TableCellsIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.6: Ценовой сегмент</h3>
                            </div>
                           <p className="text-sm">Присваивается доминирующий <TooltipTerm definition={glossary.segment}>ценовой сегмент</TooltipTerm> ("Дорогой", "Средний", "Недорогой") на основе истории посещенных программ.</p>
                       </div>
                       <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 space-y-3">
                           <div className="flex items-center gap-3">
                                <ArrowPathIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400"/>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-0">1.7: Частота посещения</h3>
                            </div>
                           <ul className="list-disc list-inside space-y-1.5 text-sm">
                               <li><strong><TooltipTerm definition={glossary.permanent_clients}>Постоянные</TooltipTerm>:</strong> 2+ визита за последние 3 месяца.</li>
                               <li><strong><TooltipTerm definition={glossary.former_permanent_clients}>Бывшие постоянные</TooltipTerm>:</strong> Были 2+ визита в прошлом, но не в последние 3 месяца.</li>
                               <li><strong>Редкие/Разовые:</strong> Все остальные.</li>
                           </ul>
                       </div>
                    </div>
                </div>
            </section>
            
            <section id="templates-promo">
                <SectionHeader 
                    icon={<TagIcon className="w-8 h-8" />}
                    title="2. Шаблоны, промо и плейсхолдеры"
                    subtitle="Здесь пошагово разбирается конвейер, который превращает сырые данные и сегменты в готовое к отправке, персонализированное сообщение. Описывается логика выбора наиболее релевантной промо-акции и текстового шаблона, а также механизм подстановки персональных данных клиента (плейсхолдеров)."
                />
                <div className="space-y-8 mt-8">
                    {/* Step 1: Promo Selection */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">1</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 1: Выбор промо-акции</h3>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 mb-6 pl-14 text-base">Функция <code>selectPromo</code> выбирает промо‑акцию, отдавая приоритет персональным предложениям.</p>
                        <div className="space-y-4 max-w-2xl mx-auto pl-14">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border-2 border-indigo-500 shadow-lg">
                                <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Приоритетный поиск</h4>
                                <p className="text-base text-gray-700 dark:text-slate-300">Ищутся персональные предложения в листе <TooltipTerm definition={glossary.promo_personalization}>«Персонализация»</TooltipTerm>.</p>
                            </div>
                            <div className="flex justify-center items-center text-gray-400 dark:text-slate-500">
                                <ArrowLongDownIcon className="w-8 h-8"/>
                                <span className="text-sm font-semibold ml-2">Если не найдено...</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700 shadow-sm">
                                <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Резервный поиск</h4>
                                <p className="text-base text-gray-700 dark:text-slate-300">Ищутся общие предложения в листе <TooltipTerm definition={glossary.promo_actions}>«Акции»</TooltipTerm>.</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Template Selection */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">2</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 2: Выбор шаблона</h3>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 pl-14 text-base">Функция <code>selectTemplate</code> ищет наиболее подходящий шаблон в листе <TooltipTerm definition={glossary.templates}>«Шаблоны»</TooltipTerm>, фильтруя по параметрам клиента.</p>
                         <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 pl-14 flex items-center gap-2"><LightBulbIcon className="w-5 h-5" /> <span>Чем больше параметров совпало, тем выше приоритет шаблона.</span></p>
                    </div>

                     {/* Step 3: Placeholder Replacement */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">3</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 3: Замена плейсхолдеров</h3>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 mb-6 pl-14 text-base">Функция <code>replacePlaceholders</code> заменяет переменные в тексте на реальные данные, превращая шаблон в интерактивное персонализированное сообщение.</p>
                        <div className="pl-14">
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-md max-w-2xl mx-auto">
                                <p className="text-base text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {"Здравствуйте, "}
                                    <TooltipTerm definition="Например: Иван">
                                        {"{{NAME}}"}
                                    </TooltipTerm>
                                    {"} 🤗 Это София, администратор "}
                                    <TooltipTerm definition="Например: вашего салона">
                                        {"{{COMPANY}}"}
                                    </TooltipTerm>
                                    {".\n Рады видеть вас снова с нами!\n\n 🎁 - "}
                                    <TooltipTerm definition="Например: Скидка 15% на массаж">
                                        {"{{TEXT_PROMO}}"}
                                    </TooltipTerm>
                                    {"\n\n ❗Чтобы получить подарок, покажите это сообщение администратору во время визита.\n\n Подобрать вам удобный день и время для записи? 😊"}
                                </p>
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
                        <div className="relative border-l-2 border-gray-200 dark:border-slate-700 ml-4">
                            {/* Timeline Item 1 */}
                            <div className="mb-8 ml-12">
                                <div className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full ring-8 ring-gray-50 dark:ring-slate-900/50">
                                    <StarIcon className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Приоритет 1: Клиенты с активным абонементом</h4>
                                    <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Это самая ценная группа. Чтобы поддерживать их вовлеченность, система планирует отправку ровно через 30 дней после их последнего визита, мягко напоминая о себе. <br/><strong>Формула:</strong> <code>Дата последнего визита + 30 дней</code></p>
                                </div>
                            </div>
                            {/* Timeline Item 2 */}
                             <div className="mb-8 ml-12">
                                <div className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-slate-700 rounded-full ring-8 ring-gray-50 dark:ring-slate-900/50">
                                    <UsersIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Приоритет 2: Посетители (без абонемента)</h4>
                                    <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Для этой группы используется предиктивная модель, основанная на их поведении:</p>
                                    <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-gray-600 dark:text-slate-400">
                                        <li><strong>Для "Повторных":</strong> Система берет их персональный <TooltipTerm definition={glossary.minInterval}>minInterval</TooltipTerm> и предлагает вернуться за 3 дня до его истечения, работая на опережение. <br/><strong>Формула:</strong> <code>Дата последнего визита + minInterval - 3 дня</code></li>
                                        <li><strong>Для "Разовых":</strong> Так как персональной истории нет, используется общий <TooltipTerm definition={glossary.avgInterval}>avgInterval</TooltipTerm> по всей базе. <br/><strong>Формула:</strong> <code>Дата визита + avgInterval - 3 дня</code></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Timeline Item 3 */}
                            <div className="mb-8 ml-12">
                                <div className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-indigo-100 dark:bg-slate-700 rounded-full ring-8 ring-gray-50 dark:ring-slate-900/50">
                                    <LifebuoyIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Приоритет 3: Покупатели</h4>
                                    <p className="mt-1 text-gray-600 dark:text-slate-400 text-base">Сообщение отправляется немедленно (<code>сегодня</code>), если для них находится подходящий по времени шаблон в листе «Шаблоны». Это позволяет, например, сразу отправить инструкцию после покупки сертификата.</p>
                                </div>
                            </div>
                             {/* Timeline Item 4 */}
                            <div className="ml-12">
                                <div className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full ring-8 ring-gray-50 dark:ring-slate-900/50">
                                    <ExclamationTriangleIcon className="w-6 h-6 text-gray-500 dark:text-slate-400" />
                                </div>
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-slate-100 mt-0">Исключения (не отправлять)</h4>
                                     <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-gray-600 dark:text-slate-400">
                                        <li>Если с клиентом уже общались менее 14 дней назад (чтобы избежать спама).</li>
                                        <li>Если тип клиента — <TooltipTerm definition={glossary.lead}>"Лид"</TooltipTerm> или "Неизвестно".</li>
                                    </ul>
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
    </DocPageLayout>
    );
};

export default ClientSegmentationDocPage;