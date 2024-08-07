import { flushSync } from 'react-dom';

/**
 * Start a transition on the document if available, otherwise just run the function.
 * @param func The function to run.
 * @returns void
 */
export const startTransition = (func: () => void) => {
    if (!document.startViewTransition) {
        func();
        return;
    }

    document.startViewTransition(() => {
        flushSync(func);
    });
};

export default startTransition;
