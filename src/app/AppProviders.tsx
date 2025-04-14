"use client";

import React from "react";
import { PostHogProvider } from "./providers";
import { IDBInitializer } from "../store/IDBInitializer";

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <PostHogProvider>
            <IDBInitializer />
            {children}
        </PostHogProvider>
    );
};
