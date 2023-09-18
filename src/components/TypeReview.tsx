import {
  BsPauseFill as PauseIcon,
  BsFillPlayFill as PlayIcon,
} from "react-icons/bs";
import { MdReplay as ReplayIcon } from "react-icons/md";

import { useTypingReview } from "@/hooks/useTypingReview";
import { RIGHT_CURSOR_CLASSNAME } from "@/utils/addCursor";

const TypeReview = () => {
  const {
    handlePlayReview,
    isPlaying,
    restartTypingReview,
    typingReview,
    isCursorShowing,
  } = useTypingReview();

  return (
    <article>
      <h2 className="text-xl my-4">Type Review</h2>

      <div className="flex flex-col gap-4 bg-gray-200 p-4">
        <p className="w-full h-[100px] bg-gray-300 rounded p-2">
          {typingReview.map((char, index) => (
            <span key={index}>{char.value}</span>
          ))}
          <span className="inline-block relative w-[1px] h-[20px]">
            <span
              className={`absolute bottom-[-3px] inline-block w-[1px] h-[20px] ${
                isCursorShowing && RIGHT_CURSOR_CLASSNAME
              }`}
            />
          </span>
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
