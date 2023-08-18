export const getCursorPositionCtrlRight = (
  input: string,
  cursorIndex: number
) => {
  const isWordChar = /\w|'/;

  if (!isWordChar.test(input[cursorIndex + 1])) {
    return cursorIndex + 1;
  }

  if (!isWordChar.test(input[cursorIndex])) {
    cursorIndex++;
  }

  while (
    isWordChar.test(input[cursorIndex]) &&
    cursorIndex < input.length - 1
  ) {
    cursorIndex++;
  }

  if (!isWordChar.test(input[cursorIndex])) {
    cursorIndex--;
  }

  return cursorIndex;
};
