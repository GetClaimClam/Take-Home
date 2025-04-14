import Link from "next/link";
import Image from "next/image";
import { OutlineButton, PrimaryRoundedButton } from "@/components/ui/buttons";
import { ButtonArrow } from "@/components/ui/icons/ButtonArrow";
import { AvatarList } from "@/components/ui/AvatarList";
import { Slider } from "@/components/ui/slider/Slider";
import { Stats } from "@/components/ui/Stats";
import {
    avatars,
    sliderImages,
    sliderMobileImages,
    sliderIcons,
    stats,
} from "../landing/constants";

export const HeroLanding = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 max-w-[1540px] mx-auto px-8 md:px-12 lg:px-16 py-8 md:pb-12 *:rounded-xl gap-6 ">
            <div className="col-span-1 bg-white p-8 md:p-12">
                <h1 className="text-[40px] md:text-[65px] leading-[76px] font-medium pb-6">
                    <span className="block">Your rights matter.</span>
                    <span className="block">Get the money you deserve.</span>
                </h1>
                <p className="text-base md:text-xl text-blue-gray-500">
                    Chariot Claims provides a safe and transparent process for
                    claiming funds from class action settlements. Our commitment
                    to integrity ensures you receive fair, reliable compensation
                    while holding companies accountable.
                </p>
                <div className="flex justify-start items-center gap-4 mt-8">
                    <Link href="/cases">
                        <PrimaryRoundedButton
                            svg={() => <ButtonArrow />}
                            fullWidth={true}
                        >
                            Explore Cases Now
                        </PrimaryRoundedButton>
                    </Link>
                    <Link href="/cases">
                        <OutlineButton>Discover My Cases</OutlineButton>
                    </Link>
                </div>
                <div className="flex items-end justify-start gap-2 max-lg:my-6 max-md:flex-col max-md:items-center">
                    <AvatarList avatars={avatars} className="lg:mt-6 " />
                    <div className="flex items-start gap-1 flex-col">
                        <Image
                            src="/icons/five-stars.svg"
                            alt="5 stars"
                            width={95}
                            height={15}
                        />
                        <span className="text-sm">
                            Trusted by 7K+ Customers
                        </span>
                    </div>
                </div>

                <div className="xl:hidden mt-8">
                    <Slider
                        images={sliderImages}
                        mobileImages={sliderMobileImages}
                        icons={sliderIcons}
                    />
                </div>

                <Stats stats={stats} />
            </div>

            <div className="col-span-1 hidden xl:block">
                <Slider
                    images={sliderImages}
                    mobileImages={sliderMobileImages}
                    icons={sliderIcons}
                />
            </div>
        </div>
    );
};
