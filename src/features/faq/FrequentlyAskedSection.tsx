import React from "react";

export const FrequentlyAskedSection: React.FC = () => {
    return (
        <div className="content py-[20px]">
            <div className="p-[20px] flex flex-col gap-[16px] sm:gap-[32px] justify-center text-center md:text-left md:justify-start px-[20px] sm:px-[80px] py-[32px] sm:py-[48px] rounded-xl bg-main-blue-600 text-white">
                <h1 className="text-h1 font-medium leading-[1.2] lg:leading-[1.04]  ">
                    Frequently Asked Questions
                </h1>
                <p className="text-[18px] sm:text-[20px] leading-[1.44] sm:leading-[1.5] max-w-[716px]">
                    Got any questions? We&apos;ve got the answers. Find out how
                    Chariot Claims works, who can file a claim and how we can help
                    you get what you&apos;re owed.
                </p>
            </div>
        </div>
    );
};
