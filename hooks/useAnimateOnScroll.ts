import { useEffect, RefObject } from 'react';

interface AnimateOnScrollOptions {
    targetSelector: string;
    threshold?: number;
    rootMargin?: string;
}

/**
 * A custom hook that uses the Intersection Observer API to add a 'is-visible' class
 * to target elements within a container when they scroll into the viewport.
 * This is designed to trigger CSS animations.
 * @param containerRef - A React ref to the container element whose children will be observed.
 * @param options - Configuration for the observer.
 * @param options.targetSelector - The CSS selector for the child elements to observe.
 */
export const useAnimateOnScroll = (
    containerRef: RefObject<HTMLElement>,
    options: AnimateOnScrollOptions
) => {
    const { targetSelector, threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When the element becomes intersecting, add the class and stop observing it.
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold, rootMargin }
        );

        // Find all target elements within the container and start observing them.
        const elements = containerRef.current.querySelectorAll(targetSelector);
        if (elements) elements.forEach((el) => observer.observe(el));

        // Cleanup function: disconnect the observer when the component unmounts.
        return () => {
            if (elements) elements.forEach((el) => observer.unobserve(el));
        };
    }, [containerRef, targetSelector, threshold, rootMargin]);
};
