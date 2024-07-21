import React, { useEffect, useState } from 'react';

  const DepartmentDropdownMenu = React.forwardRef(({ selectedDepartments, setSelectedDepartments, setDepartmentName, data }, ref) => {
    if(data === null) return (
      <div className='text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]'>
        loading...
      </div>
    )
    else {
    const [isShow, setIsShow] = useState(false);
    const categories = data.map(item => item.department.department_name);
    const uniqueCategories = [...new Set(categories)];
  
    const toggleShow = () => {
      setIsShow(!isShow);
    };
  
    const handleOptionChange = (event) => {
      const { checked, value } = event.target;
      setSelectedDepartments(prevOptions => {
        if (checked) {
          return [...prevOptions, value];
        } else {
          return prevOptions.filter(option => option !== value);
        }
      });
    };
  
    const handleItemClick = (value) => {
      setSelectedDepartments(prevOptions => {
        if (prevOptions.includes(value)) {
          return prevOptions.filter(option => option !== value);
        } else {
          return [...prevOptions, value];
        }
      });
    };
  
    useEffect(() => {
      console.log(selectedDepartments);
    }, [selectedDepartments]);
    useEffect(()=>{
      if(selectedDepartments.length == 0){
        setDepartmentName("")
      }else{
      setDepartmentName(`${selectedDepartments.length}`);
      }
    }, [selectedDepartments])
  
      return (
        <div className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0" ref={ref}>
          <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px]">
            {uniqueCategories.map((item, index) => (
              <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
              <div>
              <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
                {item}
              </p>
              </div>
              <div className='w-[16.5] h-[16.5]'>
              <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedDepartments.includes(item)} className="ml-10 custom-checkbox pointer-events-none w-full h-full" />
              </div>
            </li>
            ))}
          </ul>
          </div>
      );
      }
    }
  );
  
  export default DepartmentDropdownMenu;