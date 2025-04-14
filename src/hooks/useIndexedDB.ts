import { useState, useCallback } from "react";
import {
    getSelectedCases,
    saveSelectedCases,
    addCase,
    removeCase,
    type StoredCase,
} from "../utils/indexedDB";
import { Case } from "../types/case";

interface UseIndexedDBReturn {
    loadSelectedCasesFromIDB: () => Promise<{
        ids: number[];
        cases: StoredCase[];
    }>;
    saveSelectedCasesToIDB: (cases: StoredCase[]) => Promise<void>;
    addCaseToIDB: (caseData: Case) => Promise<void>;
    removeCaseFromIDB: (id: number) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

export function useIndexedDB(): UseIndexedDBReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const loadSelectedCasesFromIDB = useCallback(async (): Promise<{
        ids: number[];
        cases: StoredCase[];
    }> => {
        setIsLoading(true);
        setError(null);

        try {
            const storedCases = await getSelectedCases();
            const selectedCaseIds = storedCases.map((caseItem) => caseItem.id);

            return {
                ids: selectedCaseIds,
                cases: storedCases,
            };
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error("Failed to load cases from IndexedDB")
            );
            return { ids: [], cases: [] };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveSelectedCasesToIDB = useCallback(
        async (cases: StoredCase[]): Promise<void> => {
            setIsLoading(true);
            setError(null);

            try {
                await saveSelectedCases(cases);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to save cases to IndexedDB")
                );
                throw err;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const addCaseToIDB = useCallback(async (caseData: Case): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await addCase(caseData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error("Failed to add case to IndexedDB")
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeCaseFromIDB = useCallback(async (id: number): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            await removeCase(id);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error("Failed to remove case from IndexedDB")
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        loadSelectedCasesFromIDB,
        saveSelectedCasesToIDB,
        addCaseToIDB,
        removeCaseFromIDB,
        isLoading,
        error,
    };
}
