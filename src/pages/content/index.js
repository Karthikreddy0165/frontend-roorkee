import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import ShareModal from "./shareModel";

const ApplyModal = ({ isOpen, onRequestClose, scheme }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!isOpen) return null;

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none pr-8 pl-8">
      <div className="absolute right-0">
        <div className="bg-white w-full max-w-2xl p-8 mt-8 rounded-lg relative border border-gray-200 shadow-lg shadow-black-400 pointer-events-auto">
          {/* Close button */}
          <button
            className="absolute top-8 right-4 p-4 text-lg transition duration-300 ease-in-out hover:text-red-500"
            onClick={onRequestClose}
          >
            <IoMdClose className="w-[24px] h-[24px]" />
          </button>

          <div className="flex flex-col items-center min-h-screen bg-white overflow-y-auto max-h-[calc(100vh-8rem)]">
            {/* Scheme name */}
            <div className="pt-2 w-full sm:max-w-3xl flex justify-between items-center">
              <h1 className="mr-4 text-[20px] font-bold leading-normal font-inter text-[#0A0A0A]">
                {scheme.title || "Data is not available"}
              </h1>
            </div>
            {/* Last update date */}
            <div className="w-full sm:max-w-3xl">
              <div className="inline-block bg-[#EEF] rounded-[12px] mt-2">
                <p className="py-0.5 px-2 text-black text-sm">
                  Last updates on 12.09.2024
                  {/* {scheme.introduced_on && `Last updates on ${scheme.introduced_on}`} */}
                </p>
              </div>
            </div>

            {/* Main data section */}
            <div className="mt-8 space-y-4 w-full sm:max-w-3xl p-4">
              <div className="flex items-start pb-2">
                <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Department </h1>
                <p className="ml-2 flex-1">
                  {scheme.department || "Data is not available"}
                </p>
              </div>
              <hr />

              <div className="flex items-start pb-2 pt-2">
                <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Title</h1>
                <p className="ml-2 flex-1">
                  {scheme.title || "Data is not available"}
                </p>
              </div>
              <hr/>


              <div className="flex items-start pb-2 pt-2">
                <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Who can apply</h1>
                <p className="ml-2 flex-1">
                  {scheme.beneficiaries || "Data is not available"}
                </p>
              </div>
              <hr />

              <div className="flex items-start pb-2 pt-2">
                <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">
                  Eligibility criteria
                </h1>
                <p className="ml-2 flex-1">
                  {scheme.how_to_avail || "Data is not available"}
                </p>
              </div>
              <hr />

              <div className="flex items-start pb-2 pt-2">
                <h1 className="w-36 text-[14px] font-semibold leading-normal font-inter text-black">Uploaded file</h1>
                <p className="ml-2 flex-1">
                  {scheme.how_to_avail || "File not available"}
                </p>
              </div>
              <hr />
            </div>

            {/* Apply button */}
            <div>
              <div className="absolute z-50 bottom-8 right-8 w-100 mb-[70px]">
                {scheme.url && (
                  <a
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-12 bg-blue-800 text-white font-semibold rounded-[10px] transition hover:bg-red-500"
                  >
                    Apply
                  </a>
                )}
              </div>
            </div>

            {/* Share button */}
            {/* <div>
              <button
                className="flex items-center py-2 px-4 rounded transition duration-300 ease-in-out hover:text-red-500"
                onClick={toggleShareModal}
              >
                <FaShare className="h-5 w-5 mr-2" />
                Share scheme
              </button>
            </div> */}

            {/* Share Modal */}
            <ShareModal
              isOpen={isShareModalOpen}
              onRequestClose={toggleShareModal}
              shareUrl={
                typeof window !== "undefined" ? window.location.href : ""
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
