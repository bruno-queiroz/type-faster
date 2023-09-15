import { checkCharacter } from "./checkCharacter";
import { checkEllipsisCtrlLeft } from "./checkEllipsisCtrlLeft";

export const getCursorPositionCtrlLeft = (
  input: string,
  cursorIndex: number
) => {
  const initialIndex = cursorIndex;

  while (cursorIndex >= 0) {
    const character = checkCharacter(
      input,
      cursorIndex,
      checkEllipsisCtrlLeft,
      initialIndex
    );

    if (!character.isWordChar) {
      cursorIndex -= character.jumpCharAmount;
      break;
    }
    cursorIndex--;
  }

  return cursorIndex;
};
