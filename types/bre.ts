export interface CalibrationData {
    clickLatency: number; // ms
    motorStability: number; // 0-1 (1 is perfectly stable)
    readingSpeed: number; // wpm
    impulsivity: number; // 0-1 (1 is highly impulsive)
    isCalibrated: boolean;
}

export interface DiagnosticEvent {
    type:
    | 'MOUSE_TRAJECTORY'
    | 'HOVER_FOCUS'
    | 'PAUSE'
    | 'SCROLL_OSCILLATION'
    | 'SCROLL_BACK'
    | 'RAPID_SCROLL'
    | 'SYSTEM_TEST' // Rapid clicking
    | 'KEY_SPAM'
    | 'TEXT_HIGHLIGHT';
    value: number; // The raw measurement (e.g., clicks/sec, tortuosity ratio)
    timestamp: number;
    metadata?: any;
}

export interface AlignmentState {
    score: number; // -100 to +100
    integrity: number; // 0 to 100
    status: 'STABLE' | 'DECAYING' | 'RECOVERING' | 'CRITICAL';
}
