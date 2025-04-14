"use client";

import React from "react";
import { SignatureCanvas } from "@/components/ui/SignatureCanvas";
import { ErrorIcon } from "@/components/ui/icons/ErrorIcon";

interface SignatureSectionProps {
  signatureData: string;
  signatureError: string | null;
  updateSignature: (signature: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  signatureData,
  signatureError,
  updateSignature,
}) => {
  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-medium mb-2">Signature</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please sign below to confirm your claim submission
      </p>
      
      <SignatureCanvas
        initialValue={signatureData}
        onChange={updateSignature}
      />
      
      {signatureError && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
          <ErrorIcon />
          <span>{signatureError}</span>
        </div>
      )}
    </div>
  );
};
