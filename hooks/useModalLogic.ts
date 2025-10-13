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
        if (!isOpen) return;

        // 1. Handle Escape key press
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        
        // 2. Lock body scroll
        document.body.style.overflow = 'hidden';
        
        // 3. Implement Focus Trapping
        const modalNode = modalRef.current;
        if (!modalNode) return;

        const focusableElements = Array.from(
            modalNode.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
            )
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        firstElement.focus();
        
        const handleTabKey = (e: KeyboardEvent) => {
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

        // Cleanup function to remove listeners and restore body scroll
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
            modalNode.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen, onClose, modalRef]);
};
