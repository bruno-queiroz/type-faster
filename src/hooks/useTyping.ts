import { ChangeEvent, RefObject, useState } from "react";

import { addCursor } from "@/utils/addCursor";
import { addUnderlineToTheNewWord } from "@/utils/addUnderlineToTheNewWord";
import { checkWord } from "@/utils/checkWord";
import { clearLetterStyles } from "@/utils/clearLetterStyles";
import { removeCursor } from "@/utils/removeCursor";
import { removeUnderlineOfThePreviousWord } from "@/utils/removeUnderlineOfThePreviousWord";
import { getCPMContext } from "@/utils/getCPM";
import { getAccuracy } from "@/utils/getAccuracy";
import { getTypingElapsedTime } from "@/utils/getTypingElapsedTime";
import { getWord } from "@/utils/getWord";
import { customSet } from "@/utils/customSet";
import { clearTextStyles } from "@/utils/clearTextStyles";
import { textArray } from "@/app/practice/[mode]/page";

interface NativeEventMissingTypes extends Event {
  inputType: string;
  data: string | null;
}

export interface TypingHistory {
  value: string;
  time: number;
  isDeleteContent: boolean;
  startPoint: number;
  deletedAmount: number;
  cpm: string;
  accuracy: string;
  isCorrect: boolean;
}

let lettersTyped = 0;
export let typingHistory: TypingHistory[] = [];
export const [typos, addTypo, clearSet] = customSet();

export const useTyping = (
  getTextElement: () => RefObject<HTMLParagraphElement>,
  getInputElement: () => RefObject<HTMLInputElement>
) => {
  const [input, setInput] = useState("");
  const [inputIndex, setInputIndex] = useState(0);
  const [currentWordBeginningIndex, setCurrentWordBeginningIndex] = useState(0);
  const [isMisspelled, setIsMisspelled] = useState({
    is: false,
    index: 0,
  });
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [consecutiveMistakesCount, setConsecutiveMistakesCount] = useState(0);
  const [consecutiveMistakesModal, setConsecutiveMistakesModal] = useState({
    isOpen: false,
    word: "",
  });
  const [accuracy, setAccuracy] = useState("0");
  const [time, setTime] = useState("0");
  const [cpm, setCpm] = useState("0");
  const [mistakeCount, setMistakeCount] = useState(0);

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const textElement = getTextElement();
    const nativeEvent = e.nativeEvent as NativeEventMissingTypes;
    const isDeleteContentBackward =
      nativeEvent.inputType === "deleteContentBackward";
    const keyPressed = nativeEvent.data;
    const isDeleteWordBackward = nativeEvent.inputType === "deleteWordBackward";

    if (!isMisspelled.is && consecutiveMistakesCount > 0) {
      setConsecutiveMistakesCount(0);
    }

    if (!textElement.current) return;

    const currentText = e.target.value;
    const currentChar = currentText[currentText.length - 1];
    const selectionStart = e.target.selectionStart || 0;
    const currentCursorSafeIndex = selectionStart + currentWordBeginningIndex;

    const currentCharElement = textElement.current?.children[
      inputIndex
    ] as HTMLSpanElement;

    const isMoreThanFiveConsecutiveMistakes =
      isMisspelled.is && consecutiveMistakesCount > 5;
    if (isMoreThanFiveConsecutiveMistakes) {
      if (isDeleteContentBackward || isDeleteWordBackward) {
        setInput(e.target.value);
      }
    } else {
      setInput(e.target.value);
    }

    const isCorrectInput =
      textArray[inputIndex] === currentChar &&
      !isMisspelled.is &&
      !isDeleteContentBackward;

    if (isCorrectInput) {
      if (inputIndex + 1 > lettersTyped) {
        lettersTyped++;
      }

      typingHistory.push({
        value: nativeEvent.data!,
        time: new Date().getTime(),
        isDeleteContent: false,
        startPoint: currentText.length - selectionStart,
        deletedAmount: 0,
        cpm,
        accuracy: getAccuracy(mistakeCount, lettersTyped),
        isCorrect: true,
      });

      const isFinished = inputIndex === textArray.length - 1;
      if (isFinished) {
        endMatch();
      }

      const isFirstInput = lettersTyped === 1;
      if (isFirstInput) {
        const getCPM = getCPMContext();

        const intervalId = setInterval(() => {
          const newCpm = getCPM(lettersTyped);
          setCpm(newCpm);
        }, 2000);
        setIntervalId(intervalId);
      }
      const isInputHappeningBetweenLetters =
        input.length - 2 >= selectionStart!;

      if (isInputHappeningBetweenLetters) {
        const isMisspelledData = checkWord(
          e.target.value,
          textElement.current?.children,
          textArray,
          currentWordBeginningIndex,
          endMatch
        );

        setIsMisspelled(isMisspelledData);
      }

      if (keyPressed === " ") {
        addUnderlineToTheNewWord(
          inputIndex + 1,
          textArray,
          textElement.current?.children
        );
        removeUnderlineOfThePreviousWord(
          currentWordBeginningIndex,
          textArray,
          textElement.current?.children
        );

        setInput("");
        setCurrentWordBeginningIndex(inputIndex + 1);
      }
      if (currentWordBeginningIndex === 0) {
        addUnderlineToTheNewWord(
          inputIndex,
          textArray,
          textElement.current?.children
        );
      }
      setInputIndex(inputIndex + 1);
      currentCharElement.style.color = "green";

      removeCursor(inputIndex - 1, textElement.current.children);
      addCursor(inputIndex, textElement.current.children);
    } else if (isDeleteContentBackward) {
      const currentCharElement = textElement.current?.children[
        inputIndex - 1
      ] as HTMLSpanElement;

      const wasMoreThanOneLetterDeletedAtOnce =
        inputIndex - 1 !== e.target.value.length + currentWordBeginningIndex;

      typingHistory.push({
        value: "Backspace",
        time: new Date().getTime(),
        isDeleteContent: true,
        startPoint: currentText.length - selectionStart,
        deletedAmount: input.length - currentText.length,
        cpm,
        accuracy: getAccuracy(mistakeCount, lettersTyped),
        isCorrect: true,
      });

      if (wasMoreThanOneLetterDeletedAtOnce) {
        clearLetterStyles(
          input.length,
          textElement.current?.children,
          inputIndex
        );

        const isMisspelledData = checkWord(
          e.target.value,
          textElement.current?.children,
          textArray,
          currentWordBeginningIndex,
          endMatch
        );

        setIsMisspelled(isMisspelledData);
        setInputIndex(e.target.value.length + currentWordBeginningIndex);

        addCursor(
          e.target.value.length + currentWordBeginningIndex - 1,
          textElement.current.children
        );
        removeCursor(inputIndex - 1, textElement.current.children);
        return;
      }

      if (currentCharElement) {
        currentCharElement.style.color = "black";
        currentCharElement.style.backgroundColor = "transparent";
      }

      if (consecutiveMistakesCount > 0) {
        setConsecutiveMistakesCount((prev) => prev - 1);
      }

      if (consecutiveMistakesCount === 1) {
        setConsecutiveMistakesModal({
          isOpen: false,
          word: "",
        });
      }

      setInputIndex(inputIndex - 1);

      const isMisspelledData = checkWord(
        e.target.value,
        textElement.current?.children,
        textArray,
        currentWordBeginningIndex,
        endMatch
      );

      setIsMisspelled(isMisspelledData);

      addCursor(currentCursorSafeIndex - 1, textElement.current.children);
      removeCursor(currentCursorSafeIndex, textElement.current.children);
    } else if (isDeleteWordBackward) {
      clearLetterStyles(
        input.length,
        textElement.current?.children,
        inputIndex
      );

      typingHistory.push({
        value: "Backspace",
        time: new Date().getTime(),
        isDeleteContent: true,
        startPoint: currentText.length - selectionStart,
        deletedAmount: input.length - currentText.length,
        cpm,
        accuracy: getAccuracy(mistakeCount, lettersTyped),
        isCorrect: true,
      });

      setConsecutiveMistakesModal({
        isOpen: false,
        word: "",
      });

      const isMisspelledData = checkWord(
        e.target.value,
        textElement.current?.children,
        textArray,
        currentWordBeginningIndex,
        endMatch
      );

      setIsMisspelled(isMisspelledData);
      setInputIndex(inputIndex - (input.length - e.target.value.length));

      addCursor(
        inputIndex - (input.length - e.target.value.length) - 1,
        textElement.current.children
      );
      removeCursor(inputIndex - 1, textElement.current.children);
    } else {
      addTypo({
        word: getWord(currentWordBeginningIndex, textArray),
        typingHistoryIndex: typingHistory.length,
      });

      if (consecutiveMistakesCount > 5) {
        const word = getWord(currentWordBeginningIndex, textArray);

        setConsecutiveMistakesModal({
          isOpen: true,
          word,
        });
        return;
      }
      setConsecutiveMistakesCount((prev) => prev + 1);
      setMistakeCount(mistakeCount + 1);

      typingHistory.push({
        value: nativeEvent.data!,
        time: new Date().getTime(),
        isDeleteContent: false,
        startPoint: currentText.length - selectionStart,
        deletedAmount: 0,
        cpm,
        accuracy: getAccuracy(mistakeCount, lettersTyped),
        isCorrect: false,
      });

      if (!isMisspelled.is) {
        setIsMisspelled({ is: true, index: inputIndex });
      }

      const isMisspelledData = checkWord(
        e.target.value,
        textElement.current?.children,
        textArray,
        currentWordBeginningIndex,
        endMatch
      );
      setIsMisspelled(isMisspelledData);

      addCursor(currentCursorSafeIndex - 1, textElement.current.children);
      removeCursor(currentCursorSafeIndex - 2, textElement.current.children);

      setInputIndex(inputIndex + 1);
    }
  };

  const endMatch = () => {
    clearInterval(intervalId);
    setIsTypingFinished(true);

    const typeAccuracy = getAccuracy(mistakeCount, lettersTyped);
    const typedTime = getTypingElapsedTime(typingHistory[0].time);

    setAccuracy(typeAccuracy);
    setTime(typedTime);
  };

  const resetTypingStates = () => {
    setCurrentWordBeginningIndex(0);
    setIsMisspelled({ index: 0, is: false });
    setIsTypingFinished(false);
    setInputIndex(0);
    setInput("");

    setCpm("0");
    setAccuracy("0");
    setTime("0");
    setMistakeCount(0);
  };

  const resetTypingHistory = () => {
    typingHistory = [];
    clearSet();
    lettersTyped = 0;
  };

  const restartTyping = () => {
    const textElement = getTextElement();

    if (!textElement.current) return;
    const elements = textElement.current.children;

    resetTypingHistory();
    resetTypingStates();

    clearTextStyles(elements, "black", "#D1D5DB");

    removeCursor(textArray.length - 1, elements);

    removeUnderlineOfThePreviousWord(
      currentWordBeginningIndex,
      textArray,
      elements
    );

    setTimeout(() => {
      const inputElement = getInputElement();

      inputElement.current?.focus();
    }, 0);
  };

  return {
    input,
    isTypingFinished,
    cpm,
    accuracy,
    time,
    consecutiveMistakesModal,
    isMisspelled,
    inputIndex,
    currentWordBeginningIndex,
    onType,
    restartTyping,
  };
};
