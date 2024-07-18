import React, { useState, useRef, useEffect } from "react";
import Categories from "../components/Categories";

export default function Scholarships(props) {
  useEffect(() => {
    const fetchState = async () => {
      try {
        props.setData(null);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/schemes`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        props.setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !props.dropdownRef.current?.contains(event.target) &&
        !props.departmentDropdownRef.current?.contains(event.target) &&
        !props.beneficiaryDropdownRef.current?.contains(event.target) &&
        !props.ageDropdownRef.current?.contains(event.target) &&
        !props.incomeDropdownRef.current?.contains(event.target) &&
        !props.funderDropdownRef.current?.contains(event.target) &&
        !event.target.closest("button[id$='Btn']")
      ) {
        props.setDropDownStates({
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
    props.setDropDownStates((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      if (!prevState[key]) {
        // Close other dropdowns when opening a new one
        Object.keys(props.dropDownStates).forEach((dropdownKey) => {
          if (dropdownKey !== key) {
            newState[dropdownKey] = false;
          }
        });
      }
      return newState;
    });
  };

  return (
    <>
    <div className="bg-white font-sans">
      <Categories
        data = {props.data}
        selectedDepartments={props.selectedDepartments}
        selectedBeneficiaries={props.selectedBeneficiaries}
        selectedAges={props.selectedAges}
        selectedFunders={props.selectedFunders}
      />
    </div>
    </>
  );
}
