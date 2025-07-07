import "./globals.css";
import React from "react";

import LayoutComponent from "./LayoutComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bg_url = `bg-[url('/bg_10.gif')]`;

  return (
    <html lang="en">
      <body
        className={`${bg_url} bg-cover bg-center h-screen`}
      >
        <LayoutComponent>
          {children}
        </LayoutComponent>
      </body>
    </html>
  );
};
