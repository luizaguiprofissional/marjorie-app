import StepContainer from '../components/StepContainer';
import ProgressBar from '../components/ProgressBar';
import CharacterImage from '../components/CharacterImage';
import { ASSETS } from '../assets';
import { playClickSound } from '../utils/audio';
import type { StepProps } from '../types';

/**
 * Step 3 — Revelation: "Marjorie, eu sou apaixonado por você."
 */
export default function StepRevelation({ onNext, onBack, isVisible }: StepProps) {
    return (
        <StepContainer isVisible={isVisible} showAmbientLight bubbleCount={25}>
            {/* Progress */}
            <section className="w-full absolute top-12 left-0 px-6 z-30">
                <ProgressBar current={2} total={5} />
            </section>

            {/* Core Revelation */}
            <section className="w-full flex flex-col items-center justify-center relative z-30 mt-8">
                {/* Glowing Text */}
                <div className="text-center w-full max-w-[320px] mb-8">
                    <h1
                        className="text-white text-[16px] leading-[1.8] pixel-text-shadow-glow"
                        style={{ animation: 'float 6s ease-in-out infinite' }}
                    >
                        "Marjorie, eu sou apaixonado por você."
                    </h1>
                </div>

                {/* Shy Isaac */}
                <CharacterImage
                    src={ASSETS.isaacShy.src}
                    alt={ASSETS.isaacShy.alt}
                    size="2xl"
                />
            </section>

            {/* Actions */}
            <section className="w-full mt-4 mb-24 relative z-30 flex flex-col gap-4">
                <button
                    className="pixel-btn"
                    onClick={() => {
                        playClickSound();
                        onNext();
                    }}
                >
                    CONTINUAR ♥
                </button>
                {onBack && (
                    <button
                        className="pixel-btn-secondary"
                        onClick={() => {
                            playClickSound();
                            onBack();
                        }}
                    >
                        ← VOLTAR
                    </button>
                )}
            </section>
        </StepContainer>
    );
}
