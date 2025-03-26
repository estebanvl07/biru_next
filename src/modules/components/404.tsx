import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <p>Hubo un error, página no encontrada</p>
      <Button
        color="primary"
        size="sm"
        onPress={() => router.back()}
        startContent={<ArrowLeft width={18} />}
      >
        Ir Atrás
      </Button>
    </div>
  );
};

export default NotFound;
