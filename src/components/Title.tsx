import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <span className="mt-4 text-4xl font-bold">{children}</span>;
};

export default Title;
