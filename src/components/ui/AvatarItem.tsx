import { cn } from "@/utils/cn";
import Image from "next/image";
import type React from "react";
interface AvatarItemProps {
    src: string;
    alt: string;
    className?: string;
    currentIndex?: number;
}

export const AvatarItem: React.FC<AvatarItemProps> = ({
    src,
    alt,
    className = "",
    currentIndex,
}) => (
    <div
        className={cn(
            "relative w-[40px] h-[40px] rounded-full border-2 border-white overflow-hidden",
            currentIndex !== undefined && currentIndex > 0 && "ml-[-8px]",
            className
        )}
    >
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
    </div>
);
