import React, { useEffect, useState } from 'react';

const DropdownMenu = React.forwardRef(({ selectedState, setSelectedState, setStateName, data }, ref) => {
  if(data === null) return (
    <div>
      loading...
    </div>
  )
  else {
    const [isShow, setIsShow] = useState(false);
    const categories = data.map(item => item.department.state);
    const uniqueCategories = [...new Set(categories)];
  
    const toggleShow = () => {
      setIsShow(!isShow);
    };
  
    const handleOptionChange = (event) => {
      const { checked, value } = event.target;
      setSelectedState(prevOptions => {
        if (checked) {
          return [...prevOptions, value];
        } else {
          return prevOptions.filter(option => option !== value);
        }
      });
    };
  
    const handleItemClick = (value) => {
      setSelectedState(prevOptions => {
        if (prevOptions.includes(value)) {
          return prevOptions.filter(option => option !== value);
        } else {
          return [...prevOptions, value];
        }
      });
    };
  
    const calculateInitialPosition = () => {
      const stateBtn = document.getElementById('stateBtn');
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
  
    useEffect(() => {
      console.log(selectedState);
    }, [selectedState]);
      useEffect(()=>{
        if(selectedState.length == 0){
          setStateName("")
        }else{
        const maxLength = 8;
        const stateName = selectedState[0];
        setStateName(`${selectedState.length}`);
        }
      }, [selectedState])
  
      return (
        <div style={dropdownStyle} className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0" ref={ref}>
          <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px]">
            {uniqueCategories.map((item, index) => (
              <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
              <div>
              <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
                {item}
              </p>
              </div>
              <div className='w-[16.5] h-[16.5]'>
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedState.includes(item)} className="ml-10 custom-checkbox pointer-events-none w-full h-full" />
              </div>
            </li>
            ))}
          </ul>
          </div>
      );
  }
  }
);

export default DropdownMenu;