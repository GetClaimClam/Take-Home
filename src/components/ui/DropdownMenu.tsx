import React, { ReactNode, useRef, useEffect } from "react";

interface DropdownMenuProps {
    isOpen: boolean;
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right";
    width?: string;
    className?: string;
    menuClassName?: string;
    onClose?: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    isOpen,
    trigger,
    children,
    align = "left",
    width = "w-full",
    className = "",
    menuClassName = "",
    onClose,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                isOpen &&
                onClose
            ) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {trigger}

            {isOpen && (
                <div
                    className={`absolute ${
                        align === "right" ? "right-0" : "left-0"
                    } mt-2 ${width} bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 ${menuClassName}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};
