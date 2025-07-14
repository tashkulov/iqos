import { FaBars } from "react-icons/fa";

const Topbar = () => {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-[#f0ffff] border-b border-gray-200">
            <div className="flex items-center gap-3">
                <button className="text-gray-600">
                    <FaBars size={18} />
                </button>
                <div>
                    <h2 className="text-sm font-semibold">Добрый день, Алексей!</h2>
                    <p className="text-xs text-gray-500">Капсулы</p> {/* ← изменено */}
                </div>
            </div>

            <img
                src="/avatars/1.png"
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
            />
        </div>
    );
};

export default Topbar;
