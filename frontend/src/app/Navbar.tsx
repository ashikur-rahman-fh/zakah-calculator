import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav
        className="backdrop-blur-lg
              bg-white/40
                border
              border-white/10
                shadow-2xl
                flex
                justify-between
                items-center
              text-white
                p-4"
      >
        <div>
          <Link href="/" className="text-2xl uppercase font-bold">
            Zakah Calculator
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
