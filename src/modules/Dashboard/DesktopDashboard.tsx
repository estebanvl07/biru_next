import React, { useEffect, useState } from "react";
import {
  Balance,
  BalanceAccount,
  CategoriesPercent,
  LastTransactions,
} from "../Common";
import { ReactSortable } from "react-sortablejs";
import clsx from "clsx";
import { api } from "~/utils/api";
import { getPercent } from "~/lib/helpers";
import { OrderComponent, UI_ORDER } from "~/lib/constants/ui";
import { PieChartAmountByCategoires } from "../Charts";
import { useBookBalance } from "../Books/hooks/useBooks.hook";
import SummaryBalance from "../Common/Balance/SummaryBalance";
import WeekMovements from "../Transactions/components/graphics/WeekMovements";

const DesktopDashboard = () => {
  const { balance, isLoading } = useBookBalance();
  const { data: defaultSetting } = api.users.getUiSetting.useQuery();
  const { mutate } = api.users.setSetting.useMutation();

  const widgets: {
    [Key: string]: { children: JSX.Element; className: string };
  } = {
    total_balance: {
      className: "col-span-3",
      children: (
        <Balance
          title="Total de Cuenta"
          amount={balance?.transactionTotal || 0}
          isLoading={isLoading}
          color="default"
          percent="10%"
          titlePercent="De Ingresos"
        />
      ),
    },
    income_balance: {
      className: "col-span-3",
      children: (
        <Balance
          title="Total de Ingresos"
          amount={balance?.incomes || 0}
          isLoading={isLoading}
          color="success"
          percent={getPercent(
            balance?.incomes || 0,
            balance?.transactionTotal || 0,
          )}
          titlePercent="De Ingresos"
        />
      ),
    },
    egress_balance: {
      className: "col-span-3",
      children: (
        <Balance
          title="Total de Engresos"
          amount={balance?.egress || 0}
          color="danger"
          percent={getPercent(
            balance?.egress || 0,
            balance?.transactionTotal || 0,
          )}
          titlePercent="De Egresos"
        />
      ),
    },
    egress_balance_2: {
      className: "col-span-3",
      children: (
        <Balance
          title="Total de Engresos"
          amount={balance?.egress || 0}
          color="danger"
          percent={getPercent(
            balance?.egress || 0,
            balance?.transactionTotal || 0,
          )}
          titlePercent="De Egresos"
        />
      ),
    },
    summary_balance: {
      className: "col-span-4",
      children: (
        <SummaryBalance
        // title="Total de Cuenta"
        // amount={balance?.transactionTotal || 0}
        // isLoading={isLoading}
        // color="default"
        // percent="10%"
        // titlePercent="De Ingresos"
        />
      ),
    },
    last_transactions: {
      className: "col-span-7 row-span-2",
      children: (
        <LastTransactions transactionsMaxLength={5} cardClassName="h-full" />
      ),
    },
    balance_by_categories: {
      className: "col-span-5 row-span-2",
      children: <PieChartAmountByCategoires />,
    },
    account_balance: {
      className: "col-span-8 row-span-1",
      children: (
        <WeekMovements />
        // <BalanceAccount
        //   chartOptions={{
        //     heightChart: "100%",
        //   }}
        //   className="col-span-2"
        // />
      ),
    },
  };

  const [list, setList] = useState<OrderComponent[]>();

  // const onSetList = (newList: OrderComponent[]) => {
  //   JSON.stringify(newList) !== JSON.stringify(defaultSetting?.widgetOrder) &&
  //     mutate(JSON.stringify(newList));
  // };

  useEffect(() => {
    if (!balance) return;
    // if (defaultSetting?.widgetOrder) {
    //   return setList(JSON.parse(defaultSetting.widgetOrder));
    // }
    setList(UI_ORDER);
  }, [balance, defaultSetting]);

  // useEffect(() => {
  //   if (list) {
  //     onSetList(list);
  //   }
  // }, [list]);

  return (
    <>
      {list && (
        <ReactSortable
          list={list || []}
          setList={setList}
          animation={600}
          className="grid grid-cols-12 gap-4"
        >
          {list?.map((option) => (
            <div key={option.id} className={widgets[option.name]?.className}>
              {widgets[option.name]?.children}
            </div>
          ))}
        </ReactSortable>
      )}
    </>
  );
};

export default DesktopDashboard;
