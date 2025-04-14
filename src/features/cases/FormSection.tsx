import React from "react";
import { FormField } from "@/components/ui/form/FormField";
import type { FormValues } from "@/types/forms";
import type { UseFormRegister, FieldErrors, UseFormSetValue, RegisterOptions } from "react-hook-form";
import { FormSectionConfig } from "./formFields";
import { phoneRegex } from "@/utils/validations";
import { cn } from "@/utils/cn";

interface FormSectionProps {
    title: string;
    subtitle: string;
    formSections: FormSectionConfig[];
    formData: FormValues;
    onInputChange: (id: string, value: string) => void;
    className?: string;
    register?: UseFormRegister<FormValues>;
    errors?: FieldErrors<FormValues>;
    setValue?: UseFormSetValue<FormValues>;
}

export const FormSection: React.FC<FormSectionProps> = ({
    title,
    subtitle,
    formSections,
    formData,
    onInputChange,
    className = "",
    register,
    errors,
    setValue,
}) => {
    const getColSpanClass = (span: number): string => {
        const spanMap: { [key: number]: string } = {
            1: "col-span-1",
            2: "col-span-2",
            3: "col-span-3",
            4: "col-span-4",
            5: "col-span-5",
            6: "col-span-6",
            7: "col-span-7",
            8: "col-span-8",
            9: "col-span-9",
            10: "col-span-10",
            11: "col-span-11",
            12: "col-span-12",
        };
        return spanMap[span] || "col-span-12";
    };

    const handleFieldChange = (
        id: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        onInputChange(id, e.target.value);
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{subtitle}</p>
            <div
                className={`border border-[#DEE2E6] rounded-2xl p-6 max-sm:p-4 ${className}`}
            >
                <div className="space-y-6">
                    {formSections.map((section) => (
                        <div
                            key={section.sectionId}
                            className="grid grid-cols-12 gap-4"
                        >
                            {section.fields.map((field) => {
                                const getValidationRules =
                                    (): RegisterOptions => {
                                        const rules: RegisterOptions = {
                                            required: field.required
                                                ? "Required field"
                                                : false,
                                        };

                                        if (
                                            field.id === "phoneNumber" ||
                                            field.type === "tel"
                                        ) {
                                            rules.pattern = {
                                                value: phoneRegex,
                                                message:
                                                    "Phone number must be in format (XXX) XXX-XXXX",
                                            };
                                        }

                                        if (field.type === "email") {
                                            rules.pattern = {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Invalid email address",
                                            };
                                        }

                                        return rules;
                                    };

                                const fieldRegister = register?.(
                                    field.id,
                                    getValidationRules()
                                );

                                return (
                                    <FormField
                                        key={field.id}
                                        id={field.id}
                                        label={field.label}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className={cn(
                                            getColSpanClass(field.colSpan),
                                            "max-sm:col-span-12",
                                            (field.id === "aptSuite" ||
                                                field.id === "zipCode" ||
                                                field.id === "quantity") &&
                                                "max-sm:col-span-3",
                                            (field.id === "state" ||
                                                field.id === "address" ||
                                                field.id === "purchaseDate") &&
                                                "max-sm:col-span-9"
                                        )}
                                        required={field.required}
                                        value={formData[field.id] || ""}
                                        onChange={(e) =>
                                            handleFieldChange(field.id, e)
                                        }
                                        register={fieldRegister}
                                        error={
                                            errors && errors[field.id]
                                                ? String(
                                                      errors[field.id]?.message
                                                  )
                                                : undefined
                                        }
                                        setValue={
                                            setValue
                                                ? (name, value) =>
                                                      setValue(name, value)
                                                : undefined
                                        }
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
