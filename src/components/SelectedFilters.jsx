import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '@/Context/FilterContext';

function SelectedFilters() {

  const {states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries, sponseredBy, setSponseredBy} = useContext(FilterContext);

  const [newSponser, setNewSponser] = useState([]);
  const [newState, setNewState] = useState([]);
  const [newDepartment, setNewDepartment] = useState([]);

  useEffect(()=>{
    setNewSponser(sponseredBy[1] ? sponseredBy[1] : []);
    setNewState(states[1] ? states[1] : []);
    setNewDepartment(departments[1] ? departments[1] : []);
  },[sponseredBy, states, departments])

  console.log(beneficiaries);

  return (
    newSponser.length > 0 || newState.length > 0 || newDepartment.length > 0 || beneficiaries.length > 0 ? 
    <>
    <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
    <div className="mt-0 mb-5 flex gap-2 flex-wrap">
      {newState.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newState[0]}>{newState[0].length > 30 ? `${newState[1].substring(0, 30)}...` : newState[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newState[1]}>{newState[1].length > 30 ? `${newState[1].substring(0, 30)}...` : newState[1]}</button>
        </div>
      :
        <></>
      }
      {newState.length > 0 && newState.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newState[0]}>{newState[0].length > 30 ? `${newState[0].substring(0, 30)}...` : newState[0]}</button>
        </div>
      :
        <></>
      }
      {newState.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newState[0]}>{newState[0].length > 30 ? `${newState[0].substring(0, 30)}...` : newState[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newState[1]}>{newState[1].length > 30 ? `${newState[1].substring(0, 30)}...` : newState[1]} + {newState.length - 2} more</button>
        </div>
      :
        <></>
      }

      {newDepartment.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newDepartment[0]}>{newDepartment[0].length > 30 ? `${newDepartment[0].substring(0, 30)}...` : newDepartment[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newDepartment[1]}>{newDepartment[1].length > 30 ? `${newDepartment[1].substring(0, 30)}...` : newDepartment[1]}</button>
        </div>
      :
        <></>
      }
      {newDepartment.length > 0 && newDepartment.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newDepartment[0]}>{newDepartment[0].length > 30 ? `${newDepartment[0].substring(0, 30)}...` : newDepartment[0]}</button>
        </div>
      :
        <></>
      }
      {newDepartment.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newDepartment[0]}>{newDepartment[0].length > 30 ? `${newDepartment[0].substring(0, 30)}...` : newDepartment[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newDepartment[1]}>{newDepartment[1].length > 30 ? `${newDepartment[1].substring(0, 30)}...` : newDepartment[1]} + {newDepartment.length - 2} more</button>
        </div>
      :
        <></>
      }

      {beneficiaries.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[1]}>{beneficiaries[1].length > 30 ? `${beneficiaries[1].substring(0, 30)}...` : beneficiaries[1]}</button>
        </div>
      :
        <></>
      }
      {beneficiaries.length > 0 && beneficiaries.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
        </div>
      :
        <></>
      }
      {beneficiaries.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[1]}>{beneficiaries[1].length > 30 ? `${beneficiaries[1].substring(0, 30)}...` : beneficiaries[1]} + {beneficiaries.length - 2} more</button>
        </div>
      :
        <></>
      }

      {newSponser.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newSponser[0]}>{newSponser[0].length > 30 ? `${newSponser[0].substring(0, 30)}...` : newSponser[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newSponser[1]}>{newSponser[1].length > 30 ? `${newSponser[1].substring(0, 30)}...` : newSponser[1]}</button>
        </div>
      :
        <></>
      }
      {newSponser.length > 0 && newSponser.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newSponser[0]}>{newSponser[0].length > 30 ? `${newSponser[0].substring(0, 30)}...` : newSponser[0]}</button>
        </div>
      :
        <></>
      }
      {newSponser.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newSponser[0]}>{newSponser[0].length > 30 ? `${newSponser[0].substring(0, 30)}...` : newSponser[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={newSponser[1]}>{newSponser[1].length > 30 ? `${newSponser[1].substring(0, 30)}...` : newSponser[1]} + {newSponser.length - 2} more</button>
        </div>
      :
        <></>
      }
    </div> 
    </>
    : <></>
  )
}

export default SelectedFilters;
