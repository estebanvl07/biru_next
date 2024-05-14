import { Transaction } from "@prisma/client";
import { useEffect, useState } from "react";
import { months } from "~/lib/resource/months";
import { useTransactions } from "./useTransactions.hook";

type SeriesTransactionType = {
  month: string;
  amount: number;
  income: number;
  egress: number;
  transactions?: Transaction[];
};

export const getTransactionsByMonths = () => {
  const [transactionsByMonth, setTransactionsByMonth] =
    useState<SeriesTransactionType[]>();
  const { transactions: myTransactions } = useTransactions();

  const onFilterByMonth = () => {
    const groupedData = myTransactions.reduce((acc, transaction) => {
      // Extraemos el mes de la fecha
      const month = transaction.date.getMonth() + 1;

      // Si ya existe una entrada para ese mes, sumamos la cantidad y agregamos el nombre
      if (acc[month]) {
        acc[month].transactions.push(transaction);
        acc[month].amount += transaction.amount;
        if (transaction.type === 1) acc[month].income += transaction.amount;
        if (transaction.type === 2) acc[month].egress += transaction.amount;
      } else {
        // Si no existe, creamos una nueva entrada
        acc[month] = {
          month: months[month],
          amount: transaction.amount,
          income: transaction.type === 1 ? transaction.amount : 0,
          egress: transaction.type === 2 ? transaction.amount : 0,
          transactions: [transaction],
        };
      }

      return acc;
    }, {} as any);

    const transactionsGrouped =
      Object.values<SeriesTransactionType>(groupedData);

    console.log(transactionsGrouped);

    setTransactionsByMonth(transactionsGrouped);
  };

  useEffect(() => {
    myTransactions && onFilterByMonth();
  }, [myTransactions]);

  return {
    transactionsByMonth,
    months,
  };
};
