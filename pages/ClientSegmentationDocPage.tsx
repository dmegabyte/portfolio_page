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
                                    <UserGroupIcon className="w-6