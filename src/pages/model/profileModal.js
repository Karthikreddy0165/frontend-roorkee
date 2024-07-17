import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../Context/AuthContext";

const ProfileModal = ({ onClose }) => {
  const { authState } = useAuth(); // Get the authenticated user's information from context
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (authState.user) {
      setUserName(authState.user.username);
    }
  }, [authState.user]);

  useEffect(() => {
    // Add the class to disable scrolling
    document.body.classList.add("overflow-hidden");

    // Cleanup function to remove the class when the modal is unmounted
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[560px] h-[750px] p-6 flex flex-col items-start flex-shrink-0 relative">
        {/* First Div */}
        <div className="flex justify-between items-center mb-2 w-full">
          <h2 className="text-[28px] font-semibold text-[#0A0A0A]">Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
          >
            <MdClose className="w-[25px] h-[25px]"/>
          </button>
        </div>
        
        <hr className="w-full" />

        {/* Second Div */}
        <div className="space-y-4 mt-4 w-full">
          <div>
            <label className="block mb-2 text-[12px] font-semibold text-black">User Name</label>
            <input
              type="text"
              className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
              placeholder="Enter your username"
              value={userName}
            />
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Age</label>
              <input
                type="number"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your age"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Gender</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your gender"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Category</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your category"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Minority</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your minority status"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">State</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your state"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Residency</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your residency"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Employment</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your employment status"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Gov. Employment</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your gov. employment status"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Occupation</label>
              <input
                type="text"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your occupation"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-[12px] font-semibold text-black">Annual Income</label>
              <input
                type="number"
                className="w-full h-[44px] border border-gray-30 p-2 rounded-lg bg-gray-10 text-[12px] font-semibold text-black"
                placeholder="Enter your annual income"
              />
            </div>
          </div>
        </div>
        
        <hr className="w-full mt-8"/>

        {/* Third Div */}
        <div className="flex justify-end mt-6 w-full gap-[16px]">
        <button className=" h-[52px] pt-[10px] pb-[10px] pl-[44px] pr-[44px] text-[#3431BB] py-2 px-4 rounded-lg hover:bg text-center text-[16px] font-bold border-[1px] border-[#3431BB]">
        Discard changes
          </button>

          <button className="bg-[#3431BB] h-[52px] pt-[10px] pb-[10px] pl-[44px] pr-[44px] text-white py-2 px-4 rounded-lg hover:bg-blue-800 text-center text-[16px] font-bold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
