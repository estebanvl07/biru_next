import React, { useEffect, useState } from "react";
import { ITransaction } from "~/types/transactions";

type SeriesTransactionType = {
  month: string;
  amount: number;
  income: number;
  egress: number;
  transactions?: ITransaction[];
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>();
  const [seriesTransaction, setSeriesTransaction] =
    useState<SeriesTransactionType[]>();

  // TODO: get transactions
  const { loading, transactions: myTransactions } = {
    loading: false,
    transactions: [] as ITransaction[],
  };
  const months: any = {
    1: "Ene",
    2: "Feb",
    3: "Mar",
    4: "Abr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Ago",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dic",
  };

  const filterByMonth = () => {
    if (!myTransactions) return;

    // Creamos un objeto para almacenar los datos agrupados
    const groupedData = myTransactions.reduce((acc, transaction) => {
      // Extraemos el mes de la fecha (formato YYYY-MM-DD)
      const splitMonth = transaction.date.split("-")[1];
      const month = Number(splitMonth);

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

    // Convertimos el objeto en un array de resultados
    const groupValues = Object.values<SeriesTransactionType>(groupedData);

    setSeriesTransaction(groupValues);
  };

  // useEffect(() => {
  //   if (!myTransactions) return;
  //   setTransactions(myTransactions);
  // }, [myTransactions]);

  return {
    transactions,
    seriesTransaction,
    loading,
    months,
    filterByMonth,
  };
};
