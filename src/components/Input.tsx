import React, { InputHTMLAttributes } from "react";

type InputProps = {
  labelText: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1">
        <span className="font-medium">{labelText}</span>
        <input
          ref={ref}
          {...rest}
          className="border-[2px] border-neutral-900 rounded p-2"
        />
      </label>
    );
  }
);

export default Input;
