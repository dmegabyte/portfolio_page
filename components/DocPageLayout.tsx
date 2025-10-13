
import React, { ReactNode, useEffect, useState, useRef } from 'react';

interface DocumentationPageLayoutProps {
    children: ReactNode;
    title: string;
}

const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({ children, title }) => {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const contentRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Principle 9: This handler ensures smooth scrolling without conflicting with HashRouter.
    // It prevents the default anchor link behavior and uses JavaScript for navigation.
    const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault(); 
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if(history.pushState) {
                history.pushState(null, '', `#${id}`);
            }
        }
    };

    // Effect 1: Scans the document for section headings and builds the TOC.
    // This runs whenever the page content (`children`) changes.
    useEffect(() => {
        if (!contentRef.current) return;

        const headingElements = Array.from(contentRef.current.querySelectorAll('section[id]')) as HTMLElement[];
        const mappedHeadings = headingElements.map(h => {
            const headingEl = h.querySelector('h2, h3, h4, h5, h6'); 
            const textContent = headingEl?.textContent || h.id.replace(/-/g, ' ');
            // All sections are treated as top-level items for a flat, clear TOC structure.
            return {
                id: h.id,
                text: textContent,
                level: 2 
            }
        });
        setHeadings(mappedHeadings);

    }, [children]); // Dependency on children ensures TOC is always up-to-date with content.

    // Effect 2: Manages the IntersectionObserver for scroll spying.
    // This effect runs when the list of headings is updated, setting up the observer.
    useEffect(() => {
        // Disconnect any previous observer before creating a new one.
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        if (headings.length === 0) return;

        const visibleSections = new Set<string>();

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleSections.add(entry.target.id);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            // Find the first heading in the document's order that is currently intersecting.
            // This reliably identifies the topmost visible section.
            let newActiveId = '';
            for (const heading of headings) {
                if (visibleSections.has(heading.id)) {
                    newActiveId = heading.id;
                    break;
                }
            }
            
            if (newActiveId) {
                setActiveId(newActiveId);
            }
        };
        
        observerRef.current = new IntersectionObserver(observerCallback, {
            // The "active" area is a horizontal band between 20% from the top and 25% from the bottom of the viewport.
            rootMargin: '-20% 0px -75% 0px',
            threshold: 0, // Fire as soon as a single pixel enters/leaves the margin.
        });

        // Start observing all section elements.
        const elements = contentRef.current?.querySelectorAll('section[id]');
        if (elements) {
            elements.forEach(el => observerRef.current!.observe(el));
        }

        // Cleanup function to disconnect the observer on component unmount.
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]); // Reruns only when the headings array itself changes.


    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl animate-fade-in border border-gray-200 dark:border-slate-700">
            <div className="lg:flex">
                 {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
                    <nav aria-labelledby="document-navigation">
                        <h2 id="document-navigation" className="font-bold text-slate-900 dark:text-slate-200 mb-4 text-lg">Оглавление</h2>
                        <ul className="space-y-1">
                            {headings.map((heading) => {
                                const isActive = activeId === heading.id;
                                const isSubheading = heading.level > 2;
                                
                                const linkClasses = `
                                    block w-full text-left transition-colors duration-200
                                    border-l-2 py-1.5 pr-3
                                    ${isSubheading ? 'pl-7' : 'pl-3 font-semibold'}
                                    ${isActive
                                        ? 'text-slate-900 dark:text-slate-200 font-bold border-indigo-500 dark:border-indigo-400'
                                        : 'text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-900 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600'
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
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-200 leading-tight">
                            {title}
                        </h1>
                    </header>
                    <article ref={contentRef} className="prose prose-lg max-w-none text-gray-700 dark:text-slate-300 dark:prose-headings:text-slate-200 dark:prose-strong:text-slate-200 dark:prose-a:text-indigo-600 dark:prose-a:hover:text-indigo-500 dark:prose-invert">
                        {children}
                    </article>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPageLayout;