export const checkEllipsisCtrlLeft = (input: string, cursorIndex: number) => {
  let jumpCharAmount = 0;
  let isEllipsis = false;

  const isCompleteEllipsis =
    input[cursorIndex] + input[cursorIndex - 1] + input[cursorIndex - 2] ===
    "...";

  const isSemiEllipsis = input[cursorIndex] + input[cursorIndex - 1] === "..";

  if (isCompleteEllipsis) {
    jumpCharAmount = 3;
    isEllipsis = true;
  } else if (isSemiEllipsis) {
    jumpCharAmount = 2;
    isEllipsis = true;
  }

  return { isEllipsis, jumpCharAmount };
};
