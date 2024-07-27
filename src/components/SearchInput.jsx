import React, { useState, useEffect } from "react";

function SearchInput({ searchQuery, handleSearch }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(inputValue);
    }, 600); //I am adding debouncing 

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, handleSearch]);

  return (



    <div className="flex items-center gap-8 h-14 px-3 rounded-lg border border-gray-300 bg-white mb-[24px] mr-[200px]">


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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;