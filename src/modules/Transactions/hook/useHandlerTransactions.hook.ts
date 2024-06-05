import { Transaction } from "@prisma/client";
import { useEffect, useState } from "react";
import { months } from "~/lib/resource/months";
import { useFilterContext } from "~/lib/context/filterContext";

type BalanceByMonthType = {
  month: string;
  amount: number;
  income: number;
  egress: number;
  transactions?: Transaction[];
};

export const getTransactionsByMonths = (transactions?: Transaction[]) => {
  const [transactionsByMonth, setTransactionsByMonth] =
    useState<BalanceByMonthType[]>();
  const [myTransactions, setMyTransactions] = useState<Transaction[]>();
  const [balanceByMonth, setBalanceByMonth] = useState<number[]>();
  const [filteredMonths, setFilteredMonths] = useState<string[]>();

  const onFilterByMonth = () => {
    if (!myTransactions) return;
    const groupedData = myTransactions.reduce((acc, transaction) => {
      // Extraemos el mes de la fecha
      const month = transaction.date
        ? transaction.date.getMonth() + 1
        : transaction.createdAt.getMonth() + 1;

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

    const transactionsGrouped = Object.values<BalanceByMonthType>(groupedData);

    setTransactionsByMonth(transactionsGrouped);
  };

  useEffect(() => {
    if (!transactionsByMonth) return;
    const balances = transactionsByMonth.map(
      (group: BalanceByMonthType) => group.income + -group.egress,
    );
    const balanceMonths = transactionsByMonth.map(
      (group: BalanceByMonthType) => group.month,
    );
    setFilteredMonths(balanceMonths);
    setBalanceByMonth(balances);
  }, [transactionsByMonth]);

  useEffect(() => {
    if (transactions) {
      setMyTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    myTransactions && onFilterByMonth();
  }, [myTransactions]);

  return {
    transactionsByMonth,
    months: filteredMonths,
    balanceByMonth,
  };
};
