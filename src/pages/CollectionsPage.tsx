import { FaPlus } from "react-icons/fa";
import { collections as initialCollections } from "../collectionsData.ts";
import type { CapsuleCollection } from "../collectionsData.ts";
import CollectionItem from "../components/CollectionItem.tsx";
import AddCollectionModal from "../components/modals/AddCollectionModal.tsx";
import { useState } from "react";
import MainLayout from "../components/MainLayout.tsx";
import DeleteModal from "../components/modals/DeleteModal";
import EditModal from "../components/modals/EditModal";

const CollectionsPage = () => {
    const [collections, setCollections] = useState<CapsuleCollection[]>(initialCollections);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [collectionToDelete, setCollectionToDelete] = useState<CapsuleCollection | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [collectionToEdit, setCollectionToEdit] = useState<CapsuleCollection | null>(null);

    const handleAddCollection = (data: { name: string; color: string; description: string }) => {
        setCollections(prev => [
            {
                id: Date.now().toString(),
                name: data.name,
                description: data.description,
                capsules: [],
                expiresAt: "",
                status: "active",
                color: data.color,
            },
            ...prev,
        ]);
    };

    const handleDeleteClick = (collection: CapsuleCollection) => {
        setCollectionToDelete(collection);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (collectionToDelete) {
            setCollections(prev =>
                prev.filter(c => c.id !== collectionToDelete.id || c.name !== collectionToDelete.name)
            );
            setCollectionToDelete(null);
            setDeleteModalOpen(false);
        }
    };

    const handleEditClick = (collection: CapsuleCollection) => {
        setCollectionToEdit(collection);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (values: { name: string; color: string; description: string }) => {
        if (collectionToEdit) {
            setCollections(prev =>
                prev.map(c =>
                    c.id === collectionToEdit.id && c.name === collectionToEdit.name
                        ? { ...c, ...values }
                        : c
                )
            );
            setEditModalOpen(false);
            setCollectionToEdit(null);
        }
    };

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen font-sans">
                <div className="flex-1 p-6 overflow-auto">


                    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">Коллекции капсул</h2>

                            <div className="flex flex-col items-end gap-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 bg-[#00C865] hover:bg-[#00b85e] text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    <FaPlus/> Добавить коллекцию
                                </button>

                                <input
                                    type="text"
                                    placeholder="Поиск..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm text-gray-600">
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option>10</option>
                                    <option>25</option>
                                </select>{" "}
                                записей на странице
                            </label>
                        </div>

                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead className="text-xs uppercase text-gray-500">
                            <tr className={'bg-[#f0ffff]'}>
                                <th className="px-4 py-2">Название</th>
                                <th className="px-4 py-2">Описание</th>
                                <th className="px-4 py-2">Статус</th>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Редактировать</th>
                                <th className="px-4 py-2">Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {collections
                                .filter(c =>
                                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                                    c.description.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((c, index) => (
                                    <CollectionItem
                                        key={c.id + c.name}
                                        collection={c}
                                        onDelete={() => handleDeleteClick(c)}
                                        onEdit={() => handleEditClick(c)}
                                        isEven={index % 2 === 1}
                                    />
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                <AddCollectionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddCollection}
                />

                <DeleteModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Удалить коллекцию"
                />

                {collectionToEdit && (
                    <EditModal
                        isOpen={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        onSave={handleSaveEdit}
                        initialValues={{
                            name: collectionToEdit.name,
                            color: collectionToEdit.color,
                            description: collectionToEdit.description,
                        }}
                        title="Редактировать коллекцию"
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default CollectionsPage;
