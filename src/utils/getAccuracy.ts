export const getAccuracy = (mistakeAmount: number, inputLength: number) => {
  const mistakePercentage = (mistakeAmount * 100) / inputLength;
  const accuracyPercentage = 100 - mistakePercentage;
  const accuracyFormatted = accuracyPercentage.toFixed(2);
  return accuracyFormatted;
};
