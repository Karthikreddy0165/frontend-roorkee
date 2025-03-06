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

const ApplyModal = ({
  isOpen,
  onRequestClose,
  scheme,

  
  activeTab
}) => {
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  
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
  const descriptionRef = useRef(null);
  const [isHowToApplyOpen, setIsHowToApplyOpen] = useState(false); 

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isUnSaveToastVisible, setIsUnSaveToastVisible] = useState(false);
  const {authState} = useAuth()
  const { saveScheme } = useScheme();
  const { unsaveScheme } = useScheme();

  const handleSave = async (scheme_id, authState) => {
    const success = isBookmarked[scheme_id]
          ? await unsaveScheme(scheme_id, authState)
          : await saveScheme(scheme_id, authState);
    if (success && !isBookmarked[scheme_id]) {
      toggleBookmark(scheme_id, isBookmarked[scheme_id])
      console.log("Scheme saved successfully!");
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
          setDocuments(documentsData);
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
      console.log("This scheme is already bookmarked.");
      setIsSaved(true);
    } else {
      console.log("This scheme is not bookmarked.");
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
  }, [isOpen]);


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

  const handleShare = (schemeId) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?tab=${activeTab}&scheme_id=${schemeId}&modal_open=${isOpen}`;
  
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };
  

  if(isSaved){
    logUserEvent("save", scheme.id)
  }
  

  if (!isOpen) return null;

 console.log(scheme)


  

  return (


    <div
    className={`fixed inset-0 z-50 gap-[10px] ${isHowToApplyOpen || isReportModalOpen || isSavedModalOpen ? '' : 'pointer-events-none'}`}
  >
<div
  className={`absolute h-full sm:h-screen bg-white transition-all w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[40%] right-0 top-0 p-4 sm:p-6 rounded-lg border gap-[10px] border-gray-200 shadow-lg z-50 pointer-events-auto`}

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
     


<div className="flex flex-col  items-start w-full py-[20px] overflow-hidden">
  {/* Title and Report Button */}
  <div className="flex items-center justify-between w-full flex-wrap ">
    <h1 className="text-[18px] sm:text-[20px] font-bold mb-2 w-full sm:w-auto ">{scheme.title}</h1>
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
                  <div className="mt-8 flex sm:gap-[50px] gap-[5px] justify-between">

                    <div className="flex items-center text-[#3431Bb] font-semibold cursor-pointer" onClick={() => handleSave(scheme.id,authState)}>
                    {isSaved ? "Unsave Scheme" : "Save for Later"}
                    </div>
                    

                {isToastVisible && (
                          <Toast
                            message={""}
                            onClose={() => setIsToastVisible(false)}
                          />
                        )}

            {isUnSaveToastVisible && (
                      <UnSaveToast
                        message={""}
                        onClose={() => setIsUnSaveToastVisible(false)}
                      />
                    )}

                  
<div className="flex flex-wrap items-center gap-2 sm:gap-4">
<button
    onClick={() => handleShare(scheme.id)}
    className="flex items-center px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
  >
    Share
  </button>
  <a
    href={scheme.scheme_link}
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
  >
    Apply
  </a>
 
</div>

                  </div>


                  <div className="mt-8">
                    {scheme.pdf_url  ? (
                      <div className="flex justify-center">
                        <embed
                          src={scheme.pdf_url}
                          width="100%"
                          height="500px"
                          type="application/pdf"
                          className="rounded-lg object-cover max-w-full"
                        />
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </>
          )}

           {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-60 bg-gray-700 bg-opacity-50 flex justify-center items-center">
       
  

        <div className="relative bg-white rounded-lg w-[80%] sm:w-[60%] lg:w-[40%]">
        <div className="bg-[#EEEEFF] lg:p-3 p-2 text-black flex items-center justify-between shadow-md">
                  {/* Left Section: Logo & Launchpad */}
                  <div className="flex items-center ">
                    <div className="sm:text-[16px] mt-2 font-semibold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer flex items-center  gap-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 350 350"
                        fill="none"
                      >
                        <line
                          x1="178"
                          y1="224.048"
                          x2="178"
                          y2="182"
                          stroke="white"
                          stroke-width="40"
                        />
                        <rect width="350" height="350" fill="#EEEEFF" />
                        <path
                          d="M295.5 250.878C295.5 254.069 293.524 258.023 287.813 262.439C282.176 266.797 273.675 270.96 262.679 274.556C240.746 281.729 210.1 286.257 176 286.257C141.9 286.257 111.254 281.729 89.3212 274.556C78.3248 270.96 69.824 266.797 64.1873 262.439C58.4763 258.023 56.5 254.069 56.5 250.878C56.5 247.688 58.4763 243.733 64.1873 239.318C69.824 234.96 78.3248 230.797 89.3212 227.201C111.254 220.028 141.9 215.5 176 215.5C210.1 215.5 240.746 220.028 262.679 227.201C273.675 230.797 282.176 234.96 287.813 239.318C293.524 243.733 295.5 247.688 295.5 250.878Z"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <path
                          d="M295.745 189.052C296.816 172.185 294.51 155.271 288.97 139.35C283.43 123.429 274.772 108.836 263.528 96.4695C252.284 84.1026 238.691 74.2221 223.585 67.435C208.479 60.6479 192.178 57.0975 175.684 57.002C159.19 56.9064 142.851 60.2677 127.671 66.8794C112.491 73.491 98.7902 83.2134 87.4105 95.4492C76.0307 107.685 67.2122 122.176 61.4967 138.032C55.7812 153.888 53.2893 170.774 54.1743 187.653L66.2569 186.987C65.4604 171.797 67.7031 156.599 72.847 142.329C77.991 128.058 85.9276 115.017 96.1694 104.004C106.411 92.992 118.742 84.2419 132.404 78.2914C146.066 72.341 160.771 69.3158 175.616 69.4018C190.46 69.4878 205.131 72.6831 218.726 78.7915C232.322 84.8999 244.555 93.7923 254.675 104.923C264.795 116.053 272.587 129.186 277.573 143.515C282.559 157.844 284.634 173.066 283.67 188.247L295.745 189.052Z"
                          fill="#3330BA"
                        />
                        <line
                          x1="54"
                          y1="192.5"
                          x2="126"
                          y2="192.5"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="231"
                          y1="192.5"
                          x2="296"
                          y2="192.5"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="127.5"
                          y1="184"
                          x2="127.5"
                          y2="150"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="127.5"
                          y1="198"
                          x2="127.5"
                          y2="156"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <path
                          d="M151 191.042L181.369 159.618"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="180.712"
                          y1="166.288"
                          x2="204.754"
                          y2="190.329"
                          stroke="#3330BA"
                          stroke-width="10.5"
                        />
                        <line
                          x1="188.304"
                          y1="249.66"
                          x2="277.037"
                          y2="267.987"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="74.8876"
                          y1="268.773"
                          x2="167.66"
                          y2="249.614"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="163.5"
                          y1="255"
                          x2="163.5"
                          y2="223"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="192.5"
                          y1="255"
                          x2="192.5"
                          y2="223"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="178.501"
                          y1="285.089"
                          x2="177.501"
                          y2="223.089"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="203.5"
                          y1="221"
                          x2="203.5"
                          y2="187"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="152.5"
                          y1="221"
                          x2="152.5"
                          y2="187"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <path d="M226.5 198V155" stroke="#3330BA" stroke-width="11" />
                        <line
                          x1="125.505"
                          y1="154.016"
                          x2="182.505"
                          y2="104.016"
                          stroke="#3330BA"
                          stroke-width="10.6"
                        />
                        <line
                          x1="179.854"
                          y1="109.177"
                          x2="228.204"
                          y2="159.177"
                          stroke="#3330BA"
                          stroke-width="11"
                        />
                        <line
                          x1="178"
                          y1="205"
                          x2="178"
                          y2="222"
                          stroke="#EEEEFF"
                          stroke-width="40"
                        />
                      </svg>
        
                      <div className="mt-1">LAUNCHPAD</div>
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
        </div>
      </div>

      {isHowToApplyOpen && (
        <HowToApply closeModal={handleCloseHowToApply} schemeId={scheme.id} /> 
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
      
    </div>
  );
};

export default ApplyModal;
