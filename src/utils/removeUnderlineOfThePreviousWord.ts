export const removeUnderlineOfThePreviousWord = (
  startIndex: number,
  textArray: string[],
  elements: HTMLCollection
) => {
  while (textArray[startIndex] !== " " && startIndex <= elements.length - 1) {
    const element = elements[startIndex] as HTMLSpanElement;
    element.style.textDecoration = "none";

    startIndex++;
  }
};
