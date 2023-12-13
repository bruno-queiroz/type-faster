import { WRONG_INPUT_COLOR } from "@/hooks/useTyping";

export const paintSelectedBackground = (
  textElementChildren: HTMLCollection,
  currentWordBeginningIndex: number,
  inputElement: HTMLInputElement,
  selectionStart: number,
  selectionEnd: number,
  bgColor: string
) => {
  let index = 0;

  while (
    index < inputElement.value.length &&
    currentWordBeginningIndex + index < textElementChildren.length
  ) {
    const spanElement = textElementChildren[
      currentWordBeginningIndex + index
    ] as HTMLSpanElement;

    if (index >= selectionStart && index <= selectionEnd && selectionEnd > 0) {
      spanElement.style.backgroundColor = bgColor;
    } else if (
      getComputedStyle(spanElement).backgroundColor !== WRONG_INPUT_COLOR
    ) {
      spanElement.style.backgroundColor = "transparent";
    }

    index++;
  }
};
