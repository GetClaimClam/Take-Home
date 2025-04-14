"use client";

import React from "react";
import { FormSection } from "../FormSection";
import { personalInfoFields } from "../formFields";
import type { FormValues } from "@/types/forms";
import type { Case } from "@/types/case";
import type { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

interface PersonalInfoStepProps {
  currentCase: Case;
  formData: FormValues;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  onInputChange: (id: keyof FormValues, value: string) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
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
      title="Personal Information"
      subtitle="Add your personal details"
      formSections={personalInfoFields}
      formData={formData}
      onInputChange={onInputChange}
      register={register}
      errors={errors}
      setValue={setValue}
      className="mb-8"
    />
  );
};
