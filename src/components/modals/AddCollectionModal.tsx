import React from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import iconColl from "../../assets/icon/addCollectionIcon.svg";
import CustomMultiSelect, {type Option} from "../CustomMultiSelect.tsx";
import {getCapsules} from "../../utils/capsulesStorage.ts";
import type {CapsuleCollection} from "../../collectionsData.ts";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (collection: {
        name: string;
        color: string;
        description: string;
        status: boolean;
        capsules: string[];
    }) => void;
}


const AddCollectionModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = React.useState("");
    const [color, setColor] = React.useState("#ccbae5");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState(true);
    const [capsules, setCapsules] = React.useState<string[]>([
        "Светлый путь",
        "Тайна леса",
        "Звёздный вечер",
    ]);
    const [capsuleOptions, setCapsuleOptions] = React.useState<Option[]>([]);

    React.useEffect(() => {
        const localCapsules = getCapsules();
        setCapsuleOptions(
            localCapsules.map((capsule:CapsuleCollection) => ({
                value: capsule.id,
                label: capsule.name,
            }))
        );
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !color) return;
        onAdd({ name, color, description, status, capsules });
        onClose();
    };
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const previewInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };


    if (!isOpen) return null;

    const colorOptions = [
        { value: "#fbc748", label: "Оранжевый" },
        { value: "#ccbae5", label: "Фиолетовый" },
        { value: "#84edea", label: "Бирюзовый" },
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

                <h2 className="text-2xl font-semibold mb-6">Добавить коллекцию</h2>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">


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
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            status ? "bg-[#00C8A0] text-white" : "bg-gray-100 text-black"
                                        }`}
                                    >
                                        Активная
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setStatus(false)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            !status ? "bg-[#00C8A0] text-white" : "bg-gray-100 text-black"
                                        }`}
                                    >
                                        Не Активная
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className={'flex flex-col md:flex-row gap-6'}>
                            <div>
                                <label className="text-sm text-[#8492A6] block mb-1">
                                    Название (макс. 50 символов)
                                </label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите название"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#8492A6] block mb-1">Цвет капсулы</label>
                                <Select
                                    options={colorOptions}
                                    defaultValue={colorOptions.find((c) => c.value === color)}
                                    onChange={(option) => setColor(option?.value || "")}
                                    placeholder="Выберите"
                                    className={'w-full'}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: "40px",
                                            borderRadius: "0.375rem",
                                            fontSize: "0.875rem",
                                        }),
                                    }}
                                />
                            </div>

                        </div>
                        <div>
                            <label className="text-sm text-[#8492A6] block mb-1">
                                Описание (макс. 250 символов)
                            </label>
                            <textarea
                                maxLength={250}
                                rows={3}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Введите описание"
                            />
                        </div>


                        {/* Кнопки */}
                        <div className="flex gap-4 pt-2">
                            <button
                                type="submit"
                                className="bg-[#00C8A0] hover:bg-[#00b894] text-white text-sm font-semibold px-6 py-2 rounded-md"
                            >
                                Добавить
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
                        {/* Капсулы */}
                        <div>
                            <label className="text-sm text-[#8492A6] block mb-1">
                                Капсулы (от N до Y)
                            </label>
                            <CustomMultiSelect
                                options={capsuleOptions}
                                selected={capsuleOptions.filter(opt => capsules.includes(opt.value))}
                                onChange={(selected) => setCapsules(selected.map(s => s.value))}
                                placeholder="Выберите несколько"
                            />

                        </div>

                        {/* Цвет */}
                        {/* Здесь оставляй следующий блок */}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCollectionModal;
