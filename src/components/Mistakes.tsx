import { getTypos } from "@/hooks/useTyping";
import MistakeItem from "./MistakeItem";

const Mistakes = () => {
  const typos = getTypos();

  return (
    <article className="relative">
      <h2 className="text-xl my-4">Mistakes</h2>
      <div className="bg-gray-200 p-4">
        <div className="flex gap-2 flex-wrap">
          {typos.length === 0
            ? "No mistakes this time! Good Job 🤠"
            : typos.map(({ word }, i) => (
                <MistakeItem key={i} {...{ i, word }} />
              ))}
        </div>
      </div>
    </article>
  );
};

export default Mistakes;
