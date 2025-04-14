import { PrimaryButton } from "@/components/ui/buttons";
import Image from "next/image";

export const CaseGoogleConnect: React.FC<{ link_to_survey: string }> = ({
    link_to_survey,
}) => {
    return (
        <>
            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-[10px] w-12 h-12 mb-4">
                <Image
                    src={"/icons/email.svg"}
                    height={24}
                    width={24}
                    alt="email"
                />
            </div>
            <span className="text-[#181D27] font-bold text-base">
                This case requires email qualification
            </span>
            <span className="text-[#535862] font-medium text-sm mt-2">
                Please connect your Google account
            </span>

            <div>
                <PrimaryButton
                    onClick={() => alert("Not implemented yet")}
                    className="p-2 w-full h-[46px] my-6 sm:w-[360px] sm:p-0"
                    svg={() => (
                        <Image
                            src={"/icons/google.svg"}
                            height={16}
                            width={16}
                            alt="google"
                        />
                    )}
                >
                    Connect Google Account
                </PrimaryButton>
            </div>

            <div>
                <span className="text-gray-900">
                    OR fill out our form manually
                </span>

                <a
                    href={link_to_survey}
                    target="_blank"
                    className="cursor-pointer ml-1 font-bold text-main-blue-600 text-base underline"
                >
                    here
                </a>
            </div>
        </>
    );
};
