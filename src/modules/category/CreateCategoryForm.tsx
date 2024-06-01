import React, { useState } from "react";
// import { getServerAuthSession } from "~/server/auth";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { Button, ButtonGroup } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconSearcher } from "~/modules/category/IconSelector";

import { type CreateCategory, createCategory } from "~/modules/category/schema";

import { api } from "~/utils/api";
import { Alert } from "../components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";

const CreateCategoryForm = ({ hasEdit = false }: { hasEdit?: boolean }) => {
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);

  const params = useParams();
  const query = router.query;

  const {
    register,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<CreateCategory>({
    resolver: zodResolver(createCategory),
  });

  const icon = watch("icon") || "";

  const alertConfig: any = {
    type: "quest",
    cancel: true,
    confirm: true,
    confirmProps: {
      onClick: () => onSubmit(),
    },
  };

  const { isOpen, onClose, onOpen, props, setProps } = useAlert(alertConfig);
  const category = api.category.create.useMutation();

  const onSubmit = () => {
    onClose();
    const data = getValues();

    return category.mutateAsync(
      {
        ...data,
        type: Number(data.type),
      },
      {
        onSuccess() {
          setProps({
            ...props,
            type: "success",
            cancel: false,
            confirm: true,
            confirmProps: {
              onClick: () => {
                router.push(`/account/${params?.acc}/category`);
              },
            },
          });
          reset();
          onOpen();
        },
        onError() {
          setProps({
            ...props,
            type: "error",
            cancel: true,
            confirm: false,
          });
          onOpen();
        },
      },
    );
  };

  return (
    <>
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex w-full max-w-[32rem] flex-col gap-2 pt-6 md:pt-0"
        onSubmit={(e) => {
          e.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <label>
          Tipo <span className="text-danger">*</span>
          <ButtonGroup
            containerClassName="w-fit"
            buttonClass="text-xs !py-1.5"
            options={[
              {
                id: 1,
                label: "Ingreso",
                title: "Ingreso",
                icon: "ph:trend-up",
                onClick: () => {
                  setValue("type", 1);
                },
                colorSelected:
                  "!bg-green-500 border border-green-500 text-white",
              },
              {
                id: 2,
                icon: "ph:trend-down",
                label: "Egreso",
                title: "Egreso",
                onClick: () => {
                  setValue("type", 2);
                },
                colorSelected: "!bg-red-500 border border-red-500 text-white",
              },
            ]}
          />
        </label>
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
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors?.name?.message}
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
          isInvalid={Boolean(errors?.description)}
          errorMessage={errors?.description?.message}
          {...register("description")}
        />
        <Input
          readOnly
          label="Icono"
          onClick={() => setModalActive(true)}
          startContent={
            <Icon
              icon={icon || "fe:smile-plus"}
              className="dark:text-slate-200"
              width={18}
            />
          }
          placeholder="Selecciona un icono"
          value={icon ?? ""}
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
    </>
  );
};

export default CreateCategoryForm;
