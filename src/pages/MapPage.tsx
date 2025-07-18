import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { FaPlus } from "react-icons/fa";
import Map from "../components/Map";
import AddLocationForm from "../components/modals/AddLocationForm.tsx";

interface Location {
    name: string;
    type: string;
    quantity: number;
    coords: [number, number];
}

const MapPage = () => {
    const [locations, setLocations] = useState<Location[]>([
        { name: "Аэропорт", type: "Ресторан", quantity: 15, coords: [51.2262, 71.3866] },
        { name: "Тайсинкар", type: "Ресторан", quantity: 23, coords: [51.235, 71.365] },
        { name: "Астана-хюб", type: "Ресторан", quantity: 42, coords: [51.24, 71.37] },
        { name: "Шаур", type: "Ресторан", quantity: 29, coords: [51.25, 71.38] },
        { name: "Ежко", type: "Бар", quantity: 27, coords: [51.22, 71.345] },
        { name: "Вокзал", type: "Бар", quantity: 36, coords: [51.228, 71.351] },
        { name: "Гольф-клуб", type: "Магазин", quantity: 5, coords: [51.218, 71.335] },
        { name: "Бизнес-центр", type: "Магазин", quantity: 13, coords: [51.223, 71.34] },
        { name: "Торговый центр", type: "Магазин", quantity: 40, coords: [51.215, 71.33] },
        { name: "Администрация", type: "Магазин", quantity: 26, coords: [51.245, 71.355] },
        { name: "Университет", type: "Бар", quantity: 33, coords: [51.212, 71.32] },
    ]);

    const allTypes = [
        "Ресторан", "Кафе", "Бистро", "Стейкхаус", "Пиццерия", "Суши-бар", "Вегетарианское заведение"
    ];
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filtered = locations.filter((l) => {
        const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
        const matchType = selectedTypes.length === 0 || selectedTypes.includes(l.type);
        return matchSearch && matchType;
    });

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen">
                <div className="flex-1 p-6 overflow-auto">
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sidebar Filters */}
                        <div className="space-y-4">
                            <div className="flex items-center bg-[#e9fcfc] rounded-full px-4 py-2 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-500 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                                />
                            </div>


                            {/* Типы локации */}
                            <div className="relative inline-block">
                                <details className="w-full">
                                    <summary
                                        className="cursor-pointer border border-gray-300 rounded-md px-3 gap-2 py-2 text-sm w-full flex justify-between items-center">
                                        <span>Тип локации</span>
                                        <span
                                            className="text-[#00D1D2] font-semibold">{selectedTypes.length} выбрано</span>
                                    </summary>
                                    <div className="absolute z-10 mt-2 bg-white shadow-md rounded-md p-3 w-60">
                                        {allTypes.map((type) => (
                                            <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() =>
                                                        setSelectedTypes((prev) =>
                                                            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                                                        )
                                                    }
                                                    className="accent-[#00D1D2] w-4 h-4"
                                                />
                                                <span className={selectedTypes.includes(type)
                                                    ? "text-[#00D1D2] font-medium"
                                                    : "text-gray-600"}>
                          {type}
                        </span>
                                            </label>
                                        ))}
                                    </div>
                                </details>
                            </div>

                            {/* Кнопки */}
                            <div className="flex flex-col gap-3">
                                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                                    <FaPlus/> Добавить локацию
                                </button>
                                <button className="btn-secondary">
                                    <FaPlus/> Добавить тип локации
                                </button>
                            </div>

                            {/* Таблица */}
                            <div className="bg-white rounded-xl shadow-sm mt-2 p-4">
                                <div className="overflow-auto max-h-[500px]">
                                    <table className="w-full text-sm border-separate border-spacing-y-2">
                                        <thead>
                                        <tr className="bg-[#F4FFFF] text-[#1D1D1F] text-xs font-semibold">
                                            <th className="text-left px-4 py-2">Название</th>
                                            <th className="text-left px-4 py-2">Тип</th>
                                            <th className="text-left px-4 py-2">Координаты</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered.map((l, index) => (
                                            <tr key={l.name}
                                                className={`${index % 2 === 1 ? "bg-[#F8FDFF]" : "bg-white"} rounded-lg`}>
                                                <td className="px-4 py-3 relative">
                                                    <div
                                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-5 bg-[#00D1D2] rounded-r-sm"/>
                                                    <span className="pl-4 block">{l.name}</span>
                                                </td>
                                                <td className="px-4 py-3">{l.type}</td>
                                                <td className="px-4 py-3">{l.coords.join(", ")}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="h-[700px] w-full rounded-xl overflow-hidden z-20">
                            <Map locations={filtered}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модалка добавления */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] relative">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>
                        <AddLocationForm
                            onAdd={(newLoc) => {
                                setLocations((prev) => [
                                    ...prev,
                                    {
                                        name: newLoc.name,
                                        type: newLoc.types[0] || "Ресторан",
                                        quantity: 0,
                                        coords: newLoc.coords,
                                    },
                                ]);
                                setIsModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default MapPage;
