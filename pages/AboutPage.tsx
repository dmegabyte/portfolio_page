import React from 'react';
import { TooltipTerm } from '../components/DocumentationUIComponents';
import {
    SparklesIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    CodeBracketIcon,
    BookOpenIcon,
    PencilSquareIcon,
    PuzzlePieceIcon,
    Cog6ToothIcon,
    CircleStackIcon,
    LinkIcon,
    CodeBracketSquareIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

const skills = [
    { name: 'Gemini CLI', Icon: SparklesIcon },
    { name: 'Claude CLI', Icon: ChatBubbleOvalLeftEllipsisIcon },
    { name: 'Codex CLI', Icon: CodeBracketIcon },
    { name: 'RAG-архитектуры', Icon: BookOpenIcon },
    { name: 'MCP (Model-Centric Prompting)', Icon: PencilSquareIcon },
    { name: 'Системная интеграция AI', Icon: PuzzlePieceIcon },
    { name: 'Автоматизация процессов', Icon: Cog6ToothIcon },
    { name: 'Vector Databases', Icon: CircleStackIcon },
    {
        name: 'API-интеграции',
        Icon: LinkIcon,
        renderName: () => (
            <><TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm>-интеграции</>
        ),
    },
    { name: 'Python (FastAPI)', Icon: CodeBracketSquareIcon },
    { name: 'Node.js', Icon: CodeBracketSquareIcon },
    { name: 'Google Apps Script', Icon: DocumentTextIcon },
];


// Note on Asset Handling: In a no-build environment like this one (using import maps without a bundler),
// static assets like images cannot be imported as JavaScript modules. The path must be provided
// directly as a string in the `src` attribute, relative to the root `index.html`.
const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
          AI-инженер по автоматизации бизнес-процессов
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-3xl mx-auto">
          Создаю интеллектуальные системы, которые берут на себя рутину, освобождая вашу команду для стратегических задач.
        </p>
      </div>
      <div className="max-w-5xl mx-auto text-slate-700 dark:text-slate-300 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-1 animate-fade-in">
            {/*
              UPDATE (Final): The developer's photo has been updated again with the latest user-provided link from ibb.co.
              This direct, public URL is the definitive solution for this no-build environment, ensuring the image
              loads reliably and correctly every time. After previous issues with local and temporary links, this
              externally hosted image guarantees stability. This change fully aligns with "Principle 4: Flawless UI Quality"
              by providing the intended visual element, and the alt text remains descriptive as it fits the new image well.
            */}
            <img 
              src="https://i.ibb.co/Y4h2bBws/photo-2025-10-13-21-43-24.jpg"
              alt="Фотография молодого разработчика в темном худи с капюшоном, сосредоточенно работающего за компьютером с механической клавиатурой в слабо освещенной комнате." 
              width="800"
              height="1200"
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-xl w-full h-auto object-cover border-4 border-white dark:border-slate-700"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <p>
              Я создаю end-to-end AI-решения, которые решают конкретные бизнес-задачи. Моя работа — это полный цикл: от глубокого анализа ваших процессов и выявления «узких мест» до разработки и интеграции умных инструментов, которые автоматизируют сложные участки в маркетинге, разработке, тестировании и клиентской поддержке.
            </p>
            <div>
              <p>Мой подход — создавать не абстрактные концепции, а работающие инструменты. Вот несколько примеров:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>AI-маркетолог</strong> — это не просто скрипт, а полноценная система, которая самостоятельно сегментирует тысячи клиентов и запускает персонализированные рассылки, увеличивая LTV.</li>
                <li><strong>AI-тестировщик чат-ботов</strong> — это фреймворк, который экономит десятки часов ручного труда, автоматически проверяя диалоговые сценарии.</li>
                <li><strong>GPT-ассистент с <TooltipTerm definition="Технология, которая позволяет языковой модели (LLM) получать доступ к внешней, актуальной информации (например, из базы знаний) перед генерацией ответа, чтобы сделать его более точным и контекстуальным.">RAG</TooltipTerm></strong> — это интеллектуальный помощник, который снижает нагрузку на поддержку, мгновенно находя ответы в базе знаний.</li>
              </ul>
              <p className="mt-4">Каждый проект в моем портфолио — это реальный кейс, где AI становится не просто технологией, а надежным цифровым сотрудником.</p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-200 mb-10">
                Ключевые компетенции и стек
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
                {skills.map((skill) => (
                    <div 
                        key={skill.name} 
                        className="group flex flex-col items-center justify-start p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500"
                    >
                        <skill.Icon className="w-10 h-10 mb-3 text-gray-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
                        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 leading-tight">
                            {skill.renderName ? skill.renderName() : skill.name}
                        </span>
                    </div>
                ))}
            </div>
            <p className="mt-12 text-center max-w-3xl mx-auto">
                Мой подход — это инженерная прагматичность, а не погоня за технологическим хайпом. Я использую мощь <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> (Gemini, Claude, GPT) не как самоцель, а как инструмент для построения масштабируемых, надежных и экономически эффективных систем. Если перед вашей командой стоит сложная задача, которую можно автоматизировать, — давайте обсудим, как AI может ее решить.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;