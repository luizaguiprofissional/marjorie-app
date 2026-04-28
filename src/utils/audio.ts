/**
 * Audio utility to play interactive sound effects.
 */

const CLICK_SOUND_PATH = '/click.mp3';
const SUCCESS_SOUND_PATH = '/success.mp3';

/**
 * Plays a cute click/pop sound effect.
 */
export const playClickSound = () => {
    try {
        const audio = new Audio(CLICK_SOUND_PATH);
        audio.volume = 0.4;
        audio.play().catch(err => console.warn('Audio blocked:', err));
    } catch (e) {
        console.error('Error playing sound:', e);
    }
};

/**
 * Plays a triumphant success/conquest sound effect.
 */
export const playSuccessSound = () => {
    try {
        const audio = new Audio(SUCCESS_SOUND_PATH);
        audio.volume = 0.5;
        audio.play().catch(err => console.warn('Audio blocked:', err));
    } catch (e) {
        console.error('Error playing success sound:', e);
    }
};
