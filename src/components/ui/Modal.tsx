"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    id?: number;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    content,
    id,
}) => {
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (backdropRef.current === e.target) {
            e.stopPropagation();
            onClose();
        }
    };

    const handleDialogKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    const dialogVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 0.25,
                ease: "easeIn",
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                when: "beforeChildren",
            },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const modalContent = (
        <AnimatePresence
            onExitComplete={() => {
                document.body.style.overflow = "";
            }}
        >
            {isOpen && (
                <>
                    <motion.div
                        ref={backdropRef}
                        className="fixed inset-0 bg-black/70 z-50 cursor-auto"
                        onClick={handleBackdropClick}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={backdropVariants}
                    />

                    <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none sm:pt-[15vh] pt-[10vh]">
                        <motion.div
                            className="pointer-events-auto max-w-[500px] p-6 rounded-lg shadow-lg w-[90%] max-h-[75vh] overflow-y-auto bg-white cursor-auto relative mt-10"
                            aria-modal="true"
                            aria-labelledby={
                                id ? `case-description-${id}` : "modal-title"
                            }
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={dialogVariants}
                            onKeyDown={handleDialogKeyDown}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 right-0 p-2">
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-800 z-10 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100 transition-colors"
                                    onClick={onClose}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            onClose();
                                        }
                                    }}
                                    aria-label="Close modal"
                                >
                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <title>Close</title>
                                        <path
                                            d="M18 6L6 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6 6L18 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <h3
                                id={
                                    id
                                        ? `case-description-${id}`
                                        : "modal-title"
                                }
                                className="text-xl font-semibold mb-4 text-left text-typography-black"
                            >
                                {title}
                            </h3>
                            <p className="text-base mb-4 text-[#54565B]">
                                {content}
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    if (!isMounted) return null;

    return createPortal(modalContent, document.body);
};
