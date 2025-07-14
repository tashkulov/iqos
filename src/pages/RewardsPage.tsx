import RewardCard from "../components/RewardCard";
import MainLayout from "../components/MainLayout.tsx";
import DeleteModal from "../components/modals/DeleteModal";
import EditModal from "../components/modals/EditModal";
import { useState } from "react";

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
    type RewardBase = typeof rewards[number];
    type Reward = RewardBase & {
        color?: string;
        qr?: string;
        condition?: string;
        capsuleOrCollection?: string;
    };
    const [rewardsList, setRewardsList] = useState<Reward[]>(rewards);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);
    const handleDeleteClick = (reward: Reward) => {
        setRewardToDelete(reward);
        setDeleteModalOpen(true);
    };
    const handleConfirmDelete = () => {
        if (rewardToDelete) {
            setRewardsList(prev => prev.filter(r => r.id !== rewardToDelete.id));
            setRewardToDelete(null);
            setDeleteModalOpen(false);
        }
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setRewardToDelete(null);
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [rewardToEdit, setRewardToEdit] = useState<Reward | null>(null);
    const handleEditClick = (reward: Reward) => {
        setRewardToEdit(reward);
        setEditModalOpen(true);
    };
    const handleSaveEdit = (values: { name: string; color: string; description: string; avatarUrl?: string; avatarUrl2?: string; condition?: string; capsuleOrCollection?: string }) => {
        if (rewardToEdit) {
            setRewardsList(prev => prev.map(r =>
                r.id === rewardToEdit.id
                    ? {
                        ...r,
                        title: values.name,
                        description: values.description,
                        color: values.color,
                        image: values.avatarUrl || r.image,
                        qr: values.avatarUrl2 || r.qr,
                        condition: values.condition,
                        capsuleOrCollection: values.capsuleOrCollection,
                    }
                    : r
            ));
            setEditModalOpen(false);
            setRewardToEdit(null);
        }
    };
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setRewardToEdit(null);
    };

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
                    {rewardsList.map((reward) => (
                        <div key={reward.id} className="relative group">
                            <RewardCard reward={reward} />
                            <button
                                className="absolute top-2 right-2 bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-red-400 opacity-0 group-hover:opacity-100 transition"
                                onClick={() => handleDeleteClick(reward)}
                                title="Удалить награду"
                            >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z" fill="currentColor"/></svg>
                            </button>
                            <button
                                className="absolute top-2 left-2 bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-[#00C8B3] opacity-0 group-hover:opacity-100 transition"
                                onClick={() => handleEditClick(reward)}
                                title="Редактировать награду"
                            >
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 21h16M12 17v-6m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <DeleteModal isOpen={deleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} title="Удалить награду" />
        {rewardToEdit && (
            <EditModal
                isOpen={editModalOpen}
                onClose={handleCloseEditModal}
                onSave={handleSaveEdit}
                initialValues={{
                    name: rewardToEdit.title,
                    color: rewardToEdit.color || '',
                    description: rewardToEdit.description,
                    avatarUrl: rewardToEdit.image,
                    avatarUrl2: rewardToEdit.qr || '',
                    condition: rewardToEdit.condition || '',
                    capsuleOrCollection: rewardToEdit.capsuleOrCollection || '',
                }}
                title="Редактировать награду"
                showSecondAvatar={true}
                labelSecondAvatar="QR-CODE для AR (PNG, JPG)"
            />
        )}
        </MainLayout>

    );
};

export default RewardsPage;
