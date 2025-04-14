export default function FeaturesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-[#F8F8FA]">
            <main>{children}</main>
        </div>
    );
}
