/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-dm-sans)"],
            },
            fontSize: {
                h1: "var(--fs-h1)",
            },
            colors: {
                gray: {
                    100: "#F5F5F7",
                    300: "#CDD0D4",
                    900: "#54565B",
                },
                "main-blue": {
                    50: "#eef4ff",
                    100: "#d9e8ff",
                    200: "#bcd5ff",
                    300: "#8eb9ff",
                    500: "#4075ff",
                    600: "#1437f7",
                    700: "#1432d1",
                    800: "#142b9f",
                    900: "#142878",
                    950: "#0c1542",
                },
                "error-red": {
                    500: "#ca0000",
                },
                typography: {
                    400: "#9CA3AF", // Black-400 Blue
                    500: "#707070", // Black-500
                    800: "#474F64", // Black-800
                    900: "#333333", // Black-950
                    black: "#131313", // Pure Black
                },
                "blue-gray": {
                    50: "#F8FAFC",
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8",
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155",
                    800: "#1E293B",
                    900: "#0F172A",
                },
            },
        },
    },
    plugins: [],
};
