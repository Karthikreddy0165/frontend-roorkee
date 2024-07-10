import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useRouter } from "next/router";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handGotoLoginpage = () => {
    router.push("/homepage");
  };

  

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    // Handle different options here, e.g., navigate or perform actions
    if (option === "MyProfile") {
      // Handle My Profile option
    } else if (option === "Logout") {
      // Handle Logout option
    }
    // For now, let's just toggle the dropdown
    toggleDropdown();
  };

  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }} className="flex justify-between items-center py-4 z-10 relative">
      {/* LogoImage */}
      <div className="">
        {/* <img className="h-16 w-16 text-white" alt="logo" /> */}
        Logo
      </div>

      {/* English Button */}
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

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul>
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
                    onClick={handGotoLoginpage}
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
  );
};

export default NavBar;
