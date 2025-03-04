import FilterContext from "@/Context/FilterContext";
import Router from "next/router";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import logo from "../../assets/changedlogo.svg"
const PreferencesModal = () => {
  const [stateOptions, setStateOptions] = useState([]);
  const { states, setStates, statesFromApi, setBeneficiaries } = useContext(FilterContext);

  const handleOnClickApplyPreferences = () => {
    Router.push("/AllSchemes");
  };

  const handleClickToSchemePage = () => {
    Router.push("/AllSchemes");
  };

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

  return (
/* Inside your modal container */
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md z-50">
  {/* Modal Container */}
  
  <div className="flex flex-col bg-white shadow-xl w-[90%] sm:w-[720px] max-h-[85vh] overflow-hidden animate-fadeIn rounded-xl">
  
  {/* Navbar Inside Modal */}
  <div className="bg-[#EEEEFF] text-black flex items-center justify-between py-2 px-6 shadow-md">
    
    {/* Left Section: Logo & Launchpad */}
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

    {/* Center Section: Profile */}
  

    {/* Right Section: Close Button */}
    <button onClick={handleClickToSchemePage} className="text-black hover:text-gray-500">
      <MdClose className="w-6 h-6" />
    </button>
  </div>

  {/* Modal Content */}
  <div className="p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">
      Tell us a little more about yourself
    </h2>
    <p className="text-sm text-gray-600">
      Knowing you will help us find relevant schemes and job opportunities for you.
    </p>
  </div>




    {/* Modal Body */}
    <div className="p-6 overflow-y-auto flex-1">
     

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Age & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Age</label>
            <input
              type="number"
              className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Gender</label>
            <select className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Category & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Category</label>
            <select className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300">
              <option value="">Select category</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC/ST</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">State</label>
            <select className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300">
              <option value="">Select state</option>
              {statesFromApi.map((state, index) => (
                <option key={index} value={state.id}>{state.state_name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employment & Occupation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Employment</label>
            <select className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300">
              <option value="">Select Employment Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed / Business</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Occupation</label>
            <select className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300">
              <option value="">Select occupation</option>
              <option value="Student">Student</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Income */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">Annual Income (in lakhs)</label>
          <input
            type="text"
            className="w-full h-[44px] border border-gray-300 p-2 rounded-lg bg-gray-100 focus:ring focus:ring-blue-300"
            placeholder="Enter your income"
          />
        </div>
      </div>

      {/* Footer Message */}
      <div className="flex items-center gap-2 bg-[#EEEEFF] text-gray-700 p-3 rounded-lg mt-4">
        <span>ℹ️</span> You can edit your details later as well.
      </div>

      {/* Apply Button */}
      <div className="flex mt-4">
        <button
          onClick={handleOnClickApplyPreferences}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-[#3431BB] text-white font-semibold hover:bg-blue-700 transition-all"
        >
          Apply Preferences
        </button>
      </div>
    </div>
  </div>
</div>


  );
};

export default PreferencesModal;
