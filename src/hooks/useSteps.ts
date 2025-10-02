import { useState } from "react";

interface IUseStepsProps<T> {
  initialStep: T;
  stepOrder: T[];
}

export function useSteps<T>({ initialStep, stepOrder }: IUseStepsProps<T>) {
  const [step, setStep] = useState<T>(initialStep);

  const nextStep = () => {
    const currentIndex = stepOrder.indexOf(step);
    const next = stepOrder[currentIndex + 1];

    if (next) setStep(next);
  };

  const previousStep = () => {
    const currentIndex = stepOrder.indexOf(step);
    const previous = stepOrder[currentIndex - 1];

    if (previous) setStep(previous);
  };

  return { step, nextStep, previousStep };
}
