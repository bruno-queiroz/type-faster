import { checkEllipsis } from "./checkEllipsis";

export const checkCharacter = (
  input: string,
  cursorIndex: number,
  ctrl: "left" | "right",
  initialIndex?: number
) => {
  const regex = /\w|'/;

  let inputSlice = "";

  if (ctrl === "left") {
    inputSlice =
      input[cursorIndex] + input[cursorIndex - 1] + input[cursorIndex - 2];
  } else {
    inputSlice =
      input[cursorIndex] + input[cursorIndex + 1] + input[cursorIndex + 2];
  }

  const { isEllipsis, jumpCharAmount } = checkEllipsis(inputSlice);

  if (input[initialIndex! + 1] === "." && ctrl === "right") {
    if (isEllipsis) {
      return { isChar: true, isEllipsis, jumpCharAmount };
    }
  } else if (ctrl === "left" && isEllipsis) {
    return { isChar: true, isEllipsis, jumpCharAmount };
  }

  const isChar = regex.test(input[cursorIndex]);

  return { isChar, isEllipsis: false, jumpCharAmount: 0 };
};
