export const addUnderlineToTheNewWord = (
  startIndex: number,
  textArray: string[],
  elements: HTMLCollection
) => {
  while (textArray[startIndex] !== " " && startIndex < textArray.length) {
    (elements[startIndex] as HTMLSpanElement).style.textDecoration =
      "underline";
    startIndex++;
  }
};
