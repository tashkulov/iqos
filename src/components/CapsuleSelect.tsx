import Select from "react-select";
import type { MultiValue } from "react-select";

type Option = {
    value: string;
    label: string;
};

interface Props {
    selected: Option[];
    setSelected: (val: Option[]) => void;
}

export const CapsuleSelect: React.FC<Props> = ({ selected, setSelected }) => {
    const options: Option[] = [
        { value: "longcapsule1", label: "Капсула длиннннннная 1" },
        { value: "longcapsule2", label: "Капсула длиннннннная 2" },
        { value: "longcapsule3", label: "Капсула длиннннннная 3" },
    ];

    const handleChange = (newValue: MultiValue<Option>) => {
        setSelected([...newValue]);
    };


    return (
        <Select
            isMulti
            options={options}
            value={selected}
            onChange={handleChange}
            placeholder="Выберите несколько"
            classNamePrefix="react-select"
            styles={{
                multiValue: (base) => ({
                    ...base,
                    maxWidth: "48%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }),
                valueContainer: (base) => ({
                    ...base,
                    flexWrap: "wrap",
                    gap: "4px",
                }),
            }}
        />
    );
};
