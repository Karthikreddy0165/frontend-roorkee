import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import HowToApply from './HowToApply';  
import { useAuth } from "@/Context/AuthContext";
import { useBookmarkContext } from "@/Context/BookmarkContext";
import { useScheme } from "@/Context/schemeContext";
import SavedModal from "@/components/Modals/savedModal"
import Toast from "@/components/ComponentsUtils/SavedToast";
import UnSaveToast from "@/components/ComponentsUtils/UnsaveToast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiShare2 } from "react-icons/ci";
import ShareModal from "../ShareModal";
import RelatedSchemesModal from "../RelatedSchemesModal";


const ApplyModal = ({
  isOpen,
  onRequestClose,
  scheme,
  tag,
  activeTab
}) => {
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [reportFormData, setReportFormData] = useState({
    scheme_id: "",
    description: "",
    report_category: "",
  });
  const { isBookmarked, toggleBookmark } = useBookmarkContext();
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter()
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const descriptionRef = useRef(null);
  const [isHowToApplyOpen, setIsHowToApplyOpen] = useState(false); 
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [schemeUrl, setSchemeUrl] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isUnSaveToastVisible, setIsUnSaveToastVisible] = useState(false);
  const {authState} = useAuth()
  const { saveScheme } = useScheme();
  const { unsaveScheme } = useScheme();

  useEffect(() => {
    // Reset error state when scheme changes
    setIsError(false);
    if (!scheme.scheme_link) return;

    const checkLinkStatus = async () => {
        try {
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proxy/?url=${scheme.scheme_link}`);
            // console.log(response, "I am the res")
            if (response.status === 500 || response.status === 404 || !response.ok) {
                setIsError(true);
            }
        } catch (error) {
          console.error(error, "I am the err")
            setIsError(true);
        }
    };

    checkLinkStatus();
}, [scheme]);
  const handleSave = async (scheme_id, authState) => {
    const success = isBookmarked[scheme_id]
          ? await unsaveScheme(scheme_id, authState)
          : await saveScheme(scheme_id, authState);
    if (success && !isBookmarked[scheme_id]) {
      toggleBookmark(scheme_id, isBookmarked[scheme_id])
      setIsToastVisible(true)
      logUserEvent("save", scheme_id)
      setIsSaved(true)
    }else if (success && isBookmarked[scheme_id]){
      toggleBookmark(scheme_id, isBookmarked[scheme_id])
      setIsUnSaveToastVisible(true)
      setIsSaved(false)
    } else {
      setIsSavedModalOpen(true)
      console.error("Failed to save scheme");
    }
  };

  const logUserEvent = async (eventType, schemeId = null, details = {}) => {
    const eventBody = {
      event_type: eventType,
      ...(schemeId && { scheme: schemeId }),
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
      // console.log("Event logged successfully:", data);
    } catch (error) {
      console.error("Error logging event:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (scheme && scheme.id) {
        try {
          const [criteriaRes, documentsRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schemes/${scheme.id}/criteria/`),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schemes/${scheme.id}/documents/`),
          ]);

          if (!criteriaRes.ok) {
            throw new Error(`Error fetching criteria: ${criteriaRes.statusText}`);
          }
          if (!documentsRes.ok) {
            throw new Error(`Error fetching documents: ${documentsRes.statusText}`);
          }

          const [criteriaData, documentsData] = await Promise.all([
            criteriaRes.json(),
            
            documentsRes.json(),
          ]);

          setCriteria(criteriaData);
          // Documents state has been removed as it's unused
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load data. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Invalid scheme data");
      }
    };
    
    fetchData();
    
  }, [scheme]);



  useEffect(() => {
    if (isBookmarked[scheme?.id]) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, scheme?.id, isBookmarked]);


  useEffect(() => {
    if (descriptionRef.current) {
      const isLong = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsDescriptionLong(isLong);
    }
  }, [scheme?.description]);

  const handleReportFormChange = (e) => {

    const { name, value } = e.target;
    setReportFormData((prevData) => ({
      ...prevData,
      scheme_id: scheme.id,
      [name]: value,
    }));
  };

  



const handleReportSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedback/scheme-reports/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify(reportFormData),
    });
    if (!response.ok) {
      throw new Error(`Error creating report: ${response.statusText}`);
    }

    // Success toast notification
    toast.success("Scheme successfully reported!", { position: "top-right", autoClose: 3000 });

    // Reset form and close modal
    setReportFormData({ description: "", report_category: "" });
    setReportModalOpen(false);
  } catch (error) {
    console.error("Error submitting report:", error);

    // Error toast notification
    toast.error("Failed to create report. Please try again later.", { position: "top-right", autoClose: 3000 });
  }
};



  const handleHowToApply = () => {
    setIsHowToApplyOpen(true); 
  };

  const handleCloseHowToApply = () => {
    setIsHowToApplyOpen(false); 
  };

  const handleShare = async (schemeId) => {
    setIsShareModalOpen(true)
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?tab=${activeTab}&scheme_id=${schemeId}&modal_open=${isOpen}`;
    setSchemeUrl(shareUrl)
  
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await NavigationHistoryEntry.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        fallbackCopy(shareUrl);
      }
    } else {
      fallbackCopy(shareUrl);
    }
  };
  
  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("Link copied to clipboard!");
  };
  

  if (!isOpen) return null;

  function SchemeTag({ tag }) {
    if (!tag) return null;
  
    const tagStyle = {
      archived: 'bg-gray-100 text-gray-700 border-gray-300',
      expiring: 'bg-red-100 text-red-700 border-red-300',   
    };
  
    return (
      <span
        className={`ml-4 inline-block px-2 py-1 text-xs font-semibold border rounded-full ${tagStyle[tag.type]}`}
      >
        {tag.label}
      </span>
    );
  }


  

  return (


    <div
    className={`fixed inset-0 z-50 gap-[10px] ${isHowToApplyOpen || isReportModalOpen || isSavedModalOpen || isApplyModalOpen ? '' : 'pointer-events-none'}`}
  >
<div
  className={`absolute h-full sm:h-screen bg-white transition-all w-full sm:w-[100%] md:w-[72.5%] lg:w-[48%] xl:w-[42.5%] right-0 top-0 p-4 sm:p-6 rounded-lg border gap-[10px] border-gray-200 shadow-lg z-50 pointer-events-auto`}

  style={{
    right: "0",
  }}
>
        <button
          className="absolute right-4 sm:p-[20px] text-lg hover:text-red-500"
          onClick={onRequestClose}
        >
          <IoMdClose className="w-[24px] h-[24px]" />
        </button>

        <div className="modal-content overflow-y-auto mt-[10px] max-h-[90vh] sm:p-8 h-full">
          
          <div className="flex flex-col items-start w-full py-[20px] overflow-hidden">
  {/* Title and Report Button */}
  <div className="flex items-center justify-between w-full flex-wrap ">
    <h1 className="text-[18px] sm:text-[20px] font-bold mb-2 w-full sm:w-auto ">{scheme.title}<SchemeTag tag={tag} /></h1>
  </div>

  {/* Date and Report Button aligned */}

  <div className="flex items-center justify-between w-full mt-2">

{/* Date */}
{scheme?.created_at?.split(" ")[0] && (
  <p className="text-[11px] sm:text-[14px] rounded-[12px] py-1 px-[6px] bg-[#EEF] mr-4 whitespace-nowrap">
    {`Last updated on ${scheme.created_at.split(" ")[0]}`}
  </p>
)}


{/* Report Button */}
<button
  onClick={() => authState.token ? setReportModalOpen(true) : setIsReportModalOpen(true)}
  className="flex items-center px-4 py-2 text-red-500 rounded-lg mt-0"
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.29333 5.06878C1.45958 3.01956 3.23942 1.66667 5.16536 1.66667H14.835C16.7609 1.66667 18.5408 3.01956 18.707 5.06878C18.8298 6.5824 18.835 8.56439 18.2938 10.2542C17.8082 11.7704 16.7768 13.2271 15.6693 14.4731C14.5524 15.7296 13.3061 16.8288 12.3211 17.6271C10.9584 18.7315 9.04192 18.7315 7.6792 17.6271C6.69419 16.8288 5.44795 15.7296 4.33102 14.4731C3.22349 13.2271 2.19215 11.7704 1.70654 10.2542C1.16532 8.56439 1.17054 6.5824 1.29333 5.06878ZM5.16536 3.33334C3.97458 3.33334 3.04031 4.14627 2.95454 5.20355C2.83725 6.64935 2.85308 8.36985 3.29379 9.74582C3.67591 10.9389 4.53168 12.1902 5.5767 13.3658C6.61231 14.5309 7.78406 15.5668 8.72856 16.3323C9.47954 16.9409 10.5208 16.9409 11.2718 16.3323C12.2163 15.5668 13.388 14.5309 14.4236 13.3658C15.4687 12.1902 16.3244 10.9389 16.7065 9.74582C17.1472 8.36985 17.1631 6.64935 17.0458 5.20355C16.96 4.14627 16.0257 3.33334 14.835 3.33334H5.16536ZM10.0002 5.83334C10.4604 5.83334 10.8335 6.20643 10.8335 6.66667V10C10.8335 10.4602 10.4604 10.8333 10.0002 10.8333C9.53993 10.8333 9.16683 10.4602 9.16683 10V6.66667C9.16683 6.20643 9.53993 5.83334 10.0002 5.83334Z" fill="#FF0000"/>
    <path d="M10.8337 13.3333C10.8337 13.7936 10.4606 14.1667 10.0003 14.1667C9.54009 14.1667 9.16699 13.7936 9.16699 13.3333C9.16699 12.8731 9.54009 12.5 10.0003 12.5C10.4606 12.5 10.8337 12.8731 10.8337 13.3333Z" fill="#FF0000"/>
  </svg>
  Report
</button>
</div>

</div>





          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
             

              {scheme.department?.state && (
                <div className="flex items-start sm:py-[2rem] py-[1rem] border-b-[1px] mt-4">
                  <h2 className="w-28 text-[14px]  font-semibold">State:</h2>
                  <p className="flex-1 text-[16px]">{scheme.department.state}</p>
                </div>
              )}

        

              {scheme.department?.department_name && (
                <div className="flex items-start sm:py-[2rem] py-[1rem] border-t-[1px] border-b-[1px]">
                  <h2 className="w-28 text-[14px] font-semibold">Department:</h2>
                  <p className="flex-1 text-[16px]">{scheme.department.department_name}</p>
                </div>
              )}

              {scheme.beneficiaries?.beneficiary_type && (
                <div className="flex items-start sm:py-[2rem] py-[1rem]  border-b-[1px]">
                  <h2 className="w-28 text-[14px] font-semibold">Beneficiaries:</h2>
                  <p className="flex-1 text-[16px]">{scheme.beneficiaries[0].beneficiary_type}</p>
                </div>
              )}

{scheme.criteria?.state && (
                <div className="flex items-start sm:py-[2rem] py-[1rem] border-b-[1px] mt-4">
                  <h2 className="w-28 text-[14px]  font-semibold">Eligibility:
</h2>
                  <p className="flex-1">{scheme.department.criteria}</p>
                </div>
              )}

{scheme.description && (
                <div className="border-b-[1px] sm:py-[2rem] py-[1rem]">
                  <h2 className="text-[14px] font-semibold mb-[10px]">Description:</h2>
                  <p
                    ref={descriptionRef}
                    className={`${readMore || !isDescriptionLong ? "" : "line-clamp-3"} overflow-y-auto`}
                  >
                    {scheme.description}
                  </p>
                  {isDescriptionLong && (
                    <button
                      onClick={() => setReadMore(!readMore)}
                      className="mt-2 text-[#3431Bb] text-sm"
                    >
                      {readMore ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              )}

             

              {/* Updated "Uploaded File" Section */}
              {scheme.pdf_url && (
                <div className="flex items-start sm:py-[2rem] py-[1rem] border-b-[1px]">
                  <h2 className="w-28 text-[14px] font-semibold">Uploaded File:</h2>
                  <div className="flex-1">
                    <a
                      href={scheme.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
                    >
                      Click here for preview
                    </a>
                      {scheme.pdf_url && scheme.pdf_url.startsWith('https://launchpad-pdf-files') ? (
                        <div className="flex justify-start mt-4">
                          <button
                            onClick={() => window.open(scheme.pdf_url, "_blank")}
                            className="bg-[#3431Bb] text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 text-xs sm:text-sm"
                          >
                            Click here for preview
                          </button>
                        </div>
                      ) : null}
                  </div>
                </div>
              )}
 
              {scheme.scheme_link ? (
 <>
 {/* Top Action Row */}
 <div className="mt-8 flex flex-row items-center justify-between gap-3 sm:gap-8">
   
   {/* Save/Unsave */}
   <div
     className="text-[#3431BB] font-semibold cursor-pointer"
     onClick={() => handleSave(scheme.id, authState)}
   >
     {isSaved ? "Unsave Scheme" : "Save for Later"}
   </div>

   {/* Toasts */}
   {isToastVisible && (
     <Toast message={""} onClose={() => setIsToastVisible(false)} />
   )}
   {isUnSaveToastVisible && (
     <UnSaveToast message={""} onClose={() => setIsUnSaveToastVisible(false)} />
   )}

   {/* Buttons */}
   <div className="flex flex-wrap items-center gap-2 sm:gap-4">
     
     {/* Share Button */}
     <button
       onClick={() => handleShare(scheme.id)}
       className="flex items-center px-4 py-2 rounded-lg border border-[#3431BB] text-[#3431BB] text-xs sm:text-sm hover:bg-[#f0f3ff] transition"
     >
       Share <CiShare2 className="ml-2 h-4 w-4" />
     </button>

     <ShareModal
       url={schemeUrl}
       title=""
       isOpen={isShareModalOpen}
       onClose={() => setIsShareModalOpen(false)}
     />

     {/* Apply Button */}
     <a
  href={isError ? "#" : scheme.scheme_link}
  target="_blank"
  rel="noopener noreferrer"
  className={`px-4 py-2 rounded-lg text-white text-xs sm:text-sm transition 
    ${isError
      ? "bg-gray-400 cursor-not-allowed opacity-50"
      : "bg-[#3431BB] hover:bg-blue-700"}`}
  onClick={(e) => {
    if (!authState.token) {
      e.preventDefault(); // Prevent navigation if not logged in
      setIsApplyModalOpen(true);
      return;
    }

    if (isError) {
      e.preventDefault(); // Prevent navigation on error
    } else {
      logUserEvent("apply", scheme.id);
    }
  }}
>
  Apply
</a>

   </div>
 </div>

 {/* Error Message - Prevent Layout Shift */}
 <p className="flex justify-end text-red-500 text-xs mt-1 min-h-[16px]">
   {isError ? "Scheme Temporarily Unavailable" : ""}
 </p>

 {/* PDF Viewer */}
 {scheme.pdf_url && (
   <div className="mt-8">
     <div className="flex justify-center">
       <embed
         src={scheme.pdf_url}
         width="100%"
         height="500px"
         type="application/pdf"
         className="rounded-lg max-w-full"
       />
     </div>
   </div>
 )}
</>

              ) : null}
            </>
          )}

           {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-60 bg-gray-700 bg-opacity-50 flex justify-center items-center">
       
  

        <div className="relative bg-white rounded-lg w-[80%] sm:w-[60%] lg:w-[40%]">
        <div className="h-20 lg:p-3 p-2 text-black flex items-center justify-between shadow-md">
                  {/* Left Section: Logo & Launchpad */}
                  <div className="flex items-center ">
                    <div className="sm:text-[16px] mt-2 font-semibold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer flex items-center  gap-2 ">
                    <svg
            width="200" // Adjusted to a more reasonable size
            height="70" // Adjusted to maintain aspect ratio
            viewBox="0 0 1528 681" // Keep original viewBox to maintain proportions
            fill="none"
          >
            <rect x="1" width="1527" height="581" fill="white" />
            <path
              d="M1354.95 384.112C1354.95 480.159 508.998 539.5 665.259 539.5C821.52 539.5 1473.5 519.159 1473.5 423.112C1473.5 327.065 1024.26 183 868 183C711.739 183 1354.95 288.065 1354.95 384.112Z"
              fill="#008000"
            />
            <path
              d="M845.623 438V434.16H857.783V345.328H845.623V341.488H890.551V345.328H878.007V386.288H914.231V345.328H901.687V341.488H946.871V345.328H934.455V434.16H946.871V438H901.687V434.16H914.231V390.128H878.007V434.16H890.551V438H845.623ZM977.229 439.664C972.023 439.664 967.842 438.299 964.685 435.568C961.613 432.752 960.077 429.381 960.077 425.456V382.32H977.741V423.792C977.741 427.291 978.21 429.765 979.149 431.216C980.173 432.667 981.709 433.392 983.757 433.392C986.658 433.392 989.175 432.325 991.309 430.192C993.442 427.973 995.106 424.987 996.301 421.232C997.581 417.477 998.221 413.296 998.221 408.688L1000.78 427.888H997.709C996.173 431.387 993.485 434.245 989.645 436.464C985.89 438.597 981.751 439.664 977.229 439.664ZM998.221 438V434.16H1026V438H998.221ZM950.093 384.24V380.4H977.741V384.24H950.093ZM998.221 436.08V382.32H1015.88V436.08H998.221ZM987.725 384.24V380.4H1015.88V384.24H987.725ZM1075.44 439.536C1071.52 439.536 1078.06 438.683 1065.07 436.976C1062.09 435.269 1059.87 433.136 1058.42 430.576H1055.34L1057.9 411.12C1057.9 419.141 1059.31 425.072 1062.13 428.912C1064.94 432.667 1068.44 434.544 1072.62 434.544C1074.84 434.544 1076.68 433.904 1078.13 432.624C1079.58 431.259 1080.65 428.784 1081.33 425.2C1082.01 421.531 1082.35 416.283 1082.35 409.456C1082.35 402.459 1081.97 397.125 1081.2 393.456C1080.52 389.787 1079.45 387.269 1078 385.904C1076.55 384.539 1074.72 383.856 1072.5 383.856C1068.32 383.856 1064.82 385.776 1062 389.616C1059.27 393.456 1057.9 399.344 1057.9 407.28L1055.34 387.824H1058.42C1059.87 385.264 1062.09 383.131 1065.07 381.424C1068.14 379.717 1071.64 378.864 1075.57 378.864C1080.26 378.864 1084.61 380.144 1088.62 382.704C1092.72 385.179 1096.01 388.72 1098.48 393.328C1100.96 397.851 1102.19 403.141 1102.19 409.2C1102.19 415.259 1100.91 420.592 1098.35 425.2C1095.88 429.723 1092.59 433.264 1088.5 435.824C1084.49 438.299 1080.13 439.536 1075.44 439.536ZM1029.87 438V434.16H1057.9V438H1029.87ZM1040.24 436.08V343.536H1057.9V436.08H1040.24ZM1029.87 345.328V341.488H1057.9V345.328H1029.87Z"
              fill="#3333DD"
            />
            <path
              d="M119.046 282.612C119.046 378.659 965.002 438 808.741 438C652.48 438 0.5 417.659 0.5 321.612C0.5 225.565 449.739 81.5 606 81.5C762.261 81.5 119.046 186.565 119.046 282.612Z"
              fill="#FFA500"
            />
            <path
              d="M483.498 320V316.16H537.642C542.42 316.16 546.474 314.88 549.802 312.32C553.13 309.76 555.69 306.389 557.482 302.208C559.359 298.027 560.34 293.504 560.426 288.64H565.546V320H483.498ZM495.658 318.08V223.488H515.882V318.08H495.658ZM538.794 292.352C538.708 288.256 537.898 284.885 536.362 282.24C534.826 279.595 532.351 277.632 528.938 276.352C525.524 275.072 521.002 274.432 515.37 274.432V270.592C521.002 270.592 525.524 269.995 528.938 268.8C532.351 267.605 534.826 265.771 536.362 263.296C537.898 260.821 538.708 257.707 538.794 253.952H543.914V292.352H538.794ZM558.506 249.088C558.42 245.163 557.524 241.579 555.818 238.336C554.196 235.008 551.85 232.363 548.778 230.4C545.706 228.352 541.994 227.328 537.642 227.328H483.498V223.488H563.626V249.088H558.506ZM658.895 318.08V272.896C658.895 268.629 656.975 266.496 653.135 266.496C650.489 266.496 648.057 267.648 645.839 269.952C643.62 272.256 641.828 275.413 640.463 279.424C639.183 283.349 638.543 287.829 638.543 292.864L635.983 273.024H639.055C640.676 269.269 643.023 266.325 646.095 264.192C649.252 261.973 653.22 260.864 657.999 260.864C663.545 260.864 668.025 262.229 671.439 264.96C674.852 267.605 676.559 270.891 676.559 274.816V318.08H658.895ZM572.623 320V316.16H608.975V320H572.623ZM582.991 318.08V264.448H600.655V318.08H582.991ZM612.303 320V316.16H646.735V320H612.303ZM572.623 266.24V262.4H600.655V266.24H572.623ZM621.007 318.08V272.896C621.007 268.629 619.087 266.496 615.247 266.496C612.601 266.496 610.169 267.648 607.951 269.952C605.732 272.256 603.94 275.413 602.575 279.424C601.295 283.349 600.655 287.829 600.655 292.864L598.095 273.024H601.167C602.788 269.269 605.135 266.325 608.207 264.192C611.364 261.973 615.332 260.864 620.111 260.864C625.657 260.864 630.137 262.229 633.551 264.96C636.964 267.605 638.671 270.891 638.671 274.816V318.08H621.007ZM650.191 320V316.16H684.623V320H650.191ZM733.191 321.536C729.265 321.536 725.809 320.683 722.823 318.976C719.836 317.269 717.617 315.136 716.167 312.576H713.095L715.655 293.12C715.655 301.227 717.063 307.157 719.879 310.912C722.78 314.667 726.321 316.544 730.503 316.544C732.807 316.544 734.641 315.861 736.007 314.496C737.457 313.131 738.481 310.656 739.079 307.072C739.761 303.403 740.103 298.197 740.103 291.456C740.103 284.544 739.761 279.253 739.079 275.584C738.481 271.829 737.457 269.269 736.007 267.904C734.556 266.539 732.679 265.856 730.375 265.856C726.193 265.856 722.695 267.733 719.879 271.488C717.063 275.243 715.655 281.173 715.655 289.28L713.095 269.824H716.167C717.617 267.264 719.836 265.131 722.823 263.424C725.895 261.717 729.393 260.864 733.319 260.864C738.012 260.864 742.364 262.144 746.375 264.704C750.471 267.179 753.756 270.72 756.231 275.328C758.705 279.851 759.943 285.141 759.943 291.2C759.943 297.259 758.663 302.592 756.103 307.2C753.628 311.723 750.343 315.264 746.247 317.824C742.236 320.299 737.884 321.536 733.191 321.536ZM688.519 360.192V356.352H728.455V360.192H688.519ZM697.991 358.272V264.448H715.655V358.272H697.991ZM687.623 266.24V262.4H715.655V266.24H687.623ZM803.944 321.664C799.507 321.664 795.369 320.939 791.529 319.488C787.689 318.037 784.318 315.947 781.417 313.216C778.515 310.485 776.211 307.285 774.505 303.616C772.883 299.861 772.073 295.723 772.073 291.2C772.073 286.763 772.883 282.709 774.505 279.04C776.211 275.285 778.515 272.085 781.417 269.44C784.318 266.709 787.689 264.619 791.529 263.168C795.369 261.632 799.507 260.864 803.944 260.864C808.382 260.864 812.521 261.632 816.361 263.168C820.201 264.619 823.571 266.709 826.473 269.44C829.459 272.085 831.763 275.285 833.385 279.04C835.091 282.709 835.945 286.763 835.945 291.2C835.945 295.723 835.091 299.861 833.385 303.616C831.763 307.285 829.459 310.485 826.473 313.216C823.571 315.947 820.201 318.037 816.361 319.488C812.521 320.939 808.382 321.664 803.944 321.664ZM803.944 317.184C806.931 317.184 809.321 316.501 811.113 315.136C812.905 313.771 814.185 311.253 814.953 307.584C815.721 303.829 816.105 298.411 816.105 291.328C816.105 284.245 815.721 278.827 814.953 275.072C814.185 271.317 812.905 268.757 811.113 267.392C809.321 266.027 806.931 265.344 803.944 265.344C800.958 265.344 798.569 266.027 796.777 267.392C795.07 268.757 793.833 271.317 793.065 275.072C792.297 278.827 791.913 284.245 791.913 291.328C791.913 298.411 792.297 303.829 793.065 307.584C793.833 311.253 795.07 313.771 796.777 315.136C798.569 316.501 800.958 317.184 803.944 317.184ZM865.928 321.664L844.68 266.24H837.767V262.4H872.072V266.24H864.52L874.76 296.064H875.272L887.688 262.4H892.296L906.248 296.064H906.76L916.616 266.24H906.504V262.4H930.568V266.24H921.224L902.024 321.664H898.312L883.72 285.952H883.208L869.64 321.664H865.928ZM964.323 321.664C959.885 321.664 955.704 320.811 951.779 319.104C947.939 317.397 944.525 315.093 941.539 312.192C938.637 309.291 936.376 306.005 934.755 302.336C933.133 298.667 932.323 294.827 932.323 290.816C932.323 285.867 933.603 281.131 936.163 276.608C938.723 272 942.349 268.245 947.043 265.344C951.736 262.357 957.24 260.864 963.555 260.864C968.675 260.864 973.24 261.888 977.251 263.936C981.347 265.984 984.547 268.928 986.851 272.768C989.24 276.523 990.435 281.003 990.435 286.208V287.616H946.019V283.776H972.387V275.968C972.387 268.629 969.315 264.96 963.171 264.96C960.525 264.96 958.392 265.771 956.771 267.392C955.149 269.013 953.955 271.787 953.187 275.712C952.504 279.552 952.163 284.843 952.163 291.584C952.163 298.496 952.547 303.829 953.315 307.584C954.083 311.253 955.405 313.771 957.283 315.136C959.16 316.501 961.72 317.184 964.963 317.184C969.485 317.184 973.581 316.075 977.251 313.856C981.005 311.637 984.12 307.797 986.595 302.336H990.819C989.027 308.224 985.741 312.917 980.963 316.416C976.269 319.915 970.723 321.664 964.323 321.664ZM997.873 320V316.16H1008.24V266.24H997.873V262.4H1025.9V272.256H1026.42C1029.23 267.477 1032.22 264.405 1035.38 263.04C1038.53 261.589 1041.35 260.864 1043.82 260.864C1047.75 260.864 1050.78 261.888 1052.91 263.936C1055.05 265.899 1056.11 268.757 1056.11 272.512C1056.11 276.181 1055.17 278.869 1053.3 280.576C1051.5 282.283 1049.24 283.136 1046.51 283.136C1044.04 283.136 1041.78 282.411 1039.73 280.96C1037.77 279.509 1036.78 277.333 1036.78 274.432C1036.78 272.725 1037.04 271.488 1037.55 270.72C1038.15 269.952 1038.45 269.355 1038.45 268.928C1038.45 268.757 1038.36 268.629 1038.19 268.544C1038.11 268.373 1037.85 268.288 1037.42 268.288C1036.06 268.288 1034.44 269.184 1032.56 270.976C1030.77 272.768 1029.19 275.115 1027.82 278.016C1026.54 280.917 1025.9 284.075 1025.9 287.488V316.16H1034.22V320H997.873Z"
              fill="#3333DD"
            />
            <rect
              x="242"
              y="183"
              width="224"
              height="358"
              fill="url(#pattern0_3080_5131)"
            />
          </svg>
                    </div>
                    <button
    type="button"  
    onClick={() => setReportModalOpen(false)}  
    className="absolute top-5 right-1 flex-shrink-0 px-4 py-2 rounded-lg border border-transparent  text-gray-500 text-[12px] sm:text-sm"
  >
    <IoMdClose className="w-[24px] h-[24px]" />
  </button>
                  </div>
        
                  {/* Center Section: Profile */}
        
                  {/* Right Section: Close Button */}
                </div>

  <h2 className="text-xl font-bold flex items-center justify-center  text-[#3330BA] p-[1rem] text-center">
    Help Us Correct Scheme Information
  </h2>
            <form onSubmit={handleReportSubmit} className="space-y-4 lg:p-[3rem] p-[1rem] ">
            <div className="pt-[1rem] pb-[1rem]">
                <label className="block text-[13px] font-semibold mb-2">Select the category</label>
                <select
                  name="report_category"
                  value={reportFormData.category}
                  onChange={handleReportFormChange}
                  required
                  className="w-full p-2 border text-sm rounded-md text-[#000000]"
                >
                  <option value="">Select Category</option>
                  <option value="incorrect_info">Incorrect information</option>
                  <option value="outdated_info">Outdated information</option>
                  <option value="other">Other</option>
                </select>
              </div>
             
              <div>
                <label className="block text-[13px] font-semibold mb-2">Please write your issue in detail</label>
                <textarea
                  name="description"
                  value={reportFormData.description}
                  onChange={handleReportFormChange}
                  required
                  rows="4"
                  placeholder="Here is your answer..."
                  className="w-full p-2 border rounded-md text-[#000000]"
                />
              </div>

             

  <div className="flex justify-center mt-4 space-x-4">
    <button
      type="submit"
      className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
    >
      Submit
    </button>
  </div>
</form>

          </div>
        </div>
      )}

          <div className="py-[1rem] text-[16px]">
            Not sure how to apply?{" "}
            <span
              className="text-[#3431Bb] cursor-pointer "
              onClick={handleHowToApply} 
            >
              click here
            </span>{" "}
            to know how to apply for this scheme.
          </div>
          <RelatedSchemesModal schemeId={scheme.id} />
        </div>
      </div>


      {isHowToApplyOpen && (
        <HowToApply closeModal={handleCloseHowToApply} schemeId={scheme.id} scheme={scheme}/> 
      )}
      {isSavedModalOpen && (
          <SavedModal
            isOpen={isSavedModalOpen}
            onRequestClose={() => setIsSavedModalOpen(false)}
            heading={'Saved'}
            tag={'save'}
          />
        )}
        {isReportModalOpen && (
          <SavedModal
            isOpen={isReportModalOpen}
            onRequestClose={() => setIsReportModalOpen(false)}
            heading={'Report'}
            tag={'report'}
          />
        )}

        {isApplyModalOpen && (
          <SavedModal
            isOpen={isApplyModalOpen}
            onRequestClose={() => setIsApplyModalOpen(false)}
            heading={'Apply'}
            tag={'apply'}
          />
        )}
      
      
    </div>
  );
};

export default ApplyModal;
