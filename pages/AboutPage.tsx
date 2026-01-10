
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
    { name: 'MCP (MCP)', Icon: PencilSquareIcon },
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

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-3xl rounded-4xl p-8 md:p-16 animate-fade-in border border-slate-800 shadow-premium">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-none mb-6 tracking-tight">
          AI-ИНЖЕНЕР <br />
          <span className="text-indigo-400">АВТОМАТИЗАЦИИ</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
          Создаю интеллектуальные системы, которые берут на себя рутину, освобождая вашу команду для стратегических задач.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/50">
            <img 
              src="https://i.ibb.co/Y4h2bBws/photo-2025-10-13-21-43-24.jpg"
              alt="Senior AI Engineer" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="lg:col-span-8 space-y-8 text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
            <p>
              Я создаю end-to-end AI-решения, которые решают конкретные бизнес-задачи. Моя работа — это полный цикл: от глубокого анализа ваших процессов и выявления «узких мест» до разработки и интеграции умных инструментов.
            </p>
            <div className="space-y-6">
              <p className="text-white font-bold">Примеры реализованных решений:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "AI-маркетолог", desc: "Сегментация и рассылки" },
                  { title: "AI-тестировщик", desc: "Автоматизация E2E сценариев" },
                  { title: "GPT-ассистент", desc: "RAG-системы поддержки" },
                  { title: "Scenario Nexus", desc: "Управление диалогами" }
                ].map((item, i) => (
                    <li key={i} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex flex-col gap-1">
                        <span className="text-indigo-400 font-black uppercase text-[10px] tracking-widest">{item.title}</span>
                        <span className="text-white font-bold text-base">{item.desc}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-slate-800">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12 tracking-tight">
                ТЕХНОЛОГИЧЕСКИЙ СТЕК
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {skills.map((skill) => (
                    <div 
                        key={skill.name} 
                        className="group flex flex-col items-center justify-center p-6 bg-slate-800/30 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                        <skill.Icon className="w-10 h-10 mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                        <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest text-center leading-tight">
                            {skill.renderName ? skill.renderName() : skill.name}
                        </span>
                    </div>
                ))}
            </div>
            <p className="mt-16 text-center max-w-4xl mx-auto text-slate-400 text-base md:text-lg font-medium italic">
                «Мой подход — это инженерная прагматичность. Я использую мощь LLM не как самоцель, а как инструмент для построения надежных систем.»
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
