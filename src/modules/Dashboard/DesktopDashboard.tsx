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

const DesktopDashboard = () => {
  const { balance, isLoading } = useBookBalance();
  const { data: defaultSetting } = api.users.getUiSetting.useQuery();
  const { mutate } = api.users.setSetting.useMutation();

  const widgets: {
    [Key: string]: { children: JSX.Element; className: string };
  } = {
    total_balance: {
      className: "col-span-1",
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
      className: "col-span-1",
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
      className: "col-span-1",
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
    last_transactions: {
      className: "col-span-2",
      children: (
        <LastTransactions transactionsMaxLength={3} cardClassName="h-full" />
      ),
    },
    balance_by_categories: {
      className: "col-span-1 row-span-2",
      children: <PieChartAmountByCategoires />,
    },
    account_balance: {
      className: "col-span-2",
      children: (
        <BalanceAccount
          chartOptions={{
            heightChart: "150",
          }}
          className="col-span-2 h-fit"
        />
      ),
    },
  };
  // const widgets: { [Key: string]: JSX.Element } = {
  //   total_balance: (
  //     <Balance
  //       title="Total de Cuenta"
  //       amount={account?.balance || 0}
  //       isLoading={isLoading}
  //       color="default"
  //       percent="10%"
  //       titlePercent="De Ingresos"
  //     />
  //   ),
  //   income_balance: (
  //     <Balance
  //       title="Total de Ingresos"
  //       amount={balance?.incomes || 0}
  //       isLoading={isLoading}
  //       color="success"
  //       percent={getPercent(
  //         balance?.incomes || 0,
  //         balance?.transactonTotal || 0,
  //       )}
  //       titlePercent="De Ingresos"
  //     />
  //   ),
  //   egress_balance: (
  //     <Balance
  //       title="Total de Engresos"
  //       amount={balance?.egress || 0}
  //       color="danger"
  //       percent={getPercent(
  //         balance?.egress || 0,
  //         balance?.transactonTotal || 0,
  //       )}
  //       titlePercent="De Egresos"
  //     />
  //   ),
  //   savings_balance: (
  //     <Balance
  //       title="Total de Ahorros"
  //       amount={balance?.savings || 0}
  //       color="warning"
  //       percent={getPercent(
  //         balance?.savings || 0,
  //         balance?.transactonTotal || 0,
  //       )}
  //       titlePercent="De Egresos"
  //     />
  //   ),
  //   account_balance: <BalanceAccount className="h-fit" />,
  //   // goal_list: <GoalList />,
  //   balance_by_categories: <PieChartAmountByCategoires />,
  //   last_transactions: (
  //     <LastTransactions transactionsMaxLength={6} cardClassName="h-full" />
  //   ),
  //   // quick_transaction: <QuickTransaction />,
  //   // categories_percent: <CategoriesPercent />,
  //   // annual_balance: <AnnualBalance />,
  // };

  const [list, setList] = useState<OrderComponent[]>();

  const onSetList = (newList: OrderComponent[]) => {
    JSON.stringify(newList) !== JSON.stringify(defaultSetting?.widgetOrder) &&
      mutate(JSON.stringify(newList));
  };

  useEffect(() => {
    if (!balance) return;
    if (defaultSetting?.widgetOrder) {
      return setList(JSON.parse(defaultSetting.widgetOrder));
    }
    setList(UI_ORDER);
  }, [balance, defaultSetting]);

  useEffect(() => {
    if (list) {
      onSetList(list);
    }
  }, [list]);

  return (
    <>
      {list && (
        <ReactSortable
          list={list || []}
          setList={setList}
          animation={600}
          className="grid grid-cols-3 gap-2"
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
