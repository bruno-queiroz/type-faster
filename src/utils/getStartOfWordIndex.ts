import { TypingHistory } from "@/app/practice/[mode]/page";

export const getStartOfWordIndex = (
  index: number,
  typingHistory: TypingHistory[]
) => {
  while (
    (index > 0 && typingHistory[index]?.value !== " ") ||
    (typingHistory[index]?.value === " " && !typingHistory[index]?.isCorrect)
  ) {
    index--;
  }

  if (typingHistory[index]?.value === " ") return index + 1;

  return index;
};
