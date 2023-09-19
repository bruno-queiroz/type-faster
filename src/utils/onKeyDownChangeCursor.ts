import { KeyboardEvent, RefObject } from "react";

import { addCursor } from "@/utils/addCursor";
import { removeCursor } from "@/utils/removeCursor";
import { getCursorPositionCtrlRight } from "./getCursorPositionCtrlRight";
import { getCursorPositionCtrlLeft } from "./getCursorPositionCtrlLeft";

const allowedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

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

  if (!allowedKeys.includes(key)) return;

  let cursorIndex = -100;

  switch (key) {
    case "ArrowUp":
      cursorIndex = currentWordBeginningIndex - 1;
      break;
    case "ArrowDown":
      cursorIndex = inputValue.length - 1;
      break;
    case "ArrowRight":
      if (isCtrl) {
        cursorIndex = getCursorPositionCtrlRight(inputValue, cursorStart - 1);
        break;
      }
      if (!textElementChildren[currentWordBeginningIndex + cursorStart]) break;

      if (cursorStart >= inputValue.length) break;

      cursorIndex = cursorStart;
      break;
    case "ArrowLeft":
      if (isCtrl) {
        cursorIndex = getCursorPositionCtrlLeft(inputValue, cursorStart - 1);
        break;
      }
      const safeCursorStart = cursorStart - 2 < -1 ? -1 : cursorStart - 2;

      cursorIndex = safeCursorStart;
      break;
  }

  const isCursorIndexTheSame = cursorIndex === -100;

  if (isCursorIndexTheSame) return;

  removeCursor(
    currentWordBeginningIndex + cursorStart - 1,
    textElementChildren
  );

  addCursor(currentWordBeginningIndex + cursorIndex, textElementChildren);
};
