import { useForm } from "react-hook-form";
import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { Icon } from "@iconify/react/dist/iconify.js";

import { createEntity } from "~/modules/Entities/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { Alert } from "~/modules/components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";

const NewEntityPage = () => {
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
    const payload = getValues();
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

  return (
    <DashboardLayout title="Crear Entidad">
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <form
        className="flex max-w-[32rem] flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setProps(alertConfig);
          onOpen();
        }}
      >
        <RadioGroup
          label="Tipo"
          size="sm"
          className="mb-2"
          isRequired
          orientation="horizontal"
          defaultChecked
        >
          <Radio
            value="1"
            type="checkbox"
            color="success"
            onClick={() => setValue("type", 1)}
            defaultChecked
            size="sm"
          >
            Ingreso
          </Radio>

          <Radio
            value="2"
            color="danger"
            onClick={() => setValue("type", 2)}
            size="sm"
          >
            Egreso
          </Radio>
        </RadioGroup>
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
            Crear Entidad
          </Button>
          <Button variant="bordered" className="border-1" color="primary">
            Cancelar
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NewEntityPage;
