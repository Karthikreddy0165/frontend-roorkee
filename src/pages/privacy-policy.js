import BackButton from "@/components/ComponentsUtils/BackButton";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function PrivacyPolicy() {
  const [infoUsage, setInfoUsage] = useState(false);
  const [infoSharing, setInfoSharing] = useState(false);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#EEEEFF]  flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg transform -translate-y-12">
  <div className="flex items-center justify-center relative">
    <div className="absolute left-0">
      <BackButton />
    </div>
    <h1 className="text-2xl text-[#3330BA] font-bold text-center w-full">
      Privacy Policy
    </h1>
  </div>

  <p className="text-gray-600 mb-4 py-5 border-b">
    This Privacy Policy outlines the types of personal information that is
    collected and received by our website and how it is used. We value your
    privacy and are committed to protecting your personal information in
    accordance with applicable laws and regulations.
  </p>



          <div>
            <button className="bg-[#3330BA] text-white px-4 py-2 rounded-lg hover:bg-gray-500">
              Allow all
            </button>
          </div>

          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-4">
              Manage Consent Preferences
            </h2>

            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 font-medium">
                Strictly Necessary Cookies
              </span>
              <span className="text-[#838383] font-medium">Always Active</span>
            </div>

            <div className="flex items-center justify-between py-2 ">
              <span className="text-gray-700">
                Cookies and Tracking Technologies
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#3330BA] rounded-full peer-checked:bg-[#3330BA] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Information Usage</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={infoUsage}
                  onChange={() => setInfoUsage(!infoUsage)}
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#3330BA] rounded-full peer-checked:bg-[#3330BA] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">Information Sharing</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={infoSharing}
                  onChange={() => setInfoSharing(!infoSharing)}
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#3330BA] rounded-full peer-checked:bg-[#3330BA] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>

          <div className="flex gap-[16px] mt-6">
            <button className="bg-[#3330BA] text-white px-4 py-2 rounded-lg hover:bg-purple-700">
               Reject all
            </button>
            <button className="bg-[#3330BA] text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Submit My Choices
            </button>
          </div>
        </div>
      </div>
     
    </>
  );
}
