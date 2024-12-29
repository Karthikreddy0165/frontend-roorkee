import React from "react";

const ToolTips = ({ children, tooltip }) => {
  return (
    <div className="group relative inline-block text-[12px]">
      {children}
      {tooltip && (
        <span
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-100 text-[12px] p-2 rounded text-sm absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-10 border rounded"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {/* Tooltip Text */}
          {tooltip}

          {/* Tooltip Arrow */}
          <span className="tooltip-arrow absolute top-[-5px] left-1/2 transform -translate-x-1/2"></span>
        </span>
      )}
    </div>
  );
};

export default ToolTips;
