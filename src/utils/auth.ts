import { resetPostHogIdentity } from "./posthog";

export const cleanupAuthState = (): void => {
    resetPostHogIdentity();

    localStorage.removeItem("auth0.is.authenticated");
};

export const handleAuthError = (error: Error | null | undefined): string => {
    if (error && process.env.NODE_ENV === "development") {
        console.error("Auth error:", error);
    }

    return "We encountered an issue while signing you in. Please try again.";
};
