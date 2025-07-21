import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { capsules as initialCapsules } from "../capsulesData.ts";
import CapsuleModal from "../components/modals/CapsuleModal.tsx";
import MainLayout from "../components/MainLayout.tsx";
import DeleteModal from "../components/modals/DeleteModal";
import EditCapsuleModal from "../components/modals/EditCapsuleModal.tsx";

const CapsulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    type Capsule = typeof initialCapsules[number] & {
        avatar2?: string;
        selectedCapsules?: { value: string; label: string }[];
    };

    const [capsules, setCapsules] = useState<Capsule[]>(initialCapsules);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [capsuleToDelete, setCapsuleToDelete] = useState<Capsule | null>(null);
    const [_, setEditModalOpen] = useState(false);
    const [capsuleToEdit, setCapsuleToEdit] = useState<Capsule | null>(null);

    const handleDeleteClick = (capsule: Capsule) => {
        setCapsuleToDelete(capsule);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (capsuleToDelete) {
            setCapsules(prev => prev.filter(c => c.id !== capsuleToDelete.id));
            setCapsuleToDelete(null);
            setDeleteModalOpen(false);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setCapsuleToDelete(null);
    };

    const handleAddCapsule = (capsule: Capsule) => {
        setCapsules(prev => [capsule, ...prev]);
    };


    const handleEditClick = (capsule: Capsule) => {
        setCapsuleToEdit(capsule);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (values: {
        name: string;
        color?: string;
        description: string;
        avatarUrl?: string;
        avatarUrl2?: string;
        condition?: string;
        capsuleOrCollection?: string;
    }) => {
        if (capsuleToEdit) {
            setCapsules(prev =>
                prev.map(c =>
                    c.id === capsuleToEdit.id
                        ? {
                            ...c,
                            ...values,
                            avatar: values.avatarUrl || c.avatar,
                            avatar2: values.avatarUrl2 || c.avatar2,
                        }
                        : c
                )
            );
            setEditModalOpen(false);
            setCapsuleToEdit(null);
        }
    };


    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setCapsuleToEdit(null);
    };

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen">
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">Капсулы</h2>

                            <div className="flex flex-col items-end gap-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 bg-[#00C865] hover:bg-[#00b85e] text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    <FaPlus /> Добавить капсулу
                                </button>
                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    className="mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>

                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead className="text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-2">Аватар</th>
                                <th className="px-4 py-2">Название</th>
                                <th className="px-4 py-2">Описание</th>
                                <th className="px-4 py-2">Цвет</th>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Редактировать</th>
                                <th className="px-4 py-2">Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {capsules.map((capsule, index) => (
                                <tr
                                    key={capsule.id}
                                    className={`hover:bg-[#f9f9f9] transition text-sm text-gray-700 font-normal ${index % 2 === 1 ? "bg-[#f0ffff]" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2">
                                        <img src={capsule.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                                    </td>
                                    <td className="px-4 py-2 text-sm">{capsule.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{capsule.description}</td>
                                    <td className="px-4 py-2">{capsule.color}</td>
                                    <td className="px-4 py-2 text-sm">{capsule.id}</td>


                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-[#00C8B3]"
                                            onClick={() => handleEditClick(capsule)}
                                        >
                                            <FaPen size={14} />
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-red-400"
                                            onClick={() => handleDeleteClick(capsule)}
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {isModalOpen && (
                        <CapsuleModal
                            onClose={() => setIsModalOpen(false)}
                            onAdd={handleAddCapsule}
                        />
                    )}
                    <DeleteModal
                        isOpen={deleteModalOpen}
                        onClose={handleCloseDeleteModal}
                        onConfirm={handleConfirmDelete}
                        title="Удалить капсулу"
                    />
                    {capsuleToEdit && (
                        <EditCapsuleModal
                            capsule={capsuleToEdit}
                            onClose={handleCloseEditModal}
                            onSave={handleSaveEdit}
                        />
                    )}

                </div>
            </div>
        </MainLayout>
    );
};

export default CapsulesPage;
