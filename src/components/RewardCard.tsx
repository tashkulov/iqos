import editIcon from "../assets/icon/edit.svg";
import deleteIcon from "../assets/icon/delete.svg";
import rewardImg from '../assets/img.png';
interface Reward {
    id: string;
    title: string;
    description: string;
    image?: string;
}

interface Props {
    reward: Reward;
    onEdit: () => void;
    onDelete: () => void;
}

const RewardCard = ({ reward, onEdit, onDelete }: Props) => {
    return (
        <div className="relative group w-full h-[350px] bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center transition hover:shadow-md">
            <button
                className="absolute top-2 left-2 bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md opacity-0 group-hover:opacity-100 transition"
                onClick={onEdit}
                title="Редактировать награду"
            >
                <img src={editIcon} alt="edit" />
            </button>

            <button
                className="absolute top-2 right-2 bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md opacity-0 group-hover:opacity-100 transition"
                onClick={onDelete}
                title="Удалить награду"
            >
                <img src={deleteIcon} alt="delete" />
            </button>

            <img
                src={reward.image ||  rewardImg}
                alt={reward.title}
                className="w-[160px] h-[160px] object-contain mb-4"
            />

            <h3 className="text-[18px] font-semibold text-[#222E3A] mb-2">
                {reward.title}
            </h3>

            <p className="text-sm text-[#8492A6] leading-relaxed max-w-[320px]">
                {reward.description}
            </p>
        </div>
    );
};

export default RewardCard;
