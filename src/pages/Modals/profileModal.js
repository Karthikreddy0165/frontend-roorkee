import { useEffect, useRef, useState,useContext } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import FilterContext from "@/Context/FilterContext";
import { values } from "lodash";



const ProfileModal = ({ onClose }) => {
  const {
    setStates,
    setBeneficiaries,
    statesFromApi
  } = useContext(FilterContext);

  const { authState } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    gender: "",
    community: "",
    minority: "",
    state: "",
    bpl_card_holder: "",
    education: "",
    disability: "",
    occupation: "",
    income: "",
    employment_status: "",
  });
  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState(null);
  const [sentEmailText, setSentEmailText] = useState(false);
  const modalRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fields, setFields] = useState([])
  

  const fieldsCount = Object.keys(profileData).length;



  const resendEmail = async()=>{
    setSentEmailText(true);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        redirect:"follow"
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/resend-verification-email/`, requestOptions)
      const data = await response.json()
      if (response.ok){
        setSentEmailText(false);
      }
    }
    
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
          console.log(pData, "fetching Saved data")

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
    const fetchStateOptions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/choices/state/`
        );
        const data = await response.json();
        const formattedData = data.map((item) => item[0]);
        setStateOptions(formattedData);
      } catch (error) {
        console.error("Error fetching state options:", error);
      }
    };

    const fetchEducationOptions = async () => {
      try {
        const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/choices/education/`
        );
        const data = await response.json();
        const formattedData = data.map((item) => item[0]);
        setEducationOptions(formattedData);
      } catch (error) {
        console.error("Error fetching education options:", error);
      }
    };

    fetchStateOptions();
    fetchEducationOptions();
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile/`,
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
  
        const selectedValue = profileData.state;
        const selectedState = statesFromApi.find(
          (it) => it.state_name === selectedValue
        );
  
        if (selectedState) {
          setStates([[selectedState.id], [selectedState.state_name]]);
        }
  
        if (profileData.community) {
          setBeneficiaries([profileData.community]);
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
              type="number"
              name={field.name.toLowerCase().replace(" ", "_")}
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg text-sm font-semibold text-[#757575]"
              placeholder={field.placeholder || `Enter your ${field.name}`}
              value={profileData[field.name.toLowerCase().replace(" ", "_")] || ""}
              onChange={(e) => handleChange(e, field)}
              min={field.min_value}
              max={field.max_value}
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
        className="bg-white rounded-lg w-[90%] sm:w-[720px] max-h-[90vh] overflow-y-auto p-6 flex flex-col items-start relative"
      >

<div className="flex justify-between items-center mb-2 -mt-2 w-full">
              <h2 className="text-2xl font-semibold text-[#000000]">Profile</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <hr className="w-full inline-block"/>

        <div className="gap-4 w-full mt-[1rem]">
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
              className="space-y-4 mt-4 w-full overflow-y-auto flex-1"
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
                      <MdVerified className="absolute top-3 left-3 text-green-500" />
                    ) : (
                      <VscUnverified className="absolute top-3 left-3   text-red-500" />
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
              {/* <div className="flex flex-col sm:flex-row gap-4 w-full "> */}

                {/* <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="w-full h-[44px] border border-gray-300 p-2 rounded-lg  text-sm font-semibold text-[#757575]"
                    placeholder="Enter your age"
                    value={profileData.age}
                    onChange={handleChange}
                    min="1"
                  />
                </div> */}
                {/* <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full h-[44px] border border-gray-30 p-2 rounded-lg  text-[14px] font-semibold text-[#757575]"
                    value={profileData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div> */}
              {/* </div> */}

              {/* <div className="flex flex-col sm:flex-row gap-4 w-full ">
                <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Category
                  </label>
                  <select
                    name="community"
                    className="w-full h-[44px] border border-gray-300 p-2 rounded-lg  text-sm font-semibold text-[#757575]"
                    value={profileData.community}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                    {/* <option value="ST">ST</option> */}
                  {/* </select>
                </div> */}

                {/* <div className="flex-1"> */}
                  {/* <label className="block mb-2 text-[12px] font-semibold text-black">
                    Minority
                  </label>
                  <select
                    name="minority"
                    className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                    value={profileData.minority}
                    onChange={handleChange}
                  >
                    <option value="">Select minority status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select> */}
                  {/* <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    BPL Card Holder
                  </label>
                  <select
                    name="bpl_card_holder"
                    className="w-full h-[44px] border border-gray-300 p-2 rounded-lg  text-sm font-semibold text-[#757575]"
                    value={profileData.bpl_card_holder}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </div>
              </div> */} 

              {/* <div className="flex flex-col sm:flex-row gap-4 w-full ">
                <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    State of Residence
                  </label>
                  <select
                    name="state"
                    className="w-full h-[44px] border border-gray-30 p-2 rounded-lg  text-[14px] font-semibold text-[#757575]"
                    value={profileData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Disability
                  </label>
                  <select
                    name="disability"
                    className="w-full h-[44px] border border-gray-30 p-2 rounded-lg  text-[14px] font-semibold text-[#757575]"
                    value={profileData.disability}
                    onChange={handleChange}
                  >
                    <option value="">Select disability status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div> */}

              {/* <div className="flex flex-col sm:flex-row gap-4 w-full ">
                <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Education
                  </label>
                  <select
                    name="education"
                    className="w-full h-[44px] border  p-2 rounded-lg bg-gray-10 text-[14px] font-semibold text-[#757575]"
                    value={profileData.education}
                    onChange={handleChange}
                  >
                    <option value="">Select education</option>
                    {educationOptions.map((education) => (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    ))}
                  </select>
                </div> */}


                {/* <div className="flex-1">
                <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Employment
                  </label>
                  <select
                    name="employment_status"
                    className="w-full h-[44px] border  p-2 rounded-lg bg-gray-10 text-[14px] font-semibold text-[#757575]"
                    value={profileData.employment_status}
                    onChange={handleChange}
                  >
                    <option value="">Select Employed Status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-employed">Self-employed / Business</option>
                    <option value="Unemployed">Unemployed</option>
                  </select>
                </div> */}


              {/* </div> */}

              {/* <div className="flex flex-col sm:flex-row gap-4 w-full ">
                <div className="flex-1">
                  <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                    Occupation
                  </label>
                  <select
                    name="occupation"
                    className="w-full h-[44px] border  p-2 rounded-lg bg-gray-10 text-[14px] font-semibold text-[#757575]"
                    value={profileData.occupation}
                    onChange={handleChange}
                  >
                    <option value="">Select occupation</option>
                    <option value="Farmer">Farmer</option>
                    <option value="HouseWife">Housewife</option>
                    <option value="Student">Student</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Arts & Design">Arts & Design</option>
                    <option value="Construction">Construction</option>
                    <option value="Legal">Legal</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Social Services">Social Services</option>
                    <option value="Science & Research">
                      Science & Research
                    </option>
                    <option value="Administration">Administration</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Retail">Retail</option>
                    <option value="Maintenance & Repair">
                      Maintenance & Repair
                    </option>
                    <option value="Public Safety">Public Safety</option>
                    <option value="Government">Government</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Media & Communication">
                      Media & Communication
                    </option>
                    <option value="Skilled Trades">Skilled Trades</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Sports & Recreation">
                      Sports & Recreation
                    </option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Energy & Utilities">
                      Energy & Utilities
                    </option>
                    <option value="Environment & Natural Resources">
                      Environment & Natural Resources
                    </option>
                  </select>
                </div> */}

                {/* <div className="flex-1">
                <label className="block mb-2 text-[14px] font-semibold text-[#000000]">
                  Annual Income (in lakhs)
                </label>
                <select
                    name="occupation"
                    className="w-full h-[44px] border  p-2 rounded-lg bg-gray-10 text-[14px] font-semibold text-[#757575]"
                    value={profileData.occupation}
                    onChange={handleChange}
                  >
                   <option value="">Select Salary Range</option>
                      <option value="100000-200000">1 Lakh - 2 Lakh</option>
                      <option value="200000-300000">2 Lakh - 3 Lakh</option>
                      <option value="300000-400000">3 Lakh - 4 Lakh</option>
                      <option value="400000-500000">4 Lakh - 5 Lakh</option>
                      <option value="500000-600000">5 Lakh - 6 Lakh</option>
                      <option value="600000-700000">6 Lakh - 7 Lakh</option>
                      <option value="700000-800000">7 Lakh - 8 Lakh</option>
                      <option value="800000-900000">8 Lakh - 9 Lakh</option>
                      <option value="900000-1000000">9 Lakh - 10 Lakh</option>
                      <option value="1000000-2000000">10 Lakh - 20 Lakh</option>
                      <option value="2000000-5000000">20 Lakh - 50 Lakh</option>
                      </select>
                </div>*/}
              {/* </div> */}
            </div> 

            <hr className="w-full mt-[2rem] mb-[2rem]" />
            <div className="flex justify-end mt-2 gap-4 w-full">
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
