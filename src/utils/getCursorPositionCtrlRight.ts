import { checkCharacter } from "./checkCharacter";

export const getCursorPositionCtrlRight = (
  input: string,
  cursorIndex: number
) => {
  const isChar = checkCharacter(input, cursorIndex, "right").isChar;

  if (!isChar) {
    cursorIndex++;
  }

  const initialIndex = cursorIndex;
  while (
    checkCharacter(input, cursorIndex, "right", initialIndex).isChar &&
    cursorIndex <= input.length - 1
  ) {
    const character = checkCharacter(input, cursorIndex, "right", initialIndex);

    if (character.isEllipsis) {
      cursorIndex += character.jumpCharAmount;
      break;
    }
    cursorIndex++;
  }

  return cursorIndex - 1;
};
