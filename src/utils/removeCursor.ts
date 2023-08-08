export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const spanElement = elements[inputIndex] as HTMLSpanElement;
  const nextSpanElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.style.boxShadow = "";
    return;
  }

  if (spanElement?.textContent === " ") {
    nextSpanElement.style.boxShadow = "";
  } else {
    spanElement.style.boxShadow = "";
  }
};
