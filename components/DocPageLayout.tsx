

import React, { ReactNode, useEffect, useState, useRef, useMemo } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface DocumentationPageLayoutProps {
    children: ReactNode;
    title: string;
}

const DocumentationPageLayout: React.FC<DocumentationPageLayoutProps> = ({ children, title }) => {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    // By memoizing the `headingIds` array with `useMemo`, we prevent the `useScrollSpy` hook's
    // internal useEffect from re-running on every render of this component. This is a key
    // performance optimization that ensures the IntersectionObserver is only recreated
    // when the actual list of headings changes, adhering to best practices.
    const headingIds = useMemo(() => headings.map(h => h.id), [headings]);
    
    // Use the custom scroll-spy hook to get the ID of the currently active section.
    // The hook observes the sections within `contentRef` and returns the ID of the one
    // currently in the viewport according to its logic. This is our activeId state.
    const activeId = useScrollSpy(headingIds, contentRef);

    // FIX: The `history.pushState` call was fundamentally incompatible with HashRouter,
    // causing unpredictable navigation behavior and crashes. According to Principle 9,
    // we must handle in-page navigation via JavaScript to avoid router conflicts.
    // This updated handler performs a smooth scroll without manipulating the URL,
    // ensuring stability and full compliance with the project's guiding principles.
    const handleTocLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault(); 
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Effect to scan the document for section headings and build the TOC.
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

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl animate-fade-in border border-gray-200 dark:border-slate-700">
            <div className="lg:flex">
                 {/* Sidebar */}
                <aside className="hidden lg:block w-72 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
                    <nav aria-labelledby="document-navigation">
                        <h2 id="document-navigation" className="font-bold text-slate-900 dark:text-slate-200 mb-4 text-lg">Оглавление</h2>
                        <ul className="space-y-1">
                            {headings.map((heading) => {
                                // Determine if the current TOC item is the active one by comparing its ID
                                // with the activeId received from the scroll-spy hook.
                                const isActive = activeId === heading.id;
                                const isSubheading = heading.level > 2;
                                
                                // Dynamically construct the CSS classes based on the active state.
                                const linkClasses = `
                                    block w-full text-left transition-colors duration-200
                                    border-l-2 py-1.5 pr-3 focus:outline-none
                                    ${isSubheading ? 'pl-7' : 'pl-3 font-semibold'}
                                    ${isActive
                                        ? 'text-slate-900 dark:text-slate-200 font-bold border-indigo-500 dark:border-indigo-400' // Active state styles
                                        : 'text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-900 dark:hover:text-slate-100 hover:border-gray-300 dark:hover:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:text-slate-900 dark:focus:text-slate-100' // Inactive state styles
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