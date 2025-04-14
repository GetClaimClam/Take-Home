"use client";

import React from "react";

interface FormProgressProps {
  currentStep: number;
  goToStep: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  goToStep,
  canNavigateToStep,
}) => {
  const steps = ["Personal Info", "Product Info", "Payment", "Review"];

  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;
          const canNavigate = canNavigateToStep(index);

          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isCompleted
                      ? "bg-green-100 text-green-700 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => canNavigate && goToStep(index)}
                  disabled={!canNavigate}
                >
                  {isCompleted ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7L6 10L11 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                <span
                  className={`text-xs mt-1 ${
                    isActive
                      ? "text-blue-600 font-medium"
                      : isCompleted
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${
                    isCompleted && currentStep > index
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
