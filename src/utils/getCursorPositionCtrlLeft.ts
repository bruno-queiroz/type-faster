import { checkCharacter } from "./checkCharacter";
import { checkEllipsisCtrlLeft } from "./checkEllipsisCtrlLeft";

export const getCursorPositionCtrlLeft = (
  input: string,
  cursorIndex: number
) => {
  const isChar = checkCharacter(
    input,
    cursorIndex,
    checkEllipsisCtrlLeft
  ).isChar;

  if (!isChar) {
    return cursorIndex - 1;
  }

  while (
    checkCharacter(input, cursorIndex, checkEllipsisCtrlLeft).isChar &&
    cursorIndex >= 0
  ) {
    const character = checkCharacter(input, cursorIndex, checkEllipsisCtrlLeft);

    if (character.isEllipsis) {
      cursorIndex -= character.jumpCharAmount;
      break;
    }
    cursorIndex--;
  }

  return cursorIndex;
};
