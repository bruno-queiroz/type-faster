export const WORD_CHARACTER_REGEX = /\w|'/;

export const checkCharacter = (
  input: string,
  cursorIndex: number,
  checkEllipsisStrategy: (
    input: string,
    cursorIndex: number,
    initialIndex?: number
  ) => {
    isEllipsis: boolean;
    jumpCharAmount: number;
  },
  initialIndex: number
) => {
  const isWordChar = WORD_CHARACTER_REGEX.test(input[cursorIndex]);
  const isInitialWordAWordChar = WORD_CHARACTER_REGEX.test(input[initialIndex]);

  const { isEllipsis, jumpCharAmount } = checkEllipsisStrategy(
    input,
    cursorIndex,
    initialIndex
  );
  if (isEllipsis) {
    return { isWordChar: false, jumpCharAmount };
  } else if (!isInitialWordAWordChar) {
    return {
      isWordChar: false,
      jumpCharAmount: 1,
      isInitialWordNotAWordChar: true,
    };
  }

  return { isWordChar, jumpCharAmount: 0 };
};
