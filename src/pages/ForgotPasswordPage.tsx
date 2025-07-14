import { FaSignInAlt } from "react-icons/fa";
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0ffff] px-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-[#00C8B3] py-7 text-center">
                    <h1 className="text-white text-3xl font-semibold tracking-widest">IQOS</h1>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        Сбросить пароль для <span className="text-black font-bold">Rizz</span>
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Введите ваш Email, и инструкции будут отправлены вам!
                    </p>

                    <label className="block text-gray-700 text-sm mb-1 text-left">
                        Имя пользователя (E-mail)
                    </label>
                    <input
                        type="email"
                        placeholder="Введите имя пользователя"
                        className="w-full mb-40 px-3 py-2 border border-gray-300 rounded-md outline-none transition focus:ring-2 focus:ring-[#00C8B3]"
                    />

                    <button className="w-full flex items-center justify-center gap-2 bg-[#00C865] hover:bg-[#00b85e] text-white font-semibold py-2 rounded-md transition">
                        Сбросить <FaSignInAlt className="text-lg" />
                    </button>

                    <p className="text-xs text-gray-400 mt-6">
                        Помните это?{" "}
                        <Link to="/login" className="text-[#00C8B3] hover:underline">
                            Войдите здесь
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
