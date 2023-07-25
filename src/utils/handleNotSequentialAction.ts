export const handleNotSequentialAction = (
  inputIndex: number,
  textArray: string[],
  inputValue: string,
  elements: HTMLCollection
) => {
  let startOfWord = inputIndex === 0 ? inputIndex : inputIndex - 1;
  while (textArray[startOfWord] !== " " && startOfWord > 0) {
    startOfWord--;
  }
  if (startOfWord > 0) {
    startOfWord++;
  }
  let isMisspelled = false;
  for (let i = 0; i < inputValue.length; i++) {
    const char = inputValue[i];
    const currentCharElement = elements[startOfWord + i] as HTMLSpanElement;

    if (char === textArray[startOfWord + i] && !isMisspelled) {
      currentCharElement.style.color = "green";
      currentCharElement.style.backgroundColor = "white";
    } else {
      console.log(char, inputIndex);
      isMisspelled = true;
      currentCharElement.style.backgroundColor = "#F87171";
      currentCharElement.style.color = "black";
    }
  }
};
