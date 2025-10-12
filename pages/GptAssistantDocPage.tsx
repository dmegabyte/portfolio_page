
import React from 'react';
import DocPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CollapsibleSection } from '../components/DocUIComponents';
import { ChatBubbleLeftRightIcon, CpuChipIcon, CommandLineIcon, CircleStackIcon, CogIcon, DocumentChartBarIcon, BeakerIcon, ArrowDownCircleIcon } from '@heroicons/react/24/outline';

const GptAssistantDocPage: React.FC = () => {
  return (
    <DocPageLayout title="GPT-ассистент">
        <div className="space-y-12">
            
            <section id="overview">
                <SectionHeader 
                    icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
                    title="Обзор системы"
                    subtitle="Автоматизация обращений клиентов для службы поддержки."
                />
                <p>
                    <strong>GPT Assistant</strong> — это система, объединяющая возможности GPT и Gemini, управление тикетами Omnidesk и Google Sheets. Цель — разгрузить операторов, ускорить ответы и повысить качество сервиса, не пытаясь полностью заменить человека.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6 not-prose">
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="Автоматизация">
                        Фильтрует спам, проверяет ссылки, извлекает факты из базы знаний и генерирует ответы.
                    </InfoCard>
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="ИИ-модели">
                        Использует Gemini Flash + GPT-4o или Gemini Pro для генерации качественных ответов.
                    </InfoCard>
                    <InfoCard icon={<DocumentChartBarIcon className="w-8 h-8" />} title="Аналитика">
                        Собирает статистику, анализирует качество и формирует отчёты для улучшения системы.
                    </InfoCard>
                </div>
            </section>
            
            <section id="workflow">
                 <SectionHeader 
                    icon={<CogIcon className="w-8 h-8" />}
                    title="Механика обработки"
                    subtitle="Пошаговый процесс от получения тикета до ответа."
                />
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-base">1</div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-200">Входящая обработка</h4>
                            <p className="text-base text-gray-600 dark:text-slate-400">Система забирает новый тикет, очищает текст, удаляет подписи и проходит этап проверки безопасности (URL-validator, Spam Filter).</p>
                        </div>
                    </div>
                    <div className="flex justify-center"><ArrowDownCircleIcon className="w-8 h-8 text-gray-300 dark:text-slate-600"/></div>
                     <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-base">2</div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-200">RAG и генерация ответов</h4>
                            <p className="text-base text-gray-600 dark:text-slate-400">Из векторной базы (Q&A-пары из Google Sheets) выбираются релевантные факты. Модуль GPT API собирает промпт: системные правила, стилистика, факты, задача.</p>
                        </div>
                    </div>
                     <div className="flex justify-center"><ArrowDownCircleIcon className="w-8 h-8 text-gray-300 dark:text-slate-600"/></div>
                     <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-base">3</div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-200">Принятие решений</h4>
                            <p className="text-base text-gray-600 dark:text-slate-400">Считается <strong>confident-score</strong>. Если уверенность достаточна и тема не чувствительная, ответ отправляется клиенту автоматически. В противном случае формируется черновик для оператора.</p>
                        </div>
                    </div>
                     <div className="flex justify-center"><ArrowDownCircleIcon className="w-8 h-8 text-gray-300 dark:text-slate-600"/></div>
                     <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-base">4</div>
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 dark:text-slate-200">Контекстное саммари</h4>
                            <p className="text-base text-gray-600 dark:text-slate-400">По ID пользователя система может взять 3 последних обращения, отправить их в Gemini и получить краткое саммари, которое прикладывается к тикету для оператора.</p>
                        </div>
                    </div>
                </div>
            </section>

             <section id="documentation">
                <SectionHeader 
                    icon={<CircleStackIcon className="w-8 h-8" />}
                    title="База знаний и модули"
                    subtitle="Основа для RAG и структура кода."
                />
                 <CollapsibleSection title="База знаний и RAG" defaultOpen>
                    <p>База знаний формируется из реальных вопросов клиентов. Изначально она покрывала лишь малую долю запросов, поэтому была построена новая Q&A-база:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Выгрузка тикетов и очистка формулировок.</li>
                        <li>Удаление дублей и разметка по категориям в Google Sheets.</li>
                        <li>Записи преобразуются в векторы, что позволяет быстро находить похожие вопросы.</li>
                    </ul>
                </CollapsibleSection>
                <CollapsibleSection title="Модули и ответственность">
                    <div className="grid md:grid-cols-2 gap-4 text-sm mt-4">
                        <div><strong>01_ErrorHandler.js:</strong> Централизованная обработка ошибок.</div>
                        <div><strong>02_Utils.js:</strong> Вспомогательные функции, основная логика.</div>
                        <div><strong>03_GptApi.js:</strong> Управление моделями, промптами, токенами.</div>
                        <div><strong>04_Omnidesk.js:</strong> Взаимодействие с тикет-системой.</div>
                        <div><strong>05_Triggers.js:</strong> Запуск задач по расписанию.</div>
                        <div><strong>06_History.js:</strong> Хранение истории, генерация саммари.</div>
                        <div><strong>07_ReportGenerator.js:</strong> Сбор статистики и отчётов.</div>
                        <div><strong>08_UrlValidator.js:</strong> Проверка и коррекция ссылок.</div>
                        <div><strong>10_AdvancedSpamFilter.js:</strong> Фильтрация спама.</div>
                        <div><strong>12_PlaygroundTester.js:</strong> Тестирование агентов.</div>
                        <div><strong>CONFIG.js:</strong> Ключевые параметры системы.</div>
                    </div>
                </CollapsibleSection>
             </section>

            <section id="metrics">
                 <SectionHeader 
                    icon={<DocumentChartBarIcon className="w-8 h-8" />}
                    title="Метрики и динамика"
                    subtitle="Рост доли автоответов и качества на разных этапах."
                />
                <div className="overflow-x-auto not-prose">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-slate-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Этап</th>
                                <th scope="col" className="px-6 py-3">Модель</th>
                                <th scope="col" className="px-6 py-3">Доля автоответов</th>
                                <th scope="col" className="px-6 py-3">Точность (1-10)</th>
                                <th scope="col" className="px-6 py-3">Стилистика (1-10)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4">Этап 1</td>
                                <td className="px-6 py-4">Flash + GPT-4o</td>
                                <td className="px-6 py-4 font-semibold">12.5%</td>
                                <td className="px-6 py-4">4.86</td>
                                <td className="px-6 py-4">4.86</td>
                            </tr>
                             <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4">Этап 2</td>
                                <td className="px-6 py-4">Flash + GPT-4o</td>
                                <td className="px-6 py-4 font-semibold">23.6%</td>
                                <td className="px-6 py-4">6.60</td>
                                <td className="px-6 py-4">6.90</td>
                            </tr>
                              <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4">Этап 5</td>
                                <td className="px-6 py-4">Gemini Pro</td>
                                <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">76.1%</td>
                                <td className="px-6 py-4">6.05</td>
                                <td className="px-6 py-4">7.48</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </DocPageLayout>
  );
};

export default GptAssistantDocPage;