import { useCallback, useRef, useState, useEffect } from 'react';
import GIF from 'gif.js';
import StepContainer from '../components/StepContainer';
import ConfettiCanvas from '../components/ConfettiCanvas';
import { ASSETS } from '../assets';
import { playClickSound } from '../utils/audio';
import type { StepProps } from '../types';

// GIF settings — ultra high quality
const SCALE = 3;            // 3x resolution (1125px wide)
const GIF_W = 375 * SCALE;
const GIF_H = 667 * SCALE;
const GIF_FRAMES = 45;      // More frames for a longer, more "GIF-like" loop
const GIF_FRAME_DELAY = 60; // Faster frame rate (~16fps)
const GIF_QUALITY = 1;      // Highest color accuracy

/** Pre-loads an image. */
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Draws the full achievement screen at high resolution.
 */
function drawFrame(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    s: number,
    trophyImg: HTMLImageElement,
    coupleImg: HTMLImageElement,
    confettiCanvas: HTMLCanvasElement | null,
    frameIdx: number,
) {
    ctx.clearRect(0, 0, w, h);

    // ── Background ──
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#001b44');
    grad.addColorStop(1, '#003366');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // ── Confetti ──
    if (confettiCanvas) {
        // Draw the confetti canvas stretched to high-res
        ctx.drawImage(confettiCanvas, 0, 0, w, h);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    // ── Titles ──
    ctx.save();
    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX = 3 * s;
    ctx.shadowOffsetY = 3 * s;
    ctx.shadowBlur = 0;

    ctx.font = `${18 * s}px "Press Start 2P", cursive`;
    ctx.fillStyle = '#00ffff';
    ctx.fillText('CONQUISTA', w / 2, 45 * s);

    ctx.font = `${22 * s}px "Press Start 2P", cursive`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('DESBLOQUEADA!', w / 2, 75 * s);
    ctx.restore();

    // ── Trophy ──
    const trophySize = 180 * s;
    const trophyX = (w - trophySize) / 2;
    const trophyY = 120 * s;

    ctx.save();
    ctx.shadowColor = 'rgba(255,215,0,0.4)';
    ctx.shadowBlur = 40 * s;
    ctx.drawImage(trophyImg, trophyX, trophyY, trophySize, trophySize);
    ctx.restore();

    // ── Achievement box ──
    const boxW = 310 * s;
    const boxH = 80 * s;
    const boxX = (w - boxW) / 2;
    const boxY = trophyY + trophySize + 20 * s;

    // Pixel border
    const bw = 5 * s;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boxX - bw, boxY - bw, boxW + bw * 2, boxH + bw * 2);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(boxX + bw, boxY + boxH, boxW, bw);
    ctx.fillRect(boxX + boxW, boxY + bw, bw, boxH);

    // Box fill
    ctx.fillStyle = '#002244';
    ctx.fillRect(boxX, boxY, boxW, boxH);

    // Box text
    ctx.save();
    ctx.font = `${12 * s}px "Press Start 2P", cursive`;
    ctx.fillStyle = '#00ffff';
    ctx.shadowColor = '#000';
    ctx.shadowOffsetX = 2 * s;
    ctx.shadowOffsetY = 2 * s;
    ctx.fillText('Você foi promovida a:', w / 2, boxY + 18 * s);
    ctx.fillText('Namorada do Isaquinho!', w / 2, boxY + 48 * s);
    ctx.restore();

    // ── Mascots ──
    const coupleW = 220 * s;
    const coupleH = 160 * s;
    // Slower, smoother float
    const floatOffset = Math.sin((frameIdx / GIF_FRAMES) * Math.PI * 2) * 10 * s;
    const coupleX = (w - coupleW) / 2;
    const coupleY = boxY + boxH + 35 * s + floatOffset;

    // Maintain pixel art crispness
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(coupleImg, coupleX, coupleY, coupleW, coupleH);
    ctx.imageSmoothingEnabled = true;
}

export default function StepAchievement({ onNext, isVisible }: StepProps) {
    const confettiRef = useRef<HTMLCanvasElement | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                confettiRef.current = document.querySelector('.confetti-canvas') as HTMLCanvasElement | null;
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const handleShare = useCallback(async () => {
        if (isRecording) return;
        setIsRecording(true);
        setProgress(0);

        try {
            const [trophyImg, coupleImg] = await Promise.all([
                loadImage(ASSETS.trophy.src),
                loadImage(ASSETS.coupleMascots.src),
            ]);

            const gif = new GIF({
                workers: 4,      // More workers for 3x scale
                quality: GIF_QUALITY,
                workerScript: '/gif.worker.js',
                width: GIF_W,
                height: GIF_H,
                repeat: 0,       // infinite loop
                dither: true     // improved quality on gradients
            });

            const offscreen = document.createElement('canvas');
            offscreen.width = GIF_W;
            offscreen.height = GIF_H;
            const ctx = offscreen.getContext('2d')!;

            const confettiCanvas = confettiRef.current;

            // Capture frames
            for (let i = 0; i < GIF_FRAMES; i++) {
                drawFrame(ctx, GIF_W, GIF_H, SCALE, trophyImg, coupleImg, confettiCanvas, i);
                gif.addFrame(ctx, { delay: GIF_FRAME_DELAY, copy: true });
                setProgress(Math.round(((i + 1) / GIF_FRAMES) * 60));
                await new Promise((r) => setTimeout(r, GIF_FRAME_DELAY / 2));
            }

            setProgress(65);

            // Render
            const blob = await new Promise<Blob>((resolve, reject) => {
                gif.on('progress', (p) => setProgress(Math.round(65 + p * 30)));
                gif.on('finished', (b) => resolve(b));
                gif.on('error', (e) => reject(e));
                gif.render();
            });

            setProgress(96);

            const fileName = `conquista-${Date.now()}.gif`;
            const file = new File([blob], fileName, { type: 'image/gif' });

            // ── Native Share first ──
            if (navigator.share && navigator.canShare) {
                const shareData = {
                    files: [file],
                    title: 'Pedido Aceito! 💖',
                    text: 'Agora sou Namorada do Isaquinho! 🥰🎮',
                };
                if (navigator.canShare(shareData)) {
                    try {
                        await navigator.share(shareData);
                    } catch (e) {
                        console.log('Share dismissed', e);
                    }
                }
            }

            // ── Download fallback/always ──
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.setAttribute('type', 'image/gif');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => URL.revokeObjectURL(url), 10000);
            setProgress(100);

            // Flash
            const flash = document.createElement('div');
            Object.assign(flash.style, {
                position: 'fixed', top: '0', left: '0', w: '100vw', h: '100vh',
                backgroundColor: 'white', zIndex: '999', opacity: '1',
                transition: 'opacity 0.6s ease-out', pointerEvents: 'none'
            });
            document.body.appendChild(flash);
            setTimeout(() => { flash.style.opacity = '0'; setTimeout(() => flash.remove(), 600); }, 50);

        } catch (err) {
            console.error('GIF capture failed:', err);
            alert('Ops! Ocorreu um erro ao gerar o GIF. Tente novamente.');
        } finally {
            setTimeout(() => { setIsRecording(false); setProgress(0); }, 1000);
        }
    }, [isRecording]);

    return (
        <StepContainer isVisible={isVisible} showAmbientLight bubbleCount={0}>
            <ConfettiCanvas />

            <section className="w-full flex flex-col items-center z-30 shrink-0">
                <h2 className="text-[var(--color-accent)] text-[16px] sm:text-[18px] text-center pixel-text-shadow-glow mb-2 leading-relaxed">
                    CONQUISTA
                </h2>
                <h1 className="text-white text-[20px] sm:text-[24px] text-center pixel-text-shadow leading-relaxed">
                    DESBLOQUEADA!
                </h1>
            </section>

            <div className="flex-1 w-full flex flex-col justify-center items-center gap-4 sm:gap-6 z-30 my-2 min-h-0">
                <section className="w-full flex flex-col items-center justify-center relative shrink-0">
                    <div className="medal-container w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] mb-4 flex items-center justify-center">
                        <img
                            src={ASSETS.trophy.src}
                            alt={ASSETS.trophy.alt}
                            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                        />
                    </div>
                    <div className="pixel-border bg-[var(--color-bg-card)]/80 py-5 px-6 w-full max-w-[330px] sm:max-w-[350px] text-center backdrop-blur-sm">
                        <p className="text-[var(--color-accent)] text-[11px] sm:text-[14px] leading-[2] pixel-text-shadow">
                            Você foi promovida a:<br />Namorada do Isaquinho!
                        </p>
                    </div>
                </section>

                <section className="w-full flex justify-center items-end relative shrink-0">
                    <div
                        className="w-[220px] h-[160px] sm:w-[280px] sm:h-[200px] relative"
                        style={{ animation: 'float 4s ease-in-out infinite' }}
                    >
                        <img
                            src={ASSETS.coupleMascots.src}
                            alt={ASSETS.coupleMascots.alt}
                            className="w-full h-full object-contain mascots-pixelated"
                        />
                    </div>
                </section>
            </div>

            <section className="w-full relative z-40 shrink-0">
                <div className="flex flex-col w-full px-2 gap-3">
                    <button
                        className="pixel-btn"
                        onClick={() => {
                            playClickSound();
                            handleShare();
                        }}
                        disabled={isRecording}
                        style={isRecording ? { opacity: 0.85, cursor: 'wait' } : undefined}
                    >
                        {isRecording
                            ? `⏳ PROCESSANDO... ${progress}%`
                            : '📷 SALVAR/COMPARTILHAR'}
                    </button>
                    <button
                        className="pixel-btn-secondary"
                        onClick={() => {
                            playClickSound();
                            onNext();
                        }}
                        disabled={isRecording}
                    >
                        🔄 REVER
                    </button>
                </div>
            </section>

            {isRecording && (
                <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-[#002244] p-8 pixel-border max-w-[300px] w-full text-center">
                        <p className="text-white text-[12px] mb-4">✨ CRIANDO SEU GIF ✨</p>
                        <p className="text-[var(--color-accent)] text-[10px] mb-6">Capturando em alta resolução para ficar perfeito!</p>

                        <div className="h-6 bg-black p-1 pixel-border mb-2">
                            <div
                                className="h-full bg-[var(--color-accent)] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-white text-[10px]">{progress}%</p>
                    </div>
                </div>
            )}
        </StepContainer>
    );
}
