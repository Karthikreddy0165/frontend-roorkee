import React, { useContext } from "react";
import FilterContext from "@/Context/FilterContext";

function ScholarshipCount(dataFromApi) {
  const {
    states,
    setStates,
    departments,
    setDepartments,
    beneficiaries,
    setBeneficiaries,
    sponsoredBy,
    setSponsoredBy,
  } = useContext(FilterContext);

  if (dataFromApi === {}) {
    return <></>;
  }

  if (dataFromApi.dataFromApi.count === 0) {
    return (
      <p className="flex justify-center text-[14px] sm:text-[18px] items-center mt-[8rem]">
        Sorry no result is found based on your preference.
      </p>
    );
  } else {
    return states.length > 0 ||
      departments.length > 0 ||
      beneficiaries.length > 0 ||
      sponsoredBy.length > 0 ? (
      <p className="text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter">
        We have found {dataFromApi.dataFromApi.count} Scholarships based on your
        preference
      </p>
    ) : (
      <p className="text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter">
        {dataFromApi.dataFromApi.count} Scholarships available
      </p>
    );
  }
}

export default ScholarshipCount;
