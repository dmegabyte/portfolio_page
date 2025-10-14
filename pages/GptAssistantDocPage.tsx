import React, { useState, ReactNode } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm, DefinitionList, Modal } from '../components/DocumentationUIComponents';
import { 
    ChatBubbleLeftRightIcon, BookOpenIcon, CpuChipIcon, MagnifyingGlassIcon,
    CircleStackIcon, DocumentTextIcon, ArrowDownCircleIcon, Cog6ToothIcon, LightBulbIcon,
    PuzzlePieceIcon, QuestionMarkCircleIcon, ArrowLongRightIcon, SparklesIcon, UserIcon, LinkIcon,
    ArrowDownTrayIcon, ArrowUpTrayIcon, EyeIcon, CubeTransparentIcon, BoltIcon,
    DocumentDuplicateIcon, CheckCircleIcon, ExclamationCircleIcon, ClockIcon, ArrowPathIcon
} from '@heroicons/react/24/outline';

const GptAssistantDocumentationPage: React.FC = () => {
    const [modalData, setModalData] = useState<any>(null);

    const transformationDetails = {
        step1: {
            title: "Детали трансформации: Шаг 1: Подготовка данных",
            input: {
                title: "Вход: Сообщение клиента (Raw HTML)",
                code: `<img alt="pixel" src="..." />
Добрый день!<br /><br />Прошу Вас помощи для подключения сайта к яндекс вебмастеру.<br /><br />В корневой папке сайта создайте файл с именем yandex_9aaf9dd87bc62c36.html...
<div>
    <h2 style="font-size:16px;">Системная информация</h2>
    <hr />
    <span style="color:#444;">form: </span>
    <span>help-ru</span>
    ...
</div>`
            },
            output: {
                title: "Выход: Столбцы `question`, `subject`...",
                code: `question: "<img alt=\\"pixel\\" src=...>"
subject: "Помощь с сайтом"
case_link: "..."`
            }
        },
        step2: {
            title: "Детали трансформации: Шаг 2: AI-анализ",
            input: {
                title: "Вход: Столбец `clean_question`",
                code: "Добрый день! Прошу Вас помощи для подключения сайта к яндекс вебмастеру..."
            },
            output: {
                title: "Выход: Столбцы `gpt_response`, `score`",
                code: `gpt_response: "Чтобы подтвердить права на сайт в Яндекс.Вебмастере, вам нужно..."
score: 91`
            }
        },
        step3: {
            title: "Детали трансформации: Шаг 3: Результат и Действие",
            input: {
                title: "Вход: Столбцы `gpt_response`, `score`",
                code: `gpt_response: "Чтобы подтвердить права на сайт в Яндекс.Вебмастере, вам нужно..."
score: 91`
            },
            output: {
                title: "Выход: Столбцы `status`, `JSON`",
                code: `status: "Подсказка"
JSON: "{ \\"question\\": \\"...\\", \\"candidates\\": [...] }"`
            }
        },
    };

    const openModal = (data: any) => {
        setModalData(data);
    };

    return (
    <DocumentationPageLayout title="GPT-ассистент с RAG">
      <div className="space-y-16">
        
        <section id="concept" className="scroll-mt-24">
            <SectionHeader 
                icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
                title="1. Концепция и Главная идея"
                subtitle="Создание интеллектуального ассистента, который отвечает на вопросы, основываясь на актуальной внутренней базе знаний, а не только на общих данных, заложенных в модель."
            />
             <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Принцип №7)">
                <ul className="list-disc list-inside space-y-2 text-base">
                    <li><b>Проблема:</b> Стандартные <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных.">LLM</TooltipTerm> не знают специфической информации о вашей компании и продуктах.</li>
                    <li><b>Решение:</b> Технология <strong>Retrieval-Augmented Generation (RAG)</strong>. Она «подключает» к <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных.">LLM</TooltipTerm> внешнюю базу знаний.</li>
                    <li><b>Результат:</b> Ассистент дает точные, контекстуальные ответы, снижая нагрузку на службу поддержки.</li>
                    <li><b>Главный принцип:</b> Ассистент — это не замена, а **цифровой напарник** оператора, который готовит черновики ответов, экономя время, но оставляя контроль за человеком.</li>
                </ul>
            </InfoCard>
        </section>

        <section id="ticket-lifecycle" className="scroll-mt-24">
            <SectionHeader 
                icon={<ArrowPathIcon className="w-8 h-8" />}
                title="2. Единый цикл обработки тикета"
                subtitle="Пошаговый процесс: от получения сырого запроса до предложения готового ответа оператору."
            />
            <div className="not-prose my-8">
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                        {/* Flow Start */}
                        <div className="flex flex-col items-center w-48 p-2">
                            <UserIcon className="w-12 h-12 p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-full text-indigo-500 mb-3"/>
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">Запрос клиента</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Поступает в Omnidesk</p>
                        </div>
                        <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />
                        
                        {/* AI Core */}
                        <div className="flex flex-col items-center w-64 p-4 rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700">
                           <BoltIcon className="w-12 h-12 p-2 bg-indigo-100 dark:bg-slate-700 rounded-full text-indigo-500 mb-3"/>
                           <h3 className="font-semibold text-gray-800 dark:text-slate-200">AI-анализ (gpttunnel)</h3>
                           <p className="text-sm text-gray-500 dark:text-slate-400">Очистка → RAG-поиск → Генерация → Расчет <TooltipTerm definition="Оценка уверенности модели (от 0 до 100), что ответ соответствует вопросу.">score</TooltipTerm></p>
                        </div>
                        <ArrowLongRightIcon className="w-10 h-10 text-gray-300 dark:text-slate-600 hidden md:block" />

                        {/* Decision Fork */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Path 1: High Score */}
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 w-full md:w-80">
                                <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400 flex-shrink-0"/>
                                <div className="text-left">
                                    <h3 className="font-semibold text-green-800 dark:text-green-300">Score ≥ 80%</h3>
                                    <p className="text-sm text-green-900 dark:text-green-200">Ответ передаётся в Google Sheet как **«Подсказка оператору»**.</p>
                                </div>
                            </div>
                            {/* Path 2: Low Score */}
                            <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 w-full md:w-80">
                                <ExclamationCircleIcon className="w-10 h-10 text-amber-600 dark:text-amber-400 flex-shrink-0"/>
                                <div className="text-left">
                                    <h3 className="font-semibold text-amber-800 dark:text-amber-300">Score &lt; 80%</h3>
                                    <p className="text-sm text-amber-900 dark:text-amber-200">Ответ **не отправляется**, сохраняется только JSON-лог. Тикет остается на операторе.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="gpttunnel-mechanics" className="scroll-mt-24">
            <SectionHeader 
                icon={<Cog6ToothIcon className="w-8 h-8" />}
                title="3. Под капотом: Механика gpttunnel"
                subtitle="Центральный узел системы, который выполняет всю основную интеллектуальную работу: от векторизации до генерации ответа."
            />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Логика внутренней обработки</h3>
            <div className="not-prose my-8">
                 <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
                    {/* Stage 1 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <MagnifyingGlassIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 1: Подготовка и Поиск</h4>
                        <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300">
                            <li>Получение запроса</li>
                            <li>Векторизация запроса</li>
                            <li>Поиск в Vector DB</li>
                        </ol>
                    </div>

                    <div className="flex items-center justify-center">
                        <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 hidden md:block" />
                    </div>

                    {/* Stage 2 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <CpuChipIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 2: Анализ и Генерация</h4>
                        <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300" start={4}>
                            <li>Анализ кандидатов</li>
                            <li>Сборка «контекстного пакета»</li>
                            <li>Запрос к LLM</li>
                        </ol>
                    </div>

                     <div className="flex items-center justify-center">
                        <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600 hidden md:block" />
                    </div>

                    {/* Stage 3 */}
                    <div className="flex-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700 flex flex-col items-center text-center">
                        <DocumentDuplicateIcon className="w-10 h-10 mb-3 text-indigo-500"/>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Этап 3: Формирование и Возврат</h4>
                         <ol className="list-decimal list-inside text-left space-y-2 mt-4 text-sm text-gray-700 dark:text-slate-300" start={7}>
                            <li>Получение результата</li>
                            <li>Формирование лога</li>
                            <li>Возврат результата</li>
                        </ol>
                    </div>
                </div>
            </div>

             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-4">Контекстный пакет (Context Bundle)</h3>
             <p>Внутренний документ, который gpttunnel формирует перед обращением к модели. Именно он определяет, какую информацию увидит LLM.</p>
            <CodeBlockWithCopy title="Пример структуры Context Bundle" code={`{
  "question": "Как восстановить пароль?",
  "context": [
    {"category": "Авторизация", "score": 0.91, "text": "...инструкция по восстановлению..."},
    {"category": "Аккаунт", "score": 0.77, "text": "...дополнительные сведения..."}
  ],
  "dialog_history": "...",
  "system_guidelines": "...формат ответа, стиль, ограничения..."
}`} />
            <DefinitionList items={[
                { term: 'question', definition: 'Очищенный вопрос клиента.' },
                { term: 'context', definition: 'Массив найденных релевантных фрагментов из RAG-базы с их весом.' },
                { term: 'dialog_history', definition: 'История предыдущих сообщений в диалоге для сохранения контекста.' },
                { term: 'system_guidelines', definition: 'Системные инструкции для модели (стиль ответа, ограничения, формат).' }
            ]} />
        </section>

        <section id="model-evolution" className="scroll-mt-24">
            <SectionHeader 
                icon={<SparklesIcon className="w-8 h-8" />}
                title="4. Эволюция архитектуры: от каскада к рассуждению"
                subtitle="Как система перешла от сложной трехуровневой схемы к одной, более мощной и предсказуемой модели."
            />
            <div className="grid md:grid-cols-2 gap-8 items-start not-prose">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 h-full">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-2"><ExclamationCircleIcon className="w-6 h-6 text-amber-500" />Ранняя архитектура (Каскад моделей)</h3>
                    <p className="mt-2 text-base text-slate-700 dark:text-slate-300">Изначально система использовала связку из трёх моделей для баланса скорости и качества:</p>
                    <ul className="list-decimal list-inside space-y-2 mt-4 text-base">
                        <li><b>Level 1 (Gemini 2.5 Flash):</b> Быстрый RAG-поиск по внутренней базе.</li>
                        <li><b>Level 2 (GPT-4o):</b> Поиск уточнений во внешних источниках (интернет, внутренняя база знаний).</li>
                        <li><b>Level 3 (GPT-4.0 mini):</b> Финальная сборка и стилизация ответа.</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400"><b>Недостаток:</b> С ростом RAG-базы второй уровень стал избыточным, а последовательные вызовы замедляли процесс.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-green-300 dark:border-green-700 h-full">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-0 flex items-center gap-2"><CheckCircleIcon className="w-6 h-6 text-green-500" />Текущая архитектура (Рассуждающая модель)</h3>
                    <p className="mt-2 text-base text-slate-700 dark:text-slate-300">Архитектура была упрощена до одной, более мощной модели — <strong>Gemini 2.5 Pro</strong>. Она не просто генерирует ответ, а выполняет всю цепочку рассуждений:</p>
                    <ul className="list-decimal list-inside space-y-2 mt-4 text-base">
                        <li>Анализирует вопрос.</li>
                        <li>Находит несколько релевантных блоков в RAG-базе.</li>
                        <li>Сравнивает их и выбирает лучший, аргументируя свой выбор.</li>
                    </ul>
                     <p className="mt-4 text-sm text-slate-500 dark:text-slate-400"><b>Преимущества:</b> Система стала **быстрее**, **точнее** и **предсказуемее**, так как вся цепочка рассуждений видна в логах.</p>
                </div>
            </div>
        </section>

        <section id="rag-file" className="scroll-mt-24">
            <SectionHeader 
                icon={<BookOpenIcon className="w-8 h-8" />}
                title="5. RAG-файл: Библиотека ассистента"
                subtitle="Это «библиотека» знаний системы. Структурированный текстовый файл, где каждый блок содержит вопрос, ответ и метаданные, которые преобразуются в векторы для семантического поиска."
            />
             <figure className="my-8 not-prose" role="group" aria-labelledby="rag-json-diagram-title">
                <figcaption id="rag-json-diagram-title" className="text-xl font-bold text-center text-gray-800 dark:text-slate-200 mb-6">
                    Взаимосвязь RAG-файла и JSON-лога
                </figcaption>
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                        <div className="flex flex-col items-center flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-slate-200">Запрос клиента</h3>
                            <ArrowDownTrayIcon className="w-10 h-10 my-2 text-gray-400 dark:text-slate-500"/>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700 flex-1">
                           <h3 className="font-semibold text-gray-800 dark:text-slate-200">Механизм RAG-поиска (gpttunnel)</h3>
                           <div className="w-full flex justify-between items-center mt-4">
                                <div className="text-left">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Ищет в...</p>
                                    <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                                </div>
                               <div className="text-right">
                                    <p className="text-sm text-gray-500 dark:text-slate-400">Формирует...</p>
                                    <ArrowLongRightIcon className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                                </div>
                           </div>
                        </div>
                         <div className="flex flex-col md:flex-row gap-4 flex-1">
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-gray-800 dark:text-slate-200">RAG-файл (Библиотека)</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">Хранит факты и ответы</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-gray-800 dark:text-slate-200">JSON-лог (Дневник)</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400">Записывает процесс выбора</p>
                            </div>
                        </div>
                    </div>
                </div>
            </figure>
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-0">RAG-файл — библиотека ассистента</h3>
                <p className="mt-2">Это «библиотека» знаний системы. Структурированный текстовый файл, где каждый блок содержит вопрос, ответ и метаданные, которые преобразуются в <TooltipTerm definition="Числовые представления смысла текста.">векторы</TooltipTerm> для семантического поиска.</p>
                <CodeBlockWithCopy title="Пример записи в RAG-файле" code={`<BEGIN_BLOCK>
<Q> Как восстановить пароль?
<A> Чтобы восстановить доступ, перейдите по ссылке...
<CATEGORY> Авторизация
<SUBCATEGORY> Восстановление пароля
<KEYWORDS> пароль; доступ; сброс; личный кабинет
<END_BLOCK>`} />
                <h4 className="text-lg font-bold mt-6">Расшифровка тегов</h4>
                <DefinitionList items={[
                    { term: '<Q>', definition: 'Канонический, очищенный вопрос, описывающий суть проблемы.' },
                    { term: '<A>', definition: 'Эталонный, исчерпывающий и готовый к использованию ответ на вопрос.' },
                    { term: '<CATEGORY>', definition: 'Категория верхнего уровня для группировки (напр., `Авторизация`).' },
                    { term: '<SUBCATEGORY>', definition: 'Уточняющая подкатегория для большей детализации.' },
                    { term: '<KEYWORDS>', definition: 'Набор ключевых слов через точку с запятой для улучшения поиска.' },
                ]} />
            </div>
        </section>

        <section id="json-logs" className="scroll-mt-24">
             <SectionHeader 
                icon={<DocumentDuplicateIcon className="w-8 h-8" />}
                title="6. JSON-логи: Дневник ассистента"
                subtitle="Это «дневник рассуждений» ассистента. Цифровой след, который показывает, как модель искала ответ, каких кандидатов рассматривала и почему сделала свой выбор."
            />
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-0">JSON-логи — дневник ассистента</h3>
                <p className="mt-2">Это «дневник рассуждений» ассистента. Цифровой след, который показывает, как модель искала ответ, каких кандидатов рассматривала и почему сделала свой выбор. Ключевой инструмент для отладки и улучшения базы знаний.</p>
                <CodeBlockWithCopy title="Пример реального фрагмента JSON-лога" code={`{
"question": "как восстановить пароль?",
"retrieved_candidates": [
{"id": 23, "category": "Авторизация", "similarity": 0.91},
{"id": 57, "category": "Аккаунт", "similarity": 0.77}
],
"selected": {"id": 23, "reason": "наибольшее совпадение"},
"model_score": 86,
"final_response": "Чтобы восстановить пароль, нажмите..."
}`} />
                <h4 className="text-lg font-bold mt-6">Расшифровка полей</h4>
                <DefinitionList items={[
                    { term: 'question', definition: 'Очищенный запрос клиента после обработки.' },
                    { term: 'retrieved_candidates', definition: 'Массив тем из RAG-базы, которые система сочла релевантными.' },
                    { term: 'selected', definition: 'Фрагмент-«победитель», на основе которого был сгенерирован ответ.' },
                    { term: 'model_score', definition: 'Итоговая уверенность модели в ответе (от 0 до 100).' },
                    { term: 'final_response', definition: 'Черновой ответ, предложенный оператору в качестве подсказки.' },
                ]} />
            </div>
        </section>

      </div>
      {modalData && (
          <Modal isOpen={!!modalData} onClose={() => setModalData(null)} title={modalData.title}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Input Column */}
                  <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                          <ArrowDownTrayIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                          {modalData.input.title}
                      </h4>
                      <div className="mt-2 relative">
                          <div className="relative overflow-hidden">
                              <pre className="text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded-lg custom-scrollbar overflow-fade max-h-80 overflow-y-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                  <code>{modalData.input.code}</code>
                              </pre>
                          </div>
                      </div>
                  </div>
                  {/* Output Column */}
                  <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
                          <ArrowUpTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                          {modalData.output.title}
                      </h4>
                       <div className="mt-2 relative">
                          <div className="relative overflow-hidden">
                              <pre className="text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded-lg custom-scrollbar overflow-fade max-h-80 overflow-y-auto" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                  <code>{modalData.output.code}</code>
                              </pre>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal>
      )}
    </DocumentationPageLayout>
  );
};

export default GptAssistantDocumentationPage;