import React, { useState, useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
import SavedModal from "@/pages/Modals/savedModal";
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
      toast.success("Feedback recieved successfully", { position: "top-right", autoClose: 3000 });

      setReportFormData({ category: "", description: "" });
      onRequestClose();
    } catch (err) {
          // Error toast notification
    toast.error("Failed to give feedback. Please try again later.", { position: "top-right", autoClose: 3000 });
    onRequestClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  console.log(reportFormData);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg w-[80%] max-w-md">
        <button
          className="absolute top-0 right-0 p-[18px] text-lg hover:text-red-500"
          onClick={onRequestClose}
        >
          <IoMdClose className="w-[24px] h-[24px]" />
        </button>
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
        <div className="mb-4 pt-[1rem] pb-[1rem]">
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

        <div className="mb-4">
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
        <div className="flex justify-center items-centre h-full">
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
