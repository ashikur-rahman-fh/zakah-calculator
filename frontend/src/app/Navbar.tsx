"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

const Logout = ({ user, logout }: { user: string | null, logout: () => void }) => {
  return (
    <div>
      <span>{user}</span> | <span className="cursor-pointer" onClick={logout}>logout</span>
    </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
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
        {isAuthenticated ? <Logout user={user} logout={logout} /> : null}
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
