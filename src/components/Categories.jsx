import { useAuth } from "@/Context/AuthContext";
import SavedModal from "@/components/Modals/savedModal.js";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
import ApplyModal from "@/components/Modals/ApplySchemesModal.js";
import Toast from "./ComponentsUtils/SavedToast.jsx";
import UnSaveToast from "./ComponentsUtils/UnsaveToast";
import PageContext from "@/Context/PageContext";
import { useContext } from "react";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";
import { Paginator } from "primereact/paginator";
import ToolTips from "./ComponentsUtils/tooltips.jsx";
import Footer from "./Footer.jsx";
import { useBookmarkContext } from "@/Context/BookmarkContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router.js";
import { FaShareAlt } from "react-icons/fa";
import { data } from "autoprefixer";
import HowToApply from "./Modals/HowToApply.js";

export default function Categories({ ffff, dataFromApi, totalPages }) {
  const router = useRouter();
  const { activeTab, setActiveTab } = useTabContext(); // Accessing context
  const { isBookmarked, toggleBookmark, setIsBookmarked } =
    useBookmarkContext();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const { scheme_id, tab } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
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
          setIsBookmarked(bookmarks);
        } catch (error) {
          console.error("Failed to fetch saved schemes:", error);
        }
      }
    };
    fetchSavedSchemes();
  }, [authState.token]);

  useEffect(() => {
    console.log("dataFronApi", dataFromApi);
    const scheme = dataFromApi.results?.find(
      (item) => item.id === parseInt(scheme_id)
    );
    if (scheme) {
      setSelectedScheme(scheme);
      setIsModalOpen(true);
    }
  }, [scheme_id, dataFromApi?.results]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const schemeId = queryParams.get("scheme_id");
    const modalOpen = queryParams.get("modal_open");

    if (modalOpen === "true" && schemeId) {
      setIsModalOpen(true);
      setSelectedScheme(schemeId);
    }
  }, []);

  const logUserEvent = async (eventType, schemeId = null, details = {}) => {
    const eventBody = {
      event_type: eventType,
      ...(schemeId && { scheme_id: schemeId }),
      details: details,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events/log/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify(eventBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log event");
      }

      const data = await response.json();
      console.log("Event logged successfully:", data);
    } catch (error) {
      console.error("Error logging event:", error);
    }
  };
  const handleClick = (scheme_id) => {
    const scheme = dataFromApi.results.find((item) => item.id === scheme_id);
    if (scheme) {
      const startTime = Date.now();

      // Log the event only once when the scheme is first viewed
      logUserEvent("view", scheme_id, { watch_time: "0 seconds" });

      router.push(
        `/AllSchemes?tab=${activeTab}&scheme_id=${scheme_id}`,
        undefined,
        {
          shallow: true,
        }
      );

      viewscheme(scheme_id);
      setSelectedScheme(scheme);
      setIsModalOpen(true);
      setSidePannelSelected(scheme_id);

      // Track time when modal closes
      const stopTracking = () => {
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        logUserEvent("view", scheme_id, { watch_time: totalTime + " seconds" });
      };

      // Listen for modal close event
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("modal-close")) {
          stopTracking();
        }
      });
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
        logUserEvent("save", scheme_id);

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
  // save scheme for recommendation model
  const save = async (scheme_id) => {
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schemes/{scheme_id}/save/`,
        requestOptions
      );
      const result = await response.json();
      // console.log("Unsave response:", result); // Log the response
      if (response.ok) {
        console.log("Scheme saved successfully!");
      } else {
        console.error("Failed to save scheme");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // view scheme for recommendation model

  const viewscheme = async (scheme_id) => {
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schemes/${scheme_id}/view/`,
        requestOptions
      );
      const result = await response.json();
      // console.log("Unsave response:", result); // Log the response
      if (response.ok) {
        console.log("Scheme viewed successfully!");
      } else {
        console.error("Failed to view scheme");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleShare = () => {
    const schemeUrl = window.location.href;
    navigator.clipboard
      .writeText(schemeUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  const openModal = (schemeId) => {
    setIsModalOpen(true);
    setSelectedScheme(schemeId);
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?tab=${activeTab}&scheme_id=${schemeId}&modal_open=true`;
    router.push(newUrl, undefined, { shallow: true });
  };

  const handleBookmarkToggle = async (e, itemId) => {
    e.preventDefault();
    if (authState.token) {
      try {
        const success = isBookmarked[itemId]
          ? await unsaveScheme(itemId)
          : await saveScheme(itemId);

        if (success) {
          toggleBookmark(itemId, isBookmarked[itemId]);
          setToastMessage(isBookmarked[itemId] ? "" : "");
          setIsToastVisible(true);
          save(itemId);
        }
      } catch (error) {
        console.error("Bookmark toggle failed:", error);
      }
    } else {
      setIsSavedModalOpen(true);
    }
  };
  // console.log(dataFromApi);

  if (Object.keys(dataFromApi).length === 0) {
    return (
      <div className="text-onclick-btnblue mt-[8rem] italic flex justify-center items-center text-[18px]">
        Loading...
      </div>
    );
  }

  const handleStateTag = (event) => {
    event.stopPropagation();
    var state = event.target.innerText;
    if (states[1] && states[1].includes(state)) return;
    var stateId = 0;
    for (let i = 0; i < statesFromApi.length; i++) {
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

  return (
    <>
      {/* We have found {378} schemes based on your profile */}

      <div className="overflow-y-auto overflow-hidden max-h-screen">
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
                  <div className="gap-[12px] pt-[16px] pd-[16px] w-[200px] md:w-full">
                    <p
                      className="font-inter text-[16px] sm:text-[18px] leading-[21.6px] cursor-pointer font-semibold mb-[10px] line-clamp-2 text-gray-700"
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
                      {item.description && (
                        <span className="font-semibold">Description: </span>
                      )}
                      {item.description && item.description}

                      {item.pdf_url && (
                        <>
                          {item.description && <br />}{" "}
                          {/* Line break if both exist */}
                          <span className="font-semibold">Preview PDF: </span>
                          <a
                            href={item.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3431Bb] font-bold"
                          >
                            Click here for preview
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="px-2"
                            />
                          </a>
                        </>
                      )}
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
                    onClick={(e) => handleBookmarkToggle(e, item.id)}
                  >
                    {isBookmarked[item.id] ? (
                      <GoBookmarkFill className="sm:w-[27.5px] sm:h-[27.5px] h-[20px] w-[20px] text-[#3431BB]" />
                    ) : (
                      <CiBookmark className="sm:w-[27.5px] sm:h-[27.5px] h-[20px] w-[20px] " />
                    )}
                  </div>
                </ToolTips>
              </div>
            )
        )}

        {/* for pagination */}

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
              router.push(
                `/AllSchemes?${activeTab}?tab=${activeTab}`,
                undefined,
                {
                  shallow: true,
                }
              );
            }}
            scheme={selectedScheme}
            activeTab={activeTab}
          />
        )}
        {isSavedModalOpen && (
          <SavedModal
            isOpen={isSavedModalOpen}
            onRequestClose={() => setIsSavedModalOpen(false)}
            heading={"Saved"}
            tag={"save"}
          />
        )}
      </div>
      {/* For pagination (Page numbers for larger screens) */}
      {totalPages !== 0 && (
        <Paginator
          first={(currentPage - 1) * 10}
          rows={rows}
          totalRecords={totalPages * rows}
          onPageChange={(e) => setCurrentPage(e.page + 1)}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="custom-paginator hidden md:flex justify-center gap-4 px-4 py-2 mt-10 mb-10
    [&_.p-paginator-page.p-highlight]:bg-[#3431BB] 
    [&_.p-paginator-page.p-highlight]:text-white 
    [&_.p-paginator-page]:transition-colors 
    [&_.p-paginator-page]:duration-200
    [&_.p-paginator-page]:mx-2
    [&_.p-paginator-page]:px-3
    [&_.p-paginator-page]:py-1
    [&_.p-paginator-page]:rounded-full
    [&_.p-paginator-first]:mr-2
    [&_.p-paginator-prev]:ml-2 
    [&_.p-paginator-next]:mr-2
    [&_.p-paginator-last]:ml-2"
        />
      )}

      {/* For mobile view (Only Prev/Next buttons) */}
      {totalPages !== 0 && (
        <Paginator
          first={(currentPage - 1) * 10}
          rows={rows}
          totalRecords={totalPages * rows}
          onPageChange={(e) => {
            setCurrentPage(e.page + 1);
          }}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="custom-paginator gap-1 hover:cursor-pointer 
      [&_.p-paginator-page.p-highlight]:bg-[#3431BB] 
      [&_.p-paginator-page.p-highlight]:text-white 
      [&_.p-paginator-page]:transition-colors 
      [&_.p-paginator-page]:duration-200
      [&_.p-paginator-page]:mx-1 
      [&_.p-paginator-page]:px-3
      [&_.p-paginator-page]:py-1 
      [&_.p-paginator-next]:mr-3 
      [&_.p-paginator-last]:pl-1 
      [&_.p-paginator-first]:mr-2
      [&_.p-paginator-prev]:pl-1 
      [&_.p-paginator-page]:rounded-full mt-20 mb-20
      lg:hidden md:hidden "
        />
      )}
    </>
  );
}
