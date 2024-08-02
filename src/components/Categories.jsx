import { useAuth } from "@/Context/AuthContext";
import SavedModal from "@/pages/model/savedModal";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
import ApplyModal from "../pages/content";
import Toast from "./SavedToast.jsx";
import UnSaveToast from "./UnsaveToast";
import PageContext from "@/Context/PageContext";
import { useContext } from "react";
import FilterContext from "@/Context/FilterContext";
import { useTabContext } from "@/Context/TabContext";
export default function Categories({ffff, dataFromApi}) {
  const { activeTab, setActiveTab} = useTabContext(); // Accessing context
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setBookmarks] = useState({});
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { authState } = useAuth();
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isUnSaveToastVisible, setIsUnSaveToastVisible] = useState(false);
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const {states,setStates,beneficiaries, setBeneficiaries, statesFromApi, setStatesFromApi } = useContext(FilterContext);
  
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
useEffect(()=>{
  if(isUnSaveToastVisible){
    const timer = setTimeout(() => {
      setIsUnSaveToastVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }
}), [isUnSaveToastVisible]


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
            `http://65.0.103.91:80/api/user/saved_schemes/`,
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
      const response = await fetch(`http://65.0.103.91:80/api/save_scheme/`, requestOptions);
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
        `http://65.0.103.91:80/api/unsave_scheme/`,
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
          [itemId]: !prevState[itemId], // Toggle the bookmark status for itemId
        }));
        
      }
    } else {
      setIsSavedModalOpen(true); // Show saved modal if user is not logged in
    }
  };

  const handlePageChangeForward = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePageChangeBackward = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (Object.keys(dataFromApi).length == 0) {
    return (
      <div className="text-onclick-btnblue mt-[120px] italic flex justify-center items-center text-[18px]">
        Loading...
      </div>
    );
  }
  // if (dataFromApi.results.length == 0) {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-[8px] mt-[120px]">
  //       <p className="text-button-text text-[14px] text-button-blue">Sorry no result is found based on your preference.</p>
  //     </div>
  //   );
  // }

  const handleStateTag = (event) => {
    event.stopPropagation();
  }

  const handleBeneficiaryTag = (event) => {
    event.stopPropagation();
    // var arr = props.selectedBeneficiaries;
    // if(arr.includes(event.target.innerText)) return;
    // arr.push(event.target.innerText);
    // props.setSelectedBeneficiaries(arr);
    // props.setTest1((prev) => prev + 1);
  }

  return (
    <>
    {/* We have found {378} schemes based on your profile */}
    <div>
      {(activeTab != "Saved" ? dataFromApi.results : dataFromApi).map((item) => (
        
        <div
          className="flex items-start justify-between self-stretch relative border-[1px] border-category-border rounded-[12px] mb-2 py-[16px] px-[16px] my-6 hover:bg-violet-100 gap-[20px]"
          key={item.id}
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
                className="font-inter text-[18px] leading-[21.6px] cursor-pointer font-bold mb-[10px] line-clamp-2 w-8/12"
              
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
              <p className="font-inter text-[14px] opacity-60 leading-[21.6px] mb-[26px] line-clamp-2 text-decoration-line: underline ">
                {item.department.department_name}
              </p>
              <div className="flex gap-5 mb-[16px]">
                <button className="flex items-center justify-center pr-[12px] pl-[12px] border border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium py-2 hover:border-onclick-btnblue hover:text-onclick-btnblue" onClick = {(event) => handleStateTag(event)}>
                  {item.department.state}
                </button>
                {item.beneficiaries.length > 0 &&
                  item.beneficiaries[0].beneficiary_type !== "N/A" && (
                    <button className="flex items-center justify-center pr-[12px] pl-[12px] py-[5px] border  border-gray-400 rounded-full bg-white text-gray-600 font-inter text-xs font-medium pl-8px hover:border-onclick-btnblue hover:text-onclick-btnblue" onClick = {(event) => handleBeneficiaryTag(event)}>
                      {item.beneficiaries[0].beneficiary_type}
                    </button>
                  )}
              </div>
              
              {item.valid_upto &&(
              <p
                className="font-inter text-[12px] text-apply-date leading-[24px] mt-4"
                role="button"
                tabIndex="0"
              >
                Last date to apply:{" "}
                <span className="font-bold">
                  {item.valid_upto.split("T")[0]}
                </span>
              </p>
              )}
            </div>
          </div>
          <div
            className="cursor-pointer px-2 py-2 right-[8.25px]"
            onClick={(e) => toggleBookmark(e, item.id)}
          >
            {isBookmarked[item.id] ? (
              <GoBookmarkFill className="w-[27.5px] h-[27.5px]" />
            ) : (
              <CiBookmark className="w-[27.5px] h-[27.5px]" />
            )}
          </div>
        </div>
      ))}


{/* <ReactPaginate
  previousLabel={
    <span className=" py-1 px-3 "><FaAngleLeft /></span>
  }
  nextLabel={
    <span className="py-1 px-3 "><FaAngleRight /></span>
  }
  breakLabel={"..."}
  breakClassName={"break-me"}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageChange}
  containerClassName={"flex justify-center items-center space-x-[20px]"}
  activeClassName={"flex justify-center items-center w-8  rounded-full bg-[#3431BB] text-white shadow-md pr-[2px] pl-[2px] pt-[4px] pb-[4px]"}
  pageClassName={"flex items-center"}
  pageLinkClassName={""}
/> */}
{/* for pagination */}
<div className="mt-[20px] flex justify-center items-center">
          <button
            onClick={handlePageChangeBackward}
            disabled={currentPage === 1} // Disable when on the first page
            className="mr-2"
          >
            <FaAngleLeft />
          </button>
          <span>{currentPage}</span>
          <button onClick={handlePageChangeForward} className="ml-2">
            <FaAngleRight />
          </button>
        </div>
{isToastVisible && (
        <Toast message={toastMessage} onClose={() => setIsToastVisible(false)} />
      )}

    {isUnSaveToastVisible && (
        <UnSaveToast message={toastMessage} onClose={() => setIsUnSaveToastVisible(false)} />
    )}

      {isModalOpen && selectedScheme && (
        <ApplyModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
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
