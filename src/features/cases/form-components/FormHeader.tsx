"use client";

import React from "react";
import type { Case } from "@/types/case";

interface FormHeaderProps {
    currentCase: Case | null;
    currentCaseIndex: number;
    totalCases: number;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
    currentCase,
    currentCaseIndex,
    totalCases,
}) => {
    if (!currentCase) {
        return null;
    }

    return (
        <div className="mb-8">
            <div className="flex gap-[10px] mb-2">
                {Array.from({ length: totalCases }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-[8px] rounded-[100px] ${
                            index <= currentCaseIndex
                                ? "bg-[#0060E0]"
                                : "bg-[#DEE2E6]"
                        }`}
                        style={{
                            flex: 1,
                        }}
                    />
                ))}
            </div>
            <h2 className="text-xl font-semibold mt-4">
                Claim {currentCaseIndex + 1} of {totalCases}: {currentCase.name}
            </h2>
            <p className="text-gray-600">
                Fill in a few details for each claim
            </p>
            {/**#TODO temp off */}
            {/* <div className="border border-[#DEE2E6] rounded-2xl p-6 mt-4 mb-8">
                <p className="mb-4">{currentCase.description}</p>
                {currentCase.proof_needed ? (
                    <div className="flex items-center text-orange-600">
                        <span>Proof of purchase required</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span>No proof of purchase needed</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                        >
                            <path
                                d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM9.85375 5.85375L6.35375 9.35375C6.30732 9.40024 6.25217 9.43712 6.19147 9.46228C6.13077 9.48744 6.06571 9.50039 6 9.50039C5.9343 9.50039 5.86923 9.48744 5.80853 9.46228C5.74783 9.43712 5.69269 9.40024 5.64625 9.35375L4.14625 7.85375C4.05243 7.75993 3.99972 7.63268 3.99972 7.5C3.99972 7.36732 4.05243 7.24007 4.14625 7.14625C4.24007 7.05243 4.36732 6.99972 4.5 6.99972C4.63268 6.99972 4.75993 7.05243 4.85375 7.14625L6 8.29313L9.14625 5.14625C9.19271 5.09979 9.24786 5.06294 9.30855 5.0378C9.36925 5.01266 9.43431 4.99972 9.5 4.99972C9.5657 4.99972 9.63075 5.01266 9.69145 5.0378C9.75215 5.06294 9.8073 5.09979 9.85375 5.14625C9.90021 5.1927 9.93706 5.24786 9.9622 5.30855C9.98734 5.36925 10.0003 5.4343 10.0003 5.5C10.0003 5.5657 9.98734 5.63075 9.9622 5.69145C9.93706 5.75214 9.90021 5.8073 9.85375 5.85375Z"
                                fill="#50C750"
                            />
                        </svg>
                    </div>
                )}
            </div> */}
        </div>
    );
};
