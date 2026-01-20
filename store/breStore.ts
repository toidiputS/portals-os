import { create } from 'zustand';
import { CalibrationData, AlignmentState, DiagnosticEvent } from '../types/bre';

interface BREStore {
    // State
    calibration: CalibrationData;
    alignment: AlignmentState;

    // Actions
    updateCalibration: (data: Partial<CalibrationData>) => void;
    updateAlignment: (delta: number) => void;
    decayIntegrity: (amount: number) => void;
    restoreIntegrity: (amount: number) => void;
    processEvent: (event: DiagnosticEvent) => void;
    resetBRE: () => void;
}

const DEFAULT_CALIBRATION: CalibrationData = {
    clickLatency: 300,
    motorStability: 0.5,
    readingSpeed: 200,
    impulsivity: 0.5,
    isCalibrated: false,
};

const DEFAULT_ALIGNMENT: AlignmentState = {
    score: 0,
    integrity: 100,
    status: 'STABLE',
};

export const useBREStore = create<BREStore>((set, get) => ({
    calibration: { ...DEFAULT_CALIBRATION },
    alignment: { ...DEFAULT_ALIGNMENT },

    updateCalibration: (data) =>
        set((state) => ({
            calibration: { ...state.calibration, ...data, isCalibrated: true }
        })),

    updateAlignment: (delta) =>
        set((state) => {
            const current = state.alignment.score;
            // Clamp between -100 and 100
            const newScore = Math.max(-100, Math.min(100, current + delta));

            let newStatus = state.alignment.status;
            if (newScore < -50) newStatus = 'CRITICAL';
            else if (newScore < -20) newStatus = 'DECAYING';
            else if (newScore > 20) newStatus = 'RECOVERING';
            else newStatus = 'STABLE';

            return {
                alignment: {
                    ...state.alignment,
                    score: newScore,
                    status: newStatus as AlignmentState['status']
                }
            };
        }),

    decayIntegrity: (amount) =>
        set((state) => {
            const current = state.alignment.integrity;
            // Only decay if alignment is significantly negative (Dissolution)
            if (state.alignment.score > -20) return state;

            const newIntegrity = Math.max(0, current - amount);
            return {
                alignment: { ...state.alignment, integrity: newIntegrity }
            };
        }),

    restoreIntegrity: (amount) =>
        set((state) => ({
            alignment: {
                ...state.alignment,
                integrity: Math.min(100, state.alignment.integrity + amount)
            }
        })),

    processEvent: (event) => {
        const { updateAlignment, calibration } = get();
        let delta = 0;

        // Base scoring logic - enhanced by calibration relative values
        switch (event.type) {
            case 'MOUSE_TRAJECTORY':
                // High tortuosity (>5) -> Dissolution (-), Low (<1.2) -> Evolution (+)
                if (event.value > 5.0) delta = -2 * (1 - calibration.motorStability);
                if (event.value < 1.2) delta = 1;
                break;

            case 'HOVER_FOCUS':
                delta = 2;
                break;

            case 'PAUSE':
                delta = 1;
                break;

            case 'SCROLL_OSCILLATION':
                delta = -3;
                break;

            case 'SCROLL_BACK':
                delta = 3; // Rereading is good
                break;

            case 'RAPID_SCROLL':
                // Normalized by reading speed
                delta = -1;
                break;

            case 'SYSTEM_TEST': // Rapid clicking
                // If user is naturally impulsive, penalize less
                delta = -5 * (1 - calibration.impulsivity);
                break;

            case 'KEY_SPAM':
                delta = -5;
                break;
        }

        // Apply score update
        if (delta !== 0) updateAlignment(delta);
    },

    resetBRE: () => set({
        calibration: { ...DEFAULT_CALIBRATION },
        alignment: { ...DEFAULT_ALIGNMENT }
    }),
}));
