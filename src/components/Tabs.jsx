import { useRouter } from "next/router";
import { useContext } from "react";
import PageContext from "@/Context/PageContext";
import { useTabContext } from "@/Context/TabContext";
import JobOpenings from "./ComponentsUtils/JobOpenings";
import Schemes from "./Schemes";
import Scholarships from "./Scholarships";
import SearchInput from "./ComponentsUtils/SearchInput";
import SelectedFilters from "./SelectedFilters";
import Saved from "./savedForLoginuser";
import React from "react";

export default function Tabs() {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabContext();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  // Sync activeTab with query params on route change
  React.useEffect(() => {
    const { tab } = router.query;
    if (tab) {
      setActiveTab(tab);
    }
  }, [router.query, setActiveTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
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
    <div>
      <SearchInput />
      <SelectedFilters />

      {/* Tabs for Larger Screens */}
      <div className="hidden sm:flex justify-center items-center gap-[15px]">
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

      <hr className="sm:hidden" />

      {/* Render the Corresponding Component Based on activeTab */}
      {activeTab === "Schemes" && <Schemes />}
      {activeTab === "Job Openings" && <JobOpenings />}
      {activeTab === "Scholarships" && <Scholarships />}
      {activeTab === "Saved" && <Saved />}
    </div>
  );
}
