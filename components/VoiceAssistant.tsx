import React from 'react';

/**
 * VoiceAssistant - Text-only assistant component
 * This component is now purely informational and text-based
 */
const VoiceAssistant: React.FC = () => {
    return null; // This component is now inactive - text only mode
};

/**
 * Speak function for text-to-speech functionality
 */
export const speak = (text: string): void => {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0; // Normal speed
        utterance.pitch = 1.0; // Normal pitch
        utterance.volume = 0.8; // Slightly lower volume

        window.speechSynthesis.speak(utterance);
    } else {
        console.warn('Speech synthesis not supported in this browser');
    }
};

export default VoiceAssistant;
