import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Tooltip,
  User,
} from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { amountFormatter } from "~/utils/formatters";
import { ButtonGroup, InputDate } from "../components";
import { useRouter } from "next/router";
import { createMovements } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FRECUENCY_MOVEMENTS_OPTIONS } from "~/lib/constants";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { useCategory } from "../Category/hook/category.hook";
import { useEntity } from "../Entities/hook/entities.hook";
import { useParams } from "next/navigation";
import { MovementsIncludes } from "~/types/movements";

interface MovementFormProps {
  mode?: "create" | "edit";
  defaultMovement?: MovementsIncludes;
}

const CreateMovementsForm = ({
  defaultMovement,
  mode = "create",
}: MovementFormProps) => {
  const [amountValue, setAmountValue] = useState<string>("");
  const [customFrecuency, setCustomFrecuency] = useState(false);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<createMovements>({
    resolver: zodResolver(createMovements),
  });
  const router = useRouter();
  const query = router.query;
  const params = useParams();

  const { mutateAsync: CreateMovementsMutation } =
    api.movements.create.useMutation();
  const { mutateAsync: UpdateMovementMutation } =
    api.movements.update.useMutation();

  const { categories, isLoading: categoryisLoading } = useCategory();
  const { entities, isLoading: entitiesIsLoading } = useEntity();

  const defaultDate = new Date();
  const defaultType = defaultMovement?.type ? defaultMovement.type : 1;
  setValue("type", defaultType);
  setValue("bookId", String(params?.bookId));

  const defaultCategory =
    categories && defaultMovement && defaultMovement.categoryId
      ? [String(defaultMovement.categoryId)]
      : undefined;

  const defaultEntity =
    entities && defaultMovement && defaultMovement.entityId
      ? [String(defaultMovement.entityId)]
      : undefined;

  const currentFrecuency = FRECUENCY_MOVEMENTS_OPTIONS.find(
    (op) => op.value === defaultMovement?.frecuency,
  )?.id;

  const defaultFrecuency =
    defaultMovement && currentFrecuency ? [`${currentFrecuency}`] : undefined;

  const onSubmit = (payload: createMovements) => {
    if (mode === "create") {
      toast("Esta seguro de realizar esta acción", {
        action: {
          label: "Crear",
          onClick: () => {
            toast.promise(
              CreateMovementsMutation(payload, {
                onSuccess(data) {
                  reset();
                  setAmountValue("");
                },
              }),
              {
                loading: "Creando Movimiento...",
                success: "El movimiento se ha creado con éxito.",
                error: "Hubo un error, intente de nuevo",
              },
            );
          },
        },
      });
      return;
    }
    toast("Esta seguro de realizar esta acción", {
      action: {
        label: "Editar",
        onClick: () => {
          toast.promise(
            UpdateMovementMutation(
              { ...payload, id: defaultMovement!.id },
              {
                onSuccess(data) {
                  router.back();
                  setAmountValue("");
                },
              },
            ),
            {
              loading: "Editando Movimiento...",
              success: "El movimiento se ha editado con éxito.",
              error: "Hubo un error, intente de nuevo",
            },
          );
        },
      },
    });
  };

  useMemo(() => {
    if (defaultMovement) {
      const { formatted, raw } = amountFormatter(
        defaultMovement.amount.toString(),
      );
      setValue("amount", raw ?? 0);
      setAmountValue(formatted);

      setValue("description", defaultMovement.description || "");
      setValue("type", defaultMovement.type);
      setValue("name", defaultMovement.name);
      setValue("frecuency", defaultMovement.frecuency);
    }
  }, [defaultMovement]);

  return (
    <form
      className="flex max-w-[32rem] flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        isRequired
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
            {defaultType === 2 && <span className="ml-1">-</span>}
          </div>
        }
        endContent={
          <div>
            <ButtonGroup
              containerClassName="w-fit"
              buttonClass="text-xs !py-1"
              defaultSelected={
                defaultType
                  ? defaultType
                  : query?.type
                    ? Number(query?.type)
                    : 1
              }
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
                  colorSelected: "!bg-red-500 border border-red-500 text-white",
                },
              ]}
            />
          </div>
        }
        isInvalid={Boolean(errors?.amount)}
        errorMessage={errors?.amount?.message}
      />
      <Input
        placeholder="Pago de Tarjeta, Subscripción"
        label="Nombre"
        isRequired
        {...register("name")}
      />
      <InputDate
        label="Siguiente ocurrencia"
        required
        containerClassName="mt-4"
        changeValue={(newDate) => {
          setValue("next_ocurrence", newDate);
          // recuerda 3 dias antes
          const reminder = newDate.setDate(newDate.getDate() - 3);
          setValue("reminder_date", new Date(reminder));
        }}
        endContent={
          <Tooltip
            placement="right"
            content={
              <p className="max-w-sm cursor-help font-montserrat text-sm">
                Este campo, tendrá la informacion de la próxima fecha en la que
                le recordará al usuario la transacción
              </p>
            }
          >
            <Icon icon="ph:info" width={18} />
          </Tooltip>
        }
        value={watch("next_ocurrence")}
        defaultValue={defaultDate}
      />
      <Select
        isRequired
        items={FRECUENCY_MOVEMENTS_OPTIONS ?? []}
        placeholder="Seleccionar Frecuencia"
        label="Frecuencia"
        defaultSelectedKeys={defaultFrecuency}
        isInvalid={Boolean(errors?.frecuency)}
        errorMessage={errors?.frecuency?.message ?? ""}
      >
        {(frecuency) => (
          <SelectItem
            color="primary"
            variant="flat"
            onPress={() => {
              if (frecuency.id !== 7 && frecuency.value) {
                setValue("frecuency", frecuency.value!);
                setCustomFrecuency(false);
              } else {
                setCustomFrecuency(true);
              }
            }}
            className="font-montserrat dark:text-white"
            key={frecuency.id}
          >
            {frecuency.name}
          </SelectItem>
        )}
      </Select>
      {customFrecuency && (
        <Input
          isRequired
          placeholder="30, 10"
          label="Frecuencia en dias"
          type="number"
          endContent={
            <Tooltip
              placement="right"
              content={
                <p className="max-w-sm cursor-help font-montserrat text-sm">
                  La frecuencia validará cada cuentos días se debe realizar este
                  movimiento
                </p>
              }
            >
              <Icon icon="ph:info" width={18} />
            </Tooltip>
          }
          {...register("frecuency")}
        />
      )}
      <Accordion
        defaultExpandedKeys={["1"]}
        showDivider={false}
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
          key="1"
          aria-label="Accordion 1"
          classNames={{
            base: "border-red-600",
          }}
          title="Información Adicional"
          subtitle="Agrega más información sobre su movimiento"
        >
          <div className="flex flex-col gap-2 pb-8">
            <section className="flex w-full flex-col gap-2 sm:flex-row">
              <Select
                items={categories ?? []}
                placeholder="Seleccione una categoría"
                isLoading={categoryisLoading}
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
                          <Icon icon={data?.icon} className="text-white" />
                        ) : (
                          <Avatar name={data?.name} />
                        )}
                      </div>
                      {data?.name}
                    </div>
                  ));
                }}
                defaultSelectedKeys={defaultCategory || query?.category}
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
                isLoading={entitiesIsLoading}
                defaultSelectedKeys={defaultEntity ?? query.entity}
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
                      onPress={() => {
                        entity.id && setValue("entityId", entity.id);
                      }}
                      key={entity.id}
                      className="py-1 font-montserrat dark:text-white"
                      textValue={entity.name}
                    >
                      <p>{entity.name}</p>
                      <span className="!text-xs opacity-60">
                        {entity.description !== "" ? entity.description : "N/A"}
                      </span>
                    </SelectItem>
                  );
                }}
              </Select>
            </section>
            <Input
              placeholder="Pago mensual de mi tarjeta de crédito"
              label="Descripción"
              {...register("description")}
            />
          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-2">
        <Button type="submit" color="primary">
          {mode === "create" ? "Crear Movimiento" : "Editar Movimiento"}
        </Button>
        <Button type="button" onPress={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default CreateMovementsForm;
