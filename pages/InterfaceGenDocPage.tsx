import React from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, CodeBlockWithCopy, TooltipTerm } from '../components/DocumentationUIComponents';
import { CubeTransparentIcon, CodeBracketIcon, BoltIcon,CommandLineIcon, QuestionMarkCircleIcon, TableCellsIcon, DocumentTextIcon, ArchiveBoxIcon, ExclamationTriangleIcon, PlayIcon } from '@heroicons/react/24/outline';

const InterfaceGeneratorDocumentationPage: React.FC = () => {
  return (
    <DocumentationPageLayout title="AI-генератор UI">
        <div className="space-y-12">
            
            <section id="s1">
                <SectionHeader 
                    icon={<CubeTransparentIcon className="w-8 h-8" />}
                    title="1. Что это?"
                    subtitle="Промт‑система, которая по текстовому запросу автоматически генерирует код."
                />
                <p>
                    <TooltipTerm definition="Автоматизированная система, которая принимает текстовый запрос (промт) и на его основе выполняет определенную задачу, в данном случае — генерацию кода.">Промт‑система</TooltipTerm> автоматически выбирает и выполняет один из трёх режимов генерации на основе вашего запроса:
                </p>
                <div className="flex flex-wrap gap-3 mt-4 not-prose">
                    <span className="bg-blue-100 text-blue-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"><TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm></span>
                    <span className="bg-green-100 text-green-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"><TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> + vanilla JS</span>
                    <span className="bg-yellow-100 text-yellow-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"><TooltipTerm definition="Текстовый формат обмена данными, основанный на синтаксисе JavaScript. Он легко читается людьми и легко парсится машинами.">JSON</TooltipTerm> с системными кодами</span>
                </div>
                 <p className="text-base text-gray-500 dark:text-slate-400 mt-4">
                    «vanilla JS» — чистый JavaScript без библиотек. Решение о режиме принимает промт‑роутер на основе текста запроса и (при наличии) полей <code>module</code>, <code>template</code>, <code>filename</code>.
                 </p>
            </section>

            <section id="s2">
                <SectionHeader 
                    icon={<BoltIcon className="w-8 h-8" />}
                    title="2. Из чего состоит"
                    subtitle="Обзор ключевых компонентов системы."
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose">
                    <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="Роутер">
                        <p>Центральный компонент, который определяет требуемый режим генерации. Содержит шаги <code>resolveAndRender</code> и <code>validateVariables</code> (заглушка), а также подключает соответствующий генератор HTML/JS.</p>
                    </InfoCard>
                    <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="Пост‑обработка">
                        <p>Финальный этап конвейера, который очищает сгенерированный код от упоминаний внутренних путей/файлов, удаляет внешние ссылки и нормализует итоговый ответ для пользователя.</p>
                    </InfoCard>
                     <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="CSS‑режим">
                        <p>Специализированный модуль, который возвращает исключительно код <TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm>. Если предоставленный селектор является неясным, система может задать один уточняющий вопрос.</p>
                    </InfoCard>
                     <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="HTML + JS">
                        <p>Генерирует готовый <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm>‑фрагмент или целую страницу, включая необходимый скрипт на чистом JavaScript (vanilla JS). Серверная логика намеренно не генерируется и помечается как <code>// TODO</code>.</p>
                    </InfoCard>
                     <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="Парсер кодов">
                        <p>Отвечает за извлечение системных токенов. На основе фильтров <code>module</code>/<code>template</code>/<code>filename</code> он находит токены вида <code>$CODE$</code> в корпусе и возвращает строго структурированный <TooltipTerm definition="Текстовый формат обмена данными, основанный на синтаксисе JavaScript. Он легко читается людьми и легко парсится машинами.">JSON</TooltipTerm>.</p>
                    </InfoCard>
                     <InfoCard icon={<CommandLineIcon className="w-6 h-6"/>} title="Корпус контекста">
                        <p>Является источником данных для парсера. Это набор строк строгого единого формата: <code>&lt;Module&gt;|&lt;Template&gt;|&lt;$SYSTEM_CODE$&gt;|&lt;Description&gt;;;</code>, который служит базой знаний.</p>
                    </InfoCard>
                </div>
            </section>

             <section id="s3">
                <SectionHeader 
                    icon={<QuestionMarkCircleIcon className="w-8 h-8" />}
                    title="3. Когда какой режим"
                    subtitle="Выбор режима в зависимости от задачи."
                />
                <div className="overflow-x-auto not-prose">
                    <table className="w-full text-base text-left text-gray-500 dark:text-slate-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Задача</th>
                                <th scope="col" className="px-6 py-3">Что дать на вход</th>
                                <th scope="col" className="px-6 py-3">Что вернётся</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4">Стилизация элементов (без изменения <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm>)</td>
                                <td className="px-6 py-4">Свободный текст, при необходимости — <TooltipTerm definition="В CSS селектор — это шаблон для выбора HTML-элементов, к которым будут применены стили. Например, `.product-card`.">селектор</TooltipTerm>/область</td>
                                <td className="px-6 py-4">Чистый <strong><TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm></strong> или один уточняющий вопрос</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4">Интерфейс и поведение на клиенте</td>
                                <td className="px-6 py-4">Свободный текст с описанием блока/страницы</td>
                                <td className="px-6 py-4"><strong><TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm></strong> + <strong>&lt;script&gt;</strong> (<TooltipTerm definition="Чистый JavaScript без каких-либо внешних библиотек или фреймворков.">vanilla JS</TooltipTerm>)</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-800">
                                <td className="px-6 py-4">Нужны коды для шаблона</td>
                                <td className="px-6 py-4"><TooltipTerm definition="Текстовый формат обмена данными, основанный на синтаксисе JavaScript. Он легко читается людьми и легко парсится машинами.">JSON</TooltipTerm> с <code>module</code>, <code>template</code>, (опц.) <code>filename</code>, (опц.) <code>question</code></td>
                                <td className="px-6 py-4"><strong><TooltipTerm definition="Текстовый формат обмена данными, основанный на синтаксисе JavaScript. Он легко читается людьми и легко парсится машинами.">JSON</TooltipTerm></strong> с ключами <code><TooltipTerm definition="Массив строк, содержащий системные коды, например, '$GLOBAL_PROMO$'.">system_codes</TooltipTerm></code> и <code>descriptions</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

             <section id="s4">
                <SectionHeader 
                    icon={<TableCellsIcon className="w-8 h-8" />}
                    title="4. Данные: вход / выход"
                    subtitle="Описание форматов входных и выходных данных."
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Входные поля</h3>
                         <div className="overflow-x-auto not-prose">
                            <table className="w-full text-base text-left text-gray-500 dark:text-slate-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Поле</th>
                                        <th scope="col" className="px-6 py-3">Тип</th>
                                        <th scope="col" className="px-6 py-3">Описание</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4">Текст запроса</td>
                                        <td className="px-6 py-4">string</td>
                                        <td className="px-6 py-4">Свободная формулировка задачи.</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4"><code>module</code></td>
                                        <td className="px-6 py-4">string</td>
                                        <td className="px-6 py-4">Имя модуля (для поиска кодов).</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4"><code>template</code></td>
                                        <td className="px-6 py-4">string</td>
                                        <td className="px-6 py-4">Имя шаблона (для поиска кодов).</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4"><code>filename</code></td>
                                        <td className="px-6 py-4">string</td>
                                        <td className="px-6 py-4">Имя файла шаблона (опционально).</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-slate-800">
                                        <td className="px-6 py-4"><code>question</code></td>
                                        <td className="px-6 py-4">string</td>
                                        <td className="px-6 py-4">Уточнение, какие коды нужны (опционально).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-2">Выходные форматы</h3>
                        <div className="overflow-x-auto not-prose">
                           <table className="w-full text-base text-left text-gray-500 dark:text-slate-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Режим</th>
                                        <th scope="col" className="px-6 py-3">Формат</th>
                                        <th scope="col" className="px-6 py-3">Содержимое</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4"><TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm></td>
                                        <td className="px-6 py-4"><code>text/css</code></td>
                                        <td className="px-6 py-4">Готовые правила без изменения <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm>.</td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                        <td className="px-6 py-4"><TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> + JS</td>
                                        <td className="px-6 py-4">HTML + <code>&lt;script&gt;</code></td>
                                        <td className="px-6 py-4">Разметка и поведение на клиенте (чистый JS).</td>
                                    </tr>
                                    <tr className="bg-white dark:bg-slate-800">
                                        <td className="px-6 py-4">Системные коды</td>
                                        <td className="px-6 py-4"><code>application/json</code></td>
                                        <td className="px-6 py-4"><code>system_codes</code> и <code>descriptions</code>; индексы совпадают.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="s5">
                 <SectionHeader 
                    icon={<CodeBracketIcon className="w-8 h-8" />}
                    title="5. Примеры «вход → выход»"
                    subtitle="Практические примеры для каждого режима."
                />
                <div className="space-y-6">
                    <CodeBlockWithCopy title="Пример для CSS" code={`Вход: "У карточек товара (селектор .product-card) сделать скругление 12px и жирную цену"
Выход (CSS):
.product-card {
  border-radius: 12px;
  padding: 16px;
}
.product-card .price {
  font-weight: 700;
}`} />
                    <CodeBlockWithCopy title="Пример для HTML + JS" code={`Вход: "Добавь на страницу блок FAQ со сворачиванием ответов"
Выход:
<section class="faq">
  <h2>FAQ</h2>
  <div class="item" data-q="Оплата">...</div>
</section>
<script>
  document.querySelectorAll('.faq .item').forEach(el => { /* ... */ });
<\/script>`} />
                    <CodeBlockWithCopy title="Пример для JSON" code={`Вход:
{
  "module": "E-commerce Store",
  "template": "Product page",
  "question": "Нужны глобальные блоки"
}
Выход:
{
  "system_codes": ["$GLOBAL_PROMO$", "$GLOBAL_FAQ$"],
  "descriptions": ["Глобальный промо-блок", "Глобальный блок FAQ"]
}`} />
                </div>
            </section>
            
            <section id="s6">
                 <SectionHeader 
                    icon={<PlayIcon className="w-8 h-8" />}
                    title="6. Пошаговый поток"
                    subtitle="Как система обрабатывает запрос."
                />
                 <ol className="list-decimal list-inside space-y-2 text-base">
                    <li><strong>Роутер</strong> читает текст и (если есть) поля <code>module</code>/<code>template</code>/<code>filename</code>.</li>
                    <li>Определяет режим: <em><TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm></em>, <em><TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> + JS</em> или <em>Системные коды</em>.</li>
                    <li>Передаёт управление соответствующему модулю промта.</li>
                    <li><strong>Пост‑обработка</strong> очищает служебные следы и нормализует ответ.</li>
                </ol>
            </section>

            <section id="s7">
                 <SectionHeader 
                    icon={<DocumentTextIcon className="w-8 h-8" />}
                    title="7. Глоссарий"
                    subtitle="Ключевые термины, используемые в системе."
                />
                 <dl className="space-y-4">
                    <div>
                        <dt className="font-semibold text-gray-800 dark:text-slate-200">Системный код</dt>
                        <dd className="text-gray-600 dark:text-slate-400">Токен вида <code>$CODE$</code>, который подставляет контент/фрагмент в шаблон.</dd>
                    </div>
                    <div>
                        <dt className="font-semibold text-gray-800 dark:text-slate-200">Модуль</dt>
                        <dd className="text-gray-600 dark:text-slate-400">Крупный раздел системы шаблонов (например, магазин).</dd>
                    </div>
                     <div>
                        <dt className="font-semibold text-gray-800 dark:text-slate-200">Шаблон</dt>
                        <dd className="text-gray-600 dark:text-slate-400">Конкретная страница/фрагмент внутри модуля (например, «страница товара»).</dd>
                    </div>
                </dl>
            </section>

             <section id="s8">
                <SectionHeader 
                    icon={<ExclamationTriangleIcon className="w-8 h-8" />}
                    title="8. Ограничения"
                    subtitle="Что нужно учитывать при работе с системой."
                />
                <ul className="list-disc list-inside space-y-2">
                    <li>Серверный код не генерируется; такие места помечаются <code>// TODO</code>.</li>
                    <li>В <TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm>‑режиме <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> не изменяется; допускается один уточняющий вопрос.</li>
                    <li>Спецификация парсера присутствует в двух местах: <code>/des/system_code_parser.md</code> и <code>/des/parser/system_code_parser.md</code>.</li>
                </ul>
            </section>
            
            <section id="s9">
                <SectionHeader 
                    icon={<ArchiveBoxIcon className="w-8 h-8" />}
                    title="9. Где лежат файлы"
                    subtitle="Карта расположения файлов проекта."
                />
                 <div className="overflow-x-auto not-prose">
                    <table className="w-full text-base text-left text-gray-500 dark:text-slate-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-slate-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Путь</th>
                                <th scope="col" className="px-6 py-3">Назначение</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/README.md</code></td>
                                <td className="px-6 py-4">Краткий обзор.</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/prompt.md</code></td>
                                <td className="px-6 py-4">Роутер режимов.</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/cssOnlyHandler.md</code></td>
                                <td className="px-6 py-4">Правила генерации <TooltipTerm definition="Каскадные таблицы стилей — это язык, используемый для описания внешнего вида документа, написанного на языке разметки, таком как HTML.">CSS</TooltipTerm>.</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/generateHTMLJS.md</code></td>
                                <td className="px-6 py-4">Правила генерации <TooltipTerm definition="Язык гипертекстовой разметки — это стандартный язык разметки для создания веб-страниц и веб-приложений. Он определяет структуру и содержание веб-страницы.">HTML</TooltipTerm> и JS.</td>
                            </tr>
                             <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/system_code_parser.md</code></td>
                                <td className="px-6 py-4">Спецификация извлечения системных кодов.</td>
                            </tr>
                             <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/prompt v2.ini</code></td>
                                <td className="px-6 py-4">Пост‑обработка результата.</td>
                            </tr>
                             <tr className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                                <td className="px-6 py-4"><code>/des/parser/context/prompt.txt</code></td>
                                <td className="px-6 py-4">Регламент работы с корпусом контента.</td>
                            </tr>
                            <tr className="bg-white dark:bg-slate-800">
                                <td className="px-6 py-4"><code>/des/parser/context/V01…V08</code></td>
                                <td className="px-6 py-4">Корпус строк формата <code>&lt;Module&gt;|&lt;Template&gt;|&lt;$SYSTEM_CODE$&gt;|&lt;Description&gt;;;</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    </DocumentationPageLayout>
  );
};

export default InterfaceGeneratorDocumentationPage;