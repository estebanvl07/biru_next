import { useEffect, useState } from "react";
import clsx from "clsx";

import CardDetailAmount from "./CardDetailAmount";

import { getPercent } from "~/lib/helpers";
import { useTransactions } from "~/modules/Transactions/hook/useTransactions.hook";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { useParams } from "next/navigation";
import { useFilterContext } from "~/lib/context/filterContext";
import { Series } from "~/types/chart.types";

type DetailAmountProps = {
  className?: string;
  cardClassName?: string;
};

const initialValues = {
  color: "#a2a2a2",
  name: "",
  data: [],
};

const DetailAmounts = ({ className, cardClassName }: DetailAmountProps) => {
  const params = useParams();
  const [income, setIncome] = useState(0);
  const [egress, setEgress] = useState(0);
  const [flowsMoney, setFlowsMoney] = useState<{
    incomePercentParsed: string;
    egressPercentParsed: string;
  }>();
  const [incomeTransactions, setIncomeTransactions] =
    useState<Series>(initialValues);
  const [egressTransactions, setEgressTransactions] =
    useState<Series>(initialValues);

  const { filter, rangeDate } = useFilterContext();

  const { account } = useCurrentAccount();
  const { transactions } = useTransactions({
    filter,
    startDate: rangeDate?.startDate,
    endDate: rangeDate?.endDate,
  });
  // const { transactionsByMonth } = getTransactionsByMonths(transactions);

  useEffect(() => {
    if (!transactions || !account) return;

    // separate incomes and egress
    const incomeTr = transactions.filter(({ type, transferType }) => {
      if (type === 1 && transferType === 1) {
        return true;
      }
      if (type === 2 && transferType === 2) {
        return true;
      }
      return false;
    });
    const egressTr = transactions.filter(({ type, transferType }) => {
      if (type === 2 && transferType === 1) {
        return true;
      }
      if (type === 1 && transferType === 2) {
        return true;
      }
      return false;
    });

    // get alone amounts
    const incomes = incomeTr.map((tr) => tr.amount);
    const egress = egressTr.map((tr) => tr.amount);

    const amountIncome = incomes.reduce((acc, val) => acc + val, 0);
    const amountEgress = egress.reduce((acc, val) => acc + val, 0);

    setIncome(amountIncome);
    setEgress(amountEgress);

    // set series for chart
    setIncomeTransactions({
      color: "#22c55e",
      name: "Ingresos",
      data: [...incomes],
    });

    setEgressTransactions({
      color: "#ef4444",
      name: "Egresos",
      data: [...egress],
    });

    const totalAmountTransactions = amountIncome + amountEgress;

    setFlowsMoney({
      incomePercentParsed: getPercent(amountIncome!, totalAmountTransactions),
      egressPercentParsed: getPercent(amountEgress!, totalAmountTransactions),
    });
  }, [transactions, account]);

  return (
    <section
      className={clsx(
        "scrollbar-customized flex h-full w-full min-w-[40rem] flex-col gap-2 overflow-auto md:min-w-fit",
        className,
      )}
    >
      <CardDetailAmount
        title="Ingreso"
        amount={income}
        color="text-green-500"
        series={[incomeTransactions]}
        icon="iconamoon:trend-up-light"
        percent={flowsMoney?.incomePercentParsed ?? "0%"}
        redirectHref={`/account/${params?.acc}/transactions/new?type=1`}
      />
      <CardDetailAmount
        title="Egreso"
        amount={egress}
        color="text-red-500"
        series={[egressTransactions]}
        icon="iconamoon:trend-down-light"
        percent={flowsMoney?.egressPercentParsed ?? "0%"}
        redirectHref={`/account/${params?.acc}/transactions/new?type=2`}
      />
    </section>
  );
};

export default DetailAmounts;
