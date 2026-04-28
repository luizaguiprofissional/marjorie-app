import { useRef, useEffect } from 'react';

const COLORS = ['#00ffff', '#004b87', '#008b8b', '#ffffff', '#ffb6c1'];

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
}

/**
 * Canvas-based pixel-style square confetti animation.
 */
export default function ConfettiCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = Math.min(window.innerWidth, 375);
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        // Create particles
        const particles: Particle[] = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y > canvas.height) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);

                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);

                ctx.restore();
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="confetti-canvas" />;
}
