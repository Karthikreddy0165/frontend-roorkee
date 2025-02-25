import { useState, useEffect } from "react";
const Progress = ({ value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="bg-white p-4  rounded-lg flex items-center space-x-4">
      {/* Circular Progress Bar */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          {/* Background Circle */}
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="3.8"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
          {/* Foreground Progress Circle */}
          <circle
            className="text-blue-600 stroke-current transition-all duration-500 ease-in-out"
            strokeWidth="3.8"
            strokeDasharray={`${value}, 100`}
            strokeLinecap="round"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
          />
        </svg>
        <span className="absolute text-sm font-bold">{value}%</span>
      </div>

      {/* Heading and Details */}
    </div>
  );
};
const Input = ({ placeholder }) => {
  return (
    <div className="flex items-center border p-4 bg-white rounded-2xl w-1/5 h-[45px] space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-5 h-5 text-gray-500"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none w-full"
      />
    </div>
  );
};

const Button = ({ children }) => (
  <button className="bg-white text-white px-4 py-2 rounded-2xl text-black">
    {children}
  </button>
);

export { Progress, Input, Button };
