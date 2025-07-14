import { NavLink } from "react-router-dom";
import {
    FaChartBar,
    FaUser,
    FaGift,
    FaMapMarkerAlt,
    FaCapsules,
} from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";

interface MenuItem {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    { to: "/dashboard", label: "Дашборд", icon: <FaChartBar /> },
    { to: "/collections", label: "Коллекции", icon: <HiOutlineCollection /> },
    { to: "/capsules", label: "Капсулы", icon: <FaCapsules /> },
    { to: "/users", label: "Пользователи", icon: <FaUser /> },
    { to: "/map", label: "Карта", icon: <FaMapMarkerAlt /> },
    { to: "/rewards", label: "Награды", icon: <FaGift /> },
];

const Sidebar = () => {
    return (
        <div className="w-64 bg-white text-sm font-medium shadow-lg min-h-screen">
            <div className="text-center py-8 border-b border-gray-100">
                <h1 className="text-[#00C8B3] text-3xl font-semibold tracking-widest">
                    IQOS
                </h1>
            </div>

            <div className="px-6 pt-6">
                <p className="text-[11px] text-gray-400 mb-4 uppercase tracking-wide">
                    Главное меню
                </p>

                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }: { isActive: boolean }) =>
                                `group flex items-center justify-between px-3 py-2 rounded-md transition ${
                                    isActive
                                        ? "bg-[#e6fcf9] text-[#00C8B3] font-semibold"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg text-inherit">{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                            <span className="text-xs group-hover:translate-x-0.5 transition text-gray-300">
                ›
              </span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
