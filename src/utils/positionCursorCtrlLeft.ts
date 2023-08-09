export const positionCursorCtrlLeft = (input: string, cursorIndex: number) => {
  const isWordChar = /\w/;

  if (!isWordChar.test(input[cursorIndex])) {
    return cursorIndex - 1;
  }

  while (isWordChar.test(input[cursorIndex]) && cursorIndex > 0) {
    cursorIndex--;
  }

  if (isWordChar.test(input[cursorIndex])) {
    cursorIndex--;
  }
  return cursorIndex;
};
