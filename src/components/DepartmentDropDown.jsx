import dummyData from '../dummyData.json';
import React, { useEffect, useState } from 'react';

const categories = dummyData.map(item => item.category);
const uniqueCategories = [...new Set(categories)];

const DepartmentDropdownMenu = React.forwardRef(({ selectedDepartments, setSelectedDepartments, setDepartmentName }, ref) => {
  const [tempSelectedDepartments, setTempSelectedDepartments] = useState([...selectedDepartments]);
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  const handleOptionChange = (event) => {
    const { checked, value } = event.target;
    setTempSelectedDepartments(prevOptions => {
      if (checked) {
        return [...prevOptions, value];
      } else {
        return prevOptions.filter(option => option !== value);
      }
    });
  };

  const handleItemClick = (value) => {
    setTempSelectedDepartments(prevOptions => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter(option => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  const calculateInitialPosition = () => {
    const stateBtn = document.getElementById('departmentBtn');
    if (stateBtn) {
      const { top, left } = stateBtn.getBoundingClientRect();
      return {
        top: `${top + window.scrollY + 31}px`,
        left: `${left + window.scrollX}px`,
      };
    }
    return {}; // Return a default position or an empty object if the button is not found
  };

  const [dropdownStyle, setDropdownStyle] = useState(calculateInitialPosition);
  useEffect(() => {
      const updatePosition = () => {
        const newPosition = calculateInitialPosition(); // Use the same function to calculate the new position
        setDropdownStyle(newPosition);
      };

      window.addEventListener('resize', updatePosition);
      return () => window.removeEventListener('resize', updatePosition);
    }, []);
    const handleClearAll = () => {
      setTempSelectedDepartments([]);
    };

  const applySelections = () => {
    setSelectedDepartments([...tempSelectedDepartments]);
  };

  useEffect(() => {
    console.log(selectedDepartments);
  }, [selectedDepartments]);

  if (selectedDepartments.length) {
    const maxLength = 8;
    const departmentName = selectedDepartments[0];
    setDepartmentName(`${departmentName.length > maxLength ? departmentName.substring(0, maxLength) + '...' : departmentName} ${selectedDepartments.length > 1 ? `+ ${selectedDepartments.length - 1}` : ""}`);
    return (
      <div style={dropdownStyle} className="absolute text-[13px] text-gray-500 bg-[rgb(255,255,255)] rounded-[8px] w-auto max-w-[600px] flex flex-col whitespace-wrap z-50 pl-[12px] pr-[8px] pt-[16px] pb-[8px] border border-solid border-[#E8EAEE] font-semibold min-w-[280px]" ref={ref}>
        <div className='pl-[8px] pr-[8px] pb-[7px]'>
          <p className = "text-dropdown-heading">DEPARTMENT</p>
        </div>
        <div className='pl-[8px] pr-[5px] pb-[7px] pt-[8px] text-gray-400 flex justify-between'>
          <p className = "font-semibold tracking-wider">SELECTED</p>
          <div className = "w-[20px] h-[20px] rounded-full text-[0.7rem] flex justify-center items-center bg-dropdown-blue text-gray-500">{selectedDepartments.length}</div>
        </div>
        <ul className="flex flex-col font-sans list-none p-0 text-xs m-0 gap-0 pb-[8px]">
          {uniqueCategories.filter(item => selectedDepartments.includes(item)).map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[16px] pb-[16px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedDepartments.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
            </li>
          ))}
          {uniqueCategories.length !== selectedDepartments.length && (
            <div className='px-2 pb-2 pt-2 text-gray-400'>
              <p className="font-semibold tracking-wider text-[12px] text-[#3431BB] cursor-pointer" onClick={toggleShow}>{isShow ? "SHOW LESS" : "SHOW MORE"}</p>
            </div>
          )}
          {isShow && uniqueCategories.filter(item => !selectedDepartments.includes(item)).map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[18px] pb-[18px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedDepartments.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
            </li>
          ))}
        </ul>
        <hr />
        <div className='flex flex-row justify-between items-center rounded-[8px] pl-[8px] pr-[8px] pt-[8px] font-light text-[12px]'>
          <button onClick={handleClearAll} className="text-gray-600 font-semibold focus:outline-none">
            Clear all
          </button>
          <button onClick={applySelections} className='bg-[#3431BB] pl-[30px] pr-[30px] pt-[8px] pb-[8px] rounded-[8px] text-white text-[13px]'>
            Apply
          </button>
        </div>
      </div>
    );
  } else {
    setDepartmentName("");
    return (
      <div style={dropdownStyle} className="absolute text-[13px] text-gray-500 bg-[rgb(255,255,255)] rounded-[8px] w-auto max-w-[600px] flex flex-col whitespace-wrap z-50 pl-[12px] pr-[8px] pt-[16px] pb-[8px] border border-solid border-[#E8EAEE] font-semibold min-w-[280px]" ref={ref}>
       <div className='pl-[8px] pr-[8px] pb-[7px]'>
          <p className = "text-dropdown-heading">DEPARTMENT</p>
        </div>
        <ul className="flex flex-col font-sans list-none p-0 text-xs m-0 gap-0 pb-[8px]">
          {uniqueCategories.map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[18px] pb-[18px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedDepartments.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
            </li>
          ))}
        </ul>
        <hr />
        <div className='flex flex-row justify-between items-center rounded-[8px] pl-[8px] pr-[8px] pt-[8px] font-light text-[12px]'>
          <button onClick={handleClearAll} className="text-gray-600 font-semibold focus:outline-none">
            Clear all
          </button>
          <button onClick={applySelections} className='bg-[#3431BB] pl-[30px] pr-[30px] pt-[8px] pb-[8px] rounded-[8px] text-white text-[13px]'>
            Apply
          </button>
        </div>
      </div>
    );
  }
});

export default DepartmentDropdownMenu;
