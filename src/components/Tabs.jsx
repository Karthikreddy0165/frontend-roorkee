import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SearchInput from "./SearchInput";
import Schemes from "./Schemes"; 
import JobOpenings from "./JobOpenings";
import Scholarships from "./Scholarships"; 
import Saved from "./savedForLoginuser";
import { useTabContext } from "@/Context/TabContext";
import SelectedFilters from "./SelectedFilters";
import { FcAlphabeticalSortingZa } from "react-icons/fc";
import { FcAlphabeticalSortingAz } from "react-icons/fc";


export default function Tabs(props) {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabContext();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push({
      pathname: router.pathname,
      query: { tab },
    });
  };

  const getButtonClass = (tabName) => {
    return `flex-grow text-center font-sm p-[12px] rounded-t-[8px] text-semibold text-[14px] cursor-pointer font-sans ${
      activeTab === tabName
        ? "bg-[#EEEEFF] border-b-[3px] border-[#3431BB]"
        : "hover:bg-[#EEEEFF] hover:border-b-[3px] hover:border-[#3431BB]"
    }`;
  };

  return (
    <div className=" -mt-12 ">
      <SearchInput />

      {/* <div className=" flex items-center gap-8 h-14 px-3 ">
        <FcAlphabeticalSortingZa className="relative left-[800px]"/>
        <FcAlphabeticalSortingAz className="relative left-[700px]"/>
      </div> */}

      <SelectedFilters />

      <div className="flex justify-center items-center gap-[15px]">
        <button
          className={getButtonClass("Schemes")}
          onClick={() => handleTabClick("Schemes")}
        >
          Schemes
        </button>
        <button
          className={getButtonClass("Job Openings")}
          onClick={() => handleTabClick("Job Openings")}
        >
          Job Openings
        </button>
        <button
          className={getButtonClass("Scholarships")}
          onClick={() => handleTabClick("Scholarships")}
        >
          Scholarships
        </button>
        <button
          className={getButtonClass("Saved")}
          onClick={() => handleTabClick("Saved")}
        >
          Saved
        </button>
      </div>
      <hr />

      {/* Render the corresponding component based on activeTab */}
      {activeTab === "Schemes" && <Schemes />}
      {activeTab === "Job Openings" && <JobOpenings />}
      {activeTab === "Scholarships" && <Scholarships />}
      {activeTab === "Saved" && <Saved />}
    </div>
  );
}
