interface ProgressBarProps {
    current: number;
    total: number;
}

/**
 * Pixel-style step progress indicator (dot-based).
 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
    return (
        <div className="w-full flex justify-between items-center z-30">
            <div className="text-white text-[10px] pixel-text-shadow">
                PASSO {current}/{total}
            </div>
            <div className="flex gap-1">
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 border ${i < current
                                ? 'bg-[var(--color-accent)] border-white'
                                : 'bg-[var(--color-accent-blue)] border-[var(--color-bg-card)]'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
