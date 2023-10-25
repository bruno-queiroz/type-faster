import { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, isModalOpen, setIsModalOpen }: ModalProps) => {
  return (
    <div
      className="w-full fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.2)]"
      onClick={() => setIsModalOpen(false)}
      style={{ position: isModalOpen ? "fixed" : "relative" }}
    >
      <dialog
        open={isModalOpen}
        className="mt-[20%] z-30"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
