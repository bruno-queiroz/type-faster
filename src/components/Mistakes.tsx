import React from "react";

import { typos } from "@/app/practice/[mode]/page";

const Mistakes = () => {
  return (
    <article>
      <h2 className="text-xl my-4">Mistakes</h2>
      <div className="bg-gray-200 p-4">
        <div className="flex gap-2">
          {typos.length === 0
            ? "No mistakes this time! Good Job 🤠"
            : typos.map(({ word }, i) => (
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
