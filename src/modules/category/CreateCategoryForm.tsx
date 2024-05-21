"use client";
import React, { useState } from "react";
// import { getServerAuthSession } from "~/server/auth";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { ButtonGroup, Input, Radio, RadioGroup } from "@nextui-org/react";
import { Button, Card } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconSearcher } from "~/modules/category/IconSelector";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { type CreateCategory, createCategory } from "~/modules/category/schema";

import { api } from "~/utils/api";

const CreateCategoryForm = ({ hasEdit = false }: { hasEdit?: boolean }) => {
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

  return (
    <form
      className="flex w-full max-w-[32rem] flex-col gap-2 pt-6 md:pt-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RadioGroup size="sm" orientation="horizontal" label="Tipo">
        <Radio
          value="1"
          onClick={() => setValue("type", 1 as any)}
          color="success"
        >
          Ingreso
        </Radio>
        <Radio
          value="2"
          onClick={() => setValue("type", 1 as any)}
          color="danger"
        >
          Egreso
        </Radio>
      </RadioGroup>
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

      <div className="mb-2 flex w-full flex-col gap-2 pt-3 md:flex-row">
        <Button type="submit" className="w-fit py-1 text-sm">
          <Icon
            icon="lucide:loader-circle"
            className={clsx(
              "-mr-4 opacity-0",
              // category.isLoading && "animate-spin opacity-100",
            )}
          />
          {hasEdit ? "Actualizar" : "Crear"}
        </Button>
        <Button className="w-fit py-1 text-sm" variantStyle="outline">
          Cancelar
        </Button>
      </div>
      <IconSearcher
        selected={(icon) => setValue("icon", icon)}
        onClose={() => setModalActive(false)}
        isOpen={modalActive}
      />
    </form>
  );
};

export default CreateCategoryForm;
