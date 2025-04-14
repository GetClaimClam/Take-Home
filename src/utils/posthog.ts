"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export const isPostHogAvailable = (): boolean => {
    if (typeof window === "undefined") return false;
    return posthog && posthog.isFeatureEnabled !== undefined;
};

export const captureEvent = (eventName: string, properties = {}): void => {
    if (isPostHogAvailable()) {
        posthog.capture(eventName, properties);
    }
};

export const resetPostHogIdentity = (): void => {
    if (isPostHogAvailable()) {
        posthog.reset();
    }
};

export const identifyUser = (userId: string, userProperties = {}): void => {
    if (isPostHogAvailable()) {
        posthog.identify(userId, userProperties);
    }
};

export const getFeatureFlagValue = (
    flagName: string,
    defaultValue: string | boolean = "control"
): string | boolean => {
    if (!isPostHogAvailable()) {
        return defaultValue;
    }

    const value = posthog.getFeatureFlag(flagName);
    return value !== undefined ? value : defaultValue;
};

export { posthog, PostHogProvider };
