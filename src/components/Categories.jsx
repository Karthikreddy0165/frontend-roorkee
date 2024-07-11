import { useEffect, useState } from "react";
import ApplyModal from "../pages/content";
import { CiBookmark } from "react-icons/ci";
import { GoBookmarkFill } from "react-icons/go";
import SavedModal from "@/pages/model/savedModal";

export default function Categories(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null); // State to hold the selected scheme
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility'
  const [isBookmarked, setBookmarks] = useState({});

  useEffect(() => {
    if (props.data) {
      let filtered = props.data;

      if (props.selectedDepartments && props.selectedDepartments.length > 0) {
        filtered = filtered.filter(item => props.selectedDepartments.includes(item.department.department_name));
      }

      if (props.selectedBeneficiaries && props.selectedBeneficiaries.length > 0) {
        filtered = filtered.filter(item => {
          const allBeneficiaryTypes = item.beneficiaries.flatMap(beneficiary => beneficiary.beneficiary_type.split(',').map(type => type.trim()));

          const haveCommonElement = props.selectedBeneficiaries.some(beneficiary => {
            return allBeneficiaryTypes.includes(beneficiary);
        });
        
        if (haveCommonElement) {
            return true;
        } else {
            return false;
        }
        });
      }

      if (props.selectedFunders && props.selectedFunders.length > 0) {
        filtered = filtered.filter(item => props.selectedFunders.includes(item.funding_pattern));
      }

      // Set filtered data after applying all filters
      setFilteredData(filtered);
    }
  }, [props.data, props.selectedDepartments, props.selectedBeneficiaries, props.selectedFunders]);


  const handleClick = (scheme_id) => {
    const scheme = props.data.find((item) => item.id === scheme_id);
    if (scheme) {
      setSelectedScheme(scheme); // Set the selected scheme
      setIsModalOpen(true); // Open the modal
    }
  };

  const toggleBookmark = (e, itemId) => {
    e.preventDefault();
    setBookmarks(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId] // Toggle the bookmark status for itemId
    }));
  };

  if (props.data === null) {
    return <div className = "text-onclick-btnblue mt-[120px] italic flex justify-center items-center text-[18px]">Loading...</div>;
  }

  if (props.data.length === 0 || filteredData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[8px] mt-[120px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
          <path d="M27.2075 10.2925L20.2075 3.2925C20.1146 3.19967 20.0042 3.12605 19.8829 3.07586C19.7615 3.02568 19.6314 2.9999 19.5 3H7.5C6.96957 3 6.46086 3.21071 6.08579 3.58579C5.71071 3.96086 5.5 4.46957 5.5 5V27C5.5 27.5304 5.71071 28.0391 6.08579 28.4142C6.46086 28.7893 6.96957 29 7.5 29H25.5C26.0304 29 26.5391 28.7893 26.9142 28.4142C27.2893 28.0391 27.5 27.5304 27.5 27V11C27.5001 10.8686 27.4743 10.7385 27.4241 10.6172C27.3739 10.4958 27.3003 10.3854 27.2075 10.2925ZM20.5 6.41375L24.0863 10H20.5V6.41375ZM25.5 27H7.5V5H18.5V11C18.5 11.2652 18.6054 11.5196 18.7929 11.7071C18.9804 11.8946 19.2348 12 19.5 12H25.5V27ZM19.8075 20.8937C20.3977 19.956 20.6216 18.8336 20.4366 17.7411C20.2516 16.6486 19.6705 15.6626 18.8044 14.9715C17.9384 14.2803 16.848 13.9325 15.7417 13.9944C14.6354 14.0564 13.5907 14.5237 12.8072 15.3072C12.0237 16.0907 11.5564 17.1354 11.4944 18.2417C11.4325 19.348 11.7803 20.4384 12.4715 21.3044C13.1626 22.1705 14.1486 22.7516 15.2411 22.9366C16.3336 23.1216 17.456 22.8977 18.3937 22.3075L19.7925 23.7075C19.8854 23.8004 19.9957 23.8741 20.1171 23.9244C20.2385 23.9747 20.3686 24.0006 20.5 24.0006C20.6314 24.0006 20.7615 23.9747 20.8829 23.9244C21.0043 23.8741 21.1146 23.8004 21.2075 23.7075C21.3004 23.6146 21.3741 23.5043 21.4244 23.3829C21.4747 23.2615 21.5006 23.1314 21.5006 23C21.5006 22.8686 21.4747 22.7385 21.4244 22.6171C21.3741 22.4957 21.3004 22.3854 21.2075 22.2925L19.8075 20.8937ZM13.5 18.5C13.5 18.0055 13.6466 17.5222 13.9213 17.1111C14.196 16.7 14.5865 16.3795 15.0433 16.1903C15.5001 16.0011 16.0028 15.9516 16.4877 16.048C16.9727 16.1445 17.4181 16.3826 17.7678 16.7322C18.1174 17.0819 18.3555 17.5273 18.452 18.0123C18.5484 18.4972 18.4989 18.9999 18.3097 19.4567C18.1205 19.9135 17.8 20.304 17.3889 20.5787C16.9778 20.8534 16.4945 21 16 21C15.337 21 14.7011 20.7366 14.2322 20.2678C13.7634 19.7989 13.5 19.163 13.5 18.5Z" fill="#E0E0E0"/>
        </svg>
        <p className="text-button-text text-[14px]">No results found</p>
      </div>
    );
  }

  return (
      <div>
        {filteredData.map(item => (
          <div className="flex items-start justify-between self-stretch relative border-[1px] border-category-border rounded-[12px] mb-2 py-[16px] px-[16px] my-6 hover:bg-violet-100 gap-[20px]" key={item.id}>
            <div>
            <button className="text-center text-[12px] px-[8px] py-[6px] rounded-[4px] gap-[10px]" style={{ color: '#151280', backgroundColor: '#EEEEFF' }}>New update</button>
            <div className="gap-[12px] pt-[16px] pd-[16px]">
              <p className="font-inter text-[18px] leading-[21.6px] cursor-pointer font-bold mb-[10px] line-clamp-2 w-8/12" onClick={() => handleClick(item.id)} role="button" tabIndex="0">
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

              <p className="font-inter text-[14px] opacity-60 leading-[21.6px] mb-[10px] line-clamp-2 text-decoration-line: underline ">
                {item.department.department_name}
              </p>

              <div className="flex gap-5">
                <button className="flex items-center justify-center pr-2 pl-2 border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium py-2">
                  {item.department.state}
                </button>
                
              
                {item.beneficiaries.length > 0 && item.beneficiaries[0].beneficiary_type !== "N/A" &&(
                  <button className="flex items-center justify-center pr-2 pl-2 py-[5px] border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium">
                    {item.beneficiaries[0].beneficiary_type}
                  </button>
                )}
                {/* <div className="flex items-center justify-center pr-2 pl-2 border border-onclick-btnblue rounded bg-white text-onclick-btnblue font-inter text-xs font-medium">
                  Community
                </div> */}
              </div>
              <p
                className=" font-inter text-[12px] text-apply-date leading-[24px] mt-4"
                // onClick={() => handleClick(item.id)}
                role="button"
                tabIndex="0"
              >
                Last date to apply:{" "}
                <span className="font-bold">
                  {item.valid_upto.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
            <div className="cursor-pointer px-2 py-2 right-[8.25px]" onClick={(e) => toggleBookmark(e, item.id)}>
              {isBookmarked[item.id] ? <GoBookmarkFill className="w-[27.5px] h-[27.5px]" /> : <CiBookmark className="w-[27.5px] h-[27.5px]" />} 
            </div>
          </div>
        ))}
        {isModalOpen && selectedScheme && (
          <ApplyModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            scheme={selectedScheme} 
          />
        )}
      </div>
    );
}
