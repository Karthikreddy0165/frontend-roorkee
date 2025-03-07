import React, { useContext, useEffect, useState,useMemo } from "react";
import FilterContext from "@/Context/FilterContext";
import { useAuth } from "@/Context/AuthContext";
import ToolTips from "./ComponentsUtils/tooltips";
import PreferenceContext from "@/Context/preferenceContext";
import { useRouter } from "next/router";
import { useProfile } from "@/Context/ProfileContext";
function SelectedFilters() {
  const { profileData, setProfileData } = useProfile();
  const { state, beneficiarie } = useContext(PreferenceContext);
  const router = useRouter();

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
    handleRemoveFilter
  } = useContext(FilterContext);
  // console.log(states);
  const { authState } = useAuth();
  const newSponser = useMemo(
    () => (sponsoredBy[1] && sponsoredBy[1][0] !== "State" ? sponsoredBy[1] : []),
    [sponsoredBy]
  );
  
  const newState = useMemo(() => states[1] || [], [states]);
  
  const newDepartment = useMemo(() => Object.keys(departments), [departments]);
  

  useEffect(() => {
    const fetchEmailData = async () => {
      if (authState.token) {
        // console.log(state, "state")
      }
    };

    fetchEmailData();
  }, []);

  const clearAllFilters = () => {
    setStates([]);
    setDepartments({});
    setBeneficiaries([]);
    setFundingBy([]);
    setSponsoredBy([]);
  };

  const handleDefaultFilter = () => {
    if (!authState.token) {
      router.push("/login");
      return;
    }

    const preferenceData = profileData;
    if (!preferenceData) {
      return;
    }

    // Apply user preferences
    if (preferenceData?.community) {
      setBeneficiaries([preferenceData.community]);
    }

    const selectedValue = preferenceData?.state;
    const selectedState = statesFromApi.find(
      (it) => it.state_name === selectedValue
    );

    if (selectedState) {
      setStates([[selectedState.id], [selectedState.state_name]]);
    } else {
      setStates([]);
    }
  };
  const logUserEvent = async (eventType, schemeId = null, details = {}) => {
    const eventBody = {
      event_type: eventType,
      ...(schemeId && { scheme_id: schemeId }),
      details: details,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/log/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify(eventBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log event");
      }

      const data = await response.json();
      console.log("Event logged successfully:", data);
    } catch (error) {
      console.error("Error logging event:", error);
    }
  };
  if (
    newSponser.length > 0 ||
    newState.length > 0 ||
    newDepartment.length > 0 ||
    beneficiaries.length > 0
  ) {
    logUserEvent("filter", null, {
      newSponser,
      newState,
      newDepartment,
      beneficiaries,
    });
  }
  // console.log("states", newState);
  return newSponser.length > 0 ||
    newState.length > 0 ||
    newDepartment.length > 0 ||
    beneficiaries.length > 0 ? (
    <div className="flex justify-between  ">
      <div>
        <p className="text-gray-600 sm:text-sm mb-1 mt-[1rem]  text-[16px]">
          Selected Filters
        </p>
        <div className="mt-0 mb-5 flex gap-2 flex-wrap">
          {newState.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
                <span>
                  {newState[0].length > 30 ? `${newState[0].substring(0, 30)}...` : newState[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("state", newState[0]);
                  }}
                >
                  ✕
                </span>
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[1]}
              >
              <span>
              {newState[1].length > 30
                  ? `${newState[1].substring(0, 30)}...`
                  : newState[1]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("state", newState[1]);
                  }}
                >
                  ✕
                </span>
              </button>
            </div>
          ) : (
            <></>
          )}
          {newState.length > 0 && newState.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
              <span>
              {newState[0].length > 30
                  ? `${newState[0].substring(0, 30)}...`
                  : newState[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("state", newState[0]); // Function to remove the filter
                  }}
                >
                  ✕
                </span>                

              </button>
            </div>
          ) : (
            <></>
          )}
          {newState.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[0]}
              >
              <span>
              {newState[0].length > 30
                  ? `${newState[0].substring(0, 30)}...`
                  : newState[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("state", newState[0])// Function to remove the filter
                  }}
                >
                  ✕
                </span> 

              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newState[1]}
              >
              <span>
              {newState[1].length > 30
                  ? `${newState[1].substring(0, 30)}...`
                  : newState[1]}{" "}
                + {newState.length - 2} more
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("state", newState[1]);// Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}

          {newDepartment.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
              <span>
              {newDepartment[0].length > 30
                  ? `${newDepartment[0].substring(0, 30)}...`
                  : newDepartment[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("department",newDepartment[0] ); // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[1]}
              >
              <span>
              {newDepartment[1].length > 30
                  ? `${newDepartment[1].substring(0, 30)}...`
                  : newDepartment[1]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("department",newDepartment[1]); // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {newDepartment.length > 0 && newDepartment.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
              <span>
              {newDepartment[0].length > 30
                ? `${newDepartment[0].substring(0, 30)}...`
                : newDepartment[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("department",newDepartment[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {newDepartment.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[0]}
              >
              <span>
              {newDepartment[0].length > 30
                  ? `${newDepartment[0].substring(0, 30)}...`
                  : newDepartment[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("department",newDepartment[0]); // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newDepartment[1]}
              >
              <span>
              {newDepartment[1].length > 30
                  ? `${newDepartment[1].substring(0, 30)}...`
                  : newDepartment[1]}{" "}
                + {newDepartment.length - 2} more
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("department",newDepartment[1]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}

          {beneficiaries.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
              <span>
              {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("beneficiaries",beneficiaries[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[1]}
              >
              <span>
              {beneficiaries[1].length > 30
                  ? `${beneficiaries[1].substring(0, 30)}...`
                  : beneficiaries[1]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("beneficiaries",beneficiaries[1]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {beneficiaries.length === 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
              <span>
              {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("beneficiaries",beneficiaries[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {beneficiaries.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[0]}
              >
              <span>
              {beneficiaries[0].length > 30
                  ? `${beneficiaries[0].substring(0, 30)}...`
                  : beneficiaries[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("beneficiaries",beneficiaries[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={beneficiaries[1]}
              >
              <span>
              {beneficiaries[1].length > 30
                  ? `${beneficiaries[1].substring(0, 30)}...`
                  : beneficiaries[1]}{" "}
                + {beneficiaries.length - 2} more
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("beneficiaries",beneficiaries[1]); // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}

          {newSponser.length === 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
              <span>
              {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("sponsoredBy",newSponser[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[1]}
              >
              <span>
              {newSponser[1].length > 30
                  ? `${newSponser[1].substring(0, 30)}...`
                  : newSponser[1]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("sponsoredBy",newSponser[1])// Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponser.length > 0 && newSponser.length <= 1 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
              <span>
              {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("sponsoredBy",newSponser[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
          {newSponser.length > 2 ? (
            <div className=" flex gap-2">
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[0]}
              >
              <span>
              {newSponser[0].length > 30
                  ? `${newSponser[0].substring(0, 30)}...`
                  : newSponser[0]}
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("sponsoredBy",newSponser[0]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 

              </button>
              <button
                className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue"
                data-full-text={newSponser[1]}
              >
              <span>
              {newSponser[1].length > 30
                  ? `${newSponser[1].substring(0, 30)}...`
                  : newSponser[1]}{" "}
                + {newSponser.length - 2} more
                </span>
                <span
                  className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering parent button click
                    handleRemoveFilter("sponsoredBy",newSponser[1]) // Function to remove the filter
                  }}
                >
                  ✕
                </span> 
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="mt-4 z-10">
        {/* Tooltip applied to the button */}
        <ToolTips tooltip="Set Your Preferences Here">
          <button
            className="flex-shrink-0 px-4 py-2 rounded-lg  border border-gray-400  bg-[#3330BA] text-white font-inter text-[12px] font-medium  sm:text-sm"
            onClick={handleDefaultFilter}
          >
            My Preference
          </button>
        </ToolTips>
      </div>
    </div>
  ) : (
    <div className="flex justify-between mt-[1rem]">
      <div className="mt-0 mb-5 flex gap-2 flex-wrap">
        <div>
          <p className="text-gray-600 sm:text-sm mb-1 text-[16px]">
            Selected Filters
          </p>
          <button className="flex items-center justify-center pr-2 pl-2 py-[4px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick hover:text-onclick-btnblue">
            None
          </button>
        </div>
      </div>
      <div className ='z-10'>
        <ToolTips tooltip="Apply your preferences">
          <button
            className="flex-shrink-0 px-4 py-2 rounded-lg  border border-gray-400 bg-white text-[#3330BA] font-inter text-[12px] font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue sm:text-sm"
            onClick={handleDefaultFilter}
          >
            My Preference
          </button>
        </ToolTips>
      </div>
    </div>
  );
}

export default SelectedFilters;
