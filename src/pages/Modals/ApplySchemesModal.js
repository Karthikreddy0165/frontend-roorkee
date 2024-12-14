import { useEffect, useState, useRef } from "react";
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

  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (scheme && scheme.id) {
        try {
          const [criteriaRes, documentsRes] = await Promise.all([
            fetch(`http://3.109.208.148:8000/api/schemes/${scheme.id}/criteria/`),
            fetch(`http://3.109.208.148:8000/api/schemes/${scheme.id}/documents/`),
          ]);

          if (!criteriaRes.ok) {
            throw new Error(
              `Error fetching criteria: ${criteriaRes.statusText}`
            );
          }
          if (!documentsRes.ok) {
            throw new Error(
              `Error fetching documents: ${documentsRes.statusText}`
            );
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
      // Prevent scrolling when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // Reset overflow when the modal is closed
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  console.log(scheme)

  // Check if description is long enough to warrant "Read More" functionality
  useEffect(() => {
    if (descriptionRef.current) {
      const isLong = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsDescriptionLong(isLong);
    }
  }, [scheme?.description]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Modal */}
      <div
        className={`absolute bg-white transition-all 
            w-full h-full sm:w-[40%] sm:right-0 
            sm:rounded-lg border border-gray-200 shadow-lg`}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 p-2 text-lg hover:text-red-500"
          onClick={onRequestClose}
        >
          <IoMdClose className="w-[24px] h-[24px]" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col p-8 h-full overflow-y-auto">
          {/* Title */}
          <h1 className="text-[20px] font-bold">{scheme.title}</h1>



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
                  <h2 className="text-[14px] font-semibold">Description:</h2>
                  <p
                    ref={descriptionRef}
                    className={`${
                      readMore || !isDescriptionLong ? "" : "line-clamp-3"
                    } overflow-y-auto`}
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

            

              {/* Documents / PDF Link */}
              {/* {documents.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-[14px] font-semibold">Documents:</h2>
                  {documents.map((doc, index) => (
                    <div key={index} className="mt-2">
                      <a
                        href={doc.description}  
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3431Bb] text-sm underline cursor-pointer"
                      >
                        {doc.document_name || "View Document"}
                      </a>
                    </div>
                  ))}
                </div>
              )} */}

              {/* Apply Button */}
              <div className="mt-8 flex space-x-4">
                {scheme.scheme_link ? (
                  <a
                    href={scheme.scheme_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-8 bg-[#3431Bb] text-white font-semibold rounded-[10px] transition hover:bg-blue-700"
                  >
                    Apply
                  </a>
                ) : (
                  <p className="text-red-500 text-sm">No link available</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
