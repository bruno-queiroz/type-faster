import { TypingReview } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { playTypingReview } from "@/utils/playTypingReview";
import { typingHistory } from "@/app/practice/[mode]/page";

import {
  BsPauseFill as PauseIcon,
  BsFillPlayFill as PlayIcon,
} from "react-icons/bs";

import React, { useState } from "react";

const TypeReview = () => {
  const [typingReview, setTypingReview] = useState<TypingReview[]>([]);
  const [typingReviewIndex, setTypingReviewIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startTypingReview = () => {
    playTypingReview({
      typingHistory,
      setTypingReview,
      setTypingReviewIndex,
      typingReviewIndex,
    });
  };

  const pauseTypingReview = () => {
    clearAllSetIntervals(typingReviewIndex);
  };

  const handlePlayReview = () => {
    if (!isPlaying) {
      startTypingReview();
    } else {
      pauseTypingReview();
    }

    setIsPlaying((prev) => !prev);
  };

  return (
    <article>
      <h2 className="text-xl my-4">Type Review</h2>

      <div className="flex flex-col gap-4 bg-gray-200 p-4">
        <p className="w-full h-[100px] bg-gray-300 rounded p-2">
          {typingReview.map((char, index) => (
            <span key={index}>{char.value}</span>
          ))}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePlayReview}
            className="bg-white text-neutral-900 p-1 rounded text-2xl"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div className="bg-white text-neutral-900 p-1 rounded">
            <span className="font-semibold">cpm:</span>{" "}
            {typingReview[typingReview.length - 1]?.cpm}
          </div>
          <div className="bg-white text-neutral-900 p-1 rounded">
            <span className="font-semibold">accuracy:</span>{" "}
            {typingReview[typingReview.length - 1]?.accuracy}%
          </div>
        </div>
      </div>
    </article>
  );
};

export default TypeReview;
