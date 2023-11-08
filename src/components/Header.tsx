import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";

const Header = () => {
  return (
    <header className="flex justify-center p-6 bg-neutral-900 mb-4 rounded-b-lg">
      <div className="flex w-[85%] max-sm:w-full items-center justify-between">
        <Link
          href={"/"}
          className="text-2xl max-sm:text-lg text-white font-semibold"
        >
          TypeFaster
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
