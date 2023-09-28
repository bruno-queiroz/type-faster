import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  py?: string;
  bg?: string;
  text?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ bg, py, text, children, ...rest }: ButtonProps) => {
  const styles = {
    backgroundColor: bg || "#171717",
    paddingTop: py || "8px",
    paddingBottom: py || "8px",
    color: text || "white",
  };

  return (
    <button className="rounded px-4 outline-green-400" style={styles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
