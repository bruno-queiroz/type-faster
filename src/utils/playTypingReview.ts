import { TypingHistory } from "@/app/practice/[mode]/page";
import { Dispatch, SetStateAction } from "react";

export const playTypingReview = ({
  typingHistory,
  initialDate,
  setTypingReview,
  setTypingReviewIndex,
  typingReviewIndex,
}: {
  typingHistory: TypingHistory[];
  setTypingReview: Dispatch<SetStateAction<string[]>>;
  initialDate: number;
  typingReviewIndex: number;
  setTypingReviewIndex: Dispatch<SetStateAction<number>>;
}) => {
  for (let i = typingReviewIndex; i < typingHistory.length; i++) {
    const type = typingHistory[i];

    setTimeout(() => {
      setTypingReviewIndex((prev) => prev + 1);
      if (type.isDeleteContent) {
        setTypingReview((prev) => {
          const updatedHistory = [...prev];
          updatedHistory.splice(
            (type.startPoint + type.deletedAmount) * -1,
            type.deletedAmount
          );

          return updatedHistory;
        });
      } else {
        if (type.startPoint > 0) {
          setTypingReview((prev) => {
            const updatedHistory = [...prev];
            updatedHistory.splice(type.startPoint * -1, 0, type.value);

            return updatedHistory;
          });
          return;
        }

        setTypingReview((prev) => [...prev, type.value]);
      }
    }, type.time - initialDate);
  }
};
