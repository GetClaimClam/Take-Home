"use client";

import type React from "react";

import { useCounterStore } from "@/store/useCounterStore";
import { CasesListView } from "./CasesListView";
import { applyFilters } from "@/utils/applyFilters";
import type { CaseWithDateObject } from "@/types/case";
import { FilterOption } from "@/features/cases/FilterDropdown";

interface CasesListProps {
    searchQuery: string;
    currentInputValue: string;
    cases: CaseWithDateObject[];
    activeFilter?: FilterOption | null;
    hideOutOfDate?: boolean;
}

export const CasesList: React.FC<CasesListProps> = ({
    searchQuery,
    currentInputValue,
    cases,
    activeFilter,
    hideOutOfDate = true,
}) => {
    const selectedCases = useCounterStore((state) => state.selectedCases);

    const filteredCases = applyFilters(cases, activeFilter, selectedCases, hideOutOfDate);

    const isLoading =
        searchQuery !== currentInputValue && currentInputValue !== "";

    return (
        <CasesListView filteredCases={filteredCases} isLoading={isLoading} />
    );
};
