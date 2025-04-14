"use client";

import { OutlineButton, PrimaryRoundedButton } from "@/components/ui/buttons";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { HamburgerMenu } from "./HamburgerMenu";
import { NavLink } from "./NavLink";

export const LandingHeader: React.FC = () => {
    return (
        <header className="px-[16px] md:px-[68px] py-6 bg-white relative">
            <nav className="flex items-center justify-between max-w-[1540px] mx-auto">
                <Link href="/">
                    <Image
                        src="/icons/blue-logo.svg"
                        alt="Chariot Claims Logo"
                        width={191}
                        height={32}
                        priority
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-8 font-normal">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="#how-it-works">How it works</NavLink>
                    <NavLink href="/partnership">Partnership</NavLink>
                    <NavLink href="/faq">FAQ</NavLink>
                    <NavLink href="#about">About us</NavLink>
                </div>

                <div className="hidden lg:flex items-center gap-3">
                    <Link href="/cases">
                        <OutlineButton fullWidth={false}>
                            My Cases
                        </OutlineButton>
                    </Link>
                    <Link href="/cases">
                        <PrimaryRoundedButton fullWidth={false}>
                            Get Started
                        </PrimaryRoundedButton>
                    </Link>
                </div>

                <HamburgerMenu aria-label="Navigation menu" />
            </nav>
        </header>
    );
};
