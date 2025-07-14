import UserItem from "../components/UserItem";
import MainLayout from "../components/MainLayout.tsx";

const users = [
    {
        id: "95461",
        name: "Александр Петрович Смирнов",
        username: "@Petrov",
        capsuleCount: 15,
        zone: "22/06/2025",
        registrationDate: "18/06/2025",
        birthDate: "18/06/2005",
        avatarUrl: "/avatars/1.png",
    },
    {
        id: "95462",
        name: "Мария Ивановна Смирнова",
        username: "@Maria_92",
        capsuleCount: 23,
        zone: "17/06/2025",
        registrationDate: "25/12/2020",
        birthDate: "25/12/2000",
        avatarUrl: "/avatars/2.png",
    },
];

const UsersPage = () => {
    return (
        <MainLayout>
        <div className="flex bg-[#f0ffff] min-h-screen">
            <div className="flex-1 p-6 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">Информация о пользователях</h2>

                <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm text-gray-600">
                            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                <option>10</option>
                                <option>25</option>
                            </select>{" "}
                            записей на странице
                        </label>
                        <input
                            type="text"
                            placeholder="Поиск..."
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                        />
                    </div>

                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-2">ФИО</th>
                            <th className="px-4 py-2">Имя пользователя</th>
                            <th className="px-4 py-2">Капсулы</th>
                            <th className="px-4 py-2">Зона</th>
                            <th className="px-4 py-2">Регистрация</th>
                            <th className="px-4 py-2">Дата рождения</th>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Редактировать</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <UserItem key={user.id + user.username} user={user} />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
</MainLayout>

);
};

export default UsersPage;
