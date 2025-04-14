"use client";

import React from "react";
import { CustomCheckbox } from "@/components/ui/CustomCheckbox";
import { ErrorIcon } from "@/components/ui/icons/ErrorIcon";

interface ConsentSectionProps {
  hasConsent: boolean;
  consentError: string | null;
  updateConsent: (value: boolean) => void;
}

export const ConsentSection: React.FC<ConsentSectionProps> = ({
  hasConsent,
  consentError,
  updateConsent,
}) => {
  return (
    <div className="w-full mt-8">
      <div className="flex items-start gap-3">
        <CustomCheckbox
          value={hasConsent}
          setValue={updateConsent}
          ariaLabel="Consent to terms and conditions"
          error={consentError || undefined}
          id="consent-checkbox"
        />
        <div>
          <label
            className="text-sm text-gray-600 cursor-pointer"
          >
            By checking this box, I confirm that all information provided is
            accurate to the best of my knowledge. I understand that submitting
            false information may result in the denial of my claim and potential
            legal consequences.
          </label>
          {consentError && (
            <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
              <ErrorIcon />
              <span>{consentError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
