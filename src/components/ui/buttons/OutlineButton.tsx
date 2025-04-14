import React from "react";
import { cn } from "@/utils/cn";
import { BaseButton, BaseButtonProps } from "./BaseButton";

export const OutlineButton: React.FC<BaseButtonProps> = ({
    className,
    disabled,
    fullWidth = true,
    ...props
}) => {
    const outlineClassName = cn(
        "border border-main-blue-600 text-main-blue-600 hover:bg-main-blue-50/10",
        "rounded-full text-base font-semibold",
        fullWidth ? "w-full py-3 px-8 h-[56px]" : "h-[44px] px-6",
        disabled && "border-gray-300 text-gray-300",
        className
    );

    return (
        <BaseButton
            className={outlineClassName}
            disabled={disabled}
            fullWidth={fullWidth}
            {...props}
        />
    );
};
