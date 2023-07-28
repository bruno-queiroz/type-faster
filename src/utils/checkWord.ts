export const checkWord = (
  inputValue: string,
  elements: HTMLCollection,
  textArray: string[],
  currentWordBeginningIndex: number
) => {
  let isMisspelled = {
    is: false,
    index: 0,
  };
  const isTheFirstWord = currentWordBeginningIndex === 0;

  for (let i = 0; i < inputValue.length; i++) {
    const inputChar = inputValue[i];
    const textChar = isTheFirstWord
      ? textArray[i]
      : textArray[currentWordBeginningIndex + i];
    const currentCharElement = isTheFirstWord
      ? (elements[i] as HTMLSpanElement)
      : (elements[currentWordBeginningIndex + i] as HTMLSpanElement);

    if (inputChar === textChar && !isMisspelled.is) {
      currentCharElement.style.color = "green";
      currentCharElement.style.backgroundColor = "white";
    } else {
      if (!isMisspelled.is) {
        isMisspelled = {
          is: true,
          index: isTheFirstWord ? i : currentWordBeginningIndex + i,
        };
      }
      currentCharElement.style.backgroundColor = "#F87171";
      currentCharElement.style.color = "black";
    }
  }

  return isMisspelled;
};
