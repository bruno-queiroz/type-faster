export const clearLetterStyles = (
  letterAmount: number,
  elements: HTMLCollection,
  inputIndex: number
) => {
  for (let i = 0; i < letterAmount; i++) {
    const currentCharElement = elements[inputIndex - i - 1] as HTMLSpanElement;

    if (!currentCharElement) continue;

    currentCharElement.style.color = "black";
    currentCharElement.style.backgroundColor = "transparent";
  }
};
