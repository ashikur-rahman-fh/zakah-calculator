"use client"
import React from "react";

import { ToastContainer, Zoom } from "react-toastify";
import { usePathname } from 'next/navigation';

import Navbar from "./Navbar";
import { AuthProvider } from "@/context/AuthProvider";

const LayoutComponent = ({ children }:
  Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  return (
    <React.Fragment>

      <AuthProvider key={pathname}>
        <header>
          <Navbar />
        </header>
        <main className="md:mx-16 my-2 p-2">
          {children}
        </main>
        <footer className="p-2 text-center text-white">
          Ashikur Rahman &copy; {new Date().getFullYear()}
        </footer>
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </React.Fragment>
  );
};

export default LayoutComponent;
