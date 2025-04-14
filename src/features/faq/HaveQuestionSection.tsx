import { PrimaryRoundedButton } from "@/components/ui/buttons";
import React from "react";

export const HaveQuestionSection: React.FC = () => {
    return (
        <div className="content py-[20px]">
            <div className="p-[20px] flex flex-col justify-between md:flex-row gap-[16px] sm:gap-[20px] text-center md:text-left  px-[20px] sm:px-[64px] py-[32px] sm:py-[48px] rounded-xl bg-gray-100">
                <h2 className="text-[32px] sm:text-[44px] md:text-[56px]  leading-[1.2] lg:leading-[1.14] text-blue-gray-900 max-w-[570px]">
                    Still have a question or need assistance?
                </h2>
                <div className="flex flex-col  gap-[32px] sm:flex-24p max-w-[532px] items-center md:items-start">
                    <p className=" leading-[1.44] sm:leading-[1.5] text-blue-gray-400 text-center md:text-left">
                        Our team is here to help! Reach out to us for more
                        information or personalized support.
                    </p>
                    <PrimaryRoundedButton
                        svg={() => (
                            <svg
                                className={`fill-current text-[#fff]`}
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path d="M10.4763 6.16689L6.00634 1.69689L7.18467 0.518555L13.6663 7.00022L7.18467 13.4819L6.00634 12.3036L10.4763 7.83355H0.333008V6.16689H10.4763Z" />
                            </svg>
                        )}
                        className="bg-main-blue-600 rounded-full gap-2  h-[48px] sm:h-[56px]  group w-full md:w-fit  px-[32px]  py-[12px] sm:py-[16px] leading-[1.5]"
                    >
                        <span className="font-medium">Get in Touch</span>
                    </PrimaryRoundedButton>
                </div>
            </div>
        </div>
    );
};
