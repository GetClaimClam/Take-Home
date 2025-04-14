"use client";

import React from "react";
import { FormSection } from "../FormSection";
import { productInfoFields } from "../formFields";
import type { FormValues } from "@/types/forms";
import type { Case } from "@/types/case";
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

interface ProductInfoStepProps {
  currentCase: Case;
  formData: FormValues;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  onInputChange: (id: keyof FormValues, value: string) => void;
}

export const ProductInfoStep: React.FC<ProductInfoStepProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentCase,
  formData,
  register,
  errors,
  setValue,
  onInputChange,
}) => {
  return (
    <FormSection
      title="Purchased Products Information"
      subtitle="Add details about purchased products"
      formSections={productInfoFields}
      formData={formData}
      onInputChange={onInputChange}
      register={register}
      errors={errors}
      setValue={setValue}
      className="mb-8"
    />
  );
};
