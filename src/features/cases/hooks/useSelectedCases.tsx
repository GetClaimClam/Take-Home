"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCounterStore } from "@/store/useCounterStore";
import { useFormStore } from "@/store/useFormStore";
import casesData from "@/data/cases.json";
import type { Case } from "@/types/case";

export function useSelectedCases(): {
  selectedCases: Case[];
  currentCase: Case | null;
  currentCaseIndex: number;
  isLastCase: boolean;
} {
  const router = useRouter();
  const selectedCaseIds = useCounterStore((state) => state.selectedCases);
  const currentCaseIndex = useFormStore((state) => state.currentCaseIndex);
  
  // Filter cases based on selected IDs
  const selectedCases: Case[] = casesData.filter((caseItem) =>
    selectedCaseIds.includes(caseItem.id)
  );
  
  // Get current case
  const currentCase: Case | null = selectedCases[currentCaseIndex] || null;
  
  // Redirect if no cases are selected
  useEffect(() => {
    if (selectedCases.length === 0) {
      router.push("/cases/");
    }
  }, [selectedCases.length, router]);
  
  return {
    selectedCases,
    currentCase,
    currentCaseIndex,
    isLastCase: currentCaseIndex === selectedCases.length - 1,
  };
}
