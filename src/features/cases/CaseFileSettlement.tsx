import { PrimaryButton } from "@/components/ui/buttons";
import Image from "next/image";

export const CaseFileSettlement: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-center bg-white border border-gray-300 rounded-[10px] w-12 h-12 mb-4">
                <Image
                    src={"/icons/files.svg"}
                    height={24}
                    width={24}
                    alt="email"
                />
            </div>
            <span className="text-[#181D27] font-bold text-base">
                Maximise your settlement
            </span>
            <span className="text-[#535862] font-medium text-sm mt-2 text-center">
                Your rights matter, and at Chariot Claims, our focus is on you. Even
                though we aren’t directly linked to this case, we encourage you
                to file for your class actions!
            </span>

            <div>
                <PrimaryButton
                    onClick={() => alert("Not implemented yet")}
                    className="p-2 w-full min-w-[150px] h-[46px] mt-6 sm:w-[360px] sm:p-0"
                >
                    File My Claim
                </PrimaryButton>
            </div>
        </>
    );
};
