import { AvatarItem } from "./AvatarItem";
import { Avatar } from "./types";
import type React from "react";

interface AvatarListProps {
    avatars: Avatar[];
    className?: string;
}

export const AvatarList: React.FC<AvatarListProps> = ({
    avatars,
    className = "",
}) => {
    return (
        <div className={`flex items-center ${className}`}>
            {avatars.map((avatar, index) => (
                <AvatarItem
                    key={index}
                    src={avatar.src}
                    alt={avatar.alt}
                    currentIndex={index}
                />
            ))}
        </div>
    );
};
