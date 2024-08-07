import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ApplyModal = ({ isOpen, onRequestClose, scheme, setSidePannelSelected }) => {
  const [departments, setDepartments] = useState([]);
  const [states, setStates] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsRes, statesRes, schemesRes, criteriaRes] = await Promise.all([
          fetch(`http://65.0.103.91:80/api/departments/`),
          fetch(`http://65.0.103.91:80/api/states/`),
          fetch(`http://65.0.103.91:80/api/schemes/`),
          fetch(`http://65.0.103.91:80/api/criteria/`),
        ]);

        if (!departmentsRes.ok)
          throw new Error(`Error fetching departments: ${departmentsRes.statusText}`);
        if (!statesRes.ok)
          throw new Error(`Error fetching states: ${statesRes.statusText}`);
        if (!schemesRes.ok)
          throw new Error(`Error fetching schemes: ${schemesRes.statusText}`);
        if (!criteriaRes.ok)
          throw new Error(`Error fetching criteria: ${criteriaRes.statusText}`);

        const [departmentsData, statesData, schemesData, criteriaData] = await Promise.all([
          departmentsRes.json(),
          statesRes.json(),
          schemesRes.json(),
          criteriaRes.json(),
          ]);
        //   console.log(schemesRes,'schemeiaasldglas')
        // console.log(criteriaRes,'criteriaasldglas')

        setDepartments(departmentsData);
        setStates(statesData);
        setSchemes(schemesData);
        setCriteria(criteriaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(schemes,'schemeesdgtsx')
  // console.log(schemes,'critereiaesdgtsx')
  
  if (!isOpen) return null;

  const matchedScheme = schemes.find((s) => s.id === scheme.id);
  const matchedDepartment = matchedScheme
    ? departments.find((d) => d.id === matchedScheme.department.id)
    : null;
  const matchedState = matchedScheme
    ? states.find((s) => s.state_name === matchedScheme.department.state)
    : null;
  // console.log(scheme.id,'schemeid')
  // console.log(criteria.id,"criteraid")
  const matchedCriteria = matchedScheme
    ? criteria.find((c) => c.id === scheme.id)
    : null;


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none pr-8 pl-8">
      <div className="absolute right-0 w-[40%]">
        <div className="bg-white w-full max-w-[2xl] p-8 mt-8 rounded-lg relative border border-gray-200 shadow-lg shadow-black-400 pointer-events-auto">
          {/* Close button */}
          <button
            className="absolute top-6 right-2 p-2 text-lg transition duration-300 ease-in-out hover:text-red-500"
            onClick={onRequestClose}
          >
            <IoMdClose className="w-[24px] h-[24px]" />
          </button>

          <div className="flex flex-col items-center min-h-screen bg-white overflow-y-auto max-h-[calc(100vh-8rem)]">
            {/* Scheme name */}
            <div className="pt-2 w-full sm:max-w-3xl flex justify-between items-center">
              <h1 className="mr-8 text-[20px] font-bold leading-normal font-inter text-[#0A0A0A]">
                {scheme.title}
              </h1>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-screen ">
                <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Last update date */}
                <div className="w-full sm:max-w-3xl">
                  {matchedScheme &&
                    matchedScheme.created_at &&
                    matchedScheme.created_at.split(" ")[0] !== "N/A" && (
                      <div>
                        <p className="py-0.5 px-2 text-black text-sm inline-block bg-[#EEF] rounded-[12px] mt-2">
                          {`Last updated on ${matchedScheme.created_at.split(" ")[0]}`}
                        </p>
                      </div>
                    )}
                </div>

                {/* Main data section */}
                <div className="mt-8 space-y-4 w-full sm:max-w-3xl p-4">
                  {matchedDepartment && (
                    <div className="flex items-start pb-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        Department
                      </h1>
                      <p className="ml-2 flex-1">
                        {matchedDepartment.department_name}
                      </p>
                    </div>
                  )}
                  {matchedDepartment && <hr />}

                  {matchedState && (
                    <div className="flex items-start pb-2 pt-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        State
                      </h1>
                      <p className="ml-2 flex-1">{matchedState.state_name}</p>
                    </div>
                  )}
                  {matchedState && <hr />}

                  {matchedScheme && (
                    <div className="flex items-start pb-2 pt-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        Title
                      </h1>
                      <p className="ml-2 flex-1">{matchedScheme.title}</p>
                    </div>
                  )}
                  {matchedScheme && <hr />}

                  {matchedScheme && matchedScheme.description &&(
                    <div className="flex items-start pb-2 pt-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        Description
                      </h1>
                      <p className="ml-2 flex-1">{matchedScheme.description}</p>
                    </div>
                  )}
                  {matchedScheme && matchedScheme.description &&<hr />}

                  {matchedCriteria.description && (
                    <div className="flex items-start pb-2 pt-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        Criteria
                      </h1>
                      <p className="ml-2 flex-1">{matchedCriteria.description}</p>
                    </div>
                  )}
                  {matchedCriteria.description && <hr />}

                  {matchedScheme &&
                    matchedScheme.beneficiaries[0] &&
                    matchedScheme.beneficiaries[0].beneficiary_type !== "N/A" && (
                      <div className="flex items-start pb-2 pt-2">
                        <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                          Beneficiary Type
                        </h1>
                        <p className="ml-2 flex-1">
                          {matchedScheme.beneficiaries[0].beneficiary_type}
                        </p>
                      </div>
                    )}
                  {matchedScheme && matchedScheme.beneficiaries[0] && <hr />}

                  {matchedScheme &&
                    matchedScheme.sponsors &&
                    matchedScheme.sponsors.length > 0 && (
                      <div className="flex items-start pb-2 pt-2">
                        <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                          Sponsored By
                        </h1>
                        <p className="ml-2 flex-1">
                          {matchedScheme.sponsors[0].sponsor_type}
                        </p>
                      </div>
                    )}
                  {matchedScheme &&
                    matchedScheme.sponsors &&
                    matchedScheme.sponsors.length > 0 && <hr />}

                  {matchedScheme && matchedScheme.documents[0] && (
                    <div className="flex items-start pb-2 pt-2">
                      <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                        Uploaded file
                      </h1>
                      <p className="ml-2 flex-1">{matchedScheme.documents}</p>
                    </div>
                  )}
                </div>

                {/* Apply button */}
                <div>
                  <div className=" z-50 bottom-8 right-8 w-100 mb-[70px]">
                    {matchedScheme && matchedScheme.scheme_link ? (
                      <a
                        href={matchedScheme.scheme_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative py-3 px-12 bg-blue-600 text-white font-semibold rounded-[10px] transition hover:bg-onclick-btnblue ml-[300px]"
                      >
                        Apply
                      </a>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
