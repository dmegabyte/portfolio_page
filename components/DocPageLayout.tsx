import React, { ReactNode, useEffect, useState, useRef } from 'react';
import ScrollToTopButton from './ScrollToTopButton';

interface DocPageLayoutProps {
    children: ReactNode;
    title: string;
}

const DocPageLayout: React.FC<DocPageLayoutProps> = ({ children, title }) => {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);

    // Custom click handler to manage scrolling without causing router conflicts.
    const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault(); // Prevent the browser's default anchor link behavior which can conflict with the router.
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Manually update URL hash for better user feedback, without a full page reload.
            // Using history.pushState is safer than window.location.hash to avoid triggering router changes.
            if(history.pushState) {
                history.pushState(null, '', `#${id}`);
            }
        }
    };

    // Effect to build table of contents and set up scroll spy
    useEffect(() => {
        if (!contentRef.current) return;
        
        const headingElements = Array.from(contentRef.current.querySelectorAll('section[id]')) as HTMLElement[];
        const mappedHeadings = headingElements.map(h => {
            const h2 = h.querySelector('h2');
            const textContent = h2?.textContent || h.id.replace(/-/g, ' ');
            // Establish hierarchy based on title content
            const level = textContent.startsWith('БЛОК') || textContent.match(/^\d+\./) ? 3 : 2;
            return {
                id: h.id,
                text: textContent,
                level: level 
            }
        });
        setHeadings(mappedHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                 // Find the topmost visible section
                let topEntry: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (!topEntry || entry.boundingClientRect.top < topEntry.boundingClientRect.top) {
                            topEntry = entry;
                        }
                    }
                }
                if (topEntry) {
                    setActiveId(topEntry.target.id);
                }
            },
            { rootMargin: '-20% 0px -75% 0px', threshold: 0.1 }
        );

        headingElements.forEach(h => observer.observe(h));

        return () => {
            headingElements.forEach(h => observer.unobserve(h));
        };
    }, [children]);


    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl animate-fade-in border border-gray-200 dark:border-slate-700">
            <div className="lg:flex">
                 {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
                    <nav aria-labelledby="document-navigation">
                        <h2 id="document-navigation" className="font-bold text-gray-800 dark:text-slate-200 mb-4 text-lg">Оглавление</h2>
                        <ul className="space-y-1">
                            {headings.map((heading) => {
                                const isActive = activeId === heading.id;
                                const isSubheading = heading.level > 2;
                                
                                const linkClasses = `
                                    block w-full text-left transition-colors text-sm rounded-md px-3 py-1.5
                                    ${isSubheading ? 'pl-7' : 'font-semibold'}
                                    ${isActive
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-700'
                                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                                    }
                                `;

                                return (
                                    <li key={heading.id}>
                                        <a
                                            href={`#${heading.id}`}
                                            onClick={(e) => handleTocLinkClick(e, heading.id)}
                                            className={linkClasses.trim().replace(/\s+/g, ' ')}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {heading.text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                 {/* Main Content */}
                <div className="flex-grow p-6 sm:p-8 lg:p-12 min-w-0">
                    <header className="mb-12 not-prose">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-50 leading-tight">
                            {title}
                        </h1>
                    </header>
                    <article ref={contentRef} className="prose prose-lg max-w-none text-gray-700 dark:text-slate-300 dark:prose-headings:text-slate-100 dark:prose-strong:text-slate-100 dark:prose-a:text-indigo-600 dark:prose-a:hover:text-indigo-500 dark:prose-invert">
                        {children}
                    </article>
                    <ScrollToTopButton />
                </div>
            </div>
        </div>
    );
};

export default DocPageLayout;