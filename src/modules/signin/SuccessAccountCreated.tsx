import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Button } from "~/modules/components";

export const SuccesCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <Icon
        icon="icon-park-outline:success"
        width={42}
        className="text-green-500"
      />
      <h2 className="my-2 text-center">¡Tu cuenta ha sido creada con Exito!</h2>
      <p className="text-center text-sm">
        Para activar tu cuenta, verifica si llegó un correo <br /> que contiene
        tu link de activación
      </p>
      <Link href="/login">
        <Button className="mt-6">Volver</Button>
      </Link>
    </div>
  );
};

export default SuccesCreated;
