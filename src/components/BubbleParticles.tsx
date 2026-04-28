import { useEffect, useRef } from 'react';

interface BubbleParticlesProps {
    count?: number;
}

/**
 * Generates random floating bubble particles in the background.
 */
export default function BubbleParticles({ count = 20 }: BubbleParticlesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear any existing bubbles
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const size = Math.random() * 10 + 4;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 3;
            const delay = Math.random() * 8;

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animation = `bubbleUp ${duration}s ease-in-out ${delay}s infinite`;

            container.appendChild(bubble);
        }

        return () => {
            container.innerHTML = '';
        };
    }, [count]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden z-[5]"
            aria-hidden="true"
        />
    );
}
