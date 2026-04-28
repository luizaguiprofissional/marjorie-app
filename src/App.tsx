import { useState, useCallback } from 'react';
import type { StepId } from './types';

import StepIntro from './steps/StepIntro';
import StepMessage from './steps/StepMessage';
import StepRevelation from './steps/StepRevelation';
import StepProposal from './steps/StepProposal';
import StepAchievement from './steps/StepAchievement';

const STEP_ORDER: StepId[] = ['intro', 'message', 'revelation', 'proposal', 'achievement'];

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepId>('intro');

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const idx = STEP_ORDER.indexOf(prev);
      if (idx < STEP_ORDER.length - 1) {
        return STEP_ORDER[idx + 1];
      }
      // If on last step (achievement), restart
      return STEP_ORDER[0];
    });
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      const idx = STEP_ORDER.indexOf(prev);
      if (idx > 0) {
        return STEP_ORDER[idx - 1];
      }
      return prev;
    });
  }, []);

  return (
    <div className="w-full h-screen h-[100dvh] overflow-hidden relative flex items-center justify-center">
      <StepIntro
        onNext={goNext}
        isVisible={currentStep === 'intro'}
      />
      <StepMessage
        onNext={goNext}
        onBack={goBack}
        isVisible={currentStep === 'message'}
      />
      <StepRevelation
        onNext={goNext}
        onBack={goBack}
        isVisible={currentStep === 'revelation'}
      />
      <StepProposal
        onNext={goNext}
        isVisible={currentStep === 'proposal'}
      />
      <StepAchievement
        onNext={goNext}
        isVisible={currentStep === 'achievement'}
      />
    </div>
  );
}
