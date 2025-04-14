import { z } from "zod";

export const formValuesSchema = z
    .object({
        firstName: z.string().min(1),
        middleInitial: z.string().optional(),
        lastName: z.string().min(1),
        address: z.string().min(1),
        aptSuite: z.string().optional(),
        city: z.string().min(1),
        state: z.string().min(1),
        zipCode: z.string().min(1),
        phoneNumber: z.string().min(1),
        emailAddress: z.string().email(),
        productName: z.string().min(1),
        purchaseDate: z.string().min(1),
        quantity: z.string().min(1),
        retailerName: z.string().min(1),
        purchaseLocation: z.string().min(1),
    })
    .and(z.record(z.string(), z.string()));

export type FormValues = z.infer<typeof formValuesSchema>;

export const caseFormDataSchema = z.object({
    formData: formValuesSchema,
    paymentMethod: z.string(),
    paymentDetails: z.string(),
    hasConsent: z.boolean(),
    signatureData: z.string().min(1, "Signature is required"),
});

export type CaseFormData = z.infer<typeof caseFormDataSchema>;

export type CasesFormDataRecord = Record<string, CaseFormData>;

export const paymentDetailsSchema = z.object({
    paymentMethod: z.string().min(1, "Please select a payment method."),
    paymentDetails: z.string().min(1, "Payment details cannot be empty."),
    hasConsent: z.boolean().refine((val) => val === true, {
        message: "You must agree to the consent statement to proceed.",
    }),
});

export type PaymentDetails = z.infer<typeof paymentDetailsSchema>;

export const requiresEmailValidation = (
    paymentMethod: string,
    paymentDetails: string
) => {
    return (
        ["amazon", "virtual-mastercard"].includes(paymentMethod) ||
        (paymentMethod === "zelle" && paymentDetails?.includes("@"))
    );
};

export interface FormState {
    currentCaseIndex: number;
    casesFormData: CasesFormDataRecord;
    paymentMethod: string;
    paymentDetails: string;
    hasConsent: boolean;
    consentError: string;
    paymentMethodError: string;
    signatureData: string;
    signatureError: string;
}
