import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export const SuccessfullyCreated = () => {
  return (
    <div className="z-20 m-auto flex flex-col items-center justify-center px-6">
      <Icon
        icon="icon-park-outline:success"
        width={42}
        className="text-green-500"
      />
      <h2 className="my-2 text-center">¡Tu cuenta ha sido creada con Éxito!</h2>
      <p className="text-center text-sm">
        Para activar tu cuenta, verifica si llegó un correo <br /> que contiene
        tu link de activación
      </p>
      <Button color="primary" as={Link} href="/login" className="mt-6">
        Volver
      </Button>
    </div>
  );
};
