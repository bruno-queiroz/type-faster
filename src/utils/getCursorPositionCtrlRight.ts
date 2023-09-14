import { WORD_CHARACTER_REGEX, checkCharacter } from "./checkCharacter";
import { checkEllipsisCtrlRight } from "./checkEllipsisCtrlRight";

export const getCursorPositionCtrlRight = (
  input: string,
  cursorIndex: number
) => {
  const initialIndex = cursorIndex;

  const isCurrentItemWordChar = WORD_CHARACTER_REGEX.test(input[cursorIndex]);
  const isNextItemWordChar = WORD_CHARACTER_REGEX.test(input[cursorIndex + 1]);

  if (!isNextItemWordChar) {
    return cursorIndex + 1;
  }

  if (!isCurrentItemWordChar) {
    cursorIndex++;
  }

  while (
    checkCharacter(input, cursorIndex, checkEllipsisCtrlRight, initialIndex)
      .isChar &&
    cursorIndex <= input.length - 1
  ) {
    const character = checkCharacter(
      input,
      cursorIndex,
      checkEllipsisCtrlRight,
      initialIndex
    );

    if (character.isEllipsis) {
      cursorIndex += character.jumpCharAmount + 1;
      break;
    }
    cursorIndex++;
  }

  return cursorIndex - 1;
};
