import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "@/Context/AuthContext";
import ProfileModal from "@/pages/model/profileModal";

const NavBar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { authState, logout } = useAuth(); // Get the authState and logout function from the context

  const handleGotoLoginpage = () => {
    router.push("/homepage");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "MyProfile") {
      setIsProfileModalOpen(true); // Open the profile modal
    } else if (option === "Logout") {
      logout(); // Log out the user
      localStorage.removeItem("token"); // Remove the token from localStorage
      router.push("/loginpage"); // Redirect to login page
    }
    toggleDropdown();
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <div style={{ maxWidth: "80%", margin: "0 auto" }} className="flex justify-between items-center py-4 z-10 relative">
        <div className="">
          Logo
        </div>

        <div className="flex gap-4">
          <div className="">
            <button className="text-onclick-btnblue px-[24px] py-[8px] rounded-[8px] flex items-center border border-onclick-btnblue text-[12px]">
            <span className="mr-1">English</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" >
                <path d="M13.354 6.85354L8.35403 11.8535C8.30759 11.9 8.25245 11.9369 8.19175 11.9621C8.13105 11.9872 8.06599 12.0002 8.00028 12.0002C7.93457 12.0002 7.86951 11.9872 7.80881 11.9621C7.74811 11.9369 7.69296 11.9 7.64653 11.8535L2.64653 6.85354C2.55271 6.75972 2.5 6.63247 2.5 6.49979C2.5 6.36711 2.55271 6.23986 2.64653 6.14604C2.74035 6.05222 2.8676 5.99951 3.00028 5.99951C3.13296 5.99951 3.26021 6.05222 3.35403 6.14604L8.00028 10.7929L12.6465 6.14604C12.693 6.09958 12.7481 6.06273 12.8088 6.03759C12.8695 6.01245 12.9346 5.99951 13.0003 5.99951C13.066 5.99951 13.131 6.01245 13.1917 6.03759C13.2524 6.06273 13.3076 6.09958 13.354 6.14604C13.4005 6.19249 13.4373 6.24764 13.4625 6.30834C13.4876 6.36904 13.5006 6.43409 13.5006 6.49979C13.5006 6.56549 13.4876 6.63054 13.4625 6.69124C13.4373 6.75193 13.4005 6.80708 13.354 6.85354Z" fill="#3431BB"/>
                </svg>
            </button>
          </div>

          <div className="relative">
            <button
              className="text-white bg-onclick-btnblue px-[24px] py-[7px] rounded-[8px] flex items-center border border-onclick-btnblue text-[14px] font-semibold"
              onClick={toggleDropdown}
            >
              Profile <IoIosArrowDown />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul>
                  {/* {authState.user && (
                    <li className="px-4 py-2 text-gray-800">
                      {authState.user.username}
                    </li>
                  )} */}
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left hover:rounded-lg"
                      onClick={() => handleOptionClick("MyProfile")}
                    >
                      My Profile
                    </button>
                  </li>
                  <hr/>
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-lg w-full text-left"
                      onClick={() => handleOptionClick("Logout")}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isProfileModalOpen && <ProfileModal onClose={closeProfileModal} />}
    </>
  );
};

export default NavBar;
