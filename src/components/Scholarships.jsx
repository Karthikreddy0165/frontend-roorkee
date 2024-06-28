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

export default function Scholarships() {
  const [data, setData] = useState(null); // [1]
  const [stateName, setStateName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [funderName, setFunderName] = useState("");

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedFunders, setSelectedFunders] = useState([]);

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch("/api/fetchSchemes");
      const data = await response.json();
      setData(data);
    };
    fetchState();
  }, []);

  const [dropDownStates, setDropDownStates] = useState({
    dropDownOpen: false,
    departmentOpen: false,
    beneficiaryOpen: false,
    ageOpen: false,
    incomeOpen: false,
    fundersOpen: false,
  });

  const dropdownRef = useRef();
  const departmentDropdownRef = useRef();
  const beneficiaryDropdownRef = useRef();
  const ageDropdownRef = useRef();
  const incomeDropdownRef = useRef();
  const funderDropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !departmentDropdownRef.current?.contains(event.target) &&
        !beneficiaryDropdownRef.current?.contains(event.target) &&
        !ageDropdownRef.current?.contains(event.target) &&
        !incomeDropdownRef.current?.contains(event.target) &&
        !funderDropdownRef.current?.contains(event.target) &&
        !event.target.closest("button[id$='Btn']")
      ) {
        setDropDownStates({
          dropDownOpen: false,
          departmentOpen: false,
          beneficiaryOpen: false,
          ageOpen: false,
          incomeOpen: false,
          fundersOpen: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <div className="bg-white font-sans mt-0">
      <h1 className="mt-0 mb-[20px] font-bold text-[28px]">Scholarships</h1>
      <div className="mt-0 w-full flex flex-wrap gap-[16px] mb-15 font-sans items-center py-[4px] px-[0px] text-gray-600 self-stretch text-button-text">
        <p className="font-normal text-[14px]">Filter schemes by</p>
        <button
          className={
            dropDownStates.dropDownOpen || stateName !== ""
              ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer`
              : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`
          }
          onClick={() => toggleDropdown("dropDownOpen")}
          id="stateBtn"
        >
          State <MdKeyboardArrowDown className="text-[20px] text-{#616161}" />
        </button>
        <button
          className={
            dropDownStates.departmentOpen || departmentName !== ""
              ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer`
              : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`
          }
          onClick={() => toggleDropdown("departmentOpen")}
          id="departmentBtn"
        >
          {departmentName !== "" ? `Department is ${departmentName}` : "Department"}{" "}
          <MdKeyboardArrowDown className="text-[20px] text-{#616161}" />
        </button>
        <button
          className={
            dropDownStates.beneficiaryOpen || beneficiaryName !== ""
              ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer`
              : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`
          }
          onClick={() => toggleDropdown("beneficiaryOpen")}
          id="beneficiaryBtn"
        >
          {beneficiaryName !== ""
            ? `Beneficiary is ${beneficiaryName}`
            : "Beneficiaries"}
          <MdKeyboardArrowDown className="text-[20px] text-{#616161}" />
        </button>
        <button
          className={
            dropDownStates.fundersOpen || funderName !== ""
              ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer`
              : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`
          }
          onClick={() => toggleDropdown("fundersOpen")}
          id="fundingbyBtn"
        >
          {funderName !== "" ? `Funder is ${funderName}` : "Funding by"}
          <MdKeyboardArrowDown className="text-[20px] text-{#616161}" />
        </button>
        <button
          className={
            dropDownStates.incomeOpen
              ? `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] text-onclick-btnblue border border-onclick-btnblue bg-dropdown-blue cursor-pointer`
              : `flex font-normal gap-1 py-[4px] pl-[8px] pr-[4px] rounded-[40px] text-[14px] border border-{#EDEDED} bg-white cursor-pointer hover:bg-gray-200 items-center`
          }
          onClick={() => toggleDropdown("incomeOpen")}
          id="incomeBtn"
        >
          More Filters <IoMdAdd className="text-[20px] text-{#616161}" />
        </button>
      </div>

      {dropDownStates.dropDownOpen && <DropdownMenu ref={dropdownRef} />}
      {dropDownStates.departmentOpen && (
        <DepartmentDropdownMenu
          ref={departmentDropdownRef}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          setDepartmentName={setDepartmentName}
          data = {data}
        />
      )}
      {dropDownStates.beneficiaryOpen && (
        <BeneficiaryDropdownMenu
          ref={beneficiaryDropdownRef}
          selectedBeneficiaries={selectedBeneficiaries}
          setSelectedBeneficiaries={setSelectedBeneficiaries}
          setBeneficiaryName={setBeneficiaryName}
          data = {data}
        />
      )}
      {dropDownStates.ageOpen && (
        <AgeDropdownMenu
          ref={ageDropdownRef}
          selectedAges={selectedAges}
          setSelectedAges={setSelectedAges}
          data = {data}
        />
      )}
      {dropDownStates.incomeOpen && (
        <IncomeDropdownMenu
          ref={incomeDropdownRef}
          selectedIncomes={selectedIncomes}
          setSelectedIncomes={setSelectedIncomes}
          data = {data}
        />
      )}
      {dropDownStates.fundersOpen && (
        <FundingByDropdownMenu
          ref={funderDropdownRef}
          selectedFunders={selectedFunders}
          setSelectedFunders={setSelectedFunders}
          setFunderName={setFunderName}
          data = {data}
        />
      )}
      <Categories
        selectedDepartments={selectedDepartments}
        selectedBeneficiaries={selectedBeneficiaries}
        selectedAges={selectedAges}
        selectedFunders={selectedFunders}
        selectedIncomes
        data={data}
      />
    </div>
  );
}