import { TypingReview, typingHistory, typos } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { getEndOfWordIndex } from "@/utils/getEndOfWordIndex";
import { getStartOfWordIndex } from "@/utils/getStartOfWordIndex";
import { playTypingReview } from "@/utils/playTypingReview";
import React, { useState } from "react";

const MistakeItem = ({ i, word }: { i: number; word: string }) => {
  const [typoReview, setTypoReview] = useState<TypingReview[]>([]);

  const showTypoReplay = (index: number) => {
    setTypoReview([]);
    const wordInitialIndex = getStartOfWordIndex(
      typos[index].typingHistoryIndex,
      typingHistory
    );

    const wordFinalIndex = getEndOfWordIndex(
      typos[index].typingHistoryIndex,
      typingHistory
    );

    const replaySlice = typingHistory.slice(wordInitialIndex, wordFinalIndex);

    playTypingReview({
      typingHistory: replaySlice,
      reviewFinishedCallBack: () => console.log("finished"),
      typingReviewIndex: 0,
      setTypingReview: setTypoReview,
    });
  };

  const clearReplay = () => {
    clearAllSetIntervals(0);
  };
  return (
    <div
      className="relative group bg-white p-2 rounded w-[max-content] hover:cursor-pointer border-b-[1px] border-b-red-500"
      onMouseOver={() => showTypoReplay(i)}
      onMouseLeave={clearReplay}
    >
      <div className="hidden group-hover:flex break-all justify-center font-mono text-lg absolute top-[-250%] bg-gray-400 text-white p-2 rounded w-[150px] aspect-video">
        {typoReview.map((typo, i) => (
          <span key={i}>{typo.value}</span>
        ))}
      </div>

      {word}
    </div>
  );
};

export default MistakeItem;
