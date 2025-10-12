import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 sm:p-8 lg:p-12 animate-fade-in border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight mb-4">
          Промпт-инженер и Архитектор AI-решений
        </h1>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
          Я создаю интеллектуальные системы, которые решают реальные бизнес-задачи с помощью больших языковых моделей (LLM).
        </p>
      </div>
      <div className="max-w-4xl mx-auto text-gray-700 dark:text-slate-300 space-y-6">
        <p>
          Привет! Я не просто пишу промпты — я проектирую и реализую комплексные, end-to-end решения на базе передовых AI-технологий. Моя специализация — превращение потенциала языковых моделей, таких как Gemini, Claude и Codex, в работающие продукты, которые автоматизируют процессы, генерируют ценные инсайты и создают новые возможности.
        </p>
        <p>
          В моих проектах вы увидите практическое применение этого подхода. Например, в <strong>«Персональном GPT-ассистенте»</strong> я реализовал сложную RAG-архитектуру (Retrieval-Augmented Generation) для создания чат-бота с кастомной базой знаний. А проект <strong>«Сегментация и рассылка клиентов»</strong> — это пример того, как можно построить сложную аналитическую и маркетинговую систему, работающую автономно на базе заданной логики.
        </p>
        <p>
          Я также исследую применение LLM в разработке, как в проекте <strong>«Генератор интерфейсов (UI-Gen)»</strong>, который автоматически создает React-компоненты из декларативных схем. Это доказывает, что правильный инжиниринг промптов и системная архитектура могут значительно ускорить даже технические процессы.
        </p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 pt-6 border-t border-gray-200 dark:border-slate-700 mt-8">Ключевые компетенции и стек</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {['Gemini CLI', 'Claude CLI', 'Codex CLI', 'RAG-архитектуры', 'MCP (Model-Centric Prompting)', 'Системная интеграция AI', 'Автоматизация процессов', 'Vector Databases', 'API-интеграции', 'Python (FastAPI)', 'Node.js', 'Google Apps Script'].map(skill => (
            <div key={skill} className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200 text-center py-2 px-4 rounded-lg shadow-sm">
              {skill}
            </div>
          ))}
        </div>
        <p>
          Моя цель — не просто следовать трендам, а создавать надежные, масштабируемые и эффективные AI-решения. Если вы ищете специалиста, который сможет не только сформулировать задачу для модели, но и встроить ее в ваш продукт и бизнес-процессы, свяжитесь со мной.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;