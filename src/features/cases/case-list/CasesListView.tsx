"use client";

import React from "react";

import type { CaseWithDateObject } from "@/types/case";
import { CaseItem } from "@/features/cases/CaseItem";

interface CasesListViewProps {
    filteredCases: CaseWithDateObject[];
    isLoading: boolean;
}

export const CasesListView: React.FC<CasesListViewProps> = ({
    filteredCases,
    isLoading,
}) => (
    <>
        {isLoading && (
            <div className="flex items-center justify-center h-10 mb-2">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Searching...
                </div>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-6 justify-items-center">
            {filteredCases.map((caseItem) => (
                <CaseItem
                    key={caseItem.id}
                    id={caseItem.id}
                    name={caseItem.name}
                    description={caseItem.description}
                    proof_needed={caseItem.proof_needed}
                    close_date={caseItem.close_date}
                    payout_amount={caseItem.payout_amount}
                    is_premium={caseItem.is_premium}
                    link_to_survey={caseItem.link_to_survey}
                />
            ))}
        </div>
    </>
);
