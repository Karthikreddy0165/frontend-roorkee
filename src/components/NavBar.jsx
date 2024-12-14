import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenuOutline, IoMdClose } from "react-icons/io5"; // For menu icon in mobile
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/Context/AuthContext";

import ProfileModal from "../pages/Modals/profileModal";

const NavBar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, logout } = useAuth();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar Container */}
      <div className="flex justify-between items-center py-4 px-6 bg-white shadow-md z-10 relative w-[482px] sm:w-full">
        {/* Logo Section (Visible on all screen sizes) */}
        <div
          className="text-xl font-bold text-[#3431BB] hover:text-blue-700 cursor-pointer"
          onClick={handleClickLogo}
        >
          LAUNCHPAD
        </div>

        {/* Profile or Login Section */}
        <div className="flex gap-4 items-center">
          {authState.token ? (
            <div className="relative">
              {/* Profile Button (Visible only on large screens) */}
              <button
                className="flex items-center px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 hidden md:flex"
                onClick={toggleDropdown}
              >
                Profile <IoIosArrowDown className="ml-2" />
              </button>

              {/* Profile Icon (Visible only on mobile screens) */}
              <button
                className="px-4 py-2 text-gray-700 hover:text-blue-700 md:hidden"
                onClick={() => setIsProfileModalOpen(true)} // Opens the profile modal for mobile
              >
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              </button>

              {/* Dropdown Menu (Visible only on large screens) */}
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
                    <hr />
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
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700"
                onClick={handleGotologin}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal (Visible only on mobile) */}
      {isProfileModalOpen && ProfileModal && (
        <ProfileModal onClose={closeProfileModal} />
      )}

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="bg-white w-64 p-6 absolute top-0 right-0 h-full">
            <button className="text-2xl text-gray-700" onClick={toggleSidebar}>
              <IoMdClose />
            </button>
            <ul className="mt-8">
              {authState.token ? (
                <>
                  <li>
                    <button
                      className="block py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleOptionClick("MyProfile")}
                    >
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="block py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleOptionClick("Logout")}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    className="block py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={handleGotologin}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
