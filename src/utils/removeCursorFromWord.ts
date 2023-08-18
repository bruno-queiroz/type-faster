export const removeCursorFromWord = (
  currentWordBeginningIndex: number,
  elements: HTMLCollection,
  textLength: number
) => {
  let index = 0;
  while (
    elements[currentWordBeginningIndex + index].textContent !== " " &&
    currentWordBeginningIndex + index < textLength
  ) {
    const element = elements?.[
      currentWordBeginningIndex + index
    ] as HTMLSpanElement;

    element.classList.remove("cursor-on-left");
    element.classList.remove("cursor-on-right");

    index++;
  }
};
