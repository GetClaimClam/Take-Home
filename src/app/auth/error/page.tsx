"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { ErrorIcon } from "@/components/ui/icons/ErrorIcon";
import { cleanupAuthState, handleAuthError } from "@/utils/auth";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

// Create a client component that uses the useSearchParams hook
function AuthErrorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { loginWithRedirect, error } = useAuth0();
    const [customMessage, setCustomMessage] = useState<string | null>(null);

    useEffect(() => {
        // Clean up Auth0 state
        cleanupAuthState();
        
        // Check for custom error messages from URL parameters
        const errorType = searchParams?.get("error");
        const message = searchParams?.get("message");
        
        if (errorType === "email_link" && message) {
            setCustomMessage(decodeURIComponent(message));
        }
    }, [searchParams]);

    const handleRetry = async () => {
        await loginWithRedirect();
    };

    const handleGoHome = () => {
        router.push("/");
    };

    // Use custom message if available, otherwise use default error handling
    const errorMessage = customMessage || handleAuthError(error);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8F8FA]">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-6">
                    <ErrorIcon className="w-12 h-12" />
                </div>

                <h1 className="text-2xl font-semibold text-center mb-4 text-gray-900">
                    Authentication Error
                </h1>

                <p className="text-center mb-8 text-gray-600">{errorMessage}</p>

                <div className="flex flex-col space-y-3">
                    <PrimaryButton onClick={handleRetry}>
                        Try Again
                    </PrimaryButton>
                    <SecondaryButton onClick={handleGoHome}>
                        Return to Home
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}

// Main page component that wraps the content with Suspense
export default function AuthErrorPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-[#F8F8FA]">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <AuthErrorContent />
        </Suspense>
    );
}
