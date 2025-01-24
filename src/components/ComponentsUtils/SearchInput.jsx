import React from "react";
import { useTabContext } from "@/Context/TabContext";
import { IoCloseSharp } from "react-icons/io5";

function SearchInput() {
  const { searchQuery, setSearchQuery } = useTabContext();

  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 h-14 px-3 rounded-lg border border-gray-300 bg-white  hidden sm:flex">
      {/* Search Icon */}
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 20l-4.585-4.585M10 17a7 7 0 100-14 7 7 0 000 14z"></path>
      </svg>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search schemes, job openings or scholarships"
        className="flex-1 px-2 text-sm bg-transparent focus:outline-none placeholder-[#616161]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Clear Input Icon */}
      <div className="cursor-pointer hover:scale-110">
        {searchQuery && (
          <IoCloseSharp
            className="text-gray-500 w-5 h-5"
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>
    </div>
  );
}

export default SearchInput;
