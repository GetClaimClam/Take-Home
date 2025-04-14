import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { AppProviders } from "./AppProviders";

import { GoogleAnalytics } from "@next/third-parties/google";

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-manrope",
});

const aeonik = localFont({
    src: [
        {
            path: "./fonts/Aeonik/Aeonik-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/Aeonik/Aeonik-Medium.woff2",
            weight: "500",
            style: "normal",
        },
    ],
    variable: "--font-aeonik",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sample Cases App - Get the money you deserve",
    description: "Sample Cases App provides a safe and transparent process for claiming funds from class action settlements.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased ${manrope.className} ${aeonik.variable} bg-[#F8F8FA]`}
            >
                <AppProviders>{children}</AppProviders>
                <GoogleAnalytics
                    gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
                />
            </body>
        </html>
    );
}
