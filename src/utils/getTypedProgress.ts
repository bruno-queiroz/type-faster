export const getTypedProgress = (
  textLength: number | undefined,
  lettersTyped: number
) => {
  if (!textLength) return 0;
  const progress = (lettersTyped * 100) / textLength;

  return progress;
};
