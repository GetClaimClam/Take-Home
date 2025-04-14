"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || (href !== "/" && pathname?.startsWith(href));

    return (
        <Link href={href}>
            <span
                className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-main-blue-600" : "hover:text-main-blue-600"
                )}
                aria-current={isActive ? "page" : undefined}
            >
                {children}
            </span>
        </Link>
    );
};
