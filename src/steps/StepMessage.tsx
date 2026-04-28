import StepContainer from '../components/StepContainer';
import ProgressBar from '../components/ProgressBar';
import PixelWindow from '../components/PixelWindow';
import CharacterImage from '../components/CharacterImage';
import { ASSETS } from '../assets';
import { playClickSound } from '../utils/audio';
import type { StepProps } from '../types';

/**
 * Step 2 — Isaac's message: "Tenho algo pra te contar..."
 */
export default function StepMessage({ onNext, onBack, isVisible }: StepProps) {
    return (
        <StepContainer isVisible={isVisible} bubbleCount={15}>
            {/* Progress */}
            <section className="w-full absolute top-12 left-0 px-6 z-30">
                <ProgressBar current={1} total={5} />
            </section>

            {/* Dialogue + Character */}
            <section className="w-full flex flex-col items-center justify-center relative my-4 z-30">
                <PixelWindow title="MENSAGEM.TXT" floating>
                    <p className="text-white text-[12px] leading-relaxed pixel-text-shadow">
                        "Tenho algo pra te contar..."
                    </p>
                </PixelWindow>

                <div className="mt-8">
                    <CharacterImage
                        src={ASSETS.isaacNervous.src}
                        alt={ASSETS.isaacNervous.alt}
                        size="2xl"
                    />
                </div>
            </section>

            {/* Actions */}
            <section className="w-full mb-24 relative z-30 flex flex-col gap-4">
                <button
                    className="pixel-btn"
                    onClick={() => {
                        playClickSound();
                        onNext();
                    }}
                >
                    PRÓXIMO →
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
