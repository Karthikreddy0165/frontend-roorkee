// src/Context/PageContext.jsx
import { createContext, useState, useRef, useEffect } from 'react';

const FilterContext = createContext();

// export const usePageContext = () => useContext(PageContext);

function FilterProvider({ children }){
  const [states, setStates] = useState([]);
  const [departments, setDepartments] = useState({});
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [fundingBy, setFundingBy] = useState([]);
  const [sponseredBy, setSponseredBy] = useState([]);
  const [statesFromApi, setStatesFromApi] = useState([]);
  useEffect(()=>{
    async function fetchedStates(){
        const res = await fetch(`http://3.109.208.148:8000/api/states/`);
        if (!res.ok) {
          console.log(res.status)

          // throw new Error(`HTTP error! status: ${res.status}`);
        }
        else{
          const data = await res.json();
          const dataFromLocalStorage = JSON.parse(localStorage.getItem("profiledata"));
          if (dataFromLocalStorage?.community
          ) {
            setBeneficiaries([dataFromLocalStorage.community
            ]);
          } else {
            setBeneficiaries([]);
          }
          const selectedValue = dataFromLocalStorage?.state;
          // console.log(statesFromApi, "select");
          const selectedState = data.find(
            (it) => it.state_name === selectedValue
            );
      
          if (selectedState) {
            setStates([[selectedState.id], [selectedState.state_name]]);
          } else {
            setStates([]);
          }
          setStatesFromApi(data);
        }
      }
      fetchedStates();
      // setStates(JSON.parse(localStorage.getItem("profiledata")).state || [])
   
  },[])

  return (
    <FilterContext.Provider value={
        { states,setStates,
        departments, setDepartments, 
        beneficiaries, setBeneficiaries,
        fundingBy, setFundingBy,
        sponseredBy, setSponseredBy,
        statesFromApi, setStatesFromApi
        }}>
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContext;
export {FilterProvider};