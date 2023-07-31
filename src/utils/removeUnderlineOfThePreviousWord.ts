export const removeUnderlineOfThePreviousWord = (
  startIndex: number,
  textArray: string[],
  elements: HTMLCollection
) => {
  while (textArray[startIndex] !== " ") {
    (elements[startIndex] as HTMLSpanElement).style.textDecoration = "none";
    startIndex++;
  }
};
