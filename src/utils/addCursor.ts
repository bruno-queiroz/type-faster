export const RIGHT_CURSOR_CLASSNAME = "right-cursor";
export const LEFT_CURSOR_CLASSNAME = "left-cursor";

export const addCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.classList.add(LEFT_CURSOR_CLASSNAME);
    return;
  }

  if (currentCharElement) {
    if (currentCharElement.textContent === " " && nextElement) {
      nextElement.classList.add(LEFT_CURSOR_CLASSNAME);
    } else {
      currentCharElement.classList.add(RIGHT_CURSOR_CLASSNAME);
    }
  }
};
