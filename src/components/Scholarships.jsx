import React, { useEffect } from "react";
import Categories from "./Categories";

export default function Scholarships({ searchQuery, setData, ...props }) {
  useEffect(() => {
    const fetchState = async () => {
      try {
        setData(null);
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/schemes`;
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
        selectedDepartments={props.selectedDepartments}
        selectedBeneficiaries={props.selectedBeneficiaries}
        selectedAges={props.selectedAges}
        selectedFunders={props.selectedFunders}
        selectedSponsors={props.selectedSponsors}
      />
    </div>
  );
}