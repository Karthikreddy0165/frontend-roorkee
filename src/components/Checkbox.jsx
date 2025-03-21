import React from "react";

const Checkbox = ({ id, label, checked, onChange, className }) => {
  const handleToggle = () => {
    onChange({ target: { name: id, value: !checked } });
  };
  return (
    <div className={`flex items-center space-x-2 cursor-pointer ${className}`} onClick={handleToggle}>
      {/* Hidden Checkbox Input */}
      <input
        type="checkbox"
        id={id}
        className="hidden peer"
        checked={checked}
        onChange={handleToggle}
      />

      {/* Custom Checkbox UI */}
      <div
        className={`w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center 
          ${checked ? "bg-blue-500 border-blue-500" : ""} 
          transition-all duration-300 ease-in-out`}
        aria-hidden="true"
      >
        <svg
          className={`w-4 h-4 text-white opacity-0 ${checked ? "opacity-100" : ""}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Label (Clicking this will also toggle the checkbox) */}
      <label htmlFor={id} className="text-gray-700 cursor-pointer" onClick={onChange}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
