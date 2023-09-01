import { TypingReview } from "@/app/practice/[mode]/page";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { playTypingReview } from "@/utils/playTypingReview";
import { typingHistory } from "@/app/practice/[mode]/page";

import {
  BsPauseFill as PauseIcon,
  BsFillPlayFill as PlayIcon,
} from "react-icons/bs";
import { MdReplay as ReplayIcon } from "react-icons/md";

import React, { useState } from "react";
import { useTypeReview } from "@/hooks/useTypeReview";

const TypeReview = () => {
  const { handlePlayReview, isPlaying, restartTypingReview, typingReview } =
    useTypeReview();

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

          <button
            onClick={restartTypingReview}
            className="bg-white text-neutral-900 p-1 rounded text-2xl"
          >
            <ReplayIcon />
          </button>

          {typingReview.length > 0 && (
            <>
              <div className="bg-white text-neutral-900 p-1 rounded">
                <span className="font-semibold">cpm:</span>{" "}
                {typingReview[typingReview.length - 1]?.cpm}
              </div>
              <div className="bg-white text-neutral-900 p-1 rounded">
                <span className="font-semibold">accuracy:</span>{" "}
                {typingReview[typingReview.length - 1]?.accuracy}%
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default TypeReview;
