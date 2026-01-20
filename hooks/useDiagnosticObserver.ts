import { useRef, useEffect } from 'react';
import { useBREStore } from '../store/breStore';

export const useDiagnosticObserver = () => {
    const processEvent = useBREStore((state) => state.processEvent);

    // Refs to store transient data
    const mouseBuffer = useRef<{ x: number; y: number; t: number }[]>([]);
    const scrollDirection = useRef<'up' | 'down' | null>(null);
    const scrollChanges = useRef<number[]>([]);
    const clickCount = useRef<number[]>([]);
    const lastActivity = useRef<number>(Date.now());

    useEffect(() => {
        // -----------------------------------------------------
        // 1. Mouse Trajectory Analysis (Tortuosity)
        // -----------------------------------------------------
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            lastActivity.current = now;
            mouseBuffer.current.push({ x: e.clientX, y: e.clientY, t: now });

            // Keep only last 2 seconds
            mouseBuffer.current = mouseBuffer.current.filter(p => now - p.t < 2000);
        };

        const analyzePath = () => {
            if (mouseBuffer.current.length < 10) return;

            const first = mouseBuffer.current[0];
            const last = mouseBuffer.current[mouseBuffer.current.length - 1];

            // Linear distance
            const distance = Math.sqrt(Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2));

            if (distance < 50) return; // Ignore small movements

            // Total path length
            let pathLength = 0;
            for (let i = 1; i < mouseBuffer.current.length; i++) {
                const p1 = mouseBuffer.current[i - 1];
                const p2 = mouseBuffer.current[i];
                pathLength += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            }

            const tortuosity = pathLength / distance;
            processEvent({ type: 'MOUSE_TRAJECTORY', value: tortuosity, timestamp: Date.now() });
        };

        const pathInterval = setInterval(analyzePath, 2000);

        // -----------------------------------------------------
        // 2. Scroll Analysis (Oscillation & Reading)
        // -----------------------------------------------------
        const handleScroll = () => {
            lastActivity.current = Date.now();
            // Complex scroll logic implementation would go here
            // Simplified trigger for now
        };

        // -----------------------------------------------------
        // 3. Click Rage / System Test
        // -----------------------------------------------------
        const handleClick = () => {
            const now = Date.now();
            lastActivity.current = now;
            clickCount.current.push(now);

            // Remove clicks older than 1s
            clickCount.current = clickCount.current.filter(t => now - t < 1000);

            if (clickCount.current.length > 4) {
                processEvent({ type: 'SYSTEM_TEST', value: clickCount.current.length, timestamp: now });
                clickCount.current = []; // Reset to avoid spamming the event
            }
        };

        // -----------------------------------------------------
        // 4. Focus / Pause Detector
        // -----------------------------------------------------
        const pauseInterval = setInterval(() => {
            const timeSinceActivity = Date.now() - lastActivity.current;
            if (timeSinceActivity > 3000 && timeSinceActivity < 3500) {
                processEvent({ type: 'PAUSE', value: timeSinceActivity, timestamp: Date.now() });
            }
        }, 1000);


        // Attach Listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
            clearInterval(pathInterval);
            clearInterval(pauseInterval);
        };
    }, [processEvent]);
};
