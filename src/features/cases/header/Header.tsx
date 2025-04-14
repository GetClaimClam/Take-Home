import Image from "next/image";
import { Counter } from "./Counter";
import ProfileClient from "./ProfileClient";
import { Tooltip } from "@/components/ui/Tooltip";
import type React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#E0E2E5] bg-white">
            <div className="mx-auto w-full max-w-[1200px] px-3 lg:px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image
                                src="/icons/blue-logo.svg"
                                alt="Sample Cases App Logo"
                                width={118}
                                height={16}
                                priority
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Tooltip text="Settlement amounts are not guaranteed">
                            <Image
                                src="/icons/question.svg"
                                alt="Question mark icon"
                                width={16}
                                height={16}
                            />
                        </Tooltip>
                        <Counter />
                        <ProfileClient />
                    </div>

                    <div className="flex md:hidden items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Tooltip text="Settlement amounts are not guaranteed">
                                <Image
                                    src="/icons/question.svg"
                                    alt="Question mark icon"
                                    width={16}
                                    height={16}
                                />
                            </Tooltip>
                            <Counter />
                        </div>
                        <ProfileClient />
                    </div>
                </div>
            </div>
        </header>
    );
};
