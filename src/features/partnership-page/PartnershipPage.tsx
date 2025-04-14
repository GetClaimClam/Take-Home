"use client";

import { useState } from "react";
import Image from "next/image";
import { LandingHeader } from "@/features/landing/landing-header/LandingHeader";
import {
    PrimaryRoundedButton,
    OutlineButton,
} from "../../components/ui/buttons";

const seamlessSliderImages = [
    {
        src: "/images/partnership/s1_right_plaintiffs.png",
        alt: "Right Plaintiffs",
    },
    {
        src: "/images/partnership/s2_organize_evidence.png",
        alt: "Organize Evidence",
    },
    { src: "/images/partnership/s3_mass_payouts.png", alt: "Mass Payouts" },
];

const ecosystemCardsInfo = [
    {
        title: "Newman Ferrara LLP",
        desc: "New York-based law firm specializes in real estate, class actions, and civil rights litigation.",
    },
    {
        title: "Aylstock, Witkin, Kreis & Overholtz, PLLC",
        desc: "National law firm, headquartered in Pensacola, Florida, focuses on personal injury and pharmaceutical litigation.",
    },
    {
        title: "Mason LLP",
        desc: "Washington, D.C.-based firm specializes in civil litigation, focusing on cases involving corporate misconduct, data breaches, and environmental incidents.",
    },
    {
        title: "Coulson PC",
        desc: "Detroit-based firm specializes in class action and complex litigation, focusing on defending the rights of individuals against powerful interests.",
    },
    {
        title: "Mensch LLP",
        desc: "Washington, D.C.-based firm focuses on consumer litigation, advocating for individuals affected by negligence and corporate misconduct.",
    },
    {
        title: "NYU Law Entrepreneurship and Venture Capital Program",
        desc: "This NYU Law program supports entrepreneurship and venture capital initiatives.",
    },
];

const Badge: React.FC<{ label: string }> = ({ label }) => {
    return (
        <div className="py-2 px-4 text-blue-gray-900 border border-solid rounded-full border-blue-gray-900 flex justify-center items-center text-xs md:text-sm ">
            {label}
        </div>
    );
};

const SeamlessSliderItem: React.FC<{
    step: string;
    title: string;
    desc?: string;
    activeSlide: number;
    sliderHandler: (step: string) => void;
    renderMobileImg: () => React.ReactNode;
}> = ({ step, title, desc, activeSlide, sliderHandler, renderMobileImg }) => {
    const isActiveSlide = activeSlide === +step;

    const assigmentOpacityHelper = () => {
        if (!isActiveSlide) {
            if (+step - 1 === activeSlide || +step + 1 === activeSlide) {
                return "lg:opacity-60";
            } else if (+step - 2 === activeSlide || +step + 2 === activeSlide) {
                return "lg:opacity-40";
            }
        }

        return "";
    };

    return (
        <div
            onClick={() => sliderHandler(step)}
            className="pointer-events-none lg:pointer-events-auto lg:cursor-pointer"
        >
            <div className="ml-4 lg:ml-auto">
                <div className="relative">
                    <div
                        className={`font-medium flex items-center justify-center w-16 h-7 bg-main-blue-50 text-main-blue-700 rounded-2xl mb-3
                    ${assigmentOpacityHelper()}
                    `}
                    >
                        Step {step}
                    </div>

                    {isActiveSlide && (
                        <div className="hidden absolute top-[5px] left-[-74px] w-[18px] h-[18px] border-[3px] border-solid border-white rounded-full bg-main-blue-700 lg:block"></div>
                    )}
                </div>
                <div className="mb-4">
                    <h1
                        className={`text-blue-gray-900 text-[24px] leading-tight tracking-[0] text-start md:text-[36px]
                        transition-opacity
                    ${assigmentOpacityHelper()}
                    `}
                    >
                        {title}
                    </h1>
                </div>
                {isActiveSlide && (
                    <div className="mb-8 lg:mb-[87px]">
                        <span className="text-blue-gray-500 text-[16px] leading-[24px] tracking-[0px] text-start md:text-[18px] md:leading-[26px]">
                            {desc}
                        </span>
                    </div>
                )}
            </div>

            <div className="lg:hidden">{renderMobileImg()}</div>
        </div>
    );
};

export const PartnershipPage: React.FC = () => {
    const [activeSeamlessSlideStep, setActiveSeamlessSlideStep] = useState(1);

    const seamlessSliderHandler = (step: string) => {
        setActiveSeamlessSlideStep(+step);
    };

    return (
        <div className="bg-white">
            <LandingHeader />
            <div className="font-aeonik p-4 md:p-5 max-w-[1445px] my-0 mx-auto">
                <section
                    className="bg-gray-100 rounded-xl"
                    aria-label="A seamless process 
                    from lead to litigation"
                >
                    <div className="flex flex-col items-center py-8 px-5 md:py-16 md:px-12 md:pr-[35px]">
                        <div className="flex flex-col gap-8 md:flex-row md:gap-12 md:justify-between">
                            <div className="">
                                <h1 className="text-blue-gray-900 text-[40px] leading-tight tracking-[-0.5px] text-center md:text-[70px] md:leading-[76px] md:text-start">
                                    Seamless process from lead to litigation
                                </h1>
                            </div>

                            <div className="flex flex-col items-center gap-8 md:gap-8 md:items-start md:pt-[6px] md:max-w-[552px]">
                                <span className="text-blue-gray-500 text-[18px] leading-[26px] tracking-[0px] text-center md:text-[20px] md:leading-[30px] md:text-start">
                                    We connect consumers with top plaintiff law
                                    firms and manage everything from lead
                                    generation to mass payouts and evidence
                                    collection.
                                </span>
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
                                    className="bg-main-blue-600 rounded-full p-0 h-12 gap-2 w-full max-w-[318px] md:w-[217px] md:h-14 group"
                                >
                                    <span className="font-medium">
                                        Join Our Network
                                    </span>
                                </PrimaryRoundedButton>
                            </div>
                        </div>

                        <div className="flex gap-16 w-full mt-16">
                            <div className="flex lg:w-1/2 my-0 mx-auto lg:my-auto lg:mx-auto">
                                <div className="min-w-[2px] hidden lg:block">
                                    <svg
                                        width="2"
                                        height="500"
                                        viewBox="0 0 2 500"
                                        fill="none"
                                    >
                                        <line
                                            x1="1"
                                            y1="1"
                                            x2="0.999978"
                                            y2="499"
                                            stroke="url(#paint0_linear_8680_1213)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_8680_1213"
                                                x1="-0.5"
                                                y1="-2.18557e-08"
                                                x2="-0.500022"
                                                y2="500"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop
                                                    stopColor="#1570EF"
                                                    stopOpacity="0.3"
                                                />
                                                <stop
                                                    offset="0.51"
                                                    stopColor="#1570EF"
                                                />
                                                <stop
                                                    offset="1"
                                                    stopColor="#1570EF"
                                                    stopOpacity="0.3"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex flex-col lg:py-9 lg:pl-16 ">
                                    <SeamlessSliderItem
                                        step="1"
                                        title="Find the right plaintiffs"
                                        desc="We identify and connect you with
                                                qualified individuals ready to
                                                take legal action."
                                        sliderHandler={seamlessSliderHandler}
                                        activeSlide={activeSeamlessSlideStep}
                                        renderMobileImg={() => (
                                            <Image
                                                src={
                                                    "/images/partnership/s1_right_plaintiffs.png"
                                                }
                                                alt="Right Plaintiffs"
                                                width={300}
                                                height={300}
                                                className={
                                                    "w-full h-full object-cover"
                                                }
                                            />
                                        )}
                                    />
                                    <SeamlessSliderItem
                                        step="2"
                                        title="Collect & organize evidence"
                                        desc="Our platform streamlines document gathering and ensures that everything is prepared for litigation."
                                        sliderHandler={seamlessSliderHandler}
                                        activeSlide={activeSeamlessSlideStep}
                                        renderMobileImg={() => (
                                            <Image
                                                src={
                                                    "/images/partnership/s2_organize_evidence.png"
                                                }
                                                alt="Organize Evidence"
                                                width={300}
                                                height={300}
                                                className={
                                                    "w-full h-full object-cover"
                                                }
                                            />
                                        )}
                                    />
                                    <SeamlessSliderItem
                                        step="3"
                                        title="Manage mass payouts"
                                        desc="We take care of the distribution of compensation, reducing the administrative burden on your company."
                                        sliderHandler={seamlessSliderHandler}
                                        activeSlide={activeSeamlessSlideStep}
                                        renderMobileImg={() => (
                                            <Image
                                                src={
                                                    "/images/partnership/s3_mass_payouts.png"
                                                }
                                                alt="Mass payouts"
                                                width={300}
                                                height={300}
                                                className={
                                                    "w-full h-full object-cover"
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 relative hidden lg:block">
                                {seamlessSliderImages.map(
                                    ({ src, alt }, index) => {
                                        const isAcive =
                                            index + 1 ===
                                            activeSeamlessSlideStep;

                                        return (
                                            <Image
                                                key={alt}
                                                alt={alt}
                                                src={src}
                                                width={300}
                                                height={300}
                                                className={`w-full h-full object-cover transition-opacity duration-700 absolute top-0 left-0
                                            
                                            ${
                                                isAcive
                                                    ? "opacity-100 z-10"
                                                    : "opacity-0 z-0"
                                            }
                                            `}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section aria-label="Data driven section">
                    <div className="py-16 flex flex-col justify-center items-center">
                        <div className="flex flex-col gap-4 items-center max-w-[642px] mb-12 md:mb-16">
                            <Badge label="DATA-DRIVEN PLAINTIFFS" />
                            <h1 className="text-blue-gray-900 text-[32px] leading-tight tracking-[0] text-center md:text-[48px] md:leading-[52px]">
                                Pre-qualified plaintiffs & class representatives
                            </h1>

                            <span className="text-blue-gray-500 text-[16px] leading-[24px] tracking-[0px] text-center md:text-[18px] md:leading-[26px]">
                                We use reliable consumer data, including
                                purchase history, behavior patterns, and
                                evidence of injury, to identify pre-qualified
                                plaintiffs, ensuring stronger and more efficient
                                cases from the outset.
                            </span>
                        </div>

                        <Image
                            className="w-full h-full max-w-full max-h-full md:max-w-[1304px] md:max-h-[596px]"
                            src={"/images/partnership/partnership_driven.svg"}
                            alt="Partnership driven"
                            width={1304}
                            height={596}
                        />
                    </div>
                </section>

                <section
                    className="bg-gray-100 rounded-xl"
                    aria-label="Select ecosystem partners"
                >
                    <div className="flex flex-col items-start py-8 px-5 md:py-16 md:px-12">
                        <div className="mb-4">
                            <Badge label="PARTNERS" />
                        </div>

                        <h2 className="text-blue-gray-900 text-[32px] tracking-[0] md:text-[48px] md:leading-[52px]">
                            Select ecosystem partners
                        </h2>

                        <div className="flex flex-col gap-4 mt-12 md:mt-16">
                            {ecosystemCardsInfo.map(({ title, desc }) => {
                                return (
                                    <div
                                        key={title}
                                        className={`bg-white rounded-xl py-4 px-6 flex flex-col items-start justify-between gap-3 shadow-[2px_4px_12px_0px_#C0C1CE1A]
                                          transition-all hover:bg-main-blue-600 group
                                          cursor-pointer
                                          lg:flex-row
                                          lg:items-center
                                        `}
                                    >
                                        <div className="flex items-center flex-1 ">
                                            <p
                                                className="text-basetext-blue-gray-900 text-[22px] tracking-[0] leading-[30px]
                                            transition-all group-hover:text-white"
                                            >
                                                {title}
                                                <svg
                                                    className={`fill-current text-[#fff] transition-all group-hover:translate-x-2 inline-block align-baseline`}
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                >
                                                    <path d="M10.4763 6.16689L6.00634 1.69689L7.18467 0.518555L13.6663 7.00022L7.18467 13.4819L6.00634 12.3036L10.4763 7.83355H0.333008V6.16689H10.4763Z" />
                                                </svg>
                                            </p>
                                        </div>
                                        <div className="flex-1">
                                            <span
                                                className={`text-blue-gray-500 text-[16px] leading-[24px] tracking-[0px] text-center  md:text-[18px] md:leading-[26px]
                                            
                                            transition-all group-hover:text-main-blue-100
                                            `}
                                            >
                                                {desc}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section
                    className="bg-main-blue-600 rounded-xl"
                    aria-label="Empowering your legal practice"
                >
                    <div className="py-8 px-5 mt-3 md:py-16 md:px-12">
                        <div className="flex flex-col gap-8 md:flex-row md:gap-4 md:justify-between">
                            <div className="md:flex-[0.8]">
                                <h1 className="text-white text-[32px] leading-tight tracking-[0px] text-center md:text-[56px] md:leading-[64px] md:text-start">
                                    Ready to transform your legal practice?
                                </h1>
                            </div>

                            <div className="flex flex-col items-center gap-8 md:gap-8 md:items-start md:pt-[6px] md:max-w-[552px]">
                                <span className="text-blue-gray-100 text-[18px] leading-[26px] tracking-[0px] text-center md:text-[20px] md:leading-[30px] md:text-start">
                                    Contact us today to find out how Chariot Claims can support your company&apos;s growth and operational excellence.
                                </span>
                                <OutlineButton
                                    svg={() => (
                                        <svg
                                            className={`fill-current text-main-blue-600 transition-transform group-hover:translate-x-1`}
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                        >
                                            <path d="M10.4763 6.16689L6.00634 1.69689L7.18467 0.518555L13.6663 7.00022L7.18467 13.4819L6.00634 12.3036L10.4763 7.83355H0.333008V6.16689H10.4763Z" />
                                        </svg>
                                    )}
                                    className="bg-white flex-row-reverse rounded-full p-0 h-12 gap-2 w-[318px] max-w-full hover:bg-white md:w-[217px] md:h-14 group"
                                >
                                    <span className="text-main-blue-600 font-medium">
                                        Contact Us
                                    </span>
                                </OutlineButton>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
