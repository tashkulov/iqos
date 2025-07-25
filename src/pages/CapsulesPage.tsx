import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import CapsuleModal from "../components/modals/CapsuleModal.tsx";
import MainLayout from "../components/MainLayout.tsx";
import DeleteModal from "../components/modals/DeleteModal";
import EditCapsuleModal from "../components/modals/EditCapsuleModal.tsx";
import type { CapsuleCollection } from "../collectionsData.ts";
import { capsules as defaultCapsules } from "../capsulesData.ts";
import {getCapsules, setCapsules} from "../utils/capsulesStorage.ts";




const CapsulesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [capsules, setCapsulesState] = useState<CapsuleCollection[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [capsuleToDelete, setCapsuleToDelete] = useState<CapsuleCollection | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [capsuleToEdit, setCapsuleToEdit] = useState<CapsuleCollection | null>(null);

    useEffect(() => {
        const stored = getCapsules();
        if (stored.length === 0) {
            setCapsules(defaultCapsules)
            setCapsulesState(defaultCapsules);
        } else {
            setCapsulesState(stored);
        }
    }, []);

    const handleDeleteClick = (capsule: CapsuleCollection) => {
        setCapsuleToDelete(capsule);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (capsuleToDelete) {
            const updated = capsules.filter(c => c.id !== capsuleToDelete.id);
            setCapsules(updated);
            setCapsuleToDelete(null);
            setDeleteModalOpen(false);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
        setCapsuleToDelete(null);
    };

    const handleAddCapsule = (capsule: CapsuleCollection) => {
        const updated = [capsule, ...capsules];
        setCapsules(updated);
    };

    const handleEditClick = (capsule: CapsuleCollection) => {
        setCapsuleToEdit(capsule);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (values: Partial<CapsuleCollection>) => {
        if (capsuleToEdit) {
            const updatedCapsule = {
                ...capsuleToEdit,
                ...values,
                avatar: values.avatar || capsuleToEdit.avatar,
                avatar2: values.avatar2 || capsuleToEdit.avatar2,
            };
            const updated = capsules.map(c =>
                c.id === capsuleToEdit.id ? updatedCapsule : c
            );
            setCapsules(updated);
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
                                    className={`hover:bg-[#f9f9f9] transition text-sm text-gray-700 font-normal ${
                                        index % 2 === 1 ? "bg-[#f0ffff]" : "bg-white"
                                    }`}
                                >
                                    <td className="px-4 py-2">
                                        <img
                                            src={capsule.avatar}
                                            alt="avatar"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-sm">{capsule.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">
                                        {capsule.description}
                                    </td>
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
