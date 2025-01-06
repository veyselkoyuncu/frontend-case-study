import React from "react";

interface FilterSectionProps {
    title: string;
    options: string[] | { value: string; label: string }[];
    selectedOptions: string[];
    onChange: (value: string, isChecked?: boolean) => void;
    isCheckbox?: boolean;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    placeholder?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         title,
                                                         options,
                                                         selectedOptions,
                                                         onChange,
                                                         isCheckbox = true,
                                                         searchValue,
                                                         onSearchChange,
                                                         placeholder,
                                                     }) => {
    return (
        <div>
            <h4 className="text-[#333333B2] text-[12px] mb-4">{title}</h4>
            <div className="bg-white shadow-md p-6 mb-6">

                {onSearchChange && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full border p-2"
                        />
                    </div>
                )}
                <div className="overflow-auto max-h-56 space-y-3">
                    {options.map((option) =>
                        typeof option === "string" ? (
                            <label key={option} className="block">
                                <input
                                    type={isCheckbox ? "checkbox" : "radio"}
                                    name={title.toLowerCase().replace(/\s+/g, "-")}
                                    value={option}
                                    checked={selectedOptions.includes(option)}
                                    onChange={(e) =>
                                        isCheckbox
                                            ? onChange(option, e.target.checked)
                                            : onChange(option)
                                    }
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ) : (
                            <label key={option.value} className="block">
                                <input
                                    type={isCheckbox ? "checkbox" : "radio"}
                                    name={title.toLowerCase().replace(/\s+/g, "-")}
                                    value={option.value}
                                    checked={selectedOptions.includes(option.value)}
                                    onChange={(e) =>
                                        isCheckbox
                                            ? onChange(option.value, e.target.checked)
                                            : onChange(option.value)
                                    }
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        )
                    )}
                </div>
            </div>
        </div>

    );
};

export default FilterSection;
