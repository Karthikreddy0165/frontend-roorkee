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

        <div className="flex gap-5">
          <div className="border border-2 border-black rounded-[13px]">
            <button className="bg-none text-black px-4 py-1 rounded-lg flex items-center  hover:bg-gray-200 hover:text-black">
              English <MdExpandMore className="font-semibold" />
            </button>
          </div>

          <div className="relative">
            <button
              className="border border-2 border-black rounded-[13px] bg-none text-black px-2 py-1 rounded-lg flex items-center hover:bg-[#3431BB] hover:text-white gap-4"
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
