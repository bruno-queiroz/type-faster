import { KeyboardEvent, RefObject } from "react";

import { addCursor } from "@/utils/addCursor";
import { removeCursor } from "@/utils/removeCursor";
import { getCursorPositionCtrlRight } from "./getCursorPositionCtrlRight";
import { getCursorPositionCtrlLeft } from "./getCursorPositionCtrlLeft";

export const onKeyDownChangeCursor = (
  e: KeyboardEvent<HTMLInputElement>,
  textElement: RefObject<HTMLParagraphElement>,
  currentWordBeginningIndex: number
) => {
  if (!textElement.current) return;

  const key = e.key;
  const isCtrl = e.ctrlKey;
  const cursorStart = (e.target as HTMLInputElement).selectionStart || 0;
  const inputValue = (e.target as HTMLInputElement).value;

  const textElementChildren = textElement.current.children;

  if (key === "ArrowUp") {
    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    addCursor(currentWordBeginningIndex - 1, textElementChildren);
  } else if (key === "ArrowDown") {
    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    addCursor(
      currentWordBeginningIndex + inputValue.length - 1,
      textElementChildren
    );
  } else if (isCtrl && key === "ArrowRight") {
    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    const cursorPosition = getCursorPositionCtrlRight(
      inputValue,
      cursorStart - 1
    );

    addCursor(currentWordBeginningIndex + cursorPosition, textElementChildren);
  } else if (isCtrl && key === "ArrowLeft") {
    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    const cursorPosition = getCursorPositionCtrlLeft(
      inputValue,
      cursorStart - 1
    );

    addCursor(currentWordBeginningIndex + cursorPosition, textElementChildren);
  } else if (key === "ArrowLeft") {
    const safeCursorStart = cursorStart - 2 < -1 ? -1 : cursorStart - 2;

    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    addCursor(currentWordBeginningIndex + safeCursorStart, textElementChildren);
  } else if (key === "ArrowRight") {
    if (!textElementChildren[currentWordBeginningIndex + cursorStart]) return;

    if (cursorStart >= inputValue.length) return;

    removeCursor(
      currentWordBeginningIndex + cursorStart - 1,
      textElementChildren
    );

    addCursor(currentWordBeginningIndex + cursorStart, textElementChildren);
  }
};
