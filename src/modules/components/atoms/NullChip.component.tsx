import { Chip } from "@heroui/react";
import React from "react";

const NullChip = ({ text }: { text: string }) => {
  return (
    <Chip
      color="default"
      className="border border-white/10 bg-default-100 px-2 dark:bg-slate-900"
      size="sm"
    >
      {text || "Ninguno"}
    </Chip>
  );
};

export default NullChip;
