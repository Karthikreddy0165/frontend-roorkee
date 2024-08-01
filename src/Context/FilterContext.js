// src/Context/PageContext.jsx
import { createContext, useState, useRef, useEffect } from 'react';

const FilterContext = createContext();

// export const usePageContext = () => useContext(PageContext);

function FilterProvider({ children }){
  const [states, setStates] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [fundingBy, setFundingBy] = useState([]);
  const [sponseredBy, setSponseredBy] = useState([]);
  const [statesFromApi, setStatesFromApi] = useState([]);
  useEffect(()=>{
    async function fetchedStates(){
        const res = await fetch(`http://65.0.103.91:80/api/states/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        else{
          const data = await res.json();
          setStatesFromApi(data);
        }
      }
      fetchedStates();
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