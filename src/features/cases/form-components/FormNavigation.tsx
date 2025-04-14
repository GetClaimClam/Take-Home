"use client";

import React from "react";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

interface FormNavigationProps {
    currentStep: number;
    isLastCase: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
    isSubmitting: boolean;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
    currentStep,
    isLastCase,
    canGoBack,
    canGoForward,
    isSubmitting,
    onBack,
    onNext,
    onSubmit,
}) => {
    const isLastStep = currentStep === 3; // Review step

    return (
        <div className="w-full flex justify-between mt-8">
            <SecondaryButton
                onClick={onBack}
                disabled={!canGoBack || isSubmitting}
                className={`${
                    !canGoBack ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                Back
            </SecondaryButton>

            <PrimaryButton
                onClick={isLastStep ? onSubmit : onNext}
                disabled={!canGoForward || isSubmitting}
                className={`${
                    !canGoForward ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isSubmitting ? (
                    <div className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing
                    </div>
                ) : isLastStep ? (
                    isLastCase ? (
                        "Submit All Claims"
                    ) : (
                        "Submit and Continue"
                    )
                ) : (
                    "Continue"
                )}
            </PrimaryButton>
        </div>
    );
};
