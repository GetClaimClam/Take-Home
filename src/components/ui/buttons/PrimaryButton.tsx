import React from "react";
import { cn } from "@/utils/cn";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export const PrimaryButton: React.FC<BaseButtonProps> = ({
    className,
    disabled,
    fullWidth = true,
    ...props
}) => {
    const primaryClassName = cn(
        // Primary specific styles
        "bg-main-blue-600 hover:bg-main-blue-400 text-white font-extrabold",
        // Size variants
        fullWidth
            ? "w-[319px] h-[50px] rounded-3xl py-3 px-12"
            : "w-auto min-w-[130px] h-[38px] rounded-xl text-[16px] tracking-[0.4px] px-4",
        // Disabled state
        disabled &&
            "bg-gray-300 text-blue-gray-500 cursor-not-allowed hover:bg-gray-300",
        className
    );

    return (
        <BaseButton
            className={primaryClassName}
            disabled={disabled}
            fullWidth={fullWidth}
            {...props}
        />
    );
};
