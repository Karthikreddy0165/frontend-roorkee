import React, { useContext } from 'react';
import { RxCross2 } from "react-icons/rx";
import FilterContext from '@/Context/FilterContext';

const removeFilter = (event, setter, array) => {
  let elementToRemove = event.target.closest('button').getAttribute('data-full-text');
  let newArray = array.filter(item => item !== elementToRemove);
  setter(newArray);
}

function SelectedFilters() {

  const {states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries, sponseredBy, setSponseredBy} = useContext(FilterContext);

  return (
    states.length > 0 || departments.length > 0 || beneficiaries.length > 0 || sponseredBy.length > 0 ? 
    <>
    <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
    <div className="mt-0 mb-5 flex gap-2 flex-wrap">
      {states.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={states[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setStates, states)}/>{states[0].length > 30 ? `${states[0].substring(0, 30)}...` : states[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={states[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setStates, states)}/>{states[1].length > 30 ? `${states[1].substring(0, 30)}...` : states[1]}</button>
        </div>
      :
        <></>
      }
      {states.length > 0 && states.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={states[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setStates, states)}/>{states[0].length > 30 ? `${states[0].substring(0, 30)}...` : states[0]}</button>
        </div>
      :
        <></>
      }
      {states.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={states[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setStates, states)}/>{states[0].length > 30 ? `${states[0].substring(0, 30)}...` : states[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={states[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setStates, states)}/>{states[1].length > 30 ? `${states[1].substring(0, 30)}...` : states[1]} + {states.length - 2} more</button>
        </div>
      :
        <></>
      }
{console.log(departments)}

      {departments.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={departments[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setDepartments, departments)}/>{departments[0].length > 30 ? `${departments[0].substring(0, 30)}...` : departments[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={departments[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setDepartments, departments)}/>{departments[1].length > 30 ? `${departments[1].substring(0, 30)}...` : departments[1]}</button>
        </div>
      :
        <></>
      }
      {departments.length > 0 && departments.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={departments[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setDepartments, departments)}/>{departments[0].length > 30 ? `${departments[0].substring(0, 30)}...` : departments[0]}</button>
        </div>
      :
        <></>
      }
      {departments.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={departments[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setDepartments, departments)}/>{departments[0].length > 30 ? `${departments[0].substring(0, 30)}...` : departments[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={departments[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setDepartments, departments)}/>{departments[1].length > 30 ? `${departments[1].substring(0, 30)}...` : departments[1]} + {departments.length - 2} more</button>
        </div>
      :
        <></>
      }

      {/* {props.selectedFunders.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={props.selectedFunders[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, props.setSelectedFunders, props.selectedFunders)}/>{props.selectedFunders[0].length > 30 ? `${props.selectedFunders[0].substring(0, 30)}...` : props.selectedFunders[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={props.selectedFunders[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, props.setSelectedFunders, props.selectedFunders)}/>{props.selectedFunders[1].length > 30 ? `${props.selectedFunders[1].substring(0, 30)}...` : props.selectedFunders[1]}</button>
        </div>
      :
        <></>
      }
      {props.selectedFunders.length > 0 && props.selectedFunders.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={props.selectedFunders[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, props.setSelectedFunders, props.selectedFunders)}/>{props.selectedFunders[0].length > 30 ? `${props.selectedFunders[0].substring(0, 30)}...` : props.selectedFunders[0]}</button>
        </div>
      :
        <></>
      }
      {props.selectedFunders.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={props.selectedFunders[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, props.setSelectedFunders, props.selectedFunders)}/>{props.selectedFunders[0].length > 30 ? `${props.selectedFunders[0].substring(0, 30)}...` : props.selectedFunders[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={props.selectedFunders[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, props.setSelectedFunders, props.selectedFunders)}/>{props.selectedFunders[1].length > 30 ? `${props.selectedFunders[1].substring(0, 30)}...` : props.selectedFunders[1]} + {props.selectedFunders.length - 2} more</button>
        </div>
      :
        <></>
      } */}

      {beneficiaries.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setBeneficiaries, beneficiaries)}/>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setBeneficiaries, beneficiaries)}/>{beneficiaries[1].length > 30 ? `${beneficiaries[1].substring(0, 30)}...` : beneficiaries[1]}</button>
        </div>
      :
        <></>
      }
      {beneficiaries.length > 0 && beneficiaries.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setBeneficiaries, beneficiaries)}/>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
        </div>
      :
        <></>
      }
      {beneficiaries.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setBeneficiaries, beneficiaries)}/>{beneficiaries[0].length > 30 ? `${beneficiaries[0].substring(0, 30)}...` : beneficiaries[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={beneficiaries[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setBeneficiaries, beneficiaries)}/>{beneficiaries[1].length > 30 ? `${beneficiaries[1].substring(0, 30)}...` : beneficiaries[1]} + {beneficiaries.length - 2} more</button>
        </div>
      :
        <></>
      }

      {sponseredBy.length == 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={sponseredBy[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setSponseredBy, sponseredBy)}/>{sponseredBy[0].length > 30 ? `${sponseredBy[0].substring(0, 30)}...` : sponseredBy[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={sponseredBy[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setSponseredBy, sponseredBy)}/>{sponseredBy[1].length > 30 ? `${sponseredBy[1].substring(0, 30)}...` : sponseredBy[1]}</button>
        </div>
      :
        <></>
      }
      {sponseredBy.length > 0 && sponseredBy.length <= 1 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={sponseredBy[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setSponseredBy, sponseredBy)}/>{sponseredBy[0].length > 30 ? `${sponseredBy[0].substring(0, 30)}...` : sponseredBy[0]}</button>
        </div>
      :
        <></>
      }
      {sponseredBy.length > 2 ? 
        <div className=" flex gap-2">
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={sponseredBy[0]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setSponseredBy, sponseredBy)}/>{sponseredBy[0].length > 30 ? `${sponseredBy[0].substring(0, 30)}...` : sponseredBy[0]}</button>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue" data-full-text={sponseredBy[1]}><RxCross2 className="text-base font-bold mr-[2px]" onClick = {(e) => removeFilter(e, setSponseredBy, sponseredBy)}/>{sponseredBy[1].length > 30 ? `${sponseredBy[1].substring(0, 30)}...` : sponseredBy[1]} + {sponseredBy.length - 2} more</button>
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
