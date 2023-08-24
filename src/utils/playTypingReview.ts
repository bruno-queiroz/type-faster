import { TypingHistory } from "@/app/practice/[mode]/page";
import { Dispatch, SetStateAction } from "react";

export const playTypingReview = (
  typingHistory: TypingHistory[],
  setState: Dispatch<SetStateAction<string[]>>,
  initialDate: number
) => {
  typingHistory.forEach((type) => {
    setTimeout(() => {
      setState((prev) => [...prev, type.value]);
    }, type.time - initialDate);
  });
};
