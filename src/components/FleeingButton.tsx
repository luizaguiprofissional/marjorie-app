import { useRef, useCallback, type TouchEvent, type MouseEvent } from 'react';

/**
 * A button that runs away from the user's cursor/touch.
 * Uses viewport-based safe margins to never cause scroll or overflow.
 */
export default function FleeingButton() {
    const btnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const moveButton = useCallback(() => {
        const btn = btnRef.current;
        const container = containerRef.current;
        if (!btn || !container) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        // Safe margins from edges (px)
        const MARGIN = 10;

        // Calculate available space within the container
        const maxX = containerRect.width - btnRect.width - MARGIN;
        const maxY = containerRect.height - btnRect.height - MARGIN;

        // Generate random position within safe bounds
        const randomX = Math.random() * Math.max(0, maxX) + MARGIN;
        const randomY = Math.random() * Math.max(0, maxY) + MARGIN;

        btn.style.position = 'absolute';
        btn.style.left = `${randomX}px`;
        btn.style.top = `${randomY}px`;
        btn.style.transform = 'none';
    }, []);

    const handleMouseEnter = useCallback(
        (_e: MouseEvent<HTMLButtonElement>) => {
            moveButton();
        },
        [moveButton]
    );

    const handleTouchStart = useCallback(
        (e: TouchEvent<HTMLButtonElement>) => {
            e.preventDefault(); // Prevent accidental clicks & scroll
            moveButton();
        },
        [moveButton]
    );

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: '180px', touchAction: 'none' }}
        >
            <button
                ref={btnRef}
                className="pixel-btn-nao absolute left-0 top-0"
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleTouchStart}
                style={{ width: 'auto', minWidth: '100px' }}
            >
                NÃO
            </button>
        </div>
    );
}
