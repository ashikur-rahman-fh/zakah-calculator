import React from "react";

import { Reload } from "./Icons";

const CustomBanner = ({
  header = "Sample Banner",
  action = undefined,
  show = true,
}: {
  header?: React.ReactNode;
  action?: () => void | undefined;
  show?: boolean;
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="bg-cyan-300/20 font-bold text-md my-4 p-2 backdrop-blur-lg rounded-xl">
      <div className="flex justify-between w-full">
        <div className="mx-auto">{header}</div>
        <div className="col-span-1 col-end-13">
          {action !== undefined &&
            <span onClick={action} className="float-end cursor-pointer">
              <Reload />
            </span>
          }
        </div>
      </div>
    </div>
  );
};

export default CustomBanner;
