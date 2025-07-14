import { useState } from "react";
import MainLayout from "../components/MainLayout";
import { FaPlus, FaTimes } from "react-icons/fa";
import Map from "../components/Map.tsx";

const locations = [
    { name: "Аэропорт", type: "Ресторан", quantity: 15, coords: [51.2262, 51.3866] },
    { name: "Тайсинкар", type: "Ресторан", quantity: 23, coords: [51.235, 51.365] },
    { name: "Астана-хюб", type: "Ресторан", quantity: 42, coords: [51.24, 51.37] },
    { name: "Шаур", type: "Ресторан", quantity: 29, coords: [51.25, 51.38] },
    { name: "Ежко", type: "Бар", quantity: 27, coords: [51.22, 51.345] },
    { name: "Вокзал", type: "Бар", quantity: 36, coords: [51.228, 51.351] },
    { name: "Гольф-клуб", type: "Магазин", quantity: 5, coords: [51.218, 51.335] },
    { name: "Бизнес-центр", type: "Магазин", quantity: 13, coords: [51.223, 51.34] },
    { name: "Торговый центр", type: "Магазин", quantity: 40, coords: [51.215, 51.33] },
    { name: "Администрация", type: "Магазин", quantity: 26, coords: [51.245, 51.355] },
    { name: "Университет", type: "Бар", quantity: 33, coords: [51.212, 51.32] },
];

const MapPage = () => {
    const [search, setSearch] = useState("");
    const categories = ["Store", "Ресторан", "Бар"];
    const [activeCategory, setActiveCategory] = useState("");

    const filtered = locations.filter((l) => {
        const matchSearch = l.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            activeCategory === "" ||
            (activeCategory === "Store" && l.type === "Магазин") ||
            l.type === activeCategory;
        return matchSearch && matchCategory;
    });

    return (
        <MainLayout>
            <div className="flex bg-[#f0ffff] min-h-screen">
                <div className="flex-1 p-6 overflow-auto">

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sidebar Filters */}
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Поиск"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />

                            <div className="flex items-center gap-2 flex-wrap">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${
                                            activeCategory === cat ? "category-btn-active" : "category-btn-default"
                                        }`}
                                        onClick={() =>
                                            setActiveCategory(activeCategory === cat ? "" : cat)
                                        }
                                    >
                                        {activeCategory === cat && <FaTimes size={12} />}
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <button className="btn-primary">
                                    <FaPlus /> Добавить локацию
                                </button>
                                <button className="btn-secondary">
                                    <FaPlus /> Добавить тип локации
                                </button>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm mt-2">
                                <table className="w-full text-sm">
                                    <thead className="text-left text-gray-500 text-xs border-b">
                                    <tr>
                                        <th className="py-2">Название</th>
                                        <th>Тип</th>
                                        <th>Координаты</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filtered.map((l) => (
                                        <tr key={l.name} className="border-b last:border-none">
                                            <td className="py-2">{l.name}</td>
                                            <td>{l.type}</td>
                                            <td>{l.quantity}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="h-[700px] w-full rounded-xl overflow-hidden">
                            <Map locations={filtered} />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MapPage;
