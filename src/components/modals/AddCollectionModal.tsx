import React, {useState} from "react";
import {FaTimes} from "react-icons/fa";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
}

const AddCollectionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        const newCollection = {
            name,
            color,
            description,
            capsules: 0,
            expires: "31.12.2025",
            status: "Активно",
            id: Date.now().toString(), // или UUID
        };
        onAdd(newCollection);
        setName("");
        setColor("");
        setDescription("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative shadow-xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
                    <FaTimes size={18} />
                </button>

                <h2 className="text-lg font-bold mb-4">Добавить коллекцию</h2>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Название</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                placeholder="Солнце"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Цвет капсулы</label>
                            <select
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            >
                                <option value="">Выберите</option>
                                <option>Оранжевый</option>
                                <option>Фиолетовый</option>
                                <option>Бирюзовый</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-500">Описание</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                            rows={4}
                            placeholder="Текстик"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-start gap-4 pt-2">
                        <button
                            type="button"
                            className="bg-[#00C8A0] hover:bg-[#00b894] text-white font-semibold px-6 py-2 rounded-md"
                            onClick={handleSubmit}
                        >
                            Добавить
                        </button>
                        <button
                            type="button"
                            className="bg-[#F14B4B] hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddCollectionModal;