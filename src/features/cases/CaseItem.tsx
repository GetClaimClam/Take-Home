"use client";

import type React from "react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Case } from "@/types/case";
import { useCounterStore } from "@/store/useCounterStore";
import { captureEvent } from "@/utils/posthog";
import { Modal } from "@/components/ui/Modal";
import { PremiumCaseItemIcon } from "./PremiumCaseItemIcon";
import { cn } from "@/utils/cn";

type CaseItemProps = Omit<Case, "id" | "close_date"> & {
    id: number;
    close_date: Date;
    is_premium?: boolean;
};

export const CaseItem: React.FC<CaseItemProps> = ({
    id,
    name,
    close_date,
    proof_needed,
    description,
    payout_amount,
    is_premium,
}) => {
    const toggleCase = useCounterStore((state) => state.toggleCase);
    const selectedCases = useCounterStore((state) => state.selectedCases);
    const isSelected = selectedCases.includes(id);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        audioRef.current = new Audio("/button-pressed.mp3");
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        document.body.style.overflow = "";

        captureEvent("case_details_closed", {
            case_id: id,
            case_name: name,
        });
    }, [id, name]);

    const daysLeft = Math.max(
        0,
        Math.floor(
            (close_date.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
        )
    );

    const formattedDate = close_date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const performToggle = () => {
        if (!isSelected && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.log("Could not play audio:", err);
            });
        }
        toggleCase(id, payout_amount);

        captureEvent("case_toggled", {
            case_id: id,
            case_name: name,
            payout_amount,
            was_selected: !isSelected,
        });
    };

    const handleContainerClick = (e: React.MouseEvent) => {
        if (
            checkboxRef.current &&
            !checkboxRef.current.contains(e.target as Node)
        ) {
            performToggle();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            performToggle();
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return `${text.slice(0, maxLength)}...`;
    };

    const handleMoreClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";

        captureEvent("case_details_opened", {
            case_id: id,
            case_name: name,
        });
    };

    const descriptionThreshold = 80;

    const isTruncated = description.length > descriptionThreshold;
    const truncatedDescription = isTruncated
        ? truncateText(description, descriptionThreshold)
        : description;

    const getDaysLeftStyles = (days: number): string => {
        if (days === 1) {
            return "bg-[#FBE7E7] text-[#D92D20]";
        }
        if (days > 1 && days < 5) {
            return "bg-[#FFF0C3] text-[#DC6803]";
        }
        return "bg-[#B8ECC0] text-[#008315]";
    };

    return (
        <div
            className={cn(
                "w-full md:w-[384px] h-[184px] rounded-2xl p-4 text-xs cursor-pointer flex flex-col relative text-left border",
                is_premium
                    ? "bg-[#F5F8FF] border-[#D9E6FF] hover:border-[#BCD4FF]"
                    : "bg-white border-transparent hover:border-[#E0E2E5]",
                isSelected && "border-[#8EB9FF] hover:border-[#8EB9FF]"
            )}
            onClick={handleContainerClick}
            id={`case-item-${id}`}
            style={{
                boxShadow:
                    "2px 2px 8px 2px rgba(232, 232, 232, 0.15), 2px 4px 12px 0px rgba(192, 193, 206, 0.1)",
            }}
        >
            <div className="flex gap-3 flex-grow justify-between ">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex-shrink-0">
                            <Image
                                src="/icons/case.svg"
                                alt=""
                                width={32}
                                height={32}
                                className="rounded-full border border-[#E0E2E5]"
                            />
                        </div>
                        <div className="font-semibold text-lg md:text-xl">
                            {name}
                        </div>
                    </div>

                    <div className="flex gap-2 mb-1">
                        <div>
                            <span
                                className={cn(
                                    "text-sm",
                                    is_premium
                                        ? "text-blue-gray-900"
                                        : "text-[#54565B]"
                                )}
                            >
                                {truncatedDescription}
                            </span>
                            {isTruncated && (
                                <button
                                    type="button"
                                    className={cn(
                                        "text-xs px-1 py-0 underline cursor-pointer",
                                        is_premium
                                            ? "text-blue-gray-900"
                                            : "text-[#54565B]"
                                    )}
                                    onClick={handleMoreClick}
                                >
                                    More
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        {is_premium && (
                            <div className="flex items-center gap-1">
                                <PremiumCaseItemIcon />
                                <span
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #2F80ED 0%, #8A70D6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                    className="text-xs font-semibold"
                                >
                                    Premium case
                                </span>
                            </div>
                        )}
                        {!proof_needed && (
                            <>
                                <div>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx="8"
                                            cy="8"
                                            r="7.4"
                                            stroke={
                                                proof_needed
                                                    ? "#000000"
                                                    : "#FF4A4A"
                                            }
                                            strokeWidth="1.2"
                                        />
                                        <path
                                            d="M12 9.33333L9.33333 11.9982L4.44533 12C4.32777 12.0005 4.21483 11.9543 4.13133 11.8715C4.04782 11.7887 4.00059 11.6762 4 11.5587V4.44133C4 4.19778 4.19778 4 4.44133 4H11.5587C11.8022 4 12 4.20267 12 4.44533V9.33333ZM11.1111 4.88889H4.88889V11.1111H8.44444V8.88889C8.44446 8.78003 8.48442 8.67496 8.55676 8.59361C8.6291 8.51226 8.72878 8.46029 8.83689 8.44755L8.88889 8.44444L11.1111 8.444V4.88889ZM10.7427 9.33289L9.33333 9.33333V10.7418L10.7427 9.33289Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M2.5 2.25L13.5 13.25"
                                            stroke="#FF4A4A"
                                            strokeWidth="1.2"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold">
                                    No proof needed
                                </span>
                            </>
                        )}
                    </div>

                    <div className="hidden">
                        <div className="flex items-center">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
                                    fill="#FF964A"
                                />
                                <path
                                    d="M8 4.5V8L11 11"
                                    stroke="white"
                                    strokeWidth="1.2"
                                />
                            </svg>
                            <div>{formattedDate}</div>
                        </div>
                    </div>
                </div>

                <div className="flex-none">
                    <div
                        className={cn(
                            "w-5 h-5 border rounded-[4px] flex items-center justify-center relative group",
                            isSelected
                                ? "border-[#4075FF]"
                                : "bg-white border-[#CDD0D4]"
                        )}
                        style={{
                            background: isSelected
                                ? "rgba(51, 121, 255, 0.1)"
                                : "white",
                        }}
                    >
                        <input
                            ref={checkboxRef}
                            type="checkbox"
                            checked={isSelected}
                            onChange={performToggle}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        {isSelected && (
                            <svg
                                width="12"
                                height="9"
                                viewBox="0 0 12 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 4L4.5 7.5L11 1"
                                    stroke="#4075FF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <div
                        className={cn(
                            "text-xs font-bold px-3 py-1.5 rounded-full inline-block",
                            getDaysLeftStyles(daysLeft)
                        )}
                    >
                        <span>{String(daysLeft).toUpperCase()}</span> DAY
                        <span>{daysLeft !== 1 && "S"}</span> LEFT
                    </div>
                </div>

                <div>
                    <div className="font-semibold">
                        <span className="text-sm align-super pr-1">Up to</span>
                        <span className="text-xl text-blue-500">
                            ${payout_amount}
                        </span>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={name}
                content={description}
                id={id}
            />
        </div>
    );
};
