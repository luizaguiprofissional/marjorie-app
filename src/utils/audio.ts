/**
 * Audio utility to play interactive sound effects.
 */

const CLICK_SOUND_PATH = '/click.mp3';

/**
 * Plays a cute click/pop sound effect.
 */
export const playClickSound = () => {
    try {
        const audio = new Audio(CLICK_SOUND_PATH);
        audio.volume = 0.4; // Lower volume for a 'cute' non-jarring feel
        audio.play().catch(err => {
            // Browsers often block audio until first user interaction
            console.warn('Audio playback delayed or blocked:', err);
        });
    } catch (e) {
        console.error('Error playing sound:', e);
    }
};
