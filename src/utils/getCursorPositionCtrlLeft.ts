import { checkCharacter } from "./checkCharacter";

export const getCursorPositionCtrlLeft = (
  input: string,
  cursorIndex: number
) => {
  const isChar = checkCharacter(input, cursorIndex, "left").isChar;

  if (!isChar) {
    return cursorIndex - 1;
  }

  while (
    checkCharacter(input, cursorIndex, "left").isChar &&
    cursorIndex >= 0
  ) {
    const character = checkCharacter(input, cursorIndex, "left");

    if (character.isEllipsis) {
      cursorIndex -= character.jumpCharAmount;
      break;
    }
    cursorIndex--;
  }

  return cursorIndex;
};
