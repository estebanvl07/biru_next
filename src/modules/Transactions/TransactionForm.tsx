import React, { useEffect, useMemo, useState } from "react";
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
  Switch,
  Tooltip,
  User,
} from "@heroui/react";
import {
  ButtonGroup,
  InputDate,
  InputSelectAccount,
} from "~/modules/components";

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

import type { Goals, Templates, Transaction } from "@prisma/client";
import { STATUS_TRANS, type TransactionIncludes } from "~/types/transactions";
import { toast } from "sonner";
import { GoalsIncludes } from "~/types/goal/goal.types";
import { CategoryIncludes } from "~/types/category/category.types";
import { EntityIncludes } from "~/types/entities/entity.types";
import TemplatesSection from "./TemplatesSection";
import {
  getTransactionStatus,
  statusColor,
  statusIcon,
} from "~/utils/transactionStatus";
import { set } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { useExpensesCurrentMonth } from "../Budget/hooks/useBudget";

const statusOptions = [
  {
    value: STATUS_TRANS.confirmed,
    text: "Confirmado",
  },
  {
    value: STATUS_TRANS.cancelled,
    text: "Cancelado",
  },
  {
    value: STATUS_TRANS.scheduled,
    text: "Programado",
  },
];

const frecuency = [
  {
    text: "Diario",
    value: 1,
  },
  {
    text: "Semanal",
    value: 7,
  },
  {
    text: "Quincenal",
    value: 15,
  },
  {
    text: "Mensual",
    value: 30,
  },
  {
    text: "Trimestral",
    value: 90,
  },
  {
    text: "Anual",
    value: 365,
  },
];

interface TransactionFormProps {
  type: "goal" | "transfer";
  mode?: "create" | "edit";
  transactionDefault?: TransactionIncludes;
  defaultGoal?: GoalsIncludes;
  defSchedule?: boolean;
  defCategory?: CategoryIncludes;
  defScheduleDate?: Date;
  defEntity?: EntityIncludes;
  defType?: 1 | 2 | 3;
  onSuccess?: (data: TransactionIncludes) => void;
}

const TransactionForm = ({
  type,
  mode = "create",
  transactionDefault,
  defaultGoal,
  defSchedule = false,
  defCategory,
  defScheduleDate,
  defEntity,
  defType = 1,
  onSuccess,
}: TransactionFormProps) => {
  const [amountValue, setAmountValue] = useState("");
  const [goalSelected, setGoalSelected] = useState<GoalsIncludes>();
  const [schedule, setSchedule] = useState<boolean>(
    transactionDefault?.state === 3 || defSchedule,
  );

  const { account } = useCurrentAccount();
  const { entities } = useEntity();
  const { accounts } = useAccounts();
  const { categories } = useCategory();
  const { goals } = useGoals();
  const { invalidateExpenses } = useExpensesCurrentMonth();

  const router = useRouter();

  const query = router.query;

  const trpcQuery = api.useUtils();

  const { mutateAsync: createTransactionMutation } =
    api.transaction.create.useMutation({
      onSuccess: (data) => {
        onSuccess?.(data);
        invalidateExpenses({ hasRefetch: true });
        trpcQuery.transaction.getTransactions.invalidate();
      },
    });
  const { mutateAsync: updateTransactionMutation } =
    api.transaction.update.useMutation({
      onSuccess: (data) => {
        onSuccess?.(data);
        invalidateExpenses({ hasRefetch: true });
        const queryClient = useQueryClient();
        queryClient.invalidateQueries();
      },
    });

  const defaultState =
    transactionDefault && transactionDefault.state
      ? [String(transactionDefault.state)]
      : undefined;

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
    : (defaultGoal?.id ?? undefined)
      ? [`${defaultGoal?.id}`]
      : undefined;

  const defaultAccountKey = transactionDefault?.accountId
    ? [`${transactionDefault.accountId}`]
    : account
      ? [`${account.id}`]
      : undefined;

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
    reset,
  } = useForm<createTransaction>({
    resolver: zodResolver(createTransaction),
  });

  const onSubmit = (data: createTransaction) => {
    const payload = {
      ...data,
      state: schedule ? 3 : 1,
      isConfirmed: !schedule,
      isProgramed: schedule,
    };

    if (mode === "create") {
      toast("Esta seguro de realizar esta acción", {
        icon: "❓",
        action: {
          label: "Crear",
          onClick: () => {
            toast.promise(
              createTransactionMutation(
                { ...payload },
                {
                  onSuccess(data) {
                    // onSuccess?.(data);
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
          },
        },
      });
      return;
    }
    if (transactionDefault) {
      toast.promise(
        updateTransactionMutation(
          {
            id: String(transactionDefault.id),
            ...payload,
          },
          {
            onSuccess(data) {
              onSuccess?.(data);
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

  const setTemplate = (template: Templates | null | undefined): void => {
    if (template) {
      setValue("categoryId", template.categoryId || undefined);
      setValue("entityId", template.entityId || undefined);
      setValue("recipient", template.recipient || undefined);
      setValue("reference", template.reference || undefined);
      setValue("description", template.description || undefined);
      setValue("type", template.type || 1);
    } else {
      setValue("categoryId", undefined);
      setValue("entityId", undefined);
      setValue("recipient", undefined);
      setValue("reference", undefined);
      setValue("description", undefined);
      setValue("type", 1);
    }
  };

  useMemo(() => {
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

  useMemo(() => {
    if (transactionDefault) {
      const {
        amount,
        categoryId,
        description,
        entityId,
        date,
        reference,
        recipient,
        accountId,
        type: typeDef,
      } = transactionDefault;

      setValue("amount", amount);
      setValue("accountId", Number(accountId));
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

  useEffect(() => {
    setValue("bookId", String(query.bookId));
  }, [query]);

  return (
    <AnimatePresence>
      <div className="flex w-full max-w-[36rem] flex-col items-start gap-4">
        <motion.form
          layout
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 1,
          }}
          className="app-form flex w-full flex-col items-center justify-center gap-2 rounded-xl "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col items-start">
            <h2 className="text-base">Información Requerida</h2>
            <p className="text-foreground-500">
              Completa el formulario para registrar una nueva transacción.
            </p>
          </div>
          {type === "transfer" && (
            <div className="flex w-full items-center justify-between">
              <TemplatesSection
                onChange={(template) => setTemplate(template)}
              />
            </div>
          )}
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
          {mode === "edit" && (
            <Select
              items={statusOptions}
              placeholder="Seleccione un estado"
              label="Estado"
              classNames={{
                label: "group-data-[filled=true]:-translate-y-4",
                trigger: "min-h-[70px]",
                listboxWrapper: "max-h-[200px]",
              }}
              renderValue={(items) => {
                return items.map(({ data }) => (
                  <Chip
                    key={data!.value}
                    size="sm"
                    variant="flat"
                    color={statusColor(data!.value) as any}
                    startContent={
                      <Icon icon={statusIcon(data!.value) || ""} width={14} />
                    }
                  >
                    {getTransactionStatus(data!.value)}
                  </Chip>
                ));
              }}
              defaultSelectedKeys={defaultState}
              isRequired
              // isInvalid={Boolean(errors?.categoryId)}
              // errorMessage={errors?.categoryId?.message ?? ""}
            >
              {(state) => (
                <SelectItem
                  color="primary"
                  onPress={() => setValue("categoryId", state.value)}
                  key={state.value}
                  className="font-montserrat dark:text-white"
                  textValue={state.text}
                >
                  {state.text}
                </SelectItem>
              )}
            </Select>
          )}
          {type === "goal" && (
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
                  onPress={() => {
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
                          setValue("reference", currentEntity.reference || "");
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
          )}
          <InputSelectAccount
            isRequired
            defaultSelected={defaultAccountKey}
            hasError={Boolean(errors.accountId)}
            errorMessage={errors.accountId?.message}
            onChange={() => setValue("accountId", account?.id)}
          />
          <motion.div className="mb-2 mt-4 flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <aside>
                <h4 className="text-base font-semibold">
                  Transacción Programada
                </h4>
                <p className="text-sm text-foreground-500 dark:text-zinc-400">
                  Habilita esta opción si deseas realizar la transacción en una
                  fecha futura.
                </p>
              </aside>
              <Switch
                onValueChange={setSchedule}
                defaultChecked={schedule}
                defaultSelected={schedule}
                size="sm"
              />
            </div>
            {schedule && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: "tween",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.6,
                }}
              >
                <InputDate
                  label="Fecha Programada"
                  containerClassName="mt-4"
                  changeValue={(newDate) => setValue("date", newDate)}
                  value={watch("date")}
                  defaultValue={
                    defScheduleDate || (transactionDefault && defaultDate)
                  }
                  required
                />
              </motion.div>
            )}
          </motion.div>
          <Accordion
            className="m-0 rounded-lg !p-0 !shadow-none"
            itemClasses={{
              trigger: "!shadow-none",
              base: "px-0 !shadow-none",
            }}
            showDivider={type === "goal"}
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
              key="1"
              aria-label="Accordion 1"
              classNames={{
                subtitle: "dark:text-zinc-400",
              }}
              title="Información Adicional"
              subtitle="Agrega más información sobre tu transacción"
            >
              <div className="flex flex-col gap-2 pb-2">
                {!schedule && (
                  <InputDate
                    label="Fecha de transacción"
                    containerClassName="mt-4"
                    changeValue={(newDate) => setValue("date", newDate)}
                    value={watch("date")}
                    defaultValue={defaultDate}
                  />
                )}
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
                <ul className="mb-2 grid grid-cols-1 gap-2 md:flex-grow md:grid-cols-2 [&>li>span]:font-semibold [&>li]:text-xs">
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
            {/* TODO: Add cancel func */}
            <Button
              className="py-1 text-sm sm:w-fit"
              // onPress={() => }
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
