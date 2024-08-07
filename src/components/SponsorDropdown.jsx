import React, { useContext, useEffect, useRef, useState } from "react";
import FilterContext from "@/Context/FilterContext";
import StateDropdownMenu from "./DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const SponsorDropdownMenu = () => {
  const [allLevel, setAllLevel] = useState([]);
  const { sponseredBy, setSponseredBy, states, setStates } =
    useContext(FilterContext);
  // useEffect(()=>{
  //   async function fetchedSponsors(){
  //     const res = await fetch(`http://65.0.103.91:80/api/sponsors/`);
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     else{
  //       const data = await res.json();
  //       setAllLevel(data);
  //     }
  //   }
  //   fetchedSponsors();
  // },[])
  // if(allLevel.length === 0){return (
  //   <div className='text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]'>
  //     loading...
  //   </div>
  // )}
  // else {
  const uniqueCategories = [
    [2, "Central"],
    [1, "State"],
  ];

  const handleItemClick = (value) => {
    if (sponseredBy.length != 0 && sponseredBy[0].includes(value[0])) {
      setSponseredBy([])
      // if(value[0] == 2){
      //   setSponseredBy([]);
      // }
      // setSponseredBy((prev) => {
      //   const filteredIds = prev[0].filter((id) => id != value[0]);
      //   const filteredSponseredBy = prev[1].filter(
      //     (sponsors) => sponsors != value[1]
      //   );
      //   return [filteredIds, filteredSponseredBy];
      // });
    } else {
      setSponseredBy([[value[0]], [value[1]]]);
      // setSponseredBy((prev)=>{
      //   if(prev.length != 0){
      //     return [[...prev[0],value[0]],[...prev[1],value[1]]]
      //   }
      //   else{
      //     return [[value[0]],[value[1]]];
      //   }
      // })
    }
  };
  return (
    <div className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0">
      <ul className="flex flex-col font-sans list-none p-0 m-0 gap-0 pb-[18px]">
        {uniqueCategories.map((item, index) => (
          <li
            key={item + index}
            className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]"
            onClick={() => handleItemClick(item)}
          >
            <div>
              <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10 text-black">
                {item[1]}
              </p>
            </div>
            {item[0] != 1 && (
              <div className="w-[16.5] h-[16.5]">
                <input
                  type="checkbox"
                  value={item}
                  checked={
                    sponseredBy.length != 0
                      ? sponseredBy[0].includes(item[0])
                      : false
                  }
                  className="ml-10 custom-checkbox pointer-events-none w-full h-full"
                />
              </div>
            )}
            {item[0] == 1 &&
              sponseredBy.length != 0 &&
              sponseredBy[0][0] == 1 && <IoIosArrowUp className="text-black" />}
            {item[0] == 1 &&
              ((sponseredBy.length != 0 && sponseredBy[0][0] != 1) ||
                sponseredBy.length == 0) && (
                <IoIosArrowDown className="text-black" />
              )}
          </li>
        ))}
        {sponseredBy.length != 0 && sponseredBy[0][0] == 1 && (
          <StateDropdownMenu />
        )}
      </ul>
    </div>
  );
  // }
};

export default SponsorDropdownMenu;

// [2, 'Central']
// [1, 'State']
