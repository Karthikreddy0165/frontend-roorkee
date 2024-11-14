import React, { useContext, useEffect, useRef, useState } from 'react';
import FilterContext from '@/Context/FilterContext';
import PageContext from "@/Context/PageContext";
import { data } from 'autoprefixer';
import { convertToObject } from 'typescript';
import { object } from 'yup';
const DepartmentDropdownMenu = () => {
  const {  setCurrentPage } = useContext(PageContext);
  const [allDepartments, setAllDepartments] = useState({});
  const { departments, setDepartments } = useContext(FilterContext);
  const onlyDepartments = useRef([]);
  const ids = useRef([]);
  useEffect(()=>{
    async function fetchedStates(){
      const res = await fetch(`http://localhost:8000/api/departments/`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      else{
        const data = await res.json();
        const onlyGroup = {}
        data.map((i)=>{
          if(!Object.keys(onlyGroup).includes(i.group)){
            onlyGroup[i.group] = [];
          }
          onlyGroup[i.group].push(i.id);
        })
        setAllDepartments(onlyGroup);
      }
    }
    fetchedStates();
  },[])
  if(allDepartments.length === 0) return (
    <div className='text-onclick-btnblue text-[16px] mt-[-15px] mb-[7px]'>
      loading...
    </div>
  )
  
  // console.log(data,'departmewntsiohoso')
  else {
      const uniqueCategories = Object.keys(allDepartments).sort((a, b) => a.localeCompare(b));
    const handleItemClick = (value) => {
      setCurrentPage(1);
      const updatedVersion = {}
      if(Object.keys(departments).includes(value)){
        Object.keys(departments).filter((i)=>{
          if(i !== value){
            updatedVersion[i] = departments[i]
          }
        })
      }else{
        Object.keys(departments).map((i)=>{
          updatedVersion[i] = departments[i]
        })
        updatedVersion[value] = allDepartments[value];
      }
      console.log(updatedVersion,"habibi")
      setDepartments(updatedVersion);
      // if(departments.length != 0 && departments[0].includes(value[0])){
      //   setDepartments((prev)=>{
      //     const filteredIds = prev[0].filter((id)=>id != value[0]);
      //     const filteredDepartments = prev[1].filter((department)=>department != value[1]);
      //     return [filteredIds,filteredDepartments]
      //   })
      // }
      // else{
      //   setDepartments((prev)=>{
      //     if(prev.length != 0){
      //       return [[...prev[0],value[0]],[...prev[1],value[1]]]
      //     }
      //     else{
      //       return [[value[0]],[value[1]]];
      //     }
      //   })
      // }
    };
      return (
        <div className="text-[#616161] bg-[rgb(255,255,255)] w-[200] max-w-[600px] flex flex-col whitespace-wrap z-50 text-[14px] mt-0">
          <ul id="scroll-container" className="flex flex-col font-sans list-none pr-2 m-0 gap-0  max-h-[300px] overflow-y-auto  justify-content-between">
            {uniqueCategories.map((item, index) => {
              if(item !== ""){
              return(
                <li key={item + index} className="flex items-center justify-between hover:bg-gray-100 p-[8px] cursor-pointer hover:rounded-[8px] " onClick={() => handleItemClick(item)}>
                <div>
                <p className="leading-5 overflow-hidden overflow-ellipsis line-clamp-2 max-h-10">
                  {item}
                </p>
                </div>
                <div className='w-[16.5] h-[16.5]'>
                <input type="checkbox" value={item} checked={Object.keys(departments).includes(item)} className="ml-10 custom-checkbox pointer-events-none w-full h-full" />
                </div>
              </li>
              )
            }})}
          </ul>
          </div>
      );
  }
};

export default DepartmentDropdownMenu;
