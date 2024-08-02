import NavBarWithoutLogin from "@/components/NavBar";
import { useContext } from "react";
import Image from "next/image";
import MainPageImage from ".././assets/backgroundimg.png";
import BackButton from "@/components/BackButton";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Tabs from "@/components/Tabs";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import DepartmentDropdownMenu from "../components/DepartmentDropDown";
import BeneficiaryDropdownMenu from "../components/BeneficiariesDropdown";

import SponsorsDropdownMenu from "@/components/SponsorDropdown";

import FundingByDropdownMenu from "../components/FundingBy";
import FilterContext from '@/Context/FilterContext';

const HeroPage = () => {
  const { states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries, setFundingBy, sponseredBy, setSponseredBy} = useContext(FilterContext);
  const [filteredData, setFilteredData] = useState([]);
  const [test, setTest] = useState(0);
  const [test1, setTest1] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);

  const [data, setData] = useState(null);
  const [stateName, setStateName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [funderName, setFunderName] = useState("");
  const [sponsorName, setSponsorName] = useState("");

  const [selectedState, setSelectedState] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedFunders, setSelectedFunders] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);
  const [bannerImage, setBannerImage] = useState("");

  const dropdownRef = useRef();
  const departmentDropdownRef = useRef();
  const beneficiaryDropdownRef = useRef();
  const ageDropdownRef = useRef();
  const incomeDropdownRef = useRef();
  const funderDropdownRef = useRef();
  const sponsorDropdownRef = useRef();

  const [dropDownStates, setDropDownStates] = useState({
    dropDownOpen: false,
    departmentOpen: false,
    beneficiaryOpen: false,
    ageOpen: false,
    incomeOpen: false,
    fundersOpen: false,
    sponsorsOpen: false,
  });
const backUpBannerImage = "/_next/image?url=http%3A%2F%2F65.0.103.91%2Fmedia%2Fbanners%2FScheme_details_page_banner_TvdKXuh.png&w=3840&q=75"
  useEffect(() => {
    if(data){
      let filtered = data.results;

      if (selectedState && selectedState.length > 0) {
        filtered = filtered.filter((item) =>
          selectedState.includes(item.department.state)
        );
      }

      setDropdownData(filtered);
    }
    
  }, [selectedState, test, data])

  // handling filtering functionality
  useEffect(() => {
    if (data) {
      let filtered = data;

      if (selectedState && selectedState.length > 0) {
        filtered = filtered.results.filter((item) =>
          selectedState.includes(item.department.state)
        );
      }

      if (selectedDepartments && selectedDepartments.length > 0) {
        filtered = filtered.filter((item) =>
          selectedDepartments.includes(item.department.department_name)
        );
      }

      if (
        selectedBeneficiaries &&
        selectedBeneficiaries.length > 0
      ) {
        filtered = filtered.filter((item) => {
          const allBeneficiaryTypes = item.beneficiaries.flatMap(
            (beneficiary) =>
              beneficiary.beneficiary_type.split(",").map((type) => type.trim())
          );

          const haveCommonElement = selectedBeneficiaries.some(
            (beneficiary) => {
              return allBeneficiaryTypes.includes(beneficiary);
            }
          );

          if (haveCommonElement) {
            return true;
          } else {
            return false;
          }
        });
      }

      if (selectedFunders && selectedFunders.length > 0) {
        filtered = filtered.filter((item) =>
          selectedFunders.includes(item.funding_pattern)
        );
      }

      if (
        selectedSponsors &&
        selectedSponsors.length > 0
      ) {
        filtered = filtered.filter((item) => {
          const allSponsorTypes = item.sponsors.flatMap(
            (sponsor) =>
              sponsor.sponsor_type.split(",").map((type) => type.trim())
          );

          const haveCommonElement = selectedSponsors.some(
            (sponsor) => {
              return allSponsorTypes.includes(sponsor);
            }
          );

          if (haveCommonElement) {
            return true;
          } else {
            return false;
          }
        });
      }

      // Set filtered data after applying all filters
      setFilteredData(filtered);
    }
  }, [
    data,
    selectedState,
    selectedDepartments,
    selectedBeneficiaries,
    selectedFunders,
    selectedSponsors,
    test,
    test1
  ]);


  useEffect(() => {
    fetch("http://65.0.103.91:80/api/banners/")
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

  useEffect(() => {
    setStateName('');
    setDepartmentName('');
    setBeneficiaryName('');
    setFunderName('');
    setSponsorName('');
    setSelectedDepartments([]);
    setSelectedBeneficiaries([]);
    setSelectedAges([]);
    setSelectedIncomes([]);
    setSelectedFunders([]);
    setSelectedSponsors([]);
  }, [data]);

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
    setDepartments([]);
    setBeneficiaries([]);
    setFundingBy([]);
    setSponseredBy([]);
  }
  
  
  return (
    <>
      <NavBarWithoutLogin />
      {/* <BackButton /> */}
      <div className="relative w-[80vw] mx-auto mb-8 flex justify-center items-center max-w-[80%]">
        <div className="h-60 w-full relative brightness-70 mb-4">
          {/* <Image
            src={MainPageImage}
            alt="Loading Image..."
            layout="fill"
            objectFit="cover"
            objectPosition="center bottom"
            className="rounded-[15px]"
          /> */}
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
              <h1 className="m-0 font-semibold">Filter by</h1>
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
                onClick={() => toggleDropdown("dropDownOpen")}
                id="stateBtn"
              >
                <span>
                  {states.length > 0 ? (
                    <span className="inline-flex items-center">
                      State
                      <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">
                        {states[1].length}
                      </span>
                    </span>
                  ) : (
                    "State"
                  )}
                </span>
  
                {dropDownStates.dropDownOpen ? (
                  <IoIosArrowUp className="text-black" />
                ) : (
                  <IoIosArrowDown className="text-black" />
                )}
              </div>
              {dropDownStates.dropDownOpen && (
                <DropdownMenu
                  ref={dropdownRef}
                  selectedState={selectedState}
                  setStateName={setStateName}
                  setSelectedState={setSelectedState}
                  data={data}
                />
              )}
              <div
                className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                onClick={() => toggleDropdown("departmentOpen")}
                id="departmentBtn"
              >
                <span>
                  {departments.length > 0 ? (
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
              {dropDownStates.departmentOpen && (
                <DepartmentDropdownMenu
                  ref={departmentDropdownRef}
                  selectedDepartments={selectedDepartments}
                  setSelectedDepartments={setSelectedDepartments}
                  setDepartmentName={setDepartmentName}
                  data={dropdownData}
                />
              )}
              {/* <div className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2" onClick={() => toggleDropdown("fundersOpen")} id="fundingbyBtn">
                <span>{funderName != "" ? (<span className="inline-flex items-center"> Funding by <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{funderName}</span></span>) : "Funding by"}</span>
                {dropDownStates.fundersOpen? <IoIosArrowUp className="text-[#000]"/> : <IoIosArrowDown className="text-[#000]" /> }
                </div>
                {dropDownStates.fundersOpen && (
                    <FundingByDropdownMenu
                      ref={funderDropdownRef}
                      selectedFunders={selectedFunders}
                      setSelectedFunders={setSelectedFunders}
                      setFunderName={setFunderName}
                      data={dropdownData}
                    />
                  )} */}
              <div
                className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                onClick={() => toggleDropdown("beneficiaryOpen")}
                id="beneficiaryBtn"
              >
                <span>
                  {beneficiaries.length > 0 ? (
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
              {dropDownStates.beneficiaryOpen && (
                <BeneficiaryDropdownMenu
                  ref={beneficiaryDropdownRef}
                  selectedBeneficiaries={selectedBeneficiaries}
                  setSelectedBeneficiaries={setSelectedBeneficiaries}
                  setBeneficiaryName={setBeneficiaryName}
                  data={dropdownData}
                />
              )}
              <div
                className="flex justify-between items-center mb-4 hover:bg-[#EEEEFF] hover:rounded-md hover:text-onclick-btnblue p-[4px] pr-2 pb-2"
                onClick={() => toggleDropdown("sponsorsOpen")}
                id="sponsorBtn"
              >
                <span>
                  {sponseredBy.length > 0 ? (
                    <span className="inline-flex items-center">
                      Sponsored by
                      <span className="w-5 h-5 bg-[#EEEEFF] text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">
                        {sponseredBy[1].length}
                      </span>
                    </span>
                  ) : (
                    "Sponsored by"
                  )}
                </span>
                {dropDownStates.sponsorsOpen ? (
                  <IoIosArrowUp className="text-black" />
                ) : (
                  <IoIosArrowDown className="text-black" />
                )}
              </div>
              {dropDownStates.sponsorsOpen && (
                <SponsorsDropdownMenu
                  ref={sponsorDropdownRef}
                  selectedSponsors={selectedSponsors}
                  setSponsorName={setSponsorName}
                  setSelectedSponsors={setSelectedSponsors}
                  data={dropdownData}
                />
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

export default HeroPage;


