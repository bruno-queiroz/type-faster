export const clearLetterStyles = (
  letterAmount: number,
  elements: HTMLCollection,
  inputIndex: number
) => {
  for (let i = 0; i < letterAmount; i++) {
    if (inputIndex - i - 1 > elements.length - 1) continue;
    const currentCharElement = elements[inputIndex - i - 1] as HTMLSpanElement;

    currentCharElement.style.color = "black";
    currentCharElement.style.backgroundColor = "transparent";
  }
};
