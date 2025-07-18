import { NavLink } from "react-router-dom";

import logo from '../assets/icon/logoblue.svg';
import dash from '../assets/icon/dashbroad.svg';
import collectionsIcon from '../assets/icon/collection.svg';
import capsulesIcon from '../assets/icon/capsules.svg';
import usersIcon from '../assets/icon/users.svg';
import mapIcon from '../assets/icon/mapIcon.svg';
import rewardsIcon from '../assets/icon/rewardsIcon.svg';
import arrowIcon from '../assets/icon/arrow.svg';
interface MenuItem {
    to: string;
    label: string;
    icon: string;
}

const menuItems: MenuItem[] = [
    { to: "/dashboard", label: "Дашборд", icon: dash },
    { to: "/collections", label: "Коллекции", icon: collectionsIcon },
    { to: "/capsules", label: "Капсулы", icon: capsulesIcon },
    { to: "/users", label: "Пользователи", icon: usersIcon },
    { to: "/map", label: "Карта", icon: mapIcon },
    { to: "/rewards", label: "Награды", icon: rewardsIcon },
];

const Sidebar = () => {
    return (
        <div className="w-64 bg-white text-sm font-medium shadow-lg min-h-screen">
            <div className="flex justify-center py-8 border-b border-gray-100">
                <img src={logo} alt="logo" className="h-8 object-contain" />
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
                                <span className="w-5 h-5">
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className="w-full h-full object-contain"
                                    />
                                </span>
                                <span>{item.label}</span>
                            </div>
                            <span className="text-xs group-hover:translate-x-0.5 transition text-gray-300">
                                <img src={arrowIcon} alt={'arrow'}/>
                            </span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
