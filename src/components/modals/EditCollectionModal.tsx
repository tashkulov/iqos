import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import iconColl from "../../assets/icon/addCollectionIcon.svg";
import CustomMultiSelect, { type Option } from "../CustomMultiSelect.tsx";
import { getCapsules } from "../../utils/capsulesStorage.ts";
import type { CapsuleCollection } from "../../collectionsData.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (collection: CapsuleCollection) => void;
    initialData: CapsuleCollection;
}

const EditCollectionModal: React.FC<Props> = ({ isOpen, onClose, onUpdate, initialData }) => {
    const [name, setName] = useState(initialData.name);
    const [color, setColor] = useState(initialData.color || "#ccbae5");
    const [description, setDescription] = useState(initialData.description);
    const [status, setStatus] = useState(initialData.status === "active");
    const [capsules, setCapsules] = useState<string[]>(initialData.capsules || []);
    const [previewImage, setPreviewImage] = useState<string | null>(initialData.avatar || null);
    const previewInputRef = useRef<HTMLInputElement>(null);

    const [capsuleOptions, setCapsuleOptions] = useState<Option[]>([]);


    useEffect(() => {
        const localCapsules = getCapsules();
        setCapsuleOptions(
            localCapsules.map((capsule: CapsuleCollection) => ({
                value: capsule.id,
                label: capsule.name,
            }))
        );
    }, []);

    useEffect(() => {
        setName(initialData.name);
        setColor(initialData.color || "#ccbae5");
        setDescription(initialData.description);
        setStatus(initialData.status === "active");
        setCapsules(initialData.capsules || []);
        setPreviewImage(initialData.avatar || null);
    }, [initialData]);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...initialData,
            name,
            description,
            color,
            avatar: previewImage || iconColl,
            status: status ? "active" : "inactive",
            capsules,
        });
        onClose();
    };

    if (!isOpen) return null;

    const colorOptions = [
        { value: "", label: "Выберите" },
        { value: "#fbc748", label: "Желтый" },
        { value: "#84edea", label: "Синий" },
        { value: "#f9a8d4", label: "Розовый" },
        { value: "#ccbae5", label: "Фиолетовый" },
        { value: "#00C8A0", label: "Зеленый" },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={18} />
                </button>

                <h2 className="text-2xl font-semibold mb-6">Редактировать коллекцию</h2>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
                    {/* Левая часть */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div className={'flex flex-col md:flex-row gap-6'}>
                            <div className="flex gap-4 items-center">
                                <img
                                    src={previewImage || iconColl}
                                    alt="avatar"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm text-[#8492A6] mb-1">Аватар капсулы</p>
                                    <button
                                        type="button"
                                        className="text-white bg-[#00C8A0] hover:bg-[#00b896] text-sm px-4 py-2 rounded-md"
                                        onClick={() => previewInputRef.current?.click()}
                                    >
                                        Загрузить аватар
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={previewInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-[#8492A6] block mb-2">Статус</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setStatus(true)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${status ? "bg-[#00C8A0] text-white" : "bg-gray-100 text-black"}`}
                                    >
                                        Активная
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatus(false)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${!status ? "bg-[#00C8A0] text-white" : "bg-gray-100 text-black"}`}
                                    >
                                        Не Активная
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={'flex flex-col md:flex-row gap-6'}>
                            <div>
                                <label className="text-sm text-[#8492A6] block mb-1">Название</label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#8492A6] block mb-1">Цвет капсулы</label>
                                <Select
                                    options={colorOptions}
                                    value={colorOptions.find(c => c.value === color)}
                                    onChange={(option) => setColor(option?.value || "")}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-[#8492A6] block mb-1">Описание</label>
                            <textarea
                                maxLength={250}
                                rows={3}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                className="bg-[#00C8A0] hover:bg-[#00b894] text-white text-sm font-semibold px-6 py-2 rounded-md"
                            >
                                Сохранить
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-[#F14B4B] hover:bg-[#e43e3e] text-white text-sm font-semibold px-6 py-2 rounded-md"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>

                    {/* Правая часть */}
                    <div className="w-full md:max-w-sm flex flex-col gap-6">
                        <div>
                            <label className="text-sm text-[#8492A6] block mb-1">Капсулы</label>
                            <CustomMultiSelect
                                options={capsuleOptions}
                                selected={capsuleOptions.filter(opt => capsules.includes(opt.value))}
                                onChange={(selected) => setCapsules(selected.map(s => s.value))}
                                placeholder="Выберите несколько"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCollectionModal;
