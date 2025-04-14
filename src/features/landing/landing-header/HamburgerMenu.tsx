"use client";

import { PrimaryButton } from "@/components/ui/buttons";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                isOpen
            ) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <button
                className="lg:hidden flex items-center"
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
            >
                <div className="relative w-6 h-5 cursor-pointer">
                    <span
                        className={`absolute left-0 w-full h-[2px] bg-blue-gray-900 transition-all duration-300 ease-in-out ${
                            isOpen
                                ? "top-1/2 -translate-y-1/2 rotate-45"
                                : "top-0"
                        }`}
                    ></span>
                    <span
                        className={`absolute left-0 w-full h-[2px] bg-blue-gray-900 transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    ></span>
                    <span
                        className={`absolute left-0 w-full h-[2px] bg-blue-gray-900 transition-all duration-300 ease-in-out ${
                            isOpen
                                ? "bottom-1/2 translate-y-1/2 -rotate-45"
                                : "bottom-0"
                        }`}
                    ></span>
                </div>
            </button>
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 lg:hidden z-50"
                >
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="font-medium py-2 hover:text-gray-900"
                        >
                            <span>Home</span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="font-medium py-2 hover:text-gray-900"
                        >
                            <span>How it works</span>
                        </Link>
                        <Link
                            href="#partnership"
                            className="font-medium py-2 hover:text-gray-900"
                        >
                            <span>Partnership</span>
                        </Link>
                        <Link
                            href="/faq"
                            className="font-medium py-2 hover:text-gray-900"
                        >
                            <span>FAQ</span>
                        </Link>
                        <Link
                            href="#about"
                            className="font-medium py-2 hover:text-gray-900"
                        >
                            <span>About us</span>
                        </Link>
                        <Link href="/cases" className="pt-2">
                            <PrimaryButton fullWidth={true}>
                                Get Started
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};
