"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { usePostHog } from "posthog-js/react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain =
    process.env.NEXT_PUBLIC_AUTH_DOMAIN || "auth.a-website.com";
const clientId =
    process.env.NEXT_PUBLIC_AUTH_CLIENT_ID ||
    "YOUR_AUTH0_CLIENT_ID";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    const [isPostHogInitialized, setIsPostHogInitialized] = useState(false);

    useEffect(() => {
        const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

        if (posthogApiKey) {
            try {
                posthog.init(posthogApiKey, {
                    api_host: posthogHost,
                    person_profiles: "identified_only",
                    capture_pageview: false,
                    loaded: () => {
                        setIsPostHogInitialized(true);
                        if (process.env.NODE_ENV === "development") {
                            console.info("PostHog initialized successfully");
                        }
                    },
                    bootstrap: {
                        featureFlags: {
                            "new-feature-flag": "control",
                        },
                    },
                });
            } catch (error) {
                console.warn("PostHog initialization failed:", error);
                setIsPostHogInitialized(false);
            }
        } else if (process.env.NODE_ENV === "development") {
            console.info(
                "PostHog API key not found. PostHog features are disabled."
            );
        }
    }, []);

    if (!isPostHogInitialized) {
        return <>{children}</>;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: `${window.location.origin}/callback`,
            }}
            useRefreshTokens={true}
            cacheLocation="localstorage"
            skipRedirectCallback={window.location.pathname === '/callback'}
            onRedirectCallback={(appState) => {
                console.log("Auth0 redirect callback triggered:", {
                    appState,
                    currentPath: window.location.pathname,
                    hasCode: window.location.search.includes('code='),
                    hasState: window.location.search.includes('state=')
                });
            }}
        >
            <PHProvider client={posthog}>
                <SuspendedPostHogPageView />
                {children}
            </PHProvider>
        </Auth0Provider>
    );
}

function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    // Track pageviews
    useEffect(() => {
        if (pathname && posthog) {
            let url = window.origin + pathname;
            if (searchParams?.toString()) {
                url = url + "?" + searchParams.toString();
            }

            posthog.capture("$pageview", { $current_url: url });
        }
    }, [pathname, searchParams, posthog]);

    return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
    return (
        <Suspense fallback={null}>
            <PostHogPageView />
        </Suspense>
    );
}
