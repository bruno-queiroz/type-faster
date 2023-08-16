export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextCharElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.style.boxShadow = "";
    return;
  }

  if (!currentCharElement) return;

  if (currentCharElement?.textContent === " ") {
    nextCharElement.style.boxShadow = "";
  } else {
    currentCharElement.style.boxShadow = "";
  }
};
