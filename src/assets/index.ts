import type { CharacterAsset } from '../types';

/**
 * Centralized asset map.
 *
 * HOW TO REPLACE WITH LOCAL FILES:
 * 1. Drop your .png or .gif into  public/assets/images/
 * 2. Change the `src` below to '/assets/images/your-file.png'
 * 3. Done — Vite serves everything in `public/` at the root.
 */
export const ASSETS: Record<string, CharacterAsset> = {
    heart: {
        src: '/assets/images/minecraftheart.png',
        alt: 'Pixel art coração vermelho 8-bit',
    },
    isaacNervous: {
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d2888984db-e166ba35dfd4f74aecb4.png',
        alt: 'Pixel art chibi Isaac nervoso mas feliz',
    },
    isaacShy: {
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/47ae6883a6-8714a733d27aa7cc8c08.png',
        alt: 'Pixel art chibi Isaac envergonhado',
    },
    isaacProposal: {
        src: '/assets/images/cats.png',
        alt: 'Pixel art gatinhos apaixonados',
    },
    trophy: {
        src: '/assets/images/medal.png',
        alt: 'Troféu dourado pixelado estilo Minecraft',
    },
    coupleMascots: {
        src: '/assets/images/couple.png',
        alt: 'Casal pixel art 8-bit se beijando',
    },
};
