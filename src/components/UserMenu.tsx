"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";

const UserMenu = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="min-w-[250px]">
      <div
        className="absolute w-full h-full top-0 cursor-pointer"
        onClick={handleMenu}
      />

      <div
        className="absolute right-0 top-[55px] bg-neutral-800 rounded text-white pb-4"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        {children}
        <div className="border-t-[1px] border-t-neutral-500 w-[80%] mx-auto my-4" />
        <ul>
          <li className="flex">
            <Link
              href={"/progress"}
              className="hover:bg-neutral-700 px-4 py-2 w-full text-center"
            >
              Progress
            </Link>
          </li>
          <li className="flex">
            <button className="hover:bg-neutral-700 px-4 py-2 w-full text-center">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
