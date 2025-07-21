import ava from '../assets/img_4.png'
interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    lastVisit: string;
    registrationDate: string;
    capsuleCount: number;
    collectionCount: number;
    rewardCount: number;
    avatarUrl: string;
}

interface Props {
    user: User;
}

const UserItem = ({ user }: Props) => {
    return (
        <tr className="hover:bg-[#f9f9f9] transition-colors duration-150">
            <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <img
                        src={ ava || user.avatarUrl }
                        alt={user.firstName}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                </div>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.firstName}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.lastName}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.username}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.lastVisit}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.registrationDate}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.capsuleCount}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.collectionCount}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.rewardCount}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{user.id}</td>
        </tr>
    );
};

export default UserItem;
