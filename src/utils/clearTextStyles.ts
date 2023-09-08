export const clearTextStyles = (
  elements: HTMLCollection,
  color: string,
  bgColor: string
) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLSpanElement;

    element.style.color = color;
    element.style.backgroundColor = bgColor;
  }
};
