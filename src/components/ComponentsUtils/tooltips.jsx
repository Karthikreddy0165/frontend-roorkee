import React from "react";

const ToolTips = ({ children, tooltip }) => {
  return (
    <div className="group relative inline-block">
      {children}
      {tooltip && (
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out bg-gray-600 text-white text-xs px-3 py-2 rounded-md absolute right-full mr-2 top-1/2 transform -translate-y-[70px] z-50 shadow-lg w-full">
          {tooltip}

          <div
            className="absolute top-1/2 left-full w-0 h-0 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-800"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default ToolTips;
