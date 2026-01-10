
import React, { ReactNode, useEffect, useState, useRef, useMemo } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ChevronDownIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from './Breadcrumbs';

interface DocumentationPageLayoutProps {
    children: ReactNode;
    title: string;
}

const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({ children, title }) => {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const headingIds = useMemo(() => headings.map(h => h.id), [headings]);
    const activeId = useScrollSpy(headingIds, contentRef);

    const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault(); 
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileTocOpen(false);
    };

    useEffect(() => {
        if (!contentRef.current) return;

        const headingElements = Array.from(contentRef.current.querySelectorAll('section[id]')) as HTMLElement[];
        const mappedHeadings = headingElements.map(h => {
            const headingEl = h.querySelector('h2, h3, h4, h5, h6'); 
            const textContent = headingEl?.textContent || h.id.replace(/-/g, ' ');
            return {
                id: h.id,
                text: textContent,
                level: 2 
            }
        });
        setHeadings(mappedHeadings);
    }, [children]);

    const renderTocList = (isMobile: boolean) => (
        <ul className="space-y-1">
            {headings.map((heading) => {
                const isActive = activeId === heading.id;
                
                return (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            onClick={(e) => handleTocLinkClick(e, heading.id)}
                            className={`
                                flex items-center gap-3 transition-all duration-300 group py-2 px-3 rounded-lg
                                ${isActive 
                                    ? 'text-indigo-400 font-bold bg-indigo-500/10 translate-x-1' 
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                }
                            `}
                        >
                            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-400 scale-150 shadow-[0_0_10px_rgba(129,140,248,0.8)]' : 'bg-slate-700'}`}></span>
                            <span className="truncate text-sm tracking-tight">{heading.text}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="bg-slate-900/70 backdrop-blur-3xl rounded-4xl border border-slate-800 shadow-premium overflow-hidden animate-fade-in relative isolate">
            {/* Subtle Gradient background for extra readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none -z-10"></div>
            
            <div className="lg:flex">
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-slate-950/60 border-r border-slate-800/50 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar p-8">
                    <nav aria-labelledby="sidebar-navigation">
                        <h2 id="sidebar-navigation" className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-10 pl-3">
                            <ListBulletIcon className="w-4 h-4" />
                            Оглавление
                        </h2>
                        {renderTocList(false)}
                    </nav>
                </aside>

                <div className="flex-grow px-6 py-10 sm:p-12 lg:p-16">
                    <Breadcrumbs />
                    
                    <header className="mb-16">
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight">
                            {title}
                        </h1>
                        <div className="mt-8 w-20 h-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full"></div>
                    </header>

                    {headings.length > 0 && (
                        <div className="lg:hidden mb-12">
                            <button
                                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                                className="w-full flex justify-between items-center p-5 bg-slate-800/90 border border-slate-700 rounded-2xl text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
                            >
                                <span className="flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <ListBulletIcon className="w-5 h-5 text-indigo-400" /> Содержание
                                </span>
                                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isMobileTocOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ${isMobileTocOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <nav className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-inner">
                                    {renderTocList(true)}
                                </nav>
                            </div>
                        </div>
                    )}
                    
                    <article ref={contentRef} className="prose prose-invert prose-lg max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
                        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-white prose-strong:font-extrabold
                        prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline transition-all
                        prose-li:text-slate-300 prose-li:font-medium">
                        {children}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPageLayout;
