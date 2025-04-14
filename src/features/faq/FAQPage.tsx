import type React from "react";
import { LandingHeader } from "../landing/landing-header/LandingHeader";
import { FAQSection } from "./FAQSection";
import { FrequentlyAskedSection } from "./FrequentlyAskedSection";
import { HaveQuestionSection } from "./HaveQuestionSection";

export const FAQPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full bg-white">
            <LandingHeader />
            <FrequentlyAskedSection />
            <FAQSection />
            <HaveQuestionSection />
        </div>
    );
};
