import React, { ButtonHTMLAttributes, ReactNode } from "react";

type SignWithProps = {
  children: ReactNode;
  labelText: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SignWith = ({ children, labelText, ...rest }: SignWithProps) => {
  return (
    <button
      className="flex justify-center items-center gap-1 py-1 px-4 rounded border-[2px] border-neutral-700 text-neutral-700"
      {...rest}
    >
      {children}
      <span>{labelText}</span>
    </button>
  );
};

export default SignWith;
