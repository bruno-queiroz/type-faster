import { TypingHistory } from "@/app/practice/[mode]/page";

export const getEndOfWordIndex = (
  index: number,
  typingHistory: TypingHistory[]
) => {
  while (
    (index < typingHistory.length && typingHistory[index]?.value !== " ") ||
    (typingHistory[index]?.value === " " &&
      !typingHistory[index]?.isCorrect &&
      index < typingHistory.length)
  ) {
    index++;
  }

  return index;
};
