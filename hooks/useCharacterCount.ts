import { useState, useEffect, RefObject } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A custom hook that counts the number of characters (excluding whitespace)
 * within a given DOM element. It re-counts whenever the URL changes.
 * @param contentRef - A React ref to the DOM element to count characters from.
 * @returns {number} - The number of characters.
 */
export const useCharacterCount = (contentRef: RefObject<HTMLElement>): number => {
    const [charCount, setCharCount] = useState(0);
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        // Reset count immediately on navigation to prepare for fade-in
        setCharCount(0);
        
        // A small delay to ensure the DOM is updated after a route change in the SPA
        const timer = setTimeout(() => {
            if (contentRef.current) {
                const text = contentRef.current.textContent || '';
                setCharCount(text.replace(/\s/g, '').length);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [contentRef, pathname, search, hash]); // Rerun on any part of the URL changing

    return charCount;
};