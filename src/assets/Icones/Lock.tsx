import React from "react";
import { IconType } from "./icons.type.jsx";
import clsx from "clsx";

const LockIcon = ({
  className,
  width = "24",
  height = "24",
  stroke,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("icon icon-tabler icon-tabler-shield-lock", className)}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12l0 2.5" />
    </svg>
  );
};

export default LockIcon;
