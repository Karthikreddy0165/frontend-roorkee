import React, { useEffect } from "react";
import Categories from "./Categories"; // Adjust path as per your project structure
import { useTabContext } from "@/Context/TabContext";

export default function JobOpenings({ setData, ...props }) {
  const { searchQuery } = useTabContext(); // Access searchQuery from TabContext

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        setData(null);
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/schemes`;
        if (searchQuery) {
          url += `/search/?q=${searchQuery}`;
          console.log("Search Query:", searchQuery); // Debugging log
        }

        console.log("Fetching URL:", url); // Debugging log

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Failed to fetch job openings data:", error);
      }
    };

    fetchJobOpenings();
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
      />
    </div>
  );
}
