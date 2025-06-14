import React from "react";

export const Amount = ({ amount, fontColor }: { amount: number, fontColor: string }) => {
  return <span className={`bg-white/20 rounded-md px-2 ${fontColor}`}>{amount.toString().padStart(6, ' ')}$</span>;
};

export const GlassCard = ({ twStyle, children }: { twStyle: string, children: React.ReactNode }) => {
  return (
    <div
      className={`${twStyle}
                  backdrop-blur-lg
                bg-white/25
                  border
                border-white/10
                  rounded-xl
                  shadow-2xl
                  p-4
                text-white
                  overflow-y-scroll
                  overflow-x-scroll`}
    >
      {children}
    </div>
  );
};

export const GlassCardHeader = ({ children } : { children : React.ReactNode }) => {
  return (
    <h1 className="text-xl text-center font-semibold mb-4 uppercase">{children}</h1>
  );
};
