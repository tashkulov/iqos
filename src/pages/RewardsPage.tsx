import RewardCard from "../components/RewardCard";
import MainLayout from "../components/MainLayout.tsx";
import DeleteModal from "../components/modals/DeleteModal";
import EditModal from "../components/modals/EditModal";
import { useState } from "react";
import type {Option} from "../components/CustomMultiSelect.tsx";

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
];

const RewardsPage = () => {
    type RewardBase = typeof rewards[number];
    type Reward = RewardBase & {
        color?: string;
        qr?: string;
        condition?: string;
        capsuleOrCollection?: string;
        capsules?: Option[];
        collections?: Option[];
    };


    const [rewardsList, setRewardsList] = useState<Reward[]>(rewards);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [rewardToEdit, setRewardToEdit] = useState<Reward | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);

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

    const handleEditClick = (reward: Reward) => {
        setRewardToEdit(reward);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (values: {
        name: string;
        color: string;
        description: string;
        avatarUrl?: string;
        avatarUrl2?: string;
        condition?: string;
        capsuleOrCollection?: string;
    }) => {
        if (rewardToEdit) {
            setRewardsList(prev =>
                prev.map(r =>
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
                )
            );
            setEditModalOpen(false);
            setRewardToEdit(null);
        }
    };

    const handleSaveCreate = (values: {
        name: string;
        color: string;
        description: string;
        avatarUrl?: string;
        avatarUrl2?: string;
        condition?: string;
        capsuleOrCollection?: string;
        capsules?: Option[];
        collections?: Option[];
    }) => {
        const newReward: Reward = {
            id: crypto.randomUUID(),
            title: values.name,
            description: values.description,
            color: values.color,
            image: values.avatarUrl || "",
            qr: values.avatarUrl2 || "",
            condition: values.condition,
            capsuleOrCollection: values.capsuleOrCollection,
            capsules: values.capsules || [],
            collections: values.collections || [],
        };
        setRewardsList(prev => [newReward, ...prev]);
        console.log("New reward:", values); // <== Добавь это
        setCreateModalOpen(false);
    };

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen">
                <div className="flex-1 p-6">
                    <h2 className="text-xl font-semibold mb-4">Информация о пользователях</h2>

                    <div className="mb-4">
                        <button
                            className="w-full bg-[#00C8B3] hover:bg-[#00b4a1] text-white py-2 px-4 rounded-full text-sm font-medium"
                            onClick={() => setCreateModalOpen(true)}
                        >
                            + Добавить награду
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rewardsList.map((reward) => (
                            <div key={reward.id} className="relative group">
                                <RewardCard
                                    reward={reward}
                                    onEdit={() => handleEditClick(reward)}
                                    onDelete={() => handleDeleteClick(reward)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Удалить награду"
            />

            {rewardToEdit && (
                <EditModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveEdit}
                    initialValues={{
                        name: rewardToEdit.title,
                        color: rewardToEdit.color || "",
                        description: rewardToEdit.description,
                        avatarUrl: rewardToEdit.image,
                        avatarUrl2: rewardToEdit.qr || "",
                        condition: rewardToEdit.condition || "",
                        capsuleOrCollection: rewardToEdit.capsuleOrCollection || "",
                    }}
                    title="Редактировать награду"
                    showSecondAvatar={true}
                    labelSecondAvatar="QR-CODE для AR (PNG, JPG)"
                />
            )}

            {createModalOpen && (
                <EditModal
                    isOpen={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSave={handleSaveCreate}
                    initialValues={{
                        name: "",
                        color: "",
                        description: "",
                        avatarUrl: "",
                        avatarUrl2: "",
                        condition: "",
                        capsules: [],
                        collections: [],
                        capsuleOrCollection: "",
                    }}
                    title="Добавить награду"
                    showSecondAvatar={true}
                    labelSecondAvatar="QR-CODE для AR (PNG, JPG)"
                />
            )}
        </MainLayout>
    );
};

export default RewardsPage;
