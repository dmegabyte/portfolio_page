
export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  keyFeatures: string[];
  repoUrl?: string;
  documentationPage?: string; 
  reportPage?: string;
}

// NOTE: The imageUrls have been optimized to request a smaller width (w=800) and leverage
// Unsplash's auto-formatting (auto=format) to serve modern, efficient image formats like WebP.
// This improves page load performance, adhering to Principle #4 (Flawless UI Quality) and
// Principle #2 (UX as the Core Foundation).
export const projects: Project[] = [
  {
    id: 1,
    slug: 'client-segmentation',
    title: 'AI-маркетолог',
    summary: 'Автоматическая сегментация клиентов и генерация персонализированных рассылок в Google Sheets.',
    description: 'Система полностью автоматизирует персонализированные рассылки. Она анализирует клиентскую базу по 7+ параметрам, прогнозирует оптимальный момент для контакта и самостоятельно запускает кампании, повышая LTV без участия человека.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    technologies: ['Google Apps Script', 'Google Sheets', 'JavaScript', 'WAHelp API'],
    keyFeatures: [
        'Многофакторная сегментация клиентской базы (более 7 параметров).',
        'Автоматический подбор персонализированных промо-акций и шаблонов.',
        'Предиктивный расчет оптимальной даты отправки для повышения LTV.',
        'Полная автоматизация процесса рассылок через WAHelp API.'
    ],
    documentationPage: '/documentation/client-segmentation',
    reportPage: '/report/client-segmentation',
  },
  {
    id: 2,
    slug: 'interface-generator',
    title: 'AI-генератор UI',
    summary: 'Автогенерация React-компонентов из схематического описания интерфейса.',
    description: 'Веб-приложение, позволяющее разработчикам описывать структуру UI в формате JSON или YAML и получать на выходе готовый код React-компонентов с поддержкой TypeScript и стилизацией через Tailwind CSS. Ускоряет прототипирование и разработку.',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'AST', 'Tailwind CSS'],
    keyFeatures: [
        'Генерация React-компонентов из декларативного описания в JSON/YAML.',
        'Встроенная поддержка TypeScript и стилизация через Tailwind CSS.',
        'Значительное ускорение прототипирования и разработки UI.',
        'Основан на манипуляциях с Абстрактным синтаксическим деревом (AST).'
    ],
    documentationPage: '/documentation/interface-generator',
  },
  {
    id: 3,
    slug: 'gpt-assistant',
    title: 'GPT-ассистент с RAG',
    summary: 'Чат-бот с кастомной базой знаний, использующий Retrieval-Augmented Generation.',
    description: 'Разработка ассистента на базе GPT-моделей, который может отвечать на вопросы, используя предоставленную документацию. Реализована векторизация текстов, поиск по семантической близости и интеграция с Telegram Bot API.',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80&auto=format&fit=crop',
    technologies: ['gpttunnel', 'Vector Databases', 'Omnidesk API'],
    keyFeatures: [
        'Ответы на вопросы на основе кастомной базы знаний.',
        'Реализация Retrieval-Augmented Generation (RAG) для высокой точности.',
        'Использование векторизации текстов и семантического поиска.',
        'Полная интеграция с ключевыми сервисами: gpttunnel и Omnidesk.'
    ],
    documentationPage: '/documentation/gpt-assistant',
    reportPage: '/report/gpt-assistant',
  },
  {
    id: 4,
    slug: 'bot-autotest',
    title: 'AI-тестировщик чат-ботов',
    summary: 'Фреймворк для end-to-end тестирования диалоговых сценариев в чат-ботах.',
    description: 'Создание системы, которая позволяет описывать тестовые сценарии в формате Gherkin (Cucumber) и автоматически запускать их, эмулируя поведение пользователя. Поддерживает тестирование ботов в Telegram, VK и на веб-сайтах. Интегрируется с CI/CD.',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80&auto=format&fit=crop',
    technologies: ['JavaScript', 'Playwright', 'Jest', 'Cucumber.js', 'CI/CD'],
    keyFeatures: [
        'Описание тестовых сценариев на языке Gherkin (Cucumber).',
        'Автоматизация E2E-тестирования с эмуляцией действий пользователя.',
        'Поддержка нескольких платформ: Telegram, VK и веб-сайты.',
        'Полная интеграция с CI/CD пайплайнами.'
    ],
    documentationPage: '/documentation/bot-autotest',
  },
  {
    id: 5,
    slug: 'email-safety-pipeline',
    title: 'Пайплайн безопасности email',
    summary: 'Сервис анализа email-шаблонов на спам-триггеры, фишинг и проблемы с рендерингом.',
    description: 'Автоматизированный пайплайн, который принимает на вход HTML-шаблон письма, проверяет его через SpamAssassin, анализирует все ссылки на безопасность с помощью Google Safe Browsing API, и делает скриншоты рендеринга в разных почтовых клиентах.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop',
    technologies: ['Node.js', 'Express', 'Puppeteer', 'SpamAssassin API', 'Docker'],
    keyFeatures: [
        'Автоматизированный конвейер для комплексного анализа email-шаблонов.',
        'Проверка на спам-триггеры с использованием SpamAssassin.',
        'Анализ безопасности всех ссылок через Google Safe Browsing API.',
        'Создание скриншотов рендеринга в разных почтовых клиентах.'
    ],
    documentationPage: '/documentation/email-safety-pipeline',
  },
];