export const getWord = (
  currentWordBeginningIndex: number,
  textArray: string[]
) => {
  let word = "";

  let i = 0;
  while (
    textArray[currentWordBeginningIndex + i] !== " " &&
    currentWordBeginningIndex + i < textArray.length - 1
  ) {
    const currentChar = textArray[currentWordBeginningIndex + i];
    word += currentChar;
    i++;
  }
  return word;
};
