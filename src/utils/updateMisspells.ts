interface UpdateMisspells {
  textArray: string[];
  currentText: string;
  currentWordBeginningIndex: number;
}

export const updateMisspells = ({
  textArray,
  currentText,
  currentWordBeginningIndex,
}: UpdateMisspells) => {
  const updatedMisspells = [];
  let isMisspelled = false;
  for (let i = 0; i < currentText.length; i++) {
    const rightChar = textArray[currentWordBeginningIndex + i];
    const typedChar = currentText[i];

    if (rightChar === typedChar && !isMisspelled) continue;

    updatedMisspells.push({
      char: typedChar,
      index: currentWordBeginningIndex + i,
    });
    isMisspelled = true;
  }

  return updatedMisspells;
};
