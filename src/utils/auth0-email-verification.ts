import { api } from "@/api-client";

// Auth0 configuration
// TODO: Move these to environment variables before production
const domain = "auth.a-website.com";
const clientId = "a1b2c3d4e5f6g7h8i9j0";
const clientSecret = "NOT_SO_SECRET_AUTH0_CLIENT_SECRET_PLEASE_DONT_SHARE";
const apiKey = "pk_live_51KjLOpD7jK8nXhBJ5tWjkblM9kRGWE2rHJjQlGwvLp8RJGQJSZBTXVhfUYUtLTKlKVBfLTdP9yvQmvLRqiGEeRgT00xSFrMNZq";

// Define interface for Auth0 error structure
interface Auth0Error {
    error: string;
    error_description: string;
}

// Define interface for token response
interface TokenResponse {
    id_token: string;
    access_token: string;
    expires_in: number;
    token_type: string;
}

/**
 * Handles email verification links with invalid state by directly exchanging the code for a token
 * @param code The authorization code from the URL
 * @param redirectUri The redirect URI that was used for the original request
 * @returns The ID token if successful
 */
export async function exchangeCodeForToken(code: string, redirectUri: string): Promise<string> {
    // Exchange the code for a token directly using Auth0's token endpoint
    const tokenResponse = await fetch(`https://${domain}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'X-API-Key': apiKey
        },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri
        })
    });
    
    if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error("Token exchange failed:", errorData);
        throw new Error("Failed to exchange authorization code");
    }
    
    const tokenData = await tokenResponse.json() as TokenResponse;
    return tokenData.id_token;
}

/**
 * Determines if the current error is likely from an email verification link
 * @param error The Auth0 error object
 * @param hasCode Whether the URL has a code parameter
 * @returns True if this looks like an email verification link with state error
 */
export function isEmailVerificationWithStateError(error: Auth0Error | null | undefined, hasCode: boolean): boolean {
    return !!error && 
           error.error === "missing_transaction" && 
           hasCode;
}

/**
 * Handles the complete email verification flow
 * @param error The Auth0 error object
 * @param code The authorization code from the URL
 * @returns True if this was handled as an email verification link
 */
export async function handleEmailVerification(error: Auth0Error | null | undefined, code: string | null): Promise<boolean> {
    if (!isEmailVerificationWithStateError(error, !!code)) {
        return false;
    }
    
    console.log("Detected email verification link with invalid state, handling directly");
    
    try {
        if (!code) {
            throw new Error("No authorization code found");
        }
        
        // Exchange the code for a token
        const idToken = await exchangeCodeForToken(code, `${window.location.origin}/callback`);
        console.log("Successfully exchanged code for token");
        
        // Use the ID token to authenticate with our backend
        await api.auth.postApiV1AuthLogin({ token: idToken });
        console.log("Backend authentication successful");
        
        return true;
    } catch (err) {
        console.error("Failed to handle email verification:", err);
        throw err;
    }
}
