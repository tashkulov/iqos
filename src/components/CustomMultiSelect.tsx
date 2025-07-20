import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface Option {
    label: string;
    value: string;
}

interface Props {
    options: Option[];
    selected: Option[];
    onChange: (selected: Option[]) => void;
    placeholder?: string;
}

const CustomMultiSelect: React.FC<Props> = ({ options, selected, onChange, placeholder }) => {
    const [open, setOpen] = useState(false);

    const toggleOption = (option: Option) => {
        const alreadySelected = selected.find((item) => item.value === option.value);
        if (alreadySelected) {
            onChange(selected.filter((item) => item.value !== option.value));
        } else {
            onChange([...selected, option]);
        }
    };

    const removeOption = (option: Option) => {
        onChange(selected.filter((item) => item.value !== option.value));
    };

    return (
        <div className="relative">
            {/* Input */}
            <div
                onClick={() => setOpen(!open)}
                className="border border-[#E2E2E2] rounded-lg px-4 py-2 text-sm text-gray-700 flex justify-between items-center cursor-pointer"
            >
                <span className="text-gray-400">
                    {placeholder || "Выберите..."}
                </span>
                <FaChevronDown size={14} className="text-gray-400" />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-md z-10 max-h-52 overflow-y-auto">
                    {options.map((option) => {
                        const isSelected = selected.some((item) => item.value === option.value);
                        return (
                            <div
                                key={option.value}
                                onClick={() => toggleOption(option)}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                    isSelected ? "bg-[#E8FDFD] font-semibold text-[#00D1D2]" : ""
                                }`}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            )}

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((item) => (
                        <div
                            key={item.value}
                            className="flex items-center justify-between gap-2 border border-[#CFCFCF] rounded-lg px-3 py-1.5 text-sm w-[calc(50%-0.25rem)]"
                        >
                            <button
                                onClick={() => removeOption(item)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>
                            <span className="truncate">{item.label}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default CustomMultiSelect;
