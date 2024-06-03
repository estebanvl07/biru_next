import { Spinner } from "@nextui-org/spinner";
import React from "react";

const MainLoader = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2">
      <Spinner size="lg" color="primary" />
      <p>Cargando...</p>
    </div>
  );
};

export default MainLoader;
