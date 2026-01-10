import { useState, useEffect, RefObject } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A custom hook that counts the number of characters (excluding whitespace)
 * within a given DOM element. It re-counts whenever the URL changes or the content mutates.
 * @param contentRef - A React ref to the DOM element to count characters from.
 * @returns {number} - The number of characters.
 */
export const useCharacterCount = (contentRef: RefObject<HTMLElement>): number => {
    const [charCount, setCharCount] = useState(0);
    const { pathname, search, hash } = useLocation();

    const calculateCount = () => {
        if (contentRef.current) {
            const text = contentRef.current.textContent || '';
            setCharCount(text.replace(/\s/g, '').length);
        } else {
            setCharCount(0);
        }
    };

    useEffect(() => {
        const targetNode = contentRef.current;
        if (!targetNode) {
            setCharCount(0);
            return;
        }

        // Perform an initial count when the component mounts or URL changes.
        calculateCount();

        // Create an observer instance linked to the callback function.
        const observer = new MutationObserver(calculateCount);

        // Start observing the target node for mutations.
        const config = { childList: true, subtree: true, characterData: true };
        observer.observe(targetNode, config);

        // Cleanup function to disconnect the observer when the component unmounts or dependencies change.
        return () => {
            observer.disconnect();
        };
    }, [contentRef, pathname, search, hash]); // Re-run effect if the ref or URL changes.

    return charCount;
};
