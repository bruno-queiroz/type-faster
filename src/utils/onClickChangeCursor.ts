import { MouseEvent, RefObject } from "react";
import { addCursor } from "./addCursor";
import { removeCursor } from "./removeCursor";

export const onClickChangeCursor = (
  e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
  textElement: RefObject<HTMLParagraphElement>,
  currentWordBeginningIndex: number,
  textLength: number | undefined
) => {
  if (!textElement.current) return;
  if (!textLength) return;

  const textElementChildren = textElement.current.children;
  const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;

  const selection = document.getSelection()?.toString();

  removeCursor(textElementChildren);

  if (!selection) {
    const cursorIndex = currentWordBeginningIndex + selectionStart - 1 || 1;
    addCursor(cursorIndex, textElementChildren);
  }
};
