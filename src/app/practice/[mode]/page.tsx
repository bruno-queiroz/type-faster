"use client";
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
        if (keyPressed === " ") {
          setInput("");
        }
        currentCharElement.style.color = "green";
      } else if (isDeleteContentBackward) {
        const currentCharElement = textElement.current?.children[
          inputIndex - 1
        ] as HTMLSpanElement;
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
        setInputIndex(inputIndex + 1);
        currentCharElement.style.backgroundColor = "#F87171";
      }
    }
  };

  return (
    <section className="p-4">
      <div className="flex flex-col gap-4 bg-gray-200 rounded-md p-4">
        <div>practice progress</div>
        <div className="flex flex-col gap-4 p-4 bg-gray-300 rounded">
          <p ref={textElement}>
            {textArray.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </p>

          <input
            type="text"
            spellCheck="false"
            className="p-2 bg-gray-200"
            value={input}
            onChange={onType}
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
