import React, { useState, useEffect, useCallback } from "react";
import { ErrorIcon } from "@/components/ui/icons/ErrorIcon";
import { validatePaymentDetails } from "@/utils/validations";

export interface RadioOption {
    id: string;
    label: string;
    value: string;
}

interface RadioFormSectionProps {
    title: string;
    subtitle: string;
    options: RadioOption[];
    selectedValue: string;
    onSelectionChange: (value: string) => void;
    paymentDetails?: string;
    onPaymentDetailsChange?: (value: string) => void;
    className?: string;
    error?: string;
    onValidationChange?: (isValid: boolean) => void;
}

export const RadioFormSection: React.FC<RadioFormSectionProps> = ({
    title,
    subtitle,
    options,
    selectedValue,
    onSelectionChange,
    paymentDetails = "",
    onPaymentDetailsChange = () => {},
    className = "",
    error,
    onValidationChange = () => {},
}) => {
    const [inputError, setInputError] = useState<string | null>(null);
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        onValidationChange(inputError === null && selectedValue !== "");
    }, [inputError, onValidationChange, selectedValue]);

    const getPaymentInputLabel = (option: string) => {
        switch (option) {
            case "zelle":
                return "Zelle Phone Number or Email Address";
            case "venmo":
                return "Venmo Username";
            case "ach":
                return "Bank Account Information";
            case "amazon":
                return "Amazon Email";
            case "physical-check":
                return "Mailing Address";
            case "virtual-mastercard":
                return "Email for Virtual Card";
            default:
                return "Payment Details";
        }
    };

    const getPaymentInputPlaceholder = (option: string) => {
        switch (option) {
            case "zelle":
                return "johndoe@example.com";
            case "venmo":
                return "@johndoe";
            case "ach":
                return "Account & routing number";
            case "amazon":
                return "amazon@example.com";
            case "physical-check":
                return "Confirm mailing address";
            case "virtual-mastercard":
                return "email@example.com";
            default:
                return "Enter payment details";
        }
    };

    const validateInput = useCallback(
        (value: string) => {
            const validation = validatePaymentDetails(selectedValue, value);
            setInputError(validation.isValid ? null : validation.error);
            return validation;
        },
        [selectedValue]
    );

    const handleInputChange = (value: string) => {
        setIsTouched(true);
        onPaymentDetailsChange(value);
        validateInput(value);
    };

    const handleBlur = () => {
        setIsTouched(true);
        validateInput(paymentDetails);
    };

    useEffect(() => {
        if (isTouched) {
            validateInput(paymentDetails);
        }
    }, [selectedValue, paymentDetails, isTouched, validateInput]);

    const showNoSelectionError = !selectedValue && error;
    const showInputError = inputError && isTouched;

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{subtitle}</p>

            <div
                className={`border border-[#CDD0D4]  rounded-2xl p-6 ${className}`}
            >
                {options.map((option) => (
                    <div key={option.id} className="mb-4 last:mb-0">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name={`radio-group-${title
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`}
                                value={option.value}
                                id={`payment-method-${option.id}`}
                                checked={selectedValue === option.value}
                                onChange={() => onSelectionChange(option.value)}
                                className={`appearance-none w-5 h-5 border ${
                                    showNoSelectionError
                                        ? "border-[1.5px] border-[#EB0023]"
                                        : "border-[#CDD0D4]"
                                } rounded-full mr-3 relative checked:border-[#4075FF] before:content-[''] before:absolute before:w-3 before:h-3 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:bg-[#4075FF] checked:before:scale-100 before:transition-transform cursor-pointer focus:outline-none`}
                            />
                            <span className="text-base">{option.label}</span>
                        </label>

                        {selectedValue === option.value && (
                            <div className="mt-4 ml-8">
                                <label className="block text-sm text-gray-600 mb-1">
                                    {getPaymentInputLabel(option.value)}
                                </label>
                                <input
                                    type="text"
                                    value={paymentDetails}
                                    onChange={(e) =>
                                        handleInputChange(e.target.value)
                                    }
                                    onBlur={handleBlur}
                                    id={`payment-details-${option.value}`}
                                    placeholder={getPaymentInputPlaceholder(
                                        option.value
                                    )}
                                    className={`w-full px-3 py-2 border ${
                                        showInputError
                                            ? "border-[#EB0023]"
                                            : "border-[#CDD0D4]"
                                    } rounded-lg focus:outline-none focus:border-blue-500`}
                                />
                                {showInputError && (
                                    <div className="flex items-center mt-2">
                                        <ErrorIcon className="mr-1 flex-shrink-0" />
                                        <p className="text-sm text-[#EB0023]">
                                            {inputError}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {showNoSelectionError && (
                    <div className="flex items-center mt-4">
                        <ErrorIcon className="mr-1 flex-shrink-0" />
                        <p className="text-sm text-[#EB0023]">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
