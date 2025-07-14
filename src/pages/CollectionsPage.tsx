import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { collections as mockCollections } from "../collectionsData.ts";
import CollectionItem from "../components/CollectionItem.tsx";
import AddCollectionModal from "../components/modals/AddCollectionModal.tsx";
import MainLayout from "../components/MainLayout.tsx";

const CollectionsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collections, setCollections] = useState(mockCollections);

    const handleAddCollection = (newCollection: any) => {
        setCollections((prev) => [...prev, newCollection]);
        setIsModalOpen(false);
    };

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen">
                <div className="flex-1 p-6 overflow-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold">Коллекции капсул</h2>

                        <div className="flex flex-col items-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-[#00C865] hover:bg-[#00b85e] text-white font-semibold py-2 px-4 rounded-md"
                            >
                                <FaPlus /> Добавить коллекцию
                            </button>

                            <input
                                type="text"
                                placeholder="Поиск..."
                                className="mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
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
                            <tr>
                                <th className="px-4 py-2">Название</th>
                                <th className="px-4 py-2">Описание</th>
                                <th className="px-4 py-2">Капсулы</th>
                                <th className="px-4 py-2">Срок действия</th>
                                <th className="px-4 py-2">Статус</th>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Редактировать</th>
                                <th className="px-4 py-2">Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            {collections.map((c) => (
                                <CollectionItem key={c.name} collection={c} />
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
            </div>
        </MainLayout>
    );
};

export default CollectionsPage;
