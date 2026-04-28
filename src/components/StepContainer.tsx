import { useRef, useCallback, type ReactNode } from 'react';
import BubbleParticles from './BubbleParticles';

interface StepContainerProps {
    children: ReactNode;
    isVisible: boolean;
    showAmbientLight?: boolean;
    bubbleCount?: number;
}

/**
 * Wraps each step with mobile container shell, wave BG, ambient light, and bubble particles.
 * Handles fade-in/out transition via CSS classes.
 */
export default function StepContainer({
    children,
    isVisible,
    showAmbientLight = false,
    bubbleCount = 20,
}: StepContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const getTransitionClass = useCallback(() => {
        return isVisible ? 'step-active' : 'step-exit';
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Ambient Light (optional) */}
            {showAmbientLight && <div className="ambient-light" aria-hidden="true" />}

            {/* Bubble Particles */}
            <BubbleParticles count={bubbleCount} />

            {/* Main Mobile Layout */}
            <main
                ref={containerRef}
                className={`mobile-container relative z-20 px-6 flex flex-col justify-center items-center gap-6 ${getTransitionClass()}`}
            >
                {children}

                {/* Wave Background */}
                <div className="wave-bg" />
            </main>
        </div>
    );
}
