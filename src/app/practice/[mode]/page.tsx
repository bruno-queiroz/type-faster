"use client";
import { addUnderlineToTheNewWord } from "@/utils/AddUnderlineToTheNewWord";
import { checkWord } from "@/utils/checkWord";
import { clearLetterStyles } from "@/utils/cleanLetterStyles";
import { removeUnderlineOfThePreviousWord } from "@/utils/removeUnderlineOfThePreviousWord";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";

const text = `Minus, assumenda laborum earum eos autem architecto rerum eligendi
similique nemo hic voluptatum in ut alias exercitationem quod, animi
corrupti, vero unde!`;

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
      const selectionStart = e.target.selectionStart;

      const currentCharElement = textElement.current?.children[
        inputIndex
      ] as HTMLSpanElement;

      setInput(e.target.value);

      if (
        textArray[inputIndex] === currentLastChar &&
        !isMisspelled.is &&
        !isDeleteContentBackward
      ) {
        setInputIndex(inputIndex + 1);
        currentCharElement.style.color = "green";

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
        } else {
          currentCharElement.style.color = "black";
          currentCharElement.style.backgroundColor = "transparent";
          setInputIndex(inputIndex - 1);
        }

        if (isMisspelled.is && isMisspelled.index === inputIndex - 1) {
          setIsMisspelled({
            is: false,
            index: 0,
          });
        }
      } else if (isDeleteWordBackward) {
        setInputIndex(inputIndex - (input.length - e.target.value.length));

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
      }
    }
  };

  // const onSelectText = (e: KeyboardEvent<HTMLInputElement>) => {
  //   const test = e.target as HTMLInputElement;
  //   // console.log("start", test.selectionStart);
  //   // console.log("end", test.selectionEnd);
  //   // console.log("input", input.length);
  // };

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4">
        <div>practice progress</div>
        <div className="flex flex-col gap-4 p-4 bg-gray-300 rounded">
          <p ref={textElement} className="font-mono">
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
            // onKeyUp={onSelectText}
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
