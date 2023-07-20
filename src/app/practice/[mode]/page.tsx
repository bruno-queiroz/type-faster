"use client";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";

const text = `dolor sit amet consectetur adipisicing elit. Minus,
assumenda laborum earum eos autem architecto rerum eligendi
similique nemo hic voluptatum in ut alias exercitationem quod, animi
corrupti, vero unde!`;

const textArray: string[] = [];

for (let i = 0; i < text.length; i++) {
  const char = text[i];
  textArray.push(char);
}

interface MissingTypes extends Event {
  inputType: string;
}

const Page = ({ params }: { params: { mode: string } }) => {
  const [input, setInput] = useState("");
  const [isMisspelled, setIsMisspelled] = useState({
    is: false,
    index: 0,
  });
  const textElement = useRef<HTMLParagraphElement>(null);

  const type = (e: ChangeEvent<HTMLInputElement>) => {
    const isDeleteContentBackward =
      (e.nativeEvent as MissingTypes).inputType === "deleteContentBackward";

    if (textElement.current) {
      const currentCharElement = textElement.current?.children[
        input.length
      ] as HTMLSpanElement;

      setInput(e.target.value);
      const currentText = e.target.value;
      const currentLastChar = e.target.value[currentText.length - 1];

      if (
        textArray[input.length] === currentLastChar &&
        !isMisspelled.is &&
        !isDeleteContentBackward
      ) {
        currentCharElement.style.color = "green";
      } else if (isDeleteContentBackward) {
        const currentCharElement = textElement.current?.children[
          input.length - 1
        ] as HTMLSpanElement;
        if (isMisspelled.is && isMisspelled.index === input.length - 1) {
          setIsMisspelled({
            is: false,
            index: 0,
          });
        }

        currentCharElement.style.color = "black";
        currentCharElement.style.backgroundColor = "transparent";
      } else {
        if (!isMisspelled.is) {
          setIsMisspelled({ is: true, index: input.length });
        }
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
            onChange={type}
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
