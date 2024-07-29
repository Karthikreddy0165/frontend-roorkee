import { useEffect } from "react";
import Categories from "./Categories";

export default function Schemes({ searchQuery, setData, ...props }) {
  useEffect(() => {
    const fetchState = async () => {
      try {
        setData(null);
        // let url = `http://52.65.93.83:8080/api/schemes`;
        let url = `http://65.0.103.91:80/api/schemes`
        if (searchQuery) {
          url += `/search/?q=${searchQuery}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchState();
  }, [searchQuery, setData]);

  return (
    <div className="bg-white font-sans">
      <Categories
        data={props.data}
        selectedState={props.selectedState}
        setSelectedState = {props.setSelectedState}
        setStateName = {props.setStateName}
        selectedDepartments={props.selectedDepartments}

        selectedBeneficiaries={props.selectedBeneficiaries}
        setSelectedBeneficiaries = {props.setSelectedBeneficiaries}
        setBeneficiaryName = {props.setBeneficiaryName}

        selectedAges={props.selectedAges}
        selectedFunders={props.selectedFunders}
        selectedSponsors={props.selectedSponsors}
        filteredData = {props.filteredData}
        setTest = {props.setTest}
        setTest1 = {props.setTest1}
      />
    </div>
  );
}