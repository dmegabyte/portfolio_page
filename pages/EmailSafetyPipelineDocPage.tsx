
import React from 'react';
import DocPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy } from '../components/DocUIComponents';
import { ShieldCheckIcon, EnvelopeOpenIcon, CodeBracketIcon, CogIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

const EmailSafetyPipelineDocPage: React.FC = () => {
  return (
    <DocPageLayout title="Пайплайн безопасности email">
        <div className="space-y-12">
            <section id="overview">
                <SectionHeader 
                    icon={<ShieldCheckIcon className="w-8 h-8" />}
                    title="Обзор проекта"
                    subtitle="Автоматическая проверка email-шаблонов перед отправкой."
                />
                <p>
                    Этот проект представляет собой автоматизированный конвейер (пайплайн) для всесторонней проверки HTML-шаблонов email-сообщений. Система состоит из трёх этапов, каждый из которых анализирует разные аспекты письма — от репутации отправителя до контента, — и выносит итоговое решение: <span className="font-semibold text-green-600 dark:text-green-400">GO</span> (разрешить) или <span className="font-semibold text-red-600 dark:text-red-400">STOP</span> (блокировать).
                </p>
                <div className="my-6 not-prose overflow-hidden">
                    <svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title_pipeline" role="img" className="w-full h-auto">
                      <title id="title_pipeline">Диаграмма пайплайна анализа email</title>
                      <defs>
                        <style>
                          {`
                            .box {
                                fill: #FFFFFF;
                                stroke: #E2E8F0;
                                stroke-width: 1.5;
                                rx: 12;
                                ry: 12;
                            }
                            .dark .box {
                                fill: #1e293b;
                                stroke: #334155;
                            }
                            .h { font: 600 18px ui-sans-serif, system-ui, sans-serif; fill: #1E293B; }
                            .dark .h { fill: #F1F5F9; }
                            .t { font: 400 14px ui-sans-serif, system-ui, sans-serif; fill: #475569; }
                            .dark .t { fill: #94A3B8; }
                            .arrow { stroke: #64748B; stroke-width: 2.5; marker-end: url(#arrowhead); }
                            .dark .arrow { stroke: #94A3B8; }
                          `}
                        </style>
                        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                        </marker>
                      </defs>
                      
                      {/* Stage 1 */}
                      <rect className="box" x="20" y="40" width="280" height="120" />
                      <text x="160" y="75" textAnchor="middle" className="h">Stage 1 — Reputation</text>
                      <text x="160" y="100" textAnchor="middle" className="t">Проверка репутации отправителя</text>
                      <text x="160" y="125" textAnchor="middle" className="t font-bold text-red-500 dark:text-red-400">Вердикт: red / yellow / green</text>
                      
                      {/* Arrow 1 */}
                      <line x1="310" y1="100" x2="350" y2="100" className="arrow" />
                      
                      {/* Stage 2 */}
                      <rect className="box" x="360" y="40" width="280" height="120" />
                      <text x="500" y="75" textAnchor="middle" className="h">Stage 2 — Content</text>
                      <text x="500" y="100" textAnchor="middle" className="t">Анализ HTML, темы, ссылок</text>
                      <text x="500" y="125" textAnchor="middle" className="t font-bold text-yellow-500 dark:text-yellow-400">Флаги: high-risk / ambiguous</text>
                      
                       {/* Arrow 2 */}
                      <line x1="650" y1="100" x2="690" y2="100" className="arrow" />
                      
                      {/* Stage 3 */}
                      <rect className="box" x="700" y="40" width="280" height="120" />
                      <text x="840" y="75" textAnchor="middle" className="h">Stage 3 — Final</text>
                      <text x="840" y="100" textAnchor="middle" className="t">Агрегация Stage 1 + 2</text>
                      <text x="840" y="125" textAnchor="middle" className="t font-bold text-green-500 dark:text-green-400">Решение: GO / STOP</text>
                    </svg>
                </div>
            </section>
            
            <section id="stages">
                 <SectionHeader 
                    icon={<CogIcon className="w-8 h-8" />}
                    title="Этапы анализа"
                    subtitle="Как пайплайн анализирует email-шаблон."
                />
                <div className="space-y-6">
                    <InfoCard icon={<ShieldCheckIcon className="w-8 h-8"/>} title="Stage 1 — Reputation Analyzer">
                        <p>Оценивает доверие к источнику письма (email, домен, комментарии, аудит). Возвращает один из статусов: <span className="font-semibold text-red-600">Red</span>, <span className="font-semibold text-yellow-600">Yellow</span>, <span className="font-semibold text-green-600">Green</span>.</p>
                    </InfoCard>
                    <InfoCard icon={<EnvelopeOpenIcon className="w-8 h-8"/>} title="Stage 2 — ESP Email Safety Checker">
                        <p>Глубокий анализ HTML, темы, текста и вложений. Находит признаки фишинга, скама и манипуляций. Сигналы классифицируются как <span className="font-semibold text-red-600">High-risk</span> или <span className="font-semibold text-yellow-600">Ambiguous</span>.</p>
                    </InfoCard>
                    <InfoCard icon={<CheckBadgeIcon className="w-8 h-8" />} title="Stage 3 — Combined Final Analyzer">
                        <p>Объединяет результаты Stage 1 и Stage 2. Выносит итоговое решение: <span className="font-semibold text-green-600">GO</span> (разрешить) или <span className="font-semibold text-red-600">STOP</span> (заблокировать), формируя отчет в человеко-читаемом виде.</p>
                    </InfoCard>
                </div>
            </section>

            <section id="report-example">
                 <SectionHeader 
                    icon={<CodeBracketIcon className="w-8 h-8" />}
                    title="Пример отчёта"
                    subtitle="Фрагмент итогового отчета по агрессивному маркетинговому письму."
                />
                <CodeBlockWithCopy
                    title="report_example.json"
                    code={`
{
  "verdict": "red",
  "reasons": [
    {
      "field": "html",
      "flag": "yellow",
      "comment": "Слова срочности и давления"
    },
    {
      "field": "html",
      "flag": "red",
      "comment": "Нереалистичные финансовые обещания"
    },
    {
      "field": "html",
      "flag": "red",
      "comment": "Агрессивный призыв к действию"
    },
    {
      "field": "html",
      "flag": "red",
      "comment": "Манипулятивный тон письма"
    },
    {
      "field": "html",
      "flag": "yellow",
      "comment": "Тематика: Гэмблинг и розыгрыши (conf=0.95)"
    }
  ]
}
                    `}
                />
            </section>
        </div>
    </DocPageLayout>
  );
};

export default EmailSafetyPipelineDocPage;