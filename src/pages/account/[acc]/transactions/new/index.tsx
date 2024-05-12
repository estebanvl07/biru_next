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
  Button as ButtonSec,
  Input,
  Select,
  SelectItem,
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

const NewTransactionPage = () => {
  const [accountForm, setAccountForm] = useState(false);
  const params = useParams<{ acc: string }>();
  const router = useRouter();
  const { account } = useCurrentAccount();
  const query = router.query;

  const { data: categories } = api.category.getAll.useQuery();
  const { mutate: createTransactionMutation } =
    api.transaction.create.useMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<createTransaction>({
    resolver: zodResolver(createTransaction),
  });

  const onSubmit = (data: createTransaction) => {
    createTransactionMutation(data, {
      onSuccess(data, variables, context) {
        console.log(data);
        router.back();
      },
      onError(error, variables, context) {
        console.log(error, variables, context);
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

  console.log(errors);

  return (
    <DashboardLayout title="Crear Transacción">
      <div className="flex w-full items-start gap-8">
        <form
          className="flex w-full max-w-[32rem] flex-col items-center justify-center gap-2 pt-6 md:pt-0"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          />

          <InputDate
            label="Fecha de transacción"
            containerClassName="mt-4"
            changeValue={(newDate) => setValue("date", newDate)}
            required
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
            errorMessage={errors?.description?.message ?? ""}
            required
          />
          <Select
            placeholder="Seleccione una categoría"
            label="Categoría"
            onClick={() => categories?.length === 0 && setAccountForm(true)}
            startContent={
              <Icon icon="iconamoon:category" className="dark:text-slate-200" />
            }
            isRequired
            required
            errorMessage={errors?.categoryId?.message ?? ""}
            items={categories}
          >
            {categories ? (
              categories.map((category) => {
                return (
                  <SelectItem
                    color="primary"
                    onClick={() => setValue("categoryId", category.id)}
                    key={category.id}
                    className="font-montserrat dark:text-white"
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                );
              })
            ) : (
              <SelectItem key={0} value={0}>
                Sin datos
              </SelectItem>
            )}
          </Select>
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
            // error={errors.destinatary?.message as any}
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
