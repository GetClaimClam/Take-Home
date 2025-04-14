import { Case } from "../types/case";

const DB_NAME = "cases-app-db";
const DB_VERSION = 1;
const SELECTED_CASES_STORE = "selectedCases";

export interface StoredCase extends Case {
    timestamp: number;
}

export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains(SELECTED_CASES_STORE)) {
                db.createObjectStore(SELECTED_CASES_STORE, { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

export const saveSelectedCases = async (cases: StoredCase[]): Promise<void> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(SELECTED_CASES_STORE, "readwrite");
        const store = transaction.objectStore(SELECTED_CASES_STORE);

        await clearStore(store);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = () => {
                const error = transaction.error;
                console.error("Transaction error while saving cases:", error);
                reject(error);
            };

            transaction.onabort = () => {
                const error = transaction.error;
                console.error("Transaction aborted while saving cases:", error);
                reject(error || new Error("Transaction aborted"));
            };

            cases.forEach((caseItem) => {
                const storedCase: StoredCase = {
                    ...caseItem,
                    close_date:
                        typeof caseItem.close_date === "string"
                            ? caseItem.close_date
                            : (caseItem.close_date as Date)
                                  .toISOString()
                                  .split("T")[0],
                    timestamp: Date.now(),
                };

                const request = store.put(storedCase);

                request.onerror = (event) => {
                    const error = (event.target as IDBRequest).error;
                    console.error("Error saving individual case:", error);
                    reject(error);
                };
            });
        });
    } catch (error) {
        console.error("Error in saveSelectedCases:", error);
        throw error;
    }
};

const clearStore = (store: IDBObjectStore): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

export const getSelectedCases = async (): Promise<StoredCase[]> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(SELECTED_CASES_STORE, "readonly");
        const store = transaction.objectStore(SELECTED_CASES_STORE);
        const request = store.getAll();

        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Error retrieving cases from IndexedDB:", error);
        return [];
    }
};

export const addCase = async (caseData: Case): Promise<void> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(SELECTED_CASES_STORE, "readwrite");
        const store = transaction.objectStore(SELECTED_CASES_STORE);

        const storedCase: StoredCase = {
            ...caseData,
            close_date:
                typeof caseData.close_date === "string"
                    ? caseData.close_date
                    : (caseData.close_date as Date).toISOString().split("T")[0],
            timestamp: Date.now(),
        };

        return new Promise((resolve, reject) => {
            const request = store.put(storedCase);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                const error = (event.target as IDBRequest).error;
                console.error("Error in save request:", error);
                reject(error);
            };

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = () => {
                const error = transaction.error;
                console.error("Transaction error:", error);
                reject(error);
            };

            transaction.onabort = () => {
                const error = transaction.error;
                console.error("Transaction aborted:", error);
                reject(error || new Error("Transaction aborted"));
            };
        });
    } catch (error) {
        console.error("Error in addCase:", error);
        throw error;
    }
};

export const removeCase = async (id: number): Promise<void> => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(SELECTED_CASES_STORE, "readwrite");
        const store = transaction.objectStore(SELECTED_CASES_STORE);

        store.delete(id);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        });
    } catch (error) {
        console.error("Error removing case from IndexedDB:", error);
        throw error;
    }
};
