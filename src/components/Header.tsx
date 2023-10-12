import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";

const Header = () => {
  return (
    <header className="p-6 bg-neutral-900 mb-4 rounded-b-lg">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="text-white font-semibold">
          TypeFaster
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
