import type React from "react";

interface ButtonArrowProps {
    fill?: string;
}

export const ButtonArrow: React.FC<ButtonArrowProps> = ({ fill = "white" }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.4768 6.16689L6.00683 1.69689L7.18516 0.518555L13.6668 7.00022L7.18516 13.4819L6.00683 12.3036L10.4768 7.83355H0.333496V6.16689H10.4768Z"
            fill={fill}
        />
    </svg>
);
