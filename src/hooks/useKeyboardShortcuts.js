import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {Function} onPrevious - Callback for previous action (← key)
 * @param {Function} onNext - Callback for next action (→ key)
 * @param {Function} onToggleAnswer - Callback for toggle answer (A key)
 * @param {Function} onToggleOptions - Callback for toggle options (O key)
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export const useKeyboardShortcuts = (onPrevious, onNext, onToggleAnswer, onToggleOptions, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event) => {
            // Ignore if user is typing in an input field
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    onPrevious?.();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    onNext?.();
                    break;
                case 'a':
                case 'A':
                    event.preventDefault();
                    onToggleAnswer?.();
                    break;
                case 'o':
                case 'O':
                    event.preventDefault();
                    onToggleOptions?.();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onPrevious, onNext, onToggleAnswer, onToggleOptions, enabled]);
};
