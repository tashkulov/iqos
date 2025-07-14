import React from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    cancelText?: string;
    confirmText?: string;
}

const DeleteModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, title, cancelText = "Нет, не удалять", confirmText = "Да, Удалить" }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 relative shadow-xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-left">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl ml-4" style={{lineHeight: 1}} aria-label="Закрыть">
                        <FaTimes />
                    </button>
                </div>
                <div className="flex gap-[10px] mt-4 flex-row">
                    <button
                        className="bg-[#00D1D2] hover:bg-[#00b4b5] text-white font-semibold min-w-[173px] min-h-[41px] rounded-[16px] px-6 py-2"
                        style={{padding: '8px 24px'}} 
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="bg-[#F14B4B] hover:bg-red-600 text-white font-semibold min-w-[173px] min-h-[41px] rounded-[16px] px-6 py-2"
                        style={{padding: '8px 24px'}}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal; 