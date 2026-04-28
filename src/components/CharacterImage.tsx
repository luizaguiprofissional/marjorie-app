interface CharacterImageProps {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    withBorder?: boolean;
    className?: string;
}

const sizeMap = {
    sm: 'w-40 h-40',
    md: 'w-48 h-48',
    lg: 'w-56 h-56',
    xl: 'w-64 h-64',
    '2xl': 'w-72 h-72',
};

/**
 * Renders a character/mascot image with optional pixel border and float animation.
 */
export default function CharacterImage({
    src,
    alt,
    size = 'md',
    withBorder = false,
    className = '',
}: CharacterImageProps) {
    return (
        <div
            className={`${sizeMap[size]} relative z-30`}
            style={{ animation: 'float 4s ease-in-out infinite' }}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain ${withBorder ? 'pixel-border bg-[var(--color-bg-card)] p-2' : ''
                    } drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] ${className}`}
                loading="eager"
            />
        </div>
    );
}
