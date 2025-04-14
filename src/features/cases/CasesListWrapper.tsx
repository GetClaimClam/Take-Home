"use client";

import type React from "react";
import { useState, useMemo } from "react";
import Fuse, { IFuseOptions, FuseResult } from "fuse.js";
import { CasesList } from "@/features/cases/case-list/CasesList";
// import { SearchInput } from "@/components/ui/form/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import casesData from "@/data/cases.json";
import type { CaseWithDateObject } from "@/types/case";
import { FilterDropdown, type FilterOption } from "@/features/cases/FilterDropdown";
import { useRouter } from "next/navigation";
import { useCounterStore } from "@/store/useCounterStore";
import { PrimaryButton } from "@/components/ui/buttons";

const CASES: CaseWithDateObject[] = casesData.map((caseItem) => ({
    ...caseItem,
    proof_needed: caseItem.proof_needed,
    close_date: new Date(caseItem.close_date),
}));

const debounceTime = 300;

const filterOptions: FilterOption[] = [
    { id: "none", label: "None" },
    { id: "premium_cases", label: "Premium Cases" },
    { id: "no_proof_needed", label: "No Proof Needed" },
    { id: "selected_cases", label: "Selected Cases" },
];

const fuseOptions: IFuseOptions<CaseWithDateObject> = {
    keys: ["name", "title", "description"],
    threshold: 0.4,
    includeScore: true,
};

export const CasesListWrapper: React.FC = () => {
    const [inputValue] = useState("");
    const debouncedSearchQuery = useDebounce(inputValue, debounceTime);
    const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(
        null
    );
    const selectedCases = useCounterStore((state) => state.selectedCases);
    const hasSelectedCases = selectedCases.length > 0;
    const router = useRouter();

    const fuse = useMemo(() => new Fuse(CASES, fuseOptions), []);

    const fuzzySearchResults = useMemo(() => {
        if (!debouncedSearchQuery) return CASES;

        const results = fuse.search(debouncedSearchQuery);

        return results.map(
            (result: FuseResult<CaseWithDateObject>) => result.item
        );
    }, [fuse, debouncedSearchQuery]);

    // const handleSearch = (value: string) => {
    //     setInputValue(value);
    // };

    const handleFilterChange = (option: FilterOption | null) => {
        setSelectedFilter(option);
    };

    return (
        <div className="mt-12 text-left w-full max-w-[1200px] flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl text-typography-black font-semibold">
                        Have you ever used or paid for any of these products?
                    </h1>
                    <h4 className="text-sm text-blue-gray-500 pt-1 font-medium">
                        Select all the claims you think you qualify for
                    </h4>
                </div>

                <FilterDropdown
                    options={filterOptions}
                    onFilterChange={handleFilterChange}
                    className="mt-4 md:mt-0 hidden md:block"
                />
            </div>

            <CasesList
                searchQuery={debouncedSearchQuery}
                currentInputValue={inputValue}
                cases={fuzzySearchResults}
                activeFilter={selectedFilter}
                hideOutOfDate={true}
            />
            <div className="mt-6 flex justify-center xl:justify-end">
                <PrimaryButton
                    onClick={() => router.push("/form")}
                    disabled={!hasSelectedCases}
                >
                    Continue
                </PrimaryButton>
            </div>
        </div>
    );
};
