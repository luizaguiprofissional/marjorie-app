import type { ReactNode } from 'react';

interface PixelWindowProps {
    title: string;
    children: ReactNode;
    className?: string;
    floating?: boolean;
}

/**
 * Pixel-art styled "window" card with chrome title bar.
 */
export default function PixelWindow({
    title,
    children,
    className = '',
    floating = false,
}: PixelWindowProps) {
    return (
        <div
            className={`bg-[var(--color-bg-card)] pixel-border p-5 relative w-full max-w-[340px] ${floating ? 'float-anim' : ''
                } ${className}`}
            style={floating ? { animationName: 'float', animationDuration: '4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '0.5s' } : undefined}
        >
            {/* Window Chrome */}
            <div className="window-chrome">
                <span className="text-[8px] text-white">{title}</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-white" />
                </div>
            </div>

            <div className="text-center">{children}</div>

            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] border-t-white" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[var(--color-bg-card)]" />
        </div>
    );
}
