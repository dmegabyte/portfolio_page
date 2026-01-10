
import React from 'react';
import DocumentationPageLayout from '../components/DocPageLayout';
import { SectionHeader, InfoCard, TypographyTable } from '../components/DocumentationUIComponents';
import { 
    PaintBrushIcon, 
    LightBulbIcon, 
    PuzzlePieceIcon, 
    SwatchIcon 
} from '@heroicons/react/24/outline';

const TypographyGuidePage: React.FC = () => {
    return (
        <DocumentationPageLayout title="Руководство по типографике">
            <div className="space-y-16">
                
                <section id="concept" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<PaintBrushIcon className="w-8 h-8" />}
                        title="Концепция типографики"
                        subtitle="Стандартизированная система шрифтов, обеспечивающая визуальную целостность и читаемость контента во всем проекте."
                    />
                    <InfoCard icon={<LightBulbIcon className="w-8 h-8" />} title="Ключевые принципы шрифтов">
                        <ul className="list-disc list-inside space-y-2 text-base">
                            <li><b>Единый шрифт:</b> Весь проект использует современный гротеск <strong>Inter</strong> с широким диапазоном начертаний.</li>
                            <li><b>Масштабируемость:</b> Размеры шрифтов определены через CSS-переменные, что позволяет легко адаптировать интерфейс под разные устройства.</li>
                            <li><b>Контрастность:</b> Иерархия заголовков строится на резком различии размеров и весов (от Light до Black).</li>
                            <li><b>Читаемость:</b> Межстрочные интервалы (line-height) оптимизированы для длинных технических текстов в документации.</li>
                        </ul>
                    </InfoCard>
                </section>

                <section id="font-table" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<SwatchIcon className="w-8 h-8" />}
                        title="Таблица уровней типографики"
                        subtitle="Детальное описание каждого уровня шрифта, используемых классов Tailwind и контекста применения."
                    />
                    <TypographyTable />
                </section>

                <section id="best-practices" className="scroll-mt-24">
                    <SectionHeader 
                        icon={<PuzzlePieceIcon className="w-8 h-8" />}
                        title="Правила применения"
                        subtitle="Как правильно использовать систему шрифтов при разработке новых компонентов."
                    />
                    <div className="grid md:grid-cols-2 gap-8 not-prose">
                        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="text-xl font-bold text-white mb-4">Для заголовков</h4>
                            <p className="text-slate-400 text-sm mb-4">Используйте <code>font-black</code> или <code>font-extrabold</code> для создания мощных визуальных якорей. Не забывайте про <code>tracking-tighter</code> для очень крупных размеров.</p>
                            <div className="space-y-2">
                                <div className="p-3 bg-slate-900 rounded border border-slate-700">
                                    <span className="text-4xl font-black text-white">ПРИМЕР</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h4 className="text-xl font-bold text-white mb-4">Для основного текста</h4>
                            <p className="text-slate-400 text-sm mb-4">Используйте <code>leading-relaxed</code> для улучшения читаемости. Избегайте использования чисто белого цвета (#FFFFFF) для текста — <code>text-slate-300</code> снижает нагрузку на глаза.</p>
                            <div className="space-y-2">
                                <div className="p-3 bg-slate-900 rounded border border-slate-700">
                                    <span className="text-lg text-slate-300 leading-relaxed">Комфортный текст для чтения документации.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </DocumentationPageLayout>
    );
};

export default TypographyGuidePage;
