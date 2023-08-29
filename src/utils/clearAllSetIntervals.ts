export const clearAllSetIntervals = (typingReviewIndex: number) => {
  let currentId = setTimeout(() => "", 0) as unknown as number;

  while (currentId > typingReviewIndex) {
    clearTimeout(currentId);
    currentId--;
  }
};
