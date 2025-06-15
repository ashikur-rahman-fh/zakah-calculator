import React, { forwardRef } from "react";

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

export const GlassCardHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-xl text-center font-semibold mb-4 uppercase">{children}</h1>
  );
};

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  twStyle?: string;
  error?: string | null | undefined;
};

export const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ twStyle = "", error = "", ...props }, ref) => {
    const errorVisibility: string = error ? "visible" : "invisible";

    const borderColor = error
      ? "border-red-700/30 focus:border-red-700"
      : "border-white/10 focus:ring-blue-500";

    const textColor = error
      ? "text-red-700/60 focus:text-red-700"
      : "text-white/60 focus:text-white";

    return (
      <React.Fragment>
        <input
          ref={ref}
          className={`${twStyle}
                      min-w-[90%]
                    bg-white/20
                      border
                      text-md
                      rounded-md
                      block
                      p-1
                      focus:outline-none
                      ${borderColor}
                      ${textColor}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        <p id={`${props.id}-error`} className={`mt-1 text-sm text-red-700 ${errorVisibility}`}>
          {error ? error : "hidden-error"}
        </p>
      </React.Fragment>
    );
  }
);

StyledInput.displayName = "StyledInput";

export const Button = ({ children, disabled, onClick } :
    { children : React.ReactNode, disabled: boolean, onClick: () => void }) => {

  const bgStyle = disabled
                  ? "bg-gray-400 border-gray-600/30"
                  : "bg-white/30";

  const cursorStyle = disabled
                      ? "cursor-not-allowed"
                      : "cursor-pointer";
  const hoverStyle = disabled
                      ? ""
                      : "hover:bg-blue-700/30 hover:border-blue-300";
  return (
    <button
      className={`
        border
        rounded-lg
        px-4
        pt-2
        pb-1
        m-1
        ${bgStyle}
        ${cursorStyle}
        ${hoverStyle}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
