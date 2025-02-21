import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import FilterContext from "@/Context/FilterContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Resources() {
  const router = useRouter();
  const { statesFromApi } = useContext(FilterContext);
  const [expandedCategory, setExpandedCategory] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [stateLinks, setStateLinks] = useState([]);

  const uniqueCategories = [
    [2, "Central"],
    [1, "State"],
  ];
  
  useEffect(() => {
    if (selectedState) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schemes/resources/${selectedState.id}/`)
        .then((res) => res.json())
        .then((data) => {
          setStateLinks(data.links && data.links.length > 0 ? data.links : [
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-3",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",

          ]);
        })
        .catch((err) => {
          console.error("Error fetching state links:", err);
          setStateLinks([
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-3",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
            "https://example.com/resource-1",
            "https://example.com/resource-2",
          ]);
        });
    }
  }, [selectedState]);
  

  const handleItemClick = (item) => {
    if (item[0] === 1) {
      setExpandedCategory(expandedCategory === 1 ? 0 : 1);
    } else {
      setExpandedCategory(0);
      setSelectedCategory(item);
      setSelectedState('0'); 
      setStateLinks([]); 
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-[#EEEEFF] flex items-center justify-center px-4">
        <div className="w-[90%] max-w-lg min-h-[500px] sm:min-h-[550px] bg-white shadow-lg rounded-lg flex flex-col p-6 overflow-hidden">

          <button
            type="button"
            className="flex items-center gap-2 mb-4 text-lg sm:text-xl"
            onClick={() => router.back()}
          >
            <FaArrowLeftLong className="mt-1" />
            Back
          </button>

          <h1 className="text-xl sm:text-2xl text-[#3330BA] font-bold text-center w-full mb-4">
            Resources
          </h1>
            <div
            className={`flex-1 overflow-y-auto pr-1 border rounded-md shadow-sm transition-all duration-300 ${
                expandedCategory === 1 ? "max-h-60" : "max-h-32"
            }`}
            >
            <ul className="flex flex-col gap-2">
              {uniqueCategories.map((item) => (
                <li
                  key={item[0]}
                  className="flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => handleItemClick(item)}
                >
                  <p className="text-black max-w-[80%]">
                    {item[0] === 1 && selectedState ? selectedState.state_name : item[1]}
                  </p>
                  {item[0] === 1 && (
                    expandedCategory === 1 ? (
                      <IoIosArrowUp className="text-black" />
                    ) : (
                      <IoIosArrowDown className="text-black" />
                    )
                  )}
                </li>
              ))}

              {expandedCategory === 1 && (
                <div className="mt-1 max-h-40 overflow-y-auto  bg-white">
                  {statesFromApi.map((state) => (
                    <div
                      key={state.id}
                      className="p-3 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedState(state);
                        setExpandedCategory(0);
                      }}
                    >
                      <p className="text-black max-w-[80%]">{state.state_name}</p>
                    </div>
                  ))}
                </div>
              )}
            </ul>
          </div>

          {selectedState && (
            <div className="mt-2 p-3 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-[#3330BA] p-2">Links:</h2>
                <div className="max-h-40 overflow-y-auto pr-2">
                <ol className="list-decimal list-inside">
                    {stateLinks.length > 0 ? (
                    stateLinks.map((link, index) => (
                        <li key={index} className="text-black ">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3330BA] p-4 truncate hover:underline"
                        >
                            {link}
                        </a>
                        </li>
                    ))
                    ) : (
                    <p className="text-sm text-gray-600">No links available.</p>
                    )}
                </ol>
                </div>
            </div>
            )}
        </div>
      </div>
    </>
  );
}
