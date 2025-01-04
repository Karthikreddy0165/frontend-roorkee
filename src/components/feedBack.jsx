import React, { useState } from "react";

const FeedbackModal = ({ isOpen, onRequestClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the rating change
  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    if (rating === 0 || feedback === "") {
      setError("Please provide a rating and feedback.");
      return;
    }

    setLoading(true);

    // Prepare the request headers
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTczNTg4LCJpYXQiOjE3MzUxMDk1ODgsImp0aSI6ImVjOGI1NWQ2YjMzOTQyZTY5NGVlNWIzOTAwNDJlODJkIiwidXNlcl9pZCI6MX0.2emHvQsagNbIpHpSuC6nlAEy-_p5Q4xFFFSymvUPxE4"
    );

    // Prepare the body data to be sent
    const raw = JSON.stringify({
      rating: rating,
      description: feedback,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      // Make the API call to submit feedback
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedback/website-feedback/`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback.");
      }

      // Clear form on successful submission
      setRating(0);
      setFeedback("");
      onRequestClose(); // Close the modal
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-[80%] max-w-md">
        <h2 className="text-xl text-[#3330BA] font-bold mb-4 text-center">
          Feedback Form
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-centre text-sm mb-4">{error}</div>
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
              <path
                fillRule="evenodd"
                d="M10 15.27L16.18 19l-1.64-7.03L19 7.24l-7.19-.61L10 0 8.19 6.63 1 7.24l4.46 4.73L3.82 19z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>

        {/* Feedback Textarea */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="4"
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleSubmitFeedback}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-[#3330BA] text-white hover:bg-blue-700 text-[12px] sm:text-sm"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
          <button
            onClick={onRequestClose}
            className="flex-shrink-0 px-4 py-2 rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 text-[12px] sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOptionClick = (option) => {
    if (option === "feeBack") {
      setModalOpen(true);
    }
  };

  return (
    <>
      <button
        className="w-full text-left p-3 text-[14px] hover:bg-[#EEEEFF] hover:border-l-[3px] hover:border-[#3431BB] flex items-center gap-2"
        onClick={() => handleOptionClick("feeBack")}
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

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default FeedbackButton;
