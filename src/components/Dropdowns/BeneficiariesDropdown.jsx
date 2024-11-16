import React, { useContext } from 'react';
import FilterContext from '@/Context/FilterContext';
import PageContext from "@/Context/PageContext";

const DropdownMenu = () => {
  const { setCurrentPage } = useContext(PageContext);
  const { beneficiaries, setBeneficiaries } = useContext(FilterContext);

  const uniqueCategories = ["SC / ST", "OBC"].sort((a, b) => a.localeCompare(b));

  const handleItemClick = (value) => {
    setCurrentPage(1);
    setBeneficiaries((prev) =>
        prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value]
    );
  };

  return (
      <div className="dropdown-menu">
        <ul className="list">
          {uniqueCategories.map((item, index) => {
            const value = item === "SC / ST" ? "SC" : item;
            return (
                <li key={index} onClick={() => handleItemClick(value)}>
                  <label>
                    <input
                        type="checkbox"
                        value={value}
                        checked={beneficiaries.includes(value)}
                        readOnly
                    />
                    {item}
                  </label>
                </li>
            );
          })}
        </ul>
      </div>
  );
};

export default DropdownMenu;
