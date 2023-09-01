import { TypingReview, typingHistory } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { playTypingReview } from "@/utils/playTypingReview";
import { useState } from "react";

export const useTypeReview = () => {
  const [typingReview, setTypingReview] = useState<TypingReview[]>([]);
  const [typingReviewIndex, setTypingReviewIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayReview = () => {
    if (typingHistory.length === typingReviewIndex) return;

    if (!isPlaying) {
      startTypingReview();
    } else {
      pauseTypingReview();
    }

    setIsPlaying((prev) => !prev);
  };

  const reviewFinishedCallBack = () => {
    setIsPlaying(false);
  };

  const startTypingReview = () => {
    playTypingReview({
      typingHistory,
      setTypingReview,
      setTypingReviewIndex,
      typingReviewIndex,
      reviewFinishedCallBack,
    });
  };

  const restartTypingReview = () => {
    setTypingReviewIndex(0);
    setTypingReview([]);
    setIsPlaying(true);

    playTypingReview({
      typingHistory,
      setTypingReview,
      setTypingReviewIndex,
      typingReviewIndex: 0,
      reviewFinishedCallBack,
    });
  };

  const pauseTypingReview = () => {
    clearAllSetIntervals(typingReviewIndex);
  };

  return {
    restartTypingReview,
    handlePlayReview,
    typingReview,
    isPlaying,
  };
};
