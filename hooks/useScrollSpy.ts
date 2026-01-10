import { useState, useEffect, useRef, RefObject } from 'react';

export const useScrollSpy = (headingIds: string[], contentRef: RefObject<HTMLElement>): string => {
    const [activeId, setActiveId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        if (headingIds.length === 0 || !contentRef.current) return;

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
            for (const id of headingIds) {
                if (visibleSections.has(id)) {
                    newActiveId = id;
                    break;
                }
            }
            
            if (newActiveId) {
                setActiveId(newActiveId);
            }
        };
        
        observerRef.current = new IntersectionObserver(observerCallback, {
            rootMargin: '-20% 0px -75% 0px',
            threshold: 0,
        });

        const elements = contentRef.current?.querySelectorAll('section[id]');
        if (elements) {
            elements.forEach(el => {
                if (headingIds.includes(el.id)) {
                    observerRef.current!.observe(el);
                }
            });
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headingIds, contentRef]);

    return activeId;
};
