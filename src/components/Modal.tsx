import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";

interface ModalProps {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, isModalOpen, setIsModalOpen }: ModalProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      if (!closeBtnRef.current) return;
      closeBtnRef.current.focus();
    }
  }, [isModalOpen]);
  return (
    <div
      className="w-full fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.2)]"
      onClick={() => setIsModalOpen(false)}
      style={{ position: isModalOpen ? "fixed" : "relative" }}
    >
      <dialog
        open={isModalOpen}
        className="mt-[20%] z-30 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-2 text-white text-lg font-bold"
          onClick={() => setIsModalOpen(false)}
          ref={closeBtnRef}
        >
          <CloseIcon />
        </button>
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
