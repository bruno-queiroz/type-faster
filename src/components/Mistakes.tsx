import React from "react";

import { wordsTypedWrong } from "@/app/practice/[mode]/page";

const Mistakes = () => {
  return (
    <article>
      <h2 className="text-xl my-4">Mistakes</h2>
      <div className="bg-gray-200 p-4">
        <div className="flex gap-2">
          {wordsTypedWrong.size === 0
            ? "No mistakes this time! Good Job 🤠"
            : [...wordsTypedWrong].map((word, i) => (
                <span
                  key={i}
                  className="bg-white p-2 rounded w-[max-content] border-b-[1px] border-b-red-500"
                >
                  {word}
                </span>
              ))}
        </div>
      </div>
    </article>
  );
};

export default Mistakes;
