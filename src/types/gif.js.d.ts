declare module 'gif.js' {
    interface GIFOptions {
        workers?: number;
        quality?: number;
        workerScript?: string;
        width?: number;
        height?: number;
        repeat?: number;
        transparent?: number | null | undefined;
        background?: string;
        dither?: boolean | string;
    }

    interface FrameOptions {
        delay?: number;
        copy?: boolean;
        dispose?: number;
    }

    class GIF {
        constructor(options?: GIFOptions);
        addFrame(
            element: HTMLCanvasElement | HTMLImageElement | CanvasRenderingContext2D | ImageData,
            options?: FrameOptions
        ): void;
        on(event: 'finished', callback: (blob: Blob) => void): void;
        on(event: 'progress', callback: (progress: number) => void): void;
        on(event: 'error', callback: (error: Error) => void): void;
        render(): void;
        abort(): void;
        running: boolean;
    }

    export default GIF;
}
