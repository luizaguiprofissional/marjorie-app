import StepContainer from '../components/StepContainer';
import CharacterImage from '../components/CharacterImage';
import { ASSETS } from '../assets';
import { playClickSound } from '../utils/audio';
import type { StepProps } from '../types';

/**
 * Step 1 — Intro screen with pulsing heart and START button.
 */
export default function StepIntro({ onNext, isVisible }: StepProps) {
    return (
        <StepContainer isVisible={isVisible} bubbleCount={15}>
            {/* Title */}
            <section className="w-full text-center z-30">
                <h1 className="text-3xl text-white pixel-text-shadow leading-tight tracking-wider">
                    CORAÇÃO
                    <br />
                    <span className="text-[var(--color-pink)] text-2xl mt-4 block">
                        DO ISAAC
                    </span>
                </h1>
            </section>

            {/* Heart Character */}
            <section className="w-full flex items-center justify-center relative z-30">
                {/* Decorative stars/hearts */}
                <div
                    className="absolute top-0 right-4 text-white opacity-50"
                    style={{ animation: 'float 4s ease-in-out infinite 1s' }}
                >
                    ✦
                </div>
                <div
                    className="absolute bottom-10 left-4 text-[var(--color-pink)] opacity-50"
                    style={{ animation: 'float 4s ease-in-out infinite 2s' }}
                >
                    ♥
                </div>

                <CharacterImage
                    src={ASSETS.heart.src}
                    alt={ASSETS.heart.alt}
                    size="xl"
                />
            </section>

            {/* Start Button Panel */}
            <section className="w-full z-30 mb-24">
                <div className="bg-[var(--color-bg-card)] pixel-border p-6 relative">
                    {/* Window Chrome */}
                    <div className="window-chrome">
                        <span className="text-[8px] text-white">START.EXE</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-white" />
                            <div className="w-3 h-3 bg-white" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-white text-[10px] mb-6 leading-relaxed">
                            Pressione START para iniciar a jornada...
                        </p>
                        <button
                            className="pixel-btn"
                            onClick={() => {
                                playClickSound();
                                onNext();
                            }}
                        >
                            START ▶
                        </button>
                    </div>
                </div>
            </section>
        </StepContainer>
    );
}
