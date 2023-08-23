import React from "react";

const TypeProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="h-4 w-full bg-white rounded-full">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TypeProgressBar;
