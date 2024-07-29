import React, { forwardRef, useEffect, useState } from 'react';
import dummyData from '../dummyData.json'; // Importing JSON data

const DepartmentDropdownMenu = forwardRef((props, ref) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    // Filtering out schemes without a state
    const filteredData = dummyData.filter(item => item.state);
    // Extracting unique states from filtered data
    const uniqueStates = [...new Set(filteredData.map(item => item.state))];
    setStates(uniqueStates);
  }, []); // Empty dependency array ensures this effect runs only once on initial render

  return (
    <div className="absolute ml-[70px] mt-[-30px] bg-[rgb(251,251,251)] rounded-[12px] max-w-[600px] flex flex-col z-50" ref={ref}>
      <div className="max-h-[200px] overflow-y-auto">
        <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px] max-h-[200px] overflow-y-auto  justify-content-between">
          {states.map(item => (
            <li key={item} className="flex items-center my-[14px]">
              <input type="checkbox" className="relative top-[1.5px] mr-[7px]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default DepartmentDropdownMenu;
