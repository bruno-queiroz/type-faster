"use client";
import { checkWord } from "@/utils/checkWord";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

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
        if (input.length - 2 >= selectionStart!) {
          const isMisspelledData = checkWord(
            inputIndex,
            e.target.value,
            textElement.current?.children,
            textArray,
            currentWordBeginningIndex
          );

          setIsMisspelled(isMisspelledData);
        }
        if (keyPressed === " ") {
          setCurrentWordBeginningIndex(inputIndex + 1);
          setInput("");
        }
        currentCharElement.style.color = "green";
      } else if (isDeleteContentBackward) {
        const currentCharElement = textElement.current?.children[
          inputIndex - 1
        ] as HTMLSpanElement;

        if (input.length - 2 >= selectionStart!) {
          const isMisspelledData = checkWord(
            inputIndex,
            e.target.value,
            textElement.current?.children,
            textArray,
            currentWordBeginningIndex
          );

          setIsMisspelled(isMisspelledData);
        }

        if (isMisspelled.is && isMisspelled.index === inputIndex - 1) {
          setIsMisspelled({
            is: false,
            index: 0,
          });
        }
        setInputIndex(inputIndex - 1);

        currentCharElement.style.color = "black";
        currentCharElement.style.backgroundColor = "transparent";
      } else if (isDeleteWordBackward) {
        setInputIndex(inputIndex - input.length);

        const isMisspelledData = checkWord(
          inputIndex,
          e.target.value,
          textElement.current?.children,
          textArray,
          currentWordBeginningIndex
        );

        setIsMisspelled(isMisspelledData);

        for (let i = 0; i < input.length; i++) {
          const currentCharElement = textElement.current?.children[
            inputIndex - i - 1
          ] as HTMLSpanElement;

          currentCharElement.style.color = "black";
          currentCharElement.style.backgroundColor = "transparent";
        }
      } else {
        if (!isMisspelled.is) {
          setIsMisspelled({ is: true, index: inputIndex });
        }

        const isMisspelledData = checkWord(
          inputIndex,
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
