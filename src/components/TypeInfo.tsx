import React from "react";

interface TypeInfoProps {
  cpm: string;
  accuracy: string;
  time: string;
  restartTyping: () => void;
}

const TypeInfo = ({ cpm, accuracy, time, restartTyping }: TypeInfoProps) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-200 p-4">
      <div>
        <h2>Book name</h2>
        <p>Author</p>
      </div>
      <div className="flex flex-col gap-2">
        <span>Speed: {cpm} CPM</span>
        <span>Accuracy: {accuracy}%</span>
        <span>Time: {time}s</span>
      </div>
      <button
        className="py-2 px-4 mt-2 rounded bg-neutral-900 text-white outline-green-400"
        onClick={restartTyping}
      >
        Try it again
      </button>
    </div>
  );
};

export default TypeInfo;