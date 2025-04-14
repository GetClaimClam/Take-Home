"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCounterStore } from "../../store/useCounterStore";
import { useFormStore } from "../../store/useFormStore";
import casesData from "../../data/cases.json";
import { Header } from "./header/Header";
import { useRouter } from "next/navigation";
import { FormValues } from "@/types/forms";
// import { paymentMethodOptions } from "./formFields";
import { FormHeader } from "./form-components/FormHeader";
// import { PersonalInfoStep } from "./form-components/PersonalInfoStep";
// import { ProductInfoStep } from "./form-components/ProductInfoStep";
// import { PaymentMethodSection } from "./form-components/PaymentMethodSection";
// import { SignatureSection } from "./form-components/SignatureSection";
// import { ConsentSection } from "./form-components/ConsentSection";
import { useSelectedCases } from "./hooks/useSelectedCases";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
// import Image from "next/image";
import { CaseGoogleConnect } from "./CaseGoogleConnect";
import { CaseFileSettlement } from "./CaseFileSettlement";

interface FormPageProps {
    initialCaseId?: number;
}

export const FormPage: React.FC<FormPageProps> = ({ initialCaseId }) => {
    const router = useRouter();
    const toggleCase = useCounterStore((state) => state.toggleCase);

    // Get selected cases information
    const { selectedCases, currentCase, currentCaseIndex, isLastCase } =
        useSelectedCases();

    const targetCase = initialCaseId
        ? casesData.find((c) => c.id === initialCaseId)
        : null;

    const {
        // register,
        // setValue,
        // trigger,
        reset,
        // formState: { errors },
    } = useForm<FormValues>({
        mode: "onBlur",
    });

    // Get form data from store
    const {
        casesFormData,
        //TODO temporarily off this methods
        // paymentMethod,
        // paymentDetails,
        // paymentMethodError,
        // hasConsent,
        // consentError,
        // signatureData,
        // signatureError,
        // updateFormData,
        // updatePaymentMethod,
        // updatePaymentDetails,
        // updateConsent,
        // updateSignature,
        // validateCurrentCase,
        setErrors,
        setCurrentCase,
        resetFormState,
    } = useFormStore();

    // Handle initial case loading
    useEffect(() => {
        if (
            initialCaseId &&
            targetCase &&
            !selectedCases.some((c) => c.id === initialCaseId)
        ) {
            toggleCase(initialCaseId, targetCase.payout_amount);
        }
    }, [initialCaseId, targetCase, selectedCases, toggleCase]);

    useEffect(() => {
        if (initialCaseId && selectedCases.length > 0) {
            const caseIndex = selectedCases.findIndex(
                (c) => c.id === initialCaseId
            );
            if (caseIndex !== -1 && caseIndex !== currentCaseIndex) {
                setCurrentCase(caseIndex);
            }
        }
    }, [initialCaseId, selectedCases, currentCaseIndex, setCurrentCase]);

    const resetFormStateAndReset = useCallback(() => {
        reset({});
        resetFormState();
    }, [reset, resetFormState]);

    // Get current form data for the current case
    // const currentFormData =
    //     casesFormData[currentCase.id.toString()]?.formData || {};

    //TODO temporarily off this handlers
    // const handleInputChange = (id: keyof FormValues, value: string) => {
    //     updateFormData(currentCase.id.toString(), id, value);
    //     setValue(id, value);
    //     if (value.trim() !== "") {
    //         trigger(id);
    //     }
    // };

    // const handlePaymentMethodChange = (method: string) => {
    //     updatePaymentMethod(currentCase.id.toString(), method);
    // };

    // const handlePaymentDetailsChange = (details: string) => {
    //     updatePaymentDetails(currentCase.id.toString(), details);
    // };

    // const handleConsentChange = (value: boolean) => {
    //     updateConsent(currentCase.id.toString(), value);
    // };

    // const handleSignatureChange = (signature: string) => {
    //     updateSignature(currentCase.id.toString(), signature);
    // };

    const handleNextCase = async () => {
        setErrors({});

        //TODO temporarily off this validation
        // let hasErrors = false;

        // const isValid = await trigger();
        // if (!isValid) {
        //     hasErrors = true;
        // }

        // if (!validateCurrentCase()) {
        //     hasErrors = true;
        // }

        // if (hasErrors) {
        //     console.log("fff 1");
        //     return;
        // }

        if (currentCaseIndex < selectedCases.length - 1) {
            resetFormStateAndReset();
            setCurrentCase(currentCaseIndex + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            console.log("All claims submitted!", casesFormData);
            router.push("/cases");
        }
    };

    const handlePreviousCase = () => {
        if (currentCaseIndex > 0) {
            resetFormStateAndReset();
            setCurrentCase(currentCaseIndex - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            router.push("/cases");
        }
    };

    // Return early if no case is available
    if (!currentCase) {
        if (initialCaseId && targetCase) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <p>Loading case...</p>
                </div>
            );
        }
        return null;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col gap-9 items-center max-sm:px-4">
                <div className="sm:w-[560px] mx-auto pt-8 pb-8">
                    <div className="mb-6">
                        <SecondaryButton
                            className="w-fit flex items-center gap-2 text-gray-500"
                            onClick={() => router.push("/cases")}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 12L6 8L10 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Back to Cases
                        </SecondaryButton>
                    </div>

                    <FormHeader
                        currentCase={currentCase}
                        currentCaseIndex={currentCaseIndex}
                        totalCases={selectedCases.length}
                    />

                    <div className="flex flex-col items-center py-8 px-6 border border-[#DEE2E6] rounded-2xl bg-white">
                        {currentCase.is_premium ? (
                            <CaseGoogleConnect
                                link_to_survey={currentCase.link_to_survey}
                            />
                        ) : (
                            <CaseFileSettlement />
                        )}
                    </div>

                    {/* //TODO temporarily off this form
                     <PersonalInfoStep
                        currentCase={currentCase}
                        formData={currentFormData}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        onInputChange={handleInputChange}
                    />

                    <ProductInfoStep
                        currentCase={currentCase}
                        formData={currentFormData}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        onInputChange={handleInputChange}
                    />

                    <PaymentMethodSection
                        paymentMethod={paymentMethod}
                        paymentDetails={paymentDetails}
                        paymentMethodError={paymentMethodError}
                        paymentMethodOptions={paymentMethodOptions}
                        updatePaymentMethod={handlePaymentMethodChange}
                        updatePaymentDetails={handlePaymentDetailsChange}
                    />

                    <div className="mt-8 mb-6">
                        <SignatureSection
                            signatureData={signatureData}
                            signatureError={signatureError}
                            updateSignature={handleSignatureChange}
                        />
                    </div>

                    <div className="mt-6">
                        <ConsentSection
                            hasConsent={hasConsent}
                            consentError={consentError}
                            updateConsent={handleConsentChange}
                        />
                    </div> */}

                    <div className="flex justify-end gap-4 mt-8">
                        <SecondaryButton
                            className="bg-[#EDEEF3] h-11 font-extrabold text-base border border-[#CBD5E1]"
                            fullWidth={false}
                            onClick={handlePreviousCase}
                            disabled={currentCaseIndex === 0}
                        >
                            Go Back
                        </SecondaryButton>
                        <PrimaryButton
                            className="bg-main-blue-500 h-11 font-extrabold text-base"
                            fullWidth={false}
                            onClick={handleNextCase}
                            id="form-submit-button"
                        >
                            {isLastCase ? "Submit Claims" : "Next Claim"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};
