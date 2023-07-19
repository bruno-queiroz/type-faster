import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="p-6 bg-red-400">
      <div>
        <Link href={"/"} className="font-semibold">
          TypeFaster
        </Link>
      </div>
    </header>
  );
};

export default Header;
