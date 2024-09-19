import { useEffect, useMemo, useState } from "react";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { useFilterByType } from "~/modules/Transactions/hook";
import { Series } from "~/types/chart.types";
import { api } from "~/utils/api";

export const useBalanceProjection = () => {
  const { account } = useCurrentAccount();
  const [balanceTotal, setBalanceTotal] = useState<number>();
  const [noData, setNoData] = useState<boolean>(false);
  const [series, setSeries] = useState<Series[]>();
  const { data: movementPlanneds, isLoading } =
    api.monthlyBudget.getMovementPlanneds.useQuery();

  const handleSeries = () => {
    if (!account || !movementPlanneds) return;
    // TODO: income by goals
    const history: number[] = [];
    let amountBalanceIterator = account.balance || 0;

    for (const tran of movementPlanneds!) {
      if (tran.type === 1) {
        amountBalanceIterator += tran.amount;
      } else {
        amountBalanceIterator -= tran.amount;
      }
      history.push(amountBalanceIterator);
    }

    setSeries([
      {
        name: "Balance",
        data: [account?.balance! || 0, ...history],
        color: "#3E1FE9",
      },
    ]);
  };

  useEffect(() => {
    if (!account || !movementPlanneds) return;

    const currentBalance = account.balance;

    const incomes = movementPlanneds?.reduce(
      (acc, { amount }) => acc + amount,
      0,
    );

    setBalanceTotal(currentBalance! + incomes);
  }, [movementPlanneds, account]);

  useEffect(() => {
    if (account && movementPlanneds) {
      if (movementPlanneds.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setSeries([]);
      handleSeries();
    }
  }, [account, movementPlanneds]);

  return {
    balanceTotal,
    series,
    noData,
  };
};

export const useFlowProjection = (type: "income" | "egress") => {
  const { account } = useCurrentAccount();
  const [noData, setNoData] = useState<boolean>(false);
  const [series, setSeries] = useState<Series[]>();
  const [balanceTotal, setBalanceTotal] = useState<number>();

  const { data, isLoading } = api.monthlyBudget.getIncomes.useQuery();

  const handleSeries = () => {
    if (!account || !data) return;
    // TODO: income by goals
    const incomeHistory: number[] = [];
    const egressHistory: number[] = [];
    let amountIncomeIterator = 0;
    let amountEgressIterator = 0;

    for (const tran of data.fixedIncomes!) {
      if (tran.type === 1) {
        amountIncomeIterator += tran.amount;
      } else {
        amountEgressIterator += tran.amount;
      }
      incomeHistory.push(amountIncomeIterator);
      egressHistory.push(amountEgressIterator);
    }

    if (type === "income") {
      setBalanceTotal(amountIncomeIterator);
      setSeries([
        {
          name: "Balance",
          data: incomeHistory,
          color: "#22c55e",
        },
      ]);
    } else {
      setBalanceTotal(amountEgressIterator);
      setSeries([
        {
          name: "Balance",
          data: egressHistory,
          color: "#dc2626",
        },
      ]);
    }
  };

  useEffect(() => {
    if (account && data) {
      if (data.fixedIncomes.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
      setSeries([]);
      handleSeries();
    }
  }, [account, data]);

  return {
    balanceTotal,
    series,
    noData,
  };
};
