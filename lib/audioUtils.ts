export const playAudio = (src: string, sampleRate?: number, volume: number = 0.5): Promise<void> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio(src);

        // Set volume (0.0 to 1.0)
        audio.volume = Math.max(0, Math.min(1, volume));

        audio.addEventListener('canplaythrough', () => {
            audio.play().then(() => resolve()).catch(reject);
        });

        audio.addEventListener('error', (error) => {
            console.error("Failed to load audio:", error);
            reject(new Error("Audio loading failed"));
        });

        // Set audio properties if sampleRate is provided
        if (sampleRate) {
            audio.playbackRate = sampleRate / 44100; // Normalize to standard 44.1kHz
        }

        audio.load();
    });
};
