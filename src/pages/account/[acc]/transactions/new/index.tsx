"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  // Input,
  ButtonGroup,
  InputDate,
  Button,
} from "~/modules/components";

import { Input, Select, SelectItem } from "@nextui-org/react";

import DashboardLayout from "~/modules/layouts/Dashboard";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTransaction } from "~/modules/transactions/schema";
import { DateToSystemTimezoneSetter } from "node_modules/date-fns/parse/_lib/Setter";
import { useParams } from "next/navigation";

const NewTransactionPage = () => {
  const params = useParams<{ acc: string }>();
  const { data: categories } = api.category.getAll.useQuery();
  const TransactionService = api.transaction.create.useMutation();
  const router = useRouter();
  const query = router.query;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<createTransaction>({
    resolver: zodResolver(createTransaction),
  });

  const onSubmit = (data: any) => {
    TransactionService.mutateAsync(data, {
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
    if (!params) return;
    setValue("accountId", Number(params.acc));
    if (query?.type) {
      setValue("type", query.type as any);
    } else {
      setValue("type", 1);
    }
  }, []);

  console.log(errors);

  return (
    <DashboardLayout title="Crear Transacción">
      <form
        className="flex w-full max-w-[32rem] flex-col items-center justify-center gap-2 pt-6 md:pt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="w-full text-start dark:text-slate-300">
          Valor de transacción
        </p>
        <Input
          type="number"
          variant="underlined"
          isRequired
          // label="Monto"
          placeholder="0.00"
          size="lg"
          labelPlacement="outside"
          className="!appearance-none"
          onLoad={() => {}}
          // onChange={(val) => console.log(val)}
          onValueChange={(val) => setValue("amount", Number(val))}
          inputMode="decimal"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">$</span>
            </div>
          }
        />
        <ButtonGroup
          containerClassName="w-full"
          buttonClass="text-xs !py-1"
          // defaultSelected={query?.type ? Number(query?.type) : 1}
          options={[
            {
              id: 1,
              label: "Ingreso",
              onClick: () => {
                setValue("type", 1);
              },
              colorSelected: "!bg-green-500 border border-green-500 text-white",
            },
            {
              id: 2,
              label: "Egreso",
              onClick: () => {
                setValue("type", 2);
              },
              colorSelected: "!bg-red-500 border border-red-500 text-white",
            },
          ]}
        />

        <InputDate
          label="Fecha de transacción"
          containerClassName="mt-4"
          changeValue={(newDate) => setValue("date", newDate)}
          required
        />
        <Input
          startContent={
            <Icon icon="fluent:text-description-24-filled" width={18} />
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
          startContent={<Icon icon="iconamoon:category" />}
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
                  className="font-montserrat"
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
            <Icon icon="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal" />
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
      {/* <Card className="mx-auto flex w-full max-w-[40rem] flex-col items-center justify-center !bg-transparent !p-0 md:border md:!bg-white md:!p-6 dark:!bg-transparent md:dark:!bg-slate-900">
      </Card> */}
    </DashboardLayout>
  );
};

export default NewTransactionPage;
