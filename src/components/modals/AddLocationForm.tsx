import React, {useState, useRef, useEffect} from "react";
import { BsQrCode } from "react-icons/bs";
import preview from '../../assets/img_1.png';
import CustomMultiSelect, {type Option} from "../CustomMultiSelect.tsx";
import {getCapsules} from "../../utils/capsulesStorage.ts";
import {getCollections} from "../../utils/collectionsStorage.ts";

const AddLocationForm = ({
                             onAdd,
                             initialData
                         }: {
    onAdd: (data: any) => void;
    initialData?: any;
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState<{ value: string; label: string }[]>([]);
    const [status, setStatus] = useState<"active" | "inactive">("active");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [qrLink, setQrLink] = useState("https://www.google.com/search...");
    const previewInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<{ name?: string; latitude?: string; longitude?: string; types?: string }>({});
    const locationOptions = [
        { value: "Ресторан", label: "Ресторан" },
        { value: "Кафе", label: "Кафе" },
        { value: "Бистро", label: "Бистро" },
        { value: "Стейкхаус", label: "Стейкхаус" },
        { value: "Пиццерия", label: "Пиццерия" },
        { value: "Суши-бар", label: "Суши-бар" },
        { value: "Вегетарианское заведение", label: "Вегетарианское заведение" },
    ];

    const [capsuleOptions, setCapsuleOptions] = React.useState<Option[]>([]);
    const [collectionOptions, setCollectionOptions] = React.useState<Option[]>([]);

    React.useEffect(() => {
        const localCapsules = getCapsules();
        const localCollections = getCollections();
        setCapsuleOptions(
            localCapsules.map((capsule: any) => ({
                value: capsule.id,
                label: capsule.name,
            }))
        );
        setCollectionOptions(
            localCollections.map((capsule: any) => ({
                value: capsule.id,
                label: capsule.name,
            }))
        );
    }, []);



    const [selectedCapsules, setSelectedCapsules] = useState<Option[]>([]);
    const [selectedCollections, setSelectedCollections] = useState<Option[]>([]);
    const [selectedType, setSelectedType] = useState<{ value: string; label: string } | null>(null);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = "error";
        if (!latitude.trim()) newErrors.latitude = "error";
        if (!longitude.trim()) newErrors.longitude = "error";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setDescription(initialData.description || "");
            setTypes(initialData.types
                ? initialData.types.map((t: string) => ({ value: t, label: t }))
                : initialData.type
                    ? [{ value: initialData.type, label: initialData.type }]
                    : []
            );
            setStatus(initialData.status || "active");
            setPreviewImage(initialData.previewImage || null);
            setLatitude(initialData.coords?.[0]?.toString() || "");
            setLongitude(initialData.coords?.[1]?.toString() || "");
            setQrLink(initialData.qrLink || "https://www.google.com/search...");
        }
    }, [initialData]);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!validate()) return;

        onAdd({
            name,
            description,
            types: types.map(t => t.value),
            status,
            previewImage,
            coords: [parseFloat(latitude), parseFloat(longitude)],
            qrLink,
        });

        if (!initialData) {
            setName("");
            setDescription("");
            setTypes([]);
            setLatitude("");
            setLongitude("");
            setPreviewImage(null);
            setQrLink("https://www.google.com/search...");
            setErrors({});
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-xl">
            <button className="text-gray-500 flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">
                {initialData ? "Редактировать локацию" : "Добавить локацию"}
              </span>
            </button>


            <div className="space-y-4">
                <div>
                    <label
                        className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-500' : 'text-gray-600'}`}>Название
                        (макс. 50 символов)</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1D2]"
                        maxLength={50}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Яркий вкус..."
                    />
                </div>

                <div>
                    <label
                        className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-500' : 'text-gray-600'}`}>Описание
                        (макс. 250 символов)</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1D2]"
                        maxLength={250}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Яркий вкус..."
                    />
                </div>

                <div>
                    <label
                        className={`block text-sm font-medium mb-1 ${errors.types ? 'text-red-500' : 'text-gray-600'}`}
                    >
                        Тип
                    </label>
                    <select
                        className={`w-full border rounded-md px-3 py-2 text-sm ${
                            errors.types ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={selectedType?.value || ""}
                        onChange={(e) => {
                            const selected = locationOptions.find((option) => option.value === e.target.value);
                            setSelectedType(selected || null);
                        }}
                    >
                        <option value="" disabled>Выберите тип</option>
                        {locationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <label
                        className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-500' : 'text-gray-600'}`}>Статус</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatus("active")}
                            className={`px-3 py-1 text-sm rounded-md border font-medium ${
                                status === "active"
                                    ? "bg-[#00D1D2] text-white border-transparent"
                                    : "bg-white text-[#1D1D1F] border-[#1D1D1F]"
                            }`}
                        >
                            Активная
                        </button>
                        <button
                            onClick={() => setStatus("inactive")}
                            className={`px-3 py-1 text-sm rounded-md border font-medium ${
                                status === "inactive"
                                    ? "bg-[#00D1D2] text-white border-transparent"
                                    : "bg-white text-[#1D1D1F] border-[#1D1D1F]"
                            }`}
                        >
                            Не Активная
                        </button>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4">
                        <img
                            src={previewImage || preview}
                            className="w-16 h-16 rounded-full object-cover"
                            alt="Preview"
                        />
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">*Логотип</label>
                            <button
                                className="bg-green-600 text-white text-xs px-3 py-1.5 rounded"
                                onClick={() => previewInputRef.current?.click()}
                            >
                                Загрузить Превью
                            </button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={previewInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            className={`block text-sm font-medium mb-1 ${errors.latitude ? 'text-red-500' : 'text-gray-600'}`}>Координаты
                            (Ширина)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1D2]"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className={`block text-sm font-medium mb-1 ${errors.longitude ? 'text-red-500' : 'text-gray-600'}`}>Координаты
                            (Долгота)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1D2]"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Капсулы на локации</label>
                        <CustomMultiSelect
                            options={capsuleOptions}
                            selected={selectedCapsules}
                            onChange={setSelectedCapsules}
                            placeholder="Выберите капсулы"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Коллекции на локации</label>
                        <CustomMultiSelect
                            options={collectionOptions}
                            selected={selectedCollections}
                            onChange={setSelectedCollections}
                            placeholder="Выберите коллекции"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-end">
                    <div className="flex-shrink-0">
                        <BsQrCode className="text-4xl"/>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">QR-CODE для AR (PNG, JPG)</label>
                        <button className="bg-[#00D1D2] text-white px-3 py-1 rounded mt-1 text-sm">Сохранить QR</button>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Ссылка на QR</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D1D2]"
                            value={qrLink}
                            onChange={(e) => setQrLink(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className="bg-[#00D1D2] text-black w-full py-2 rounded-xl mt-4"
                    onClick={handleSubmit}
                >
                    {initialData ? "Сохранить изменения" : "Добавить"}
                </button>

            </div>
        </div>
    );
};

export default AddLocationForm;