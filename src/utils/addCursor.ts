import { cursorPosition } from "@/hooks/useTyping";

export const RIGHT_CURSOR_CLASSNAME = "right-cursor";
export const LEFT_CURSOR_CLASSNAME = "left-cursor";

export const addCursor = (cursorIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[cursorIndex] as HTMLSpanElement;
  const nextElement = elements[cursorIndex + 1] as HTMLSpanElement;

  let cursorClass = "";
  let element: HTMLSpanElement;

  if (!currentCharElement) return;

  if (currentCharElement.textContent === " " && nextElement) {
    element = nextElement;
    cursorClass = LEFT_CURSOR_CLASSNAME;
  } else {
    element = currentCharElement;
    cursorClass = RIGHT_CURSOR_CLASSNAME;
  }

  cursorPosition.index = cursorIndex;
  element.classList.add(cursorClass);
};
