
export interface Project {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  visualPrompt: string;
  technologies: string[];
  keyFeatures: string[];
  keyTakeaways: string[]; // Новое обязательное поле согласно Принципу 7
  repoUrl?: string;
  documentationPage?: string;
  reportPage?: string;
  useInteractivePreview?: boolean; // Флаг для рендера MessengerDashboard
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'client-segmentation',
    title: 'AI-маркетолог',
    summary: 'Автоматическая сегментация клиентов и генерация персонализированных рассылок в Google Sheets.',
    description: 'Система полностью автоматизирует персонализированные рассылки. Она анализирует клиентскую базу по 7+ параметрам, прогнозирует оптимальный момент для контакта и самостоятельно запускает кампании, повышая LTV без участия человека.',
    // FIX: Обновлена ссылка на прямое изображение PNG по запросу пользователя
    imageUrl: 'https://i.postimg.cc/RZxHWVL9/Chat-GPT-Image-2-anv-2026-g-12-03-59-(1).jpg',
    useInteractivePreview: false,
    visualPrompt: 'Futuristic abstract data dashboard for marketing analytics. Holographic 3D bar charts, interconnected client nodes, flowing glowing data streams. Deep obsidian background, vibrant indigo and emerald accents. ABSOLUTELY NO TEXT, NO LETTERS, NO NUMBERS. Pure geometry, light trails, cinematic lighting, 4K.',
    technologies: ['Google Apps Script', 'Google Sheets', 'JavaScript', 'WAHelp API'],
    keyFeatures: [
      'Многофакторная сегментация клиентской базы (более 7 параметров).',
      'Автоматический подбор персонализированных промо-акций и шаблонов.',
      'Предиктивный расчет оптимальной даты отправки для повышения LTV.',
      'Полная автоматизация процесса рассылок через WAHelp API.'
    ],
    keyTakeaways: [
      'Снижение себестоимости рассылок в 7 раз за счет алгоритмического подхода.',
      '100% автоматизация: от сбора данных до финальной отправки в WhatsApp.',
      'Data-Centric подход: управление всей логикой через привычный Google Sheets.'
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
    imageUrl: 'https://i.postimg.cc/Y0yxcc56/Chat-GPT-Image-2-anv-2026-g-12-20-25.jpg',
    visualPrompt: 'Abstract architectural visualization of a user interface build system. Glowing wireframe grids, floating UI blocks, digital blueprint aesthetics. Dark mode obsidian glass, neon cyan highlights. ABSOLUTELY NO TEXT, NO LABELS. Only geometric structures and neural connectors, 4K resolution.',
    technologies: ['React', 'TypeScript', 'Node.js', 'AST', 'Tailwind CSS'],
    keyFeatures: [
      'Генерация React-компонентов из декларативного описания в JSON/YAML.',
      'Встроенная поддержка TypeScript и стилизация через Tailwind CSS.',
      'Значительное ускорение прототипирования и разработки UI.',
      'Основан на манипуляциях с Абстрактным синтаксическим деревом (AST).'
    ],
    keyTakeaways: [
      'Ускорение верстки базовых компонентов на 60%.',
      'Минимизация ошибок в Tailwind-классах за счет строгой генерации.',
      'Возможность быстрого прототипирования через декларативное описание.'
    ],
    documentationPage: '/documentation/interface-generator',
  },
  {
    id: 3,
    slug: 'gpt-assistant',
    title: 'GPT-ассистент с RAG',
    summary: 'Чат-бот с кастомной базой знаний, использующий Retrieval-Augmented Generation.',
    description: 'Разработка ассистента на базе GPT-моделей, который может отвечать на вопросы, используя предоставленную документацию. Реализована векторизация текстов, поиск по семантической близости и интеграция с Telegram Bot API.',
    imageUrl: 'https://i.postimg.cc/Vk0K86LN/Chat-GPT-Image-2-anv-2026-g-13-05-36-(1).jpg',
    visualPrompt: 'Neural network knowledge graph. Glowing brain-like synapses, floating data points representing information retrieval. Retrieval-Augmented Generation concept. Obsidian background, violet and sky blue light. ABSOLUTELY NO TEXT, NO SYMBOLS. Organic tech patterns, hyper-realistic, cinematic.',
    technologies: ['gpttunnel', 'Vector Databases', 'Omnidesk API'],
    keyFeatures: [
      'Ответы на вопросы на основе кастомной базы знаний.',
      'Реализация Retrieval-Augmented Generation (RAG) для высокой точности.',
      'Использование векторизации текстов и семантического поиска.',
      'Полная интеграция с ключевыми сервисами: gpttunnel и Omnidesk.'
    ],
    keyTakeaways: [
      'Автоматизация 35% входящих обращений без потери качества.',
      'Снижение нагрузки на первую линию поддержки в 2 раза.',
      'Использование Gemini 2.5 Pro для сложных рассуждений и суммаризации.'
    ],
    documentationPage: '/documentation/gpt-assistant',
    reportPage: '/report/gpt-assistant',
  },
  {
    id: 4,
    slug: 'bot-autotest',
    title: 'Visual AI Chatbot Tester',
    summary: 'Фреймворк для end-to-end тестирования диалоговых сценариев в чат-ботах.',
    description: 'Создание системы, которая позволяет описывать тестовые сценарии в формате Gherkin (Cucumber) и автоматически запускать их, эмулируя поведение пользователя. Поддерживает тестирование ботов в Telegram, VK и на веб-сайтах. Интегрируется с CI/CD.',
    imageUrl: '/assets/images/QA.jpg',
    visualPrompt: 'Cybernetic bug-fix visualization. Hexagonal digital grid, glowing node verification paths, matrix-like flow. Blue and white neon on dark background. NO TEXT, NO CHARACTERS. Minimalist tech testing environment, sharp focus, 4K.',
    technologies: ['JavaScript', 'Playwright', 'Jest', 'Cucumber.js', 'CI/CD'],
    keyFeatures: [
      'Описание тестовых сценариев на языке Gherkin (Cucumber).',
      'Автоматизация E2E-тестирования с эмуляцией действий пользователя.',
      'Поддержка нескольких платформ: Telegram, VK и веб-сайты.',
      'Полная интеграция с CI/CD пайплайнами.'
    ],
    keyTakeaways: [
      'Сокращение времени регрессионного тестирования с 4 часов до 15 минут.',
      'Автоматическая генерация тест-кейсов на базе GPT-4o.',
      'Покрытие E2E сценариев для 3-х платформ одновременно.'
    ],
    documentationPage: '/documentation/bot-autotest',
  },
  {
    id: 5,
    slug: 'email-safety-pipeline',
    title: 'Пайплайн безопасности email',
    summary: 'Сервис анализа email-шаблонов на спам-триггеры, фишинг и проблемы с рендерингом.',
    description: 'Автоматизированный пайплайн, который принимает на вход HTML-шаблон письма, проверяет его через SpamAssassin, анализирует все ссылки на безопасность с помощью Google Safe Browsing API, и делает скриншоты рендеринга в разных почтовых клиентах.',
    imageUrl: '/assets/images/email.jpg',
    visualPrompt: 'Abstract cybersecurity pipeline. Digital shield composed of data packets, flowing through protective light rings. Obsidian glass surface, red and gold defensive glows. ABSOLUTELY NO TEXT. Geometric flow, security tech vibe, 8K.',
    technologies: ['Node.js', 'Express', 'Puppeteer', 'SpamAssassin API', 'Docker'],
    keyFeatures: [
      'Автоматизированный конвейер для комплексного анализа email-шаблонов.',
      'Проверка на спам-триггеры с использованием SpamAssassin.',
      'Анализ безопасности всех ссылок через Google Safe Browsing API.',
      'Создание скриншотов рендеринга в разных почтовых клиентах.'
    ],
    keyTakeaways: [
      'Нулевой риск попадания в черные списки из-за фишинговых ссылок.',
      'Автоматическая валидация верстки под мобильные устройства.',
      'Интеграция с маркетинговыми CRM для преданализа кампаний.'
    ],
    documentationPage: '/documentation/email-safety-pipeline',
  },
  {
    id: 6,
    slug: 'scenario-nexus',
    title: 'Scenario Nexus: AI-ядро',
    summary: 'Архитектура автоматической трансформации сценариев и сквозного QA-контроля.',
    description: 'Узел управления диалоговой логикой. Превращает разрозненные скрипты операторов в единую, машиночитаемую структуру, исполняемую AI-агентами с автоматической валидацией на каждом шаге.',
    imageUrl: '/assets/images/Scenario Nexus AI-ядро.jpg',
    visualPrompt: 'Complex multidimensional logic graph. Glowing decision trees, interconnected nodes in a 3D dark space. Scenario engine visualization. Deep obsidian, violet and magenta accents. NO TEXT, NO NUMBERS. Cinematic depth, digital nexus, 4K.',
    technologies: ['JSON-Schema', 'Logic-Engines', 'CRM-Automation', 'QA-Validators'],
    keyFeatures: [
      'Сквозная дескриптивная логика сценария на базе JSON-Schema.',
      'Автогенерация AI-агентов, строго детерминированных сценарием.',
      'Динамическое управление поведением через CRM без изменения кода.',
      'Модуль Sentinel QA для автоматического выявления логических аномалий.'
    ],
    keyTakeaways: [
      'Переход от хаотичных промптов к детерминированной логике.',
      'Sentinel QA блокирует 99% галлюцинаций LLM-агентов.',
      'Масштабирование сценариев на сотни ботов без участия разработчиков.'
    ],
    documentationPage: '/documentation/scenario-nexus',
  },
];
