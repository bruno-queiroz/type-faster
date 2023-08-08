"use client";
import { addCursor } from "@/utils/addCursor";
import { addUnderlineToTheNewWord } from "@/utils/addUnderlineToTheNewWord";
import { checkWord } from "@/utils/checkWord";
import { clearLetterStyles } from "@/utils/cleanLetterStyles";
import { positionCursorCtrlLeft } from "@/utils/positionCursorCtrlLeft";
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

const text =
  "There before me was a woman who had finally, after all this time, made it to the start line, at the absolute worst moment imaginable. It was truly a tragic sight of a truly hopeless girl who had just begun her first love when it was far too late.";

const textArray: string[] = [];

for (let i = 0; i < text.length; i++) {
  const char = text[i];
  textArray.push(char);
}

interface MissingTypes extends Event {
  inputType: string;
  data: string | null;
}

const Page = ({ params }: { params: { mode: string } }) => {
  const [input, setInput] = useState("");
  const [inputIndex, setInputIndex] = useState(0);
  const [currentWordBeginningIndex, setCurrentWordBeginningIndex] = useState(0);
  const [isMisspelled, setIsMisspelled] = useState({
    is: false,
    index: 0,
  });
  const textElement = useRef<HTMLParagraphElement>(null);

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const nativeEvent = e.nativeEvent as MissingTypes;
    const isDeleteContentBackward =
      nativeEvent.inputType === "deleteContentBackward";
    const keyPressed = nativeEvent.data;
    const isDeleteWordBackward = nativeEvent.inputType === "deleteWordBackward";

    if (textElement.current) {
      const currentText = e.target.value;
      const currentLastChar = e.target.value[currentText.length - 1];
      const selectionStart = e.target.selectionStart || 0;
      const currentCursorSafeIndex = selectionStart + currentWordBeginningIndex;

      const currentCharElement = textElement.current?.children[
        inputIndex
      ] as HTMLSpanElement;

      setInput(e.target.value);

      const isCorrectInput =
        textArray[inputIndex] === currentLastChar &&
        !isMisspelled.is &&
        !isDeleteContentBackward;

      if (isCorrectInput) {
        if (input.length - 2 >= selectionStart!) {
          const isMisspelledData = checkWord(
            e.target.value,
            textElement.current?.children,
            textArray,
            currentWordBeginningIndex
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
            inputIndex + 1,
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
            currentWordBeginningIndex
          );

          setIsMisspelled(isMisspelledData);
          setInputIndex(e.target.value.length + currentWordBeginningIndex);

          addCursor(
            e.target.value.length + currentWordBeginningIndex - 1,
            textElement.current.children
          );
          removeCursor(inputIndex - 1, textElement.current.children);
        } else {
          currentCharElement.style.color = "black";
          currentCharElement.style.backgroundColor = "transparent";

          setInputIndex(inputIndex - 1);

          const isMisspelledData = checkWord(
            e.target.value,
            textElement.current?.children,
            textArray,
            currentWordBeginningIndex
          );

          setIsMisspelled(isMisspelledData);

          addCursor(currentCursorSafeIndex - 1, textElement.current.children);
          removeCursor(currentCursorSafeIndex, textElement.current.children);
        }
      } else if (isDeleteWordBackward) {
        clearLetterStyles(
          input.length,
          textElement.current?.children,
          inputIndex
        );

        const isMisspelledData = checkWord(
          e.target.value,
          textElement.current?.children,
          textArray,
          currentWordBeginningIndex
        );

        setIsMisspelled(isMisspelledData);
        setInputIndex(inputIndex - (input.length - e.target.value.length));

        addCursor(
          inputIndex - (input.length - e.target.value.length) - 1,
          textElement.current.children
        );
        removeCursor(inputIndex - 1, textElement.current.children);
      } else {
        if (!isMisspelled.is) {
          setIsMisspelled({ is: true, index: inputIndex });
        }

        const isMisspelledData = checkWord(
          e.target.value,
          textElement.current?.children,
          textArray,
          currentWordBeginningIndex
        );

        setIsMisspelled(isMisspelledData);

        setInputIndex(inputIndex + 1);
        addCursor(currentCursorSafeIndex - 1, textElement.current.children);
        removeCursor(currentCursorSafeIndex - 2, textElement.current.children);
      }
    }
  };

  const onSelectText = (e: KeyboardEvent<HTMLInputElement>) => {
    // const test = e.target as HTMLInputElement;
    // console.log(test);
    // console.log("start", test.selectionStart);
    // console.log("end", test.selectionEnd);
    // console.log("input", input.length);
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
        const newCursorPosition = positionCursorCtrlLeft(
          inputValue,
          cursorStart - 1
        );

        addCursor(
          currentWordBeginningIndex + newCursorPosition - 1,
          textElementChildren
        );

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );
      } else if ((isCtrl && key === "ArrowRight") || key === "ArrowDown") {
        addCursor(
          currentWordBeginningIndex + inputValue.length - 1,
          textElementChildren
        );

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );
      } else if (key === "ArrowLeft") {
        const safeCursorStart = cursorStart - 2 < -1 ? -1 : cursorStart - 2;

        addCursor(
          currentWordBeginningIndex + safeCursorStart,
          textElementChildren
        );

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );
      } else if (key === "ArrowRight") {
        const elementComputedStyles = getComputedStyle(
          textElementChildren[currentWordBeginningIndex + cursorStart]
        );
        const elementColor = elementComputedStyles.color;
        const elementBgColor = elementComputedStyles.backgroundColor;

        if (elementColor === blackText && elementBgColor === blackBg) {
          return;
        }
        addCursor(currentWordBeginningIndex + cursorStart, textElementChildren);

        removeCursor(
          currentWordBeginningIndex + cursorStart - 1,
          textElementChildren
        );
      }
    }
  };

  // const onClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
  //   const test = e.target as HTMLInputElement;
  //   console.log(test);
  //   console.log("start", test.selectionStart);
  //   console.log("end", test.selectionEnd);
  //   console.log("input", input.length);
  // };

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4">
        <div>practice progress</div>
        <div className="flex flex-col gap-4 p-4 bg-gray-300 rounded">
          <p ref={textElement} className="font-mono whitespace-pre-wrap">
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
            onKeyUp={onSelectText}
            onKeyDown={onKeyDownChangeCursor}
            // onClick={onClick}
          />
        </div>
        <div className="flex justify-between">
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

        <div>
          <div>this text is from</div>
        </div>
      </div>
    </section>
  );
};

export default Page;
