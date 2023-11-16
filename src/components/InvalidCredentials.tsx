import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";

interface InvalidCredentialsProps {
  isInvalidCredentialsOpen: boolean;
  setIsInvalidCredentialsOpen: Dispatch<SetStateAction<boolean>>;
}

const InvalidCredentials = ({
  isInvalidCredentialsOpen,
  setIsInvalidCredentialsOpen,
}: InvalidCredentialsProps) => {
  const closeNotification = () => {
    setIsInvalidCredentialsOpen(false);
  };

  return (
    <div
      className="max-w-[400px] w-full relative p-4 mb-2 rounded bg-red-500 text-white font-semibold"
      style={{ display: isInvalidCredentialsOpen ? "block" : "none" }}
    >
      Invalid Credentials.
      <button className="absolute right-1 top-2" onClick={closeNotification}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default InvalidCredentials;
