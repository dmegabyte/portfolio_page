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
    const observerRef = useRef<IntersectionObserver | null>(null);

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

        // Disconnect any existing observer before setting up a new one
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // 1. Scan for headings and populate the TOC state
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

        // If no headings are found, there's nothing to observe.
        if (headingElements.length === 0) return;

        // 2. Set up a robust scroll spy observer.
        // This ref holds the IDs of all sections currently within the observer's rootMargin.
        const visibleSections = new Set<string>();

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Update the set of sections currently inside the active viewport margin
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleSections.add(entry.target.id);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            let newActiveId = '';
            
            // Find the first visible section by iterating through headings in their document order.
            // This ensures the topmost visible section is always chosen as active.
            for (const heading of mappedHeadings) {
                if (visibleSections.has(heading.id)) {
                    newActiveId = heading.id;
                    break;
                }
            }

            // Fallback: If no section is in the active margin (e.g., in the space between sections or at the page bottom),
            // check if the user has scrolled to the very bottom of the document.
            if (!newActiveId) {
                const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50; // 50px buffer
                if (isAtBottom && mappedHeadings.length > 0) {
                    newActiveId = mappedHeadings[mappedHeadings.length - 1].id;
                }
            }
            
            // Only update state if the active ID has actually changed to prevent unnecessary re-renders.
            if (newActiveId) {
                setActiveId(newActiveId);
            }
        };
        
        observerRef.current = new IntersectionObserver(observerCallback, {
            // The "active" area is a horizontal band between 20% from the top and 25% from the bottom of the viewport.
            rootMargin: '-20% 0px -75% 0px',
            threshold: 0, // Fire as soon as a single pixel enters/leaves the margin.
        });

        headingElements.forEach(h => observerRef.current.observe(h));

        // Cleanup function to disconnect the observer when the component unmounts or content changes
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [children]); // Re-run the entire setup if the page content changes.


    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl animate-fade-in border border-gray-200 dark:border-slate-700">
            <div className="lg:flex">
                 {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
                    <div className="flex flex-col h-full">
                        <nav aria-labelledby="document-navigation" className="flex-grow">
                            <h2 id="document-navigation" className="font-bold text-gray-800 dark:text-slate-200 mb-4 text-lg">Оглавление</h2>
                            <ul className="space-y-1">
                                {headings.map((heading) => {
                                    const isActive = activeId === heading.id;
                                    const isSubheading = heading.level > 2;
                                    
                                    const linkClasses = `
                                        block w-full text-left transition-colors duration-200
                                        border-l-2 py-1.5 pr-3
                                        ${isSubheading ? 'pl-7' : 'pl-3 font-semibold'}
                                        ${isActive
                                            ? 'text-slate-900 dark:text-slate-50 font-bold border-indigo-500 dark:border-indigo-400'
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
                        <ScrollToTopButton />
                    </div>
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
                </div>
            </div>
        </div>
    );
};

export default DocPageLayout;