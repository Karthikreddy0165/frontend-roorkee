import { useEffect, useRef, useState,useContext } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import FilterContext from "@/Context/FilterContext";
import { values } from "lodash";
import { useProfile } from "@/Context/ProfileContext"; 


const ProfileModal = ({ onClose }) => {
  const { profileData, setProfileData } = useProfile();
  const {
    setStates,
    setBeneficiaries,
    statesFromApi
  } = useContext(FilterContext);

  const { authState } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState(null);
  const [sentEmailText, setSentEmailText] = useState(false);
  const modalRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fields, setFields] = useState([])
  

  const fieldsCount = Object.keys(profileData).length;

  const resendEmail = async () => {
    setSentEmailText(true);
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/resend-verification-email/`,
        requestOptions
      );

    
  
      if (response.ok) {
        setTimeout(() => {
          setSentEmailText(false);
        }, 3000); // Change button text back after 3 seconds
      }
    } catch (error) {
      console.error("Error resending email:", error);
      setSentEmailText(false); // Ensure the button resets even if there's an error
    }
  };
  
    
  useEffect(() => {
    const fetchProfileData = async () => {
      if (authState.token) {
        setLoading(true);
        try {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`,
            },
          };

          const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
            requestOptions
          );
          const pData = await profileResponse.json();
          // console.log(pData, "fetching Saved data")

          setProfileData({
            ...profileData,
            name: pData.name || "",
            ...Object.entries(pData.dynamic_fields || {}).reduce((acc, [key, value]) => {
              acc[key.toLowerCase().replace(" ", "_")] = value;
              return acc;
            }, {}),
          });
          
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [authState.token, isSaved]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchEmailData = async () => {
      if (authState.token) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          redirect: "follow",
        };

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me/`,
            requestOptions
          );
          const data = await response.json();
          setEmailData(data);
        } catch (error) {
          console.error("Error fetching email data:", error);
        }
      }
    };

    fetchEmailData();
  }, [authState.token]);

useEffect(() => {
    const filledFields = Object.values(profileData).filter((value) =>typeof value === 'string' && value.trim() !== "").length;
    console.log(profileData)

    const percentage = Math.round((filledFields / fieldsCount) * 100);
    setProgress(percentage);
  }, [profileData]);

  useEffect(() => {
    const fetchProfileFields = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dynamic-fields/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch fields: ${response.statusText}`);
        }
        const data = await response.json();
        setFields(data.profile_fields);
      } catch (error) {
        console.error("Failed to fetch profile fields", error);
      }
    };

    fetchProfileFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    if (authState.token) {
      const dynamicFields = fields.reduce((acc, field) => {
        const key = field.name;
        const value = profileData[key.toLowerCase().replace(" ", "_")];
        if (value) acc[key] = value;
        return acc;
      }, {});
  
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          name: profileData.name,
          dynamic_fields: dynamicFields, // Add dynamic fields here
        }),
      };
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
          requestOptions
        );
  
        if (!response.ok) {
          throw new Error("Failed to save profile data.");
        }
  
  
        setIsSaved(true);
        onClose();
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    }
  };  
  

  const handleSliderChange = (e) => {
    const { value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      income: value,
    }));
  };

  // console.log(sentEmailText)

console.log(" this is emaildata", emailData)
  const renderField = (field) => {
    switch (field.type) {
      case "choice":
        return (
          <div key={field.id} className="flex-1">
            <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
              {field.name}
            </label>
            <select
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-[14px] font-semibold text-[#757575]"
              value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
              onChange={(e) => handleChange(e, field)}
            >
              <option value="">Select {field.name}</option>
              {field.choices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
        );
      case "integer":
        return (
          <div key={field.id} className="flex-1">
            <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
              {field.name}
            </label>
            <input
              type="text"
              inputMode="numeric" 
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-sm font-semibold text-[#757575]"
              placeholder={field.placeholder || `Enter your ${field.name}`}
              value={profileData[field.name.toLowerCase().replace(" ", "_")] ?? ""}
              onChange={(e) => {
                let rawValue = e.target.value;

                // Remove non-numeric characters (except "-" for negative numbers)
                rawValue = rawValue.replace(/[^0-9-]/g, "");

                // Prevent multiple "-" signs or "-" in the wrong place
                if (rawValue.includes("-") && rawValue.indexOf("-") !== 0) {
                  rawValue = rawValue.replace("-", "");
                }

                // Convert to number (ignores empty or invalid values)
                let value = rawValue === "-" ? rawValue : Number.parseInt(rawValue, 10);

                // Prevent NaN (invalid number)
                if (isNaN(value)) {
                  value = "";
                }

                // Apply min/max limits
                if (value !== "" && field.min_value !== undefined) value = Math.max(field.min_value, value);
                if (value !== "" && field.max_value !== undefined) value = Math.min(field.max_value, value);

                handleChange({ target: { name: e.target.name, value } }, field);
              }}
            />
          </div>
        );
      case "char":
        return (
          <div key={field.id} className="flex-1">
            <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
              {field.name}
            </label>
            <input
              type="text"
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-sm font-semibold text-[#757575]"
              placeholder={field.placeholder || `Enter your ${field.name}`}
              value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
              onChange={(e) => handleChange(e, field)}
            />
          </div>
        );
      case "boolean":
        return (
          <div key={field.id} className="flex-1">
            <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
              {field.name}
            </label>
            <select
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-[14px] font-semibold text-[#757575]"
              value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
              onChange={(e) => handleChange(e, field)}
            >
              <option value="">Select {field.name}</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        );
      case "date":
        return (
          <div key={field.id} className="flex-1">
            <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
              {field.name}
            </label>
            <input
              type="date"
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-sm font-semibold text-[#757575]"
              value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
              onChange={(e) => handleChange(e, field)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center   bg-black bg-opacity-50 z-50">
      
      
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-[90%] sm:w-[720px] max-h-[90vh] overflow-y-auto flex flex-col items-start relative"
      >
        

<div className="flex justify-between items-center mb-2 -mt-2 p-4 w-full bg-[#EEEEFF] shadow-md">
<div className="flex items-center ">
    <div
          className="sm:text-[16px] mt-2 font-semibold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer flex items-center  gap-2 "
     
        >
         <svg xmlns="http://www.w3.org/2000/svg"  width="50"
            height="50"
            viewBox="0 0 350 350" fill="none">
<line x1="178" y1="224.048" x2="178" y2="182" stroke="white" stroke-width="40"/>
<rect width="350" height="350" fill="#EEEEFF"/>
<path d="M295.5 250.878C295.5 254.069 293.524 258.023 287.813 262.439C282.176 266.797 273.675 270.96 262.679 274.556C240.746 281.729 210.1 286.257 176 286.257C141.9 286.257 111.254 281.729 89.3212 274.556C78.3248 270.96 69.824 266.797 64.1873 262.439C58.4763 258.023 56.5 254.069 56.5 250.878C56.5 247.688 58.4763 243.733 64.1873 239.318C69.824 234.96 78.3248 230.797 89.3212 227.201C111.254 220.028 141.9 215.5 176 215.5C210.1 215.5 240.746 220.028 262.679 227.201C273.675 230.797 282.176 234.96 287.813 239.318C293.524 243.733 295.5 247.688 295.5 250.878Z" stroke="#3330BA" stroke-width="11"/>
<path d="M295.745 189.052C296.816 172.185 294.51 155.271 288.97 139.35C283.43 123.429 274.772 108.836 263.528 96.4695C252.284 84.1026 238.691 74.2221 223.585 67.435C208.479 60.6479 192.178 57.0975 175.684 57.002C159.19 56.9064 142.851 60.2677 127.671 66.8794C112.491 73.491 98.7902 83.2134 87.4105 95.4492C76.0307 107.685 67.2122 122.176 61.4967 138.032C55.7812 153.888 53.2893 170.774 54.1743 187.653L66.2569 186.987C65.4604 171.797 67.7031 156.599 72.847 142.329C77.991 128.058 85.9276 115.017 96.1694 104.004C106.411 92.992 118.742 84.2419 132.404 78.2914C146.066 72.341 160.771 69.3158 175.616 69.4018C190.46 69.4878 205.131 72.6831 218.726 78.7915C232.322 84.8999 244.555 93.7923 254.675 104.923C264.795 116.053 272.587 129.186 277.573 143.515C282.559 157.844 284.634 173.066 283.67 188.247L295.745 189.052Z" fill="#3330BA"/>
<line x1="54" y1="192.5" x2="126" y2="192.5" stroke="#3330BA" stroke-width="11"/>
<line x1="231" y1="192.5" x2="296" y2="192.5" stroke="#3330BA" stroke-width="11"/>
<line x1="127.5" y1="184" x2="127.5" y2="150" stroke="#3330BA" stroke-width="11"/>
<line x1="127.5" y1="198" x2="127.5" y2="156" stroke="#3330BA" stroke-width="11"/>
<path d="M151 191.042L181.369 159.618" stroke="#3330BA" stroke-width="11"/>
<line x1="180.712" y1="166.288" x2="204.754" y2="190.329" stroke="#3330BA" stroke-width="10.5"/>
<line x1="188.304" y1="249.66" x2="277.037" y2="267.987" stroke="#3330BA" stroke-width="11"/>
<line x1="74.8876" y1="268.773" x2="167.66" y2="249.614" stroke="#3330BA" stroke-width="11"/>
<line x1="163.5" y1="255" x2="163.5" y2="223" stroke="#3330BA" stroke-width="11"/>
<line x1="192.5" y1="255" x2="192.5" y2="223" stroke="#3330BA" stroke-width="11"/>
<line x1="178.501" y1="285.089" x2="177.501" y2="223.089" stroke="#3330BA" stroke-width="11"/>
<line x1="203.5" y1="221" x2="203.5" y2="187" stroke="#3330BA" stroke-width="11"/>
<line x1="152.5" y1="221" x2="152.5" y2="187" stroke="#3330BA" stroke-width="11"/>
<path d="M226.5 198V155" stroke="#3330BA" stroke-width="11"/>
<line x1="125.505" y1="154.016" x2="182.505" y2="104.016" stroke="#3330BA" stroke-width="10.6"/>
<line x1="179.854" y1="109.177" x2="228.204" y2="159.177" stroke="#3330BA" stroke-width="11"/>
<line x1="178" y1="205" x2="178" y2="222" stroke="#EEEEFF" stroke-width="40"/>
</svg>

          <div className="mt-1">LAUNCHPAD</div>
        </div>
        
    </div>
  
             
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <hr className="w-full inline-block"/>

        <div className="gap-4 w-full mt-[1rem] px-6 ">
        <h2 className="text-2xl font-semibold text-[#000000] mb-2">Profile</h2>
              <label className="block text-[14px] font-semibold text-[#1E1E1E] mb-2">Profile Completion</label>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#3431BB] h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm font-semibold text-gray-500  mt-[1rem]">{progress}% completed</p>
            </div>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-8 h-8 border-4 border-t-transparent border-[#3431BB] border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* First Div */}
           


            {/* Second Div */}
            <div
              id="scroll-container"
              className="space-y-4 mt-4 w-full overflow-y-auto flex-1 px-6 "
            >
              <div>
                <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full h-[44px] border border-gray-300 p-2 rounded-lg  text-sm font-semibold text-[#757575]"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="gap-4 w-full ">
                <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row gap-4 w-full ">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      className="w-full h-[44px] border border-gray-300 p-2 rounded-lg  text-sm font-semibold text-[#757575] px-[2rem]"
                      value={emailData?.email || ""}
                      onChange={handleChange}
                      readOnly
                    />
                    {emailData?.is_email_verified ? (
                      <MdVerified className="absolute top-3.5 left-3 text-green-500" />
                    ) : (
                      <VscUnverified className="absolute top-3.5 left-3   text-red-500" />
                    )}
                  </div>
                  {!emailData?.is_email_verified && (
  <button 
    className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3431BB] text-white hover:bg-blue-700 text-sm" 
    onClick={resendEmail}
  >
    {sentEmailText ? "sending..." : "Resend verification email"}
  </button>
)}

                </div>
              </div>

              <div id="scroll-container" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full overflow-y-auto flex-1">
                {fields.map((field) => renderField(field))}
              </div>
              
            </div> 

            <hr className="w-full mt-[2rem] mb-[2rem]" />
            <div className="flex justify-end mt-2 gap-4 w-full p-4">
  <button
    onClick={onClose}
    className="px-[24px] py-[10px]  text-[14px]  rounded-[12px] border border-gray-300 bg-gray-100 text-black"
  >
    Cancel
  </button>
  <button
    onClick={handleSave}
    className="px-[24px] py-[10px] text-[14px] rounded-[12px] border border-transparent bg-[#3431BB] text-white hover:bg-blue-700"
  >
    Save
  </button>
</div>

          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
