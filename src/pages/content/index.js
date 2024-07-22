import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const ApplyModal = ({ isOpen, onRequestClose, scheme }) => {
  const [departments, setDepartments] = useState([]);
  const [states, setStates] = useState([]);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/departments`);
        if (!departmentsRes.ok) throw new Error(`Error fetching departments: ${departmentsRes.statusText}`);
        
        const statesRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/states`);
        if (!statesRes.ok) throw new Error(`Error fetching states: ${statesRes.statusText}`);
        
        const schemesRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/schemes`);
        if (!schemesRes.ok) throw new Error(`Error fetching schemes: ${schemesRes.statusText}`);
        
        const departmentsData = await departmentsRes.json();
        const statesData = await statesRes.json();
        const schemesData = await schemesRes.json();

        setDepartments(departmentsData);
        setStates(statesData);
        setSchemes(schemesData);

        console.log(departmentsData);
        console.log(statesData);
        console.log(schemesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!isOpen) return null;

  const matchedScheme = schemes.find(s => s.id === scheme.id);
  const matchedDepartment = matchedScheme ? departments.find(d => d.id === matchedScheme.department.id) : null;
  const matchedState = matchedScheme ? states.find(s => s.state_name === matchedScheme.department.state) : null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none pr-8 pl-8">
      <div className="absolute right-0">
        <div className="bg-white w-full max-w-2xl p-8 mt-8 rounded-lg relative border border-gray-200 shadow-lg shadow-black-400 pointer-events-auto">

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

            {/* Last update date */}
            <div className="w-full sm:max-w-3xl">
              <div>
                {matchedScheme ? <p className="py-0.5 px-2 text-black text-sm inline-block bg-[#EEF] rounded-[12px] mt-2">{`Last updated on ${matchedScheme.created_at.split(" ")[0]}`}</p> : <p className="mt-4 italic text-onclick-btnblue">Loading...</p>}
                
                {/* <p className="py-0.5 px-2 text-black text-sm">
                {matchedScheme ? `Last updated on ${matchedScheme.created_at.split(" ")[0]}` : "Unable to fetch data"}
                </p> */}
              </div>
            </div>
      
            {/* Main data section */}
            <div className="mt-8 space-y-4 w-full sm:max-w-3xl p-4">

            {matchedDepartment && (
                <div className="flex items-start pb-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Department</h1>
                  <p className="ml-2 flex-1">{matchedDepartment.department_name}</p>
                </div>
              )}
              {matchedDepartment && <hr />}
              
              {matchedState && (
                <div className="flex items-start pb-2 pt-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">State</h1>
                  <p className="ml-2 flex-1">{matchedState.state_name}</p>
                </div>
              )}
              {matchedState && <hr />}

              {matchedScheme && (
                <div className="flex items-start pb-2 pt-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Title</h1>
                  <p className="ml-2 flex-1">{matchedScheme.title}</p>
                </div>
              )}
              {matchedScheme && <hr />}

              {matchedScheme && matchedScheme.beneficiaries[0] && matchedScheme.beneficiaries[0].beneficiary_type !== "N/A" && (
                <div className="flex items-start pb-2 pt-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Beneficiary Type</h1>
                  <p className="ml-2 flex-1">{matchedScheme.beneficiaries[0].beneficiary_type}</p>
                </div>
              )}
              {matchedScheme && matchedScheme.beneficiaries[0] && <hr />}

              {matchedScheme && matchedScheme.sponsors && matchedScheme.sponsors.length > 0 && (
                <div className="flex items-start pb-2 pt-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Sponsored By</h1>
                  <p className="ml-2 flex-1">{matchedScheme.sponsors[0].sponsor_type}</p>
                </div>
              )}
              {matchedScheme && matchedScheme.sponsors && matchedScheme.sponsors.length > 0 && <hr />}

              {matchedScheme && matchedScheme.documents[0] && (
                <div className="flex items-start pb-2 pt-2">
                  <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Uploaded file</h1>
                  <p className="ml-2 flex-1">{matchedScheme.documents}</p>
                </div>
              )}


            </div>

            {/* Apply button */}
            <div>
              <div className="absolute z-50 bottom-8 right-8 w-100 mb-[70px]">
                {matchedScheme && matchedScheme.scheme_link ? (
                  <a
                    href={matchedScheme.scheme_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-12 bg-blue-800 text-white font-semibold rounded-[10px] transition hover:bg-red-500"
                  >
                    Apply
                  </a>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;