import React, { useState } from 'react';
import DocPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm, Modal } from '../components/DocUIComponents';
// FIX: Import the missing LifebuoyIcon.
import { 
    RocketLaunchIcon, CircleStackIcon, Cog6ToothIcon, TagIcon, TableCellsIcon, 
    ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon, CpuChipIcon,
    ScaleIcon, UserGroupIcon, IdentificationIcon, FunnelIcon, ChartBarIcon, CalendarDaysIcon, 
    LightBulbIcon, SparklesIcon, ArchiveBoxIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon, ArrowLongDownIcon, StarIcon, UsersIcon, LifebuoyIcon, PaperAirplaneIcon, CheckCircleIcon, ArrowLongRightIcon
} from '@heroicons/react/24/outline';

const InteractiveWorkflowDiagram: React.FC = () => {
    const [isSegmentationModalOpen, setSegmentationModalOpen] = useState(false);
    const [isSendTimeModalOpen, setSendTimeModalOpen] = useState(false);

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
                             <button onClick={() => setSegmentationModalOpen(true)} className="flex-1 text-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                                <UserGroupIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                <span className="text-xs font-semibold">1. Сегментация</span>
                            </button>
                             <button onClick={() => setSendTimeModalOpen(true)} className="flex-1 text-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                                <CalendarDaysIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                <span className="text-xs font-semibold">2. Расчет даты</span>
                            </button>
                            <div className="flex-1 text-center p-2">
                                <TagIcon className="w-6 h-6 mx-auto text-indigo-500 dark:text-indigo-400" />
                                <span className="text-xs font-semibold">3. Сборка сообщения</span>
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
            
            <Modal isOpen={isSegmentationModalOpen} onClose={() => setSegmentationModalOpen(false)} title="Полный свод правил сегментации">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    <h4>БЛОК A: АРХИТЕКТУРНЫЕ ПРИНЦИПЫ</h4>
                    <p><strong>Принцип "idFirst"</strong>: Все ключевые сегменты (тип клиента, тип потребления) в системе представляются не строками ("Посетитель"), а уникальными числовыми идентификаторами (ID = 1). Это делает код более быстрым, надежным и менее зависимым от текстовых названий.</p>

                    <h4>БЛОК B: ГЛОБАЛЬНЫЕ ПРИНЦИПЫ ФИЛЬТРАЦИИ ДАННЫХ</h4>
                    <ol>
                        <li><strong>История визитов</strong>: Все расчеты учитывают ВСЕ доступные данные за весь период. Ограничение в 1.5 года снято.</li>
                        <li><strong>Надежность сравнения статусов</strong>: При сравнении статусов визитов (например, "пришел") используется нормализация текста (регистр, "е"/"ё").</li>
                        <li><strong>Валидация текстовых полей</strong>: Текстовые поля (шаблоны, промо) считаются валидными, только если их длина после удаления пробелов больше 10 символов.</li>
                    </ol>

                    <h4>БЛОК 1: СЕГМЕНТАЦИЯ КЛИЕНТОВ</h4>
                    <p><strong>1.1: Определение типа клиента (по приоритету):</strong></p>
                    <ul>
                        <li><strong>Посетитель</strong>: Есть хотя бы один визит со статусом "пришел".</li>
                        <li><strong>Покупатель</strong>: Нет визитов, но есть покупка.</li>
                        <li><strong>Лид</strong>: Нет визитов и покупок, но есть запись со статусом "не пришел".</li>
                        <li><strong>Неизвестно</strong>: Во всех остальных случаях.</li>
                    </ul>
                    <p><strong>1.3: Определение типа потребления:</strong> Анализ услуг. Если доля Массаж/СПА ≥ 80%, присваивается эта категория. Иначе — "Универсал".</p>
                    <p><strong>1.4: Определение лояльности:</strong> 1 визит ("Разовые"), 2-4 визита ("Повторные 2-4"), ≥ 5 визитов ("Повторные 5+").</p>
                    <p><strong>1.5: Определение активности:</strong> `(сегодня - дата последнего контакта)`. ≤ 90 дней ("Активный"), 91-270 дней ("Пассивный"), &gt; 270 дней ("Потерянный").</p>
                </div>
            </Modal>
             <Modal isOpen={isSendTimeModalOpen} onClose={() => setSendTimeModalOpen(false)} title="Таблица логики расчета времени отправки">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                            <tr>
                                <th className="px-4 py-2">Тип клиента</th>
                                <th className="px-4 py-2">Условие</th>
                                <th className="px-4 py-2">Логика `send_date`</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-slate-300">
                            <tr className="border-b dark:border-slate-700 bg-amber-50 dark:bg-amber-900/20"><td colSpan={3} className="px-4 py-1 text-xs font-bold text-amber-800 dark:text-amber-400">Высший приоритет</td></tr>
                            <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2 font-semibold">Любой</td>
                                <td className="px-4 py-2">✅ Активный абонемент</td>
                                <td className="px-4 py-2"><code>Дата посл. визита + 30д</code></td>
                            </tr>
                            <tr className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50"><td colSpan={3} className="px-4 py-1 text-xs font-bold">Основная логика</td></tr>
                            <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2 font-semibold" rowSpan={2}>Посетитель</td>
                                <td className="px-4 py-2">≥ 2 визитов ("Повторный")</td>
                                <td className="px-4 py-2"><code>Дата посл. визита + (min интервал) - 3д</code></td>
                            </tr>
                             <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2">1 визит ("Разовый")</td>
                                <td className="px-4 py-2"><code>Дата визита + (средний интервал) - 3д</code></td>
                            </tr>
                            <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2 font-semibold" rowSpan={2}>Покупатель</td>
                                <td className="px-4 py-2">Подходит по таймингу из "Шаблонов"</td>
                                <td className="px-4 py-2"><code>сегодня</code></td>
                            </tr>
                            <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2">Последнее сообщение &lt; 14д назад</td>
                                <td className="px-4 py-2"><code>null</code></td>
                            </tr>
                            <tr className="border-b dark:border-slate-700">
                                <td className="px-4 py-2 font-semibold">Лид / Неизвестно</td>
                                <td className="px-4 py-2">-</td>
                                <td className="px-4 py-2"><code>null</code> (не отправлять)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal>
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
                    title="Что это и для кого?"
                    subtitle="«Мозг» для маркетолога, который живет в Google Таблицах. Он сам анализирует клиентов и решает, когда и какое сообщение им отправить, чтобы они вернулись."
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
                    subtitle="Архитектурные решения и глобальные правила обработки данных."
                />
                <div className="space-y-8 mt-8 not-prose">
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0 mb-4">БЛОК A: Архитектурный принцип «idFirst»</h3>
                        <p className="text-gray-700 dark:text-slate-300 text-base">Все ключевые сегменты (тип клиента, тип потребления) в системе представляются не строками ("Посетитель"), а уникальными числовыми идентификаторами (ID = 1). Этот подход, известный как <TooltipTerm definition={glossary.idFirst}>idFirst</TooltipTerm>, делает код более быстрым, надежным и менее зависимым от текстовых названий. Функции сегментации сначала вычисляют текстовое значение, а затем конвертируют его в ID.</p>
                        <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
                             <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-200 mb-4">Пример маппинга ID</h4>
                             <div className="grid md:grid-cols-2 gap-6">
                                 <div>
                                     <h5 className="font-bold mb-2 text-gray-700 dark:text-slate-300">Тип клиента</h5>
                                     <div className="space-y-2 font-mono text-sm">
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 1</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Посетитель"</span>
                                         </div>
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 2</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Покупатель"</span>
                                         </div>
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 3</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Лид"</span>
                                         </div>
                                          <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 4</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Неизвестно"</span>
                                         </div>
                                     </div>
                                 </div>
                                  <div>
                                     <h5 className="font-bold mb-2 text-gray-700 dark:text-slate-300">Тип потребления</h5>
                                     <div className="space-y-2 font-mono text-sm">
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 1</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Массажник"</span>
                                         </div>
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 2</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Спашник"</span>
                                         </div>
                                         <div className="flex items-center gap-4 p-2 bg-white dark:bg-slate-800 rounded-md">
                                             <span className="text-gray-500 dark:text-slate-400">ID: 3</span><span className="text-gray-400 dark:text-slate-500">↔</span><span>"Универсал"</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
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
                    subtitle="Детальное описание правил и функций для категоризации клиентов в различные сегменты."
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
                    subtitle="Пошаговый конвейер сборки персонализированного сообщения."
                />
                
                <div className="space-y-8 mt-8 not-prose">
                    
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
                                <ArrowLongDownIcon className="w-6 h-6" />
                                <span className="ml-2 font-semibold text-sm">Если ничего не найдено</span>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-slate-700 shadow-md">
                                <h4 className="font-bold text-base text-gray-800 dark:text-slate-200 mt-0">Резервный вариант</h4>
                                <p className="text-base text-gray-700 dark:text-slate-300">Берётся общее групповое промо из листа <TooltipTerm definition={glossary.promo_actions}>«Акции»</TooltipTerm>.</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Template Selection */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">2</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 2: Выбор шаблона</h3>
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 mb-6 pl-14 text-base">На основе <TooltipTerm definition={glossary.segment}>сегмента</TooltipTerm> клиента, определённого в БЛОКЕ 1, система находит наиболее подходящий базовый текст сообщения.</p>
                        <div className="flex items-center justify-center gap-4 flex-wrap pl-14">
                            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                                <p className="font-semibold text-gray-800 dark:text-slate-200">Клиентский сегмент</p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">(из БЛОКА 1)</p>
                            </div>
                             <ArrowLongDownIcon className="w-8 h-8 text-gray-400 dark:text-slate-500 rotate-[270deg] md:rotate-0" />
                            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
                                <p className="font-semibold text-gray-800 dark:text-slate-200">Фильтрация листа <TooltipTerm definition={glossary.templates}>«Шаблоны»</TooltipTerm></p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">(по сегменту)</p>
                            </div>
                            <ArrowLongDownIcon className="w-8 h-8 text-gray-400 dark:text-slate-500 rotate-[270deg] md:rotate-0" />
                            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg shadow-sm border border-emerald-200 dark:border-emerald-800">
                                <p className="font-semibold text-emerald-800 dark:text-emerald-300">Выбранный шаблон</p>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">(базовый текст)</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Validation */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">3</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 3: Валидация контента</h3>
                        </div>
                         <div className="pl-14">
                             <InfoCard icon={<ShieldCheckIcon className="w-8 h-8" />} title="Критически важное правило: проверка длины текста">
                                <p className="text-base">
                                    Тексты, полученные на Шаге 1 (промо) и Шаге 2 (шаблон), считаются валидными <strong>только</strong> если их длина после удаления пробелов <strong>больше 10 символов</strong>.
                                </p>
                                <p className="mt-2 text-base text-gray-500 dark:text-slate-400">
                                    Это правило автоматически отсеивает пустые или некорректные значения (например, "null", случайные пробелы), обеспечивая высокое качество исходящих сообщений.
                                </p>
                            </InfoCard>
                        </div>
                    </div>
                    
                     {/* Step 4: Personalization */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-lg">4</div>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-slate-200 mt-0">ШАГ 4: Персонализация (Сборка сообщения)</h3>
                        </div>
                         <p className="text-gray-700 dark:text-slate-300 mb-6 pl-14 text-base">На финальном этапе система объединяет компоненты и заменяет плейсхолдеры на реальные данные клиента.</p>

                        <div className="grid md:grid-cols-2 gap-8 items-start pl-14">
                            <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-700 dark:text-slate-300">Исходные компоненты</h4>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <h5 className="font-bold mb-2 text-gray-800 dark:text-slate-200">Шаблон:</h5>
                                        <p className="text-base text-gray-700 dark:text-slate-300">Здравствуйте, <code className="bg-sky-100 text-sky-800 rounded dark:bg-sky-900 dark:text-sky-300">{`{NAME}`}</code> 🤗 ... Спасибо что вы с нами! 🎁 - <code className="bg-amber-100 text-amber-800 rounded dark:bg-amber-900 dark:text-amber-300">{`{TEXT_PROMO}`}</code></p>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <h5 className="font-bold mb-2 text-gray-800 dark:text-slate-200">Промо:</h5>
                                        <p className="text-base text-gray-700 dark:text-slate-300"><code className="bg-amber-100 text-amber-800 rounded dark:bg-amber-900 dark:text-amber-300">дарим вам скидку 20% на следующий массаж</code></p>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                                        <h5 className="font-bold mb-2 text-gray-800 dark:text-slate-200">Данные клиента:</h5>
                                        <p className="text-base text-gray-700 dark:text-slate-300">Имя: <code className="bg-sky-100 text-sky-800 rounded dark:bg-sky-900 dark:text-sky-300">Анна</code></p>
                                    </div>
                                </div>
                            </div>
                             <div>
                                <h4 className="font-semibold text-lg mb-4 text-gray-700 dark:text-slate-300 flex items-center gap-2"><SparklesIcon className="w-6 h-6 text-yellow-500"/> Финальное сообщение</h4>
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-2 border-green-500 shadow-lg">
                                    <p className="text-gray-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed text-base">Здравствуйте, <code className="bg-sky-100 text-sky-800 font-semibold px-1 rounded dark:bg-sky-900 dark:text-sky-300">Анна</code > 🤗 Это София, администратор Wellness Spa. Спасибо что вы с нами!
                                    <br/><br/>
                                    🎁 - <code className="bg-amber-100 text-amber-800 font-semibold px-1 rounded dark:bg-amber-900 dark:text-amber-300">дарим вам скидку 20% на следующий массаж</code >
                                    <br/><br/>
                                    ❗ Чтобы получить подарок, покажите это сообщение администратору во время визита.
                                    <br/><br/>
                                    Подобрать вам удобный день и время для записи? 😊</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="send-time-logic">
                <SectionHeader 
                    icon={<CalendarDaysIcon className="w-8 h-8" />}
                    title="3. Расчет времени отправки"
                    subtitle="Правила, по которым система вычисляет оптимальную дату для коммуникации."
                />
                <div className="space-y-6 not-prose mt-8">
                    {/* Rule 1: Subscription */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border-2 border-amber-500 shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-amber-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-slate-200 mt-0 flex items-center gap-2"><StarIcon className="w-5 h-5 text-amber-500"/> Особое правило (Абонемент) - высший приоритет</h4>
                        </div>
                        <p className="text-base text-gray-700 dark:text-slate-300 pl-11">Если у клиента есть активный <strong>абонемент на массаж</strong>, применяется фиксированная логика.</p>
                        <div className="mt-4 pl-11 p-3 bg-white dark:bg-slate-800 rounded-md">
                            <code><TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> = Дата последнего визита + 30 дней</code>
                        </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center items-center text-gray-400 dark:text-slate-500"><ArrowLongDownIcon className="w-8 h-8" /></div>

                    {/* Rule 2: Visitors */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-md">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-indigo-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                            <h4 className="font-bold text-lg text-gray-800 dark:text-slate-200 mt-0 flex items-center gap-2"><UserGroupIcon className="w-5 h-5 text-indigo-500"/> Логика для «Посетителей»</h4>
                        </div>
                        <div className="pl-11 space-y-4">
                           <div>
                                <h5 className="font-semibold text-gray-700 dark:text-slate-300">Повторные (≥ 2 визитов):</h5>
                                <p className="text-base text-gray-600 dark:text-slate-400">Прогнозируем следующий визит на основе их личной истории.</p>
                                <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-md">
                                    <code><TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> = Дата посл. визита + (<TooltipTerm definition={glossary.minInterval}>индивид. min интервал</TooltipTerm>) - 3 дня</code>
                                </div>
                           </div>
                           <div>
                                <h5 className="font-semibold text-gray-700 dark:text-slate-300">Разовые (1 визит):</h5>
                                <p className="text-base text-gray-600 dark:text-slate-400">Прогнозируем на основе поведения похожих клиентов.</p>
                                <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-md">
                                    <code><TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> = Дата визита + (<TooltipTerm definition={glossary.avgInterval}>средний интервал по сегменту</TooltipTerm>) - 3 дня</code>
                                </div>
                           </div>
                        </div>
                    </div>

                     {/* Arrow */}
                    <div className="flex justify-center items-center text-gray-400 dark:text-slate-500"><ArrowLongDownIcon className="w-8 h-8" /></div>

                     {/* Rule 3 & 4 */}
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-md">
                             <div className="flex items-center gap-3 mb-3">
                                <span className="bg-gray-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                                <h4 className="font-bold text-lg text-gray-800 dark:text-slate-200 mt-0 flex items-center gap-2"><UsersIcon className="w-5 h-5 text-slate-500"/> Логика для «Покупателей»</h4>
                            </div>
                            <div className="pl-11">
                                <p className="text-base text-gray-600 dark:text-slate-400">Отправляем сообщение, если подходит по таймингу из «Шаблонов» и не спамим (не чаще раза в 14 дней).</p>
                                <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-md">
                                    <code><TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> = сегодня</code>
                                </div>
                            </div>
                        </div>
                         <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-6 border border-gray-200 dark:border-slate-700 shadow-md">
                             <div className="flex items-center gap-3 mb-3">
                                <span className="bg-gray-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                                <h4 className="font-bold text-lg text-gray-800 dark:text-slate-200 mt-0 flex items-center gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-slate-500"/> «Лиды» и «Неизвестные»</h4>
                            </div>
                            <div className="pl-11">
                                <p className="text-base text-gray-600 dark:text-slate-400">Этим категориям клиентов сообщения не отправляются.</p>
                                <div className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-md">
                                    <code><TooltipTerm definition={glossary.send_date}>send_date</TooltipTerm> = null</code>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </section>


            <section id="tech-details">
                <SectionHeader 
                    icon={<CpuChipIcon className="w-8 h-8" />}
                    title="Технические детали и преимущества"
                    subtitle="Интеграции, сильные стороны и решаемые проблемы."
                />
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                    <InfoCard icon={<CircleStackIcon className="w-8 h-8" />} title="Интеграции и архитектура">
                         <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>YClients</b> как источник данных.</li>
                            <li><b>WAHelp</b> как «транспорт» для WhatsApp.</li>
                            <li><b>Google Sheets & Apps Script</b> как ядро системы.</li>
                            <li><b>Расширяемая архитектура</b> для новых каналов (e‑mail, SMS).</li>
                        </ul>
                    </InfoCard>
                    <InfoCard icon={<SparklesIcon className="w-8 h-8" />} title="Ключевые преимущества">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Автоматизация</b> сложных маркетинговых сценариев.</li>
                            <li><b>Глубокая персонализация</b> предложений.</li>
                            <li><b>Простота использования</b> из интерфейса Google Sheets.</li>
                             <li><b>Контроль и стабильность</b> через автотесты и логи.</li>
                        </ul>
                    </InfoCard>
                     <InfoCard icon={<LifebuoyIcon className="w-8 h-8" />} title="Решение проблем WAHelp">
                       <p className="text-base">
                           Стандартный WAHelp не позволяет реализовать сложную сегментацию. Этот проект решает проблему, используя WAHelp только как канал доставки, в то время как вся интеллектуальная работа выполняется в Google Apps Script.
                       </p>
                    </InfoCard>
                </div>
            </section>
        </div>
    </DocPageLayout>
  );
};

export default ClientSegmentationDocPage;