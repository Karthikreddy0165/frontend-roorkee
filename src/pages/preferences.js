import FilterContext from "@/Context/FilterContext";
import Router from "next/router";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";

const preferencesModal = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const { states, setStates, statesFromApi, setBeneficiaries } = useContext(FilterContext);

  const handleOnClickApplyPreferences = () => {
    Router.push("/schemes");
  };

  const handleClickToSchemePage=()=>{
    Router.push("/schemes")
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderChange = (e) => {
    const { value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      income: value,
    }));
  };
  // console.log("authstate in profile", authState);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#3431BB] bg-opacity-10 z-50">
      <div className="bg-white rounded-lg w-[720px] h-[750px] p-6 flex flex-col items-start flex-shrink-0 relative">
        <>
          {/* First Div */}
          <div className="flex justify-between items-center mb-2 -mt-2 w-full">
            <h2 className="text-2xl font-semibold text-[#0A0A0A]">
              Tell us a little more about yourself
            </h2>
            <button
              onClick={handleClickToSchemePage}
              className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <p>
            Knowing you will help us find relevant schemes and job opportunities
            for you
          </p>

          {/* Second Div */}
          <div
            id="scroll-container"
            className="space-y-4 mt-4 w-full overflow-y-auto"
          >
            <div className="flex gap-4 w-full ">
              <div className="flex-1 mb-4">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  placeholder="Enter your age"
                  // value={profileData.age}
                  // onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  Gender
                </label>
                <select
                  name="gender"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  // value={profileData.gender}
                  // onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex-1 mb-4">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  Category
                </label>
                <select
                  name="community"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  // value={profileData.community}
                  onChange={(e)=>{
                    setBeneficiaries([e.target.value]);
                  }}
                >
                  <option value="">Select category</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC/ST</option>
                </select>
              </div>

              <div className="flex-1 mb-4">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  State
                </label>
                <select
                  name="state"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  // value={profileData.state}
                  // onChange={handleChange}
                  onChange={(e) => {
                    statesFromApi.map(it => {
                      if(e.target.value == it.id){
                        setStates((prev) => {
                          return [[it.id], [it.state_name]]
                        })
                      }
                    });
                  }}
                >
                  <option value="">Select state</option>
                  {statesFromApi.map((state, index) => (
                    <option
                      key={index}
                      value={state.id}
                    >
                      {state.state_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex-1 mb-4">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  Employment
                </label>
                <select
                  name="community"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  // value={profileData.employment}
                  // onChange={handleChange}
                >
                  <option value="">Select Employed Status</option>
                  <option value="General">Employed</option>
                  <option value="OBC">Self-employed / Business</option>
                  <option value="SC">Unemployed</option>
                </select>
              </div>
              <div className="flex-1 mb-4">
                <label className="block mb-2 text-[12px] font-semibold text-black">
                  Occupation
                </label>
                <select
                  name="occupation"
                  className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                  // value={profileData.occupation}
                  // onChange={handleChange}
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
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Environment & Natural Resources">
                    Environment & Natural Resources
                  </option>
                </select>
              </div>
            </div>

            <div className="flex-1 mb-4">
              <label className="block mb-2 text-[12px] font-semibold text-black">
                Annual Income (in lakhs)
              </label>
              <input
                type="text"
                name="income"
                className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 text-[12px] font-semibold text-black"
                placeholder="Enter your income"
                // value={profileData.income}
                // onChange={handleChange}
              />
              
            </div>
          </div>

          <div className="flex p-2 items-end gap-2 self-stretch rounded bg-[#EEF] mt-4 mb-4">
            You can edit your details later as well.
          </div>

          {/* Third Div */}
          <div className="flex  mt-2 gap-4 w-full">
            <button
              onClick={handleOnClickApplyPreferences}
              className="px-4 py-2 rounded-lg border border-transparent bg-[#3431BB] text-white hover:bg-blue-700"
            >
              Apply preferences
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default preferencesModal;
