import React from "react";
import Image from "next/image";
import { SliderIcon } from "../types";

// Define the SwipeableHandlers type
type SwipeableHandlers = {
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchMove?: (e: React.TouchEvent) => void;
    onTouchEnd?: (e: React.TouchEvent) => void;
};

interface SliderViewProps {
    currentSlide: number;
    images: string[];
    mobileImages?: string[];
    icons: SliderIcon[];
    onNextSlide: () => void;
    onPrevSlide: () => void;
    swipeHandlers?: SwipeableHandlers;
    onPause?: (isPaused: boolean) => void;
}

export const SliderView: React.FC<SliderViewProps> = ({
    currentSlide,
    images,
    mobileImages,
    icons,
    onNextSlide,
    onPrevSlide,
    swipeHandlers,
    onPause,
}) => {
    // Use mobile images if they are provided and on mobile, otherwise use desktop images
    const displayImages = mobileImages || images;

    if (icons.length === 0 || images.length === 0) {
        return (
            <div className="p-4 border rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                <p className="text-center">
                    <span className="block font-medium mb-1">
                        Unable to display slider
                    </span>
                    <span className="text-sm">
                        Missing required content (images or icons)
                    </span>
                </p>
            </div>
        );
    }
  

    return (
        <div
            className="relative w-full aspect-square md:aspect-[1.2/1] overflow-hidden rounded-xl max-w-6xl h-full"
            {...swipeHandlers}
            onMouseEnter={() => onPause && onPause(true)}
            onMouseLeave={() => onPause && onPause(false)}
            onFocus={() => onPause && onPause(true)}
            onBlur={() => onPause && onPause(false)}
        >
            {displayImages.map((src, index) => {
                const mobileSrc = mobileImages?.[index] || src;

                return (
                    <div
                        key={index}
                        className={`relative transition-opacity duration-500 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                            position: index === currentSlide ? "relative" : "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <Image
                            src={mobileSrc}
                            alt={`Slider Image ${index + 1}`}
                            width={1000}
                            height={600}
                            priority={index === currentSlide}
                            quality={90}
                            className="w-full h-auto"
                        />
                    </div>
                );
            })}

            <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                    onClick={onPrevSlide}
                    className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                    aria-label="Previous slide"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                
                <button
                    onClick={onNextSlide}
                    className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                    aria-label="Next slide"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M8 4L14 10L8 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-6 px-8">
                <div className="grid grid-cols-3 gap-4">
                    {icons.map((icon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-white rounded-full p-2 mb-2">
                                <Image src={icon.src} alt={icon.alt} width={24} height={24} />
                            </div>
                            <span className="text-white text-sm text-center">{icon.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {displayImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => index !== currentSlide && onNextSlide()}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
