export const positionCursorCtrlLeft = (input: string, cursorIndex: number) => {
  while (input[cursorIndex] !== " " && cursorIndex > 0) {
    cursorIndex--;
  }
  return cursorIndex;
};
