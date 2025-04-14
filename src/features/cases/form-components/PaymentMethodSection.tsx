"use client";

import React from "react";
import { RadioFormSection, type RadioOption } from "../RadioFormSection";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  paymentDetails: string;
  paymentMethodError?: string | null;
  paymentMethodOptions: Array<{
    id: string;
    label: string;
    description?: string;
    detailsRequired?: boolean;
    detailsLabel?: string;
    detailsPlaceholder?: string;
  }>;
  updatePaymentMethod: (method: string) => void;
  updatePaymentDetails: (details: string) => void;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  paymentMethod,
  paymentDetails,
  paymentMethodError,
  paymentMethodOptions,
  updatePaymentMethod,
  updatePaymentDetails,
}) => {
  // Map our payment options to match the RadioOption type expected by RadioFormSection
  const radioOptions: RadioOption[] = paymentMethodOptions.map(option => ({
    id: option.id,
    label: option.label,
    value: option.id, // Use id as the value
  }));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Payment Method</h2>
      <p className="text-gray-500 mb-6">
        Choose how you would like to receive compensation.
      </p>

      <RadioFormSection
        title="Payment Method"
        subtitle="Select your preferred payment method"
        options={radioOptions}
        selectedValue={paymentMethod}
        onSelectionChange={updatePaymentMethod}
        error={paymentMethodError || undefined}
      />

      {paymentMethod && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            {paymentMethod === "paypal"
              ? "PayPal Email"
              : paymentMethod === "venmo"
              ? "Venmo Username"
              : paymentMethod === "check"
              ? "Mailing Address"
              : "Payment Details"}
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-[100px]"
            value={paymentDetails}
            onChange={(e) => updatePaymentDetails(e.target.value)}
            placeholder={
              paymentMethod === "paypal"
                ? "Enter your PayPal email address"
                : paymentMethod === "venmo"
                ? "Enter your Venmo username"
                : paymentMethod === "check"
                ? "Enter your full mailing address"
                : "Enter payment details"
            }
          />
        </div>
      )}
    </div>
  );
};
