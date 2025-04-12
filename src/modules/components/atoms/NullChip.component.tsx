import React from "react";

const NullChip = ({ text }: { text?: string }) => {
  return (
    <p className="px-2 text-xs italic text-foreground-600">{text || "N/A"}</p>
  );
};

export default NullChip;
