import React from "react";

interface CustomCheckboxProps {
    value: boolean;
    setValue: (value: boolean) => void;
    ariaLabel?: string;
    error?: string;
    id?: string;
    label?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    value,
    setValue,
    ariaLabel,
    error,
    id,
    label,
}) => (
    <div className="flex items-start">
        <div
            className={`w-5 h-5 border ${
                error
                    ? "border-[1.5px] border-[#EB0023]"
                    : value
                    ? "border-[#4075FF]"
                    : "border-[#CDD0D4]"
            } rounded-[4px] flex items-center justify-center relative group mt-0.5 mr-3`}
            style={{
                background: value ? "rgba(51, 121, 255, 0.1)" : "white",
            }}
        >
            <input
                type="checkbox"
                id={id}
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                aria-label={ariaLabel}
            />
            {value && (
                <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M1 4L4.5 7.5L11 1"
                        stroke="#4075FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
        {label && (
            <label htmlFor={id} className="text-sm text-gray-700">
                {label}
            </label>
        )}
        {error && <div className="text-[#EB0023] text-xs mt-1">{error}</div>}
    </div>
);
