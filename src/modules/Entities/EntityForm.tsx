import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { createEntity } from "~/modules/Entities/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Alert } from "~/modules/components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";
import { ButtonGroup } from "~/modules/components";
import { EntityIncludes } from "~/types/entities/entity.types";
import { useEffect } from "react";

interface EntityFormProps {
  hasEdit?: boolean;
  entityDefault?: EntityIncludes;
}

const EntityForm = ({ hasEdit, entityDefault }: EntityFormProps) => {
  const router = useRouter();
  const params = useParams();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<createEntity>({
    resolver: zodResolver(createEntity),
  });
  const entityService = api.entity.create.useMutation();
  const { mutate: EntityUpdateMutation } = api.entity.update.useMutation();

  const alertConfig: any = {
    type: "quest",
    cancel: true,
    confirm: true,
    confirmProps: {
      onClick: () => onSubmit(),
    },
  };

  const { isOpen, props, onOpen, onClose, setProps } = useAlert(alertConfig);

  const onSubmit = () => {
    onClose();
    const payload = {
      ...getValues(),
      reference: getValues("reference") || undefined,
    };
    if (hasEdit) {
      EntityUpdateMutation(
        { ...payload, id: String(entityDefault?.id) },
        {
          onSuccess() {
            setProps({
              ...props,
              type: "success",
              cancel: false,
              confirmProps: {
                onClick: () => {
                  router.push(`/account/${params?.acc}/entities`);
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
              cancel: false,
            });
          },
        },
      );
      return;
    }

    entityService.mutate(payload, {
      onSuccess() {
        setProps({
          ...props,
          type: "success",
          cancel: false,
          confirmProps: {
            onClick: () => {
              router.push(`/account/${params?.acc}/entities`);
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
          cancel: false,
        });
      },
    });
  };

  useEffect(() => {
    if (entityDefault) {
      setValue("type", Number(entityDefault.type) as any);
      setValue("description", entityDefault.description ?? undefined);
      setValue("name", entityDefault.name);
      setValue("reference", entityDefault.reference ?? undefined);
    }
  }, []);

  return (
    <>
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex max-w-[32rem] flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <label>
          Tipo <span className="text-danger">*</span>
          <ButtonGroup
            containerClassName="w-fit"
            buttonClass="text-xs !py-1.5"
            defaultSelected={
              entityDefault?.type ? entityDefault.type : undefined
            }
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
          required
          isRequired
          label="Nombre"
          placeholder="Jhon Doe"
          startContent={
            <Icon
              icon="lets-icons:user"
              width={18}
              className="dark:text-slate-200"
            />
          }
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Descripción"
          placeholder="Función de entidad"
          startContent={
            <Icon
              icon="fluent:text-description-24-filled"
              className="dark:text-slate-200"
              width={18}
            />
          }
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
          {...register("description")}
        />
        <Input
          label="Número de Referencia"
          placeholder="000-000000-00"
          startContent={
            <Icon
              icon="quill:creditcard"
              className="dark:text-slate-200"
              width={18}
            />
          }
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors.name?.message}
          {...register("reference")}
        />
        <div className="mt-4 flex gap-2">
          <Button color="primary" type="submit">
            {hasEdit ? "Actualizar Entidad" : "Crear Entidad"}
          </Button>
          <Button className="bg-default-100" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};

export default EntityForm;
