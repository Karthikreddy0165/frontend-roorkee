import React, { useState } from "react";
import { useAuth } from "@/Context/AuthContext";


const FeedbackModal = ({ isOpen, onRequestClose }) => {
  const [rating, setRating] = useState(0);
  const [reportFormData, setReportFormData] = useState({
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {authState} = useAuth()

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
    myHeaders.append(
      "Authorization",
      `Bearer ${authState.token}`
    );

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
      setReportFormData({ category: "", description: "" });
      onRequestClose();
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  console.log(reportFormData);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-[80%] max-w-md">
        <h2 className="text-xl text-[#3330BA] font-bold mb-4 text-center">
          Feedback Form
        </h2>

        {error && (
          <div className="text-red-500 text-center text-sm mb-4">{error}</div>
        )}

        {/* Star Rating */}
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-6 h-6 cursor-pointer ${
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
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="category"
            value={reportFormData.category}
            onChange={handleReportFormChange}
            required
            className="w-full p-2 border text-sm rounded-md"
          >
            <option value="">Select Category</option>
            <option value="bug">Bug</option>
            <option value="improvement">Improvement</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={reportFormData.description}
            onChange={handleReportFormChange}
            required
            rows="4"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSubmitFeedback}
            className="px-2 py-2 rounded-lg bg-[#3330BA] text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
          <button
            onClick={onRequestClose}
            className="px-2 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeedbackButtonFooter = () => {
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

const FeedbackButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
        onClick={() => setModalOpen(true)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Feedback
      </button>

      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default FeedbackButton;
