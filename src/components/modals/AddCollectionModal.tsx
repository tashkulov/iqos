import React from "react";
import { FaTimes } from "react-icons/fa";
import iconColl from "../../assets/icon/addCollectionIcon.svg"
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddCollectionModal: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative shadow-xl">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
                    <FaTimes size={18} />
                </button>

                <h2 className="text-lg font-bold mb-4">Добавить коллекцию</h2>

                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={iconColl}
                        alt="avatar"
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Аватар капсулы</p>
                        <button className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600">
                            Изменить аватар
                        </button>
                    </div>
                </div>

                <form className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Название</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                placeholder="Солнце"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Цвет капсулы</label>
                            <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm">
                                <option>Выберите</option>
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
                        />
                    </div>

                    <div className="flex justify-start gap-4 pt-2">
                        <button
                            type="button"
                            className="bg-[#00C8A0] hover:bg-[#00b894] text-white font-semibold px-6 py-2 rounded-md"
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
