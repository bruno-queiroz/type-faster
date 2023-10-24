"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const UserMenu = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status } = useSession();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
  };
  return (
    <div>
      <div
        className="absolute w-full h-full top-0 cursor-pointer"
        onClick={handleMenu}
      />

      <div
        className="w-full min-w-[180px] absolute right-0 top-[55px] bg-neutral-800 rounded text-white pb-4"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        {children}
        <div className="border-t-[1px] border-t-neutral-500 w-[80%] mx-auto my-4" />
        <ul>
          {status === "authenticated" ? (
            <>
              <li className="flex">
                <Link
                  href={"/progress"}
                  className="hover:bg-neutral-700 px-4 py-2 w-full text-center"
                >
                  Progress
                </Link>
              </li>
              <li className="flex">
                <button
                  className="hover:bg-neutral-700 px-4 py-2 w-full text-center"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex">
                <Link
                  href={"/sign-up"}
                  className="hover:bg-neutral-700 px-4 py-2 w-full text-center"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
