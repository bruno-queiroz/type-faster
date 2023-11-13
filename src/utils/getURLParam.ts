export const getURLParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get(param);

  return mode;
};
