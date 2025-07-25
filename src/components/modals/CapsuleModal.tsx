import React, { useRef, useState } from "react";
import icon from '../../assets/icon/addCollectionIcon.svg';

type Capsule = {
    id: string;
    name: string;
    description: string;
    status: "active" | "inactive";
    color: string;
    avatar: string;
    avatar2?: string;
};



interface Props {
    onClose: () => void;
    onAdd: (capsule: Capsule) => void;
}

const CapsuleModal: React.FC<Props> = ({ onClose, onAdd }) => {
    const previewInputRef = useRef<HTMLInputElement>(null);
    const modelInputRef = useRef<HTMLInputElement>(null);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [modelImage, setModelImage] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");

    const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setPreviewImage(URL.createObjectURL(file));
    };

    const handleModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setModelImage(URL.createObjectURL(file));
    };
    const handleSubmit = () => {
        if (!name || !color || !previewImage) return;

        const newCapsule: Capsule = {
            id: Date.now().toString(),
            name,
            description,
            color,
            avatar: previewImage,
            avatar2: modelImage || "",
            status: "active" as const,
        };


        onAdd(newCapsule);
        onClose();
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[700px] relative">
                <button
                    className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-lg font-semibold mb-4">Добавить капсулу</h2>

                <div className="flex items-start gap-8 mb-6">
                    <div className="flex flex-col items-center">
                        <img
                            src={previewImage || icon}
                            className="w-16 h-16 rounded-full object-cover mb-2"
                            alt="preview"
                        />
                        <button
                            className="bg-[#00C865] hover:bg-[#00b85e] text-white px-4 py-1 rounded"
                            onClick={() => previewInputRef.current?.click()}
                        >
                            Загрузить Превью
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={previewInputRef}
                            className="hidden"
                            onChange={handlePreviewUpload}
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <img
                            src={modelImage || icon}
                            className="w-16 h-16 rounded-full object-cover mb-2"
                            alt="3d model"
                        />
                        <button
                            className="bg-[#00C865] hover:bg-[#00b85e] text-white px-4 py-1 rounded"
                            onClick={() => modelInputRef.current?.click()}
                        >
                            Загрузить 3D модель
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={modelInputRef}
                            className="hidden"
                            onChange={handleModelUpload}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">
                            Название (макс. 50 символов)
                        </label>
                        <input
                            type="text"
                            placeholder="Яркий вкус..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={50}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-1">
                            Цвет капсулы
                        </label>
                        <select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-500"
                        >
                            <option value="">Выберите</option>
                            <option value="Желтый">Желтый</option>
                            <option value="Синий">Синий</option>
                            <option value="Розовый">Розовый</option>
                            <option value="Фиолетовый">Фиолетовый</option>
                            <option value="Зеленый">Зеленый</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-500 mb-1">
                            Описание (макс. 250 символов)
                        </label>
                        <textarea
                            placeholder="Яркий вкус..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={250}
                            rows={4}
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-start gap-4">
                    <button
                        className="bg-[#00D1D2] hover:bg-[#00b85e] text-black px-6 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Добавить
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CapsuleModal;
