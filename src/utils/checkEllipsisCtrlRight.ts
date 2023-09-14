export const checkEllipsisCtrlRight = (
  input: string,
  cursorIndex: number,
  initialIndex?: number
) => {
  let jumpCharAmount = 0;
  let isEllipsis = false;

  if (!initialIndex || input[initialIndex + 1] !== ".")
    return { isEllipsis, jumpCharAmount };
  initialIndex++;
  console.log(initialIndex, input[initialIndex]);

  const isCompleteEllipsis =
    input[initialIndex] + input[initialIndex + 1] + input[initialIndex + 2] ===
    "...";

  const isSemiEllipsis = input[initialIndex] + input[initialIndex + 1] === "..";

  if (isCompleteEllipsis) {
    jumpCharAmount = 3;
    isEllipsis = true;
  } else if (isSemiEllipsis) {
    jumpCharAmount = 2;
    isEllipsis = true;
  } else {
    jumpCharAmount = 1;
    isEllipsis = true;
  }

  return { isEllipsis, jumpCharAmount };
};
