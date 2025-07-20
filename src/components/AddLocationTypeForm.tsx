import { useState } from "react";
import preview from '../assets/img_3.png'
interface Props {
    onAddType: (typeName: string) => void;
    onCancel: () => void;
}

const AddLocationTypeForm: React.FC<Props> = ({ onAddType }) => {
    const [typeName, setTypeName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!typeName.trim()) return;
        onAddType(typeName);
        setTypeName("");
        setDescription("");
        setImage(null);
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-xl border border-[#00D1D2]">
            {/* Header */}
            <h2 className="text-[16px] font-semibold text-[#1D1D1F] mb-6">Добавить новый тип локации</h2>

            {/* Upload Preview */}
            <div className="flex items-center gap-6 mb-6">
                <img
                    src={image || preview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <label className="block text-xs text-[#7C7C7C] mb-1">*Логотип</label>
                    <label className="cursor-pointer bg-[#2ECC71] text-white px-4 py-1.5 rounded-lg text-sm inline-block">
                        Загрузить Превью
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                    </label>
                </div>
            </div>

            {/* Название */}
            <div className="mb-4">
                <label className="block text-xs font-medium text-[#7C7C7C] mb-1">
                    *Название (макс. 50 символов)
                </label>
                <input
                    type="text"
                    maxLength={50}
                    placeholder="Ресторан..."
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    className="w-full border border-[#CFCFCF] rounded-lg px-4 py-2 text-sm placeholder-[#CFCFCF]"
                />
            </div>

            {/* Описание */}
            <div className="mb-2">
                <label className="block text-xs font-medium text-[#7C7C7C] mb-1">
                    *Описание (макс. 250 символов)
                </label>
                <textarea
                    maxLength={250}
                    placeholder="Введите описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-[#CFCFCF] rounded-lg px-4 py-2 text-sm h-24 resize-none placeholder-[#CFCFCF]"
                />
            </div>

            {/* Подпись об обязательных */}
            <p className="text-[10px] text-[#7C7C7C] mb-4">*обязательные поля</p>

            {/* Кнопка */}
            <button
                className="w-full bg-gradient-to-r from-[#00D1D2] to-[#00E0E1] text-black py-2.5 rounded-xl font-semibold"
                onClick={handleSubmit}
            >
                Добавить
            </button>
        </div>
    );
};

export default AddLocationTypeForm;
