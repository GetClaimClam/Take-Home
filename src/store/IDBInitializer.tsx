"use client";

import { useEffect } from "react";
import { useIndexedDB } from "../hooks/useIndexedDB";
import { useCounterStore } from "./useCounterStore";

export const IDBInitializer: React.FC = () => {
    const { loadSelectedCasesFromIDB } = useIndexedDB();
    const initializeFromIDB = useCounterStore(
        (state) => state.initializeFromIDB
    );
    const isInitialized = useCounterStore((state) => state.isInitialized);

    useEffect(() => {
        const loadFromIDB = async () => {
            try {
                const { ids, cases } = await loadSelectedCasesFromIDB();
                if (ids.length > 0) {
                    const totalAmount = cases.reduce(
                        (sum, caseItem) => sum + caseItem.payout_amount,
                        0
                    );

                    initializeFromIDB(ids, totalAmount, cases);
                } else {
                    // Even if there are no cases, mark as initialized
                    initializeFromIDB([], 0, []);
                }
            } catch (error) {
                console.error("Failed to load data from IndexedDB:", error);
                // On error, still mark as initialized to prevent infinite retries
                initializeFromIDB([], 0, []);
            }
        };

        if (!isInitialized) {
            loadFromIDB();
        }
    }, [loadSelectedCasesFromIDB, initializeFromIDB, isInitialized]);

    return null;
};
