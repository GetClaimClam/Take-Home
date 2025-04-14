import { create } from "zustand";
import {
    addCase as addCaseToIDB,
    removeCase as removeCaseFromIDB,
    saveSelectedCases,
    StoredCase,
} from "../utils/indexedDB";
import casesData from "../data/cases.json";

interface AnimationQueueItem {
    amount: number;
    timestamp: number;
}

interface CounterState {
    amount: number;
    extraAmount?: number;
    selectedCases: number[];
    storedCases: StoredCase[];
    isAnimating: boolean;
    animationAmount: number | null;
    animationQueue: AnimationQueueItem[];
    isInitialized: boolean;
    increment: (value: number) => void;
    toggleCase: (caseId: number, amount: number) => void;
    startAnimation: (amount: number) => void;
    endAnimation: () => void;
    processNextAnimation: () => void;
    initializeFromIDB: (
        ids: number[],
        amount: number,
        cases: StoredCase[]
    ) => void;
    syncSelectedCasesToIDB: () => Promise<void>;
}

export const useCounterStore = create<CounterState>((set, get) => ({
    amount: 0,
    extraAmount: undefined,
    selectedCases: [],
    storedCases: [],
    isAnimating: false,
    animationAmount: null,
    animationQueue: [],
    isInitialized: false,

    increment: (value: number) =>
        set((state) => ({ amount: state.amount + value })),

    toggleCase: (caseId: number, amount: number) =>
        set((state) => {
            const isSelected = state.selectedCases.includes(caseId);

            const caseData = casesData.find((c) => c.id === caseId);

            if (!caseData) {
                console.error(`Case with ID ${caseId} not found`);
                return state;
            }

            if (isSelected) {
                const newState = {
                    selectedCases: state.selectedCases.filter(
                        (id) => id !== caseId
                    ),
                    storedCases: state.storedCases.filter(
                        (c) => c.id !== caseId
                    ),
                    amount: state.amount - amount,
                };

                removeCaseFromIDB(caseId).catch((err) =>
                    console.error("Failed to remove case from IndexedDB:", err)
                );

                return newState;
            }
            const storedCase: StoredCase = {
                ...caseData,
                timestamp: Date.now(),
            };

            const newState = state.isAnimating
                ? {
                      selectedCases: [...state.selectedCases, caseId],
                      storedCases: [...state.storedCases, storedCase],
                      amount: state.amount + amount,
                      animationQueue: [
                          ...state.animationQueue,
                          { amount, timestamp: Date.now() },
                      ],
                  }
                : {
                      selectedCases: [...state.selectedCases, caseId],
                      storedCases: [...state.storedCases, storedCase],
                      amount: state.amount + amount,
                      isAnimating: true,
                      animationAmount: amount,
                  };

            addCaseToIDB(caseData).catch((err) =>
                console.error("Failed to add case to IndexedDB:", err)
            );

            return newState;
        }),

    initializeFromIDB: (ids: number[], amount: number, cases: StoredCase[]) =>
        set(() => ({
            selectedCases: ids,
            amount: amount,
            storedCases: cases,
            isInitialized: true,
        })),

    syncSelectedCasesToIDB: async () => {
        const { storedCases } = get();

        try {
            await saveSelectedCases(storedCases);
        } catch (err) {
            console.error("Failed to sync cases to IndexedDB:", err);
        }
    },

    startAnimation: (amount: number) =>
        set(() => ({
            isAnimating: true,
            animationAmount: amount,
        })),

    endAnimation: () =>
        set((state) => ({
            isAnimating: false,
            animationAmount: null,
            extraAmount:
                state.animationQueue.length > 0
                    ? state.animationQueue[0].amount
                    : undefined,
        })),

    processNextAnimation: () =>
        set((state) => {
            const [...remainingAnimations] = state.animationQueue.slice(1);
            return {
                animationQueue: remainingAnimations,
                extraAmount:
                    remainingAnimations.length > 0
                        ? remainingAnimations[0].amount
                        : undefined,
            };
        }),
}));