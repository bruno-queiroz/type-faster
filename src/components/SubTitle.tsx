import React, { ReactNode } from "react";

const SubTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="font-semibold text-2xl text-center my-4">{children}</h2>
  );
};

export default SubTitle;
