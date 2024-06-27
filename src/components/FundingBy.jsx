import dummyData from '../dummyData.json';
import React, { useEffect, useState } from 'react';

const categories = dummyData.map(item => item.funding_by);
const uniqueCategories = [...new Set(categories)];

const FundingByDropdownMenu = React.forwardRef(({ selectedFunders, setSelectedFunders, setFunderName }, ref) => {
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [tempSelectedFunders, setTempSelectedFunders] = useState([...selectedFunders]);
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  const handleOptionChange = (event) => {
    const { checked, value } = event.target;
    setTempSelectedFunders(prevOptions => {
      if (checked) {
        return [...prevOptions, value];
      } else {
        return prevOptions.filter(option => option !== value);
      }
    });
  };

  const handleItemClick = (value) => {
    setTempSelectedFunders(prevOptions => {
      if (prevOptions.includes(value)) {
        return prevOptions.filter(option => option !== value);
      } else {
        return [...prevOptions, value];
      }
    });
  };

  useEffect(() => {
    const updatePosition = () => {
      const fundBtn = document.getElementById('fundingbyBtn');
      if (fundBtn) {
        const { top, left } = fundBtn.getBoundingClientRect();
        setDropdownStyle({
          top: `${top + window.scrollY + 31}px`,
          left: `${left + window.scrollX}px`,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const handleClearAll = () => {
    setTempSelectedFunders([]);
  };

  const applySelections = () => {
    setSelectedFunders([...tempSelectedFunders]);
  };

  useEffect(() => {
    console.log(selectedFunders);
  }, [selectedFunders]);

  if (selectedFunders.length) {
    const maxLength = 8;
    const funderName = selectedFunders[0];
    setFunderName(`${funderName.length > maxLength ? funderName.substring(0, maxLength) + '...' : funderName} ${selectedFunders.length > 1 ? `+ ${selectedFunders.length - 1}` : ""}`);
    return (
      <div style={dropdownStyle} className="absolute text-[13px] text-gray-500 bg-[rgb(255,255,255)] rounded-[8px] w-auto max-w-[600px] flex flex-col whitespace-wrap z-50 pl-[12px] pr-[8px] pt-[16px] pb-[8px] border border-solid border-[#E8EAEE] font-semibold min-w-[280px]" ref={ref}>
        <div className='pl-[8px] pr-[8px] pb-[7px]'>
          <p className = "text-dropdown-heading">FUNDING BY</p>
        </div>
        <div className='pl-[8px] pr-[5px] pb-[7px] pt-[8px] text-gray-400 flex justify-between'>
          <p className = "font-semibold tracking-wider">SELECTED</p>
          <div className = "w-[20px] h-[20px] rounded-full text-[0.7rem] flex justify-center items-center bg-dropdown-blue text-gray-500">{selectedFunders.length}</div>
        </div>
        <ul className="flex flex-col font-sans list-none p-0 text-xs m-0 gap-0 pb-[8px]">
          {uniqueCategories.filter(item => selectedFunders.includes(item)).map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[16px] pb-[16px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedFunders.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
            </li>
          ))}
          {uniqueCategories.length !== selectedFunders.length && (
            <div className='px-2 pb-2 pt-2 text-gray-400'>
              <p className="font-semibold tracking-wider text-[12px] text-[#3431BB] cursor-pointer" onClick={toggleShow}>{isShow ? "SHOW LESS" : "SHOW MORE"}</p>
            </div>
          )}
          {isShow && uniqueCategories.filter(item => !selectedFunders.includes(item)).map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[18px] pb-[18px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedFunders.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
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
    setFunderName("");
    return (
      <div style={dropdownStyle} className="absolute text-[13px] text-gray-500 bg-[rgb(255,255,255)] rounded-[8px] w-auto max-w-[600px] flex flex-col whitespace-wrap z-50 pl-[12px] pr-[8px] pt-[16px] pb-[8px] border border-solid border-[#E8EAEE] font-semibold min-w-[280px]" ref={ref}>
       <div className='pl-[8px] pr-[8px] pb-[7px]'>
          <p className = "text-dropdown-heading">FUNDING BY</p>
        </div>
        <ul className="flex flex-col font-sans list-none p-0 text-xs m-0 gap-0 pb-[8px]">
          {uniqueCategories.map((item, index) => (
            <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 h-9 pl-[8px] pr-[8px] pt-[18px] pb-[18px] rounded-[8px] text-black cursor-pointer" onClick={() => handleItemClick(item)}>
              {item}
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={tempSelectedFunders.includes(item)} className="ml-10 custom-checkbox pointer-events-none" />
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

export default FundingByDropdownMenu;