"use client";
import "./globals.css";
import Navbar from "./Navbar";
import { usePathname } from 'next/navigation';

import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const bg_url = `bg-[url('/bg_5.png')]`;
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${bg_url} bg-cover bg-center h-screen`}
      >
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
      </body>
    </html>
  );
}
