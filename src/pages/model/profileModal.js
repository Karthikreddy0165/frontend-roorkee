import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuth } from "../AuthContext";

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
      <div className="bg-white rounded-lg w-1/2 p-6 relative z-60">
        {/* First Div */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center"
          >
            <MdClose className="w-[25px] h-[25px]"/>
          </button>
        </div>
        
        <hr />

        {/* Second Div */}
        <div className="space-y-4 mt-4">
        <div>
            <label className="block mb-2">User Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your username"
              value={userName}
            />
          </div>

          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Age</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your age"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Gender</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your gender"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Category</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your category"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Minority</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your minority status"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">State</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your state"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Residency</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your residency"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Employment</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your employment status"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Gov. Employment</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your gov. employment status"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Occupation</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your occupation"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Annual Income</label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded-lg"
                placeholder="Enter your annual income"
              />
            </div>
          </div>
        </div>
        
        <hr className="mt-8"/>

        {/* Third Div */}
        <div className="flex justify-end mt-6">
          <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
