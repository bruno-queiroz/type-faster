export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const spanElement = elements[inputIndex];

  const cursor = spanElement?.querySelector("div");
  cursor?.remove();
};
