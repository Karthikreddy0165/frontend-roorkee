import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  IoMenuOutline,
  IoSearchOutline,
  IoCloseOutline,
} from "react-icons/io5"; // For menu icon in mobile
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/Context/AuthContext";
import ProfileModal from "./Modals/profileModal";
import scholarshipicon from "../assets/scholarship.svg";
import schemesicon from "../assets/schemes.svg";
import jobsicon from "../assets/jobs.svg";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useTabContext } from "@/Context/TabContext"; // Import useTabContext

import BackButton from "./ComponentsUtils/BackButton";
import ToolTips from "./ComponentsUtils/tooltips";
import FeedbackButton from "./feedBack";

const NavBarScheme = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, logout } = useAuth();
  const { setActiveTab } = useTabContext(); // Use context to set active tab

  const [tabs, setTabs] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/layout-items/`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          // Sort categories by order
          const sortedCategories = data.sort((a, b) => a.order - b.order);

          // Extract category names
          setCategories(
            sortedCategories.map((item) => ({
              name: item.column_name,
              label: item.column_name.toUpperCase(),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    fetchCategories();
  }, [router.query]);

  const buttons = [
    {
      id: "schemes",
      label: "Schemes",
      icon: schemesicon,
    },
    {
      id: "jobs",
      label: "Job Openings",
      icon: jobsicon,
    },
    {
      id: "scholarships",
      label: "Scholarships",
      icon: scholarshipicon,
    },
  ];

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/layout-items/`
        );
        const data = await response.json();
        setTabs(data); // Assuming the API returns an array of tab objects
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };

    fetchTabs();
  }, []);

  const handleGotologin = () => {
    router.push("/login");
  };

  const handleClickLogo = () => {
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "MyProfile") {
      setIsProfileModalOpen(true);
    } else if (option === "Logout") {
      logout();
      localStorage.removeItem("token");
      router.push("/login");
    }
    toggleDropdown();
  };

  const handleFeedBack = () => {
    router.push("/feedBack");
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery } = useTabContext();

  const handleBack = () => {
    router.push("/AllSchemes");
  };

  // Handle Sidebar Option Click - Sets Active Tab
  const handleSidebarOptionClick = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false); // Close the sidebar on selection
    router.push({
      pathname: router.pathname,
      query: { tab: tabName },
    });
  };

  return (
    <div>
      {/* Navbar Container */}
      <div className="flex justify-between items-center py-2 px-6  bg-[#2F3291] border-b-[1px] z-10 relative sm:h-[73px] h-[73px] gap-2 w-full">
        {/* Logo Section */}

        <div
          className={`sm:text-[16px] mt-2 font-semibold text-white text-sm cursor-pointer flex gap-2 ${
            showSearch ? "hidden" : "block"
          } sm:block`}
          onClick={handleClickLogo}
        >
          Empower Hub
        </div>

        <div className="hidden md:flex space-x-10 justify-end ml-auto -mr-[500px] text-[16px] font-semibold">
          {/* Home is always present */}
          <a
            href="/"
            className={`text-white  transition duration-300 ${
              router.pathname === "/" ? "underline decoration-[#3330BA]" : ""
            }`}
          >
            HOME
          </a>


          <a
            href="/AboutUs"
            className={`text-white transition duration-300 ${
              router.pathname === "/AboutUs"
                ? "underline decoration-[#3330BA]"
                : ""
            }`}
          >
            ABOUT US
          </a>


          {/* Dynamically show all available categories */}
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/AllSchemes?tab=${category.name.toLowerCase()}`}
              className={`text-white transition duration-300 ${
                router.query.tab === category.name.toLowerCase()
                  ? "underline decoration-[#3330BA]"
                  : ""
              }`}
            >
              {category.label}
            </a>
          ))}

         
        </div>

        {/* Search Section (Mobile Only) */}
        <div className="flex items-center sm:hidden relative w-full ">
          <div
            className={`flex items-center gap-2 absolute top-0 left-0 bg-white border border-gray-300 rounded-lg py-2 w-full z-20 ${
              showSearch
                ? "translate-y-[-22px] opacity-100"
                : "translate-y-0 opacity-0 pointer-events-none"
            }`}
          >
            <input
              type="text"
              placeholder="Search schemes, jobs, or scholarships"
              className="flex-1 text-xs bg-transparent focus:outline-none placeholder-[#616161] w-full px-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Close Icon to hide search */}
            <IoCloseOutline
              className="cursor-pointer w-5 h-6 text-gray-500 mr-2"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery(""); // Optionally clear the search input
              }}
            />
          </div>

          {/* Search Icon to Trigger Search Field */}
          <ToolTips tooltip="Search for schemes, job openings & scholarships"></ToolTips>
          {!showSearch && (
            <IoSearchOutline
              className="cursor-pointer w-6 h-6 text-gray-500 absolute right-10"
              onClick={() => setShowSearch(true)} // Show the search bar
            />
          )}
        </div>

        {/* Hamburger Menu Icon (Visible only on small screens) */}
        <div
          className="sm:hidden cursor-pointer absolute mr-[6px] right-6"
          onClick={toggleSidebar}
        >
          <IoMenuOutline size={28} color="gray" />
        </div>

        {/* Profile or Login Section */}
        <div className="flex gap-4 items-center ml-auto sm:block hidden">
          {authState.token ? (
            <div className="relative">
              {/* Profile Button (Visible on desktop) */}
              <button
                className="flex items-center px-4 py-2 bg-[#F58220] text-white text-sm font-semibold rounded-lg shadow-md  md:flex"
                onClick={toggleDropdown}
              >
                Profile <IoIosArrowDown className="ml-2" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-24">
                  
                  <ul>
                    <li>
                      <button
                        className="px-1 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 w-full text-left hover:rounded-t-lg flex justify-center"
                        onClick={() => handleOptionClick("MyProfile")}
                      >
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-1 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 w-full text-left hover:rounded-b-lg flex justify-center"
                        
                        onClick={() => handleOptionClick("Logout")}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Login Button (Visible only on mobile, tablet, or when user is not logged in) */}
              <button
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 sm:hidden"
                onClick={handleGotologin}
              >
                Login
              </button>

              {/* Login Button (Visible on desktop) */}
              <button
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 hidden sm:block"
                onClick={handleGotologin}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Menu for Mobile */}

      {isSidebarOpen && (
        <div className="sm:hidden fixed left-0 top-0 h-full w-64 bg-gray-100 z-50 shadow-lg flex flex-col justify-center items-center px-[50px] mb-[30px]">
          {/* Back Button */}
          <div
            className="fixed top-5 left-5 z-50 cursor-pointer"
            onClick={toggleSidebar}
          >
            {/* <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="#1D1B20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
            <FaArrowLeftLong className="mt-1" />
          </div>

          <div className="flex justify-center items-center p-4 ">
            <div className="text-lg font-bold"></div>
          </div>

          {/* Home Button */}
          <div className="flex justify-center items-center w-full">
            <button
              className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
              onClick={handleClickLogo}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.125 12.64C3.125 11.1389 3.125 10.3883 3.44277 9.73862C3.76053 9.0889 4.35298 8.62811 5.53788 7.70652L8.66287 5.27598C10.5062 3.84232 11.4278 3.12549 12.5 3.12549C13.5722 3.12549 14.4938 3.84232 16.3371 5.27597L19.4621 7.70652C20.647 8.62811 21.2395 9.0889 21.5572 9.73862C21.875 10.3883 21.875 11.1389 21.875 12.64V15.6249C21.875 18.5712 21.875 20.0443 20.9597 20.9596C20.0444 21.8749 18.5713 21.8749 15.625 21.8749H9.375C6.42872 21.8749 4.95558 21.8749 4.04029 20.9596C3.125 20.0443 3.125 18.5712 3.125 15.6249V12.64Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.75 21V16.25C14.75 14.7312 13.5188 13.5 12 13.5C10.4812 13.5 9.25 14.7312 9.25 16.25V21"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              Home
            </button>
          </div>

          <hr className="bg-[#B3B3B3] border-[1px] w-[200px] mt-5 mb-5" />

          {/* Menu Items */}
          {tabs.map((tab) => {
            const matchedButton = buttons.find(
              (btn) => btn.id === tab.column_name
            );
            return (
              <button
                key={tab.id}
                className="w-full text-left p-3 text-[14px] flex items-center gap-2"
                onClick={() => handleSidebarOptionClick(tab.column_name)}
              >
                {matchedButton && (
                  <img
                    src={matchedButton.icon.src}
                    alt={`${matchedButton.label} icon`}
                    width="20"
                    height="20"
                    className="text-gray-600 hover:text-gray-900"
                  />
                )}
                {tab.column_name.charAt(0).toUpperCase() +
                  tab.column_name.slice(1)}
              </button>
            );
          })}

          <hr className="bg-[#B3B3B3] border-[1px] w-[200px] mt-5 mb-5" />

          <FeedbackButton />
          {authState.token ? (
            <>
              <button
                className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
                onClick={() => handleOptionClick("MyProfile")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9997 4C9.79053 4 7.99967 5.79086 7.99967 8C7.99967 10.2091 9.79053 12 11.9997 12C14.2088 12 15.9997 10.2091 15.9997 8C15.9997 5.79086 14.2088 4 11.9997 4ZM15.6407 12.7694C17.0747 11.673 17.9997 9.94452 17.9997 8C17.9997 4.68629 15.3134 2 11.9997 2C8.68596 2 5.99967 4.68629 5.99967 8C5.99967 9.94452 6.92468 11.673 8.35868 12.7694C7.3532 13.2142 6.42817 13.8436 5.63571 14.636C5.02378 15.248 4.50901 15.939 4.10144 16.6851C3.34932 18.0619 3.65605 19.4657 4.50306 20.4584C5.31847 21.414 6.62469 22 7.99967 22H15.9997C17.3746 22 18.6809 21.414 19.4963 20.4584C20.3433 19.4657 20.65 18.0619 19.8979 16.6851C19.4903 15.939 18.9756 15.248 18.3636 14.636C17.5712 13.8436 16.6461 13.2142 15.6407 12.7694ZM11.9997 14C10.1432 14 8.36267 14.7375 7.04992 16.0503C6.57392 16.5263 6.1736 17.0637 5.85662 17.6439C5.54966 18.2058 5.64868 18.7198 6.02447 19.1602C6.43187 19.6376 7.1655 20 7.99967 20H15.9997C16.8338 20 17.5675 19.6376 17.9749 19.1602C18.3507 18.7198 18.4497 18.2058 18.1427 17.6439C17.8257 17.0637 17.4254 16.5263 16.9494 16.0503C15.6367 14.7375 13.8562 14 11.9997 14Z"
                    fill="black"
                  />
                </svg>
                Profile
              </button>

              <button
                className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
                onClick={() => handleOptionClick("Logout")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <path
                    d="M14 16L15.41 14.59L12.83 12H21V10H12.83L15.41 7.41L14 6L9 11L14 16ZM5 3H12V5H5V19H12V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z"
                    fill="black"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <button
              className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
              onClick={() => handleOptionClick("Logout")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 hover:text-gray-900"
              >
                <path
                  d="M10 16L8.59 14.59L11.17 12H3V10H11.17L8.59 7.41L10 6L15 11L10 16ZM19 3H12V5H19V19H12V21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                  fill="black"
                />
              </svg>
              Login
            </button>
          )}
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && ProfileModal && (
        <ProfileModal onClose={closeProfileModal} />
      )}
    </div>
  );
};

export default NavBarScheme;
