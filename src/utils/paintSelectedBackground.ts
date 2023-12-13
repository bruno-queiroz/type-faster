import { createSelectSpanElement } from "./createSelectSpanElement";

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
    const charElement = textElementChildren[
      currentWordBeginningIndex + index
    ] as HTMLSpanElement;

    if (index >= selectionStart && index < selectionEnd && selectionEnd > 0) {
      if (charElement.childElementCount === 0) {
        const span = createSelectSpanElement(bgColor, charElement.textContent);

        charElement.appendChild(span);
      }
    } else {
      const span = charElement.firstChild?.nextSibling;
      span?.remove();
    }

    index++;
  }
};
