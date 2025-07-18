import React, { useState, useRef } from "react";

const AddLocationForm = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [status, setStatus] = useState<"active" | "inactive">("active");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [qrLink, setQrLink] = useState("https://www.google.com/search...");
    const previewInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!name || !latitude || !longitude) return;

        onAdd({
            name,
            description,
            types,
            status,
            previewImage,
            coords: [parseFloat(latitude), parseFloat(longitude)],
            qrLink,
        });

        // Очистка
        setName("");
        setDescription("");
        setTypes([]);
        setLatitude("");
        setLongitude("");
        setPreviewImage(null);
        setQrLink("https://www.google.com/search...");
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md space-y-4 max-w-2xl mx-auto z-50">
            <input
                className="input"
                placeholder="Название (макс. 50 символов)"
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                className="input"
                placeholder="Описание (макс. 250 символов)"
                maxLength={250}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex gap-4">
                <select className="input flex-1" multiple value={types} onChange={(e) =>
                    setTypes(Array.from(e.target.selectedOptions, (opt) => opt.value))
                }>
                    <option value="Ресторан">Ресторан</option>
                    <option value="Кафе">Кафе</option>
                    <option value="Бистро">Бистро</option>
                </select>

                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setStatus("active")}
                        className={`px-4 py-1 rounded ${status === "active" ? "bg-[#00D1D2] text-white" : "bg-gray-200"}`}
                    >
                        Активная
                    </button>
                    <button
                        onClick={() => setStatus("inactive")}
                        className={`px-4 py-1 rounded ${status === "inactive" ? "bg-red-400 text-white" : "bg-gray-200"}`}
                    >
                        Не Активная
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <img
                    src={previewImage || "/placeholder.png"}
                    className="w-16 h-16 rounded-full object-cover"
                    alt="Preview"
                />
                <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => previewInputRef.current?.click()}
                >
                    Загрузить Превью
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={previewInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <input
                    className="input"
                    placeholder="Координаты (Широта)"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <input
                    className="input"
                    placeholder="Координаты (Долгота)"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
            </div>

            <input
                className="input"
                placeholder="Ссылка на QR"
                value={qrLink}
                onChange={(e) => setQrLink(e.target.value)}
            />

            <button
                className="bg-[#00D1D2] text-white w-full py-2 rounded font-semibold mt-4"
                onClick={handleSubmit}
            >
                Добавить
            </button>
        </div>
    );
};

export default AddLocationForm;
