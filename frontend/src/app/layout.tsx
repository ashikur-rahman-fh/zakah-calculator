import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "Zakah Calculator",
  description: "Personal Zakah Calculator",
};

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

  return (
    <html lang="en">
      <body
        className={`${bg_url} bg-cover bg-center h-screen`}
      >
        <header>
          <Navbar />
        </header>
        <main className="md:mx-16 my-2 p-2">
          {children}
        </main>
        <footer className="p-2 text-center text-white">
          Ashikur Rahman &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
