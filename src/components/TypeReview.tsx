import { TypingReview } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { playTypingReview } from "@/utils/playTypingReview";
import { typingHistory } from "@/app/practice/[mode]/page";
import React, { useState } from "react";

const TypeReview = () => {
  const [typingReview, setTypingReview] = useState<TypingReview[]>([]);
  const [typingReviewIndex, setTypingReviewIndex] = useState(0);

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

  return (
    <div>
      <p>
        {typingReview.map((char, index) => (
          <span key={index}>{char.value}</span>
        ))}
      </p>

      <button onClick={startTypingReview}>start</button>

      <button onClick={pauseTypingReview}>pause</button>

      <div>cpm: {typingReview[typingReview.length - 1]?.cpm}</div>
      <div>accuracy: {typingReview[typingReview.length - 1]?.accuracy}</div>
    </div>
  );
};

export default TypeReview;
