import { useAuth } from "@/Context/AuthContext";
import SavedModal from "@/pages/Modals/savedModal";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
import ApplyModal from "@/pages/Modals/ApplySchemesModal";
import Toast from "./ComponentsUtils/SavedToast.jsx";
import UnSaveToast from "./ComponentsUtils/UnsaveToast";
import PageContext from "@/Context/PageContext";
import { useContext } from "react";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";
import { Paginator } from "primereact/paginator";
import ToolTips from "./ComponentsUtils/tooltips.jsx";

export default function Categories({ ffff, dataFromApi, totalPages }) {
  const { activeTab, setActiveTab } = useTabContext(); // Accessing context
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setBookmarks] = useState({});
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { authState } = useAuth();
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isUnSaveToastVisible, setIsUnSaveToastVisible] = useState(false);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [sidePannelSelected, setSidePannelSelected] = useState(null);
  const {
    states,
    setStates,
    beneficiaries,
    setBeneficiaries,
    statesFromApi,
    setStatesFromApi,
  } = useContext(FilterContext);

  // Close the toast after a certain time
  useEffect(() => {
    if (isToastVisible) {
      const timer = setTimeout(() => {
        setIsToastVisible(false);
      }, 3000); // Adjust time as needed
      return () => clearTimeout(timer);
    }
  }, [isToastVisible]);

  // close the unsavetoast after a certain time
  useEffect(() => {
    if (isUnSaveToastVisible) {
      const timer = setTimeout(() => {
        setIsUnSaveToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }),
    [isUnSaveToastVisible];

  // Fetch saved schemes so that we can mark saved schemes as bookmarked
  useEffect(() => {
    const fetchSavedSchemes = async () => {
      if (authState.token) {
        // console.log("Auth token for catagory:", authState.token);
        try {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${authState.token}`);
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/saved_schemes/`,
            requestOptions
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const savedSchemes = data.map((scheme) => scheme.id);
          const bookmarks = savedSchemes.reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {});
          setBookmarks(bookmarks);
        } catch (error) {
          console.error("Failed to fetch saved schemes:", error);
        }
      }
    };
    fetchSavedSchemes();
  }, [authState.token]);

  const handleClick = (scheme_id) => {
    const scheme = dataFromApi.results.find((item) => item.id === scheme_id);
    if (scheme) {
      setSelectedScheme(scheme); // Set the selected scheme
      setIsModalOpen(true); // Open the modal
      setSidePannelSelected(scheme_id);
    }
  };

  // To save scheme
  const saveScheme = async (scheme_id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authState.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      scheme_id: scheme_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/save_scheme/`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        return true;
      } else {
        console.error("Failed to save scheme");
        return false;
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return false;
    }
  };

  // Unsave scheme
  const unsaveScheme = async (scheme_id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authState.token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      scheme_ids: [scheme_id],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      console.log("Sending unsave request for scheme_id:", scheme_id);
      console.log("Request payload:", raw);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/unsave_scheme/`,
        requestOptions
      );
      const result = await response.json();
      // console.log("Unsave response:", result); // Log the response
      if (response.ok) {
        // console.log(result);
        setIsUnSaveToastVisible(true); // Show the toast
        return true;
      } else {
        console.error("Failed to unsave scheme");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const toggleBookmark = async (e, itemId) => {
    e.preventDefault();

    if (authState.token) {
      let success;
      if (isBookmarked[itemId]) {
        success = await unsaveScheme(itemId);
      } else {
        success = await saveScheme(itemId);
        setIsToastVisible(true); // Show the toast
      }

      if (success) {
        // setIsToastVisible(true); // Show the toast
        setBookmarks((prevState) => ({
          ...prevState,
          [itemId]: !prevState[itemId],
        }));
      }
    } else {
      setIsSavedModalOpen(true);
    }
  };
  console.log(dataFromApi);

  if (Object.keys(dataFromApi).length === 0) {
    return (
      <div className="text-onclick-btnblue mt-[120px] italic flex justify-center items-center text-[18px]">
        Loading...
      </div>
    );
  }

  // if (Object.keys(dataFromApi).length == 0 && (states.length == 0 || beneficiaries.length == 0)) {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-[8px] mt-[120px]">
  //       <p className="text-button-text text-[14px] text-button-blue">Sorry no result is found based on your preference.</p>
  //     </div>
  //   );
  // }

  const handleStateTag = (event) => {
    event.stopPropagation();
    var state = event.target.innerText;
    if (states[1] && states[1].includes(state)) return;
    var stateId = 0;
    for (let i = 0; i < 7; i++) {
      if (statesFromApi[i].state_name === state) {
        stateId = statesFromApi[i].id;
        break;
      }
    }
    setStates((prev) => {
      if (prev && prev[0] && prev[1]) {
        return [
          [...prev[0], stateId],
          [...prev[1], state],
        ];
      } else {
        return [[stateId], [state]];
      }
    });
  };

  const handleBeneficiaryTag = (e) => {
    e.stopPropagation();
    var beneficiary = e.target.innerText;
    if (
      !beneficiary.includes("OBC") &&
      !beneficiary.includes("SC") &&
      !beneficiaries.includes(beneficiary)
    ) {
      setBeneficiaries((prev) => [...prev, beneficiary]);
      // console.log(beneficiaries);
    }
    if (beneficiary.includes("OBC") && !beneficiaries.includes("OBC"))
      setBeneficiaries((prev) => [...prev, "OBC"]);
    if (
      (beneficiary.includes("SC") && !beneficiaries.includes("SC")) ||
      beneficiary === "Scheduled caste"
    )
      setBeneficiaries((prev) => [...prev, "SC"]);
  };
  // const handleBeneficiaryTag = (event) => {
  //   event.stopPropagation();
  //   var beneficiary = event.target.innerText
  //   if(!beneficiary.includes("OBC") && !beneficiary.includes("SC")) return;
  //   if(beneficiaries.includes("SC")) return;
  //   if(beneficiaries.includes("OBC")) return;
  //   if(beneficiary.includes("SC")) {
  //     setBeneficiaries(prev => [...prev, "SC"]);
  //   }
  //   else if(beneficiary.includes("OBC")) {
  //     setBeneficiaries(prev => [...prev, "OBC"]);
  //   }
  // }
  // console.log(dataFromApi.results,"resultes")

  // const totalSchemes = (activeTab != "Saved" ? dataFromApi.results: dataFromApi)

  return (
    <>
      {/* We have found {378} schemes based on your profile */}
      <div>
        {(activeTab !== "Saved"
          ? dataFromApi.results
          : dataFromApi.results
        ).map(
          (item) =>
            item.title && (
              <div
                className="flex items-start justify-between self-stretch relative border-[1px] border-gray-300 rounded-[12px] mb-2 py-[16px] px-[16px] my-6 hover:bg-violet-100 gap-[20px]"
                key={item.id}
                style={{
                  backgroundColor:
                    item.id === sidePannelSelected ? "#DDD6FE" : "",
                }}
              >
                <div onClick={() => handleClick(item.id)}>
                  {/* <button
              className="text-center text-[12px] px-[8px] py-[6px] rounded-[4px] gap-[10px]"
              style={{ color: "#151280", backgroundColor: "#EEEEFF" }}
            >
              New update
            </button> */}

                  <div className="gap-[12px] pt-[16px] pd-[16px]">
                    <p
                      className="font-inter text-[16px] sm:text-[18px] leading-[21.6px] cursor-pointer font-semibold mb-[10px] line-clamp-2 w-8/12 text-gray-700"
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
                      <span className="font-semibold ">Description: </span>
                      {item.description}
                    </p>
                    <p className="font-inter text-[14px] opacity-60 leading-[21.6px] mb-[26px] line-clamp-2 text-decoration-line: underline ">
                      {item.department.department_name}
                    </p>

                    <div className="flex gap-5 mb-[16px]">
                      <button
                        className="flex items-center justify-center pr-[12px] pl-[12px] border border-onclick-btnblue rounded-[5px] bg-white text-onclick-btnblue font-inter text-xs font-medium py-2 hover:border-onclick-btnblue hover:text-onclick-btnblue sm:block hidden"
                        onClick={(event) => handleStateTag(event)}
                      >
                        {item.department.state}
                      </button>

                      {item.beneficiaries.length > 0 &&
                        item.beneficiaries[0].beneficiary_type !== "N/A" &&
                        item.beneficiaries[0].beneficiary_type !== "" && (
                          <button
                            className="relative flex items-center justify-center pr-[12px] pl-[12px] py-[5px] border  border-onclick-btnblue rounded-[5px] bg-white text-onclick-btnblue font-inter text-xs font-medium pl-8px hover:border-onclick-btnblue hover:text-onclick-btnblue sm:block hidden"
                            onClick={(event) => handleBeneficiaryTag(event)}
                          >
                            {/* overflow-hidden text-ellipsis whitespace-nowrap max-w-[400px] */}
                            {item.beneficiaries[0].beneficiary_type}
                          </button>
                        )}
                    </div>
                  </div>
                </div>
                <ToolTips tooltip="Save scheme">
                  <div
                    className="cursor-pointer px-2 py-2 right-[8.25px]"
                    onClick={(e) => toggleBookmark(e, item.id)}
                  >
                    {isBookmarked[item.id] ? (
                      <GoBookmarkFill className="sm:w-[27.5px] sm:h-[27.5px] h-[20px] w-[20px] text-[#3431BB]" />
                    ) : (
                      <CiBookmark className="sm:w-[27.5px] sm:h-[27.5px] h-[20px] w-[20px]" />
                    )}
                  </div>
                </ToolTips>
              </div>
            )
        )}

        {/* for pagination */}
        {totalPages !== 0 && (
          <Paginator
            first={(currentPage - 1) * 10}
            rows={rows}
            totalRecords={totalPages * rows}
            onPageChange={(e) => {
              // setFirst(e.first);
              setCurrentPage(e.page + 1);
            }}
            template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            className="custom-paginator gap-8 hover:cursor-pointer
          [&_.p-paginator-page.p-highlight]:bg-[#3431BB] 
          [&_.p-paginator-page.p-highlight]:text-white 
          [&_.p-paginator-page]:transition-colors 
          [&_.p-paginator-page]:duration-200
          [&_.p-paginator-page]:mx-1 
          [&_.p-paginator-page]:px-3 
          [&_.p-paginator-page]:py-1 
          [&_.p-paginator-page]:rounded-full mt-20 mb-20"
          />
        )}
        {isToastVisible && (
          <Toast
            message={toastMessage}
            onClose={() => setIsToastVisible(false)}
          />
        )}

        {isUnSaveToastVisible && (
          <UnSaveToast
            message={toastMessage}
            onClose={() => setIsUnSaveToastVisible(false)}
          />
        )}

        {isModalOpen && selectedScheme && (
          <ApplyModal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              setSidePannelSelected(null);
            }}
            scheme={selectedScheme}
          />
        )}
        {isSavedModalOpen && (
          <SavedModal
            isOpen={isSavedModalOpen}
            onRequestClose={() => setIsSavedModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}
