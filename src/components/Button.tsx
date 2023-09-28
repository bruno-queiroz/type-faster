import React, { ReactNode } from "react";

interface ButtonProps {
  py?: string;
  bg?: string;
  text?: string;
  children: ReactNode;
}

const Button = ({ bg, py, text, children }: ButtonProps) => {
  const styles = {
    backgroundColor: bg || "#171717",
    paddingTop: py || "8px",
    paddingBottom: py || "8px",
    color: text || "white",
  };

  return (
    <button className="rounded outline-green-400" style={styles}>
      {children}
    </button>
  );
};

export default Button;
