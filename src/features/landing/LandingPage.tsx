import { HeroLanding } from "./HeroLanding";
import { LandingHeader } from "./landing-header/LandingHeader";

export const LandingPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#F5F5F7]">
            <LandingHeader />
            <main>
                <HeroLanding />
            </main>
        </div>
    );
};
