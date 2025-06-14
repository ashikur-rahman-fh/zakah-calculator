"use client";

import React from "react";
import Transactions from "./Transactions";
import ZakahYear from "./Zakah";

export default function Home() {

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="backdrop-blur-lg
                        bg-white/25
                        border
                        border-white/10
                        rounded-xl
                        shadow-2xl
                        p-4
                        col-span-1
                        text-white">
          <ZakahYear />
        </div>
        <div className="backdrop-blur-lg
                        bg-white/25
                        border
                        border-white/10
                        rounded-xl
                        shadow-2xl
                        p-4
                        col-span-1
                        md:col-span-2
                        text-white">
          <Transactions />
        </div>
      </div>
    </React.Fragment>
  );
}
