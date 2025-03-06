import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import SavedModal from "@/components/Modals/savedModal";
import { IoMdClose } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackModal = ({ isOpen, onRequestClose }) => {
  const [rating, setRating] = useState(0);
  const [reportFormData, setReportFormData] = useState({
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useAuth();

  // Handle form data changes
  const handleReportFormChange = (e) => {
    const { name, value } = e.target;
    setReportFormData({ ...reportFormData, [name]: value });
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    const { category, description } = reportFormData;

    if (rating === 0 || !category || !description) {
      setError("Please provide a rating, category, and description.");
      return;
    }

    setLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authState.token}`);

    const raw = JSON.stringify({
      category,
      description,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedback/website-feedback/`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      // Clear form and close modal on success
      setRating(0);

      // Success toast notification
      toast.success("Feedback recieved successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      setReportFormData({ category: "", description: "" });
      onRequestClose();
    } catch (err) {
      // Error toast notification
      toast.error("Failed to give feedback. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
      onRequestClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  console.log(reportFormData);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg w-[80%] max-w-md">
        <div className="bg-[#EEEEFF] p-3 text-black flex items-center justify-between shadow-md">
          {/* Left Section: Logo & Launchpad */}
          <div className="flex items-center ">
            <div className="sm:text-[16px] mt-2 font-semibold text-[#3431BB] text-sm hover:text-blue-700 cursor-pointer flex items-center  gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 350 350"
                fill="none"
              >
                <line
                  x1="178"
                  y1="224.048"
                  x2="178"
                  y2="182"
                  stroke="white"
                  stroke-width="40"
                />
                <rect width="350" height="350" fill="#EEEEFF" />
                <path
                  d="M295.5 250.878C295.5 254.069 293.524 258.023 287.813 262.439C282.176 266.797 273.675 270.96 262.679 274.556C240.746 281.729 210.1 286.257 176 286.257C141.9 286.257 111.254 281.729 89.3212 274.556C78.3248 270.96 69.824 266.797 64.1873 262.439C58.4763 258.023 56.5 254.069 56.5 250.878C56.5 247.688 58.4763 243.733 64.1873 239.318C69.824 234.96 78.3248 230.797 89.3212 227.201C111.254 220.028 141.9 215.5 176 215.5C210.1 215.5 240.746 220.028 262.679 227.201C273.675 230.797 282.176 234.96 287.813 239.318C293.524 243.733 295.5 247.688 295.5 250.878Z"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <path
                  d="M295.745 189.052C296.816 172.185 294.51 155.271 288.97 139.35C283.43 123.429 274.772 108.836 263.528 96.4695C252.284 84.1026 238.691 74.2221 223.585 67.435C208.479 60.6479 192.178 57.0975 175.684 57.002C159.19 56.9064 142.851 60.2677 127.671 66.8794C112.491 73.491 98.7902 83.2134 87.4105 95.4492C76.0307 107.685 67.2122 122.176 61.4967 138.032C55.7812 153.888 53.2893 170.774 54.1743 187.653L66.2569 186.987C65.4604 171.797 67.7031 156.599 72.847 142.329C77.991 128.058 85.9276 115.017 96.1694 104.004C106.411 92.992 118.742 84.2419 132.404 78.2914C146.066 72.341 160.771 69.3158 175.616 69.4018C190.46 69.4878 205.131 72.6831 218.726 78.7915C232.322 84.8999 244.555 93.7923 254.675 104.923C264.795 116.053 272.587 129.186 277.573 143.515C282.559 157.844 284.634 173.066 283.67 188.247L295.745 189.052Z"
                  fill="#3330BA"
                />
                <line
                  x1="54"
                  y1="192.5"
                  x2="126"
                  y2="192.5"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="231"
                  y1="192.5"
                  x2="296"
                  y2="192.5"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="127.5"
                  y1="184"
                  x2="127.5"
                  y2="150"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="127.5"
                  y1="198"
                  x2="127.5"
                  y2="156"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <path
                  d="M151 191.042L181.369 159.618"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="180.712"
                  y1="166.288"
                  x2="204.754"
                  y2="190.329"
                  stroke="#3330BA"
                  stroke-width="10.5"
                />
                <line
                  x1="188.304"
                  y1="249.66"
                  x2="277.037"
                  y2="267.987"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="74.8876"
                  y1="268.773"
                  x2="167.66"
                  y2="249.614"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="163.5"
                  y1="255"
                  x2="163.5"
                  y2="223"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="192.5"
                  y1="255"
                  x2="192.5"
                  y2="223"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="178.501"
                  y1="285.089"
                  x2="177.501"
                  y2="223.089"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="203.5"
                  y1="221"
                  x2="203.5"
                  y2="187"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="152.5"
                  y1="221"
                  x2="152.5"
                  y2="187"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <path d="M226.5 198V155" stroke="#3330BA" stroke-width="11" />
                <line
                  x1="125.505"
                  y1="154.016"
                  x2="182.505"
                  y2="104.016"
                  stroke="#3330BA"
                  stroke-width="10.6"
                />
                <line
                  x1="179.854"
                  y1="109.177"
                  x2="228.204"
                  y2="159.177"
                  stroke="#3330BA"
                  stroke-width="11"
                />
                <line
                  x1="178"
                  y1="205"
                  x2="178"
                  y2="222"
                  stroke="#EEEEFF"
                  stroke-width="40"
                />
              </svg>

              <div className="mt-1">LAUNCHPAD</div>
            </div>
            <button
              className="absolute top-3 right-0 p-[18px] text-lg hover:text-red-500"
              onClick={onRequestClose}
            >
              <IoMdClose className="w-[24px] h-[24px]" />
            </button>
          </div>

          {/* Center Section: Profile */}

          {/* Right Section: Close Button */}
        </div>
        <h2 className="text-[20px] text-[#3330BA] font-bold mb-4 text-center mt-[1rem]">
          Feedback Form
        </h2>
        {error && (
          <div className="text-red-500 text-center text-sm mb-4">{error}</div>
        )}

        {/* Star Rating */}
        <div className="flex justify-center p-[1rem] mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-[40px] h-[40px] cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => handleRatingChange(star)}
            >
              <path d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l4.46 4.73L3.82 19z" />
            </svg>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="mb-4 pt-[1rem] px-5 pb-[1rem]">
          <label className="block text-[13px] text-[#000000] font-semibold mb-2">
            Select the category
          </label>
          <select
            name="category"
            value={reportFormData.category}
            onChange={handleReportFormChange}
            required
            className="w-full p-2 border text-sm rounded-md text-[#000000]"
          >
            <option value="">Select Category</option>
            <option value="bug">Issue</option>
            <option value="improvement">Improvement</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="mb-4 px-5">
          <label className="block text-[13px] text-[#000000] font-semibold mb-2">
            Please write your feedback below. 
          </label>
          <textarea
            name="description"
            value={reportFormData.description}
            onChange={handleReportFormChange}
            required
            rows="4"
            placeholder="Here is your answer..."
            className="w-full p-2 border rounded-md text-[#000000]"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center items-centre p-5 h-full">
          <button
            onClick={handleSubmitFeedback}
            className=" px-4 py-2 rounded-lg text-[13px] bg-[#3330BA] text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeedbackButtonFooter = () => {
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button className="text-lg" onClick={() => setModalOpen(true)}>
        Feedback
      </button>
      ;
      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </>
  );
};

const FeedbackButton = ({ className }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { authState } = useAuth();

  const handleFeedbackClick = () => {
    if (!authState?.token) {
      setIsSavedModalOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <button
        className={
          className
            ? className
            : "w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
        }
        onClick={handleFeedbackClick}
      >
        {!className && <FiAlertCircle size={20} />}
        Feedback
      </button>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />

      {/* Saved Modal */}
      {isSavedModalOpen && (
        <SavedModal
          isOpen={isSavedModalOpen}
          onRequestClose={() => setIsSavedModalOpen(false)}
          heading={"Feedback"}
          tag={"give feedback"}
        />
      )}
    </>
  );
};

export default FeedbackButton;
