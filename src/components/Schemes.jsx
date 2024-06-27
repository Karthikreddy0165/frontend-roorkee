import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import React, { useState, useRef, useEffect } from "react";
import Categories from "./Categories";
import DropdownMenu from "./DropdownMenu";
import DepartmentDropdownMenu from "./DepartmentDropDown";
import BeneficiaryDropdownMenu from "./BeneficiariesDropdown";
import AgeDropdownMenu from "./AgeDropdown";
import IncomeDropdownMenu from "./IncomeDropdown";
import FundingByDropdownMenu from "./FundingBy";

export default function Schemes() {
  const [stateName, setStateName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [funderName, setFunderName] = useState("");

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedFunders, setSelectedFunders] = useState([]);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [beneficiaryOpen, setBeneficiaryOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [fundersOpen, setFundersOpen] = useState(false);

  const dropdownRef = useRef();
  const departmentDropdownRef = useRef();
  const beneficiaryDropdownRef = useRef();
  const ageDropdownRef = useRef();
  const incomeDropdownRef = useRef();
  const funderDropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setDepartmentOpen(false);
      }
      if (beneficiaryDropdownRef.current && !beneficiaryDropdownRef.current.contains(event.target)) {
        setBeneficiaryOpen(false);
      }
      if (ageDropdownRef.current && !ageDropdownRef.current.contains(event.target)) {
        setAgeOpen(false);
      }
      if (incomeDropdownRef.current && !incomeDropdownRef.current.contains(event.target)) {
        setIncomeOpen(false);
      }
      if (funderDropdownRef.current && !funderDropdownRef.current.contains(event.target)) {
        setFundersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleDepartmentClick = () => {
    setDepartmentOpen(!departmentOpen);
  };

  const handleBeneficiariesClick = () => {
    setBeneficiaryOpen(!beneficiaryOpen);
  }

  const handleAgeClick = () => {
    setAgeOpen(!ageOpen);
  }

  const handleIncomeClick = () => {
    setIncomeOpen(!incomeOpen);
  }

  const handleFundersClick = () => {
    setFundersOpen(!fundersOpen);
  }

  return (
    <div className="bg-white font-sans mt-0">
      <h1 className="mt-0 mb-[20px] font-bold text-[28px]">Schemes</h1>
      <div className="mt-0 w-full flex flex-wrap gap-[16px] mb-15 font-sans items-center py-[4px] px-[0px] text-gray-600 self-stretch text-button-text">
        <p className="font-normal text-[14px]">Filter schemes by</p>
        <button className = {dropDownOpen || stateName !== "" ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer` : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`} onClick={handleDropdownClick} id = "stateBtn"> State <MdKeyboardArrowDown className="text-[20px] text-{#616161}"/></button>
        <button className={departmentOpen || departmentName !== "" ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer` : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`} onClick={handleDepartmentClick} id = "departmentBtn">{departmentName !== "" ? `Department is ${departmentName}` : "Department"} <MdKeyboardArrowDown className="text-[20px] text-{#616161}"/></button>
        <button className = {beneficiaryOpen || beneficiaryName !== "" ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer` : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`} onClick = {handleBeneficiariesClick} id = "beneficiaryBtn">{beneficiaryName !== "" ? `Beneficiary is ${beneficiaryName}` : "Beneficiairies"}<MdKeyboardArrowDown className="text-[20px] text-{#616161}"/></button>
        <button className={fundersOpen || funderName !== "" ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer` : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`} onClick = {handleFundersClick} id = "fundingbyBtn">{funderName !== "" ? `Funder is ${funderName}` : "Funding by"}<MdKeyboardArrowDown className="text-[20px] text-{#616161}"/></button>
        <button className={incomeOpen ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer` : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`} onClick = {handleIncomeClick} id = "incomeBtn">More Filters <IoMdAdd className="text-[20px] text-{#616161}"/></button>
      </div>

      {dropDownOpen && <DropdownMenu ref={dropdownRef} />}
      {departmentOpen && <DepartmentDropdownMenu ref={departmentDropdownRef} selectedDepartments={selectedDepartments} setSelectedDepartments={setSelectedDepartments} setDepartmentName = {setDepartmentName} />}
      {beneficiaryOpen && <BeneficiaryDropdownMenu ref = {beneficiaryDropdownRef} selectedBeneficiaries = {selectedBeneficiaries} setSelectedBeneficiaries = {setSelectedBeneficiaries} setBeneficiaryName = {setBeneficiaryName} />}
      {ageOpen && <AgeDropdownMenu ref = {ageDropdownRef} selectedAges = {selectedAges} setSelectedAges = {setSelectedAges} />}
      {incomeOpen && <IncomeDropdownMenu ref = {incomeDropdownRef} selectedIncomes = {selectedIncomes} setSelectedIncomes = {setSelectedIncomes} />}
      {fundersOpen && <FundingByDropdownMenu ref = {funderDropdownRef} selectedFunders = {selectedFunders} setSelectedFunders = {setSelectedFunders} setFunderName = {setFunderName} />}
      <Categories selectedDepartments={selectedDepartments} selectedBeneficiaries = {selectedBeneficiaries} selectedAges = {selectedAges} selectedFunders = {selectedFunders} selectedIncomes = {selectedIncomes} />
    </div>
  );
}