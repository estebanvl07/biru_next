import type { FC } from "react";
import type { ActivationResultProps } from "./ActivationResult.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { BasicLayout } from "~/modules/Layouts";
import { ICONS, MESSAGES } from "./ActivationResult.constants";

const ActivationIcon: FC<ActivationResultProps> = ({ status }) => {
  const [icon, color] = ICONS[status];

  return <Icon icon={icon} width={64} className={color} />;
};

const ActivationMessage: FC<ActivationResultProps> = ({ status }) => {
  const [title, message] = MESSAGES[status];

  return (
    <>
      <h2 className="my-2 text-center">{title}</h2>
      <p className="text-center text-sm">{message}</p>
    </>
  );
};

const ActivationCTA: FC<ActivationResultProps> = ({ status }) => {
  return (
    <Link href={status === "success" ? "/login" : "/register"}>
      <Button className="mt-6">
        Continuar
        <Icon icon="basil:arrow-right-outline" width={26} />
      </Button>
    </Link>
  );
};

export const ActivationResult: FC<ActivationResultProps> = ({ status }) => {
  return (
    <BasicLayout>
      <div className="z-10 flex flex-col items-center justify-center px-6">
        <ActivationIcon status={status} />
        <ActivationMessage status={status} />
        <ActivationCTA status={status} />
      </div>
    </BasicLayout>
  );
};
