/**
 * Speech bubble utilities for the voice assistant overlay
 */


const listeners = new Set<(text: string) => void>();

/**
 * Register callback for adding speech bubbles
 * Returns a cleanup function
 */
export const registerBubbleCallback = (callback: (text: string) => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

/**
 * Unregister bubble callback
 * @deprecated Use the return value of registerBubbleCallback instead
 */
export const unregisterBubbleCallback = (callback?: (text: string) => void) => {
    if (callback) {
        listeners.delete(callback);
    } else {
        listeners.clear();
    }
};

/**
 * Add a speech bubble to the overlay
 */
export const showSpeechBubble = (text: string) => {
    listeners.forEach(callback => callback(text));
};
