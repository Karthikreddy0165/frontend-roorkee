import NavBarWithoutLogin from "@/components/NavBar";
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


const HeroPageWithoutLogin = () => {
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
  },[data])

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
    setSelectedState([]);
    setSelectedDepartments([]);
    setSelectedFunders([]);
    setSelectedBeneficiaries([]);
    setSelectedSponsors([]);
    setStateName('');
    setBeneficiaryName('');
    setDepartmentName('');
    setSponsorName('');
    setFunderName('');
  }

  return (
    <>
      <NavBarWithoutLogin/>
      {/* <BackButton /> */}
      <div
        className="relative w-80vw mx-auto mb-8 flex justify-center items-center "
        style={{ maxWidth: "80%", margin: "0 auto" }}
      >
        <div className="h-60 w-full relative brightness-50 mb-4">
          <Image
            src={MainPageImage}
            alt="Loading Image..."
            layout="fill"
            objectFit="cover"
            objectPosition="center bottom"
            className="rounded-[15px]"
          />
        </div>
      </div>

      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <div style={{ display: "flex" }}>
        <div style={{ flex: "1 0 25%", maxWidth: "25%", padding: "1rem" }}
          className="mr-2">
            <div className="flex justify-between items-center mb-4">
              <h1 style={{ margin: 0 }}>Filter by</h1>
              <button className="text-[#3431BB]" style={{ margin: 0 }} onClick={clearAllFilters}>
                Clear all filters
              </button>
            </div>

            <hr />

            {/* filter categories */}
            <div className="mt-2">
              {/* Each filter category */}
              <div className="flex justify-between items-center mb-4" onClick={() => toggleDropdown("dropDownOpen")} id="stateBtn"> <span>{stateName != "" ? (<span className="inline-flex items-center"> State <span className="w-5 h-5 bg-dropdown-blue text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{stateName}</span></span>) : "State"}
            </span>
            {dropDownStates.dropDownOpen ? <IoIosArrowUp className="text-black"/> : <IoIosArrowDown className="text-black" /> }
          </div>
              {dropDownStates.dropDownOpen && <DropdownMenu 
                ref={dropdownRef} 
                selectedState = {selectedState}
                setStateName = {setStateName}
                setSelectedState = {setSelectedState}
                data = {data}
              />}
              <div className="flex justify-between items-center mb-4" onClick={() => toggleDropdown("departmentOpen")} id="departmentBtn">
              <span>{departmentName != "" ? (<span className="inline-flex items-center"> Department <span className="w-5 h-5 bg-dropdown-blue text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{departmentName}</span></span>) : "Department"}</span>
              {dropDownStates.departmentOpen? <IoIosArrowUp className="text-[#000]" />:<IoIosArrowDown className="text-[#000]" /> }
              </div>
              {dropDownStates.departmentOpen && (
                  <DepartmentDropdownMenu
                    ref={departmentDropdownRef}
                    selectedDepartments={selectedDepartments}
                    setSelectedDepartments={setSelectedDepartments}
                    setDepartmentName={setDepartmentName}
                    data = {data}
                  />
                )}
              <div className="flex justify-between items-center mb-4" onClick={() => toggleDropdown("fundersOpen")} id="fundingbyBtn">
              <span>{funderName != "" ? (<span className="inline-flex items-center"> Funding by <span className="w-5 h-5 bg-dropdown-blue text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{funderName}</span></span>) : "Funding by"}</span>
              {dropDownStates.fundersOpen? <IoIosArrowUp className="text-[#000]"/> : <IoIosArrowDown className="text-[#000]" /> }
              </div>
              {dropDownStates.fundersOpen && (
                  <FundingByDropdownMenu
                    ref={funderDropdownRef}
                    selectedFunders={selectedFunders}
                    setSelectedFunders={setSelectedFunders}
                    setFunderName={setFunderName}
                    data = {data}
                  />
                )}
              <div className="flex justify-between items-center mb-4" onClick={() => toggleDropdown("beneficiaryOpen")} id="beneficiaryBtn">
              <span>{beneficiaryName != "" ? (<span className="inline-flex items-center">Beneficiaries <span className="w-5 h-5 bg-dropdown-blue text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{beneficiaryName}</span></span>) : "Beneficiaries"}</span>
              {dropDownStates.beneficiaryOpen ? <IoIosArrowUp className="text-[#000]"/> : <IoIosArrowDown className="text-[#000]" /> }
              </div>
              {dropDownStates.beneficiaryOpen && (
                  <BeneficiaryDropdownMenu
                    ref={beneficiaryDropdownRef}
                    selectedBeneficiaries={selectedBeneficiaries}
                    setSelectedBeneficiaries={setSelectedBeneficiaries}
                    setBeneficiaryName={setBeneficiaryName}
                    data = {data}
                  />
                )}
               <div className="flex justify-between items-center mb-4" onClick={() => toggleDropdown("sponsorsOpen")} id="sponsorBtn">
                <span>{sponsorName != "" ? (<span className="inline-flex items-center">Sponsored by<span className="w-5 h-5 bg-dropdown-blue text-onclick-btnblue text-[12px] font-semibold rounded-full flex items-center justify-center ml-2">{sponsorName}</span></span>) : "Sponsored by"}
            </span>
            {dropDownStates.sponsorsOpen ? <IoIosArrowUp className="text-black"/> : <IoIosArrowDown className="text-black" /> }
          </div>
              {dropDownStates.sponsorsOpen && ( <SponsorsDropdownMenu
                ref={sponsorDropdownRef} 
                selectedSponsors = {selectedSponsors}
                setSponsorName = {setSponsorName}
                setSelectedSponsors = {setSelectedSponsors}
                data = {data}
              />
            )}
            </div>
          </div>
          {/* </div> */}

          <div style={{ flex: "1 0 75%", maxWidth: "75%" }}>
            <div>
              <Tabs 
              data = {data}
              setData = {setData}
              stateName = {stateName}
              setStateName = {setStateName}
              departmentName = {departmentName}
              setDepartmentName = {setDepartmentName}
              beneficiaryName = {beneficiaryName}
              setBeneficiaryName = {setBeneficiaryName}
              funderName = {funderName}
              setFunderName = {setFunderName}
              sponsorName = {sponsorName}
              setSponsorName = {setSponsorName}
              selectedDepartments = {selectedDepartments}
              setSelectedDepartments = {setSelectedDepartments}
              selectedBeneficiaries = {selectedBeneficiaries}
              setSelectedBeneficiaries = {setSelectedBeneficiaries}
              selectedState = {selectedState}
              selectedAges = {selectedAges}
              setSelectedAges = {setSelectedAges}
              selectedIncomes = {selectedIncomes}
              setSelectedIncomes = {setSelectedIncomes}
              selectedFunders = {selectedFunders}
              setSelectedFunders = {setSelectedFunders}
              selectedSponsors = {selectedSponsors}
              dropDownStates = {dropDownStates}
              setDropDownStates = {setDropDownStates}
              dropdownRef = {dropdownRef}
              departmentDropdownRef = {departmentDropdownRef}
              beneficiaryDropdownRef = {beneficiaryDropdownRef}
              ageDropdownRef = {ageDropdownRef}
              incomeDropdownRef = {incomeDropdownRef}
              funderDropdownRef = {funderDropdownRef}
              sponsorDropdownRef = {sponsorDropdownRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPageWithoutLogin;