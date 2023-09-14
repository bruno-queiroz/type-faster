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
  initialIndex?: number
) => {
  const { isEllipsis, jumpCharAmount } = checkEllipsisStrategy(
    input,
    cursorIndex,
    initialIndex
  );

  if (isEllipsis) {
    return { isChar: true, isEllipsis, jumpCharAmount };
  }

  const isChar = WORD_CHARACTER_REGEX.test(input[cursorIndex]);

  return { isChar, isEllipsis: false, jumpCharAmount: 0 };
};
