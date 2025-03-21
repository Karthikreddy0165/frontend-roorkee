import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { IoMdClose } from "react-icons/io"; // For menu icon in mobile

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/Context/AuthContext";
import { IoIosPerson } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ProfileModal from "@/components/Modals/profileModal";
import { MdMenu, MdClose } from "react-icons/md"; // Import icons

import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, logout } = useAuth();

  const [categories, setCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Navbar Container */}
      <div className="flex  items-center border-b-2 sm:border-none py-2  bg-[#2F3291]  px-2 z-10 relative sm:h-[73px] h-[73px] gap-2 w-full sm:px-6">
        {/* Logo Section */}
        <div
          className="sm:text-[16px] mt-2 font-semibold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer"
          onClick={handleClickLogo}
        >
          <div className="text-white whitespace-nowrap">Empower Hub</div>
        </div>

        <div className="flex items-center justify-end w-full sm:px-6 md:px-10">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-[16px] font-semibold">
            {/* Home Link */}
            <a
              href="/"
              className={`text-white   transition duration-300 ${
                router.pathname === "/" ? "underline decoration-[#3330BA]" : ""
              }`}
            >
              HOME
            </a>

            {/* About Us Link */}

            {/* Dynamic Categories */}
            {categories.map((category, index) => (
              <a
                key={index}
                href={`/AllSchemes?tab=${category.name.toLowerCase()}`}
                className={`text-white  transition duration-300 ${
                  router.query.tab === category.name.toLowerCase()
                    ? "underline decoration-[#3330BA]"
                    : ""
                }`}
              >
                {category.label}
              </a>
            ))}
            <a
              href="/AboutUs"
              className={`text-white  transition duration-300 ${
                router.pathname === "/AboutUs"
                  ? "underline decoration-[#3330BA]"
                  : ""
              }`}
            >
              ABOUT US
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#000000] focus:outline-none"
            >
              <MdMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 right-6 p-6 w-48 bg-white shadow-lg rounded-lg md:hidden">
              <a href="/" className="block py-2 text-black ">
                HOME
              </a>

              {categories.map((category, index) => (
                <a
                  key={index}
                  href={`/AllSchemes?tab=${category.name.toLowerCase()}`}
                  className="block py-2 text-black "
                >
                  {category.label}
                </a>
              ))}
              <a href="/AboutUs" className="block py-2 text-black ">
                ABOUT US
              </a>
            </div>
          )}
        </div>

        <div className="flex  ml-auto items-center  ">
          {authState.token ? (
            <div className="relative">
              {/* Profile Icon for Mobile */}
              <button
                className="flex items-center px-4 py-2 text-gray-500 text-[35px] font-semibold rounded-lg sm:hidden"
                onClick={toggleDropdown}
              >
                <CgProfile />
              </button>

              {/* Profile Button for Desktop */}
              <button
                className="flex items-center px-4 py-2 bg-[#F58220] text-white text-sm font-semibold rounded-lg shadow-md  md:flex hidden"
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
                        className="block px-4 py-2 text-sm text-gray-800  w-full text-left hover:rounded-t-lg"
                        onClick={() => handleOptionClick("MyProfile")}
                      >
                        My Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-gray-800  w-full text-left hover:rounded-b-lg"
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
              {/* Login Button for Mobile */}
              <button
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md  sm:hidden"
                onClick={handleGotologin}
              >
                Login
              </button>

              {/* Login Button for Desktop */}
              <button
                className="px-4 py-2 bg-[#3431BB] text-white text-sm font-semibold rounded-lg shadow-md  hidden sm:block"
                onClick={handleGotologin}
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Profile Modal (Visible only on mobile) */}
        {isProfileModalOpen && ProfileModal && (
          <ProfileModal onClose={closeProfileModal} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
