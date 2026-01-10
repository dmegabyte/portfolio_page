
import React, { useState } from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { 
    SectionHeader, 
    InfoCard, 
    CollapsibleSection, 
    CodeBlockWithCopy, 
    TooltipTerm, 
    Modal 
} from '../components/DocumentationUIComponents';
import { 
    CubeIcon, 
    InformationCircleIcon, 
    ChevronDoubleDownIcon, 
    CodeBracketIcon, 
    ChatBubbleLeftRightIcon, 
    RectangleStackIcon, 
    LightBulbIcon,
    PuzzlePieceIcon
} from '@heroicons/react/24/outline';

const DocUIComponentsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <DocumentationPageLayout title="Компоненты UI для документации">
            <div className="space-y-16">
                
                <section id="overview" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="Обзор библиотеки компонентов"
                        subtitle="Стандартизированный набор UI-элементов, разработанный для создания чистых, консистентных и информативных страниц документации. Эти компоненты являются основой визуального языка проекта."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые выводы (Key Takeaways)">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Единообразие:</b> Обеспечивает одинаковый внешний вид и поведение элементов на всех страницах.</li>
                            <li><b>Ускорение разработки:</b> Предоставляет готовые, переиспользуемые блоки для быстрого создания новых страниц.</li>
                            <li><b>Качество и доступность:</b> Компоненты разработаны с учетом лучших практик UX и accessibility.</li>
                            <li><b>Следование принципам:</b> Каждый компонент спроектирован в соответствии с Руководящими принципами проекта.</li>
                        </ul>
                    </InfoCard>
                </section>

                <section id="section-header" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CubeIcon className="w-8 h-8" />}
                        title="1. SectionHeader"
                        subtitle="Стандартизированный заголовок для крупных смысловых разделов. Используется для создания четкой визуальной иерархии на странице."
                    />
                    <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <SectionHeader 
                            icon={<CubeIcon className="w-8 h-8" />}
                            title="Это пример заголовка"
                            subtitle="Это подзаголовок, который кратко описывает содержание секции."
                        />
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
<SectionHeader 
    icon={<CubeIcon className="w-8 h-8" />}
    title="Название секции"
    subtitle="Краткое описание секции."
/>`}
                    />
                </section>
                
                <section id="info-card" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<InformationCircleIcon className="w-8 h-8" />}
                        title="2. InfoCard"
                        subtitle="Карточка для визуального выделения ключевой информации, преимуществ, выводов или связанных концепций в компактном формате."
                    />
                     <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <InfoCard icon={<InformationCircleIcon className="w-8 h-8" />} title="Это информационная карточка">
                            <p>Используйте эту карточку для кратких, но важных сообщений, которые должны привлечь внимание пользователя.</p>
                        </InfoCard>
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
<InfoCard icon={<InformationCircleIcon className="w-8 h-8" />} title="Заголовок карточки">
    <p>Содержимое карточки. Здесь может быть текст или список.</p>
</InfoCard>`}
                    />
                </section>
                
                <section id="collapsible-section" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ChevronDoubleDownIcon className="w-8 h-8" />}
                        title="3. CollapsibleSection"
                        subtitle="Компонент-аккордеон для группировки и скрытия объемной или второстепенной информации, чтобы не перегружать основной интерфейс."
                    />
                     <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <CollapsibleSection title="Нажмите, чтобы раскрыть детали">
                            <p>Здесь находится дополнительная информация, которая по умолчанию скрыта. Это помогает поддерживать чистоту интерфейса, предоставляя доступ к деталям по требованию.</p>
                        </CollapsibleSection>
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
<CollapsibleSection title="Заголовок для раскрытия">
    <p>Скрытое по умолчанию содержимое.</p>
</CollapsibleSection>`}
                    />
                </section>

                <section id="code-block" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<CodeBracketIcon className="w-8 h-8" />}
                        title="4. CodeBlockWithCopy"
                        subtitle="Специализированный блок для отображения фрагментов кода с подсветкой синтаксиса (стилизован под темную тему) и кнопкой для копирования в буфер обмена."
                    />
                     <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <CodeBlockWithCopy 
                            title="example.js"
                            code={`
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}

greet('World');`}
                        />
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
<CodeBlockWithCopy 
    title="Имя файла или контекст"
    code={\`
const message = "Hello, World!";
console.log(message);
    \`}
/>`}
                    />
                </section>

                <section id="tooltip-term" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<ChatBubbleLeftRightIcon className="w-8 h-8" />}
                        title="5. TooltipTerm"
                        subtitle="Интерактивный элемент для объяснения терминов и акронимов прямо в тексте. При наведении курсора появляется всплывающая подсказка с определением."
                    />
                     <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <p className="text-lg">
                            Наша система использует <TooltipTerm definition="Программный интерфейс приложения — это набор правил и инструментов, который позволяет различным программным приложениям взаимодействовать друг с другом.">API</TooltipTerm> для взаимодействия с внешними сервисами.
                        </p>
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
<p>
    Мы используем <TooltipTerm definition="Описание термина...">API</TooltipTerm> для...
</p>`}
                    />
                </section>

                <section id="modal" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<RectangleStackIcon className="w-8 h-8" />}
                        title="6. Modal"
                        subtitle="Модальное окно, которое появляется поверх основного контента для отображения важной информации или интерактивных форм в сфокусированном режиме."
                    />
                    <div className="my-6">
                        <h4 className="text-xl font-bold mb-4">Пример в действии:</h4>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Открыть модальное окно
                        </button>
                    </div>
                    <CodeBlockWithCopy 
                        title="Как использовать:"
                        code={`
import { useState } from 'react';
import { Modal } from './DocumentationUIComponents';

function MyComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Открыть</button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Заголовок модального окна"
            >
                <p>Содержимое модального окна.</p>
            </Modal>
        </div>
    );
}`}
                    />
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Пример модального окна"
                    >
                        <p>Это содержимое модального окна. Оно отображается поверх основного контента. Нажмите на фон или кнопку 'Escape', чтобы закрыть его.</p>
                    </Modal>
                </section>

            </div>
        </DocumentationPageLayout>
    );
};

export default DocUIComponentsPage;
