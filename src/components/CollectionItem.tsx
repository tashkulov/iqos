import type { CapsuleCollection } from "../collectionsData.ts";
import editIcon from '../assets/icon/edit.svg';
import deleteIcon from '../assets/icon/delete.svg';

interface Props {
    collection: CapsuleCollection;
    onDelete?: () => void;
    onEdit?: () => void;
    isEven?: boolean;

}

const CollectionItem = ({ collection, onDelete, onEdit,isEven }: Props) => {
    return (
        <tr
            className={`rounded-xl ${
                isEven ? "bg-[#f0ffff]" : "bg-white"
            } text-sm text-gray-700 font-normal`}
        >            {/* Название и цвет */}
            <td className="px-4 py-6 whitespace-nowrap rounded-l-xl">
                <div className="flex items-center gap-2">
                    <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: collection.color }}
                    />
                    <span className="text-sm font-medium text-gray-800">{collection.name}</span>
                </div>
            </td>

            <td className="px-4 py-6 text-sm text-gray-600 max-w-[300px] truncate">
                {collection.description}
            </td>


            <td className="px-4 py-6">
                <span
                    className={`text-xs font-semibold px-4 py-[6px] rounded-full whitespace-nowrap ${
                        collection.status === "active"
                            ? "bg-[#00D0CA] text-white"
                            : "bg-[#F14B4B] text-white"
                    }`}
                >
                    {collection.status === "active" ? "Активна" : "Не активна"}
                </span>
            </td>

            <td className="px-4 py-6 text-sm text-gray-500 whitespace-nowrap">{collection.id}</td>

            <td className="px-4 py-6">
                <button
                    onClick={onEdit}
                    className="p-2 bg-[#f0fbfb] hover:bg-[#e6fcf9] rounded-md"
                >
                    <img src={editIcon} alt="edit" className="w-4 h-4" />
                </button>
            </td>

            <td className="px-4 py-6 rounded-r-xl">
                <button
                    onClick={onDelete}
                    className="p-2 bg-[#fef0f0] hover:bg-[#ffe6e6] rounded-md"
                >
                    <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                </button>
            </td>
        </tr>
    );
};

export default CollectionItem;
