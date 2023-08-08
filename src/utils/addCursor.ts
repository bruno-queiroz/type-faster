export const addCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.style.boxShadow = "inset 1px 0px 0px black";
    return;
  }

  if (currentCharElement) {
    if (currentCharElement.textContent === " " && nextElement) {
      nextElement.style.boxShadow = "inset 1px 0px 0px black";
    } else {
      currentCharElement.style.boxShadow = "inset -1px 0px 0px black";
    }
  }
};
