import type { CaseWithDateObject } from "../types/case";
import type { FilterOption } from "../features/cases/FilterDropdown";

/**
 * Filter cases by search query in name or description
 */
export const filterCasesBySearchQuery = (
    cases: CaseWithDateObject[],
    searchQuery: string
): CaseWithDateObject[] => {
    if (!searchQuery) return cases;

    return cases.filter(
        (caseItem) =>
            caseItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            caseItem.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );
};

/**
 * Apply a category filter to cases (proof needed, selected cases, etc.)
 */
export const applyCategoryFilter = (
    cases: CaseWithDateObject[],
    activeFilter: FilterOption | null | undefined,
    selectedCases: number[]
): CaseWithDateObject[] => {
    if (!activeFilter) return cases;

    switch (activeFilter.id) {
        case "premium_cases":
            return cases.filter((caseItem) => caseItem.is_premium === true);
        case "no_proof_needed":
            return cases.filter((caseItem) => !caseItem.proof_needed);
        case "selected_cases":
            return cases.filter((caseItem) =>
                selectedCases.includes(caseItem.id)
            );
        case "none":
        default:
            return cases;
    }
};

/**
 * Filter out cases that are past their close date
 */
export const filterOutOfDateCases = (
    cases: CaseWithDateObject[]
): CaseWithDateObject[] => {
    const currentDate = new Date();
    // Reset time to beginning of day for fair comparison
    currentDate.setHours(0, 0, 0, 0);
    
    return cases.filter((caseItem) => {
        // Create a new date object without time component for comparison
        const closeDate = new Date(caseItem.close_date);
        closeDate.setHours(0, 0, 0, 0);
        
        return closeDate >= currentDate;
    });
};

/**
 * Apply all filters to cases
 * @param cases List of cases to filter
 * @param activeFilter Optional filter selected by the user
 * @param selectedCases IDs of cases selected by the user
 * @param hideOutOfDate Whether to hide cases that are past their close date
 * @returns Filtered list of cases
 */
export const applyFilters = (
    cases: CaseWithDateObject[],
    activeFilter: FilterOption | null | undefined,
    selectedCases: number[],
    hideOutOfDate: boolean = true
): CaseWithDateObject[] => {
    // First filter out cases that are out of date if requested
    const currentCases = hideOutOfDate ? filterOutOfDateCases(cases) : cases;
    
    // Then apply any other active filters
    const filteredCases = applyCategoryFilter(currentCases, activeFilter, selectedCases);
    
    // Sort cases so that premium cases appear first
    return filteredCases.sort((a, b) => {
        // Premium cases first
        if (a.is_premium && !b.is_premium) return -1;
        if (!a.is_premium && b.is_premium) return 1;
        
        // Then sort by close date (soonest first)
        return a.close_date.getTime() - b.close_date.getTime();
    });
};
