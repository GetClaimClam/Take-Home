import casesData from "@/data/cases.json";
import { DirectCaseLoader } from "@/features/cases/DirectCaseLoader";

interface PageParams {
    id: string;
}

export function generateStaticParams() {
    return casesData.map((caseItem) => ({
        id: caseItem.id.toString(),
    }));
}

export default async function FormById({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { id } = await params;

    const caseId = parseInt(id, 10);

    return <DirectCaseLoader caseId={caseId} />;
}
