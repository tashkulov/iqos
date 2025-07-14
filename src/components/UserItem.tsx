import { FaPen } from "react-icons/fa";

interface User {
    id: string;
    name: string;
    username: string;
    capsuleCount: number;
    zone: string;
    registrationDate: string;
    birthDate: string;
    avatarUrl: string;
}

interface Props {
    user: User;
}

const UserItem = ({ user }: Props) => {
    return (
        <tr className="hover:bg-[#f9f9f9] transition">
            <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">{user.name}</div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm">@{user.username}</td>
            <td className="px-4 py-4 text-sm">{user.capsuleCount}</td>
            <td className="px-4 py-4 text-sm">{user.zone}</td>
            <td className="px-4 py-4 text-sm">{user.registrationDate}</td>
            <td className="px-4 py-4 text-sm">{user.birthDate}</td>
            <td className="px-4 py-4 text-sm">{user.id}</td>
            <td className="px-4 py-4">
                <button className="bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-[#00C8B3]">
                    <FaPen size={14} />
                </button>
            </td>
        </tr>
    );
};

export default UserItem;
