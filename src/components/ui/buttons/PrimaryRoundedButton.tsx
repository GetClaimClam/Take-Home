import React from "react";
import { cn } from "@/utils/cn";
import { PrimaryButton } from "./PrimaryButton";
import type { BaseButtonProps } from "./BaseButton";

export const PrimaryRoundedButton: React.FC<BaseButtonProps> = ({
    className,
    disabled,
    fullWidth = false,
    svg: SvgIcon,
    children,
    ...props
}) => {
    const roundedClassName = cn(
        "rounded-full text-base font-medium group",
        "py-2.5 px-6",
        fullWidth ? "w-full h-[56px]" : "w-auto h-[44px]",
        disabled &&
            "bg-gray-300 text-blue-gray-500 cursor-not-allowed hover:bg-gray-300",
        className
    );

    return (
        <PrimaryButton
            className={roundedClassName}
            disabled={disabled}
            fullWidth={fullWidth}
            {...props}
        >
            {children}
            {SvgIcon && (
                <span className="transition-transform duration-100 ease-out group-hover:translate-x-1">
                    <SvgIcon />
                </span>
            )}
        </PrimaryButton>
    );
};
