import { WORD_CHARACTER_REGEX, checkCharacter } from "./checkCharacter";
import { checkEllipsisCtrlRight } from "./checkEllipsisCtrlRight";

export const getCursorPositionCtrlRight = (
  input: string,
  cursorIndex: number
) => {
  const initialIndex = cursorIndex;

  const isCurrentItemWordChar = WORD_CHARACTER_REGEX.test(input[cursorIndex]);

  if (!isCurrentItemWordChar) {
    cursorIndex++;
  }

  while (cursorIndex <= input.length - 1) {
    const character = checkCharacter(
      input,
      cursorIndex,
      checkEllipsisCtrlRight,
      initialIndex + 1
    );

    if (!character.isWordChar) {
      cursorIndex += character.jumpCharAmount;
      if (character.isInitialWordNotAWordChar) cursorIndex++;
      break;
    }
    cursorIndex++;
  }

  return cursorIndex - 1;
};
