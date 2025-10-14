import { useEffect, RefObject } from 'react';

interface UseModalLogicProps {
    isOpen: boolean;
    onClose: () => void;
    modalRef: RefObject<HTMLDivElement>;
}

/**
 * A custom hook to manage the side effects of a modal dialog.
 * This includes handling keyboard events, focus trapping, and locking body scroll.
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @param {Function} onClose - The function to call to close the modal.
 * @param {RefObject<HTMLDivElement>} modalRef - A ref to the modal's container element.
 */
export const useModalLogic = ({ isOpen, onClose, modalRef }: UseModalLogicProps) => {
    useEffect(() => {
        if (!isOpen) {
            // This case handles when the modal is closed via props change.
            // The cleanup function from the previous render (when isOpen was true) handles the rest.
            return;
        }

        // 1. Lock body scroll as the primary side effect.
        document.body.style.overflow = 'hidden';

        // 2. Handle Escape key press.
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);

        // 3. Implement Focus Trapping, but ensure cleanup is always registered.
        const modalNode = modalRef.current;
        
        let handleTabKey: ((e: KeyboardEvent) => void) | null = null;
        
        if (modalNode) {
            const focusableElements = Array.from(
                modalNode.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
                )
            );

            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
                
                // Set initial focus
                firstElement.focus();
                
                handleTabKey = (e: KeyboardEvent) => {
                    if (e.key !== 'Tab') return;
                    
                    if (e.shiftKey) { // Shift + Tab: Move focus backwards
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else { // Tab: Move focus forwards
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                };
                modalNode.addEventListener('keydown', handleTabKey);
            }
        }

        // The cleanup function is now guaranteed to run when the effect is cleaned up
        // (i.e., when isOpen becomes false, or the component unmounts).
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEsc);
            if (modalNode && handleTabKey) {
                modalNode.removeEventListener('keydown', handleTabKey);
            }
        };
    }, [isOpen, onClose, modalRef]);
};
