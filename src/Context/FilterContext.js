// src/Context/PageContext.jsx
import { createContext, useState, useRef, useEffect } from 'react';

const FilterContext = createContext();

function FilterProvider({ children }) {
    const [states, setStates] = useState([]);
    const [departments, setDepartments] = useState({});
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [fundingBy, setFundingBy] = useState([]);
    const [sponsoredBy, setSponsoredBy] = useState([]);
    const [statesFromApi, setStatesFromApi] = useState([]);

    useEffect(() => {
        async function fetchedStates() {
            const res = await fetch(`http://65.0.122.213:8000/api/states/`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            } else {
                const data = await res.json();
                const dataFromLocalStorage = JSON.parse(localStorage.getItem("profiledata"));
                if (dataFromLocalStorage?.community) {
                    setBeneficiaries([dataFromLocalStorage.community]);
                } else {
                    setBeneficiaries([]);
                }
                const selectedValue = dataFromLocalStorage?.state;
                const selectedState = data.find(it => it.state_name === selectedValue);
                if (selectedState) {
                    setStates([[selectedState.id], [selectedState.state_name]]);
                } else {
                    setStates([]);
                }
                setStatesFromApi(data);
            }
        }
        fetchedStates();
    }, []);

    return (
        <FilterContext.Provider value={{
            states, setStates,
            departments, setDepartments,
            beneficiaries, setBeneficiaries,
            fundingBy, setFundingBy,
            sponsoredBy, setSponsoredBy,
            statesFromApi, setStatesFromApi
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
export { FilterProvider };
