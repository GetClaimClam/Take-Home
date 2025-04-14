import React from "react";
import { cn } from "@/utils/cn";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export const SecondaryButton: React.FC<BaseButtonProps> = ({
    className,
    disabled,
    fullWidth = true,
    ...props
}) => {
    const secondaryClassName = cn(
        // Secondary specific styles
        "bg-blue-gray-100 hover:bg-gray-200 text-blue-gray-500 font-extrabold",
        // Size variants
        fullWidth
            ? "w-[319px] h-[50px] rounded-3xl py-3 px-12"
            : "w-[130px] h-[38px] rounded-xl text-[16px] tracking-[0.4px]",
        // Disabled state
        disabled && "bg-gray-300 text-blue-gray-500",
        className
    );

    return (
        <BaseButton
            className={secondaryClassName}
            disabled={disabled}
            fullWidth={fullWidth}
            {...props}
        />
    );
};
