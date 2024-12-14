import { useEffect, useRef, useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import FilterContext from "@/Context/FilterContext";

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

  const resendEmail = async () => {
    setSentEmailText(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      redirect: "follow"
    };
    const response = await fetch("http://3.109.208.148:8000/api/resend-verification-email/", requestOptions)
    const data = await response.json();
    if (response.ok) {
      setSentEmailText(false);
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
            "http://3.109.208.148:8000/api/user/profile/",
            requestOptions
          );
          const pData = await profileResponse.json();
          setProfileData({
            name: pData.name || "",
            age: pData.age || "",
            gender: pData.gender || "",
            community: pData.category || "",
            minority: pData.minority === true ? "Yes" : "No",
            state: pData.state_of_residence || "",
            bpl_card_holder: pData.bpl_card_holder || "",
            education: pData.education || "",
            disability: pData.disability === true ? "Yes" : "No",
            occupation: pData.occupation || "",
            income: pData.income || "",
            employment_status: pData.employment_status || ""
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
          "http://3.109.208.148:8000/api/choices/state/"
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
          "http://3.109.208.148:8000/api/choices/education/"
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
            "http://3.109.208.148:8000/api/user/me/",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (authState.token) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      };

      try {
        await fetch("http://3.109.208.148:8000/api/user/profile/", {
          ...requestOptions,
          body: JSON.stringify({
            name: profileData.name,
            gender: profileData.gender,
            age: profileData.age,
            category: profileData.community,
            state_of_residence: profileData.state,
            minority: profileData.minority === "Yes",
            disability: profileData.disability === "Yes",
            bpl_card_holder: profileData.bpl_card_holder,
            education: profileData.education,
            occupation: profileData.occupation,
            income: profileData.income,
            employment_status: profileData.employment_status
          })
        });

        localStorage.setItem("profiledata", JSON.stringify(profileData));
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg sm:w-[90%] lg:w-[560px] max-h-[80vh] p-6 flex flex-col items-start overflow-y-auto relative"
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2 -mt-2 w-full">
              <h2 className="text-2xl font-semibold text-[#0A0A0A]">Profile</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <hr className="w-full" />

            <div
              id="scroll-container"
              className="space-y-4 mt-4 w-full"
            >
              {/* Profile Fields */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Email</label>
                <input
                  type="text"
                  value={emailData ? emailData.email : ""}
                  className="block w-full p-3 border rounded-md bg-gray-200 cursor-not-allowed"
                  disabled
                />
                {!emailData?.email_verified && (
                  <div className="flex items-center gap-2 text-xs text-red-500 mt-2">
                    <VscUnverified />
                    <span>Your email is not verified.</span>
                    <button
                      onClick={resendEmail}
                      disabled={sentEmailText}
                      className="text-[#3431Bb] underline"
                    >
                      Resend verification
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Age</label>
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Gender</label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Community</label>
                <input
                  type="text"
                  name="community"
                  value={profileData.community}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Minority</label>
                <select
                  name="minority"
                  value={profileData.minority}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">State</label>
                <select
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                <label className="block mb-2 text-sm font-semibold text-black">BPL Card Holder</label>
                <input
                  type="text"
                  name="bpl_card_holder"
                  value={profileData.bpl_card_holder}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                />
              </div> */}

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Education</label>
                <select
                  name="education"
                  value={profileData.education}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                >
                  <option value="">Select Education</option>
                  {educationOptions.map((education) => (
                    <option key={education} value={education}>
                      {education}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Disability</label>
                <select
                  name="disability"
                  value={profileData.disability}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
  {/* Dropdown for Occupation */}
  <div className="flex-1">
    <label className="block mb-2 text-[12px] md:text-sm font-semibold text-black">
      Occupation
    </label>
    <select
      name="occupation"
      className="w-full h-[44px] md:h-[50px] border border-gray-300 p-2 md:p-3 rounded-lg bg-gray-100 text-[12px] md:text-sm font-semibold text-black"
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
      <option value="Science & Research">Science & Research</option>
      <option value="Administration">Administration</option>
      <option value="Agriculture">Agriculture</option>
      <option value="Retail">Retail</option>
      <option value="Maintenance & Repair">Maintenance & Repair</option>
      <option value="Public Safety">Public Safety</option>
      <option value="Government">Government</option>
      <option value="Real Estate">Real Estate</option>
      <option value="Media & Communication">Media & Communication</option>
      <option value="Skilled Trades">Skilled Trades</option>
      <option value="Consulting">Consulting</option>
      <option value="Sports & Recreation">Sports & Recreation</option>
      <option value="Non-Profit">Non-Profit</option>
      <option value="Human Resources">Human Resources</option>
      <option value="Energy & Utilities">Energy & Utilities</option>
      <option value="Environment & Natural Resources">
        Environment & Natural Resources
      </option>
    </select>
  </div>

  {/* Input for Occupation */}
  <div>
    <label className="block mb-2 text-[12px] md:text-sm font-semibold text-black">
      Occupation
    </label>
    <input
      type="text"
      name="occupation"
      value={profileData.occupation}
      onChange={handleChange}
      className="block w-full h-[44px] md:h-[50px] p-2 md:p-3 border rounded-md text-[12px] md:text-sm"
    />
  </div>
</div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-black">Income</label>
                <input
                  type="number"
                  name="income"
                  value={profileData.income}
                  onChange={handleChange}
                  className="block w-full p-3 border rounded-md"
                />
              </div>

              <div className="flex-1">
  <label className="block mb-2 text-[12px] md:text-sm font-semibold text-black">
    Employment
  </label>
  <select
    name="employment_status"
    className="w-full h-[44px] md:h-[50px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-[12px] md:text-sm font-semibold text-black"
    value={profileData.employment_status}
    onChange={handleChange}
  >
    <option value="">Select Employed Status</option>
    <option value="Employed">Employed</option>
    <option value="Self-employed">Self-employed / Business</option>
    <option value="Unemployed">Unemployed</option>
  </select>
</div>

<div className="flex-1">
  <label className="block mb-2 text-[12px] md:text-sm font-semibold text-black">
    BPL Card Holder
  </label>
  <select
    name="bpl_card_holder"
    className="w-full h-[44px] md:h-[50px] border border-gray-300 p-2 md:p-3 rounded-lg bg-gray-100 text-[12px] md:text-sm font-semibold text-black"
    value={profileData.bpl_card_holder}
    onChange={handleChange}
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    <option value="Maybe">Maybe</option>
  </select>
</div>



              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={handleSave}
                  className="bg-[#3431Bb] text-white px-6 py-2 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;


