"use client";
import React, { useState } from "react";
// import { getServerAuthSession } from "~/server/auth";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { ButtonGroup, Input } from "@nextui-org/react";
import { Button, Card, RadioGroup } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconSearcher } from "~/modules/category/IconSelector";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { type CreateCategory, createCategory } from "~/modules/category/schema";

import { api } from "~/utils/api";

const NewCategory = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);

  const params = useParams();
  const { type } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateCategory>({
    resolver: zodResolver(createCategory),
  });

  const category = api.category.create.useMutation();

  const icon = watch("icon") || "fe:smile-plus";

  const onSubmit = (data: CreateCategory) => {
    console.log({ data });
    return category.mutateAsync(data, {
      onError(error, variables, context) {
        console.log({ error, variables, context });
      },
      onSuccess() {
        router.back();
      },
    });
  };

  console.log(params);

  return (
    <DashboardLayout title="Crear Categoría">
      <form
        className="flex w-full max-w-[32rem] flex-col gap-2 pt-6 md:pt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Nombre"
          startContent={
            <Icon
              icon="mdi:rename-outline"
              className="dark:text-slate-200"
              width={18}
            />
          }
          placeholder='"Mercado" , "Arriendo"'
          required
          isRequired
          {...register("name")}
        />
        <RadioGroup
          iconPath="fluent:money-hand-24-regular"
          inputContentClassName="dark:text-slate-200"
          label="Tipo"
          name="type"
          defaultValue={type ?? 1}
          register={register("type")}
          options={[
            {
              label: "Ingreso",
              value: 1,
              className: clsx(
                "has-[input:checked]:bg-green-500 has-[input:checked]:text-white",
                {
                  "bg-green-500 text-white": type && Number(type) === 1,
                },
              ),
            },
            {
              label: "Gasto",
              value: 2,
              className: clsx(
                "has-[input:checked]:bg-red-500 has-[input:checked]:text-white",
                {
                  "bg-red-500 text-white": type && Number(type) === 2,
                },
              ),
            },
          ]}
        />
        <Input
          label="Descripción"
          startContent={
            <Icon
              icon="fluent:text-description-32-filled"
              className="dark:text-slate-200"
              width={18}
            />
          }
          placeholder='"Mercado" , "Arriendo"'
          {...register("description")}
        />
        <Input
          readOnly
          label="Icono"
          onClick={() => setModalActive(true)}
          startContent={
            <Icon icon={icon} className="dark:text-slate-200" width={18} />
          }
          placeholder="Gastos de la universidad"
          value={icon}
          {...register("icon")}
          errorMessage={errors.icon?.message}
        />
        <div className="flex w-full flex-col gap-2 pt-3 md:flex-row">
          <Button type="submit" className="w-fit py-1 text-sm">
            {hasEdit ? "Actualizar" : "Crear Categoría"}
            <Icon
              icon="lucide:loader-circle"
              className={clsx(
                "-mr-4 opacity-0",
                // category.isLoading && "animate-spin opacity-100",
              )}
            />
          </Button>
          <Button className="w-fit py-1 text-sm" variantStyle="outline">
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
    </DashboardLayout>
  );
};

export default NewCategory;
