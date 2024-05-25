"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  // Input,
  ButtonGroup,
  InputDate,
  Button,
} from "~/modules/components";

import {
  Avatar,
  Button as ButtonSec,
  Input,
  Select,
  SelectItem,
  SelectedItems,
  User,
  useDisclosure,
} from "@nextui-org/react";

import DashboardLayout from "~/modules/layouts/Dashboard";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTransaction } from "~/modules/transactions/schema";
import { DateToSystemTimezoneSetter } from "node_modules/date-fns/parse/_lib/Setter";
import { useParams } from "next/navigation";
import Modal from "~/modules/components/atoms/Modal.component";
import CreateCategoryForm from "~/modules/category/CreateCategoryForm";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { Entities } from "@prisma/client";
import clsx from "clsx";
import { Alert } from "~/modules/components/molecules/Alert.component";
import { useAlert } from "~/lib/hooks/useAlert";

const NewTransactionPage = () => {
  const params = useParams<{ acc: string }>();
  const router = useRouter();
  const { account } = useCurrentAccount();
  const query = router.query;

  const { entities } = useEntity();
  const { data: categories } = api.category.getAll.useQuery();
  const { mutate: createTransactionMutation } =
    api.transaction.create.useMutation();

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<createTransaction>({
    resolver: zodResolver(createTransaction),
  });

  const { isOpen, onClose, onOpen, props, setProps } = useAlert({
    cancel: true,
    confirmProps: {
      onClick: () => {
        onSubmit();
      },
    },
    type: "quest",
  });

  const onSubmit = () => {
    const payload = getValues();
    createTransactionMutation(payload, {
      onSuccess(data, variables, context) {
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
    if (query?.type) {
      setValue("type", Number(query.type) as any);
    } else {
      setValue("type", 1);
    }
  }, [account, query]);

  return (
    <DashboardLayout title="Crear Transacción">
      <Alert isOpen={isOpen} onClose={onClose} {...props} />
      <div className="flex w-full items-start gap-8">
        <form
          className="flex w-full max-w-[32rem] flex-col items-center justify-center gap-2 pt-6 md:pt-0"
          onSubmit={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <h3 className="w-full">Datos de transacción</h3>
          <Input
            type="number"
            isRequired
            label="Valor de transacción"
            placeholder="0.00"
            // labelPlacement="outside"
            className="!appearance-none"
            onValueChange={(val) => setValue("amount", Number(val))}
            inputMode="numeric"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">$</span>
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
                      label: "",
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
                      label: "",
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
          <InputDate
            label="Fecha de transacción"
            containerClassName="mt-4"
            changeValue={(newDate) => setValue("date", newDate)}
            currentDate
            required
          />
          <h3 className="mt-4 w-full">Otros datos</h3>
          <section className="flex w-full gap-2">
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
                  <div className="flex items-center gap-2">
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
              isRequired
              required
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
                    key={String(entity?.id)}
                    className="py-1 font-montserrat dark:text-white"
                  >
                    <User
                      name={entity?.name}
                      description={
                        entity?.description !== "" ? entity?.description : "N/A"
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
                      setValue("recipient", String(entity.reference));
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
            startContent={
              <Icon
                icon="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal"
                className="dark:text-slate-200"
              />
            }
            endContent={
              <button onClick={() => alert("click")}>
                <Icon
                  icon="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal"
                  className="dark:text-slate-200"
                />
              </button>
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
          <div className="flex w-full flex-col gap-2 pt-3 md:flex-row">
            <Button
              className="w-fit py-1 text-sm"
              type="submit"
              // disabled={submitFormLoading}
            >
              Crear Transacción
              {/* {hasEdit ? "Actualizar Transacción" : "Crear Transacción"} */}
            </Button>
            <Button className="w-fit py-1 text-sm" variantStyle="outline">
              Cancelar
            </Button>
          </div>
        </form>
        {/* {accountForm && (
          <Card className="flex w-full flex-col">
            <header className="flex items-center justify-between">
              <h3>Crea una categoría</h3>
              <button
                className="hover:Scale-105"
                onClick={() => setAccountForm(false)}
              >
                <Icon icon="ic:twotone-close" width={18} />
              </button>
            </header>
            <p className="mb-3">
              Crea una categoría a la que puedas asociar una transacción
            </p>
            <CreateCategoryForm />
          </Card>
        )} */}
      </div>
      {/* <Card className="mx-auto flex w-full max-w-[40rem] flex-col items-center justify-center !bg-transparent !p-0 md:border md:!bg-white md:!p-6 dark:!bg-transparent md:dark:!bg-slate-900">
      </Card> */}
      {/* <Modal title="Crear categoría" isOpen={isOpen} onClose={onClose}>
        <p>Crea una categoría a la que puedas asociar una transacción</p>
      </Modal> */}
    </DashboardLayout>
  );
};

export default NewTransactionPage;
