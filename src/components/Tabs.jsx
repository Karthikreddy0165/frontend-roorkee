import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SearchInput from "./SearchInput";
import Schemes from "./Schemes"; // Adjust path as per your project structure
import JobOpenings from "./JobOpenings"; // Adjust path as per your project structure
import Scholarships from "./Scholarships"; // Adjust path as per your project structure
import Saved from "./savedForLoginuser";
import { useTabContext } from "@/Context/TabContext";

export default function Tabs() {
  const router = useRouter();
  const { tab } = router.query;
  const { activeTab, setActiveTab} = useTabContext(); // Accessing context

  // useEffect(() => {
  //   if (tab) {
  //     setTab(tab);
  //   }
  // }, [tab, setTab]);

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
    <div className="mb-4">
      <SearchInput/>

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
      {activeTab === "Schemes" && <Schemes/>}
      {activeTab === "Job Openings" && <JobOpenings/>}
      {activeTab === "Scholarships" && <Scholarships />}
      {activeTab === "Saved" && <Saved />}
    </div>
  );
}
