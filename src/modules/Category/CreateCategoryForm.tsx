import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { Button, Input } from "@heroui/react";
import { ButtonGroup } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconSearcher } from "~/modules/Category/IconSelector";

import { type CreateCategory, createCategory } from "~/modules/Category/schema";

import { api } from "~/utils/api";
import { Alert } from "../components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";
import { CategoryIncludes } from "~/types/category/category.types";
import { toast } from "sonner";

interface CategoryFormProps {
  hasEdit?: boolean;
  categoryDefault?: CategoryIncludes;
  onSuccess?: () => void;
}

const CreateCategoryForm = ({
  hasEdit = false,
  categoryDefault,
  onSuccess,
}: CategoryFormProps) => {
  const router = useRouter();
  const [modalActive, setModalActive] = useState(false);

  const params = useParams();

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

  const categoryRefresh = api.useUtils().category;
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

  const { mutateAsync: CategoryUpdateMutation } =
    api.category.update.useMutation();

  const onSubmit = () => {
    onClose();
    const data = getValues();

    if (hasEdit) {
      toast.promise(
        CategoryUpdateMutation(
          { ...data, id: String(categoryDefault?.id) },
          {
            onSuccess(data) {
              categoryRefresh.invalidate();
              onSuccess && onSuccess();
              reset();
            },
          },
        ),
        {
          loading: "Actualizando Categoría...",
          success: "La categoría se ha actualizado con éxito.",
          error: "Hubo un error, intente de nuevo",
        },
      );
    }

    return toast.promise(
      category.mutateAsync(
        {
          ...data,
          type: Number(data.type),
        },
        {
          onSuccess() {
            categoryRefresh.invalidate();
            onSuccess && onSuccess();
            reset();
          },
        },
      ),
      {
        loading: "Creando Categoría...",
        success: "La categoría se ha creado con éxito.",
        error: "Hubo un error, intente de nuevo",
      },
    );
  };

  useEffect(() => {
    setValue("type", 1);

    if (categoryDefault) {
      setValue("type", Number(categoryDefault.type));
      setValue("name", categoryDefault.name || "");
      setValue("description", categoryDefault.description || "");
      categoryDefault.icon && setValue("icon", categoryDefault.icon);
    }
  }, []);

  return (
    <>
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex w-full flex-col gap-2 sm:max-w-[32rem]"
        onSubmit={(e) => {
          e.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <label className="text-xs">
          Tipo <span className="text-danger">*</span>
          <ButtonGroup
            containerClassName="w-fit mt-1"
            buttonClass="text-xs !py-1.5"
            defaultSelected={categoryDefault?.type || 1}
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

        <div className="mb-2 flex w-full flex-col gap-2 pt-3 sm:flex-row">
          <Button
            type="submit"
            className="w-full py-1 text-sm sm:w-fit"
            color="primary"
          >
            <Icon
              icon="lucide:loader-circle"
              className={clsx(
                "-mr-4 opacity-0",
                // category.isLoading && "animate-spin opacity-100",
              )}
            />
            {hasEdit ? "Actualizar Categoría" : "Crear Categoría"}
          </Button>
          <Button
            onClick={() => onSuccess && onSuccess()}
            className="w-full bg-default-100 py-1 text-sm sm:w-fit"
          >
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
