
export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  repoUrl?: string;
  documentationPage?: string; 
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'client-segmentation',
    title: 'AI-маркетолог',
    summary: 'Автоматическая сегментация клиентов и генерация персонализированных рассылок в Google Sheets.',
    description: 'Разработка сложной системы рассылок, учитывающей множество категорий клиентов (тип, лояльность, активность, частота, ценовой сегмент). Скрипты Apps Script анализируют данные, подбирают шаблоны и акции, рассчитывают даты и запускают отправку через WAHelp.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Google Apps Script', 'Google Sheets', 'JavaScript', 'WAHelp API'],
    documentationPage: '/documentation/client-segmentation',
  },
  {
    id: 2,
    slug: 'interface-generator',
    title: 'AI-генератор UI',
    summary: 'Автогенерация React-компонентов из схематического описания интерфейса.',
    description: 'Веб-приложение, позволяющее разработчикам описывать структуру UI в формате JSON или YAML и получать на выходе готовый код React-компонентов с поддержкой TypeScript и стилизацией через Tailwind CSS. Ускоряет прототипирование и разработку.',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'AST', 'Tailwind CSS'],
    documentationPage: '/documentation/interface-generator',
  },
  {
    id: 3,
    slug: 'gpt-assistant',
    title: 'GPT-ассистент с RAG',
    summary: 'Чат-бот с кастомной базой знаний, использующий Retrieval-Augmented Generation.',
    description: 'Разработка ассистента на базе GPT-моделей, который может отвечать на вопросы, используя предоставленную документацию. Реализована векторизация текстов, поиск по семантической близости и интеграция с Telegram Bot API.',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Python', 'FastAPI', 'OpenAI API', 'Vector Databases', 'Telegram Bot API'],
    documentationPage: '/documentation/gpt-assistant',
  },
  {
    id: 4,
    slug: 'bot-autotest',
    title: 'AI-тестировщик чат-ботов',
    summary: 'Фреймворк для end-to-end тестирования диалоговых сценариев в чат-ботах.',
    description: 'Создание системы, которая позволяет описывать тестовые сценарии в формате Gherkin (Cucumber) и автоматически запускать их, эмулируя поведение пользователя. Поддерживает тестирование ботов в Telegram, VK и на веб-сайтах. Интегрируется с CI/CD.',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200&auto=format&fit=crop',
    technologies: ['JavaScript', 'Playwright', 'Jest', 'Cucumber.js', 'CI/CD'],
    documentationPage: '/documentation/bot-autotest',
  },
  {
    id: 5,
    slug: 'email-safety-pipeline',
    title: 'Пайплайн безопасности email',
    summary: 'Сервис анализа email-шаблонов на спам-триггеры, фишинг и проблемы с рендерингом.',
    description: 'Автоматизированный пайплайн, который принимает на вход HTML-шаблон письма, проверяет его через SpamAssassin, анализирует все ссылки на безопасность с помощью Google Safe Browsing API, и делает скриншоты рендеринга в разных почтовых клиентах.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Node.js', 'Express', 'Puppeteer', 'SpamAssassin API', 'Docker'],
    documentationPage: '/documentation/email-safety-pipeline',
  },
];
