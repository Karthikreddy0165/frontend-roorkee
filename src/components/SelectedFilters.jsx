import React, { useContext, useEffect, useState } from "react";
import FilterContext from "@/Context/FilterContext";
import { useAuth } from "@/Context/AuthContext";
// import { json } from "stream/consumers";
function SelectedFilters() {
  const {
    states,
    setStates,
    statesFromApi,
    departments,
    setDepartments,
    beneficiaries,
    setBeneficiaries,
    sponseredBy,
    setSponseredBy,
    setFundingBy,
  } = useContext(FilterContext);
  const { authState } = useAuth();
  const [newSponser, setNewSponser] = useState([]);
  const [newState, setNewState] = useState([]);
  const [newDepartment, setNewDepartment] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    setNewSponser(sponseredBy[1] ? sponseredBy[1] : []);
    setNewState(states[1] ? states[1] : []);
    setNewDepartment(Object.keys(departments) ? Object.keys(departments) : []);
  }, [sponseredBy, states, departments]);

  const kisiOrNamse = (localStorage.getItem("profiledata"))
  // console.log(kisiOrNamse,"kisiornamse")
  useEffect(() => {
    const fetchEmailData = async () => {
      if (authState.token) {
        // const profiledataa = localStorage.getItem("profiledata")
        // console.log(mypreferences, "ullaaa")
        const profiledataa = localStorage.getItem("profiledata");
        // const mypreferences = JSON.parse(profiledataa)
        // console.log(profiledataa, "proi")
        // setProfileData(profiledataa)
        setProfileData(JSON.parse(profiledataa));
      }
    };

    fetchEmailData();
  },[kisiOrNamse]);

  const clearAllFilters = () => {
    setStates([]);
    setDepartments({});
    setBeneficiaries([]);
    setFundingBy([]);
    setSponseredBy([]);
  };

  const handleDefaultFilter = () => {
    // Clear existing states
    setDepartments({});
    setFundingBy([]);
    setSponseredBy([]);
    setNewSponser([]);
    setNewDepartment([]);
    setNewState([]);
    setBeneficiaries([]);

    // Set the new default state values
    if (profileData.community
    ) {
      setBeneficiaries([profileData.community
      ]);
    } else {
      setBeneficiaries([]);
    }

    // console.log(profileData, "profiledatafinal");
    // console.log(profileData,"profiledatafilnal")
    const selectedValue = profileData.state;
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

  return newSponser.length > 0 ||
    newState.length > 0 ||
    newDepartment.length > 0 ||
    beneficiaries.length > 0 ? (
    <div className="flex justify-between">
      <div>
        <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
        <div className="mt-0 mb-5 flex gap-2 flex-wrap">
          {newState.length == 2 ? (
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

          {newDepartment.length == 2 ? (
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

          {beneficiaries.length == 2 ? (
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

          {newSponser.length == 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
                {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[1]}
              >
                {newSponser[1].length > 30
                  ? `${newSponser[1].substring(0, 30)}...`
                  : newSponser[1]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponser.length > 0 && newSponser.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
                {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponser.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
                {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[1]}
              >
                {newSponser[1].length > 30
                  ? `${newSponser[1].substring(0, 30)}...`
                  : newSponser[1]}{" "}
                + {newSponser.length - 2} more
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <button
          className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431BB] text-white hover:bg-blue-700 text-sm"
          onClick={clearAllFilters}
        >
          All schemes
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-between">
      <div className="mt-0 mb-5 flex gap-2 flex-wrap">
        <div>
          <p className="text-[#616161] text-sm mb-1 italic">Selected Filters</p>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue">
            None
          </button>
        </div>
      </div>
      <div>
        <button
          className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431BB] text-white hover:bg-blue-700 text-sm"
          onClick={handleDefaultFilter}
        >
          My Preference
        </button>
      </div>
    </div>
  );
}

export default SelectedFilters;
