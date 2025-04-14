"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanupAuthState } from "@/utils/auth";
import { api } from "@/api-client";
import { handleEmailVerification } from "@/utils/auth0-email-verification";

// Define interface for Auth0 error structure
interface Auth0Error {
    error: string;
    error_description: string;
}

// Component that uses the useSearchParams hook
function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { error, isAuthenticated, getIdTokenClaims } = useAuth0();
    const [statusMessage, setStatusMessage] = useState("Completing sign in...");
    const [isLoading, setIsLoading] = useState(true);
    const [authAttempted, setAuthAttempted] = useState(false);

    // Handle authentication flow
    useEffect(() => {
        const processAuthentication = async () => {
            // Log key information for debugging
            console.log("Callback debug:", {
                error: error ? (error as unknown as Auth0Error).error : null,
                errorDesc: error ? (error as unknown as Auth0Error).error_description : null,
                isAuthenticated,
                hasCode: searchParams?.has("code"),
                hasState: searchParams?.has("state"),
                urlParams: Object.fromEntries([...Array.from(searchParams?.entries() || [])])
            });

            // Try to handle as email verification first
            try {
                // Check if this is an email verification link with state error
                const code = searchParams?.get("code");
                
                if (await handleEmailVerification(error as unknown as Auth0Error, code)) {
                    // Email verification was successful
                    setStatusMessage("Email verification successful! Redirecting...");
                    setTimeout(() => {
                        router.push("/cases");
                    }, 1000);
                    return;
                }
            } catch (err) {
                console.error("Email verification handling failed:", err);
                setStatusMessage("Verification failed");
                setTimeout(() => {
                    router.push("/auth/error?error=email_verification&message=Email+verification+failed.+Please+try+logging+in+normally.");
                }, 2000);
                return;
            }

            // Handle normal authentication flow errors
            if (error) {
                console.error("Auth0 error:", error);
                cleanupAuthState();
                router.push("/auth/error");
                return;
            }

            // Handle normal authentication flow
            try {
                if (isAuthenticated) {
                    setStatusMessage("Getting authentication token...");
                    
                    // Get the Auth0 ID token
                    const claims = await getIdTokenClaims();
                    const idToken = claims?.__raw;

                    if (!idToken) {
                        throw new Error("Failed to get ID token");
                    }

                    setStatusMessage("Exchanging token with server...");
                    
                    // Exchange the token
                    await api.auth.postApiV1AuthLogin({ token: idToken });
                    
                    setStatusMessage("Login successful! Redirecting...");
                    setTimeout(() => {
                        // Get the stored redirect URL, fallback to cases
                        let redirectUrl = "/cases";
                        const storedRedirectUrl = localStorage.getItem("auth_redirect_url");
                        if (storedRedirectUrl) {
                            redirectUrl = storedRedirectUrl;
                            localStorage.removeItem("auth_redirect_url");
                        }
                        router.push(redirectUrl);
                    }, 1000);
                    
                    setAuthAttempted(true);
                } else {
                    // Set a timeout to prevent hanging
                    if (!authAttempted) {
                        const authTimeout = setTimeout(() => {
                            console.error("Auth timeout - no authentication completed");
                            cleanupAuthState();
                            router.push("/auth/error");
                        }, 10000);
                        
                        return () => clearTimeout(authTimeout);
                    }
                }
            } catch (err) {
                console.error("Authentication error:", err);
                setStatusMessage("Authentication failed");
                setIsLoading(false);
                cleanupAuthState();
                setTimeout(() => {
                    router.push("/auth/error");
                }, 2000);
            }
        };
        
        processAuthentication();
    }, [router, error, isAuthenticated, getIdTokenClaims, authAttempted, searchParams]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-xl font-semibold mb-4">
                    {statusMessage}
                </h1>
                {isLoading && (
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
                )}
            </div>
        </div>
    );
}

// Main page component that wraps the content with Suspense
export default function CallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-xl font-semibold mb-4">
                        Loading authentication...
                    </h1>
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
                </div>
            </div>
        }>
            <CallbackContent />
        </Suspense>
    );
}
