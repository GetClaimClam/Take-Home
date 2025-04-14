"use client";
import faqData from "@/data/faq.json";
import Image from "next/image";
import React, { useState } from "react";

export const FAQSection: React.FC = () => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const toggleItem = (sectionIndex: number, itemIndex: number) => {
        const key = `${sectionIndex}-${itemIndex}`;
        setOpenItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="content py-[32px] md:py-[64px] flex flex-col gap-[64px] md:gap-[80px] ">
            {faqData.map((faq, sectionIndex) => (
                <div
                    key={sectionIndex}
                    className="flex flex-col lg:flex-row gap-[48px] lg:gap-[20px] justify-between px-0 md:px-[48px]"
                >
                    <div className="flex flex-col gap-[16px] lg:max-w-[420px]">
                        <h3 className="text-[32px] sm:text-[48px] font-semibold leading-[1.08]">
                            {faq.title}
                        </h3>
                        <p className="text-blue-gray-500">{faq.description}</p>
                    </div>
                    <div className="flex flex-col gap-[32px] lg:max-w-[752px] w-full flex-1">
                        {faq.items.map((item, itemIndex) => {
                            const key = `${sectionIndex}-${itemIndex}`;
                            const isOpen = openItems[key];

                            return (
                                <div
                                    key={itemIndex}
                                    onClick={() =>
                                        toggleItem(sectionIndex, itemIndex)
                                    }
                                    className="flex flex-col"
                                >
                                    <div className="flex  gap-[8px] sm:gap-[12px] w-full justify-between items-center">
                                        <div className="text-blue-gray-900 text-[22px] cursor-pointer">
                                            {item.title}
                                        </div>
                                        <div className="text-main-blue-600 w-[32px] h-[32px] flex-shrink-0 relative cursor-pointer">
                                            <Image
                                                src="/icons/plus.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                aria-hidden="true"
                                                className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "opacity-0 -rotate-90"
                                                        : "opacity-100 rotate-0"
                                                }`}
                                            />
                                            <Image
                                                src="/icons/minus.svg"
                                                alt=""
                                                width={32}
                                                height={32}
                                                aria-hidden="true"
                                                className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "opacity-100 rotate-0"
                                                        : "opacity-0 rotate-90"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={`text-blue-gray-500 text-[16px] leading-[1.5] md:max-w-[662px] overflow-hidden transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "max-h-[500px] opacity-100 mt-2"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {item.description}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
