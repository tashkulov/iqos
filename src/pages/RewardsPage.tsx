import RewardCard from "../components/RewardCard";
import MainLayout from "../components/MainLayout.tsx";

const rewards = [
    {
        id: "1",
        title: "Яндекс.Станция",
        description:
            "Умная колонка с голосовым помощником, которая позволяет управлять устройствами умного дома, слушать музыку и получать информацию в режиме реального времени.",
        image: "/rewards/yandex_station.png",
    },
    {
        id: "2",
        title: "Яндекс.Станция",
        description:
            "Умная колонка с голосовым помощником, которая позволяет управлять устройствами умного дома, слушать музыку и получать информацию в режиме реального времени.",
        image: "/rewards/yandex_station.png",
    },
    {
        id: "3",
        title: "Яндекс.Станция",
        description:
            "Умная колонка с голосовым помощником, которая позволяет управлять устройствами умного дома, слушать музыку и получать информацию в режиме реального времени.",
        image: "/rewards/yandex_station.png",
    },
];

const RewardsPage = () => {
    return (
        <MainLayout>
        <div className="flex bg-[#f0ffff] min-h-screen">
            <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Информация о пользователях
                </h2>

                <div className="mb-4">
                    <button className="w-full bg-[#00C8B3] hover:bg-[#00b4a1] text-white py-2 px-4 rounded-full text-sm font-medium">
                        + Добавить награду
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rewards.map((reward) => (
                        <RewardCard key={reward.id} reward={reward} />
                    ))}
                </div>
            </div>
        </div>
        </MainLayout>

    );
};

export default RewardsPage;
