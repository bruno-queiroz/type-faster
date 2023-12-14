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
  const isShift = e.shiftKey;
  const inputValue = (e.target as HTMLInputElement).value;

  const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;
  const selectionEnd = (e.target as HTMLInputElement).selectionEnd || 0;
  const selection = document.getSelection()?.toString();

  const textElementChildren = textElement.current.children;

  if (!allowedKeys.includes(key)) return;

  let cursorIndex = -100;

  switch (key) {
    case "ArrowUp":
      cursorIndex = -1;
      break;
    case "ArrowDown":
      cursorIndex = inputValue.length - 1;
      break;
    case "ArrowRight":
      if (isShift) {
        removeCursor(textElementChildren);
        break;
      }
      if (isCtrl) {
        cursorIndex = getCursorPositionCtrlRight(
          inputValue,
          selectionStart - 1
        );
        break;
      }
      if (!textElementChildren[currentWordBeginningIndex + selectionStart])
        break;

      if (selectionStart >= inputValue.length) break;

      if (selection) {
        cursorIndex = selectionEnd - 1;
        break;
      }

      cursorIndex = selectionStart;
      break;
    case "ArrowLeft":
      if (isShift) {
        removeCursor(textElementChildren);
        break;
      }
      if (isCtrl) {
        cursorIndex = getCursorPositionCtrlLeft(inputValue, selectionStart - 1);
        break;
      }
      if (selection) {
        cursorIndex = selectionStart - 1;
        break;
      }
      const safeCursorStart = selectionStart - 2 < -1 ? -1 : selectionStart - 2;

      cursorIndex = safeCursorStart;
      break;
  }

  const isCursorIndexTheSame = cursorIndex === -100;

  if (isCursorIndexTheSame) return;

  removeCursor(textElementChildren);
  addCursor(currentWordBeginningIndex + cursorIndex, textElementChildren);
};
