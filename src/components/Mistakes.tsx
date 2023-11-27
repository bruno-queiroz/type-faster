import { getTypos } from "@/hooks/useTyping";
import MistakeItem from "./MistakeItem";
import SubTitle from "./SubTitle";
import { useQuery } from "react-query";
import { getText } from "@/services/api/getText";

const Mistakes = () => {
  const { data: text } = useQuery("text", getText);
  const typos = getTypos();

  if (text?.data.mode === "repeated-words") return "";

  return (
    <article className="relative">
      <SubTitle>Mistakes</SubTitle>

      <div className="bg-gray-100 p-4">
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
