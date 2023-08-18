export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextCharElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.classList.remove("cursor-on-left");
    return;
  }

  if (!currentCharElement) return;

  if (currentCharElement?.textContent === " ") {
    nextCharElement.classList.remove("cursor-on-left");
  } else {
    currentCharElement.classList.remove("cursor-on-right");
  }
};
