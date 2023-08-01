export const addCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;

  if (currentCharElement) {
    currentCharElement.style.position = "relative";

    const cursor = document.createElement("div");
    cursor.classList.add("cursor");

    currentCharElement.appendChild(cursor);
  }
};
