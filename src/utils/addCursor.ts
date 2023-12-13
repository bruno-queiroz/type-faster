export const RIGHT_CURSOR_CLASSNAME = "right-cursor";
export const LEFT_CURSOR_CLASSNAME = "left-cursor";

export const addCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  let cursorClass = "";
  let element: HTMLSpanElement;

  if (!currentCharElement) return;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    element = firstCharElement;
    cursorClass = LEFT_CURSOR_CLASSNAME;
  } else if (currentCharElement.textContent === " " && nextElement) {
    element = nextElement;
    cursorClass = RIGHT_CURSOR_CLASSNAME;
  } else {
    element = currentCharElement;
    cursorClass = RIGHT_CURSOR_CLASSNAME;
  }

  element.classList.add(cursorClass);
};
