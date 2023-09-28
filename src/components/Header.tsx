import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="p-6 bg-neutral-900 mb-4 rounded-b-lg">
      <div>
        <Link href={"/"} className="text-white font-semibold">
          TypeFaster
        </Link>
      </div>
    </header>
  );
};

export default Header;
