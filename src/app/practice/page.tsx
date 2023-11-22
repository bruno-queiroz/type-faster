"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import { useRef } from "react";

import { useTyping } from "@/hooks/useTyping";

import { getText } from "@/services/api/getText";

import { getTypedProgress } from "@/utils/getTypedProgress";
import { onKeyDownChangeCursor } from "@/utils/onKeyDownChangeCursor";
import { onClickChangeCursor } from "@/utils/onClickChangeCursor";

import ConsecutiveMistakesModal from "@/components/ConsecutiveMistakesModal";
import TypedProgressBar from "@/components/TypedProgressBar";
import TypeReview from "@/components/TypeReview";
import Mistakes from "@/components/Mistakes";
import TypeInfo from "@/components/TypeInfo";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SignUpModal from "@/components/SignUpModal";
import Top10 from "@/components/Top10";
import LoadingText from "@/components/LoadingText";

const Page = () => {
  const textElement = useRef<HTMLParagraphElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  const {
    input,
    isTypingFinished,
    isMisspelled,
    consecutiveMistakesModal,
    cpm,
    accuracy,
    time,
    inputIndex,
    currentWordBeginningIndex,
    isSignUpModalOpen,
    setIsSignUpModalOpen,
    onType,
    getNewText,
    showSelectedText,
    restartTyping,
  } = useTyping(
    () => textElement,
    () => inputElement
  );

  const { data, isLoading } = useQuery("text", getText);

  return (
    <section className="flex flex-col flex-1 items-center p-4">
      <Modal
        isModalOpen={isSignUpModalOpen}
        setIsModalOpen={setIsSignUpModalOpen}
      >
        <SignUpModal />
      </Modal>
      <div className="w-[85%] max-sm:w-full">
        <div
          className="flex flex-col gap-4 bg-gray-100 p-4 pb-0"
          style={{ display: isTypingFinished ? "none" : "flex" }}
        >
          <ConsecutiveMistakesModal modalData={consecutiveMistakesModal} />

          <div>
            <div className="border-[2px] border-black w-[max-content] py-1 rounded px-4 ml-auto">
              {cpm}
            </div>
            <div className="mt-4">
              <TypedProgressBar
                progress={getTypedProgress(data?.text.length, inputIndex)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 bg-gray-200 rounded">
            <p
              ref={textElement}
              className="font-mono whitespace-pre-wrap select-none"
            >
              {isLoading ? (
                <LoadingText />
              ) : (
                data?.text?.map((char, index) => (
                  <span key={index}>{char}</span>
                ))
              )}
            </p>

            <input
              type="text"
              spellCheck="false"
              className="p-2 bg-gray-100"
              style={{ backgroundColor: isMisspelled.is ? "#F87171" : "" }}
              disabled={isLoading}
              value={input}
              onChange={onType}
              onKeyDown={(e) =>
                onKeyDownChangeCursor(e, textElement, currentWordBeginningIndex)
              }
              onClick={(e) =>
                onClickChangeCursor(
                  e,
                  textElement,
                  currentWordBeginningIndex,
                  data?.text.length
                )
              }
              onMouseMove={showSelectedText}
              onPaste={(e) => e.preventDefault()}
              ref={inputElement}
            />
          </div>
        </div>
        <div className="flex justify-between bg-gray-100 p-4">
          <Link
            href={"/"}
            className="py-2 px-4 rounded bg-white text-neutral-900"
          >
            Back Home
          </Link>
          <Button type="button" onClick={getNewText}>
            New Text
          </Button>
        </div>

        {isTypingFinished && (
          <>
            <TypeInfo {...{ cpm, accuracy, time, restartTyping }} />
            <Mistakes />
            <TypeReview />
            <Top10 />
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
