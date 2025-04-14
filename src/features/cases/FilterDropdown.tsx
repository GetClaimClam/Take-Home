"use client";

import React, { useState } from "react";
import { DropdownArrow } from "@/components/ui/icons/DropdownArrow";
import { DropdownMenu } from "@/components/ui/DropdownMenu";

export interface FilterOption {
    id: string;
    label: string;
}

interface FilterDropdownProps {
    options: FilterOption[];
    onFilterChange?: (selectedOption: FilterOption | null) => void;
    className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    onFilterChange,
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<FilterOption | null>(
        null
    );

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleOptionClick = (option: FilterOption) => {
        if (selectedOption && selectedOption.id === option.id) {
            setSelectedOption(null);
            onFilterChange?.(null);
        } else if (option.id === "none") {
            setSelectedOption(null);
            onFilterChange?.(null);
        } else {
            setSelectedOption(option);
            onFilterChange?.(option);
        }
        setIsOpen(false);
    };

    return (
        <DropdownMenu
            isOpen={isOpen}
            className={className}
            onClose={closeDropdown}
            trigger={
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center justify-between w-[190px] h-[44px] px-4 py-2 text-sm bg-white border border-[#CDD0D4] rounded-md cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span>
                        {selectedOption ? selectedOption.label : "Filter by"}
                    </span>
                    <DropdownArrow isOpen={isOpen} className="ml-2" />
                </button>
            }
        >
            <ul
                className="py-1 overflow-auto text-sm"
                role="listbox"
                aria-labelledby="filter-button"
            >
                {options.map((option) => (
                    <li
                        key={option.id}
                        onClick={() => handleOptionClick(option)}
                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                            selectedOption?.id === option.id
                                ? "bg-gray-100"
                                : ""
                        }`}
                        role="option"
                        aria-selected={selectedOption?.id === option.id}
                    >
                        <span className="block truncate">{option.label}</span>
                        {selectedOption?.id === option.id && (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg
                                    className="h-5 w-5 text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </DropdownMenu>
    );
};
