import NavBarWithoutLogin from "@/components/NavBar";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DepartmentDropdownMenu from "../components/Dropdowns/DepartmentDropDown";
import SponsorsDropdownMenu from "@/components/Dropdowns/SponsorDropdown";
import BeneficiariesDropdown from "@/components/Dropdowns/BeneficiariesDropdown";
import FilterContext from "@/Context/FilterContext";
import VerifiedStatus from "@/components/isVerfiedComponent";


const SchemesAll = () => {
  const {
    states,
    setStates,
    departments,
    setDepartments,
    beneficiaries,
    setBeneficiaries,
    setFundingBy,
    sponsoredBy,
    setSponsoredBy,
  } = useContext(FilterContext);

  const [bannerImage, setBannerImage] = useState("");
  const [dropDownStates, setDropDownStates] = useState({
    dropDownOpen: false,
    departmentOpen: false,
    beneficiaryOpen: false,
    sponsoredOpen: false,
  });

  const backUpBannerImage =
      "/_next/image?url=http%3A%2F%2F65.0.103.91%2Fmedia%2Fbanners%2FScheme_details_page_banner_TvdKXuh.png&w=3840&q=75";

  useEffect(() => {
    fetch("http://localhost:8000/api/banners/")
        .then((response) => response.json())
        .then((data) => {
          const activeBanner = data.find((banner) => banner.is_active);
          if (activeBanner) {
            setBannerImage(activeBanner.image);
          }
        })
        .catch((error) => console.error("Error fetching banner image:", error));
  }, []);

  const toggleDropdown = (key) => {
    setDropDownStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const clearAllFilters = () => {
    setStates([]);
    setDepartments({});
    setBeneficiaries([]);
    setSponsoredBy([]);
    setDropDownStates({
      sponsoredOpen: false,
      departmentOpen: false,
      beneficiaryOpen: false,
    });
  };

  const handleStateChange = (updatedStates) => {
    setStates(updatedStates);

    // Reset related dropdowns and their data if no states are selected
    if (updatedStates.length === 0) {
      setDepartments([]);
      setBeneficiaries([]);
      setDropDownStates((prev) => ({
        ...prev,
        departmentOpen: false,
        beneficiaryOpen: false,
      }));
    } else if (updatedStates.length > 0 && sponsoredBy.length === 1 && sponsoredBy[0][0] === 2) {
      // If only "Central" is selected, keep the dropdowns open
      setDropDownStates((prev) => ({
        ...prev,
        departmentOpen: true,
        beneficiaryOpen: true,
      }));
    }
  };



// Update visibility logic for dropdowns
  const isDepartmentVisible = (sponsoredBy.length > 0) && (states.length > 0 || (sponsoredBy[0][0] === 2)); // At least one sponsor and one state selected or "Central"
  const isBeneficiaryVisible = (sponsoredBy.length > 0) && (states.length > 0 || (sponsoredBy[0][0] === 2)); // Beneficiary visible if at least one sponsor and one state selected or "Central"



  return (
      <>
        <NavBarWithoutLogin />
        <VerifiedStatus />
        <div className="relative w-[80vw] mx-auto mb-8 flex justify-center items-center max-w-[80%] mt-50px">
          <div className="h-60 w-full relative brightness-70 mb-4">
            <Image
                src={bannerImage || backUpBannerImage}
                alt="Loading Image..."
                fill
                className="rounded-[15px]"
            />
          </div>
        </div>

        <div className="max-w-[80%] mx-auto mt-50px">
          <div className="flex -ml-4">
            <div className="flex-1 max-w-[25%] p-4 mr-2">
              <div className="flex justify-between items-center -mt-16">
                <h1 className="m-0 font-semibold">Filters</h1>
                <button
                    className="text-[#3431BB] font-semibold p-2 hover:bg-[#EEEEFF] hover:rounded-lg m-0"
                    onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              </div>
              <hr />

              {/* Sponsored By Dropdown */}
              <div
                  className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                  onClick={() => toggleDropdown("sponsoredOpen")}
              >
                <span>Sponsored By</span>
                {dropDownStates.sponsoredOpen ? (
                    <IoIosArrowUp className="text-black" />
                ) : (
                    <IoIosArrowDown className="text-black" />
                )}
              </div>
              {dropDownStates.sponsoredOpen && <SponsorsDropdownMenu />}

              {/* Department Dropdown */}
              {isDepartmentVisible && (
                  <div
                      className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                      onClick={() => toggleDropdown("departmentOpen")}
                  >
                    <span>Department</span>
                    {dropDownStates.departmentOpen ? (
                        <IoIosArrowUp className="text-black"/>
                    ) : (
                        <IoIosArrowDown className="text-black"/>
                    )}
                  </div>

              )}
              {isDepartmentVisible && dropDownStates.departmentOpen && handleStateChange&& <DepartmentDropdownMenu/>}

              {/* Beneficiaries Dropdown */}
              {isBeneficiaryVisible && (
                  <div
                      className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                      onClick={() => toggleDropdown("beneficiaryOpen")}
                  >
                  <span>Beneficiaries</span>
                    {dropDownStates.beneficiaryOpen ? (
                        <IoIosArrowUp className="text-black" />
                    ) : (
                        <IoIosArrowDown className="text-black" />
                    )}
                  </div>
              )}
              {isBeneficiaryVisible && dropDownStates.beneficiaryOpen && handleStateChange && <BeneficiariesDropdown />}

            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-[75%]">
              <Tabs />
            </div>
          </div>
        </div>
      </>
  );
};

export default SchemesAll;
