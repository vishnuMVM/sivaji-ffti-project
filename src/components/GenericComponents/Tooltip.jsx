import React, { useState } from "react";

const Tooltip = ({ text, children, placement = "top", width = "max-w-3xl" }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const getTooltipPositionClasses = () => {
    switch (placement) {
      case "top":
        return "bottom-full flex justify-center mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full flex justify-center mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full flex justify-center mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full flex justify-center ml-2 top-1/2 -translate-y-1/2";
      default:
        return "bottom-full flex justify-center mb-2 left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {children}
      </div>
      {isTooltipVisible && (
        <div
          className={`absolute z-50 bg-gray-800 text-white p-2 rounded ${width} ${getTooltipPositionClasses()}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;