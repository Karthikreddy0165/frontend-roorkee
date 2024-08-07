import React, {useContext} from "react";
import FilterContext from "@/Context/FilterContext";

function ScholarshipCount(dataFromApi){

  const {states, setStates, departments, setDepartments, beneficiaries, setBeneficiaries, sponseredBy, setSponseredBy} = useContext(FilterContext);


    if(dataFromApi == {}){
      return(
        <></>
      )
    }

    if(dataFromApi.dataFromApi.count == 0) {
      return (
        <p className = "text-button-blue text-sm font-bold flex justify-center mt-[100px] font-inter">Sorry no result is found based on your preference.</p>
      )
    }
    else {
      return (
        states.length > 0 || departments.length > 0 || beneficiaries.length > 0 || sponseredBy.length > 0 ? <p className = "text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter">We have found {dataFromApi.dataFromApi.count} schemes based on your preference</p> : <p className = "text-button-blue text-sm font-bold mt-[24px] mb-[24px] font-inter">{dataFromApi.dataFromApi.count} Schemes available</p>
      )
    }
}

export default ScholarshipCount;