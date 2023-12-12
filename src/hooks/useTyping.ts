import {
  ChangeEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { paintSelectedBackground } from "@/utils/paintSelectedBackground";
import { updateTextColors } from "@/utils/updateTextColors";
import { checkInput } from "@/utils/checkInput";
import { updateMisspells } from "@/utils/updateMisspells";

interface NativeEventMissingTypes extends Event {
  inputType: string;
  data: string | null;
}

interface Misspell {
  char: string;
  index: number;
}

export const WRONG_INPUT_COLOR = "#F87171";

let correctLettersTyped = 0;
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
  const [misspells, setMisspells] = useState<Misspell[]>([]);
  const [isTypingFinished, setIsTypingFinished] = useState(false);
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

  const { data, refetch, isFetching } = useQuery("text", getText, {
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
    const textArray = data?.data?.text || [];

    if (!textElement.current) return;
    if (isFetching) return e.preventDefault();

    const nativeEvent = e.nativeEvent as NativeEventMissingTypes;
    const isDeleteContentBackward =
      nativeEvent.inputType === "deleteContentBackward";
    const isDeleteWordBackward = nativeEvent.inputType === "deleteWordBackward";
    const keyPressed = nativeEvent.data || "";

    const currentText = e.target.value;
    const selectionStart = e.target.selectionStart || 0;
    const currentCursorSafeIndex = selectionStart + currentWordBeginningIndex;

    const textElementChildren = textElement.current?.children;
    const currentCharElement = textElementChildren[
      inputIndex
    ] as HTMLSpanElement;
    const isDeleting = isDeleteContentBackward || isDeleteWordBackward;

    if (!consecutiveMistakesModal.isOpen || isDeleting) {
      setInput(e.target.value);

      updateTextColors({
        currentWordBeginningIndex,
        elements: textElementChildren,
        inputValue: currentText,
        rightInputColor: "green",
        wrongInputColor: WRONG_INPUT_COLOR,
      });
    }

    if (isDeleting) {
      const updatedMisspells = updateMisspells({
        textArray,
        currentText,
        currentWordBeginningIndex,
      });
      setMisspells(updatedMisspells);

      const amountOfCharsDeleted =
        inputIndex - (currentWordBeginningIndex + currentText.length);

      if (consecutiveMistakesModal.isOpen && updatedMisspells.length === 0) {
        setConsecutiveMistakesModal({
          isOpen: false,
          word: "",
        });
      }
      setInputIndex(inputIndex - amountOfCharsDeleted);
      return;
    }

    if (misspells.length > 7) {
      setConsecutiveMistakesModal({
        isOpen: true,
        word: getWord(currentWordBeginningIndex, textArray),
      });
      return;
    }

    if (consecutiveMistakesModal.isOpen) return;

    setInputIndex(inputIndex + 1);
    const inputData = checkInput({
      selectionStart,
      currentWordBeginningIndex,
      keyPressed,
      textArray,
    });

    if (inputData.isMisspelled) {
      setMistakeCount(mistakeCount + 1);
      setMisspells([...misspells, { char: keyPressed, index: inputIndex }]);
      return;
    }

    const isFirstInput = correctLettersTyped === 1;
    if (isFirstInput) {
      setMistakeCount(0);
      clearTypos();

      const getCPM = getCPMContext();

      intervalId.current = setInterval(() => {
        const newCpm = getCPM(correctLettersTyped);
        setCpm(newCpm);
      }, 2000);
    }

    if (keyPressed === " " && misspells.length === 0) {
      addUnderlineToTheNewWord(inputIndex + 1, textArray, textElementChildren);
      removeUnderlineOfThePreviousWord(
        currentWordBeginningIndex,
        textArray,
        textElementChildren
      );

      setInput("");
      setCurrentWordBeginningIndex(inputIndex + 1);
    }
  };

  const endMatch = async () => {
    const typingHistory = getTypingHistory();

    clearInterval(intervalId.current);
    setIsTypingFinished(true);

    const typeAccuracy = getAccuracy(mistakeCount, correctLettersTyped);
    const typedTime = getTypingElapsedTime(typingHistory[0].time);

    setAccuracy(typeAccuracy);
    setTime(typedTime);

    if (!data?.data?.id) return;

    if (status === "unauthenticated") {
      setIsSignUpModalOpen(true);
      return;
    }

    if (data.data.mode === "repeated-words") return;

    const typingData = {
      textId: data?.data.id,
      cpm,
      typos: mistakeCount,
      email: session?.user?.email || "",
    };

    await addProgress(typingData);
  };

  const closeConsecutiveMistakesModal = () => {
    setConsecutiveMistakesModal({
      isOpen: false,
      word: "",
    });
  };

  const resetTypingStates = () => {
    setCurrentWordBeginningIndex(0);
    setMisspells([]);
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
    correctLettersTyped = 0;
  };

  const restartTyping = () => {
    const textElement = getTextElement();
    const textArray = data?.data?.text || [];

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
    }, 10);
  };

  const showSelectedText = (
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const textElement = getTextElement();

    if (!textElement.current) return;
    if (!data?.data?.text) return;
    if (isFetching) return e.preventDefault();

    const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;
    const selectionEnd = (e.target as HTMLInputElement).selectionEnd || 0;

    const textElementChildren = textElement.current?.children;

    paintSelectedBackground(
      textElementChildren,
      currentWordBeginningIndex,
      data.data.text.length,
      selectionStart,
      selectionEnd,
      "white"
    );
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
    misspells,
    inputIndex,
    currentWordBeginningIndex,
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    closeConsecutiveMistakesModal,
    onType,
    getNewText,
    showSelectedText,
    restartTyping,
  };
};
