import React from "react";
import { FaTimes } from "react-icons/fa";
import iconColl from "../../assets/icon/addCollectionIcon.svg";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: { name: string; color: string; description: string; avatarUrl?: string; avatarUrl2?: string; condition?: string; capsuleOrCollection?: string }) => void;
    initialValues: { name: string; color: string; description: string; avatarUrl?: string; avatarUrl2?: string; condition?: string; capsuleOrCollection?: string };
    title: string;
    id?: string;
    showSecondAvatar?: boolean;
    labelSecondAvatar?: string;
}

const EditModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialValues, title, id, showSecondAvatar, labelSecondAvatar }) => {
    const [name, setName] = React.useState(initialValues.name);
    const [color, setColor] = React.useState(initialValues.color);
    const [description, setDescription] = React.useState(initialValues.description);
    const [avatarUrl, setAvatarUrl] = React.useState(initialValues.avatarUrl || "");
    const [avatarUrl2, setAvatarUrl2] = React.useState(initialValues.avatarUrl2 || "");
    const [condition, setCondition] = React.useState(initialValues.condition || "");
    const [capsuleOrCollection, setCapsuleOrCollection] = React.useState(initialValues.capsuleOrCollection || "");
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const fileInputRef2 = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setName(initialValues.name);
        setColor(initialValues.color);
        setDescription(initialValues.description);
        setAvatarUrl(initialValues.avatarUrl || "");
        setAvatarUrl2(initialValues.avatarUrl2 || "");
        setCondition(initialValues.condition || "");
        setCapsuleOrCollection(initialValues.capsuleOrCollection || "");
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !color) return;
        onSave({ name, color, description, avatarUrl, avatarUrl2, condition, capsuleOrCollection });
        // Не закрываем модалку сразу, чтобы показать изменения
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
        }
    };
    const handleAvatarChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl2(url);
        }
    };

    const getFirstButtonText = () => labelSecondAvatar ? 'Изменить аватар' : 'Изменить аватар';
    const getSecondButtonText = () => labelSecondAvatar ? 'Изменить QR' : 'Изменить аватар';

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative shadow-xl">
                <div className="w-full flex items-center justify-between mb-6">
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-400 mb-1">{id && `ID: ${id}`}</span>
                        <h2 className="text-lg font-bold text-left">{title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl ml-4" style={{lineHeight: 1}} aria-label="Закрыть">
                        <FaTimes />
                    </button>
                </div>
                {labelSecondAvatar ? (
                    <div className="flex flex-row items-start gap-8 mb-6">
                        <div className="flex flex-col items-center">
                            <img
                                src={avatarUrl || iconColl}
                                alt="preview"
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />
                            <p className="text-xs text-gray-500 mb-1">Превью награды</p>
                            <button
                                type="button"
                                className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Загрузить Превью
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src={avatarUrl2 || iconColl}
                                alt="qr"
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">{labelSecondAvatar}</p>
                            <button
                                type="button"
                                className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600"
                                onClick={() => fileInputRef2.current?.click()}
                            >
                                Изменить QR
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef2}
                                className="hidden"
                                onChange={handleAvatarChange2}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex flex-col items-center">
                            <img
                                src={avatarUrl || iconColl}
                                alt="avatar"
                                className="w-16 h-16 rounded-full object-cover mb-2"
                            />
                            <button
                                type="button"
                                className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {getFirstButtonText()}
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        {showSecondAvatar && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={avatarUrl2 || iconColl}
                                    alt="avatar2"
                                    className="w-16 h-16 rounded-full object-cover mb-2"
                                />
                                <button
                                    type="button"
                                    className="bg-green-500 text-white text-sm px-4 py-1.5 rounded hover:bg-green-600"
                                    onClick={() => fileInputRef2.current?.click()}
                                >
                                    {getSecondButtonText()}
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef2}
                                    className="hidden"
                                    onChange={handleAvatarChange2}
                                />
                            </div>
                        )}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Название</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                placeholder="Название"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                maxLength={100}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Цвет</label>
                            <select className="w-full border rounded-md px-3 py-2 mt-1 text-sm" value={color} onChange={e => setColor(e.target.value)}>
                                <option value="">Выберите</option>
                                <option value="#fbc748">Оранжевый</option>
                                <option value="#ccbae5">Фиолетовый</option>
                                <option value="#84edea">Бирюзовый</option>
                                <option value="#FFD700">Желтый</option>
                                <option value="#00BFFF">Синий</option>
                                <option value="#FF69B4">Розовый</option>
                                <option value="#8A2BE2">Фиолетовый</option>
                                <option value="#32CD32">Зеленый</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Описание</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                            rows={2}
                            placeholder="Описание"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            maxLength={250}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Условие получения</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                placeholder="Много"
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-500">Капсула или Коллекция</label>
                            <select
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                value={capsuleOrCollection}
                                onChange={e => setCapsuleOrCollection(e.target.value)}
                            >
                                <option value="">Выберите</option>
                                <option value="capsule">Капсула</option>
                                <option value="collection">Коллекция</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-start gap-4 pt-2">
                        <button
                            type="submit"
                            className="bg-[#00C8A0] hover:bg-[#00b894] text-white font-semibold px-6 py-2 rounded-md"
                        >
                            Сохранить
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

export default EditModal; 