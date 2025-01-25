import React, { useState, useContext, useEffect } from 'react';
import FilterContext from '@/Context/FilterContext';
import PageContext from '@/Context/PageContext';

const DropdownMenu = ({
    apiEndpoint = null, // API URL to fetch options
    staticOptions = [], // Static options if API is not provided
    labelKey = 'label', // Key for the display label in the dropdown
    valueKey = 'value', // Key for the unique value of each item
    contextState, // Current selected state (array of selected IDs/values and labels)
    setContextState, // Function to update the selected state
    allowMultipleSelection = true, // Allow multiple selections
    onItemSelected = () => {}, // Callback when an item is selected/deselected
}) => {
    const { setCurrentPage } = useContext(PageContext); // Reset page on selection
    const { departments, setDepartments } = useContext(FilterContext); // For department-specific context (if needed)
    const [options, setOptions] = useState(staticOptions); // Dropdown options
    const [loading, setLoading] = useState(!staticOptions.length); // Loading state

    useEffect(() => {
        if (apiEndpoint) {
            async function fetchOptions() {
                try {
                    setLoading(true);
                    const res = await fetch(apiEndpoint);
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    const data = await res.json();
                    const formattedOptions = data.map((item) => ({
                        label: item[labelKey],
                        value: item[valueKey],
                    }));
                    setOptions(formattedOptions);
                } catch (error) {
                    console.error('Error fetching options:', error);
                    setOptions([]);
                } finally {
                    setLoading(false);
                }
            }
            fetchOptions();
        }
    }, [apiEndpoint, labelKey, valueKey]);

    const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label));

    const handleItemClick = (item) => {
        setCurrentPage(1); // Reset pagination to the first page

        setContextState((prev = [[], []]) => {
            const [selectedValues = [], selectedLabels=[]] = prev;
            const isSelected = selectedValues.includes(item.value);

            if (isSelected) {
                // Remove the item if it's already selected
                return [
                    selectedValues.filter((id) => id !== item.value),
                    selectedLabels.filter((label) => label !== item.label),
                ];
            } else {
                // Add the item to the selection
                return [
                    allowMultipleSelection ? [...selectedValues, item.value] : [item.value],
                    allowMultipleSelection ? [...selectedLabels, item.label] : [item.label],
                ];
            }
        });

        onItemSelected(item);
    };

    if (loading) {
        return (
            <div className="text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]">
                Loading options...
            </div>
        );
    }

    if (sortedOptions.length === 0) {
        return (
            <div className="text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]">
                No options available
            </div>
        );
    }

    return (
        <div className="dropdown-menu text-[#616161] bg-[rgb(255,255,255)] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px]">
            <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0">
                {sortedOptions.map((item) => {
                    const isChecked = contextState[0]?.includes(item.value);

                    return (
                        <li
                            key={item.value}
                            className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]"
                            onClick={() => handleItemClick(item)}
                        >
                            <div>
                                <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2  max-h-10">
                                    {item.label}
                                </p>
                            </div>
                            <div className="w-[16.5px] h-[16.5px]">
                                <input
                                    type="checkbox"
                                    value={item.value}
                                    checked={isChecked}
                                    className="custom-checkbox pointer-events-none w-[20px] h-full"
                                    readOnly
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DropdownMenu;
