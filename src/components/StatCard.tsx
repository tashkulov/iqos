import type {ReactNode} from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    delta: string;
    icon?: ReactNode;
}

const StatCard = ({ title, value, delta, icon }: StatCardProps) => {
    const isPositive = delta.startsWith("+");

    return (
        <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-4 justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-xs text-gray-500 uppercase">{title}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
                </div>
                {icon && (
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl">
                        {icon}
                    </div>
                )}
            </div>

            <div className="border-t border-dashed border-gray-200 pt-2">
                <div className={isPositive ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                    {delta}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
