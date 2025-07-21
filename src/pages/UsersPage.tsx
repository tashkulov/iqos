import UserItem from "../components/UserItem";
import MainLayout from "../components/MainLayout.tsx";
import arrowUp from '../assets/icon/arrowUp.svg'
const users = [
    {
        id: "535345",
        firstName: "Александр",
        lastName: "Макаров",
        username: "@user",
        lastVisit: "22/06/2025",
        registrationDate: "22/06/2025",
        capsuleCount: 15,
        collectionCount: 10,
        rewardCount: 5,
        avatarUrl: "/avatars/1.png",
    },
];


const UsersPage = () => {
    return (
        <MainLayout>
            <div className="flex bg-[#F4FFFF] min-h-screen">
                <div className="flex-1 p-6 overflow-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Пользователи</h2>

                    <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm text-gray-600 flex items-center gap-2">
                                <span>Показать</span>
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option>10</option>
                                    <option>25</option>
                                </select>
                                <span>записей</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Поиск по имени или ID"
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                        </div>

                        <table className="w-full text-left text-sm">
                            <thead className="text-gray-600  bg-[#F4FFFF]">
                            <tr>
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2">Имя</th>
                                <th className="px-4 py-2">Фамилия</th>
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">Заходил</th>
                                <th className="px-4 py-2">Регистрация</th>
                                <th className="px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        Капсулы
                                        <img src={arrowUp} alt="arrowUp"  />
                                    </div>
                                </th>
                                <th className="px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        Коллекций
                                        <img src={arrowUp} alt="arrowUp"  />
                                    </div>
                                </th>
                                <th className="px-4 py-2">
                                    <div className="flex items-center gap-1">
                                        Наград
                                        <img src={arrowUp} alt="arrowUp"  />
                                    </div>
                                </th>
                                <th className="px-4 py-2">ID</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <UserItem key={user.id} user={user} />
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
