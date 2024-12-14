import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5"; // For menu icon in mobile
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/Context/AuthContext";
import ProfileModal from "../pages/Modals/profileModal";
import { useTabContext } from "@/Context/TabContext"; // Import useTabContext

import { FaArrowLeftLong } from "react-icons/fa6";

const NavBarScheme = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, logout } = useAuth();
  const { setActiveTab } = useTabContext(); // Use context to set active tab

  const handleGotologin = () => {
    router.push("/login");
  };

  const handleClickLogo = () => {
    router.push("/App");
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

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [showSearch, setShowSearch] = useState(false);
  const { searchQuery, setSearchQuery } = useTabContext();

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
      <div className="flex justify-between items-center py-2 px-6 bg-white shadow-md z-10 relative sm:h-14 h-12">
        {/* Logo Section */}
        <div
          className={`sm:text-xl font-bold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer ${
            showSearch ? "hidden" : "block"
          } sm:block`}
          onClick={handleClickLogo}
        >
          LAUNCHPAD
        </div>

        {/* Search Section (Mobile Only) */}
        <div className="flex items-center sm:hidden relative w-full">
          <div
            className={`flex items-center gap-2 absolute top-0 left-0 bg-white border border-gray-300 rounded-lg py-2  w-full z-20 ${
              showSearch
                ? "translate-y-[-22px] opacity-100"
                : "translate-y-0 opacity-0 pointer-events-none"
            }`}
          >
            <input
              type="text"
              placeholder="Search schemes, jobs, or scholarships"
              className="flex-1 text-sm bg-transparent focus:outline-none placeholder-[#616161] w-full px-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoSearchOutline
              className="cursor-pointer w-6 h-6 text-gray-500"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

          {/* Search Icon to Trigger Search Field */}
          {!showSearch && (
            <IoSearchOutline
              className="cursor-pointer w-6 h-6 text-gray-500 absolute right-10"
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>

        {/* Hamburger Menu Icon */}
        <div
          className="sm:hidden cursor-pointer absolute right-6"
          onClick={toggleSidebar}
        >
          <IoMenuOutline size={28} color="gray" />
        </div>

        {/* Profile or Login Section */}
        <div className="flex gap-4 items-center ml-auto">
          {authState.token ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                className="flex items-center px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 hidden md:flex"
                onClick={toggleDropdown}
              >
                Profile <IoIosArrowDown className="ml-2" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul>
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:rounded-t-lg"
                        onClick={() => handleOptionClick("MyProfile")}
                      >
                        My Profile
                      </button>
                    </li>
                    {/* <hr /> */}
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left hover:rounded-b-lg"
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
              {/* Login Button */}
              <button
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700  hidden sm:block"
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
        <div className="sm:hidden fixed left-0 top-0 h-full w-64 bg-gray-100 z-50 shadow-lg ">
          <div className="flex justify-centre items-center p-4 ">
            <div className="text-lg font-bold">
              <FaArrowLeftLong className="h-5 w-5 mr-2" />
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900"
            >
              {/* Close Button */}
              {/* <IoMdClose size={24} /> */}
            </button>
          </div>
          {/* Home  */}
          <div className="flex justify-centre items-center">
            <button
              className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex justify-centre items-center gap-2"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.75 21V16.25C14.75 14.7312 13.5188 13.5 12 13.5C10.4812 13.5 9.25 14.7312 9.25 16.25V21"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="square"
                />
              </svg>
              Home
            </button>
          </div>

          <hr className="bg-[#B3B3B3] h-[1px] border-0" />

          {/* Menu items */}
          <button
            className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
            onClick={() => handleSidebarOptionClick("Schemes")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 hover:text-gray-900"
            >
              <g clip-path="url(#clip0_807_594)">
                <path
                  d="M17.4167 1.83333H16.5V0.916667C16.5 0.673552 16.4034 0.440394 16.2315 0.268485C16.0596 0.0965771 15.8264 0 15.5833 0C15.3402 0 15.1071 0.0965771 14.9352 0.268485C14.7632 0.440394 14.6667 0.673552 14.6667 0.916667V1.83333H7.33333V0.916667C7.33333 0.673552 7.23676 0.440394 7.06485 0.268485C6.89294 0.0965771 6.65978 0 6.41667 0C6.17355 0 5.94039 0.0965771 5.76849 0.268485C5.59658 0.440394 5.5 0.673552 5.5 0.916667V1.83333H4.58333C3.3682 1.83479 2.20326 2.31814 1.34403 3.17737C0.484808 4.03659 0.00145554 5.20154 0 6.41667L0 17.4167C0.00145554 18.6318 0.484808 19.7967 1.34403 20.656C2.20326 21.5152 3.3682 21.9985 4.58333 22H17.4167C18.6318 21.9985 19.7967 21.5152 20.656 20.656C21.5152 19.7967 21.9985 18.6318 22 17.4167V6.41667C21.9985 5.20154 21.5152 4.03659 20.656 3.17737C19.7967 2.31814 18.6318 1.83479 17.4167 1.83333ZM1.83333 6.41667C1.83333 5.68732 2.12306 4.98785 2.63879 4.47212C3.15451 3.9564 3.85399 3.66667 4.58333 3.66667H17.4167C18.146 3.66667 18.8455 3.9564 19.3612 4.47212C19.8769 4.98785 20.1667 5.68732 20.1667 6.41667V7.33333H1.83333V6.41667ZM17.4167 20.1667H4.58333C3.85399 20.1667 3.15451 19.8769 2.63879 19.3612C2.12306 18.8455 1.83333 18.146 1.83333 17.4167V9.16667H20.1667V17.4167C20.1667 18.146 19.8769 18.8455 19.3612 19.3612C18.8455 19.8769 18.146 20.1667 17.4167 20.1667Z"
                  fill="black"
                />
                <path
                  d="M11 15.125C11.7594 15.125 12.375 14.5094 12.375 13.75C12.375 12.9906 11.7594 12.375 11 12.375C10.2406 12.375 9.625 12.9906 9.625 13.75C9.625 14.5094 10.2406 15.125 11 15.125Z"
                  fill="black"
                />
                <path
                  d="M6.41699 15.125C7.17638 15.125 7.79199 14.5094 7.79199 13.75C7.79199 12.9906 7.17638 12.375 6.41699 12.375C5.6576 12.375 5.04199 12.9906 5.04199 13.75C5.04199 14.5094 5.6576 15.125 6.41699 15.125Z"
                  fill="black"
                />
                <path
                  d="M15.583 15.125C16.3424 15.125 16.958 14.5094 16.958 13.75C16.958 12.9906 16.3424 12.375 15.583 12.375C14.8236 12.375 14.208 12.9906 14.208 13.75C14.208 14.5094 14.8236 15.125 15.583 15.125Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_807_594">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Schemes
          </button>
          <button
            className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
            onClick={() => handleSidebarOptionClick("Job Openings")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 hover:text-gray-900"
            >
              <path
                d="M18.7095 23.2268H7.29116C5.93215 23.2268 4.62879 22.687 3.66783 21.726C2.70686 20.765 2.16699 19.4617 2.16699 18.1027V13.5202C2.16985 12.162 2.71064 10.8603 3.67099 9.89999C4.63134 8.93964 5.93302 8.39886 7.29116 8.396H18.7095C20.0676 8.39886 21.3693 8.93964 22.3297 9.89999C23.29 10.8603 23.8308 12.162 23.8337 13.5202V18.1027C23.8337 19.4617 23.2938 20.765 22.3328 21.726C21.3719 22.687 20.0685 23.2268 18.7095 23.2268ZM7.29116 10.5627C6.50678 10.5627 5.75453 10.8743 5.19989 11.4289C4.64525 11.9835 4.33366 12.7358 4.33366 13.5202V18.1027C4.33366 18.887 4.64525 19.6393 5.19989 20.1939C5.75453 20.7486 6.50678 21.0602 7.29116 21.0602H18.7095C19.4939 21.0602 20.2461 20.7486 20.8008 20.1939C21.3554 19.6393 21.667 18.887 21.667 18.1027V13.5202C21.667 12.7358 21.3554 11.9835 20.8008 11.4289C20.2461 10.8743 19.4939 10.5627 18.7095 10.5627H7.29116Z"
                fill="black"
              />
              <path
                d="M13.0003 18.2974H12.8703L3.12029 17.0841C2.83297 17.0496 2.57112 16.9024 2.39233 16.6749C2.21355 16.4473 2.13248 16.1581 2.16696 15.8708C2.20143 15.5835 2.34864 15.3216 2.57618 15.1428C2.80372 14.964 3.09297 14.883 3.38029 14.9174L13.0003 16.1199L22.6203 14.9174C22.7626 14.9004 22.9068 14.9115 23.0448 14.9502C23.1827 14.9888 23.3117 15.0543 23.4244 15.1428C23.5371 15.2313 23.6312 15.3412 23.7014 15.4661C23.7716 15.591 23.8165 15.7285 23.8336 15.8708C23.8507 16.013 23.8396 16.1573 23.8009 16.2952C23.7622 16.4332 23.6968 16.5622 23.6082 16.6749C23.5197 16.7876 23.4099 16.8817 23.285 16.9519C23.1601 17.0221 23.0226 17.067 22.8803 17.0841L13.1303 18.2974H13.0003Z"
                fill="black"
              />
              <path
                d="M17.2684 9.86927C16.9811 9.86927 16.7056 9.75513 16.5024 9.55197C16.2992 9.34881 16.1851 9.07325 16.1851 8.78594C16.1851 6.61927 14.7551 4.9401 13.0001 4.9401C11.2451 4.9401 9.81511 6.6626 9.81511 8.78594C9.81511 9.07325 9.70097 9.34881 9.4978 9.55197C9.29464 9.75513 9.01909 9.86927 8.73177 9.86927C8.44445 9.86927 8.1689 9.75513 7.96574 9.55197C7.76257 9.34881 7.64844 9.07325 7.64844 8.78594C7.64844 5.47094 10.0534 2.77344 13.0001 2.77344C15.9468 2.77344 18.3518 5.47094 18.3518 8.78594C18.3518 8.9282 18.3238 9.06907 18.2693 9.20051C18.2149 9.33195 18.1351 9.45137 18.0345 9.55197C17.9339 9.65257 17.8145 9.73236 17.683 9.78681C17.5516 9.84125 17.4107 9.86927 17.2684 9.86927Z"
                fill="black"
              />
            </svg>
            Job Openings
          </button>
          <button
            className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
            onClick={() => handleSidebarOptionClick("Scholarships")}
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
                d="M18.4475 18.2537L17.939 17.3926L18.4475 18.2537ZM18.939 17.3926H17.939H18.939ZM10.9657 21.4033L10.4292 22.2473L10.9657 21.4033ZM13.0555 21.4376L13.564 22.2987L13.0555 21.4376ZM1.90419 8.13662L1.39226 7.27759L1.90419 8.13662ZM1.90419 8.99565L1.39226 9.85468L1.90419 8.99565ZM12.512 14.7071L13.024 15.5661L12.512 14.7071ZM11.4882 14.7071L12.0001 13.8481L11.4882 14.7071ZM22.096 8.13662L22.6079 7.27759L22.096 8.13662ZM22.096 8.99565L21.5841 8.13662L22.096 8.99565ZM6.01768 18.2581L6.55413 17.4142L6.01768 18.2581ZM12.512 2.42515L12.0001 3.28418L12.512 2.42515ZM11.4882 2.42515L12.0001 3.28418L11.4882 2.42515ZM23.2001 8.54949C23.2001 7.9972 22.7524 7.54949 22.2001 7.54949C21.6478 7.54949 21.2001 7.9972 21.2001 8.54949H23.2001ZM21.2001 13.9495C21.2001 14.5018 21.6478 14.9495 22.2001 14.9495C22.7524 14.9495 23.2001 14.5018 23.2001 13.9495H21.2001ZM12.0001 3.28418L21.5841 8.99565L22.6079 7.27759L13.024 1.56612L12.0001 3.28418ZM21.5841 8.13662L12.0001 13.8481L13.024 15.5661L22.6079 9.85468L21.5841 8.13662ZM2.41612 8.99565L12.0001 3.28418L10.9762 1.56612L1.39226 7.27759L2.41612 8.99565ZM12.0001 13.8481L6.06606 10.3118L5.0422 12.0298L10.9762 15.5661L12.0001 13.8481ZM6.06606 10.3118L2.41612 8.13662L1.39226 9.85468L5.0422 12.0298L6.06606 10.3118ZM4.55413 11.1708V17.4142H6.55413V11.1708H4.55413ZM5.48123 19.102L10.4292 22.2473L11.5021 20.5594L6.55413 17.4142L5.48123 19.102ZM13.564 22.2987L18.956 19.1148L17.939 17.3926L12.5471 20.5766L13.564 22.2987ZM19.939 17.3926L19.939 11.1708H17.939L17.939 17.3926H19.939ZM18.956 19.1148C19.5652 18.755 19.939 18.1001 19.939 17.3926H17.939L18.956 19.1148ZM10.4292 22.2473C11.3814 22.8525 12.5925 22.8724 13.564 22.2987L12.5471 20.5766C12.2232 20.7678 11.8195 20.7611 11.5021 20.5594L10.4292 22.2473ZM1.39226 7.27759C0.416118 7.85931 0.416123 9.27296 1.39226 9.85468L2.41612 8.13662C2.7415 8.33053 2.7415 8.80174 2.41612 8.99565L1.39226 7.27759ZM12.0001 13.8481L12.0001 13.8481L10.9762 15.5661C11.6071 15.9421 12.3931 15.9421 13.024 15.5661L12.0001 13.8481ZM21.5841 8.99565C21.2587 8.80174 21.2587 8.33053 21.5841 8.13662L22.6079 9.85468C23.5841 9.27295 23.5841 7.85931 22.6079 7.27759L21.5841 8.99565ZM4.55413 17.4142C4.55413 18.0983 4.90384 18.735 5.48123 19.102L6.55413 17.4142V17.4142H4.55413ZM13.024 1.56612C12.3931 1.1902 11.6071 1.1902 10.9762 1.56612L12.0001 3.28418L12.0001 3.28418L13.024 1.56612ZM21.2001 8.54949V13.9495H23.2001V8.54949H21.2001Z"
                fill="black"
              />
            </svg>
            Scholarships
          </button>
          <button
            className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
            onClick={() => handleSidebarOptionClick("Saved")}
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
                d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                stroke="black"
                stroke-width="2.1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Saved
          </button>

          <hr className="bg-[#B3B3B3] h-[1px] border-0" />
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
              <g clip-path="url(#clip0_747_852)">
                <path
                  d="M12.59 13.0001L10.29 15.2901C10.1963 15.3831 10.1219 15.4937 10.0711 15.6155C10.0203 15.7374 9.9942 15.8681 9.9942 16.0001C9.9942 16.1321 10.0203 16.2628 10.0711 16.3847C10.1219 16.5065 10.1963 16.6171 10.29 16.7101C10.383 16.8038 10.4936 16.8782 10.6154 16.929C10.7373 16.9798 10.868 17.0059 11 17.0059C11.132 17.0059 11.2627 16.9798 11.3846 16.929C11.5064 16.8782 11.617 16.8038 11.71 16.7101L15.71 12.7101C15.801 12.615 15.8724 12.5029 15.92 12.3801C16.02 12.1366 16.02 11.8636 15.92 11.6201C15.8724 11.4973 15.801 11.3852 15.71 11.2901L11.71 7.2901C11.6168 7.19686 11.5061 7.1229 11.3842 7.07244C11.2624 7.02198 11.1319 6.99601 11 6.99601C10.8681 6.99601 10.7376 7.02198 10.6158 7.07244C10.4939 7.1229 10.3832 7.19686 10.29 7.2901C10.1968 7.38334 10.1228 7.49403 10.0723 7.61585C10.0219 7.73767 9.99591 7.86824 9.99591 8.0001C9.99591 8.13196 10.0219 8.26253 10.0723 8.38435C10.1228 8.50617 10.1968 8.61686 10.29 8.7101L12.59 11.0001H3C2.73478 11.0001 2.48043 11.1055 2.29289 11.293C2.10536 11.4805 2 11.7349 2 12.0001C2 12.2653 2.10536 12.5197 2.29289 12.7072C2.48043 12.8947 2.73478 13.0001 3 13.0001H12.59ZM12 2.0001C10.1311 1.99176 8.29724 2.50731 6.70647 3.48829C5.11569 4.46927 3.83165 5.87641 3 7.5501C2.88065 7.78879 2.86101 8.06512 2.94541 8.3183C3.0298 8.57147 3.21131 8.78075 3.45 8.9001C3.68869 9.01945 3.96502 9.03909 4.2182 8.95469C4.47137 8.8703 4.68065 8.68879 4.8 8.4501C5.43219 7.17342 6.39383 6.08872 7.58555 5.30809C8.77727 4.52746 10.1558 4.07922 11.5788 4.00969C13.0017 3.94017 14.4174 4.25188 15.6795 4.91261C16.9417 5.57334 18.0045 6.55913 18.7581 7.7681C19.5118 8.97706 19.9289 10.3653 19.9664 11.7895C20.0039 13.2136 19.6605 14.6219 18.9715 15.8689C18.2826 17.1159 17.2731 18.1563 16.0475 18.8825C14.8219 19.6088 13.4246 19.9946 12 20.0001C10.5089 20.0066 9.04615 19.5925 7.77969 18.8053C6.51323 18.0182 5.49435 16.89 4.84 15.5501C4.72065 15.3114 4.51137 15.1299 4.2582 15.0455C4.00502 14.9611 3.72869 14.9808 3.49 15.1001C3.25131 15.2194 3.0698 15.4287 2.98541 15.6819C2.90101 15.9351 2.92065 16.2114 3.04 16.4501C3.83283 18.0456 5.03752 19.4003 6.52947 20.3741C8.02142 21.348 9.74645 21.9055 11.5261 21.9891C13.3058 22.0727 15.0755 21.6793 16.6521 20.8496C18.2288 20.0199 19.5552 18.7841 20.4941 17.2699C21.433 15.7558 21.9503 14.0182 21.9925 12.2371C22.0347 10.456 21.6003 8.69589 20.7342 7.13893C19.8682 5.58197 18.6018 4.28467 17.0663 3.38121C15.5307 2.47774 13.7816 2.00094 12 2.0001Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_747_852">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Logout
          </button>
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
