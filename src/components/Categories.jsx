import { useEffect, useState } from "react";
import ApplyModal from "../pages/content";
import SavedModal from "@/pages/model/savedModal";

export default function Categories(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null); // State to hold the selected scheme
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isSavedButtonClicked, setIsSavedButtonClicked] = useState(false); // State to track Saved button click

  useEffect(() => {
    if (Array.isArray(props.data)) {
      let filtered = props.data;

      if (props.selectedDepartments && props.selectedDepartments.length > 0) {
        filtered = filtered.filter((item) =>
          props.selectedDepartments.includes(item.department)
        );
      }
      if (
        props.selectedBeneficiaries &&
        props.selectedBeneficiaries.length > 0
      ) {
        filtered = filtered.filter((item) =>
          props.selectedBeneficiaries.some((ben) =>
            item.beneficiaries.includes(ben)
          )
        );
      }
      if (props.selectedFunders && props.selectedFunders.length > 0) {
        filtered = filtered.filter((item) =>
          props.selectedFunders.includes(item.funding_pattern)
        );
      }

      // Add other filters as needed...

      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [
    props.data,
    props.selectedDepartments,
    props.selectedBeneficiaries,
    props.selectedFunders,
    props.selectedIncomes,
    props.selectedAges,
  ]);

  const handleClick = (scheme_id) => {
    const scheme = props.data.find((item) => item.id === scheme_id);
    if (scheme) {
      setSelectedScheme(scheme); // Set the selected scheme
      setIsModalOpen(true); // Open the modal
    }
  };

  const handleSavedButtonClick = () => {
    if (props.isLoggedIn) {
      setIsSavedButtonClicked(true);
      setIsSavedModalOpen(true); // Open the SavedModal
    } else {
      // Handle non-logged-in user behavior (e.g., redirect to login page or show message)
      // Example: alert("Please log in to save this item.");
      // For now, just set button style
      setIsSavedButtonClicked(true);
    }
  };

  if (props.data === null) {
    return (
      <div className="text-onclick-btnblue mt-[120px] italic flex justify-center items-center text-[18px]">
        Loading...
      </div>
    );
  }

  if (props.data.length === 0 || filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[8px] mt-[120px]">
        <p className="text-button-text text-[14px]">No results found</p>
      </div>
    );
  }

  return (
    <div>
      {Array.isArray(filteredData) &&
        filteredData.map((item) => (
          <div
            className="flex items-center justify-start self-stretch relative border-[1px] border-category-border rounded-[12px] mb-2 py-[16px] px-[16px] my-6 hover:bg-violet-100"
            key={item.id}
          >
            <div className="flex ">
              <div className="flex items-center justify-center bg-update-bg px-[8px] py-[6px] m-2 rounded-[4px] gap-[10px] absolute top-[4px] left-[16px]">
                <h1 className="text-update-clr text-[12px] text-semibold text-center font-inter">
                  New Update
                </h1>
              </div>
              <b className="absolute top-[6px] right-[16px]" onClick={handleSavedButtonClick}>
                <svg
                  className={isSavedButtonClicked ? "bg-blue-400" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M20.0156 3.6875H7.98438C7.52853 3.6875 7.09136 3.86858 6.76904 4.19091C6.44671 4.51324 6.26563 4.95041 6.26562 5.40625V24.3125C6.2657 24.4659 6.30682 24.6164 6.38471 24.7485C6.4626 24.8806 6.57443 24.9895 6.70859 25.0638C6.84275 25.1381 6.99435 25.1752 7.14766 25.1711C7.30098 25.1671 7.45041 25.1221 7.58047 25.0408L14 21.0286L20.4206 25.0408C20.5506 25.1218 20.7 25.1666 20.8531 25.1705C21.0063 25.1744 21.1577 25.1373 21.2917 25.063C21.4257 24.9887 21.5374 24.88 21.6152 24.748C21.693 24.6161 21.7342 24.4657 21.7344 24.3125V5.40625C21.7344 4.95041 21.5533 4.51324 21.231 4.19091C20.9086 3.86858 20.4715 3.6875 20.0156 3.6875ZM20.0156 22.7624L14.4544 19.2873C14.3178 19.2019 14.16 19.1567 13.9989 19.1567C13.8379 19.1567 13.68 19.2019 13.5435 19.2873L7.98438 22.7624V5.40625H20.0156V22.7624Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </b>
            </div>

            <div className="py-[10px] px-[10px] mt-6">
              <p
                className="font-inter text-[14px] leading-[21.6px] cursor-pointer font-bold mb-[10px] line-clamp-2 w-8/12"
                onClick={() => handleClick(item.id)}
                role="button"
                tabIndex="0"
              >
                {item.title}
              </p>
              <p
                className="font-inter text-[14px] opacity-60 leading-[21.6px] mb-[10px] line-clamp-2"
                onClick={() => handleClick(item.id)}
                role="button"
                tabIndex="0"
              >
                <span className="font-semibold">Description: </span>
                {item.description}
              </p>

              <p className="font-inter text-[14px] opacity-60 leading-[21.6px] mb-[10px] line-clamp-2 text-decoration-line: underline ">
                {item.department.department_name}
              </p>

              <div className="flex gap-5 ">
                <button className="flex items-center justify-center pr-2 pl-2 border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium py-1">
                  {item.department.state}
                </button>

                {item.beneficiaries.length > 0 && (
                  <button className="flex items-center justify-center pr-2 pl-2 py-[5px] border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium max-w-[150px] overflow-x-auto whitespace-nowrap">
                    {item.beneficiaries.length > 0
                      ? item.beneficiaries[0].beneficiary_type
                      : "No beneficiaries specified"}
                  </button>
                )}
              </div>
              <p
                className=" font-inter text-[12px] text-apply-date leading-[24px] mt-4"
                // onClick={() => handleClick(item.id)}
                role="button"
                tabIndex="0"
              >
                Last date to apply:{" "}
                <span className="font-bold">
                  {item.valid_upto.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
        ))}
      {isModalOpen && selectedScheme && (
        <ApplyModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          scheme={selectedScheme}
        />
      )}
      {isSavedButtonClicked && (
        <SavedModal
          isOpen={isSavedButtonClicked}
          onRequestClose={() => setIsSavedButtonClicked(false)}
          scheme={selectedScheme}
        />
      )}
    </div>
  );
}
