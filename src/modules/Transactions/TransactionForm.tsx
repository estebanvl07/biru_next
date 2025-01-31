import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  User,
} from "@nextui-org/react";
import { ButtonGroup, Card, InputDate } from "~/modules/components";

import { api } from "~/utils/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTransaction } from "~/modules/Transactions/schema";
import { Alert } from "~/modules/components/molecules/Alert.component";

import { amountFormatter } from "~/utils/formatters";

import { useAccounts, useCurrentAccount } from "~/modules/Account/hooks";
import { useAlert } from "~/lib/hooks/useAlert";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { useCategory } from "../Category/hook/category.hook";
import { useGoals } from "../Goals/hook/goal.hook";
import { AnimatePresence, motion } from "framer-motion";
import { capitalize } from "../components/molecules/Table/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import type { Goals, Transaction } from "@prisma/client";
import type { TransactionIncludes } from "~/types/transactions";
import { toast } from "sonner";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { CategoryIncludes } from "~/types/category/category.types";
import { EntityIncludes } from "~/types/entities/entity.types";

interface TransactionFormProps {
  type: "goal" | "transfer";
  mode?: "create" | "edit";
  transactionDefault?: TransactionIncludes;
  defaultGoal?: GoalsIncludes;
  defCategory?: CategoryIncludes;
  defEntity?: EntityIncludes;
  defType?: 1 | 2;
  onSuccess?: () => void;
}

const TransactionForm = ({
  type,
  mode = "create",
  transactionDefault,
  defaultGoal,
  defCategory,
  defEntity,
  defType = 1,
  onSuccess,
}: TransactionFormProps) => {
  const [amountValue, setAmountValue] = useState("");
  const [goalSelected, setGoalSelected] = useState<GoalsIncludes>();

  const { account } = useCurrentAccount();
  const { entities } = useEntity();
  const { accounts } = useAccounts();
  const { categories } = useCategory();
  const { goals } = useGoals();

  const params = useParams();
  const router = useRouter();

  const query = router.query;

  const { mutateAsync: createTransactionMutation } =
    api.transaction.create.useMutation();

  const { mutateAsync: updateTransactionMutation } =
    api.transaction.update.useMutation();

  const defaultCategory =
    categories && defCategory
      ? [String(defCategory.id)]
      : transactionDefault && transactionDefault.categoryId
        ? [String(transactionDefault.categoryId)]
        : undefined;

  const defaultEntity = defEntity
    ? [String(defEntity.id)]
    : type === "goal" && defaultGoal
      ? [String(defaultGoal.entityId)]
      : entities && transactionDefault && transactionDefault.entityId
        ? [String(transactionDefault.entityId)]
        : undefined;

  const defaultDate =
    mode === "create"
      ? new Date()
      : transactionDefault
        ? transactionDefault.date
        : undefined;

  const defaultType = transactionDefault
    ? transactionDefault.type
    : defType || undefined;

  const defaultGoalKey = transactionDefault?.goalId
    ? [`${transactionDefault.goalId}`]
    : undefined || defaultGoal?.id
      ? [`${defaultGoal?.id}`]
      : undefined;

  const defaultAccountKey = transactionDefault?.accountId
    ? [`${transactionDefault.accountId}`]
    : undefined || account
      ? [`${account.id}`]
      : undefined;

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm<createTransaction>({
    resolver: zodResolver(createTransaction),
  });

  const alertConfig = {
    cancel: true,
    confirmProps: {
      onClick: () => {
        onClose();
        onSubmit();
      },
    },
    type: "quest",
  } as any;

  const { isOpen, onClose, onOpen, props, setProps } = useAlert(alertConfig);

  const onSubmit = () => {
    const payload = getValues();
    if (mode === "create") {
      toast.promise(
        createTransactionMutation(
          { ...payload, date: new Date() },
          {
            onSuccess(data) {
              onSuccess && onSuccess();
              reset();
            },
          },
        ),
        {
          loading: "Creando Transacción...",
          success: "La transacción se ha creado con éxito.",
          error: "Hubo un error, intente de nuevo",
        },
      );
      return;
    }
    if (transactionDefault) {
      toast.promise(
        updateTransactionMutation(
          { id: String(transactionDefault.id), ...payload },
          {
            onSuccess(data) {
              onSuccess && onSuccess();
              reset();
            },
          },
        ),
        {
          loading: "Actualizando Transacción...",
          success: "La transacción se ha actualizado con éxito.",
          error: "Hubo un error, intente de nuevo",
        },
      );
    }
  };

  // query params
  useEffect(() => {
    if (!account && transactionDefault) return;

    setValue("accountId", account?.id);
    setValue("transferType", type === "goal" ? 2 : 1);

    if (defCategory) {
      setValue("categoryId", Number(defCategory.id));
    }

    if (defEntity) {
      setValue("entityId", Number(defEntity.id));
    }

    if (type === "goal" && defaultGoal) {
      setGoalSelected(defaultGoal);
      setValue("goalId", Number(defaultGoal.id));
      defaultGoal.entity && setValue("entityId", Number(defaultGoal.entityId));
      const entity = entities.find(
        (ent) => ent.id === Number(defaultGoal.entityId),
      );
      setValue("reference", entity?.reference || "");
      setValue("recipient", entity?.name);
      return;
    }

    query?.category && setValue("categoryId", Number(query.category));

    if (type === "goal") {
      setValue(
        "goalId",
        router.query?.goal ? Number(router.query.goal) : undefined,
      );
    }

    if (query?.type && type === "transfer") {
      setValue("type", Number(query.type) as any);
    } else {
      setValue("type", 1);
    }

    if (query?.entity) {
      setValue("entityId", Number(query.entity));

      const entity = entities.find((ent) => ent.id === Number(query.entity));
      setValue("reference", entity?.reference || "");
      setValue("recipient", entity?.name);
    }
  }, [account, query]);

  useEffect(() => {
    if (transactionDefault) {
      const {
        amount,
        categoryId,
        description,
        entityId,
        date,
        reference,
        recipient,
        type: typeDef,
      } = transactionDefault;

      setValue("amount", amount);
      setAmountValue(amountFormatter(String(amount)).formatted);
      setValue("type", typeDef as 1 | 2);
      setValue("transferType", type === "transfer" ? 1 : 2);

      description && setValue("description", description);
      date && setValue("date", new Date(date));
      recipient && setValue("recipient", recipient);
      reference && setValue("reference", reference);
      categoryId && setValue("categoryId", categoryId);
      entityId && setValue("entityId", entityId);
    }
  }, [transactionDefault]);

  useEffect(() => {
    if (type === "goal" && goalSelected) {
      setValue("type", goalSelected.type as any);
    }
  }, [goalSelected]);

  return (
    <AnimatePresence>
      <div className="flex w-full items-start gap-8">
        <Alert isOpen={isOpen} onClose={onClose} {...props} />
        <motion.form
          layout
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex w-full flex-col items-center justify-center gap-2 pt-6 md:max-w-[36rem] md:pt-0"
          onSubmit={(e) => {
            e.preventDefault();
            setProps(alertConfig);
            onOpen();
          }}
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
              type === "transfer" ? (
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
                        colorSelected:
                          "!bg-red-500 border border-red-500 text-white",
                      },
                    ]}
                  />
                </div>
              ) : null
            }
            isInvalid={Boolean(errors?.amount)}
            errorMessage={errors?.amount?.message}
          />
          {type === "goal" && (
            <>
              <Select
                items={goals ?? []}
                placeholder="Seleccione la meta"
                label="Meta"
                isRequired
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
                      <aside className="flex flex-col">
                        <span>{data?.name}</span>
                        <span className="text-xs">
                          $ {data?.saved.toLocaleString()}
                        </span>
                      </aside>
                    </div>
                  ));
                }}
                defaultSelectedKeys={defaultGoalKey}
                isInvalid={Boolean(errors?.categoryId)}
                errorMessage={errors?.categoryId?.message ?? ""}
              >
                {(goal) => (
                  <SelectItem
                    color="primary"
                    variant="flat"
                    onClick={() => {
                      setGoalSelected(goal as GoalsIncludes);
                      setValue("type", goal.type as 1 | 2);
                      setValue("goalId", goal.id);
                      goal?.entityId && setValue("entityId", goal?.entityId);
                      if (goal?.entityId) {
                        const currentEntity = entities.find(
                          (entity) => entity.id === goal.entityId,
                        );
                        if (currentEntity) {
                          setValue("recipient", currentEntity.name || "");
                          currentEntity?.reference &&
                            setValue(
                              "reference",
                              currentEntity.reference || "",
                            );
                          // currentEntity?.description &&
                          //   setValue(
                          //     "description",
                          //     |.description || "",
                          //   );
                        }
                      } else {
                        setValue("recipient", undefined);
                        setValue("reference", undefined);
                        setValue("description", undefined);
                      }
                    }}
                    className="font-montserrat dark:text-white"
                    textValue={goal.name}
                    value={goal.id}
                    key={goal.id}
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-primary">
                        {goal?.icon && (
                          <Icon icon={goal?.icon} className="text-white" />
                        )}
                      </div>
                      <aside className="flex flex-col">
                        <span>{goal?.name}</span>
                        <span className="text-xs">
                          $ {goal?.saved.toLocaleString()}
                        </span>
                      </aside>
                    </div>
                  </SelectItem>
                )}
              </Select>
              <Select
                items={accounts ?? []}
                placeholder="Seleccione una cuenta"
                label="Cuenta"
                classNames={{
                  label: "group-data-[filled=true]:-translate-y-7",
                  trigger: "min-h-[86px]",
                  listboxWrapper: "max-h-[200px]",
                }}
                renderValue={(items) => {
                  return items.map(({ data }) => (
                    <div
                      key={data?.id}
                      className="dark:text-primary-light flex flex-col rounded-xl bg-primary/10 px-4 py-2 pr-6 text-primary dark:bg-default-300/50"
                    >
                      <span className="font-semibold">{data?.name}</span>
                      <span className="text-xs">
                        $ {data?.balance?.toLocaleString()}
                      </span>
                    </div>
                  ));
                }}
                required
                isRequired
                defaultSelectedKeys={defaultAccountKey}
                isInvalid={Boolean(errors?.categoryId)}
                errorMessage={errors?.categoryId?.message ?? ""}
              >
                {(account) => (
                  <SelectItem
                    color="primary"
                    onClick={() => setValue("accountId", account.id)}
                    key={account.id}
                    className="font-montserrat dark:text-white"
                    textValue={account.name}
                    value={account.id}
                  >
                    <div className="flex flex-col px-2 py-1">
                      <span className="font-medium">{account.name}</span>
                      <span className="text-xs">
                        $ {account.balance?.toLocaleString()}
                      </span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </>
          )}
          <Accordion
            defaultExpandedKeys={type === "transfer" ? ["1"] : []}
            showDivider={type === "goal"}
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
                subtitle: "dark:text-zinc-400",
              }}
              title="Información Adicional"
              subtitle="Agrega más información sobre tu transacción"
            >
              <div className="flex flex-col gap-2 pb-8">
                <InputDate
                  label="Fecha de transacción"
                  containerClassName="mt-4"
                  changeValue={(newDate) => setValue("date", newDate)}
                  value={watch("date")}
                  defaultValue={defaultDate}
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
                    defaultSelectedKeys={defaultCategory || query?.category}
                    isInvalid={Boolean(errors?.categoryId)}
                    errorMessage={errors?.categoryId?.message ?? ""}
                  >
                    {(category) => (
                      <SelectItem
                        color="primary"
                        onClick={() => setValue("categoryId", category.id)}
                        key={category.id}
                        className="font-montserrat dark:text-white"
                        textValue={category.name}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    items={entities ?? []}
                    placeholder="Seleccionar entidad"
                    label="Entidad"
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
                          onClick={() => {
                            entity.id && setValue("entityId", entity.id);
                            entity.reference &&
                              setValue("reference", String(entity.reference));
                            entity.name &&
                              setValue("recipient", String(entity.name));
                            entity.description &&
                              setValue("description", entity.description);
                          }}
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
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              hidden={type !== "goal"}
              classNames={{
                subtitle: "dark:text-zinc-400",
              }}
              title="Información de Meta"
              subtitle="Aquí podrás ver el avance de tu meta"
            >
              {Boolean(goalSelected) ? (
                <ul className="grid grid-cols-1 gap-2 md:flex-grow md:grid-cols-2 [&>li>span]:font-semibold [&>li]:text-xs">
                  <li>
                    <span>Nombre:</span>
                    <p>{goalSelected?.name}</p>
                  </li>
                  <li>
                    <span>Monto de Meta:</span>
                    <p>$ {goalSelected?.goal.toLocaleString()}</p>
                  </li>
                  <li>
                    <span>Total Ahorrado:</span>
                    <p>$ {goalSelected?.saved.toLocaleString()}</p>
                  </li>
                  <li>
                    <span>Estado:</span>
                    <p>
                      <Chip
                        color={
                          goalSelected?.state === 1
                            ? "primary"
                            : goalSelected?.state === 2
                              ? "success"
                              : "danger"
                        }
                        size="sm"
                        className="text-white"
                      >
                        {goalSelected?.state === 1
                          ? "Progreso"
                          : goalSelected?.state === 2
                            ? "Terminado"
                            : "Cancelado"}
                      </Chip>
                    </p>
                  </li>
                  <li>
                    <span>Descripción:</span>
                    <p>{goalSelected?.description}</p>
                  </li>
                  <li>
                    <span>Fecha limite:</span>
                    <p>
                      {goalSelected?.goalDate
                        ? capitalize(
                            format(
                              new Date(String(goalSelected?.goalDate)),
                              "PPP",
                              {
                                locale: es,
                              },
                            ),
                          )
                        : "N/A"}
                    </p>
                  </li>
                </ul>
              ) : (
                "Debe seleccionar una meta"
              )}
            </AccordionItem>
          </Accordion>
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button
              className="py-1 text-sm sm:w-fit"
              type="submit"
              color="primary"
              isDisabled={type === "goal" && goals.length === 0}
            >
              {mode === "edit" ? "Actualizar Transacción" : "Crear Transacción"}
            </Button>
            <Button
              className="py-1 text-sm sm:w-fit"
              onClick={() => onSuccess && onSuccess()}
            >
              Cancelar
            </Button>
          </div>
        </motion.form>
      </div>
    </AnimatePresence>
  );
};

export default TransactionForm;
