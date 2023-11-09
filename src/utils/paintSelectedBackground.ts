export const paintSelectedBackground = (
  textElementChildren: HTMLCollection,
  currentWordBeginningIndex: number,
  textLength: number,
  selectionStart: number,
  selectionEnd: number,
  bgColor: string
) => {
  let index = 0;

  while (
    textElementChildren[currentWordBeginningIndex + index].textContent !==
      " " &&
    currentWordBeginningIndex + index < textLength
  ) {
    const spanElement = textElementChildren[
      currentWordBeginningIndex + index
    ] as HTMLSpanElement;

    if (index >= selectionStart && index <= selectionEnd && selectionEnd > 0) {
      spanElement.style.backgroundColor = bgColor;
    } else {
      spanElement.style.backgroundColor = "transparent";
    }

    index++;
  }
};
