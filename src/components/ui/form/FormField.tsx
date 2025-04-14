import React, { useRef, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { ErrorIcon } from "@/components/ui/icons/ErrorIcon";
import { validatePhone } from "@/utils/validations";
import { formatPhoneNumber } from "@/utils/formatters";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
    register?: UseFormRegisterReturn;
    setValue?: (name: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type = "text",
    placeholder = "",
    className = "",
    value = "",
    onChange,
    required = false,
    error,
    register,
    setValue,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const isPhoneField = id === "phoneNumber" || type === "tel";

    useEffect(() => {
        if (
            inputRef.current &&
            setValue &&
            value !== inputRef.current.value &&
            inputRef.current.value.trim() !== ""
        ) {
            setValue(id, inputRef.current.value);
        }
    }, [id, value, setValue]);

    const validatePhoneNumber = (value: string) => {
        if (!isPhoneField) return null;
        const result = validatePhone(value);
        return result.isValid ? null : result.error || null;
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isPhoneField) return;

        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;

        setPhoneError(null);

        if (onChange) {
            onChange(e);
        }

        if (setValue) {
            setValue(id, formattedValue);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (isPhoneField) {
            const validationError = validatePhoneNumber(e.target.value);
            setPhoneError(validationError);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isPhoneField) {
            handlePhoneInput(e);
        } else {
            if (onChange) {
                onChange(e);
            }
            if (setValue) {
                setValue(id, e.target.value);
            }
        }
    };

    const createPhoneFieldHandlers = (
        registerProps: UseFormRegisterReturn
    ) => ({
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handlePhoneInput(e);
            registerProps.onChange?.(e);
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            registerProps.onBlur?.(e);
            handleBlur(e);
        },
    });

    const createStandardFieldHandlers = (
        registerProps: UseFormRegisterReturn
    ) => ({
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            registerProps.onChange?.(e);
            setValue?.(id, e.target.value);
            onChange?.(e);
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            registerProps.onBlur?.(e);
            if (isPhoneField) {
                handleBlur(e);
            }
        },
    });

    const getInputProps = () => {
        if (!register) {
            return {
                value,
                onChange: handleInput,
                onBlur: handleBlur,
            };
        }

        const registerProps = { ...register };
        const handlers = isPhoneField
            ? createPhoneFieldHandlers(registerProps)
            : createStandardFieldHandlers(registerProps);

        return {
            ...registerProps,
            ...handlers,
        };
    };

    const inputProps = getInputProps();

    const displayError = error || phoneError;

    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="block mb-2 font-medium text-xs sm:text-sm"
            >
                {label}
            </label>
            <input
                ref={inputRef}
                type={type}
                id={id}
                className={`w-full p-3 border rounded-lg ${
                    displayError
                        ? "border-2 border-[rgba(235,0,35,1)]"
                        : "border border-gray-300"
                }`}
                maxLength={isPhoneField ? 20 : undefined}
                placeholder={placeholder}
                required={required}
                aria-invalid={displayError ? "true" : "false"}
                {...inputProps}
            />
            {displayError && (
                <div className="flex items-center mt-1">
                    <ErrorIcon className="mr-1 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-[#EB0023]">
                        {displayError}
                    </p>
                </div>
            )}
        </div>
    );
};
