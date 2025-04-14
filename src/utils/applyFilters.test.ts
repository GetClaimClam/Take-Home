import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { 
  filterCasesBySearchQuery, 
  applyCategoryFilter,
  filterOutOfDateCases,
  applyFilters
} from "./applyFilters";
import type { CaseWithDateObject } from "../types/case";
import type { FilterOption } from "../features/cases/FilterDropdown";

// Mock cases for testing
const mockCases: CaseWithDateObject[] = [
  {
    id: 1,
    name: "Test Case Alpha",
    description: "This is a test case with proof needed",
    proof_needed: true,
    close_date: new Date('2025-06-01'),
    payout_amount: 150,
    title: "Alpha Claim",
    link: "/cases/1",
    date_to_close: "60 days",
    is_premium: false,
    amount_to_be_recovered: { 
      raw: "$150", 
      max_amount: 150, 
      description: "Estimated recovery amount" 
    },
    provider: { 
      name: "Alpha Provider", 
      url: "https://alpha-provider.com" 
    }
  },
  {
    id: 2,
    name: "Beta Test Case",
    description: "Another test case without proof",
    proof_needed: false,
    close_date: new Date('2025-04-15'),
    payout_amount: 75,
    title: "Beta Claim",
    link: "/cases/2",
    date_to_close: "15 days",
    is_premium: false,
    amount_to_be_recovered: { 
      raw: "$75", 
      max_amount: 75, 
      description: "Estimated recovery amount" 
    },
    provider: { 
      name: "Beta Provider", 
      url: "https://beta-provider.com" 
    }
  },
  {
    id: 3,
    name: "Gamma Premium Case",
    description: "A high value test case with proof needed",
    proof_needed: true,
    close_date: new Date('2025-12-31'),
    payout_amount: 5000,
    title: "Gamma Claim",
    link: "/cases/3",
    date_to_close: "expired",
    is_premium: true,
    amount_to_be_recovered: { 
      raw: "$5000", 
      max_amount: 5000, 
      description: "Estimated recovery amount" 
    },
    provider: { 
      name: "Gamma Provider", 
      url: "https://gamma-provider.com" 
    }
  },
  {
    id: 4,
    name: "Expired Case",
    description: "This case has already expired",
    proof_needed: false,
    close_date: new Date('2025-03-15'), // Past date compared to current date (April 2025)
    payout_amount: 50,
    title: "Expired Claim",
    link: "/cases/4",
    date_to_close: "Expired",
    is_premium: false,
    amount_to_be_recovered: { 
      raw: "$50", 
      max_amount: 50, 
      description: "Estimated recovery amount" 
    },
    provider: { 
      name: "Delta Provider", 
      url: "https://delta-provider.com" 
    }
  }
];

/**
 * Set up mock date for consistent testing
 * Returns a cleanup function
 */
const mockCurrentDate = (): () => void => {
  const originalDate = global.Date;
  
  // Mock Date to return April 7, 2025 for "new Date()"
  // @ts-expect-error - Mocking Date constructor
  global.Date = class extends Date {
    constructor(...args: [string | number | Date] | []) {
      if (args.length === 0) {
        super('2025-04-07T00:00:00.000Z');
      } else {
        super(...args);
      }
    }
  };
  
  // Return cleanup function
  return () => {
    global.Date = originalDate;
  };
};

// 1. Tests for filterCasesBySearchQuery
describe("filterCasesBySearchQuery", () => {
  test("should return all cases when search query is empty", () => {
    const result = filterCasesBySearchQuery(mockCases, "");
    expect(result).toEqual(mockCases);
  });

  test("should filter cases that match search query in name", () => {
    const result = filterCasesBySearchQuery(mockCases, "Alpha");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test("should filter cases that match search query in description", () => {
    const result = filterCasesBySearchQuery(mockCases, "high value");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  test("should be case-insensitive", () => {
    const result = filterCasesBySearchQuery(mockCases, "TEST CASE");
    // Should match case-insensitive in both name and description
    expect(result.length).toBeGreaterThan(0);
    expect(result.some(c => c.name.toLowerCase().includes("test case"))).toBe(true);
  });

  test("should return empty array when no matches found", () => {
    const result = filterCasesBySearchQuery(mockCases, "nonexistent");
    expect(result).toHaveLength(0);
  });
});

// 2. Tests for applyCategoryFilter
describe("applyCategoryFilter", () => {
  test("should return all cases when filter is null", () => {
    const result = applyCategoryFilter(mockCases, null, []);
    expect(result).toEqual(mockCases);
  });

  test("should return all cases when filter is undefined", () => {
    const result = applyCategoryFilter(mockCases, undefined, []);
    expect(result).toEqual(mockCases);
  });

  test("should filter cases that don't need proof", () => {
    const noProofFilter: FilterOption = { id: "no_proof_needed", label: "No Proof Needed" };
    const result = applyCategoryFilter(mockCases, noProofFilter, []);
    
    expect(result).toHaveLength(2);
    expect(result.every(c => !c.proof_needed)).toBe(true);
  });

  test("should filter premium cases", () => {
    const premiumFilter: FilterOption = { id: "premium_cases", label: "Premium Cases" };
    const result = applyCategoryFilter(mockCases, premiumFilter, []);
    
    expect(result).toHaveLength(1);
    expect(result.every(c => c.is_premium === true)).toBe(true);
  });

  test("should filter selected cases", () => {
    const selectedFilter: FilterOption = { id: "selected_cases", label: "Selected Cases" };
    const selectedCases = [1, 3];
    
    const result = applyCategoryFilter(mockCases, selectedFilter, selectedCases);
    
    expect(result).toHaveLength(2);
    expect(result.map(c => c.id)).toEqual(expect.arrayContaining([1, 3]));
  });

  test("should return all cases for 'none' filter", () => {
    const noneFilter: FilterOption = { id: "none", label: "No Filter" };
    const result = applyCategoryFilter(mockCases, noneFilter, []);
    
    expect(result).toEqual(mockCases);
  });

  test("should return all cases for unknown filter types", () => {
    const unknownFilter: FilterOption = { id: "unknown", label: "Unknown Filter" };
    const result = applyCategoryFilter(mockCases, unknownFilter, []);
    
    expect(result).toEqual(mockCases);
  });
});

// 3. Tests for filterOutOfDateCases
describe("filterOutOfDateCases", () => {
  let resetDate: () => void;

  beforeEach(() => {
    resetDate = mockCurrentDate();
  });

  afterEach(() => {
    resetDate();
  });
  
  test("should filter out cases with close_date before current date", () => {
    const result = filterOutOfDateCases(mockCases);
    
    // The Expired Case (id: 4) should be filtered out as its close_date is 2025-03-15
    expect(result).toHaveLength(3);
    expect(result.map(c => c.id)).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(result.map(c => c.id)).not.toContain(4);
  });
  
  test("should keep cases with close_date equal to current date", () => {
    // Create a case with today's date
    const todayCase: CaseWithDateObject = {
      ...mockCases[0],
      id: 5,
      name: "Today Case",
      close_date: new Date('2025-04-07')
    };
    
    // Create explicit typed array to fix spread argument error
    const testCases: CaseWithDateObject[] = [...mockCases, todayCase];
    const result = filterOutOfDateCases(testCases);
    
    // The Today Case should be included
    expect(result.some(c => c.id === 5)).toBe(true);
  });
  
  test("should keep cases with close_date after current date", () => {
    const result = filterOutOfDateCases(mockCases);
    
    // All future cases should remain
    expect(result.some(c => c.id === 1)).toBe(true); // 2025-06-01
    expect(result.some(c => c.id === 2)).toBe(true); // 2025-04-15
    expect(result.some(c => c.id === 3)).toBe(true); // 2025-12-31
  });
});

// 4. Tests for applyFilters (main function)
describe("applyFilters", () => {
  let resetDate: () => void;

  beforeEach(() => {
    resetDate = mockCurrentDate();
  });

  afterEach(() => {
    resetDate();
  });
  
  test("should filter out expired cases by default", () => {
    const result = applyFilters(mockCases, null, []);
    
    // Should return only non-expired cases
    expect(result).toHaveLength(3);
    expect(result.map(c => c.id)).not.toContain(4); // Expired case should be filtered out
  });

  test("should not filter out expired cases when hideOutOfDate is false", () => {
    const result = applyFilters(mockCases, null, [], false);
    
    // Should return all cases, including expired ones
    expect(result).toHaveLength(4);
    expect(result.map(c => c.id)).toContain(4); // Expired case should be included
  });
  
  test("should apply category filter after date filter", () => {
    const noProofFilter: FilterOption = { id: "no_proof_needed", label: "No Proof Needed" };
    const result = applyFilters(mockCases, noProofFilter, []);
    
    // Should return cases that don't need proof and are not expired
    expect(result).toHaveLength(1);
    expect(result.every(c => !c.proof_needed)).toBe(true);
    expect(result.every(c => {
      const closeDate = new Date(c.close_date);
      const currentDate = new Date('2025-04-07');
      return closeDate >= currentDate;
    })).toBe(true);
  });
  
  test("should apply category filter before date filter when requested", () => {
    const noProofFilter: FilterOption = { id: "no_proof_needed", label: "No Proof Needed" };
    
    // Add an expired case that doesn't require proof
    const expiredNoProofCase: CaseWithDateObject = {
      ...mockCases[0],
      id: 6,
      name: "Expired No Proof Case",
      proof_needed: false,
      close_date: new Date('2025-03-01') // Past date
    };
    
    const testCases: CaseWithDateObject[] = [...mockCases, expiredNoProofCase];
    
    const result = applyFilters(
      testCases,
      noProofFilter,
      [],
      false // Don't hide expired cases
    );
    
    // Should include all no-proof cases, even expired ones
    expect(result.every(c => !c.proof_needed)).toBe(true);
    expect(result.map(c => c.id)).toContain(6); // Should include expired no-proof case
  });

  test("should sort premium cases to appear first", () => {
    // Add another premium case to ensure sorting works with multiple premium cases
    const testCases = [
      ...mockCases,
      {
        id: 5,
        name: "Another Premium Case",
        description: "Another premium case for testing",
        proof_needed: false,
        close_date: new Date('2025-05-15'),
        payout_amount: 2000,
        is_premium: true,
        title: "Premium Test",
        link: "/cases/5",
        date_to_close: "30 days",
        amount_to_be_recovered: { 
          raw: "$2000",
          max_amount: 2000,
          description: "Test amount"
        },
        provider: {
          name: "Test Provider",
          url: "https://test-provider.com"
        }
      }
    ];
    
    const result = applyFilters(testCases, null, []);
    
    // First cases should be premium
    expect(result.length).toBeGreaterThan(2);
    expect(result[0].is_premium).toBe(true);
    expect(result[1].is_premium).toBe(true);
    
    // Non-premium cases should follow
    const firstNonPremiumIndex = result.findIndex(c => !c.is_premium);
    expect(firstNonPremiumIndex).toBeGreaterThan(1);
    
    // All premium cases should come before non-premium cases
    expect(result.slice(0, firstNonPremiumIndex).every(c => c.is_premium)).toBe(true);
    expect(result.slice(firstNonPremiumIndex).every(c => !c.is_premium)).toBe(true);
  });
});
