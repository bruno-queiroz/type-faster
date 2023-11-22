import React from "react";

const LoadingText = () => {
  return (
    <span className="flex flex-col gap-4">
      <span className="h-[8px] skeleton-animation w-[90%]" />
      <span className="h-[8px] skeleton-animation-2 w-[85%]" />
      <span className="h-[8px] skeleton-animation-3 w-[87%]" />
    </span>
  );
};

export default LoadingText;
