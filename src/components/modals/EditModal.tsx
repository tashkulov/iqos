import React from "react";
import { FaTimes } from "react-icons/fa";
import iconColl from "../../assets/icon/addCollectionIcon.svg";
import downloadIcon from "../../assets/icon/downloadIcon.svg";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: {
        name: string;
        color: string;
        description: string;
        avatarUrl?: string;
        avatarUrl2?: string;
        condition?: string;
        capsuleOrCollection?: string;
    }) => void;
    initialValues: {
        name: string;
        color?: string;
        description: string;
        avatarUrl?: string;
        avatarUrl2?: string;
        condition?: string;
        capsuleOrCollection?: string;
    };
    title: string;
    id?: string;
    showSecondAvatar?: boolean;
    labelSecondAvatar?: string;
}

const   EditModal: React.FC<Props> = ({
                                        isOpen,
                                        onClose,
                                        onSave,
                                        initialValues,
                                        title,
                                        id,
                                    }) => {
    const [name, setName] = React.useState(initialValues.name);
    const [color, setColor] = React.useState(initialValues.color);
    const [description, setDescription] = React.useState(initialValues.description);
    const [avatarUrl, setAvatarUrl] = React.useState(initialValues.avatarUrl || "");
    const [avatarUrl2, setAvatarUrl2] = React.useState(initialValues.avatarUrl2 || "");
    const [condition, setCondition] = React.useState(initialValues.condition || "");
    const [capsuleOrCollection, setCapsuleOrCollection] = React.useState(initialValues.capsuleOrCollection || "");

    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
        onSave({
            name,
            color,
            description,
            avatarUrl,
            avatarUrl2,
            condition,
            capsuleOrCollection,
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-[740px] rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {id && <p className="text-xs font-bold text-[#1D1D1F] mb-1">ID: #{id}</p>}
                        <h2 className="text-lg font-bold">{title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg">
                        <FaTimes />
                    </button>
                </div>

                {/* Uploads */}
                <div className="flex items-start gap-12 mb-6">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={avatarUrl || iconColl}
                            alt="preview"
                            className="w-20 h-20 rounded-full object-cover mb-2"
                        />
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Превью награды (макс. 500x500)</p>
                            <button
                                type="button"
                                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded"
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
                    </div>

                    <div className="flex flex-row items-center justify-end">
                        <img
                            src={downloadIcon}
                            alt="download"
                            className="w-20 h-20 rounded-full object-cover mb-2"
                        />
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Файл CSV или JSON</p>
                            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded">
                                Загрузить файл
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                        placeholder="Название (макс. 100 символов)"
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none"
                        placeholder="Описание (макс. 250 символов)"
                        maxLength={250}
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                        placeholder="Условие получения награды..."
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                            value={capsuleOrCollection}
                            onChange={(e) => setCapsuleOrCollection(e.target.value)}
                        >
                            <option value="">Выберите капсулу</option>
                            <option value="Капсула 1">Капсула 1</option>
                            <option value="Капсула 2">Капсула 2</option>
                        </select>

                        <select
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="">Выберите цвет</option>
                            <option value="#fbc748">Оранжевый</option>
                            <option value="#ccbae5">Фиолетовый</option>
                            <option value="#84edea">Бирюзовый</option>
                        </select>
                    </div>


                    <div className="flex justify-start gap-4 pt-4">
                        <button
                            type="submit"
                            className="bg-[#00C8A0] hover:bg-[#00b894] text-white font-semibold px-6 py-2 rounded-md"
                        >
                            Добавить
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#F14B4B] hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
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
