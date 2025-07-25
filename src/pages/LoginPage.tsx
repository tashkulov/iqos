import  { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon/logo.svg";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email === "admin" && password === "admin") {
            localStorage.setItem("token", "fake-token");
            navigate("/dashboard");
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0ffff] px-4">
            <div className="w-full max-w-sm bg-white shadow-lg overflow-hidden rounded-lg">
                <div className="bg-[#00C8B3] p-20 flex justify-center items-center">
                    <img src={logo} alt="logo" />
                </div>

                <div className="p-8">
                    <label className="block text-gray-700 text-sm mb-2">
                        Имя пользователя (E-mail)
                    </label>
                    <input
                        type="email"
                        placeholder="Введите имя пользователя"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#00C8B3]"
                    />

                    <label className="block text-gray-700 text-sm mb-2">Пароль</label>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#00C8B3]"
                    />

                    {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}

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
