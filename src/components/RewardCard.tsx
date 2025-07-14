import { FaTrash, FaPen } from "react-icons/fa";
import image from "../assets/img.png";

interface Reward {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface Props {
    reward: Reward;
}

const RewardCard = ({ reward }: Props) => {
    return (
        <div className="relative bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md">
            <button
                className="absolute top-4 left-4 bg-[#F6F9FF] p-2 rounded shadow-sm hover:shadow-md transition"
                title="Удалить"
            >
                <FaTrash size={14} className="text-[#91A1C1]" />
            </button>

            {/* Кнопка редактирования */}
            <button
                className="absolute top-4 right-4 bg-[#F6F9FF] p-2 rounded shadow-sm hover:shadow-md transition"
                title="Редактировать"
            >
                <FaPen size={14} className="text-[#91A1C1]" />
            </button>

            <img
                src={image}
                alt={reward.title}
                className="w-[100px] h-[100px] object-contain mb-4"
            />

            <h3 className="text-[18px] font-semibold text-[#222E3A] mb-2">
                {reward.title}
            </h3>

            {/* Описание */}
            <p className="text-sm text-[#8492A6] max-w-xs leading-relaxed">
                {reward.description}
            </p>
        </div>
    );
};

export default RewardCard;
