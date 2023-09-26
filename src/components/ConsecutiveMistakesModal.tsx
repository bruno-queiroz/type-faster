import React from "react";

interface ConsecutiveMistakesModalProps {
  modalData: {
    isOpen: boolean;
    word: string;
  };
}

const ConsecutiveMistakesModal = ({
  modalData: { isOpen, word },
}: ConsecutiveMistakesModalProps) => {
  return (
    <dialog open={isOpen} className="rounded p-4 z-10">
      <h3 className="text-xl font-semibold mb-4">Typo Alert</h3>
      <div className="flex flex-col gap-1">
        <p>
          You have to type the word <span className="bg-red-400">{word}</span>{" "}
          followed by space.
        </p>
        <p>
          Make sure you use proper capitalization and include all punctuation
        </p>
        <p>Now use your Backspace key to delete all the extra stuff.</p>
      </div>
    </dialog>
  );
};

export default ConsecutiveMistakesModal;
