export const addCursor = (inputIndex: number, elements: HTMLCollection) => {
  const currentCharElement = elements[inputIndex] as HTMLSpanElement;
  const nextElement = elements[inputIndex + 1] as HTMLSpanElement;
  const firstCharElement = elements[0] as HTMLSpanElement;

  const isFirstChar = inputIndex === -1;
  if (isFirstChar) {
    firstCharElement.style.position = "relative";

    const cursor = document.createElement("div");
    cursor.style.left = "0";
    cursor.classList.add("cursor");

    firstCharElement.appendChild(cursor);
    return;
  }

  if (currentCharElement) {
    if (currentCharElement.textContent === " " && nextElement) {
      nextElement.style.position = "relative";

      const cursor = document.createElement("div");
      cursor.style.left = "0";
      cursor.classList.add("cursor");

      nextElement.appendChild(cursor);
    } else {
      currentCharElement.style.position = "relative";

      const cursor = document.createElement("div");
      cursor.style.right = "-1px";
      cursor.classList.add("cursor");

      currentCharElement.appendChild(cursor);
    }
  }
};
