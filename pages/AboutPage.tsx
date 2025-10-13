import React from 'react';
import { TooltipTerm } from '../components/DocumentationUIComponents';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight mb-4">
          Разработчик интеллектуальных систем автоматизации
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400 max-w-3xl mx-auto">
          Я превращаю рутинные бизнес-процессы в автономные AI-системы, которые работают, пока вы сфокусированы на главном.
        </p>
      </div>
      <div className="max-w-5xl mx-auto text-slate-700 dark:text-slate-300 space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-1 animate-fade-in">
            <img 
              src="https://storage.googleapis.com/aistudio-hosting/workspace-scans/b82be6c0-7817-4f6c-8431-7290f6759711.png" 
              alt="Фотография молодого разработчика в темном худи с капюшоном, сосредоточенно работающего за компьютером с механической клавиатурой в слабо освещенной комнате." 
              width="800"
              height="1200"
              className="rounded-lg shadow-xl w-full h-auto object-cover border-4 border-white dark:border-slate-700"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <p>
              Здравствуйте! Я не просто работаю с AI — я создаю практические, end-to-end решения, которые решают конкретные задачи бизнеса. Моя основная компетенция — полный цикл разработки: от анализа узких мест в процессах до создания и интеграции AI-инструментов, которые берут на себя сложную работу. Я специализируюсь на автоматизации маркетинга, разработки, тестирования и клиентской поддержки.
            </p>
            <div>
              <p>Вместо абстрактных концепций я предлагаю работающие инструменты. Например:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>AI-маркетолог</strong> — это не просто скрипт, а полноценная система, которая самостоятельно сегментирует тысячи клиентов и запускает персонализированные рассылки, увеличивая LTV.</li>
                <li><strong>AI-тестировщик чат-ботов</strong> — это фреймворк, который экономит десятки часов ручного труда, автоматически проверяя диалоговые сценарии.</li>
                <li><strong>GPT-ассистент с <TooltipTerm definition="Технология, которая позволяет языковой модели (LLM) получать доступ к внешней, актуальной информации (например, из базы знаний) перед генерацией ответа, чтобы сделать его более точным и контекстуальным.">RAG</TooltipTerm></strong> — это интеллектуальный помощник, который снижает нагрузку на поддержку, мгновенно находя ответы в базе знаний.</li>
              </ul>
              <p className="mt-4">Каждый проект в моем портфолио — это доказательство того, как AI может стать надежным сотрудником.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200 pt-8 border-t border-gray-200 dark:border-slate-700 mt-8">Ключевые компетенции и стек</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {['Gemini CLI', 'Claude CLI', 'Codex CLI', 'RAG-архитектуры', 'MCP (Model-Centric Prompting)', 'Системная интеграция AI', 'Автоматизация процессов', 'Vector Databases', 'API-интеграции', 'Python (FastAPI)', 'Node.js', 'Google Apps Script'].map(skill => (
              <div key={skill} className="bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-center py-2 px-4 rounded-lg shadow-sm">
                {skill === 'API-интеграции' ? <><TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm>-интеграции</> : skill}
              </div>
            ))}
          </div>
          <p className="mt-6">
            Мой подход — это инженерная прагматичность, а не погоня за хайпом. Я использую мощь <TooltipTerm definition="Большая языковая модель — это тип искусственного интеллекта, обученный на огромных объемах текстовых данных для понимания, генерации и обработки человеческого языка на высоком уровне.">LLM</TooltipTerm> (Gemini, Claude, GPT) не как самоцель, а как инструмент для создания масштабируемых, надежных и экономически эффективных систем. Если перед вашей командой стоит задача автоматизировать сложный процесс, давайте обсудим, как AI может ее решить.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;