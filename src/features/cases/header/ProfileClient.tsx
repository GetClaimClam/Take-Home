"use client";

import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginIcon } from "./LoginIcon";
import { DropdownArrow } from "@/components/ui/icons/DropdownArrow";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui/buttons";

export default function ProfileClient() {
    const { user, isLoading, loginWithRedirect, logout } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);

    if (isLoading) {
        return <div className="hidden md:block">Loading...</div>;
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return user ? (
        <div>
            <DropdownMenu
                isOpen={isOpen}
                align="right"
                width="w-48"
                onClose={closeDropdown}
                trigger={
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-2 focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                    >
                        <Image
                            src={user.picture || ""}
                            alt={user.name || ""}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <DropdownArrow isOpen={isOpen} />
                    </button>
                }
                className=""
            >
                <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                    onClick={() =>
                        logout({
                            logoutParams: { returnTo: window.location.origin },
                        })
                    }
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Log Out
                </button>
            </DropdownMenu>
        </div>
    ) : (
        <div>
            <PrimaryButton
                onClick={() => loginWithRedirect()}
                fullWidth={false}
                svg={() => <LoginIcon />}
                className="bg-main-blue-500 hover:bg-main-blue-400"
            >
                Sign In
            </PrimaryButton>
        </div>
    );
}
