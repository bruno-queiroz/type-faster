import { cursorPosition } from "@/hooks/useTyping";
import { LEFT_CURSOR_CLASSNAME, RIGHT_CURSOR_CLASSNAME } from "./addCursor";

export const removeCursor = (elements: HTMLCollection) => {
  const currentCharElement = elements[cursorPosition.index] as HTMLSpanElement;
  const nextCharElement = elements[cursorPosition.index + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  let cursorClass = "";
  let element: HTMLSpanElement;

  if (!currentCharElement) return;

  const isFirstChar = cursorPosition.index === -1;
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

  cursorPosition.index = -1;
  element.classList.remove(cursorClass);
};
