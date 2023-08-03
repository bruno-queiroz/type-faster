export const removeCursor = (inputIndex: number, elements: HTMLCollection) => {
  const spanElement = elements[inputIndex];
  const nextSpanElement = elements[inputIndex + 1];

  if (spanElement?.textContent === " ") {
    const cursor = nextSpanElement?.querySelector("div");
    cursor?.remove();
  } else {
    const cursor = spanElement?.querySelector("div");
    cursor?.remove();
  }
};
