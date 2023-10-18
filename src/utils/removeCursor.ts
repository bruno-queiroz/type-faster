import { LEFT_CURSOR_CLASSNAME, RIGHT_CURSOR_CLASSNAME } from "./addCursor";

export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextCharElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement?.classList.remove(LEFT_CURSOR_CLASSNAME);
    return;
  }

  if (!currentCharElement) return;

  if (currentCharElement?.textContent === " ") {
    nextCharElement?.classList.remove(LEFT_CURSOR_CLASSNAME);
  } else {
    currentCharElement?.classList.remove(RIGHT_CURSOR_CLASSNAME);
  }
};
