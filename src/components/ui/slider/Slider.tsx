"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { SliderIcon } from "../types";
import { SliderView } from "./SliderView";

interface SliderProps {
    autoplay?: boolean;
    interval?: number;
    icons: SliderIcon[];
    images: string[];
    mobileImages?: string[];
}

export const Slider: React.FC<SliderProps> = ({
    autoplay = true,
    interval = 5000,
    icons,
    images,
    mobileImages,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const handlePrevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    useEffect(() => {
        if (!autoplay) return;
        
        const timer = setInterval(() => {
            handleNextSlide();
        }, interval);
        
        return () => clearInterval(timer);
    }, [autoplay, handleNextSlide, interval]);

    return (
        <div className="w-full h-full">
            <SliderView
                currentSlide={currentSlide}
                images={images}
                mobileImages={mobileImages}
                icons={icons}
                onNextSlide={handleNextSlide}
                onPrevSlide={handlePrevSlide}
            />
        </div>
    );
};
