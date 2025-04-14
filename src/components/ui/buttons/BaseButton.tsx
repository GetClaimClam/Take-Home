import React from "react";
import { cn } from "@/utils/cn";

export interface BaseButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    fullWidth?: boolean;
    svg?: () => React.ReactNode;
    className?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
    children,
    className = "",
    disabled = false,
    type = "button",
    fullWidth = true,
    svg: SvgIcon,
    ...props
}) => {
    const baseClassName = cn(
        // Base styles
        "flex items-center justify-center gap-[10px] transition-colors",
        // Width variants
        fullWidth ? "w-full" : "w-auto",
        // Disabled state
        disabled && "cursor-not-allowed",
        className
    );

    return (
        <button
            type={type}
            disabled={disabled}
            className={baseClassName}
            {...props}
        >
            {SvgIcon && SvgIcon()}
            {children}
        </button>
    );
};
