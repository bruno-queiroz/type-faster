import React, { ReactNode } from "react";

interface SignWithProps {
  children: ReactNode;
  labelText: string;
}

const SignWith = ({ children, labelText }: SignWithProps) => {
  return (
    <button className="flex justify-center items-center gap-1 py-1 px-4 rounded border-[2px] border-neutral-700 text-neutral-700">
      {children}
      <span>{labelText}</span>
    </button>
  );
};

export default SignWith;
