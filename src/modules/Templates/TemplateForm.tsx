import React, { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  SharedSelection,
  useDisclosure,
  User,
} from "@heroui/react";

import { useCategory } from "../Category/hook/category.hook";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { createTemplate } from "~/modules/Templates/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEntity } from "../Entities/hook/entities.hook";
import { IconSearcher } from "../Category/IconSelector";
import clsx from "clsx";
import { toast } from "sonner";
import { color } from "framer-motion";
import { api } from "~/utils/api";
import { amountFormatter } from "~/utils/formatters";
import { ButtonGroup } from "../components";
import { TemplatesIncludes } from "~/types/templates/templates";
import { useParams } from "next/navigation";

interface TemplateFormProps {
  hasEdit?: boolean;
  onSuccess?: () => void;
  data?: TemplatesIncludes;
}

const TemplateForm = ({
  hasEdit,
  onSuccess,
  data: defTemplate,
}: TemplateFormProps) => {
  const [amountValue, setAmountValue] = useState("");
  const params = useParams();
  const bookId = String(params?.bookId);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<createTemplate>({ resolver: zodResolver(createTemplate) });

  const { mutateAsync: CreateTemplateMutation, isPending: isCreatePending } =
    api.templates.createTemplate.useMutation();

  const { mutateAsync: UpdateTemplateMutation, isPending: isUpdatePending } =
    api.templates.updateTemplate.useMutation();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { categories } = useCategory();
  const { entities } = useEntity();

  const icon = watch("icon") || "";

  const onSubmit = (data: createTemplate) => {
    if (hasEdit) {
      if (!defTemplate) toast.error("Hubo un error, intente de nuevo");
      toast.message("¿Estás seguro de actualizar esta plantilla?", {
        classNames: {
          title: "mr-4",
        },
        icon: <Icon icon="fluent:alert-24-filled" />,
        action: {
          label: "Actualizar Plantilla",
          onClick: async () => {
            toast.promise(
              UpdateTemplateMutation(
                { id: String(defTemplate?.id), ...data },
                {
                  onSuccess: () => {
                    onSuccess && onSuccess();
                  },
                },
              ),
              {
                loading: "Actualizando Plantilla...",
                success: "La plantilla se ha actualizado con éxito.",
                error: "Hubo un error, intente de nuevo",
              },
            );
          },
        },
        cancel: {
          label: "Cancelar",
          onClick: () => {},
        },
      });
      return;
    }

    toast.message("¿Estás seguro de crear esta plantilla?", {
      classNames: {
        title: "mr-4",
      },
      icon: <Icon icon="fluent:alert-24-filled" />,
      action: {
        label: "Crear Plantilla",
        onClick: async () => {
          toast.promise(
            CreateTemplateMutation(data, {
              onSuccess: () => {
                onSuccess && onSuccess();
              },
            }),
            {
              loading: "Creando Plantilla...",
              success: "La plantilla se ha creado con éxito.",
              error: "Hubo un error, intente de nuevo",
            },
          );
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
    });
  };

  // const defaultType = transactionDefault
  // ? transactionDefault.type
  // : defType || undefined;

  const defaultCategory =
    defTemplate && defTemplate.categoryId
      ? [String(defTemplate.categoryId)]
      : undefined;

  const defaultEntity =
    defTemplate && defTemplate.entityId
      ? [String(defTemplate.entityId)]
      : undefined;

  const onChangeEntity = (key: SharedSelection) => {
    const entitySelected = entities?.find(
      (entity) => entity.id === Number(key.currentKey),
    );

    if (entitySelected) {
      setValue("entityId", entitySelected.id);

      const updateFields = ["reference", "recipient", "description"];

      updateFields.forEach((field) => {
        if (watch(field as any) === "") {
          console.log(field, "set value");

          setValue(
            field as any,
            entitySelected[field as keyof typeof entitySelected] ?? "",
          );
        }
      });
    }
  };

  useMemo(() => {
    if (defTemplate) {
      console.log("default setter");

      const {
        amount,
        categoryId,
        entityId,
        name,
        description,
        icon,
        recipient,
        reference,
        type,
      } = defTemplate;

      const { formatted, raw } = amountFormatter(String(amount));
      setValue("amount", raw ?? 0);
      setAmountValue(formatted);

      setValue("type", type);
      setValue("reference", reference ?? "");
      setValue("recipient", recipient ?? "");
      setValue("name", name ?? "");
      setValue("icon", icon ?? "");
      setValue("description", description ?? "");
      setValue("categoryId", categoryId || undefined);
      setValue("entityId", entityId || undefined);
    }
  }, [defTemplate]);

  useEffect(() => {
    setValue("state", 1);
    setValue("bookId", bookId);
  }, [params]);

  return (
    <>
      <form
        className="flex w-full flex-col gap-2 py-3 md:max-w-[32rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Nombre"
          placeholder="Compras, Servicios Domesticos, etc..."
          isRequired
          isInvalid={Boolean(errors?.name)}
          errorMessage={errors?.name?.message ?? ""}
          {...register("name")}
        />
        <Accordion
          defaultExpandedKeys={["1"]}
          className="m-0 rounded-lg !p-0 !shadow-none"
          selectionMode="multiple"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            key={"1"}
            title="Información de plantilla"
            subtitle="Agrega información de tu plantilla"
          >
            <div className="flex flex-col gap-2 pb-8">
              <Input
                type="text"
                label="Valor de transacción"
                placeholder="0.00"
                value={amountValue}
                className="!appearance-none"
                onValueChange={(val) => {
                  const { formatted, raw } = amountFormatter(val);
                  setValue("amount", raw ?? 0);
                  setAmountValue(formatted);
                }}
                inputMode="numeric"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-small text-default-400">$</span>
                    {watch("type") === 2 && <span className="ml-1">-</span>}
                  </div>
                }
                endContent={
                  <div>
                    <ButtonGroup
                      containerClassName="w-fit"
                      buttonClass="text-xs !py-1"
                      defaultSelected={defTemplate?.type}
                      options={[
                        {
                          id: 1,
                          label: "Ing",
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
                          label: "Egr",
                          title: "Egreso",
                          onClick: () => {
                            setValue("type", 2);
                          },
                          colorSelected:
                            "!bg-red-500 border border-red-500 text-white",
                        },
                      ]}
                    />
                  </div>
                }
                isInvalid={Boolean(errors?.amount)}
                errorMessage={errors?.amount?.message}
              />
              <Input
                readOnly
                label="Icono"
                onClick={onOpen}
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
              <section className="flex w-full flex-col gap-2 sm:flex-row">
                <Select
                  items={categories ?? []}
                  placeholder="Seleccione una categoría"
                  label="Categoría"
                  classNames={{
                    label: "group-data-[filled=true]:-translate-y-5",
                    trigger: "min-h-[70px]",
                    listboxWrapper: "max-h-[200px]",
                  }}
                  renderValue={(items) => {
                    return items.map(({ data }) => (
                      <div key={data?.id} className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary">
                          {data?.icon ? (
                            <Icon
                              icon={data?.icon}
                              className="text-primary-foreground"
                            />
                          ) : (
                            <Avatar name={data?.name} />
                          )}
                        </div>
                        {data?.name}
                      </div>
                    ));
                  }}
                  defaultSelectedKeys={defaultCategory}
                  isInvalid={Boolean(errors?.categoryId)}
                  errorMessage={errors?.categoryId?.message ?? ""}
                >
                  {(category) => (
                    <SelectItem
                      color="primary"
                      onPress={() => setValue("categoryId", category.id)}
                      key={category.id}
                      className="font-montserrat dark:text-white"
                      textValue={category.name}
                    >
                      {category.name}
                    </SelectItem>
                  )}
                </Select>
                <Select
                  items={entities ?? []}
                  placeholder="Seleccionar entidad"
                  label="Entidad"
                  onSelectionChange={onChangeEntity}
                  defaultSelectedKeys={defaultEntity}
                  classNames={{
                    label: "group-data-[filled=true]:-translate-y-5",
                    trigger: "min-h-[70px]",
                    listboxWrapper: "max-h-[200px]",
                  }}
                  renderValue={(items) => {
                    return items.map(({ data: entity }) => (
                      <div
                        key={entity?.id}
                        className="py-1 font-montserrat dark:text-white"
                      >
                        <User
                          name={entity?.name}
                          description={
                            entity?.description !== ""
                              ? entity?.description
                              : "N/A"
                          }
                          avatarProps={{
                            src: entity?.avatar ?? undefined,
                            size: "sm",
                            name: entity?.name,
                            color: "primary",
                          }}
                        />
                      </div>
                    ));
                  }}
                  isInvalid={Boolean(errors?.entityId)}
                  errorMessage={errors?.entityId?.message ?? ""}
                >
                  {(entity) => {
                    return (
                      <SelectItem
                        color="primary"
                        variant="solid"
                        // onClick={() => {}}
                        key={entity.id}
                        className="py-1 font-montserrat dark:text-white"
                        textValue={entity.name}
                      >
                        <p>{entity.name}</p>
                        <span className="!text-xs opacity-60">
                          {entity.description !== ""
                            ? entity.description
                            : "N/A"}
                        </span>
                      </SelectItem>
                    );
                  }}
                </Select>
              </section>
              <Input
                startContent={
                  <Icon
                    icon="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal"
                    className="dark:text-slate-200"
                  />
                }
                label="Referencia"
                placeholder="000-000000-00"
                {...register("reference")}
                isInvalid={Boolean(errors?.reference)}
                errorMessage={errors.reference?.message as any}
              />
              <Input
                startContent={
                  <Icon
                    icon="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal"
                    className="dark:text-slate-200"
                  />
                }
                label="Destinatario"
                placeholder="Andres, Juan, Omar"
                {...register("recipient")}
                isInvalid={Boolean(errors?.recipient)}
                errorMessage={errors.recipient?.message as any}
              />
              <Input
                startContent={
                  <Icon
                    icon="fluent:text-description-24-filled"
                    className="dark:text-slate-200"
                    width={18}
                  />
                }
                label="Descripción"
                placeholder="Mercado del mes"
                {...register("description")}
                isInvalid={Boolean(errors?.description)}
                errorMessage={errors?.description?.message ?? ""}
              />
            </div>
          </AccordionItem>
        </Accordion>
        <div className="mb-2 flex w-full flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            className="w-full py-1 text-sm sm:w-fit"
            color="primary"
            isLoading={isCreatePending || isUpdatePending}
          >
            {hasEdit ? "Actualizar Plantilla" : "Crear Plantilla"}
          </Button>
          <Button
            onPress={() => onSuccess && onSuccess()}
            className="w-full bg-default-100 py-1 text-sm sm:w-fit"
          >
            Cancelar
          </Button>
        </div>
      </form>
      <IconSearcher
        selected={(icon) => setValue("icon", icon)}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default TemplateForm;
