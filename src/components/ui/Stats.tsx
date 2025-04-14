interface Stat {
    id: number;
    name: string;
    value: string;
}

interface StatsProps {
    stats: Stat[];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => (
    <div className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl">
            <dl className="grid grid-cols-2  xl:grid-cols-3 gap-x-8 gap-y-16 text-center sm:text-left">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className={`mx-auto flex max-w-xs flex-col gap-y-4 ${
                            stat.id === 4 ? "md:hidden" : ""
                        }`}
                    >
                        <dt className="text-base/7 text-gray-600">
                            {stat.name}
                        </dt>
                        <dd className="order-first text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>
);
