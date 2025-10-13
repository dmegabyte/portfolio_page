import React from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TooltipTerm } from '../components/DocumentationUIComponents';
import { 
    CpuChipIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, ServerStackIcon, 
    WrenchScrewdriverIcon, CircleStackIcon, InboxArrowDownIcon, ScaleIcon,
    ArrowLongRightIcon, LightBulbIcon
} from '@heroicons/react/24/outline';

const GptAssistantDocumentationPage: React.FC = () => {
    const modules = [
        { name: '01_ErrorHandler.js', desc: 'Обработка ошибок.' },
        { name: '02_Utils.js', desc: 'Вспомогательные функции.' },
        { name: '03_GptApi.js', desc: 'Управление моделями.' },
        { name: '04_Omnidesk.js', desc: 'Взаимодействие с тикет-системой.' },
        { name: '05_Triggers.js', desc: 'Запуск задач.' },
        { name: '06_History.js', desc: 'Хранение истории.' },
        { name: '07_ReportGenerator.js', desc: 'Генерация отчётов.' },
        { name: '08_UrlValidator.js', desc: 'Проверка ссылок.' },
        { name: '10_AdvancedSpamFilter.js', desc: 'Фильтрация спама.' },
        { name: '12_PlaygroundTester.js', desc: 'Тестирование.' },
        { name: 'CONFIG.js', desc: 'Параметры системы.' }
    ];

    const metrics = [
        { stage: 'Этап 1', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '12.5%', accuracy: '4.86', style: '4.86' },
        { stage: 'Этап 2', model: 'gemini-2.5-flash + GPT-4o', auto_reply: '23.6%', accuracy: '6.60', style: '6.90' },
        { stage: 'Этап 5', model: 'gemini-2.5-flash', auto_reply: '76.1%', accuracy: '6.05', style: '7.48' }
    ];

    return (
        <DocumentationPageLayout title="GPT-ассистент с RAG">
            <div className="space-y-16">

                <section id="overview">
                    <SectionHeader 
                        icon={<CpuChipIcon className="w-8 h-8" />}
                        title="Обзор системы"
                        subtitle="Автоматизация обращений клиентов для службы поддержки. GPT Assistant объединяет возможности GPT и Gemini, Omnidesk и Google Sheets для разгрузки операторов."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8"/>} title="Ключевые возможности">
                        <ul className="list-disc list-inside space-y-2">
                            <li><b>Автоматизация:</b> Фильтрует спам, проверяет ссылки, извлекает факты и генерирует ответы на основе базы знаний.</li>
                            <li><b>Гибридный AI-подход:</b> Использует связку моделей <TooltipTerm definition="Семейство моделей от Google, используемое для анализа контекста и саммаризации.">gemini-2.5-flash</TooltipTerm> и <TooltipTerm definition="Модель от OpenAI, применяемая для генерации финального ответа на основе подготовленного контекста.">GPT-4o</TooltipTerm> для достижения оптимального качества и скорости.</li>
                            <li><b>Аналитика и отчётность:</b> Собирает статистику по эффективности автоматизации и формирует наглядные отчёты.</li>
                        </ul>
                    </InfoCard>
                </section>
                
                <section id="workflow">
                    <SectionHeader 
                        icon={<WrenchScrewdriverIcon className="w-8 h-8" />}
                        title="Механика обработки тикета"
                        subtitle="Пошаговый процесс анализа и ответа на обращение клиента."
                    />
                    <div className="not-prose my-8">
                        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">Жизненный цикл тикета</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                                <div className="flex flex-col items-center w-48">
                                    <InboxArrowDownIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>
                                    <h4 className="font-semibold mt-2 text-gray-800 dark:text-slate-200">1. Входящая обработка</h4>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Очистка, проверка на спам и безопасность ссылок.</p>
                                </div>
                                <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                                <div className="flex flex-col items-center w-48">
                                    <ServerStackIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>
                                    <h4 className="font-semibold mt-2 text-gray-800 dark:text-slate-200">2. RAG и генерация</h4>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Поиск фактов в векторной базе, сборка промпта и генерация ответа.</p>
                                </div>
                                <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                                <div className="flex flex-col items-center w-48">
                                    <ScaleIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500"/>
                                    <h4 className="font-semibold mt-2 text-gray-800 dark:text-slate-200">3. Принятие решений</h4>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Расчет `confident-score`. Если высокий — автоответ, иначе — черновик.</p>
                                </div>
                                 <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                                <div className="flex flex-col items-center w-48">
                                    <DocumentTextIcon className="w-12 h-12 p-2 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-full text-green-600 dark:text-green-400"/>
                                    <h4 className="font-semibold mt-2 text-green-800 dark:text-green-300">4. Контекстное саммари</h4>
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Gemini анализирует последние 3 обращения и пишет краткую сводку для оператора.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="knowledge-base">
                     <SectionHeader 
                        icon={<CircleStackIcon className="w-8 h-8" />}
                        title="База знаний и RAG"
                        subtitle="Основа для генерации точных и контекстуальных ответов."
                    />
                    <p>
                        Система использует технологию <TooltipTerm definition="Retrieval-Augmented Generation — подход, при котором языковая модель перед генерацией ответа получает релевантную информацию из внешней базы данных.">RAG</TooltipTerm> для доступа к актуальной информации. База знаний формируется из реальных вопросов клиентов и ответов операторов. Этот датасет регулярно выгружается, очищается от персональных данных, размечается и преобразуется в векторы для быстрого семантического поиска.
                    </p>
                </section>

                <section id="modules">
                    <SectionHeader 
                        icon={<ShieldCheckIcon className="w-8 h-8" />}
                        title="Модули и их ответственность"
                        subtitle="Архитектура системы построена на независимых, переиспользуемых модулях."
                    />
                    <div className="overflow-x-auto mt-6 not-prose">
                        <table className="w-full text-left border-collapse">
                             <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Модуль</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Описание</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                {modules.map(module => (
                                    <tr key={module.name} className="border-b dark:border-slate-700">
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400">{module.name}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700">{module.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <section id="metrics">
                    <SectionHeader 
                        icon={<ChartBarIcon className="w-8 h-8" />}
                        title="Метрики и динамика"
                        subtitle="Ключевые показатели эффективности системы на разных этапах развития."
                    />
                     <div className="overflow-x-auto mt-6 not-prose">
                        <table className="w-full text-left border-collapse">
                            <thead className="text-sm font-semibold text-gray-800 dark:text-slate-200 bg-gray-100 dark:bg-slate-800">
                                <tr>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Этап</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Модель</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Доля автоответов</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Точность (1-10)</th>
                                    <th className="p-4 border border-gray-200 dark:border-slate-700">Стилистика (1-10)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300">
                                {metrics.map(metric => (
                                    <tr key={metric.stage} className="border-b dark:border-slate-700">
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-semibold">{metric.stage}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700">{metric.model}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.auto_reply}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.accuracy}</td>
                                        <td className="p-4 border-x border-gray-200 dark:border-slate-700 font-mono text-center">{metric.style}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DocumentationPageLayout>
    );
};

export default GptAssistantDocumentationPage;
