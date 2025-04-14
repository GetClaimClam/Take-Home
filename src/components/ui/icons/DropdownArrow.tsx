import React from "react";

interface DropdownArrowProps {
    isOpen?: boolean;
    className?: string;
}

export const DropdownArrow: React.FC<DropdownArrowProps> = ({
    isOpen = false,
    className = "",
}) => {
    return (
        <svg
            className={`w-5 h-5 transform transition-transform ${
                isOpen ? "rotate-180" : ""
            } ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={isOpen ? "var(--blue-gray-900)" : "#8F919C"}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
};
