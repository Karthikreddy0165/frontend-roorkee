import React, { useContext, useEffect, useState, useMemo } from "react";
import FilterContext from "@/Context/FilterContext";
import { useAuth } from "@/Context/AuthContext";
import ToolTips from "./ComponentsUtils/tooltips";
import { useRouter } from "next/router";
import { useProfile } from "@/Context/ProfileContext";

function SelectedFilters() {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [isPreferenceApplied, setIsPreferenceApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    allow_information_usage: false,
    allow_information_sharing: false,
  });
  const MAX_VISIBLE_FILTERS = 3;

  const { profileData } = useProfile();
  const router = useRouter();
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
    handleRemoveFilter,
    setProfileFieldData,
  } = useContext(FilterContext);

  const { authState } = useAuth();

  // Fetch privacy settings when component mounts or auth changes
  useEffect(() => {
    const fetchPrivacySettings = async () => {
      if (authState?.token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/privacy-settings/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setPrivacySettings({
              allow_information_usage: data.allow_information_usage,
              allow_information_sharing: data.allow_information_sharing,
            });
          }
        } catch (error) {
          console.error("Error fetching privacy settings:", error);
        }
      }
    };

    fetchPrivacySettings();
  }, [authState?.token]);

  const newSponser = useMemo(
    () =>
      sponsoredBy[1] && sponsoredBy[1][0] !== "State" ? sponsoredBy[1] : [],
    [sponsoredBy]
  );

  const newState = useMemo(() => states[1] || [], [states]);
  const newDepartment = useMemo(() => Object.keys(departments), [departments]);

  const canUsePreferences =
    privacySettings.allow_information_usage &&
    privacySettings.allow_information_sharing;

  const handleDefaultFilter = async () => {
    if (!authState.token) {
      router.push("/login");
      return;
    }

    if (!canUsePreferences) {
      return;
    }

    setIsLoading(true);

    try {
      if (isPreferenceApplied) {
        // Clear preferences
        setIsPreferenceApplied(false);
        setProfileFieldData({});
        setBeneficiaries([]);
        setStates([]);
        setDepartments({});
        setSponsoredBy([]);
        setFundingBy([]);
      } else {
        // Apply preferences
        setIsPreferenceApplied(true);

        if (profileData) {
          setProfileFieldData(profileData);

          // Apply community preference
          if (profileData?.community) {
            setBeneficiaries([profileData.community]);
          }

          // Apply state preference
          const selectedValue = profileData?.state;
          const selectedState = statesFromApi.find(
            (it) => it.state_name === selectedValue
          );

          if (selectedState) {
            setStates([[selectedState.id], [selectedState.state_name]]);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderFilterButton = (filterValue, filterType) => {
    return (
      <button
        key={filterValue}
        data-testid="selected-filter"
        className="flex items-center justify-center px-2 py-[5px] border border-gray-400 rounded-[8px] bg-white text-[#3330BA] font-inter text-xs font-medium hover:border-onclick-btnblue hover:text-onclick-btnblue whitespace-nowrap"
        data-full-text={filterValue}
      >
        <span>
          {filterValue.length > 30
            ? `${filterValue.substring(0, 30)}...`
            : filterValue}
        </span>
        <span
          data-testid="remove-filter"
          className="ml-2 text-gray-500 hover:text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFilter(filterType, filterValue);
          }}
        >
          ✕
        </span>
      </button>
    );
  };

  const renderPreferenceButton = () => {
    if (!authState.token) {
      return (
        <ToolTips tooltip="Login to use preferences">
          <button
            className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white text-[#3330BA] font-inter text-[12px] font-medium sm:text-sm"
            onClick={() => router.push("/login")}
          >
            My Preference
          </button>
        </ToolTips>
      );
    }

    if (!canUsePreferences) {
      return (
        <ToolTips tooltip="Enable information usage and sharing in Privacy Settings to use preferences">
          <button
            className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-gray-200 text-gray-500 font-inter text-[12px] font-medium sm:text-sm cursor-not-allowed"
            disabled
          >
            My Preference
          </button>
        </ToolTips>
      );
    }

    return (
      <ToolTips
        tooltip={`${
          isPreferenceApplied
            ? "Clear your preferences"
            : "Apply your preference"
        }`}
      >
        <button
          className={`w-full px-4 py-2 font-inter text-[12px] font-medium sm:text-sm rounded-lg
          ${
            isPreferenceApplied
              ? "bg-[#3330BA] text-white border-gray-400 hover:border-onclick-btnblue hover:bg-[#3330BA]"
              : "border border-gray-400 bg-white text-[#3330BA]"
          }`}
          onClick={handleDefaultFilter}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isPreferenceApplied ? "Clearing..." : "Applying..."}
            </>
          ) : (
            "My Preference"
          )}
        </button>
      </ToolTips>
    );
  };

  const hasFilters =
    newSponser.length > 0 ||
    newState.length > 0 ||
    newDepartment.length > 0 ||
    beneficiaries.length > 0;

  if (hasFilters) {
    return (
      <div className="flex justify-between">
        <div className="flex-1 mr-4 overflow-hidden">
          <p className="text-gray-600 sm:text-sm mb-1 mt-[1rem] text-[16px]">
            Selected Filters
          </p>
          <div className="mt-0 mb-5 overflow-x-auto pb-2 pr-2">
            <div className="flex gap-2 flex-wrap">
              {(() => {
                const allFilters = [
                  ...newState.map((state) => ({ value: state, type: "state" })),
                  ...newDepartment.map((dept) => ({
                    value: dept,
                    type: "department",
                  })),
                  ...beneficiaries.map((ben) => ({
                    value: ben,
                    type: "beneficiaries",
                  })),
                  ...newSponser.map((sponsor) => ({
                    value: sponsor,
                    type: "sponsoredBy",
                  })),
                ];

                const totalFilters = allFilters.length;
                const filtersToDisplay = showAllFilters
                  ? allFilters
                  : allFilters.slice(0, MAX_VISIBLE_FILTERS);

                return (
                  <>
                    {filtersToDisplay.map((filter) =>
                      renderFilterButton(filter.value, filter.type)
                    )}

                    <div className="block w-full">
                      {totalFilters > MAX_VISIBLE_FILTERS && (
                        <button
                          onClick={() => setShowAllFilters(!showAllFilters)}
                          className="text-[12px] text-gray-600 px-1 py-0 font-medium translate-y-1"
                        >
                          {showAllFilters
                            ? `Show Less`
                            : `Show All (${
                                totalFilters - MAX_VISIBLE_FILTERS
                              })`}
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-[140px] mt-4 z-10">
          {renderPreferenceButton()}
        </div>
      </div>
    );
  }

  return (
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
      <div className="flex-shrink-0 w-[140px] z-10">
        {renderPreferenceButton()}
      </div>
    </div>
  );
}

export default SelectedFilters;
