import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const ApplyModal = ({
  isOpen,
  onRequestClose,
  scheme,
  setSidePannelSelected,
}) => {
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    
    description: "",
    category: "",
  });
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (scheme && scheme.id) {
        try {
          const [criteriaRes, documentsRes] = await Promise.all([
            fetch(`http://65.0.122.213:8000/api/schemes/${scheme.id}/criteria/`),
            fetch(`http://65.0.122.213:8000/api/schemes/${scheme.id}/documents/`),
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
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
      [name]: value,
    }));
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/scheme-reports/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTczNTg4LCJpYXQiOjE3MzUxMDk1ODgsImp0aSI6ImVjOGI1NWQ2YjMzOTQyZTY5NGVlNWIzOTAwNDJlODJkIiwidXNlcl9pZCI6MX0.2emHvQsagNbIpHpSuC6nlAEy-_p5Q4xFFFSymvUPxE4"

        },
        body: JSON.stringify(reportFormData),
      });

      if (!response.ok) {
        throw new Error(`Error creating report: ${response.statusText}`);
      }

      alert("Report created successfully!");
      setReportFormData({  description: "", category: "" });
      setReportModalOpen(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to create report. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Main Modal */}
      <div
        className={`absolute bg-white transition-all w-full h-full sm:w-[40%] sm:right-0 sm:rounded-lg border border-gray-200 shadow-lg`}
      >
        <button
          className="absolute right-4 p-2 text-lg hover:text-red-500"
          onClick={onRequestClose}
        >
          <IoMdClose className="w-[24px] h-[24px]" />
        </button>
        <button
      onClick={() => setReportModalOpen(true)}
      className="flex items-center px-4 py-2 text-red-500 rounded-lg ml-auto mt-8"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.29333 5.06878C1.45958 3.01956 3.23942 1.66667 5.16536 1.66667H14.835C16.7609 1.66667 18.5408 3.01956 18.707 5.06878C18.8298 6.5824 18.835 8.56439 18.2938 10.2542C17.8082 11.7704 16.7768 13.2271 15.6693 14.4731C14.5524 15.7296 13.3061 16.8288 12.3211 17.6271C10.9584 18.7315 9.04192 18.7315 7.6792 17.6271C6.69419 16.8288 5.44795 15.7296 4.33102 14.4731C3.22349 13.2271 2.19215 11.7704 1.70654 10.2542C1.16532 8.56439 1.17054 6.5824 1.29333 5.06878ZM5.16536 3.33334C3.97458 3.33334 3.04031 4.14627 2.95454 5.20355C2.83725 6.64935 2.85308 8.36985 3.29379 9.74582C3.67591 10.9389 4.53168 12.1902 5.5767 13.3658C6.61231 14.5309 7.78406 15.5668 8.72856 16.3323C9.47954 16.9409 10.5208 16.9409 11.2718 16.3323C12.2163 15.5668 13.388 14.5309 14.4236 13.3658C15.4687 12.1902 16.3244 10.9389 16.7065 9.74582C17.1472 8.36985 17.1631 6.64935 17.0458 5.20355C16.96 4.14627 16.0257 3.33334 14.835 3.33334H5.16536ZM10.0002 5.83334C10.4604 5.83334 10.8335 6.20643 10.8335 6.66667V10C10.8335 10.4602 10.4604 10.8333 10.0002 10.8333C9.53993 10.8333 9.16683 10.4602 9.16683 10V6.66667C9.16683 6.20643 9.53993 5.83334 10.0002 5.83334Z" fill="#FF0000"/>
        <path d="M10.8337 13.3333C10.8337 13.7936 10.4606 14.1667 10.0003 14.1667C9.54009 14.1667 9.16699 13.7936 9.16699 13.3333C9.16699 12.8731 9.54009 12.5 10.0003 12.5C10.4606 12.5 10.8337 12.8731 10.8337 13.3333Z" fill="#FF0000"/>
      </svg>
      Report
    </button>
        

        <div className="flex flex-col p-8 h-full overflow-y-auto">
  <div className="flex justify-between items-center w-full">
    {/* Title */}
    <h1 className="text-[20px] font-bold">{scheme.title}</h1>

    {/* Report Button */}
   
  </div>
  



          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Last Updated */}
              {scheme?.created_at?.split(" ")[0] && (
                <p className="py-1 px-2 mt-8 text-sm bg-[#EEF] rounded-[12px]">
                  {`Last updated on ${scheme.created_at.split(" ")[0]}`}
                </p>
              )}

              {/* State */}
              {scheme.department?.state && (
                <div className="flex items-start mt-4">
                  <h2 className="w-28 text-[14px] font-semibold">State:</h2>
                  <p className="flex-1">{scheme.department.state}</p>
                </div>
              )}

              <hr className="my-4 border-gray-300" />

              {/* Department */}
              {scheme.department?.department_name && (
                <div className="flex items-start mt-4">
                  <h2 className="w-28 text-[14px] font-semibold">Department:</h2>
                  <p className="flex-1">{scheme.department.department_name}</p>
                </div>
              )}

              {scheme.beneficiaries[0]?.beneficiary_type && (
                <div className="flex items-start mt-4">
                  <h2 className="w-28 text-[14px] font-semibold">Beneficiaries:</h2>
                  <p className="flex-1">{scheme.beneficiaries[0].beneficiary_type}</p>
                </div>
              )}

              {/* Description with Read More */}
              {scheme.description && (
                <div className="mt-4">
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

              <hr className="my-4 border-gray-300" />

              {/* Apply Button */}
              {scheme.scheme_link || scheme.pdf_url ? (
                <>
                  <div className="mt-8 flex space-between flex-wrap sm:gap-[350px] gap-[5px] ">
                    {scheme.scheme_link && (
                      <a
                        href={scheme.scheme_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
                      >
                        Apply
                      </a>
                    )}

                    {scheme.pdf_url && (
                      <a
                        href={scheme.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
                      >
                        Uploaded File
                      </a>
                    )}
                  </div>

                  <div className="mt-8">
                    {scheme.pdf_url && scheme.pdf_url.startsWith('https://launchpad-pdf-files') ? (
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

              {/* Create Report Button */}
            
            </>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-60 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-[80%] sm:w-[60%] lg:w-[40%]">
         
           
          <h2 className="text-xl font-bold flex items-center justify-center mb-4 text-[#3330BA] text-center">
  Help Us Improve
</h2>
            <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={reportFormData.category}
                  onChange={handleReportFormChange}
                  required
                  className="w-full p-2 border text-sm rounded-md"
                >
                  <option value="">Select Category</option>
                  <option value="General">Incorrect information</option>
                  <option value="Urgent">Outdated information</option>
                  <option value="Feedback">Other</option>
                </select>
              </div>
             
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={reportFormData.description}
                  onChange={handleReportFormChange}
                  required
                  rows="4"
                  className="w-full p-2 border rounded-md"
                />
              </div>

             

              <div className="flex justify-end mt-4 space-x-4">
              <button
                type="submit"
                className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
              >
                Submit Report
              </button>

              <button
                type="button"  
                onClick={() => setReportModalOpen(false)}  
                className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 text-[12px] sm:text-sm"
              >
                Cancel
              </button>
            </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyModal;
