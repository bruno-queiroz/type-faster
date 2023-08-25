import { TypingHistory } from "@/app/practice/[mode]/page";
import { Dispatch, SetStateAction } from "react";

export const playTypingReview = (
  typingHistory: TypingHistory[],
  setState: Dispatch<SetStateAction<string[]>>,
  initialDate: number
) => {
  typingHistory.forEach((type) => {
    setTimeout(() => {
      if (type.isDeleteContent) {
        setState((prev) => {
          const updatedHistory = [...prev];
          updatedHistory.splice(
            (type.startPoint + type.deletedAmount) * -1,
            type.deletedAmount
          );

          return updatedHistory;
        });
      } else {
        setState((prev) => [...prev, type.value]);
      }
    }, type.time - initialDate);
  });
};
