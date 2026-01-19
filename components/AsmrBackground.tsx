import React, { useEffect, useRef } from 'react';

/**
 * ASMRStaticBackground Component
 * 
 * Features:
 * - High-density particle system using HTML5 Canvas.
 * - Reactive "magnetic vortex" effect on mouse hover.
 * - Visual "friction glow" when particles accelerate.
 * - Glass-shard and charcoal-dust aesthetic.
 * - Easter egg: Collect all 550 particles inside the portal!
 */
interface AsmrBackgroundProps {
    onParticleAchievement?: () => void;
}

export const AsmrBackground: React.FC<AsmrBackgroundProps> = ({ onParticleAchievement }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000 };

        const PARTICLE_COUNT = 550; // Easter egg challenge - collect all 550!

        // These get calculated after init() sets width/height
        let MAGNETIC_RADIUS = 0; // 30% of screen - inside the portal
        const VORTEX_STRENGTH = 0.07; // Gentle vortex for smooth swirling rotation
        const PULL_STRENGTH = 0.15; // Pull to keep particles flowing around

        // Extended zone: FULL SCREEN - but VERY slow attraction for easter egg
        const EXTENDED_PULL_STRENGTH = 0.002; // Super slow pull from anywhere on screen

        // Track particles for Easter egg achievement
        let particlesInVortex = 0;
        let achievementTriggered = false;

        class Particle {
            x: number = 0;
            y: number = 0;
            vx: number = 0;
            vy: number = 0;
            size: number = 0;
            alpha: number = 0;
            color: string = '';
            rotation: number = 0;
            rotationSpeed: number = 0;
            frictionGlow: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() - 0.5) * 0.2;
                // 70% Charcoal, 30% Glass
                const isGlass = Math.random() > 0.7;
                this.color = isGlass ? '240, 245, 255' : '80, 80, 85';
                this.alpha = Math.random() * 0.4 + 0.1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAGNETIC_RADIUS) {
                    // INSIDE THE CIRCLE: Magnetic vortex with pull + swirl
                    const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;

                    // Magnetic center pull
                    this.vx += (dx / dist) * force * PULL_STRENGTH;
                    this.vy += (dy / dist) * force * PULL_STRENGTH;

                    // Swirl vortex motion (Perpendicular to radius - makes them flow around)
                    this.vx += (dy / dist) * force * VORTEX_STRENGTH * 10;
                    this.vy -= (dx / dist) * force * VORTEX_STRENGTH * 10;

                    // Glow based on proximity and velocity
                    this.frictionGlow = force * 0.7;
                } else {
                    // OUTSIDE THE CIRCLE: Full screen - VERY slow attraction for easter egg
                    // Particles drift in from way out there slowly
                    const maxDist = Math.sqrt(width * width + height * height);
                    const falloffForce = 1 - (dist / maxDist);

                    // Super slow pull from anywhere on screen
                    this.vx += (dx / dist) * EXTENDED_PULL_STRENGTH * falloffForce;
                    this.vy += (dy / dist) * EXTENDED_PULL_STRENGTH * falloffForce;

                    this.frictionGlow *= 0.92;
                }

                // Physics application
                this.x += this.vx;
                this.y += this.vy;

                // Friction / Damping
                this.vx *= 0.95;
                this.vy *= 0.95;

                // Background jitter (frozen static feel)
                this.vx += (Math.random() - 0.5) * 0.04;
                this.vy += (Math.random() - 0.5) * 0.04;

                this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

                // Screen wrap
                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
                if (this.y < -20) this.y = height + 20;
                if (this.y > height + 20) this.y = -20;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
                ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

                // Only render shadow for strong glows (GPU optimization)
                if (this.frictionGlow > 0.5) {
                    ctx.shadowBlur = 6 * this.frictionGlow;
                    ctx.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                // Sharp shard geometry
                ctx.beginPath();
                ctx.moveTo(0, -this.size * 2.5);
                ctx.lineTo(this.size, 0);
                ctx.lineTo(0, this.size * 2.5);
                ctx.lineTo(-this.size, 0);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }
        }

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            // Calculate magnetic radius based on actual screen size (30% of smaller dimension)
            MAGNETIC_RADIUS = Math.min(width, height) * 0.30;

            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const render = () => {
            // Create slight motion blur effect
            ctx.fillStyle = 'rgba(10, 10, 12, 0.25)';
            ctx.fillRect(0, 0, width, height);

            // Reset counter for this frame
            particlesInVortex = 0;

            particles.forEach(p => {
                p.update();
                p.draw();

                // Count particles inside the core vortex
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAGNETIC_RADIUS) {
                    particlesInVortex++;
                }
            });

            // Easter egg detection - unlock ship when all particles are captured!
            if (particlesInVortex === PARTICLE_COUNT && mouse.x !== -1000 && !achievementTriggered) {
                achievementTriggered = true;
                if (onParticleAchievement) {
                    onParticleAchievement();
                }
                console.log('🎉 INTERCEPTOR UNLOCKED: All particles captured!');
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        init();
        render();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'auto' }}
        />
    );
};

export default AsmrBackground;

/* 
  ASMR Background Easter Egg:
  - 550 particles scattered across the full screen
  - Inner circle (30% of screen): Strong vortex attraction - particles swirl around
  - Outer zone (full screen): Very slow attraction - particles drift in from edges
  - Easter egg: Get all 550 particles inside the portal by sitting in the center and waiting!
*/
