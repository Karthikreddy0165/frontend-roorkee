import React, { useContext, useEffect, useState } from "react";
import FilterContext from "@/Context/FilterContext";
import { useAuth } from "@/Context/AuthContext";
import PreferenceContext from "@/Context/preferenceContext";
function SelectedFilters() {

  const { state, beneficiarie } = useContext(PreferenceContext);

    // console.log(state, "state");
    // console.log(beneficiarie, "beneficiaries");


  const {
    states,
    setStates,
    statesFromApi,
    departments,
    setDepartments,
    beneficiaries,
    setBeneficiaries,
    sponsoredBy,
    setSponsoredBy,
    setFundingBy,
  } = useContext(FilterContext);


  const { authState } = useAuth();
  const [newSponsor, setNewSponsor] = useState([]);
  const [newState, setNewState] = useState([]);
  const [newDepartment, setNewDepartment] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    setNewSponsor(sponsoredBy[1] ? sponsoredBy[1] : []);
    setNewState(states[1] ? states[1] : []);
    setNewDepartment(Object.keys(departments) ? Object.keys(departments) : []);
  }, [sponsoredBy, states, departments]);

  useEffect(() => {
    const fetchEmailData = async () => {
      if (authState.token) {
        // console.log(state, "state")
      }
    };

    fetchEmailData();
  },[]);

  const clearAllFilters = () => {
    setStates([]);
    setDepartments({});
    setBeneficiaries([]);
    setFundingBy([]);
    setSponsoredBy([]);
  };

  const handleDefaultFilter = () => {
    // Clear existing states
    setDepartments({});
    setFundingBy([]);
    setSponsoredBy([]);
    setNewSponsor([]);
    setNewDepartment([]);
    setNewState([]);
    setBeneficiaries([]);
    const preferenceData = JSON.parse(localStorage.getItem("profiledata"));
    console.log(preferenceData);
    // Set the new default state values
    if (preferenceData?.community
    ) {
      setBeneficiaries([preferenceData?.community
      ]);
    } else {
      setBeneficiaries([]);
    }

    const selectedValue = preferenceData?.state;
    // console.log(statesFromApi, "select");
    const selectedState = statesFromApi.find(
      (it) => it.state_name === selectedValue
    );

    if (selectedState) {
      setStates([[selectedState.id], [selectedState.state_name]]);
    } else {
      setStates([]);
    }
  };

  return newSponsor.length > 0 ||
    newState.length > 0 ||
    newDepartment.length > 0 ||
    beneficiaries.length > 0 ? (
    <div className="flex justify-between">
      <div>
        <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
        <div className="mt-0 mb-5 flex gap-2 flex-wrap">
          {newState.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
                {newState[0].length > 30
                  ? `${newState[1].substring(0, 30)}...`
                  : newState[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[1]}
              >
                {newState[1].length > 30
                  ? `${newState[1].substring(0, 30)}...`
                  : newState[1]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newState.length > 0 && newState.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
                {newState[0].length > 30
                  ? `${newState[0].substring(0, 30)}...`
                  : newState[0]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newState.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
                {newState[0].length > 30
                  ? `${newState[0].substring(0, 30)}...`
                  : newState[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[1]}
              >
                {newState[1].length > 30
                  ? `${newState[1].substring(0, 30)}...`
                  : newState[1]}{" "}
                + {newState.length - 2} more
              </button>
            </div>
          ) : (
            <></>
          )}

          {newDepartment.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
                {newDepartment[0].length > 30
                  ? `${newDepartment[0].substring(0, 30)}...`
                  : newDepartment[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[1]}
              >
                {newDepartment[1].length > 30
                  ? `${newDepartment[1].substring(0, 30)}...`
                  : newDepartment[1]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newDepartment.length > 0 && newDepartment.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
                {newDepartment[0].length > 30
                  ? `${newDepartment[0].substring(0, 30)}...`
                  : newDepartment[0]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newDepartment.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
                {newDepartment[0].length > 30
                  ? `${newDepartment[0].substring(0, 30)}...`
                  : newDepartment[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[1]}
              >
                {newDepartment[1].length > 30
                  ? `${newDepartment[1].substring(0, 30)}...`
                  : newDepartment[1]}{" "}
                + {newDepartment.length - 2} more
              </button>
            </div>
          ) : (
            <></>
          )}

          {beneficiaries.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
                {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[1]}
              >
                {beneficiaries[1].length > 30
                  ? `${beneficiaries[1].substring(0, 30)}...`
                  : beneficiaries[1]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {beneficiaries.length == 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
                {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {beneficiaries.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
                {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[1]}
              >
                {beneficiaries[1].length > 30
                  ? `${beneficiaries[1].substring(0, 30)}...`
                  : beneficiaries[1]}{" "}
                + {beneficiaries.length - 2} more
              </button>
            </div>
          ) : (
            <></>
          )}

          {newSponsor.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponsor[0]}
              >
                {newSponsor[0].length > 30
                  ? `${newSponsor[0].substring(0, 30)}...`
                  : newSponsor[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponsor[1]}
              >
                {newSponsor[1].length > 30
                  ? `${newSponsor[1].substring(0, 30)}...`
                  : newSponsor[1]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponsor.length > 0 && newSponsor.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponsor[0]}
              >
                {newSponsor[0].length > 30
                  ? `${newSponsor[0].substring(0, 30)}...`
                  : newSponsor[0]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponsor.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponsor[0]}
              >
                {newSponsor[0].length > 30
                  ? `${newSponsor[0].substring(0, 30)}...`
                  : newSponsor[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponsor[1]}
              >
                {newSponsor[1].length > 30
                  ? `${newSponsor[1].substring(0, 30)}...`
                  : newSponsor[1]}{" "}
                + {newSponsor.length - 2} more
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
      <button
          className="flex-shrink-0 px-4 py-2 rounded-lg  border border-gray-400 bg-white text-gray-600 font-inter text-sm font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
          onClick={clearAllFilters}
        >
          My Preference
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-between">
      <div className="mt-0 mb-5 flex gap-2 flex-wrap">
        <div>
          <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick hover:text-onclick-btnblue">
            None
          </button>
        </div>
      </div>
      <div>
        
        <button
        
          className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-sm"
          onClick={handleDefaultFilter}
        >
          My Preference
        </button>
      </div>
    </div>
  );
}

export default SelectedFilters;
