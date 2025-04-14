import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  DateRangePicker,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Table } from "../components";
import { useForm } from "react-hook-form";
import { advanceSchema } from "./advanceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategory } from "../Category/hook/category.hook";
import { useEntity } from "../Entities/hook/entities.hook";
import { amountFormatter } from "~/utils/formatters";
import { useParams } from "next/navigation";
import { TransactionIncludes } from "~/server/api/services/transactions.services";
import { api } from "~/utils/api";
import { toast } from "sonner";
import TransactionsTable from "./TransactionsTable";
import { useResize } from "~/lib/hooks/useResize";
import MobileTransactionPage from "./MobileTransactionPage";

const AdvancedSearch = () => {
  const { entities } = useEntity();
  const { categories } = useCategory();

  const params = useParams<{ bookId: string }>();
  const { isMobile } = useResize();

  const [maxAmountValue, setMaxAmountValue] = useState("");
  const [minAmountValue, setMinAmountValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState<TransactionIncludes[]>(
    [] as TransactionIncludes[],
  );
  const { fetch: searchTransactions } = api.useUtils().transaction.search;
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<advanceSchema>({
    resolver: zodResolver(advanceSchema),
  });

  const onSubmit = (data: advanceSchema) => {
    toast.promise(
      async () => {
        setIsLoading(true);
        const transactions: TransactionIncludes[] = await searchTransactions({
          ...data,
          max: data.max === 0 ? undefined : data.max,
          min: data.min === 0 ? undefined : data.min,
        });
        if (transactions) {
          setTransactions(transactions);
        }
        setIsLoading(false);
      },
      {
        loading: "Buscando transacciones...",
        success: "Transacciones encontradas",
        error: "No se encontraron transacciones",
      },
    );
  };

  useEffect(() => {
    const { bookId, ...data } = getValues();
    const isValid = Object.values(data).some((value) => value !== undefined);

    setIsSubmitted(isValid);
  }, [watch()]);

  useEffect(() => {
    setValue("bookId", params?.bookId);
  }, [params]);

  return (
    <div className="flex flex-col gap-4">
      <Accordion
        className="!mx-0 px-0"
        itemClasses={{
          trigger: "px-2 mx-0",
          base: "shadow-sm border border-divider",
          content: "pb-5",
        }}
      >
        <AccordionItem
          key={"filters"}
          variant="splitted"
          title={"Busqueda Avanzada"}
          subtitle={"Realize una búsqueda más detallada"}
        >
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DateRangePicker
              label="Rango de fecha"
              aria-label="Select date range"
              classNames={{
                calendarContent: "font-montserrat",
              }}
              visibleMonths={isMobile ? 1 : 3}
              onChange={(value) => {
                if (value) {
                  setValue("start_date", new Date(value.start.toString()));
                  setValue("end_date", new Date(value.end.toString()));
                } else {
                  setValue("start_date", undefined);
                  setValue("end_date", undefined);
                }
              }}
            />
            <Select
              label="Tipo de transacción"
              placeholder="Seleccione el tipo de transacción"
              onChange={(value) =>
                value.target.value
                  ? setValue("type", Number(value.target.value))
                  : setValue("type", undefined)
              }
              isInvalid={!!errors.type?.message}
              errorMessage={errors.type?.message}
            >
              <SelectItem className="font-montserrat" key={1}>
                Ingreso
              </SelectItem>
              <SelectItem className="font-montserrat" key={2}>
                Egreso
              </SelectItem>
            </Select>
            <div className="flex gap-4">
              <Input
                label="Monto Minimo"
                value={minAmountValue}
                onValueChange={(val) => {
                  const { formatted, raw } = amountFormatter(val);
                  setValue("min", raw ?? undefined);
                  setMinAmountValue(formatted);
                }}
                placeholder="100.000"
                isInvalid={!!errors.min?.message}
                errorMessage={errors.min?.message}
              />
              <Input
                label="Monto Máximo"
                placeholder="400.000"
                value={maxAmountValue}
                onValueChange={(val) => {
                  const { formatted, raw } = amountFormatter(val);
                  setValue("max", raw ?? undefined);
                  setMaxAmountValue(formatted);
                }}
                isInvalid={!!errors.max?.message}
                errorMessage={errors.max?.message}
              />
            </div>
            <Select
              label="Categoría"
              items={categories}
              placeholder="Seleccione una categoría"
              isInvalid={!!errors.categoryId?.message}
              errorMessage={errors.categoryId?.message}
              onChange={(value) =>
                value.target.value
                  ? setValue("categoryId", Number(value.target.value))
                  : setValue("categoryId", undefined)
              }
            >
              {(categories) => {
                return (
                  <SelectItem
                    className="font-montserrat capitalize"
                    key={categories.id}
                  >
                    {categories.name}
                  </SelectItem>
                );
              }}
            </Select>
            <Select
              label="Entidad"
              items={entities}
              placeholder="Seleccione una entidad"
              isInvalid={!!errors.entityId?.message}
              errorMessage={errors.entityId?.message}
              onChange={(value) =>
                value.target.value
                  ? setValue("entityId", Number(value.target.value))
                  : setValue("entityId", undefined)
              }
            >
              {(entities) => {
                return (
                  <SelectItem
                    className="font-montserrat capitalize"
                    key={entities.id}
                  >
                    {entities.name}
                  </SelectItem>
                );
              }}
            </Select>
            <Select
              label="Estado"
              placeholder="Seleccione un estado"
              isInvalid={!!errors.state?.message}
              errorMessage={errors.state?.message}
              onChange={(value) =>
                value.target.value
                  ? setValue("state", Number(value.target.value))
                  : setValue("state", undefined)
              }
            >
              <SelectItem className="font-montserrat" key={1}>
                Confirmado
              </SelectItem>
              <SelectItem className="font-montserrat" key={2}>
                Cancelado
              </SelectItem>
              <SelectItem className="font-montserrat" key={3}>
                Programado
              </SelectItem>
            </Select>
            <div className="flex gap-2">
              <Button type="submit" isDisabled={!isSubmitted} color="primary">
                Realizar Busqueda
              </Button>
              <Button
                type="button"
                onPress={() => reset()}
                className="border border-divider"
              >
                Limpiar Filtros
              </Button>
            </div>
          </form>
        </AccordionItem>
      </Accordion>
      {isMobile ? (
        <MobileTransactionPage
          transactions={transactions as any}
          isLoading={isLoading}
        />
      ) : (
        <TransactionsTable
          transactions={transactions as any}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdvancedSearch;
