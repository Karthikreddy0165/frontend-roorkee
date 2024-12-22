import React, { useContext, useEffect, useRef, useState } from "react";
import FilterContext from "@/Context/FilterContext";
// import StateDropdownMenu from "./DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import PageContext from "@/Context/PageContext";
const SponsorDropdownMenu = () => {
  const {  setCurrentPage } = useContext(PageContext);
  const [allLevel, setAllLevel] = useState([]);
  const { sponseredBy, setSponseredBy, states, setStates } =
    useContext(FilterContext);
  const uniqueCategories = [
    [2, "Central"],
    [1, "State"],
  ];

  const handleItemClick = (value) => {
    setCurrentPage(1);
    if (sponseredBy.length != 0 && sponseredBy[0].includes(value[0])) {
      setSponseredBy([])

    } else {
      if(value[0] == 2){
        setStates([]);
      }
      setSponseredBy([[value[0]], [value[1]]]);

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
            <p className="flex leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10 text-black">
                {item[1]}
                {item[1] == "State" && states.length !== 0 ? <span className = "w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{states[1].length}</span> : <></>}
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
};

export default SponsorDropdownMenu;