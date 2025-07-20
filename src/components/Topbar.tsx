import { FaBars } from "react-icons/fa";
import ava from '../assets/img_2.png'
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
                src={ava}
                alt="User avatar"
                height={48}
                width={48}
                className=" rounded-full object-cover"
            />
        </div>
    );
};

export default Topbar;
