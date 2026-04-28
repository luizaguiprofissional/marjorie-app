import { useState, useCallback } from 'react';
import StepContainer from '../components/StepContainer';
import ProgressBar from '../components/ProgressBar';
import CharacterImage from '../components/CharacterImage';
import FleeingButton from '../components/FleeingButton';
import { ASSETS } from '../assets';
import { playSuccessSound } from '../utils/audio';
import type { StepProps } from '../types';

/**
 * Step 4 — The big question: "Quer namorar comigo?"
 * SIM → success overlay → next step.
 * NÃO → button flees.
 */
export default function StepProposal({ onNext, isVisible }: StepProps) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    const handleSim = useCallback(() => {
        setShowSuccess(true);

        // Generate celebration hearts
        const newHearts = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`,
            } as React.CSSProperties,
        }));
        setHearts(newHearts);

        // Navigate after a short moment
        setTimeout(() => {
            onNext();
        }, 2500);
    }, [onNext]);

    return (
        <>
            <StepContainer isVisible={isVisible} showAmbientLight bubbleCount={30}>
                {/* Progress */}
                <section className="w-full absolute top-4 left-0 px-6 z-30">
                    <ProgressBar current={3} total={5} />
                </section>

                {/* Proposal Content */}
                <section className="w-full flex flex-col items-center justify-center relative z-30 mb-8 mt-12">
                    {/* Isaac Character */}
                    <div style={{ animationDelay: '0.5s' }}>
                        <CharacterImage
                            src={ASSETS.isaacProposal.src}
                            alt={ASSETS.isaacProposal.alt}
                            size="2xl"
                        />
                    </div>

                    {/* The Big Question */}
                    <div className="text-center w-full max-w-[320px] z-40 mt-6">
                        <h1
                            className="text-white text-[24px] leading-[1.5] pixel-text-shadow-glow"
                            style={{ animation: 'float 4s ease-in-out infinite' }}
                        >
                            Quer namorar comigo?
                        </h1>
                    </div>
                </section>

                {/* Interactive Buttons */}
                <section className="w-full relative z-40 mt-4 mb-24">
                    <div className="flex flex-col gap-4 w-full">
                        <button
                            className="pixel-btn-sim"
                            onClick={() => {
                                playSuccessSound();
                                handleSim();
                            }}
                        >
                            SIM! <span className="ml-3 text-red-500">♥</span>
                        </button>

                        <FleeingButton />
                    </div>
                </section>
            </StepContainer>

            {/* Success Overlay */}
            {isVisible && (
                <div className={`success-overlay ${showSuccess ? 'active' : ''}`}>
                    <h2 className="text-[var(--color-accent)] text-[24px] text-center pixel-text-shadow-glow mb-8 px-4 leading-relaxed">
                        Conquista Desbloqueada: O Amor!
                    </h2>
                    <div
                        className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center p-2"
                        style={{ animation: 'float 4s ease-in-out infinite' }}
                    >
                        <img
                            src={ASSETS.heart.src}
                            alt="Heart"
                            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,182,193,0.6)]"
                        />
                    </div>
                    <p className="text-white text-[12px] mt-10 pixel-text-shadow text-center px-8">
                        Avançando para o próximo passo...
                    </p>

                    {/* Floating celebration hearts */}
                    {hearts.map((h) => (
                        <span
                            key={h.id}
                            className="pixel-heart-float"
                            style={h.style}
                        >
                            ♥
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}
