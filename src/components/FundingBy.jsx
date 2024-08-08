import React, { useEffect, useState } from 'react';

const FundingByDropdownMenu = React.forwardRef(({ selectedFunders, setSelectedFunders, setFunderName, data }, ref) => {
  if(data === null) return (
    <div className='text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]'>
      loading...
    </div>
  )
  else {
    const [isShow, setIsShow] = useState(false);
    const categories = data.map(item => item.funding_pattern);
    const uniqueCategories = [...new Set(categories)];
  
    const toggleShow = () => {
      setIsShow(!isShow);
    };
  
    const handleOptionChange = (event) => {
      const { checked, value } = event.target;
      setSelectedFunders(prevOptions => {
        if (checked) {
          return [...prevOptions, value];
        } else {
          return prevOptions.filter(option => option !== value);
        }
      });
    };
  
    const handleItemClick = (value) => {
      setSelectedFunders(prevOptions => {
        if (prevOptions.includes(value)) {
          return prevOptions.filter(option => option !== value);
        } else {
          return [...prevOptions, value];
        }
      });
    };
  
    useEffect(() => {
      // console.log(selectedFunders);
    }, [selectedFunders]);
    useEffect(()=>{
      if(selectedFunders.length == 0){
        setFunderName("")
      }else{
      setFunderName(`${selectedFunders.length}`);
      }
    }, [selectedFunders])

  
      return (
        <div className="text-[#616161] bg-[rgb(255,255,255)] w-[265px] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0" ref={ref}>
          <ul id="scroll-container" className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px] max-h-[200px] overflow-y-auto  justify-content-between ">
            {uniqueCategories.map((item, index) => (
              item !== "" && (
               <li key={item + index} className="flex w-[255.5px] items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
               <div>
                <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
                  {item}
                </p>
               </div>
               <div className='w-[16.5] h-[16.5]'>
               <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedFunders.includes(item)} className=" custom-checkbox pointer-events-none w-full h-full" />
               </div>
             </li>
)))}
          </ul>
          </div>
      );
      }
    }
  );
  
  export default FundingByDropdownMenu;


  // return (
  //   <div className=" department  text-[#616161]  w-[265px] max-w-[600px] flex flex-col relative whitespace-wrap z-50 text-[14px] -mt-2 " ref={ref} >
  //     <ul id="scroll-container" className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px] max-h-[200px] overflow-y-auto  justify-content-between ">
  //       {uniqueCategories.map((item, index) => (
  //         <li key={item + index} className="  flex w-[185.5px] items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
  //           <div className="leading-5 overflow-hidden overflow-x-auto overflow-ellipsis line-clamp-2 max-h-10 whitespace-nowrap w-[100%] ">
  //             {item}
  //           </div>
  //           <div className='w-[16.5px] h-[16.5px] mr-[-70px]'>
  //             <input type="checkbox" value={item} onChange={handleOptionChange} checked={selectedDepartments.includes(item)} className=" custom-checkbox pointer-events-none w-full h-full" />
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
      
  //   </div>
  // );