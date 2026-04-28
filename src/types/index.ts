/** Unique identifier for each step in the proposal flow. */
export type StepId = 'intro' | 'message' | 'revelation' | 'proposal' | 'achievement';

/** Configuration for a single step. */
export interface StepConfig {
    id: StepId;
    title: string;
    stepNumber: number;
    totalSteps: number;
}

/** Centralized asset reference — swap src to use local files. */
export interface CharacterAsset {
    src: string;
    alt: string;
}

/** Props shared by all step components. */
export interface StepProps {
    onNext: () => void;
    onBack?: () => void;
    isVisible: boolean;
}

/** Pixel button visual variants. */
export type ButtonVariant = 'primary' | 'secondary' | 'sim' | 'nao';
