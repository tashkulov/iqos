import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Здесь может быть логика авторизации
        // Например: await login(email, password)
        // А пока — просто редирект на дашборд
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0ffff] px-4">
            <div className="w-full max-w-sm bg-white shadow-lg overflow-hidden">
                <div className="bg-[#00C8B3] py-10 text-center">
                    <h1 className="text-white text-3xl font-semibold tracking-widest">IQOS</h1>
                </div>

                <div className="p-8">
                    <label className="block text-gray-700 text-sm mb-2">
                        Имя пользователя (E-mail)
                    </label>
                    <input
                        type="email"
                        placeholder="Введите имя пользователя"
                        className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#00C8B3]"
                    />

                    <label className="block text-gray-700 text-sm mb-2">Пароль</label>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#00C8B3]"
                    />

                    <div className="text-right text-sm mb-40">
                        <Link to="/forgot-password" className="text-[#00C8B3] hover:underline">
                            Забыли пароль?
                        </Link>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-[#00C865] hover:bg-[#00b85e] text-white font-semibold py-2 rounded-md transition"
                    >
                        Вход <FaSignInAlt className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
