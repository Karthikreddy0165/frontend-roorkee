import NavBarWithoutLogin from "@/components/NavBar";
import Tabs from "@/components/Tabs";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import BeneficiaryDropdownMenu from "../components/BeneficiariesDropdown";
import DepartmentDropdownMenu from "../components/Dropdowns/DepartmentDropDown";
import DropdownMenu from "@/components/Dropdowns/Dropdowns";
import SponsorsDropdownMenu from "@/components/Dropdowns/SponsorDropdown";

import FilterContext from '@/Context/FilterContext';
import VerifiedStatus from "@/components/isVerfiedComponent";
import BeneficiariesDropdown from "@/components/Dropdowns/BeneficiariesDropdown";

const schemesAll = () => {
  const { states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries, setFundingBy, sponsoredBy, setSponsoredBy} = useContext(FilterContext);
  const [filteredData, setFilteredData] = useState([]);
  const [test, setTest] = useState(0);
  const [test1, setTest1] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);

  const [data, setData] = useState(null);
  const [stateName, setStateName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [funderName, setFunderName] = useState("");
  const [levelName, setLevelName] = useState("");

  const [selectedState, setSelectedState] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedFunders, setSelectedFunders] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [bannerImage, setBannerImage] = useState("");
  // const [selectedDepartments, setSelectedDepartments] = useState([[], []]);


  const dropdownRef = useRef();
  const departmentDropdownRef = useRef();
  const beneficiaryDropdownRef = useRef();

  const [dropDownStates, setDropDownStates] = useState({
    dropDownOpen: false,
    departmentOpen: false,
    beneficiaryOpen: false,
    ageOpen: false,
    incomeOpen: false,
    fundersOpen: false,
    LevelOpen: false,
  });

  // console.log(sponsoredBy.length,"sponsoredBy.length")
  const backUpBannerImage = "/_next/image?url=http%3A%2F%2F65.0.103.91%2Fmedia%2Fbanners%2FScheme_details_page_banner_TvdKXuh.png&w=3840&q=75"


  useEffect(() => {
    fetch("http://localhost:8000/api/banners/")
        .then((response) => response.json())
        .then((data) => {
          // Find the active banner
          const activeBanner = data.find((banner) => banner.is_active);
          // Set the image URL of the active banner
          if (activeBanner) {
            setBannerImage(activeBanner.image);
          }
        })
        .catch((error) => console.error("Error fetching banner image:", error));
  }, []);

  // useEffect(() => {
  //   setStateName('');
  //   setDepartmentName('');
  //   setBeneficiaryName('');
  //   setFunderName('');
  //   setLevelName('');
  //   setSelectedDepartments([]);
  //   setSelectedBeneficiaries([]);
  //   setSelectedSponsors([]);
  // }, [data]);

  const toggleDropdown = (key) => {
    setDropDownStates((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      if (!prevState[key]) {
        // Close other dropdowns when opening a new one
        Object.keys(dropDownStates).forEach((dropdownKey) => {
          if (dropdownKey !== key) {
            newState[dropdownKey] = false;
          }
        });
      }
      return newState;
    });
  };

  const clearAllFilters = () => {
    setStates([]);
    setDepartments({});
    setBeneficiaries([]);
    setFundingBy([]);
    setSponsoredBy([]);
    setDropDownStates(
        {
          dropDownOpen: false,
          departmentOpen: false,
          beneficiaryOpen: false,
          ageOpen: false,
          incomeOpen: false,
          fundersOpen: false,
          LevelOpen: false,
        }
    )
  }


  return (
      <>
        <NavBarWithoutLogin />
        <VerifiedStatus/>
        {/* <BackButton /> */}
        <div className="relative w-[80vw] mx-auto mb-8 flex justify-center items-center max-w-[80%]">
          <div className="h-60 w-full relative brightness-70 mb-4">
            {bannerImage ? (
                <Image
                    src={bannerImage}
                    alt="Loading Image..."
                    layout="fill"
                    objectFit="contain"
                    className="rounded-[15px]"
                />
            ) : (
                <Image
                    src={backUpBannerImage}
                    alt="Loading Image..."
                    layout="fill"
                    objectFit="contain"
                    className="rounded-[15px]"
                />
            )}
          </div>
        </div>

        <div className="max-w-[80%] mx-auto">
          <div className="flex -ml-4">
            <div className="flex-1 max-w-[25%] p-4 mr-2">
              <div className="flex justify-between items-center -mt-16 ">
                <h1 className="m-0 font-semibold">Filters</h1>
                <button
                    className="text-[#3431BB] font-semibold p-2 hover:bg-[#EEEEFF] hover:rounded-lg m-0"
                    onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              </div>

              <hr />

              {/* filter categories */}

              <div className="mt-2 -ml-1">
                {/* Each filter category */}
                <div
                    className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                    onClick={() => toggleDropdown("LevelOpen")}
                    id="LevelBtn"
                >
                <span>
                  {levelName !== "" ? (
                      <span className="inline-flex items-center">
                      Sponsored By
                      <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">
                        {levelName}
                      </span>
                    </span>
                  ) : (
                      "Sponsored By"
                  )}
                </span>
                  {dropDownStates.LevelOpen ? (
                      <IoIosArrowUp className="text-black" />
                  ) : (
                      <IoIosArrowDown className="text-black" />
                  )}
                </div>
                {dropDownStates.LevelOpen && (
                    <SponsorsDropdownMenu/>
                )}


                {sponsoredBy.length !==0 &&(
                    <div
                        className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                        onClick={() => toggleDropdown("departmentOpen")}
                        id="departmentBtn"
                    >
                <span>
                  {departments[1] && departments[1].length > 0 ? (
                      <span className="inline-flex items-center">
                      Department
                      <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">
                        {departments[1].length}
                      </span>
                    </span>
                  ) : (
                      "Department"
                  )}
                </span>
                      {dropDownStates.departmentOpen ? (
                          <IoIosArrowUp className="text-[#000]" />
                      ) : (
                          <IoIosArrowDown className="text-[#000]" />
                      )}
                    </div>
                )}
                {dropDownStates.departmentOpen && (
                    <DepartmentDropdownMenu
                        ref={departmentDropdownRef}
                        selectedDepartments={selectedDepartments}
                        setSelectedDepartments={setSelectedDepartments}
                        setDepartmentName={setDepartmentName}
                        data={dropdownData}
                    />
                )}

                {sponsoredBy.length !==0 &&(
                    <div
                        className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                        onClick={() => toggleDropdown("beneficiaryOpen")}
                        id="beneficiaryBtn"
                    >
                <span>
                  {beneficiaries && beneficiaries.length > 0 ? (
                      <span className="inline-flex items-center">
                      Beneficiaries
                      <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">
                        {beneficiaries.length}
                      </span>
                    </span>
                  ) : (
                      "Beneficiaries"
                  )}
                </span>
                      {dropDownStates.beneficiaryOpen ? (
                          <IoIosArrowUp className="text-[#000]" />
                      ) : (
                          <IoIosArrowDown className="text-[#000]" />
                      )}
                    </div>
                )}
                {dropDownStates.beneficiaryOpen && (
                    <BeneficiariesDropdown/>
                )}
              </div>
            </div>
            {/* </div> */}

            <div className="flex-1 max-w-[75%]">
              <div>
                <Tabs />
              </div>
            </div>
          </div>
        </div>
      </>
  );

};

export default schemesAll;