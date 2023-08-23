export const getTypedProgress = (textLength: number, lettersTyped: number) => {
  const progress = (lettersTyped * 100) / textLength;

  return progress;
};
