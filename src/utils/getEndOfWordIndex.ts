import { TypingHistory } from "./createTypingHistory";

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
