import React, { useContext } from "react";
import FilterContext from "@/Context/FilterContext";

function SchemeCount(dataFromApi) {
  const {
    states,
    setStates,
    departments,
    setDepartments,
    beneficiaries,
    setBeneficiaries,
    sponsoredBy,
    setsponsoredBy,
  } = useContext(FilterContext);

  if (dataFromApi === {}) {
    return <></>;
  }

  if (dataFromApi.dataFromApi.count === 0) {
    return (
      <p className="text-button-blue text-[14px] sm:text-[18px] font-bold flex justify-center mt-[100px] font-inter">
        Sorry no result is found based on your preference.
      </p>
    );
  } else {
    return states.length > 0 ||
      departments.length > 0 ||
      beneficiaries.length > 0 ||
      sponsoredBy.length > 0 ? (
      <p className="text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter sm:block hidden">
        We have found {dataFromApi.dataFromApi.count} Schemes based on your
        preference
      </p>
    ) : (
      <p className="text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter sm:block hidden">
        {dataFromApi.dataFromApi.count} Schemes available
      </p>
    );
  }
}

export default SchemeCount;
