import { ReactNode } from "react";

interface TooltipProps {
    children: ReactNode;
    text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <div className="relative group flex-none cursor-pointer">
            {children}
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[145px]">
                <div className="flex flex-col items-center">
                    <div className="w-3 h-3 -mb-1.5 rotate-45 bg-[#0F172A] relative z-10" />
                    <div className="bg-[#0F172A] text-white text-xs font-semibold p-1 rounded-lg shadow-lg whitespace-normal text-center relative z-20 w-[145px] h-[52px] flex items-center justify-center">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};
