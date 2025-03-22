import { useForm } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "~/utils/api";
import WhitoutSideBar from "~/modules/Layouts/templates/dashbaord/OverviewLayout";

import { amountFormatter } from "~/utils/formatters";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createUserAccount,
  type CreateUserAccount,
} from "~/modules/Account/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AccountForm from "~/modules/Account/AccountForm";

export const optionsTypeAccount = [
  {
    name: "Efectivo",
    value: 1,
  },
  {
    name: "Bancaria",
    value: 2,
  },
  {
    name: "Credito",
    value: 3,
  },
];

const CreateAccount = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  return (
    <WhitoutSideBar title="Crear Cuenta">
      <section className="m-auto mt-4 flex w-full max-w-[32rem] flex-col items-center justify-center">
        <h2>Inscribir cuenta</h2>
        <p className="mb-4 text-center md:max-w-[80%]">
          Inscribe las cuentas que tengas disponibles, y lleva más ordenado tus
          ingresos
        </p>

        <AccountForm />
      </section>
    </WhitoutSideBar>
  );
};

export default CreateAccount;
