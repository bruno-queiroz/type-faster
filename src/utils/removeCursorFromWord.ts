import { LEFT_CURSOR_CLASSNAME, RIGHT_CURSOR_CLASSNAME } from "./addCursor";

export const removeCursorFromWord = (
  currentWordBeginningIndex: number,
  elements: HTMLCollection,
  textLength: number
) => {
  let index = 0;
  while (
    elements[currentWordBeginningIndex + index].textContent !== " " &&
    currentWordBeginningIndex + index < textLength
  ) {
    const element = elements?.[
      currentWordBeginningIndex + index
    ] as HTMLSpanElement;

    element.classList.remove(LEFT_CURSOR_CLASSNAME);
    element.classList.remove(RIGHT_CURSOR_CLASSNAME);

    index++;
  }
};
