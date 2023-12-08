interface CheckInput {
  selectionStart: number;
  keyPressed: string;
  textArray: string[];
  currentWordBeginningIndex: number;
}

export const checkInput = ({
  selectionStart,
  keyPressed,
  textArray,
  currentWordBeginningIndex,
}: CheckInput) => {
  const inputIndex = currentWordBeginningIndex + selectionStart;
  if (keyPressed === textArray[inputIndex]) {
    return {
      isMisspelled: false,
      index: 0,
    };
  }

  return {
    isMisspelled: true,
    index: inputIndex,
  };
};
