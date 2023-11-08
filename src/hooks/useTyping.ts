import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

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
import { typosSet } from "@/utils/typosSet";
import { clearTextStyles } from "@/utils/clearTextStyles";
import { createTypingHistory } from "@/utils/createTypingHistory";
import { clearAllSetIntervals } from "@/utils/clearAllSetIntervals";
import { getText } from "@/services/api/getText";
import { useQuery } from "react-query";
import { addProgress } from "@/services/api/addProgress";
import { useSession } from "next-auth/react";

interface NativeEventMissingTypes extends Event {
  inputType: string;
  data: string | null;
}

let lettersTyped = 0;
export const [getTypingHistory, pushToHistory, clearTypingHistory] =
  createTypingHistory();
export const [getTypos, addTypo, clearTypos] = typosSet();

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
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [consecutiveMistakesCount, setConsecutiveMistakesCount] = useState(0);
  const [consecutiveMistakesModal, setConsecutiveMistakesModal] = useState({
    isOpen: false,
    word: "",
  });
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [accuracy, setAccuracy] = useState("0");
  const [time, setTime] = useState("0");
  const [cpm, setCpm] = useState("0");
  const [mistakeCount, setMistakeCount] = useState(0);

  const intervalId = useRef<NodeJS.Timer>();

  const { data: session, status } = useSession();

  const { data, refetch } = useQuery("text", getText, {
    onSuccess: () => restartTyping(),
  });

  useEffect(() => {
    const clearTimeoutsAndIntervals = () => {
      clearInterval(intervalId.current);
      clearAllSetIntervals(0);

      resetTypingHistory();
      resetTypingStates();
    };

    return clearTimeoutsAndIntervals;
  }, []);

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const textElement = getTextElement();
    const textArray = data?.text || [];

    if (!textElement.current) return;

    const nativeEvent = e.nativeEvent as NativeEventMissingTypes;

    const isDeleteContentBackward =
      nativeEvent.inputType === "deleteContentBackward";
    const isDeleteWordBackward = nativeEvent.inputType === "deleteWordBackward";

    const currentText = e.target.value;

    const selectionStart = e.target.selectionStart || 0;
    const currentCursorSafeIndex = selectionStart + currentWordBeginningIndex;

    const textElementChildren = textElement.current?.children;
    const currentCharElement = textElementChildren[
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

    const currentChar = currentText[currentText.length - 1];

    const isCorrectInput =
      textArray[inputIndex] === currentChar &&
      !isMisspelled.is &&
      !isDeleteContentBackward;

    let isCorrect = true;
    let isCheckWordNeeded = true;

    if (isCorrectInput) {
      const keyPressed = nativeEvent.data;

      if (inputIndex + 1 > lettersTyped) {
        lettersTyped++;
      }

      const isFinished = inputIndex === textArray.length - 1;
      if (isFinished) {
        endMatch();
      }

      const isFirstInput = lettersTyped === 1;
      if (isFirstInput) {
        setMistakeCount(0);
        clearTypos();

        const getCPM = getCPMContext();

        intervalId.current = setInterval(() => {
          const newCpm = getCPM(lettersTyped);
          setCpm(newCpm);
        }, 2000);
      }

      isCheckWordNeeded = false;

      const isInputHappeningBetweenLetters =
        input.length - 2 >= selectionStart!;

      if (isInputHappeningBetweenLetters) {
        isCheckWordNeeded = true;
      }

      if (keyPressed === " ") {
        addUnderlineToTheNewWord(
          inputIndex + 1,
          textArray,
          textElementChildren
        );
        removeUnderlineOfThePreviousWord(
          currentWordBeginningIndex,
          textArray,
          textElementChildren
        );

        setInput("");
        setCurrentWordBeginningIndex(inputIndex + 1);
      }
      if (currentWordBeginningIndex === 0) {
        addUnderlineToTheNewWord(inputIndex, textArray, textElementChildren);
      }
      setInputIndex(inputIndex + 1);
      currentCharElement.style.color = "green";

      removeCursor(inputIndex - 1, textElement.current.children);
      addCursor(inputIndex, textElement.current.children);
    } else if (isDeleteContentBackward) {
      const currentCharElement = textElementChildren[
        inputIndex - 1
      ] as HTMLSpanElement;

      const wasMoreThanOneLetterDeletedAtOnce =
        inputIndex - 1 !== e.target.value.length + currentWordBeginningIndex;

      if (wasMoreThanOneLetterDeletedAtOnce) {
        clearLetterStyles(input.length, textElementChildren, inputIndex);

        setConsecutiveMistakesModal({
          isOpen: false,
          word: "",
        });

        setConsecutiveMistakesCount(0);

        setInputIndex(e.target.value.length + currentWordBeginningIndex);

        addCursor(
          currentWordBeginningIndex - 1 + selectionStart,
          textElement.current.children
        );
        removeCursor(inputIndex - 1, textElement.current.children);
      } else {
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

        addCursor(currentCursorSafeIndex - 1, textElement.current.children);
        removeCursor(currentCursorSafeIndex, textElement.current.children);
      }
    } else if (isDeleteWordBackward) {
      clearLetterStyles(input.length, textElementChildren, inputIndex);

      setConsecutiveMistakesModal({
        isOpen: false,
        word: "",
      });

      setConsecutiveMistakesCount(0);

      setInputIndex(inputIndex - (input.length - e.target.value.length));

      addCursor(
        inputIndex - (input.length - e.target.value.length) - 1,
        textElement.current.children
      );
      removeCursor(inputIndex - 1, textElement.current.children);
    } else {
      const typingHistory = getTypingHistory();

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

      isCorrect = false;

      if (!isMisspelled.is) {
        setIsMisspelled({ is: true, index: inputIndex });
      }

      addCursor(currentCursorSafeIndex - 1, textElement.current.children);
      removeCursor(currentCursorSafeIndex - 2, textElement.current.children);

      setInputIndex(inputIndex + 1);
    }

    const isDeleteContent = isDeleteContentBackward || isDeleteWordBackward;

    const userGotAtLeastOneLetterRight = lettersTyped > 0;

    if (userGotAtLeastOneLetterRight) {
      pushToHistory({
        value: nativeEvent.data,
        isDeleteContent: isDeleteContent,
        startPoint: currentText.length - selectionStart,
        deletedAmount: input.length - currentText.length,
        cpm,
        accuracy: getAccuracy(mistakeCount, lettersTyped),
        isCorrect,
      });
    }

    if (isCheckWordNeeded) {
      const isMisspelledData = checkWord(
        e.target.value,
        textElementChildren,
        textArray,
        currentWordBeginningIndex,
        endMatch
      );

      setIsMisspelled(isMisspelledData);
    }
  };

  const endMatch = async () => {
    const typingHistory = getTypingHistory();

    clearInterval(intervalId.current);
    setIsTypingFinished(true);

    const typeAccuracy = getAccuracy(mistakeCount, lettersTyped);
    const typedTime = getTypingElapsedTime(typingHistory[0].time);

    setAccuracy(typeAccuracy);
    setTime(typedTime);

    if (!data?.id) return;

    if (status === "unauthenticated") {
      setIsSignUpModalOpen(true);
      return;
    }

    const typingData = {
      textId: data?.id,
      cpm,
      typos: mistakeCount,
      email: session?.user?.email || "",
    };

    await addProgress(typingData);
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
    clearTypingHistory();
    clearTypos();
    lettersTyped = 0;
  };

  const restartTyping = () => {
    const textElement = getTextElement();
    const textArray = data?.text || [];

    if (!textElement.current) return;
    const elements = textElement.current.children;

    removeCursor(currentWordBeginningIndex + input.length - 1, elements);

    resetTypingHistory();
    resetTypingStates();

    clearTextStyles(elements, "black", "#E5E7EB");

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

  const getNewText = () => {
    restartTyping();
    refetch();
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
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    onType,
    getNewText,
    restartTyping,
  };
};
