"use client";
import React, { useState } from "react";
// import { getServerAuthSession } from "~/server/auth";
import { Button, Card, Input, RadioGroup } from "~/modules/components";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconSearcher } from "~/modules/category/IconSelector";
import { type CreateCategory, createCategory } from "~/modules/category/schema";
// import { api } from "~/trpc/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import DashboardLayout from "~/modules/layouts/Dashboard";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { classNames } from "primereact/utils";

const NewCategory = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  const [modalActive, setModalActive] = useState(false);

  // const helloNoArgs = api.post.hello.useQuery({ text: "Hola desde cliente" });
  // const userCreator = api.post.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateCategory>({
    resolver: zodResolver(createCategory),
  });

  // const category = api.category.create.useMutation();

  const icon = watch("icon") || "fe:smile-plus";

  const onSubmit = (data: CreateCategory) => {
    console.log({ data });
    // return category.mutateAsync(data, {
    //   onError(error, variables, context) {
    //     console.log({ error, variables, context });
    //   },
    // });
  };

  console.log({ errors });

  return (
    <DashboardLayout>
      <Card className="mx-auto flex w-full max-w-[40rem] flex-col items-center justify-center border-none !bg-transparent !p-0 md:border md:!bg-white md:!p-6 dark:!bg-transparent md:dark:!bg-slate-900">
        <form
          className="flex w-full flex-col gap-2 pt-6 md:pt-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-4 w-full">Crear nueva categoría</h2>
          <Input
            label="Nombre"
            iconPath="mdi:rename-outline"
            placeholder='"Mercado" , "Arriendo"'
            required
            register={register("name")}
          />
          <RadioGroup
            iconPath="fluent:money-hand-24-regular"
            label="Tipo"
            name="type"
            register={register("type")}
            options={[
              {
                label: "Ingreso",
                value: 1,
                className:
                  "has-[input:checked]:bg-green-500 has-[input:checked]:text-white",
              },
              {
                label: "Gasto",
                value: 2,
                className:
                  "has-[input:checked]:bg-red-500 has-[input:checked]:text-white",
              },
            ]}
          />
          <Input
            label="Descripción"
            iconPath="fluent:text-description-32-filled"
            placeholder='"Mercado" , "Arriendo"'
            name="description"
            register={register("description")}
          />
          <Input
            readOnly
            label="Icono"
            onClick={() => setModalActive(true)}
            mainClassName="!h-auto"
            placeholder="Gastos de la universidad"
            error={errors.icon?.message}
            iconPath={icon}
            value={icon}
            name="icon"
            register={register("icon")}
          />
          <div className="flex w-full flex-col gap-2 pt-3 md:flex-row">
            <Button type="submit" className="w-full py-1 text-sm">
              {hasEdit ? "Actualizar" : "Guardar"}
              <Icon
                icon="lucide:loader-circle"
                className={clsx(
                  "-mr-4 opacity-0",
                  // category.isLoading && "animate-spin opacity-100",
                )}
              />
            </Button>
            <Button className="w-full py-1 text-sm" variantStyle="outline">
              Cancelar
            </Button>
          </div>
          {modalActive && (
            <IconSearcher
              selected={(icon) => setValue("icon", icon)}
              onHideModal={() => setModalActive(false)}
            />
          )}
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default NewCategory;
