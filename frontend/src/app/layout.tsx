"use client";
import "./globals.css";
import Navbar from "./Navbar";
import { usePathname } from 'next/navigation';

import { AuthProvider } from "@/context/AuthProvider";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRandomInt = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const bg_id = getRandomInt(1, 5);
  // const bg_str = bg_id.toString().trim();

  // const bg_url = `bg-[url('/bg_${bg_str}.png')]`;
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
