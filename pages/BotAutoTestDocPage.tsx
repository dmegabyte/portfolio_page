


import React from 'react';
import DocPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy } from '../components/DocumentationUIComponents';
import { BugAntIcon, CogIcon, PlayCircleIcon, CodeBracketIcon, ChatBubbleBottomCenterTextIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const BotAutoTestDocPage: React.FC = () => {
  return (
    <DocPageLayout title="AI-тестировщик чат-ботов">
        <div className="space-y-12">
            <section id="overview">
                <SectionHeader 
                    icon={<BugAntIcon className="w-8 h-8" />}
                    title="Общее описание"
                    subtitle="Универсальная система автоматизированного тестирования чат-ботов и промо-акций."
                />
                <p>
                    <b>BOT_AUTO_TEST</b> — система, которая проверяет корректность условий акций, ответы бота и работу интерфейса. Проект построен на базе <b>Playwright / Selenium</b> для эмуляции действий пользователя и поддерживает работу через <b>REST API</b>. Финальные отчёты формируются <b>LLM-моделью</b>, которая анализирует диалоги и сверяет их с загруженными файлами (например, <code>promo.json</code>).
                </p>
            </section>

            <section id="scenarios">
                 <SectionHeader 
                    icon={<CogIcon className="w-8 h-8" />}
                    title="Гибкая настройка сценариев"
                    subtitle="Адаптация тестов под конкретные бизнес-правила."
                />
                <ul className="list-disc list-inside space-y-2">
                    <li>Сценарии могут задаваться в свободной форме или как фиксированный диалог.</li>
                    <li>Если есть список акций, LLM анализирует его, формирует тест-кейсы, задаёт вопросы и ожидает ответы.</li>
                    <li>Ответы автоматически сверяются с условиями акций, прописанными в правилах.</li>
                    <li>Метрики (корректность, полнота, исключения) формулируются в свободной форме.</li>
                </ul>
            </section>
            
            <section id="bot-types">
                <SectionHeader 
                    icon={<ChatBubbleBottomCenterTextIcon className="w-8 h-8" />}
                    title="Поддержка разных типов ботов"
                    subtitle="Тестирование как для жёстких, так и для свободных сценариев."
                />
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="NLU-боты (жёсткие сценарии)">
                        <ul className="list-disc list-inside">
                          <li>Алгоритмические правила и предопределённые интенты.</li>
                          <li>Фиксированные сценарии: «вопрос → ожидаемый ответ».</li>
                          <li>Подходит для проверки точности скриптовых диалогов.</li>
                        </ul>
                    </InfoCard>
                    <InfoCard icon={<CpuChipIcon className="w-8 h-8" />} title="LLM-боты (свободная форма)">
                        <ul className="list-disc list-inside">
                          <li>Вариативные ответы на естественном языке.</li>
                          <li>Сценарии задаются в свободной форме, проверяется соответствие сути.</li>
                          <li>Метрики оценивают корректность и полноту, а не дословное совпадение.</li>
                        </ul>
                    </InfoCard>
                </div>
            </section>
            
            <section id="workflow">
                 <SectionHeader 
                    icon={<PlayCircleIcon className="w-8 h-8" />}
                    title="Механика и флоу работы"
                    subtitle="От загрузки правил до финального отчета."
                />
                <p>Процесс тестирования автоматизирован и проходит следующие этапы:</p>
                <ol className="list-decimal list-inside space-y-2 mt-4">
                    <li>Загружается справочный файл (например, <code>promo.json</code> со списком акций).</li>
                    <li>LLM анализирует файл и формирует набор тест-кейсов под материал.</li>
                    <li>Выполняются сценарии (через API или эмуляцию UI), фиксируются вопросы и ответы бота.</li>
                    <li>Ответы сверяются с правилами акции и ожидаемыми условиями.</li>
                    <li>Финальный отчёт формируется автоматически LLM на основании загруженного файла и реального диалога.</li>
                </ol>
            </section>

            <section id="example">
                 <SectionHeader 
                    icon={<CodeBracketIcon className="w-8 h-8" />}
                    title="Пример диалога для LLM-анализа"
                    subtitle="Тестирование бота поддержки по акции «1+1=3»."
                />
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-slate-900/50 not-prose text-sm space-y-2 dark:border-slate-700">
                    <p><b className="text-green-700 dark:text-green-400">CLIENT:</b> Здравствуйте! Вчера я совершила покупку по акции «1+1=3», но бесплатный товар мне не был предоставлен. Все условия я выполнила. Подскажите, почему могла не сработать акция?</p>
                    <p><b className="text-gray-800 dark:text-slate-200">BOT:</b> Акция «1+1=3» работает так: при покупке трёх товаров один из них с наименьшей ценой предоставляется бесплатно. Проверьте, что в вашей покупке было ровно три товара и что они не относятся к исключённым брендам. Если все условия выполнены, рекомендую обратиться в службу поддержки магазина.</p>
                     <p><b className="text-green-700 dark:text-green-400">CLIENT:</b> Понятно, спасибо за разъяснение! Я покупала косметику других брендов. Что мне теперь делать, чтобы получить бесплатный товар?</p>
                     <p><b className="text-gray-800 dark:text-slate-200">BOT:</b> Если все условия соблюдены, вы можете обратиться в магазин с кассовым чеком. Сотрудники помогут подтвердить участие в акции и выдать бесплатный товар.</p>
                </div>
            </section>
        </div>
    </DocPageLayout>
  );
};

export default BotAutoTestDocPage;
