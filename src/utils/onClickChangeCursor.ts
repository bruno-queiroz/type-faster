import { MouseEvent, RefObject } from "react";
import { addCursor } from "./addCursor";
import { removeCursorFromWord } from "./removeCursorFromWord";

export const onClickChangeCursor = (
  e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
  textElement: RefObject<HTMLParagraphElement>,
  currentWordBeginningIndex: number,
  textLength: number
) => {
  if (!textElement.current) return;

  const textElementChildren = textElement.current.children;
  const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;

  removeCursorFromWord(
    currentWordBeginningIndex,
    textElementChildren,
    textLength - 1
  );
  addCursor(
    currentWordBeginningIndex + selectionStart - 1 || 1,
    textElementChildren
  );
};
