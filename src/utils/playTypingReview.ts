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
        if (type.startPoint > 0) {
          setState((prev) => {
            const updatedHistory = [...prev];
            updatedHistory.splice(type.startPoint * -1, 0, type.value);

            return updatedHistory;
          });
          return;
        }

        setState((prev) => [...prev, type.value]);
      }
    }, type.time - initialDate);
  });
};
