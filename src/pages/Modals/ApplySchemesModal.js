import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import HowToApply from './HowToApply';  

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
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    description: "",
    category: "",
  });
  const descriptionRef = useRef(null);
  const [isHowToApplyOpen, setIsHowToApplyOpen] = useState(false); 

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

  const handleHowToApply = () => {
    setIsHowToApplyOpen(true); 
  };

  const handleCloseHowToApply = () => {
    setIsHowToApplyOpen(false); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute bg-white transition-all w-full h-full sm:w-[40%] sm:right-0 sm:rounded-lg border border-gray-200 shadow-lg`}
      >
        <button
          className="absolute right-4 p-2 text-lg hover:text-red-500"
          onClick={onRequestClose}
        >
          <IoMdClose className="w-[24px] h-[24px]" />
        </button>

        <div className="flex flex-col p-8 h-full overflow-y-auto">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-[20px] font-bold">{scheme.title}</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center flex-grow">
              <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {scheme?.created_at?.split(" ")[0] && (
                <p className="py-1 px-2 mt-8 text-sm bg-[#EEF] rounded-[12px]">
                  {`Last updated on ${scheme.created_at.split(" ")[0]}`}
                </p>
              )}

              {scheme.department?.state && (
                <div className="flex items-start mt-4">
                  <h2 className="w-28 text-[14px] font-semibold">State:</h2>
                  <p className="flex-1">{scheme.department.state}</p>
                </div>
              )}

              <hr className="my-4 border-gray-300" />

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

              {/* Updated "Uploaded File" Section */}
              {scheme.pdf_url && (
                <div className="flex items-start mt-4">
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
      <hr className="my-4 border-gray-300" />
              {scheme.scheme_link ? (
                <>
                  <div className="mt-8 flex sm:gap-[50px] gap-[5px] justify-between">

                    <div className="flex items-center text-[#3431Bb] font-semibold cursor-pointer">
                      Save for Later
                    </div>

                  
                    <div className="flex-shrink-0">
                      <a
                        href={scheme.scheme_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431Bb] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
                      >
                        Apply
                      </a>
                    </div>
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
            </>
          )}

          <div>
            Not sure how to apply?{" "}
            <span
              className="text-[#3431Bb] cursor-pointer"
              onClick={handleHowToApply} 
            >
              click here
            </span>{" "}
            to know how to apply
          </div>
        </div>
      </div>

      {isHowToApplyOpen && (
        <HowToApply closeModal={handleCloseHowToApply} /> 
      )}
    </div>
  );
};

export default ApplyModal;