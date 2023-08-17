export const getTypingElapsedTime = (initialDate: number) => {
  const now = new Date().getTime();

  const elapsedTime = now - initialDate;

  const elapsedTimeInMinutes = elapsedTime / 1000 / 60;
  const elapsedTimeInSeconds = (elapsedTime / 1000) % 60;

  let formattedTime = "";

  const [minutes] = elapsedTimeInMinutes.toString().split(".");
  const [seconds] = elapsedTimeInSeconds.toString().split(".");

  formattedTime = `${minutes}.`;

  if (Number(seconds) < 10) {
    formattedTime += "0";
  }

  formattedTime += seconds;

  return formattedTime;
};
