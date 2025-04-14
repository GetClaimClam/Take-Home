"use client";

import { useEffect, useState } from "react";
import { useCounterStore } from "../../store/useCounterStore";
import { FormPage } from "./FormPage";
import casesData from "../../data/cases.json";

interface DirectCaseLoaderProps {
    caseId: number;
}

export function DirectCaseLoader({ caseId }: DirectCaseLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const selectedCases = useCounterStore((state) => state.selectedCases);
    const toggleCase = useCounterStore((state) => state.toggleCase);

    const targetCase = casesData.find((c) => c.id === caseId);

    useEffect(() => {
        if (targetCase && !selectedCases.includes(caseId)) {
            toggleCase(caseId, targetCase.payout_amount);
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [caseId, targetCase, selectedCases, toggleCase]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-2">
                <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                <p>Loading case...</p>
            </div>
        );
    }

    return <FormPage initialCaseId={caseId} />;
}
