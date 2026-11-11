import React from "react";
import { Check } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { TRACKING_STEPS } from "../constants/trackingSteps.constants";

interface TrackingStatusStepperProps {
  currentStep: number;
}

export const TrackingStatusStepper: React.FC<TrackingStatusStepperProps> = ({
  currentStep,
}) => {
  const { locale } = useI18n();

  if (currentStep <= 0) return null;

  return (
    <div className="py-2">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-line -translate-y-1/2 z-0" />
        {TRACKING_STEPS.map((step) => {
          const isPassed = currentStep >= step.num;
          const isCurrent = currentStep === step.num;
          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? "bg-secondary text-primary ring-4 ring-secondary/20 shadow-sm"
                    : isPassed
                    ? "bg-ok text-white"
                    : "bg-surface-container border border-line text-mute"
                }`}
              >
                {isPassed && !isCurrent ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <span
                className={`text-[11px] mt-2 font-mono text-center hidden sm:block ${
                  isCurrent
                    ? "font-bold text-secondary"
                    : isPassed
                    ? "text-ink"
                    : "text-mute"
                }`}
              >
                {locale === "ar" ? step.ar : step.en}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
