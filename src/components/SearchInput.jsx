import React, { useState, useEffect, useContext } from "react";
import { useTabContext } from "@/Context/TabContext";
import { IoCloseSharp } from "react-icons/io5";

function SearchInput() {
  const { searchQuery, setSearchQuery } = useTabContext();

  return (
    <div className="flex items-center gap-8 h-14 px-3 rounded-lg border border-gray-300 bg-white mb-[24px] mr-2">
      <svg
        className="w-5 h-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 20l-4.585-4.585M10 17a7 7 0 100-14 7 7 0 000 14z"></path>
      </svg>
      <input
        type="text"
        placeholder="Search schemes, job opportunities, or scholarships"
        className="flex-1 px-2 text-sm bg-transparent focus:outline-none w-64 placeholder-[#616161]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="transform scale-150 cursor-pointer hover:scale-170">
        <IoCloseSharp />
      </div>
    </div>
  );
}

export default SearchInput;
