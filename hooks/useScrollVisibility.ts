import { useState, useEffect } from 'react';

/**
 * A custom hook that determines visibility based on the window's scroll position.
 * @param threshold - The scrollY value (in pixels) after which the hook returns true.
 * @returns {boolean} - `true` if window.scrollY is greater than the threshold, otherwise `false`.
 */
export const useScrollVisibility = (threshold: number): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Check on mount as well
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  return isVisible;
};