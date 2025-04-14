"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCounterStore } from "@/store/useCounterStore";

export const Counter: React.FC = () => {
    const { amount, isAnimating, animationAmount, endAnimation } =
        useCounterStore();

    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );
    const [isCounterVisible, setIsCounterVisible] = useState<boolean>(true);

    useEffect(() => {
        if (!isAnimating) {
            setIsCounterVisible(true);
        } else {
            setIsCounterVisible(false);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (isAnimating && animationAmount !== null) {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            animationTimeoutRef.current = setTimeout(() => {
                endAnimation();
                setIsCounterVisible(true);
            }, 400);
        }

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [isAnimating, animationAmount, endAnimation]);

    return (
        <>
            <span className="text-typography-black text-[10px] md:text-xs hidden md:inline">
                Potential earnings
            </span>

            <div className="relative h-8 flex items-center">
                <div className="flex justify-end md:min-w-[80px]">
                    <AnimatePresence mode="wait">
                        {isCounterVisible ? (
                            <motion.span
                                key="amount"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl font-medium ml-0.5 text-main-blue-500"
                            >
                                ${amount}
                            </motion.span>
                        ) : (
                            <span
                                className={`text-xl font-medium ml-0.5 opacity-0 ${
                                    amount > 0 ? "text-main-blue-500" : ""
                                }`}
                                aria-hidden="true"
                            >
                                ${amount}
                            </span>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {isAnimating && animationAmount !== null && (
                        <motion.span
                            key={`animation-${Date.now()}`}
                            className="text-2xl font-medium text-main-blue-500 absolute right-0 top-0"
                            initial={{
                                scale: 2.5,
                                x: 20,
                            }}
                            animate={{
                                scale: 1,
                                x: 0,
                            }}
                            style={{
                                transformOrigin: "right top",
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            onAnimationComplete={() => {
                                if (animationTimeoutRef.current) {
                                    clearTimeout(animationTimeoutRef.current);
                                }
                                endAnimation();
                                setIsCounterVisible(true);
                            }}
                        >
                            +${animationAmount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
