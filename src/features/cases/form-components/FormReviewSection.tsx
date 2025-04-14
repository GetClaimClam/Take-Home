"use client";

import React from "react";
import type { FormValues } from "@/types/forms";
import type { Case } from "@/types/case";

interface FormReviewSectionProps {
  currentCase: Case | null;
  formData: FormValues;
  paymentMethod: string;
  paymentDetails: string;
}

export const FormReviewSection: React.FC<FormReviewSectionProps> = ({
  currentCase,
  formData,
  paymentMethod,
  paymentDetails,
}) => {
  if (!currentCase) return null;

  const renderSection = (title: string, fields: Record<string, string>) => (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="bg-gray-50 p-4 rounded-md">
        {Object.entries(fields).map(([key, value]) => (
          <div key={key} className="mb-2 last:mb-0">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-sm text-gray-600">{key}:</span>
              <span className="text-sm font-medium">{value || "Not provided"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Personal and Product info from formData
  const personalInfo: Record<string, string> = {};
  const productInfo: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (key.startsWith("personal_")) {
      // Convert key from personal_first_name to First Name
      const formattedKey = key
        .replace("personal_", "")
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      personalInfo[formattedKey] = value;
    } else if (key.startsWith("product_")) {
      // Convert key from product_purchase_date to Purchase Date
      const formattedKey = key
        .replace("product_", "")
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      productInfo[formattedKey] = value;
    }
  });

  // Payment info
  const paymentInfo: Record<string, string> = {
    "Payment Method": paymentMethod
      .charAt(0).toUpperCase() + paymentMethod.slice(1),
    "Payment Details": paymentDetails,
  };

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Review Your Claim</h2>
      <p className="text-gray-500 mb-6">
        Please review the information below before submitting your claim for{" "}
        <span className="font-medium">{currentCase.name}</span>.
      </p>

      {renderSection("Personal Information", personalInfo)}
      {renderSection("Product Information", productInfo)}
      {renderSection("Payment Information", paymentInfo)}
    </div>
  );
};
