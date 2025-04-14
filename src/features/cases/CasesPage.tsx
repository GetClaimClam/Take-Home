import type React from "react";
import { CasesListWrapper } from "./CasesListWrapper";
import { Header } from "./header/Header";

export const CasesPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-9 items-center">
            <Header />
            <div className="p-4 relative flex flex-col gap-9 items-center">
                <CasesListWrapper />
            </div>
        </div>
    );
};
