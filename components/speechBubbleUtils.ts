/**
 * Speech bubble utilities for the voice assistant overlay
 */

let addBubbleCallback: ((text: string) => void) | null = null;

/**
 * Register callback for adding speech bubbles
 */
export const registerBubbleCallback = (callback: (text: string) => void) => {
    addBubbleCallback = callback;
};

/**
 * Unregister bubble callback
 */
export const unregisterBubbleCallback = () => {
    addBubbleCallback = null;
};

/**
 * Add a speech bubble to the overlay
 */
export const showSpeechBubble = (text: string) => {
    if (addBubbleCallback) {
        addBubbleCallback(text);
    }
};
