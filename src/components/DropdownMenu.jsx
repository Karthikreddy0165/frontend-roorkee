import React, { useContext, useEffect, useRef, useState } from 'react';
import FilterContext from '@/Context/FilterContext';
const DropdownMenu = () => {
  const [allStates, setAllStates] = useState([]);
  const { states, setStates,
          statesFromApi
          } = useContext(FilterContext);
  useEffect(()=>{
    setAllStates(statesFromApi);
  },[])
  if(allStates.length === 0){return (
    <div className='text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]'>
      loading...
    </div>
  )}
  else {
    const uniqueCategories = [...allStates.map(item=>[item.id,item.state_name])].sort((a, b) => a[1].localeCompare(b[1]));

    const handleItemClick = (value) => {
      if(states.length != 0 && states[0].includes(value[0])){
        setStates((prev)=>{
          const filteredIds = prev[0].filter((id)=>id != value[0]);
          const filteredStates = prev[1].filter((state)=>state != value[1]);
          return [filteredIds,filteredStates]
        })
      }
      else{
        setStates((prev)=>{
          if(prev.length != 0){
            return [[...prev[0],value[0]],[...prev[1],value[1]]]
          }
          else{
            return [[value[0]],[value[1]]];
          }
        })
      }
    };
  
      return (
        <div className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0">
          <ul id="scroll-container" className="flex flex-col font-sans list-none pr-2 m-0 gap-0  h-[240px] overflow-y-auto  justify-content-between">
            {uniqueCategories.map((item, index) => (
              <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px]" onClick={() => handleItemClick(item)}>
              <div>
              <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
                {item[1]}
              </p>
              </div>
              <div className='w-[16.5] h-[16.5]'>
              <input type="checkbox" value={item} checked={states.length != 0 ? states[0].includes(item[0]):false} className="ml-10 custom-checkbox pointer-events-none w-full h-full" />
              </div>
            </li>
            ))}
          </ul>
        </div>
      );
  }
};

export default DropdownMenu;