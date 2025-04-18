import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {usePrivacy} from '../../Context/PrivacyContext'

const PrivacyModal = ({ isOpen, onClose }) => {
  const 
  { cookiesConsent,
    setCookiesConsent,
    infoUsage,
    setInfoUsage,
    infoSharing,
    setInfoSharing,
    handleRejectAll
  } = usePrivacy();

  if (!isOpen) return null;



  const handleSubmit = () => {
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      onClick={onClose}
      data-testid="privacy-modal-overlay"
    >
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid="privacy-modal-content"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-[#2B3E80]">
            Privacy Preferences
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#2B3E80] mb-4">
                Consent Preferences
              </h2>
              <p className="text-gray-700 mb-6">
                Please select your privacy preferences below. You can choose which types of cookies and data processing you allow.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    Strictly Necessary Cookies
                  </span>
                  <span className="text-[#838383] font-medium">Always Active</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">
                    Cookies & Tracking Technologies
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={cookiesConsent}
                      onChange={() => setCookiesConsent(!cookiesConsent)}
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#2B3E80] rounded-full peer-checked:bg-[#2B3E80] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Information Usage</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={infoUsage}
                      onChange={() => setInfoUsage(!infoUsage)}
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#2B3E80] rounded-full peer-checked:bg-[#2B3E80] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Information Sharing</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={infoSharing}
                      onChange={() => setInfoSharing(!infoSharing)}
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-[#2B3E80] rounded-full peer-checked:bg-[#2B3E80] peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors"
            onClick={handleRejectAll}
          >
            Reject All
          </button>
          <button
            className="bg-[#2B3E80] text-white px-4 py-2 rounded-lg hover:bg-[#1e2f66] shadow-md transition-colors"
            onClick={handleSubmit}
          >
            Submit My Choices
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;

