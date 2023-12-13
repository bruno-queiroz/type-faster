export const createSelectSpanElement = (
  bgColor: string,
  textContent: string | null
) => {
  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.backgroundColor = bgColor;
  span.style.zIndex = "10";
  span.style.left = "0";
  span.textContent = textContent;

  return span;
};
