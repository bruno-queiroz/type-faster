import { KeyboardEvent, RefObject } from "react";

import { addCursor } from "@/utils/addCursor";
import { removeCursor } from "@/utils/removeCursor";

export const onKeyDownChangeCursor = (
  e: KeyboardEvent<HTMLInputElement>,
  textElement: RefObject<HTMLParagraphElement>,
  currentWordBeginningIndex: number
) => {
  if (textElement.current) {
    const key = e.key;
    const isCtrl = e.ctrlKey;
    const cursorStart = (e.target as HTMLInputElement).selectionStart || 0;
    const textElementChildren = textElement.current.children;
    const inputValue = (e.target as HTMLInputElement).value;
    const blackBg = "rgba(0, 0, 0, 0)";
    const blackText = "rgb(0, 0, 0)";

    if ((isCtrl && key === "ArrowLeft") || key === "ArrowUp") {
      removeCursor(
        currentWordBeginningIndex + cursorStart - 1,
        textElementChildren
      );

      addCursor(currentWordBeginningIndex - 1, textElementChildren);
    } else if ((isCtrl && key === "ArrowRight") || key === "ArrowDown") {
      removeCursor(
        currentWordBeginningIndex + cursorStart - 1,
        textElementChildren
      );

      addCursor(
        currentWordBeginningIndex + inputValue.length - 1,
        textElementChildren
      );
    } else if (key === "ArrowLeft") {
      const safeCursorStart = cursorStart - 2 < -1 ? -1 : cursorStart - 2;

      removeCursor(
        currentWordBeginningIndex + cursorStart - 1,
        textElementChildren
      );

      addCursor(
        currentWordBeginningIndex + safeCursorStart,
        textElementChildren
      );
    } else if (key === "ArrowRight") {
      if (textElementChildren[currentWordBeginningIndex + cursorStart]) {
        const elementComputedStyles = getComputedStyle(
          textElementChildren[currentWordBeginningIndex + cursorStart]
        );
        const elementColor = elementComputedStyles.color;
        const elementBgColor = elementComputedStyles.backgroundColor;

        if (elementColor === blackText && elementBgColor === blackBg) {
          return;
        }

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );

        addCursor(currentWordBeginningIndex + cursorStart, textElementChildren);
      }
    }
  }
};
