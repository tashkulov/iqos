import { FaTrash, FaPen } from "react-icons/fa";
import type { CapsuleCollection } from "../collectionsData.ts";

interface Props {
    collection: CapsuleCollection;
    onDelete?: () => void;
    onEdit?: () => void;
}

const CollectionItem = ({ collection, onDelete, onEdit }: Props) => {
    return (
        <tr className="rounded-xl bg-[#f8feff]">
            <td className="px-4 py-6 rounded-l-xl">
                <div className="flex items-center gap-2">
          <span
              className="w-3.5 h-3.5 rounded-full"
              style={{backgroundColor: collection.color}}
          />
                    <span className="text-sm font-medium text-gray-800">{collection.name}</span>
                </div>
            </td>

            <td className="px-4 py-6 text-sm text-gray-700">{collection.description}</td>

            <td className="px-4 py-6">
                <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {collection.capsules.map((capsule, idx) => (
                        <span
                            key={idx}
                            className="text-xs border border-gray-400 rounded-full px-2 py-[2px] text-gray-800 whitespace-nowrap"
                        >
              {capsule}
            </span>
                    ))}
                </div>
            </td>

            <td className="px-4 py-6 text-sm text-gray-800 whitespace-nowrap">
                до {collection.expiresAt}
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

            <td className="px-4 py-6 text-sm text-gray-800 whitespace-nowrap">{collection.id}</td>

            <td className="px-4 py-6">
                <button className="bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-[#00C8B3]" onClick={onEdit}>
                    <FaPen size={14}/>
                </button>
            </td>

            <td className="px-4 py-6 rounded-r-xl">
                <button className="bg-[#f0fbfb] hover:bg-[#e6fcf9] p-2 rounded-md text-[#F14B4B]" onClick={onDelete}>
                    <FaTrash size={14}/>
                </button>
            </td>
        </tr>
    );
};

export default CollectionItem;
