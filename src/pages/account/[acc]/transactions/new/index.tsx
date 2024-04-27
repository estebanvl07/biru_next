"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Input,
  ButtonGroup,
  InputDate,
  Select,
  Button,
} from "~/modules/components";

import { Input as InputNumber } from "@nextui-org/react";

import DashboardLayout from "~/modules/layouts/Dashboard";

const NewTransactionPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <DashboardLayout title="Crear Transacción">
      <form
        className="flex w-full max-w-[32rem] flex-col items-center justify-center gap-2 pt-6 md:pt-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <h2 className="mb-4 hidden w-full md:block">Nueva transación</h2> */}

        <p className="w-full text-start">Valor de transacción</p>
        <InputNumber
          type="number"
          variant="underlined"
          placeholder="0.00"
          size="lg"
          labelPlacement="outside"
          className="!appearance-none"
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
          defaultSelected={1}
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

        {/* <div className="flex w-full flex-col rounded-md border bg-white dark:border-white/50 dark:bg-transparent">
          <Input
            required
            // readOnly={hasEdit}
            iconPath="fluent:money-hand-24-regular"
            containerClassName="dark:!text-white !bg-none !border-none !py-0 !pt-2"
            placeholder="$ 0.00"
            label="Valor"
            type="number"
            className="w-full"
            {...register("amount")}
            error={errors.amount?.message as any}
          />
          <section className="p-1">
            <ButtonGroup
              containerClassName="w-full"
              buttonClass="text-xs !py-1"
              defaultSelected={1}
              options={[
                {
                  id: 1,
                  label: "Ingreso",
                  onClick: () => {
                    setValue("type", 1);
                  },
                  colorSelected:
                    "!bg-green-500 border border-green-500 text-white",
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
          </section>
        </div> */}

        {/* <InputDate
          label="Fecha de transacción"
          changeValue={(newDate: Date) => console.log(newDate)}
          required
        /> */}
        <Input
          containerClassName="mt-4"
          iconPath="fluent:text-description-24-filled"
          label="Descripción"
          placeholder="Mercado del mes"
          {...register("description")}
          error={errors.description?.message as any}
          required
        />
        <Select
          required
          iconPath="iconamoon:category"
          // eventIcon={() => navigation("/category/new")}
          // setOption={detail?.categoryId}
          options={[]}
          changeOption={(option) =>
            setValue("categoryId", Number(option.value))
          }
          name="category"
          label="Categoría"
          placeholder="Mercado, Servicios, Arriendo"
          error={errors.categoryId?.message as any}
        />
        <Input
          iconPath="streamline:travel-map-triangle-flag-navigation-map-maps-flag-gps-location-destination-goal"
          label="Destinatario"
          placeholder="Andres, Juan, Omar"
          {...register("destinatary")}
          error={errors.destinatary?.message as any}
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
