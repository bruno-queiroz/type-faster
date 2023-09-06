import { TypingReview, typingHistory, typos } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { getEndOfWordIndex } from "@/utils/getEndOfWordIndex";
import { getStartOfWordIndex } from "@/utils/getStartOfWordIndex";
import { playTypingReview } from "@/utils/playTypingReview";
import React, { useState } from "react";

const MistakeItem = ({ i, word }: { i: number; word: string }) => {
  const [typoReview, setTypoReview] = useState<TypingReview[]>([]);
  const [isCursorShowing, setIsCursorShowing] = useState(false);

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

    setIsCursorShowing(true);

    playTypingReview({
      typingHistory: replaySlice,
      reviewFinishedCallBack: () => setIsCursorShowing(false),
      typingReviewIndex: 0,
      setTypingReview: setTypoReview,
    });
  };

  const clearReplay = () => {
    clearAllSetIntervals(0);
  };
  return (
    <div
      className="group bg-white p-2 rounded w-[max-content] hover:cursor-pointer border-b-[1px] border-b-red-500"
      onMouseOver={() => showTypoReplay(i)}
      onMouseLeave={clearReplay}
    >
      <div className="hidden group-hover:flex break-all justify-center font-mono text-lg absolute right-[50%] translate-x-[50%] top-[-8px] bg-gray-400 text-white p-2 rounded min-w-[200px] h-[45px]">
        {typoReview.map((typo, i) => (
          <>
            <span key={i}>{typo.value}</span>
          </>
        ))}
        <span
          className={`w-[2px] h-[24px] ${isCursorShowing && "cursor-white"}`}
        />
      </div>

      {word}
    </div>
  );
};

export default MistakeItem;
