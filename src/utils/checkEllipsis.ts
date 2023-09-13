export const checkEllipsis = (string: string) => {
  let jumpCharAmount = 0;
  let isEllipsis = false;

  const completeEllipsis = "...";
  const semiEllipsis = "..";

  const isSemiEllipsis = string[0] + string[1];

  if (completeEllipsis === string) {
    jumpCharAmount = 3;
    isEllipsis = true;
  } else if (isSemiEllipsis === semiEllipsis) {
    jumpCharAmount = 2;
    isEllipsis = true;
  }

  return { isEllipsis, jumpCharAmount };
};
