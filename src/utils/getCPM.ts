export const getCPMContext = () => {
  const initialDate = new Date().getTime();
  return (inputLength: number) => {
    const currentDate = new Date().getTime();
    const elapsedTime = currentDate - initialDate;
    const elapsedTimeInSeconds = elapsedTime / 1000;
    const cpm = (inputLength * 60) / elapsedTimeInSeconds;

    return { cpm: Math.trunc(cpm), initialDate };
  };
};
