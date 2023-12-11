interface UpdateTextColors {
  inputValue: string;
  elements: HTMLCollection;
  currentWordBeginningIndex: number;
  rightInputColor: string;
  wrongInputColor: string;
}

export const updateTextColors = ({
  inputValue,
  elements,
  currentWordBeginningIndex,
  rightInputColor,
  wrongInputColor,
}: UpdateTextColors) => {
  let isIncorrect = false;
  for (let i = 0; i < inputValue.length; i++) {
    const element = elements[currentWordBeginningIndex + i] as HTMLSpanElement;
    const elementValue = element.textContent;
    const typedLetter = inputValue[i];

    if (elementValue === typedLetter && !isIncorrect) {
      element.style.color = rightInputColor;
      element.style.backgroundColor = "transparent";
      continue;
    }

    isIncorrect = true;
    element.style.color = "black";
    element.style.backgroundColor = wrongInputColor;
  }
};