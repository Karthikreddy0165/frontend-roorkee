"use client";

import { useState, useEffect, useContext } from "react";
import { useSort } from "@/Context/SortContext";
import { useAuth } from "@/Context/AuthContext";
import { ArrowUpDown } from "lucide-react";
import { useProfile } from "@/Context/ProfileContext";
import FilterContext from "@/Context/FilterContext";
export default function SortSelector() {
  const { ordering, setOrdering } = useSort();
  const [isOpen, setIsOpen] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    allow_information_usage: false,
    allow_information_sharing: false,
  });
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
  const { profileData } = useProfile();

  const [isPreferenceApplied, setIsPreferenceApplied] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isPreferenceApplied") === "true";
    }
    return false;
  });
  

  const { authState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDefaultFilter = async () => {
    setIsOpen(false)
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
      localStorage.setItem("isPreferenceApplied", "false");
      setOrdering("")
        setProfileFieldData({});
        setBeneficiaries([]);
        setStates([]);
        setDepartments({});
        setSponsoredBy([]);
        setFundingBy([]);
      } else {
        // Apply preferences
        setIsPreferenceApplied(true);
        setOrdering("")
        localStorage.setItem("isPreferenceApplied", "true");

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

  const canUsePreferences =
    privacySettings.allow_information_usage &&
    privacySettings.allow_information_sharing;

  const handleSelect = (value) => {
    setOrdering(value);
    setIsOpen(false);
    if (isPreferenceApplied) {
      // Clear preferences
      
    setIsPreferenceApplied(false);
    localStorage.setItem("isPreferenceApplied", "false");
    setOrdering("")
      setProfileFieldData({});
      setBeneficiaries([]);
      setStates([]);
      setDepartments({});
      setSponsoredBy([]);
      setFundingBy([]);
    }
  };

  return (
    <div className="relative flex items-center justify-end">
      <ArrowUpDown
        className="w-6 h-6 text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {canUsePreferences && (
            <button
              onClick={handleDefaultFilter}
              className={`block w-full text-left px-4 py-2 text-sm ${
                isPreferenceApplied
                  ? "bg-gray-100 text-[#3330BA]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Sort by Relevance
            </button>
          )}
          <button
            onClick={() => handleSelect("latest")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              ordering === "latest"
                ? "bg-gray-100 text-[#3330BA]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Latest First
          </button>
          <button
            onClick={() => handleSelect("title")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              ordering === "title"
                ? "bg-gray-100 text-[#3330BA]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Title
          </button>
        </div>
      )}
    </div>
  );
}
