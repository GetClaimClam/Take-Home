import { create } from "zustand";
import { FormState, FormValues, CaseFormData } from "../types/forms";
import { validatePaymentDetails } from "@/utils/validations";

const getEmptyFormData = (): FormValues => ({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    emailAddress: "",
    productName: "",
    purchaseDate: "",
    quantity: "",
    retailerName: "",
    purchaseLocation: "",
});

const getEmptyCaseData = (): CaseFormData => ({
    formData: getEmptyFormData(),
    paymentMethod: "",
    paymentDetails: "",
    hasConsent: false,
    signatureData: "",
});

type FormStore = FormState & {
    setCurrentCase: (index: number) => void;
    updateFormData: (caseId: string, fieldId: string, value: string) => void;
    updatePaymentMethod: (caseId: string, value: string) => void;
    updatePaymentDetails: (caseId: string, value: string) => void;
    updateConsent: (caseId: string, value: boolean) => void;
    updateSignature: (caseId: string, value: string) => void;
    setErrors: (errors: {
        consentError?: string;
        paymentMethodError?: string;
        signatureError?: string;
    }) => void;
    resetFormState: () => void;
    validateCurrentCase: () => boolean;
};

const initialState: FormState = {
    currentCaseIndex: 0,
    casesFormData: {},
    paymentMethod: "",
    paymentDetails: "",
    hasConsent: false,
    consentError: "",
    paymentMethodError: "",
    signatureData: "",
    signatureError: "",
};

export const useFormStore = create<FormStore>((set, get) => ({
    ...initialState,

    setCurrentCase: (index) => set({ currentCaseIndex: index }),

    updateFormData: (caseId, fieldId, value) =>
        set((state) => ({
            casesFormData: {
                ...state.casesFormData,
                [caseId]: {
                    ...(state.casesFormData[caseId] || getEmptyCaseData()),
                    formData: {
                        ...(state.casesFormData[caseId]?.formData ||
                            getEmptyFormData()),
                        [fieldId]: value,
                    },
                },
            },
        })),

    updatePaymentMethod: (caseId, value) =>
        set((state) => {
            const currentCaseData =
                state.casesFormData[caseId] || getEmptyCaseData();
            return {
                paymentMethod: value,
                paymentMethodError: "",
                casesFormData: {
                    ...state.casesFormData,
                    [caseId]: {
                        ...currentCaseData,
                        paymentMethod: value,
                    },
                },
            };
        }),

    updatePaymentDetails: (caseId, value) =>
        set((state) => {
            const currentCaseData =
                state.casesFormData[caseId] || getEmptyCaseData();
            return {
                paymentDetails: value,
                paymentMethodError: "",
                casesFormData: {
                    ...state.casesFormData,
                    [caseId]: {
                        ...currentCaseData,
                        paymentDetails: value,
                    },
                },
            };
        }),

    updateConsent: (caseId, value) =>
        set((state) => {
            const currentCaseData =
                state.casesFormData[caseId] || getEmptyCaseData();
            return {
                hasConsent: value,
                consentError: value ? "" : state.consentError,
                casesFormData: {
                    ...state.casesFormData,
                    [caseId]: {
                        ...currentCaseData,
                        hasConsent: value,
                    },
                },
            };
        }),

    updateSignature: (caseId, value) =>
        set((state) => {
            const currentCaseData =
                state.casesFormData[caseId] || getEmptyCaseData();
            return {
                signatureData: value,
                signatureError: value ? "" : state.signatureError,
                casesFormData: {
                    ...state.casesFormData,
                    [caseId]: {
                        ...currentCaseData,
                        signatureData: value,
                    },
                },
            };
        }),

    setErrors: (errors) =>
        set({
            consentError: errors.consentError ?? "",
            paymentMethodError: errors.paymentMethodError ?? "",
            signatureError: errors.signatureError ?? "",
        }),

    resetFormState: () =>
        set((state) => ({
            paymentMethod: "",
            paymentDetails: "",
            hasConsent: false,
            signatureData: "",
            consentError: "",
            paymentMethodError: "",
            signatureError: "",
            casesFormData: state.casesFormData,
        })),

    validateCurrentCase: () => {
        const state = get();
        let isValid = true;
        const errors: {
            consentError?: string;
            paymentMethodError?: string;
            signatureError?: string;
        } = {};

        if (!state.hasConsent) {
            errors.consentError =
                "You must agree to the consent statement to proceed.";
            isValid = false;
        }

        if (!state.signatureData || state.signatureData.trim() === "") {
            errors.signatureError = "Signature is required.";
            isValid = false;
        }

        const paymentValidation = validatePaymentDetails(
            state.paymentMethod,
            state.paymentDetails
        );
        if (!paymentValidation.isValid) {
            errors.paymentMethodError =
                paymentValidation.error ||
                "Please enter valid payment details.";
            isValid = false;
        }

        if (!isValid) {
            set({
                consentError: errors.consentError,
                paymentMethodError: errors.paymentMethodError,
                signatureError: errors.signatureError,
            });
        }

        return isValid;
    },
}));
