"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  // Input,
  ButtonGroup,
  InputDate,
} from "~/modules/components";

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

import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTransaction } from "~/modules/transactions/schema";
import { Alert } from "~/modules/components/molecules/Alert.component";

import { amountFormatter } from "~/utils/formatters";

import { useAccounts, useCurrentAccount } from "~/modules/Account/hooks";
import { useParams } from "next/navigation";
import { useAlert } from "~/lib/hooks/useAlert";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { useCategory } from "../category/hook/category.hook";
import { useGoals } from "../Goals/hook/goal.hook";

import { AnimatePresence, motion } from "framer-motion";
import { Goals } from "@prisma/client";
import { capitalize } from "../components/molecules/Table/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

interface TransactionFormProps {
  type: "goal" | "transfer";
}

const TransactionForm = ({ type }: TransactionFormProps) => {
  const [amountValue, setAmountValue] = useState("");
  const [goalSelected, setGoalSelected] = useState<Goals>();

  const params = useParams();
  const router = useRouter();

  const { account } = useCurrentAccount();
  const { entities } = useEntity();
  const { accounts } = useAccounts();
  const { categories } = useCategory();
  const { goals, isLoading: isLoadingGoals } = useGoals();

  const query = router.query;

  const { mutate: createTransactionMutation } =
    api.transaction.create.useMutation();

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
        onSubmit();
      },
    },
    type: "quest",
  } as any;

  const { isOpen, onClose, onOpen, props, setProps } = useAlert(alertConfig);

  const onSubmit = () => {
    const payload = getValues();
    createTransactionMutation(payload, {
      onSuccess() {
        setProps({
          ...props,
          type: "success",
          cancel: false,
          confirmProps: {
            onClick: () => {
              router.push(`/account/${params?.acc}/transactions`);
            },
          },
        });
        reset();
        onOpen();
      },
      onError(error, variables, context) {
        setProps({
          ...props,
          type: "error",
        });
        onOpen();
      },
    });
  };

  useEffect(() => {
    if (!account) return;
    setValue("accountId", account.id);
    setValue("type", Number(query.type) as any);
    setValue("transferType", type === "goal" ? 2 : 1);
    if (type === "goal") {
      setValue(
        "goalId",
        router.query?.goal ? Number(router.query.goal) : undefined,
      );
    }
    if (query?.type) {
      setValue("type", Number(query.type) as any);
    } else {
      setValue("type", 1);
    }
  }, [account, query]);

  useEffect(() => {}, []);

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
                {watch("type") === 2 && <span className="ml-1">-</span>}
              </div>
            }
            endContent={
              <div>
                <ButtonGroup
                  containerClassName="w-fit"
                  buttonClass="text-xs !py-1"
                  defaultSelected={query?.type ? Number(query?.type) : 1}
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
          {type === "goal" && (
            <>
              <Select
                items={goals ?? []}
                placeholder="Seleccione la meta"
                onChange={(e) => console.log(e)}
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
                defaultSelectedKeys={
                  query?.goal ? [`${query.goal}`] : undefined
                }
                isInvalid={Boolean(errors?.categoryId)}
                errorMessage={errors?.categoryId?.message ?? ""}
              >
                {(goal) => (
                  <SelectItem
                    color="primary"
                    variant="flat"
                    onClick={(e) => {
                      setGoalSelected((prev) =>
                        prev?.id === goal.id ? undefined : goal,
                      );
                      setValue("goalId", goal.id);
                    }}
                    key={goal.id}
                    className="font-montserrat dark:text-white"
                    textValue={goal.name}
                    value={goal.id}
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
                placeholder="¿De que cuenta saldrá el dinero?"
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
                      className="flex flex-col rounded-xl bg-primary/10 px-4 py-2 pr-6 text-primary dark:bg-indigo-400/20 dark:text-primary-light"
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
                defaultSelectedKeys={account ? [`${account.id}`] : undefined}
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
            defaultExpandedKeys={
              type === "transfer"
                ? ["1"]
                : Boolean(goalSelected)
                  ? ["2"]
                  : undefined
            }
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
            {type === "transfer" ? (
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Información adicional"
                subtitle="Agrega más información sobre tu transacción"
              >
                <div className="flex flex-col gap-2 pb-8">
                  <InputDate
                    label="Fecha de transacción"
                    containerClassName="mt-4"
                    changeValue={(newDate) => setValue("date", newDate)}
                    currentDate
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
                          <div
                            key={data?.id}
                            className="flex items-center gap-2"
                          >
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary">
                              {data?.icon ? (
                                <Icon
                                  icon={data?.icon}
                                  className="text-white"
                                />
                              ) : (
                                <Avatar name={data?.name} />
                              )}
                            </div>
                            {data?.name}
                          </div>
                        ));
                      }}
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
                              setValue("entityId", entity.id);
                              setValue("reference", String(entity.reference));
                              setValue("recipient", String(entity.name));
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
                    label="Reference"
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
                    // iconPath="fluent:text-description-24-filled"
                    label="Descripción"
                    placeholder="Mercado del mes"
                    {...register("description")}
                    isInvalid={Boolean(errors?.description)}
                    errorMessage={errors?.description?.message ?? ""}
                  />
                </div>
              </AccordionItem>
            ) : (
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
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
            )}
          </Accordion>
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button
              className="py-1 text-sm sm:w-fit"
              type="submit"
              color="primary"
              isDisabled={type === "goal" && goals.length === 0}
            >
              Crear Transacción
              {/* {hasEdit ? "Actualizar Transacción" : "Crear Transacción"} */}
            </Button>
            <Button
              className="border-1 py-1 text-sm sm:w-fit"
              variant="bordered"
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
