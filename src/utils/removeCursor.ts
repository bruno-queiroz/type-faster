import { LEFT_CURSOR_CLASSNAME, RIGHT_CURSOR_CLASSNAME } from "./addCursor";

export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextCharElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  let cursorClass = "";
  let element: HTMLSpanElement;

  if (!currentCharElement) return;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    element = firstCharElement;
    cursorClass = LEFT_CURSOR_CLASSNAME;
  } else if (currentCharElement?.textContent === " ") {
    element = nextCharElement;
    cursorClass = LEFT_CURSOR_CLASSNAME;
  } else {
    element = currentCharElement;
    cursorClass = RIGHT_CURSOR_CLASSNAME;
  }

  element.classList.remove(cursorClass);
};
