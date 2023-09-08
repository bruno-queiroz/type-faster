"use client";
import { addCursor } from "@/utils/addCursor";
import { addUnderlineToTheNewWord } from "@/utils/addUnderlineToTheNewWord";
import { checkWord } from "@/utils/checkWord";
import { clearLetterStyles } from "@/utils/clearLetterStyles";
import { getCursorPositionCtrlRight } from "@/utils/getCursorPositionCtrlRight";
import { getCursorPositionCtrlLeft } from "@/utils/getCursorPositionCtrlLeft";
import { removeCursor } from "@/utils/removeCursor";
import { removeUnderlineOfThePreviousWord } from "@/utils/removeUnderlineOfThePreviousWord";
import Link from "next/link";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { removeCursorFromWord } from "@/utils/removeCursorFromWord";
import { getCPMContext } from "@/utils/getCPM";
import { getAccuracy } from "@/utils/getAccuracy";
import { getTypingElapsedTime } from "@/utils/getTypingElapsedTime";
import ConsecutiveMistakesModal from "@/components/ConsecutiveMistakesModal";
import { getWord } from "@/utils/getWord";
import TypedProgressBar from "@/components/TypedProgressBar";
import { getTypedProgress } from "@/utils/getTypedProgress";
import TypeReview from "@/components/TypeReview";
import Mistakes from "@/components/Mistakes";
import { customSet } from "@/utils/customSet";
import TypeInfo from "@/components/TypeInfo";

const text =
  "At three in the morning the blood runs slow and thick, and slumber is heavy.";
const textArray: string[] = [];

for (let i = 0; i < text.length; i++) {
  const char = text[i];
  textArray.push(char);
}

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

export interface TypingReview {
  value: string;
  cpm: number;
  accuracy: string;
}

let lettersTyped = 0;
export let typingHistory: TypingHistory[] = [];
export const [typos, addTypo, clearSet] = customSet();

const Page = ({ params }: { params: { mode: string } }) => {
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

  const textElement = useRef<HTMLParagraphElement>(null);

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const nativeEvent = e.nativeEvent as NativeEventMissingTypes;
    const isDeleteContentBackward =
      nativeEvent.inputType === "deleteContentBackward";
    const keyPressed = nativeEvent.data;
    const isDeleteWordBackward = nativeEvent.inputType === "deleteWordBackward";

    if (!isMisspelled.is && consecutiveMistakesCount > 0) {
      setConsecutiveMistakesCount(0);
    }

    if (textElement.current) {
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

        if (input.length - 2 >= selectionStart!) {
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

  const onKeyDownChangeCursor = (e: KeyboardEvent<HTMLInputElement>) => {
    if (textElement.current) {
      const key = e.key;
      const isCtrl = e.ctrlKey;
      const cursorStart = (e.target as HTMLInputElement).selectionStart || 0;
      const textElementChildren = textElement.current.children;
      const inputValue = (e.target as HTMLInputElement).value;
      const blackBg = "rgba(0, 0, 0, 0)";
      const blackText = "rgb(0, 0, 0)";

      if ((isCtrl && key === "ArrowLeft") || key === "ArrowUp") {
        const newCursorPosition = getCursorPositionCtrlLeft(
          inputValue,
          cursorStart - 1
        );

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );

        addCursor(
          currentWordBeginningIndex + newCursorPosition,
          textElementChildren
        );
      } else if ((isCtrl && key === "ArrowRight") || key === "ArrowDown") {
        const newCursorPosition = getCursorPositionCtrlRight(
          inputValue,
          cursorStart - 1
        );

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );

        addCursor(
          currentWordBeginningIndex + newCursorPosition,
          textElementChildren
        );
      } else if (key === "ArrowLeft") {
        const safeCursorStart = cursorStart - 2 < -1 ? -1 : cursorStart - 2;

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );

        addCursor(
          currentWordBeginningIndex + safeCursorStart,
          textElementChildren
        );
      } else if (key === "ArrowRight") {
        if (textElementChildren[currentWordBeginningIndex + cursorStart]) {
          const elementComputedStyles = getComputedStyle(
            textElementChildren[currentWordBeginningIndex + cursorStart]
          );
          const elementColor = elementComputedStyles.color;
          const elementBgColor = elementComputedStyles.backgroundColor;

          if (elementColor === blackText && elementBgColor === blackBg) {
            return;
          }

          removeCursor(
            currentWordBeginningIndex + cursorStart - 1,
            textElementChildren
          );

          addCursor(
            currentWordBeginningIndex + cursorStart,
            textElementChildren
          );
        }
      }
    }
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

  const restartTyping = () => {
    if (!textElement.current) return;

    resetTypingStates();

    typingHistory = [];
    clearSet();
    lettersTyped = 0;
  };

  const onClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    if (textElement.current) {
      const textElementChildren = textElement.current.children;
      const selectionStart = (e.target as HTMLInputElement).selectionStart || 0;

      removeCursorFromWord(
        currentWordBeginningIndex,
        textElementChildren,
        textArray.length - 1
      );
      addCursor(
        currentWordBeginningIndex + selectionStart - 1 || 1,
        textElementChildren
      );
    }
  };

  return (
    <section className="p-4">
      <div>
        <div
          className="flex flex-col gap-4 bg-gray-200 p-4 pb-0"
          style={{ display: isTypingFinished ? "none" : "flex" }}
        >
          <ConsecutiveMistakesModal modalData={consecutiveMistakesModal} />

          <div>
            <div className="border-[2px] border-black w-[max-content] py-1 rounded px-4 ml-auto">
              {cpm}
            </div>
            <div className="mt-4">
              <TypedProgressBar
                progress={getTypedProgress(textArray.length, inputIndex)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 bg-gray-300 rounded">
            <p
              ref={textElement}
              className="font-mono whitespace-pre-wrap select-none"
            >
              {textArray.map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </p>

            <input
              type="text"
              spellCheck="false"
              className="p-2 bg-gray-200"
              style={{ backgroundColor: isMisspelled.is ? "#F87171" : "" }}
              value={input}
              onChange={onType}
              onKeyDown={onKeyDownChangeCursor}
              onClick={onClick}
              onPaste={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div className="flex justify-between bg-gray-200 p-4">
          <Link
            href={"/"}
            className="py-2 px-4 rounded bg-white text-neutral-900"
          >
            Back Home
          </Link>
          <button
            type="button"
            className="py-2 px-4 rounded bg-neutral-900 text-white"
          >
            New Text
          </button>
        </div>

        {isTypingFinished && (
          <>
            <TypeInfo {...{ cpm, accuracy, time, restartTyping }} />
            <Mistakes />
            <TypeReview />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
